from redis import StrictRedis
import pickle as pkl
from api.config import config

_DEFAULT_CACHE_DURATION = 3600

instance = StrictRedis(host=config["REDIS_HOST"])


def _cache_key(region: str, *args, **kwargs):
    arglist = [str(t) for t in args]
    kwarglist = ["{}={}".format(k, str(v)) for k, v in sorted(
        kwargs.items(), key=lambda x: x[0])]
    arglist.extend(kwarglist)
    key = ":".join(arglist)
    return "cache::{}::{}".format(region, key)


def cached(region: str = None, ttl=_DEFAULT_CACHE_DURATION):
    """

    :param region: the cache "region" in which to cache this function's results
    :param ttl:
    :return:
    """

    if region is not None and "::" in region:
        raise ValueError("Region name cannot contain ::")

    def decorator(f):
        cache_region = region
        if cache_region is None:
            cache_region = "{}.{}".format(f.__module__, f.__name__)

        def wrapper(*args, **kwargs):
            key = _cache_key(cache_region, *args, **kwargs)
            value = instance.get(key)
            if value is not None:
                try:
                    res = pkl.loads(value)
                    return res
                except pkl.PickleError:
                    # the object is probably coming from an earlier version of the api.
                    # we just drop the cache. not even necessary, but cleaner.
                    instance.delete(key)
            # the object is not in the cache. We pickle it and add it to the cache
            value = f(*args, **kwargs)
            instance.set(key, pkl.dumps(value), ex=ttl)
            return value

        # add invalidation utilities through monkeypatching
        def invalidate_all():
            for key in instance.scan_iter(match="cache::{}::*".format(cache_region)):
                instance.delete(key)

        def invalidate(*args, **kwargs):
            instance.delete(_cache_key(cache_region, *args, **kwargs))

        wrapper.invalidate_all = invalidate_all
        wrapper.invalidate = invalidate

        return wrapper

    return decorator
