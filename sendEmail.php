<?php
$errors = '';

if( empty( $errors ) ) {

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $from_email     = $request->email;
    $tel            = $request->tel;
    $from_name      = $request->name;
    $message        = $request->message;
    $entreprise     = $request->entreprise;

    $to_email = $from_email;

    $contact = "<p><strong>Nom : </strong> $from_name</p><p><strong>Email : </strong> $from_email</p>";
    $content = "<p><strong>Nom Entreprise : </strong>$entreprise</p><p><strong>Tel : </strong>$tel</p><p>$message</p>";

    $website = "Thirsty Studios";
    $email_subject = "Contact Form";

    $email_body = "<html><body>";
    $email_body .= "$contact $content";
    $email_body .= "</body></html>";

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    $headers .= "From: maxence.puppetto@gmail.com\n";
    $headers .= "Reply-To: $from_email";

    mail( "maxence.puppetto@gmail.com", $email_subject, $email_body, $headers );

    $response_array['status'] = 'success';
    $response_array['from'] = $from_email;
    echo json_encode( $response_array );

} else {

    $response_array['status'] = 'error';
    echo json_encode($response_array);
}
?>