<?php
include "cors.php";
include "config.php";
include "utils.php";


$dbConn =  connect($db);

/*
  listar todos los posts o solo uno
 */
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
  if (isset($_GET['id']))
  {
    //Mostrar un post
    $sql = $dbConn->prepare("SELECT * FROM amptest where id=:id");
    $sql->bindValue(':id', $_GET['id']);
    $sql->execute();
    header("HTTP/1.1 200 OK");
    header('Content-type: application/json');
    echo json_encode(  $sql->fetch(PDO::FETCH_ASSOC)  );
    exit();
  }
  else 
  {
    //Mostrar lista de post
    $sql = $dbConn->prepare("SELECT * FROM amptest");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    header('Content-type: application/json');
    echo json_encode( $sql->fetchAll()  );
    exit();
  }
}

// Crear un nuevo post
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
  if (isset($_GET['userid']))
  {
    $input['like'] = $_GET['like'];
    $input['userid'] = $_GET['userid'];

    $sql = "INSERT INTO amptest 
          (like_, userid)
          VALUES
          (:like, :userid)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $postId = $dbConn->lastInsertId();
    if($postId)
    {
      $input['id'] = $postId;
      header("HTTP/1.1 200 OK");
      header('Content-type: application/json');
      echo json_encode($input);
      exit();
    }
  }
  else
  {
    $input = $_POST;
    $sql = "INSERT INTO amptest 
          (like_, userid)
          VALUES
          (:like, :userid)";
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    $postId = $dbConn->lastInsertId();
    if($postId)
    {
      $input['id'] = $postId;
      header("HTTP/1.1 200 OK");
      header('Content-type: application/json');
      $result['result'] = $input;
      echo json_encode($result);
      exit();
    }
  }
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
	$id = $_GET['id'];
  $statement = $dbConn->prepare("DELETE FROM amptest where id=:id");
  $statement->bindValue(':id', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
}

//Actualizar
if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
  $input = $_GET;
  $postId = $input['id'];
  $fields = getParams($input);

  $sql = "
        UPDATE amptest
        SET $fields
        WHERE id='$postId'
        ";

  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $input);

  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 400 Bad Request");

?>