
from .crawling import Crawling
from .command import Commands
from .db import DB

def main(args) :
#     # load command

    # bulid_parser
    cmd = Commands(args)
    # runner
    db = DB(cmd.url)
    crl = Crawling(cmd, db)

    try:
        func = getattr(crl, cmd.func)
    except AttributeError:
        raise 'AttributeError occurred : invalid function name'
    
    func()