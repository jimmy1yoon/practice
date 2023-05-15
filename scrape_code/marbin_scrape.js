// 2-1) 특정 url을 주면 페이지에 있는 데이터 읽기

/**
 * 파싱할 key들
 * category 1 depth  => catgLvlOneNm
 * category 2 depth => catgLvlTwoNm
 * category 3 depth => catgNm
 * product code =>  prodCd ('/' 앞 부분만)
 * product name => prodNm
 */
// 
const required_keys = ['catgLvlOneNm', 'catgLvlTwoNm', 'catgNm', 'prodCd', 'prodNm']

// http request 생성 후 리턴 
function get_xml_http_request() {
  return new XMLHttpRequest();
}

// [주의] open 후에 요청 header 설정 가능
function set_request_header(request) {
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // case sensitive!!!
}

// HttpRequest가 받은 데이터 파싱
function parse_data() {
  if (request.readyState === request.DONE) {
    const response_body = JSON.parse(request.responseText);
    const status = response_body.status;
    if (status === 200) {
      const page_data = response_body.data.pageData;

      // option1: json safe한 object로 변환
      const required_data = page_data.map(data => {
        return Object.fromEntries(
          Object.keys(data)
            .filter(key => required_keys.includes(key))
            .map(function(key) {
              if (key === 'prodCd') {
                return [key, data[key].split('/')[0]];
              }
              return [key, data[key]];
            })
        );
      });

      console.dir(JSON.stringify(required_data, null, 2)); // space 2
      return required_data;
    } 
    // when status !== 200
    console.dir(`status code ${response_body.status}: ${response_body.message}`);
    return 'parse 실패';
  }
}

// request body 생성
function make_request_body(categoryOne, categoryTwo) {
  return {
    "catgLvlOneCd": categoryOne,
    "catgLvlTwoCd": categoryTwo,
    "orderBy": [],
    "pageSize": 8,
    "pageNo": 1,
    "prodTags": "",
    "minPrice": "",
    "maxPrice": "",
    "categoryIds": [],
    "tagCdList": []
  };
}

function request_post_to_url(request, categoryOne, categoryTwo="") {
  let url = 'https://shop.samsung.com.cn/api/product/plp/v2/page';
  request.onreadystatechange = parse_data;
  request.open('POST', url);
  set_request_header(request); // 레퍼런스 복사
  const request_body = make_request_body(categoryOne, categoryTwo);
  request.send(JSON.stringify(request_body));
}

// 사용
const request = get_xml_http_request();
request_post_to_url(request, categoryOne="smartphone-tablet");
