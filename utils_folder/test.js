

let test = 'Impressions\tclicks\tcosts\tlandings\tpageviews\tvisits\tbounces\tconversions\trevenue\tcancels\tcancel_values\n1\t2\t3\t4\t5\t6\t7\t8\t9\t10\t11\n1\t2\t3\t4\t5\t6\t7\t8\t9\t10\t11'
let pu = []

let [header,content] = test.replace('\n','$').split('$')

console.log(content)
