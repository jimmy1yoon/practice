# controller
Facebook api 를 통해 받은 JSON 형식의 정보를 파싱하여 데이터 베이스에 저장하는 역할을 

## RouteGroup.php
controller 의 뼈대가 되는 클래스, 추상적인 abstract 클래스이다. 한마디로 조상 클래스이다. 이 아래의 클래스는 전부 같은 기능을 가지고 있다고 볼 수 있다.

**abstract funtion**
    prefix : 사전에 수정해야한다면 이 함수 정의 
    register : 반드시 들어온 오청을 등록해야한다.
----

public function
**middlewares** : 모든 과정은 미들웨어를 고쳐야하니까

--- 

protected function
**registerMethods**
    들어온 response이 [$path, $functionName, HTTP_METHOD]의 형식으로 왔을 때 
    maps = array
    
**_response**
    API를 통해 들어온 response 에서 text 와 

**ProtectedControllerGroup**
    들어온 응답에서 Header, Body 를 response 에 담아서 return 한다.

**currentLogin**
    지금 들어온 요청에서 Attriburite 의 user를 return 한다. 만약 들어온게 없다면 'code'=>$request->getAttribute('login') 을 리턴한다. 

**parseDate**
    실행하는 날짜를 입력 받아서 DateTime 형식으로 파싱
    이를 배열일 경우와 object일 경우로 나눠서 처리
    만약 value로 들어온 값이 없다면 현재 시간으로 반환한다.

**stringifyDate**
    DateTime 형식으로 들어온 값을 Y-m-d 로 파싱하여

## GroupCampaign.php
Campaing 관련 endpoint 와 클래스등이 모여있는 곳

**register**
    endpoint, class name, method 형식으로 배열을 등록
    endpoint에 따라 실행될 클래스와 method 를 배열 형식으로 등록해둔다.

**listCampaigns**
    grant와 username을 통해서 권한과 이름을 확인한다.
    Campaign::list([]) 는 condition 에 아무것도 넣지 않고 실행하는 것이기 때문에 Campaign에 where 절 없이 모든 것을 가지고 온다. 
    그리고 그 후에 response에 view로 가지고 온 정보를 json 형식으로 담아서 보낸다.

    그러면 이제 이게.. 웹사이트나 시스템에 올라간다. 
    //TODO 권한 관리는 나중에 추가하기 위해서는 list 에 where 절에 조건을 추가하면 될듯??

**packCampaign**
    새로운 campaign 인스턴스를 만들어서 배열로 campaign 정보를 저장한 후에 반환한다. 

**saveCampaign**
    Campaign을 DB에 추가한다. 생성할때 이 함수를 사용한다. 
    
**detailedCmp**
    상수 _SERVER에 REQUEST_URI : 'request_link'를 넣은 후에 explode()로 endpoint를 만든다. req 에서 디테일하게 알고싶은 campaign_code를 찾은 후에 Campaing 테이블에서 찾은 후 json 형식으로 반환