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

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- <link rel="stylesheet" href="css/normalizee.css"> -->
<link rel="stylesheet" href="css/style.css?v=11">

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<div>
</fiv>

<div style="display:none;">
     <span id="timer">20</span>
</div>

<div class="line">
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="johrei-data" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    CARREGANDO...
  </button>
  <div id="johrei-menu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  </div>
</div>
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="nome" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    NOMES
  </button>
  <div id="nome-menu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  </div>
</div>
</div>

<p id="title">
     JOHREI
</p>
<div>
     <span id="counter">0</span>
</div>

<div class="line">
<button id="minus" type="button" class="btn btn-warning">
     <i class="bi bi-person-dash-fill"></i>
     Desapareu
</button>
<button id="plus" type="button" class="btn btn-warning">
     <i class="bi bi-person-plus-fill"></i>
     Concluído
</button>
</div>

<p id="version-info">
     JOHREI COUNTER v11.0.54 *pudim falante
     <br>
     <span id="server-info">
     CONNECTING...
     </span>
</p>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js"
        crossorigin="anonymous"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://kit.fontawesome.com/147bb12bad.js" crossorigin="anonymous"></script>

<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>

<script src="script/websocket.js?v=0"></script>
<script src="script/johrei_counter.js?v=54"></script>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 