#!/usr/bin/python3
""" BaseCaching module
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ BaseCaching defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """

    def put(self, key, item):
        """ Add an item in the cache
        """

        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """

        if self.cache_data.get(key) is None or key is None:
            return None
        return self.cache_data.get(key)
