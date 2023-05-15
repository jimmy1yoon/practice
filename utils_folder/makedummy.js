let campaignData = {
    "metrics": [
        "impressions",
        "clicks",
        "costs",
        "landings",
        "pageviews",
        "visits",
        "bounces",
        "conversions",
        "revenue",
        "cancels",
        "cancel_values"
    ],
    "records": [
        {
        "date": "", 
        "values": []
        }
    ]
    };
    
function makeRandvalues(){
    let indexs = new Set();
    while(1) {
        indexs.add(parseInt(Math.random() * 1001));
        if(indexs.size == 11) break;
    }
    return Array.from(indexs);
}

function makeRecordsObj(date){
    let recordsObj = {};
        recordsObj.date=date.toString();
        recordsObj.value=makeRandvalues();
    return recordsObj;
}

function makeRecordsArray(){
    let RecordsArray = [];

    for (let i = 1; i <= 31; i++) {
        let day = (i < 10) ? `2023-01-0${i}` : `2023-01-${i}`;
    RecordsArray.push(makeRecordsObj(day));
    }
    return RecordsArray;
}

console.log(makeRecordsArray());