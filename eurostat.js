/**
https://ec.europa.eu/eurostat/web/json-and-unicode-web-services/getting-started/query-builder
The Eurostat uses JSONstat format https://json-stat.org/format/#value
The https://cdn.jsdelivr.net/npm/jsonstat@latest/json-stat.js library can be used on the front end to create a table.
e.g.: var j = JSONstat('http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/une_rt_m?precision=1&sex=F&sex=M&sex=T&lastTimePeriod=12&unit=PC_ACT&unit=THS_PER&s_adj=SA&age=TOTAL');
j.toTable()
In the back-end the function below creates the table without the values.
*/


function rec(lists, output, original_lists_length){
   for(var n of lists[0]){

     output[original_lists_length - lists.length] = n;
   
     if(lists.slice(1).length > 0){
        rec(lists.slice(1), output, original_lists_length);
     }else{
        result.push(output.slice());
     }
   }
 
}

var data = 'response from Eurostat API';

var lists = Object.values(data.dimension).map(x=> Object.values(x.category.label));
var result = [];
var blank_array = new Array(lists.length).fill(0)

rec(lists, blank_array, lists.length);

console.log(result);
