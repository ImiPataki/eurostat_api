<?php

$data = file_get_contents('http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/une_rt_m?precision=1&sex=F&sex=M&sex=T&lastTimePeriod=12&unit=PC_ACT&unit=THS_PER&s_adj=SA&age=TOTAL');

$data = json_decode($data, 1);

function rec($dimensions, $output, $original_dimensions_length)
{
    global $result;
    foreach($dimensions[0] as $n)
   {
       $output[$original_dimensions_length - count($dimensions)] = $n;

     if(count(array_slice($dimensions, 1)) > 0)
     {
         rec(array_slice($dimensions, 1), $output, $original_dimensions_length);
     }
     else
     {
         array_push($result, array_slice($output, 0));
     }
   }
}


function map_func($v){
    return array_values($v['category']['label']);
}

$dimensions = array_map('map_func', array_values($data['dimension']));
$result = [];
$blank_array = array_fill(0, count($dimensions), 0);

rec($dimensions, $blank_array, count($dimensions));

print_r($result);

?>
