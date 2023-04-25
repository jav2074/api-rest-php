<?php
include_once "cors.php";

header("HTTP/1.1 200 OK");

if($_SERVER['REQUEST_METHOD'] == 'GET')
{
  
    echo json_encode(array("message" => "Hola GET"));
}

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
  
    echo json_encode(array("message" => "Hola POST"));
}

?>