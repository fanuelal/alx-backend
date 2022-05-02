#!/usr/bin/env python3
"""Module index renge"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ return a tuple of size two """
    last: int = page * page_size
    return((last - page_size), (last))
