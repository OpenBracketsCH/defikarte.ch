<?php
    $reporter = strip_tags(htmlspecialchars($_POST['reporter'])); 
    $email_address = strip_tags(htmlspecialchars($_POST['email'])); 
    $place = strip_tags(htmlspecialchars($_POST['place'])); 
    $defi_location = strip_tags(htmlspecialchars($_POST['defi_location']));
    $access = strip_tags(htmlspecialchars($_POST['access'])); 
    $indoor = strip_tags(htmlspecialchars($_POST['indoor'])); 
    $opening_hours = strip_tags(htmlspecialchars($_POST['opening_hours'])); 
    $description = strip_tags(htmlspecialchars($_POST['description'])); 
    $operator = strip_tags(htmlspecialchars($_POST['operator'])); 
    $operator_phone = strip_tags(htmlspecialchars($_POST['operator_phone']));

    if (!preg_match(
    "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
    $email_address));
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))

{
    $to = 'chrigi@chnuessli.ch';

    $email_subject = "Neue Meldung auf Defikarte.ch von: $reporter";


    $email_body = "Hier ist ein neuer Defibrillator um in die Karte aufgenommen zu werden:\n";
    "Name: $reporter\n
    Email: $email_address\n
    Ort: $place\n
    Defibrillator Standort: $defi_location\n
    Zugang: $access\n
    Im Gebäude: $indoor\n
    Öffnungszeiten: $opening_hours\n
    Beschreibung: $description\n
    Betreiber: $operator\n
    Telefon Betreiber: $operator_phone\n";

    $headers = "From: info@defikarte.ch\n";

    $headers .= "Reply-To: $email_address";

    mail($to,$email_subject,$email_body,$headers);

//redirect to the 'report_success' page

    header('Location: ../report_success.html');

}

$errors = '';
$myemail = 'chrigi@chnuessli.ch';//<-----Put Your email address here.
if(empty($_POST['reporter'])  || 
   empty($_POST['email']) || 
   empty($_POST['place']) || 
   empty($_POST['opening_hours']))
{
    $errors .= "\n Bitte fülle alle Pflichtfelder aus.";
}
?>