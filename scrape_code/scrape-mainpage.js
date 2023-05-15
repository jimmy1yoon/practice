(function() {

  // https://shop.samsung.com.cn/ scrape Code
  
// 아래의 코드를 chrome 콘솔에 붙여넣어서 실행하면 됩니다.
// 실행결과 scrape_mainpage_현재시간.json, .tsv 두가지 파일이 다운로드 됩니다.  

  const sectionId = ['smartphone-tablet','wearables','tv-av','smart-home-appliances','office-storage'];
  const required_keys = ['product-item-t1','product-item-t2','miaosha-xj','product-yj'];

  // section별 querySelector로 product를 scrape and return array
  function querySelectorBysection(sectionitem){
      const contents = Array.from(document.querySelectorAll(`#${sectionitem} .products-item`))
        .map((content) => content.textContent);
      return contents 
  }

  /** 
   * parse product text(string)
   * @returns object
   * */ 
  function parse_data(texts){
    let [dummy,title, token] = texts.split('\n');
    let [sku,price,discount] = token.split('¥');
    // let text_pattern = /(?<title>.+)?\n(?<sku>.+)?\s¥(?<price>[,\.\d]+)?\s¥(?<discount>[,\.\d]+)?.*/;
    // let match = text_pattern.exec(texts);
    // TODO: 정규표현식이 아니라 split 함수를 사용한 이유  
    // parse 해야하는 텍스트의 경우의 수 4가지를 모두 정규표현식으로 커버하기가 어려워서 split을 사용하였습니다. 
    
    return {
      title: title.trim(),
      sku:  sku.trim() || NaN,
      price: parseInt(price || '0'), 
      discount: parseInt(discount || '0')
    }

  }
  /**
   * querySelector by section and 
   * @returns object (Ex:{'section':[{obj},{obj}...]})
   */
  function retrieveContents() {
    return sectionId.reduce((contents_object, sectionid) => {
      const contents = querySelectorBysection(sectionid);
      contents_object[sectionid] = contents.reduce((agg, texts) => {
        agg.push(parse_data(texts));
        return agg;
      }, []);
      return contents_object;
    }, {});
  }

  /** content(array) to json
   * @returns JSON
   * */ 
  function contentTojson(){
    return JSON.stringify(retrieveContents(), null, -1);
  }

  /** content(object) to array and add sectionid columns 
   * @returns Array
  */
  function contentToarray(){
    let content = retrieveContents();
    let contentArray = [];
    contentArray.push(required_keys.concat('category'));
    sectionId.forEach(secId => {
      content[secId].forEach(entity => {
        contentArray.push(Object.values(entity).concat(secId));
      })
    });
    return contentArray;
  }

  /** make array for .tsv
   * @returns Array 
   * */
  function arrayTotsv(Array){
    var lineArray = [];
    Array.forEach(function (infoArray, index) {
        var line = infoArray.join("\t");
        lineArray.push(index == 0 ? "data:text/tsv;charset=utf-8," + line : line);
    });
    var tsvContent = lineArray.join("\n");
    return tsvContent;
  }

  // make tsv
  var contentArray = contentToarray();
  var contentTsv = arrayTotsv(contentArray);

  // make Json
  const contentJson = contentTojson();

  /** download in chrome console */
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  // Reference https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server/18197341#18197341

  // check time
  function nowDay(){
    const now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    return `${year}${month}${day}`
  }

  download(`scrape_mainpage_${nowDay()}.json`,contentJson);
  download(`scrape_mainpage_${nowDay()}.tsv`,contentTsv);
})();
