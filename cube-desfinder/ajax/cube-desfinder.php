<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["xyz"])) {

    $xyz = htmlspecialchars($_POST["xyz"]);
    $sql = "UPDATE param SET valor='".$xyz."' WHERE nome='xyz';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;

    $sql = "UPDATE param SET valor='".$xyz."' WHERE nome='xyz';";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else {
    $sql = "SELECT * FROM param WHERE nome='xyz' OR nome='xyz' ORDER BY id;";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rowCount = $stmt->rowCount();
    $details = $stmt->fetchAll(); 

    echo json_encode($details);
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