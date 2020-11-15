<?php charset='utf8';
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['place']) 		||
   empty($_POST['opening_hours'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "Bitte fülle die Pflichtfelder aus.";
	return false;
   }
	
   $name = strip_tags(htmlspecialchars($_POST['name'])); 
   $email_address = strip_tags(htmlspecialchars($_POST['email'])); 
   $place = strip_tags(htmlspecialchars($_POST['place'])); 
   $defi_location = strip_tags(htmlspecialchars($_POST['defi_location']));
   $access = strip_tags(htmlspecialchars($_POST['access'])); 
   $indoor = strip_tags(htmlspecialchars($_POST['indoor'])); 
   $opening_hours = strip_tags(htmlspecialchars($_POST['opening_hours'])); 
   $description = strip_tags(htmlspecialchars($_POST['description'])); 
   $operator = strip_tags(htmlspecialchars($_POST['operator'])); 
   $operator_phone = strip_tags(htmlspecialchars($_POST['operator_phone']));
	
// Create the email and send the message
$to = 'chrigi@chnuessli.ch'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$subject = "Neuer Defibrillator";
$email_body = "Hier ist ein neuer Defibrillator um in die Karte aufgenommen zu werden:\n
Name: $name\n
Email: $email_address\n
Ort: $place\n
Defibrillator Standort: $defi_location\n
Zugang: $access\n
Im Gebäude: $indoor\n
Oeffnungszeiten: $opening_hours\n
Beschreibung: $description\n
Betreiber: $operator\n
Telefon Betreiber: $operator_phone\n";
$headers = "From: info@defikarte.ch"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
//$headers2 .= "Reply-To: $email_address";	
mail($to,$subject,$email_body,$headers);
header('Location: success.html');
return true;
?>
