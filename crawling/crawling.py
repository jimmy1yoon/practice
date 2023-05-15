from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.keys import Keys
import json, os
from .command import Commands
from .db import DB

class Crawling : 
    
    def __init__(self, cmd : Commands, db : DB) -> None:
        self._driver = None
        self._cmd = cmd if cmd is not None else Commands(None)
        self._db = db if db is not None else DB(None)
        
    @property
    def command(self):
        return self._cmd
    
    @property
    def db(self):
        return self._db
    
    @property
    def driver(self):
        if self._driver is None : self.open_driver()
        return self._driver
        
    def open_driver(self):
        options = webdriver.ChromeOptions() # remove USB로 인식하는 error 제거 options 
        options.add_experimental_option("excludeSwitches", ["enable-logging"])
        options.add_argument("--disable-usb-keyboard-detect")
        caps = DesiredCapabilities.CHROME
        caps['goog:loggingPrefs'] = {'performance': 'ALL'}
        self._driver = webdriver.Chrome(os.getcwd()+'/crawling/chromedriver_win32/chromedriver.exe', options=options, desired_capabilities=caps)
        
    def open_page(self, url = None):
        try:
            self.driver.get(url)
            self.driver.implicitly_wait(0.5)
        except WebDriverException as e:
            raise f"Error: Invalid URL"
        
    def get_page_url(self) -> list[str]:
        script = '''let elements = Array.from(document.querySelectorAll('a'))
            .filter((content) => content.hostname == window.location.hostname)
            .map((row)=>row.href);
        return JSON.stringify(elements);
        '''
        results =  self.driver.execute_script(script)
        return json.loads(results)
            
    MEDIA_TAG = {
        'google_ads': '"gtag/js?id=AW-"',
        'google_ua': '"gtag/js?id=UA-"',
        # 'google_ga4': '"gtm.js?id=GTM-"',
        'googletagmanager' : '"www.googletagmanager.com/gtm.js?id=GTM-"',
        'criteo': '"static.criteo.net/js/ld/ld.js"',
        'facebook': '"/fbevents.js"',
        'adbrix' : '"static.adbrix.io/web-sdk/latest/abx-web-sdk.min.js"',
        'artistchai' : '"at.artistchai.co.kr/script/at_v14.min.js"',
        'adobe_analytics' : '"assets.adobedtm.com/"',
        'naver_analytics' : '"wcs.naver.net/wcslog.js"'
    }
    
    def has_media_tag_script(self, tag_name:str):
        return f"0<document.querySelectorAll('script[src*={tag_name}]').length"
    
    def has_media_tag(self, **validations) :
        return {channel:json.loads(self.driver.execute_script(f'return JSON.stringify({self.has_media_tag_script(tag_name)})')) for channel, tag_name in validations.items()}
    
    def get_html(self) -> list[str]:
        script = '''let elements = Array.from(document.getElementsByTagName('script'))
            .map((scr)=>scr.outerHTML)
            .filter((content)=> content.includes('gtag'));
        return JSON.stringify(elements);
        '''
        return json.loads(self.driver.execute_script(script))
    
    # document.querySelector("head > script:nth-child(107)")
    
    # dfs
    
    def get_valid(self):
        result = {}
        self.open_page(self.command.url)
        for url in self.get_page_url():
            if url not in result:
                self.open_page(url)
                texts = self.has_media_tag(**self.MEDIA_TAG)
                result[url] = texts
                # self.db.insert_row('url_navigator', (url,))
        return result
    
    def get_src(self):
        self.open_page(self.command.url)
        print(self.get_page_url())
        # s = self.driver.execute_script('document.querySelector("head > script:nth-child(107)")')
        
    def get_logs(self):
        '''get network log'''
        self.open_page(self.command.url)
        logs = self.driver.get_log('performance')
        for log in logs:
            log_message = json.loads(log['message'])
            if log_message['message']['method'] == 'Network.requestWillBeSent' and 'collect' in log_message['message']['params']['request']['url']:
                request_url = log_message['message']['params']['request']['url']
                url, parameter = request_url.split('?')
                print(self.parse_parameter(parameter))
                
    def test(self):
        self.open_page(self.command.url)
        self.driver.find_elements('')
                
    def parse_parameter(self, url:str):
        param_dict = {}
        while url and '&' in url:
            text, url = url.split('&', maxsplit = 1)
            name, parameter = text.split('=')
            param_dict[name] = parameter
        return param_dict
                
    def create_table(self):
        # self.db.create_table('url_navigator', **{'url' : 'TEXT'})
        pass