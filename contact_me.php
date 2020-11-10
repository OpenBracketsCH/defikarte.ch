<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
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
	
// Create the email and send the message
$to = 'chrigi@chnuessli.ch'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@chnuessli.ch"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>
