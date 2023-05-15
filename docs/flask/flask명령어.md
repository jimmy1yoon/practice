## flask 명령어


flask run 디버깅 모드로 변경
flask --debug run

필요한 이유 : app.run(debug=True) 로 할 경우에는 app.py를 실행할 때 사용이 된다. 
하지만 flask run으로 명령어를 실행할 경우에는 flask 자체 라이브러리를 실행하는 것이기 때문에 app.run 명령어가 소용이 없다.

