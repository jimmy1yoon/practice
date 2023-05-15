  /*
  진입점
  */
  (function() {
    /* 
    상수 정의
    */
    const API_URL = 'https://shop.samsung.com.cn/api/product/plp/v2/page';
    const API_METHOD = "POST";
    const REQUEST_HEADER = ["Content-Type", "application/json;charset=UTF-8"];
    const REQUIRED_KEYS = ['catgLvlOneNm', 'catgLvlTwoNm', 'catgNm', 'prodCd', 'prodNm']; // 파싱할 key들
    const DELIMITER = '\t';
    const SEPARATOR = '\n';
    const CATEGORIES = ["smartphone-tablet", "wearables", "tv-av", "smart-home-appliances", "office-storage"];
    const INTERVAL_TIMER = 1000;
    const REQUEST_BODY_DEFAULT = {
      "orderBy": [],
      "pageSize": 8,
      "prodTags": "",
      "minPrice": "",
      "maxPrice": "",
      "categoryIds": [],
      "tagCdList": []
    };
    const DIALOG_BODY_ID = "ptk-dialog-body"
    const LOADING_SVG = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="204px" height="204px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g transform="rotate(0 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(30 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(60 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(90 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(120 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(150 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(180 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(210 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(240 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(270 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(300 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
        </rect>
      </g><g transform="rotate(330 50 50)">
        <rect x="47.5" y="24" rx="2.5" ry="6" width="5" height="12" fill="#1d3f72">
          <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
        </rect>
      </g>
    `

    
    /* 
    * UI 관련 유틸 함수 모음
    */
    class UIUtil {
      /*
      * change the content of dialog body
      * return child_element
      */
      static POINT_COLOR = "#97acbd";

      static make_element({tag_name, text, style, option}) {
        let child = document.createElement(tag_name);

        // text
        text && (child.innerText = text);

        // style
        child.style.marginBottom = "1rem"; // default
        switch (tag_name) {
          case 'input':
            child.style.appearance =  'auto';
          case 'h1':
            child.style.marginBottom = '2rem'; // overloading
            break;
          case 'a':
            Object.assign(child.style, {
              display: 'block',
              color: 'blue',
            })
            break;
          default:
            break;
        }
        style && (Object.assign(child.style, style));


        // option
        Object.assign(child, option);

        return child;
      }

      // (default) append to dialog body
      static append_element(element, parent) {
        parent ? parent.appendChild(element) : document.getElementById(DIALOG_BODY_ID).appendChild(element);
      }

      // (default) append to dialog body
      static append_element_as_text(element_text, parent) {
        parent ? parent.appendChild(element) : document.getElementById(DIALOG_BODY_ID).innerHTML += element_text;
      }

      // (default) append to dialog body
      static make_and_append_element({parent, tag_name, text, style, option}) {
        let child = this.make_element({tag_name, text, style, option});
        this.append_element(child, parent);
        return child;
      }

      /*
      * clear children of an element
      */
      static clear_dialog_body() {
        let dialog_body = document.getElementById(DIALOG_BODY_ID);
        for (const child_element of Array.from(dialog_body.children)) {
          child_element.remove();
        }
      }


      /* 
      * 다이얼로그 생성해서 띄우고 카테고리 선택하게 하기
      */
      static show_dialog() {

        document.body.style.overflow = "hidden";

        // modal background
        let dialog = this.make_and_append_element({
          tag_name: 'div',
          style: {
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            position: "absolute",
            zIndex: "10000",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
          },
          parent: document.body,
        });

        // modal body
        this.make_and_append_element({
          tag_name: 'div',
          style: {
            margin: "auto",
            padding: "3rem 5rem",
            backgroundColor: "rgba(255, 255, 255)",
            border: "1px solid black",
            borderRadius: "2rem",
          },
          option: {
            id: DIALOG_BODY_ID,
          },
          parent: dialog,
        });


        // start fetching
        this.make_and_append_element({
          tag_name: 'h1',
          text: 'Fetching data'
        });
        this.append_element_as_text(LOADING_SVG);
        
        download_data(CATEGORIES);
      }
    }

    /* 
    * file util 함수 모음
    */
    class FileUtil {
      /*
      * tsv 파일 다운로드
      */
      static download_tsv(file_name, body, headers, delimiter=DELIMITER, separator=SEPARATOR) {
        let tsv_text = [
          headers.join(delimiter),
          body.map((data) => Object.values(data).join(delimiter)).join(separator)
        ];
        let a_tag = UIUtil.make_and_append_element({
          tag_name: 'a',
          text: `[File - click to download again] ${file_name}.tsv`, 
          option: {
            href: `data:text/plain;charset=utf-8,${encodeURIComponent(tsv_text.join(separator))}`,
            download: `${file_name}.tsv`,
          },
        });
        a_tag.click();
      }
    }

    
    
    /* 
    * 시작
    */
    startUI();
    
    /* 
    * layer 0
    * 역할 : 카테고리 선택하는 UI 그려주고 제출 클릭 리스너 등록
    */
    function startUI() {
      UIUtil.show_dialog();
    } 

    /* 
    * layer 1
    * 역할 : 모든 데이터가 담긴 오브젝트를 받아서 파일 다운로드 
    */
    function download_data(categories) {
      request_collection(categories)
        .then(value => {
          UIUtil.clear_dialog_body();
          UIUtil.make_and_append_element({
            tag_name: 'h1',
            text: 'Downloading file'
          });
          FileUtil.download_tsv(`samsung_com_${Date.now()}`, value, REQUIRED_KEYS, DELIMITER, SEPARATOR);
        })
        .catch(reason => UIUtil.make_and_append_element({
          tag_name: 'div',
          text: reason,
        }));

    }

    /* 
    * layer 2
    * 역할 : 카테고리별, 페이지별 요청 보내고 모은 뒤 리턴
    */
    function request_collection(categories) {
      return new Promise((resolve, reject) => {
        let category_idx = 0;
        let page_idx = 1;
        let results = [];
        let cursor = null;
    
        let interval_id = setInterval(() => {
          // 중복 수행 방지, 순차적 실행 보장
          if(cursor) return;
          
          cursor = categories[category_idx];

          console.dir(`now ${cursor} ${page_idx}`);
          request_one_page(categories[category_idx], page_idx)
            .then(value => {
              cursor = null;

              results.push(...value.data)
              if (value.more) {
                page_idx += 1;
              } else {
                page_idx = 1;
                category_idx += 1;
                if (category_idx === categories.length) {
                  clearInterval(interval_id);
                  resolve(results);
                }
              }
            })  
            .catch(reason => {
              cursor = null;
              clearInterval(interval_id);
              reject(reason);
            });
        }, INTERVAL_TIMER);
      });
    }

    /* 
    * layer 3
    * 역할 : 단일 카테고리, 단일 페이지 요청 후 파싱된 응답 받아서 리턴
    */
    function request_one_page(category, page) {
      return new Promise((resolve, reject) => {
        let request =  new XMLHttpRequest();
        request.open(API_METHOD, API_URL); // url 고정된 상태
        request.setRequestHeader(...REQUEST_HEADER);
        request.onreadystatechange = function() {
          if (request.readyState === request.DONE) { // always either success or fail
            parse_data(request)
              .then(value => resolve(value))
              .catch(reason => reject(reason));
          }
        };
        request.send(JSON.stringify(Object.assign(REQUEST_BODY_DEFAULT, {
          "catgLvlOneCd": category,
          "pageNo": page
        })));
      });
    }

    /* 
    * layer 4
    * 역할 : 단일 페이지 응답에서 필요한 부분만 파싱 후 리턴 (다음 페이지 존재 여부, 한 페이지 데이터)
    */
    function parse_data(request) {
      return new Promise((resolve, reject) => {
        const response_body = JSON.parse(request.responseText);
        const status = response_body.status;
        if (status === 200) {
          const has_next_page = response_body.data.hasNextPage;
          const page_data = response_body.data.pageData;
          const required_data = page_data.map(data => 
            Object.fromEntries(
              Object.keys(data)
                .filter(key => REQUIRED_KEYS.includes(key))
                .map(key => 
                  key === 'prodCd' ? [key, data[key].split('/')[0]] : [key, data[key]]
                )
            )
          );

          resolve({data: required_data, more: has_next_page});
        } 
        
        reject(`status[${status}] : ${response_body.data.message}`);
      });
    }
    
  })();
