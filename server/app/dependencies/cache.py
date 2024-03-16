import redis

from ..variables import redis_host, redis_port


def cache() -> redis.Redis:
    return redis.Redis(
        host=redis_host,
        port=redis_port,
    )