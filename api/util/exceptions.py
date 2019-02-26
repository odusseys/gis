class APIError(Exception):
    def __init__(self, status_code, message, payload=None):
        Exception.__init__(self)
        self.status_code = status_code
        self.message = message
        self.payload = payload

    def to_dict(self):
        return dict(message=self.message, payload=self.payload)


class BadRequest(APIError):
    def __init__(self, message, payload=None):
        APIError.__init__(self, 400, message, payload)


class Conflict(APIError):
    def __init__(self, message, payload=None):
        APIError.__init__(self, 409, message, payload)


class Unauthorized(APIError):
    def __init__(self, payload=None):
        APIError.__init__(self, 401, "Unauthorized", payload)


class Forbidden(APIError):
    def __init__(self, payload=None):
        APIError.__init__(self, 403, "Forbidden", payload)


class NotFound(APIError):
    def __init__(self, payload=None):
        APIError.__init__(self, 404, "NotFound", payload)
