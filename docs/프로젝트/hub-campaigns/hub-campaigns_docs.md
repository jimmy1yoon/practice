# hub-campaigns란d
hub-campaigns란 이제 광고 캠페인을를 자동화 해서 여러가지 캠페인을 한눈에 볼 수 있게 하고
여러가지 캠페인을 어떤 매체에 올리는 것이 가장 효율적이고 그런지 알 수 있다. 


# After clone.md

composer update --> apache 가 설치되어야 한다. --> 그 다음 php 설치한 후에 composer 설치 필요

composer test 

# index.php

define 경로 설정
dirname : 파일명을 제외한 경로
앞으로 사용할 경로를 선언한다. 글로벌 변수로 선언하여 다른 php 파일에서도 변수 사용 가능

**require_once __ROOT__.'/vendor/autoload.php'**
    autoload.php 클래스 불러오기 

    Container 클래스를 불러와서 container 객체를 생성 
    Container : src/Container.php

# Container.php

외부 클래스인 DI를 활용하는 코드이다. 

**Container 의 역할** 
    기본 값 settingm database, session 서버, 에러 예외처리등 다양한 클래스들에 종속성을 부여하는 코드이다. 이 코드를 통해 앞으로 서비스나 클래스를 사용할 때 종속성을 활용하여 간단한 코드로 사용할 수 있다. 

**use Slim\Factory\AppFactory** 
    Slim 사용 - 함수 실행 - 종속적으로 할 필요 없이 간단하게 연결해준다. 우리가 만든 서비스를 이제 웹사이트에 올리기 쉽도록 둘을 연결해주는 함수 

**const autoAliases** 
    앞으로 사용할 Class들 상수 형태로 선언

**__construct()** 
    class를 불러와서 foreach문을 통해 build 한다.
    그리고 build 한 내용을 slim의 setcontainer를 이용하여 빌드
 
# setting.php

**fromPath** 
    path가 중복되지 않는지 확인한 후 settingPath 생성

**loadPackageNames** 
    appending 배열과 패키지 puts 배열을 받아서 puts 배열의 키 값을 $key\\$key 의 형태로 반환하여 appending 에 저장 --> package를 load 하기 위해서 namespace 와 같은 경로를 설정하기 위해서 $key\\$key의 형태로 변경

**buildContainer** 
    ContainerBuilder로 종속성을 활용하여 사용할 클래스를 불러오고 config와 setting을 get 함수를 통해 받은 파라미터를 이용해서 만든다. 파라미터를 이용해 만든 배열을 가지고 추가로 정의한다. 그 후에 loadPackageNames 를 사용해서 자동으로 종속성을 만들어준후 build 한다. 

# Server.php

**_construct** 
    slim = settings : config(index.php)
    this->_slim = AppFactory::create() : slim에서 Factory에 기초 값을 생성한다. 
    registerRoutes : 경로를 등록해준다.
		
**registerRoutes**
    컨테이너를 인스턴스화 하기
    authGuard, csrfGuard = 

# authGuard.php / csrfGuard.php

user 가 들어오면 서버에서 요청한 객체를 바탕으로 이제 user 한명 한명 token을 활용해서 값을 주는 클래스이다. 

**getTokenFilePath**
    username을 입력 받으면 username에 맞는 session 값을 반환한다. 

**buildAccessToken**
    username 과 uniqid 함수를 활용해서 고유 값을 만들고 이를 HASHING_ALGORITHM을 활용해서 codedToken 을 만들어서 반환한다.

**headers**
    서버에서 요청한 request 에서 user, token 

**process**
    요청받은 username 을 통해 로그인이 가능한지, 기존에 있었던 사용자인지, 그리고 이름이 같더라도 token이 일치하는지를 확인한다.

    만약 둘다 없다면 그리고 요청 객체인 request에 추가적인 객체/값을 더 주입한다.   


# RouteGroup.php

controller 의 뼈대가 되는 클래스, 추상적인 abstract 클래스이다. 

**ProtectedControllerGroup**
    들어온 응답에서 Header, Body 를 response 에 담아서 return 한다.

**currentLogin**
    지금 들어온 요청에서 Attriburite 의 user를 return 한다. 만약 들어온게 없다면 'code'=>$request->getAttribute('login') 을 리턴한다. 

# GroupAuthenticate.php
    