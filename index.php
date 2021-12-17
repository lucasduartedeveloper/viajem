<?php 
$file = "contador.txt";
// Arquivo texto para manter o valor da variável

$handle = fopen($file, 'r+');
// Definimos o arquivo, as permissões para ler e escrever, por isso o pârametro r+ (ler e escrever)

$data   = fread($handle, 512);
// obtém o valor que está no arquivo contador.txt

$contar = $data + 1;
// Adiciona +1

print "número: ".$contar;
// Exibe na tela o valor encontrado no arquivo TXT

fseek($handle, 0);
// O ponteiro volta para o início do arquivo

fwrite($handle, $contar);
// Salva o valor da variável contar no arquivo

fclose($handle);
// Fecha o arquivo
?>


<!DOCTYPE html>
<html>
<head>

<script>
// Set the date we're counting down to
var countDownDate = new Date("Dec 23, 2021 20:55:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "dias " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);
</script>

<style>
html, body {
    height: 100%;
    font-size: 30px;
    font-weight: 900;
    background-image: url("https://viajem.herokuapp.com/img/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #fff;
    opacity: 0.6;
}
</style>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title></title>
</head>
<body>

<div class="box">
    <!-- Display the countdown timer in       an element -->
    <p><?=$contar?> visitas</p>
    <p id="demo"></p>
</div>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>