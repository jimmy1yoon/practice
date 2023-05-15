import argparse
import sys

class Commands():
    
    _KEY_PARSER_URL = 'url'
    _KEY_PARSER_ID = 'id'
    _KEY_PARSER_PASSWORD = 'password'
    
    @property
    def url(self) -> str:
        return self._url
    
    @property
    def id(self) -> str:
        return self._id
    
    @property
    def password(self) -> str:
        return self._password
    
    @property
    def func(self) -> str:
        return self._function

    def __init__(self, *args):
        self._parser = self._build_parser()
        self.load(args)
    
    def _build_parser(cls):
        parser = argparse.ArgumentParser(prog= 'crawling', description='crawling tags in website')
        parser.add_argument('--url', type=str, required=True ,help='input url')
        parser.add_argument('--id', type=str,help='input id')
        parser.add_argument('--password', type=str, help='input password')
        parser.add_argument('--func', type=str, required=True, help='input function')
        return parser
    
    def load(self,args = sys.argv):
        self._items = vars(self._parser.parse_args(*args))
        self._url = self.add_https(self._items['url'])
        self._id = self._items['id']
        self._password = self._items['password']
        self._function = self._items['func']
        
    def add_https(self, url):
        if not url.startswith("https"):
            url = "https://" + url
        return url