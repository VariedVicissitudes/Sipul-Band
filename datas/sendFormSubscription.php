		<?php
				$mail = strip_tags($_POST['mail']);
				$checkRobot = strip_tags($_POST['checkRobot']);

				// Text to send
				$texte = "Hi there,<br /><br />";
				$texte = $texte . "Inscription from Sipul.Band.<br />";
				$texte = $texte . "The elements entered in the form are as follows :<br />";
				$texte = $texte . "Email :  $mail<br /><br />";
				$texte = $texte . "This is an automatic message, do not reply to it.";

				$texte = stripslashes($texte);

				/// Recipient and subject of the message
				$destinataire = "Contact@Sipul.Band"; // input your email here
				$objet = "Newsletter subscription from Sipul.Band"; // input your domain name here

				//Headers
	      $headers = array(
	                      'Content-type' => 'text/html',
	                      'From' => 'Contact@Sipul.Band', // input your email from here
	                      'X-Mailer' => 'PHP/' . phpversion()
	                  );

				// Send the message then return data to current page with ajax
				if ($checkRobot == 7) {
					$conf = ini_set('mail', 'smtp.mail.me.com'); // update yours informations here
					$sending_ok = mail($destinataire, $objet, $texte, $headers);
					if ($sending_ok) {
							echo "<p class=\"hardLight\">Thank you for your registration !</p>";
						}
					else {
							echo "<p class=\"hardLight\">There seems to be a problem ...</p>";
						}

				} else {
					echo "<p class=\"hardLight\">There seems to be a problem with the anti robot control ...</p>";
				}
