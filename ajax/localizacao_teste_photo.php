<?php include ('../config/db.php')?>
<?php
$sql ="";
try {
  
  if (!empty($_POST["png"])) {

    $png = htmlspecialchars($_POST["png"]);
    $nome = htmlspecialchars($_POST["nome"]);

    $sql = "INSERT INTO localizacao_teste (nome, png, latitude, longitude,base64) VALUES ('".$nome."','base64',0,0,'".$png."')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
   echo $sql;
}
catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
    echo $sql;
}
?>