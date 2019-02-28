def group_by(collection, by, map_values=lambda x: x):
    res = {}
    for c in collection:
        key = by(c)
        items = res.get(key)
        if items is None:
            items = []
            res[key] = items
        items.append(map_values(c))
    return res
