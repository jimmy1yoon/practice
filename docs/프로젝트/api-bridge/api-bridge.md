# Api-Bridge


명령어 token test
python -m apis --channel naver_sa --account ACCOUNT --campaign CAMPAIGN --token 010000000068f05de9b74812219e17267cc6b9f99112497b70742f2f176b03388c4f0d56f3,AQAAAABo8F3pt0gSIZ4XJnzGufmRRPHExa8r09mJY+cgOdiBYw== gets

TarGet 이랑 같이 갈때
python -m apis --channel naver_sa --account 2802603 --campaign CAMPAIGN --target "123{34,12}" --token 010000000068f05de9b74812219e17267cc6b9f99112497b70742f2f176b03388c4f0d56f3/AQAAAABo8F3pt0gSIZ4XJnzGufmRRPHExa8r09mJY+cgOdiBYw== gets

target Campaign
python -m apis --channel naver_sa --account 2802603 --campaign "cmp-a001-01-000000006363279" --token 010000000068f05de9b74812219e17267cc6b9f99112497b70742f2f176b03388c4f0d56f3/AQAAAABo8F3pt0gSIZ4XJnzGufmRRPHExa8r09mJY+cgOdiBYw== gets 

Target Adgroup
python -m apis --channel naver_sa --account 2802603 --campaign "cmp-a001-01-000000006363279" --target "grp-a001-01-000000032576933"--token 010000000068f05de9b74812219e17267cc6b9f99112497b70742f2f176b03388c4f0d56f3/AQAAAABo8F3pt0gSIZ4XJnzGufmRRPHExa8r09mJY+cgOdiBYw== gets 

Target Ad
python -m apis --channel naver_sa --account 2802603 --campaign "cmp-a001-01-000000006363279" --target "grp-a001-01-000000032576933" --token 010000000068f05de9b74812219e17267cc6b9f99112497b70742f2f176b03388c4f0d56f3/AQAAAABo8F3pt0gSIZ4XJnzGufmRRPHExa8r09mJY+cgOdiBYw== gets --level ad



# 에러 해결

PUT JSON 형식
{'nccAdgroupId': 'grp-a001-01-000000032823410', 'customerId': 2802603, 'nccCampaignId': 'cmp-a001-01-000000006363279', 'mobileChannelId': 'bsn-a001-00-000000008155766', 'pcChannelId': 'bsn-a001-00-000000008155766', 'bidAmt': 70, 'name': 'TEST#8383', 'userLock': False, 'useDailyBudget': False, 'useKeywordPlus': False, 'keywordPlusWeight': 100, 'contentsNetworkBidAmt': 70, 'useCntsNetworkBidAmt': False, 'mobileNetworkBidWeight': 100, 'pcNetworkBidWeight': 100, 'dailyBudget': 0, 'budgetLock': False, 'delFlag': False, 'regTm': '2023-03-02T07:31:35.000Z', 'editTm': '2023-03-02T07:31:35.000Z', 'targets': [{'nccTargetId': 'tgt-a001-01-000000371437956', 'ownerId': 'grp-a001-01-000000032823410', 'targetTp': 'MEDIA_TARGET', 'target': {'type': 1, 'search': [], 'contents': [], 'white': {'media': None, 'mediaGroup': None}, 'black': {'media': None, 'mediaGroup': None}}, 'delFlag': False, 'regTm': '2023-03-02T07:31:35.000Z', 'editTm': '2023-03-02T07:31:35.000Z'}, {'nccTargetId': 'tgt-a001-01-000000371437957', 'ownerId': 'grp-a001-01-000000032823410', 'targetTp': 'PC_MOBILE_TARGET', 'target': {'pc': True, 'mobile': True}, 'delFlag': False, 'regTm': '2023-03-02T07:31:35.000Z', 'editTm': '2023-03-02T07:31:35.000Z'}], 'targetSummary': {'pcMobile': 'all', 'media': 'all'}, 'pcChannelKey': 'http://test_adgroup1.com', 'mobileChannelKey': 'http://test_adgroup1.com', 'status': 'PAUSED', 'statusReason': 'BUSINESS_CHANNEL_UNDER_REVIEW', 'expectCost': 0, 'migType': 0, 'adgroupAttrJson': {'campaignTp': 1}, 'adRollingType': 'PERFORMANCE', 'adgroupType': 'WEB_SITE', 'systemBiddingType': 'NONE', 'useCntsNetworkBidWeight': False, 'contentsNetworkBidWeight': 100}