<?php include ('config/db.php')?>
<?php include ('config/config.php')?>

<?php
try {
  $sql = "SELECT valor FROM param WHERE nome='contador_visitas';";
  //echo $sql;
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  $rowCount = $stmt->rowCount();
  $details = $stmt->fetch(); 
  $contar = intval($details->valor)+1;
  
  $sql = "UPDATE param SET valor='".strval($contar)."' WHERE nome='contador_visitas';";
   //echo $sql;
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
}
catch (PDOException $e) {
   echo 'Connection failed: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html>
<head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="76x76" href="webapp/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="webapp/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="webapp/favicon-16x16.png">
<link rel="manifest" href="webapp/site.webmanifest?v=0">
<link rel="mask-icon" href="webapp/safari-pinned-tab.svg" color="#2f2e40">
<meta name="msapplication-TileColor" content="#2f2e40">
<meta name="theme-color" content="#2f2e40">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

<link rel="stylesheet" href="css/style.css?v=140">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div id="map" class="box">
</div>

<div id="box1" class="box1">
     <!--  -->
    <button id="reset" type="button" class="btn btn-dark btn-sm">
    <i class="bi bi-plug-fill"></i>
    Reset
    </button>
    <button id="auto" class="btn btn-dark btn-sm">
    <i class=""></i>
    </button>

    <div id="inventario" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>

     <p  class="velocidade" class="contador">0 cm/s</p>
     <p  class="distancia" class="contador">0 m</p>
</div>

<div id="box2" class="box2">
    <p id="nome" class="local">PONTOS</p>
    <div id="teste1" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <div id="teste2" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <div id="teste3" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <div id="teste4" class="btn-group btn-group-toggle" data-toggle="buttons">
    </div>
    <p id="horas"></p>
</div>

<div id="box3" class="box3">
   <p></p>
    <p class="contador">PIX</p>
    <img  class="logo" src="img/qr_code_pix.jpg"/>
    <p class="contador"><?=$contar?> visitas</p>
    <div class="info-box">
    <p id="local-info" class="info">geolocation: 
        <i class="bi bi-check-square"></i></p>
    <p id="motion-info" class="info">devicemotion: 
        <i class="bi bi-check-square"></i></p>
    <p id="light-info" class="info">ambientlight: 
        <i class="bi bi-check-square"></i></p>
     </div>
</div>

<div id="box4" class="box3">
    <p class="contador">マップブラザーズ</p>
    <p class="contador">v140.143.734 final*</p>
    <img id="front" class="front" src="img/logo-v3.png"/>
    <div hidden class="typing-wrapper"></div>
     <p  class="velocidade" class="contador">0 cm/s</p>
     <img id="line" class="line" src="img/line-v2.png"/>
     <p  class="distancia" class="contador">0 m</p>
</div>

<div id="box5" class="box3">
    <p class="contador">ルール</p>
    <div class="chat-history" style="padding: 20px">
         <p class="contador">1. レベルを通過するポイントの量を取得します</p>
         <p class="contador">2. フェーズごとに3つのエラーが発生する可能性があります</p>
         <p class="contador">3. 戦いをやめなさい</p>
         <p class="contador">4. すぐに戻ってきます</p>
    </div>
</div>

<img id="menu" class="my-float" src="img/parafuso.png"/>
<!-- 
<i id="menu" class="bi bi-arrow-down-circle my-float"></i>
 -->

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js"
        crossorigin="anonymous"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="websocket.js?v=2"></script>
<script src="script.js?v=143"></script>
<script src="geolocation.js?v734"></script> 

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 