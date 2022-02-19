<?php include ('config/db.php')?>
<?php
$sql ="";
try {
  if (isset($_POST["cameraId"])  ) {

    $cameraId = htmlspecialchars($_POST["cameraId"]);
    $base64 = htmlspecialchars($_POST["base64"]);

    $sql = "INSERT INTO camera_frame (camera_id,base64) VALUES (".$cameraId.",'".$base64."');";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    echo $sql;
  }
  else if (isset($_GET["cameraId"])) {

    $cameraId = htmlspecialchars($_GET["cameraId"]);
    $sql = "SELECT * FROM camera_frame WHERE cameraId=".$cameraId.";";

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