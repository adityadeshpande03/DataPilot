class InvalidCredentialsError(Exception):
    # Raised when an existing user's password does not match
    pass


class PermissionDeniedError(Exception):
    # Raised when a non-admin tries an admin-only action
    pass


class UserNotFoundError(Exception):
    pass


class InvalidTokenError(Exception):
    # Raised when a JWT is expired, tampered with, or malformed
    pass


class CannotDeleteSelfError(Exception):
    # Stops an admin from deleting their own account (and locking everyone out)
    pass
