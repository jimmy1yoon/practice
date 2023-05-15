
<?php

$args = ['system','viewer'];

$names = sprintf("(%s)", implode(',', array_map(function($n) {
    return "\"$n\"";
}, $args)));


$tt = ['code', list($names), 'IN'];
echo ($tt);

?>