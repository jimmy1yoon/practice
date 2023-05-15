# Slim Frame Work Guide

## Routing
    경로를 지정해주는 역할이다. 이걸 하지 않을 경우 경로에 모든 정보와 파일 위치 등이 나오기 때문에  routing 을 통해서 경로를 지정한다. 여기서 Group으로 지정하는 거 같기도 하고 

## Middleware 
    아래의 용어에 나온 두가지 클래스 ServerRequestInterFace 와 RequestHandler 를 사용한다.
    Middleware 는 서버에서 들어온 요청이 조건에 부합하는지 레이어를 쌓아서 검사하는 역할을 한다. 만약 이때 조건에 부합하지 않는다면 callback 을 활용해서 다시 처음의 상태로 돌려보낸다. 조건에 해당하는 것은 예를 들어서 음.. 로그인 정보같은 이 사용자가 로그인을 하였는지 하지 않았는지를 확인하는 것이다.
    이때 미들웨어를 모든 클래스나 컨트롤러에 연결하기 어렵기 때문에 route 단위로 묶어서 group으로 건다.
    걸때는 add 를 사용하는듯!


참고자료 - https://blog.cordelia273.space/5

## 간단한 실습

https://www.twilio.com/blog/create-restful-api-slim4-php-mysql - mysql

## 용어 정리

### ServerRequestInterFace
    The PSR-7 request object : PSR-7 의 요청을 처리하는 클래스
    PSR-7 이란?
    웹사이트에서 들어온 요청의 HTTP 형식 웹사이트에서 서버로 들어올 때 PSR-7 형식으로 온다.

### RequestHandler
    The PSR-15 request handler object : PSR-15 의 요청으로 처리하는 클래스
    PSR-15 이란?
    웹사이트에서 PSR-7의 형태로 들어온 request를 읽기 위해서는 PSR-15 형식으로 처리해주어야 읽을 수 있어서 PSR-7 로 들어온 요청을 RequestHandler를 통해서 처리한다.

### $app->get
    $app->get('/A/B',function(){}) : 가 의미하는 것은 예를 들어 내 웹서버의 주소가 localhost 라고 했을 떄 localhost/A/B 로 입력하면 function 을 실행해라 라는 의미이다.
    마지막에 ->setName은 Route의 이름을 지정해주는 것이다. 

http://talklowykr.blogspot.com/2015/09/php-slim-framework.html

### __invoke
    매직 메소드 중 하나로 php의 특수한 메서드이다. 
    __construct와 다르게 new키워드로 선언할 때는 실행 되지 않는다.
    클래스에서 생성한 객체를 함수처럼 사용하고 부를 때 불러지는 method 이다. 