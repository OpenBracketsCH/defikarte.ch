<?php
$errors = '';
$myemail = 'chrigi@chnuessli.ch';//<-----Put Your email address here.
if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['place'])
   empty($_POST['opening_hours'])  
   )
{
    $errors .= "\n Bitte fülle alle Pflichtfelder aus.";
}

$reporter = $_POST['reporter']; 
$email_address = $_POST['email']; 
$place = $_POST['place'];
$defi_location = $_POST['defi_location'];
$access = $_POST['access'];
$indoor = $_POST['indoor'];
$opening_hours = $_POST['opening_hours'];
$description = $_POST['description'];      
$operator = $_POST['operator'];
$operator_phone = $_POST['operator_phone'];  

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))

{

$to = $myemail;

$email_subject = "Neue Meldung auf Defikarte.ch von: $reporter";

$email_body = "Hier ist ein neuer Defibrillator um in die Karte aufgenommen zu werden: ".

"Name: $reporter \n "
"Email: $email_address\n "
"Ort: $place\n"
"Defibrillator Standort: $defi_location\n"
"Zugang: $access\n"
"Im Gebäude: $indoor\n"
"Öffnungszeiten: $opening_hours\n"
"Beschreibung: $description\n"   
"Betreiber: $operator\n"
"Telefon Betreiber: $operator_phone\n";

$headers = "From: $myemail\n";

$headers .= "Reply-To: $email_address";

mail($to,$email_subject,$email_body,$headers);

//redirect to the 'report_success' page

header('Location: report_success.html');

}
?>