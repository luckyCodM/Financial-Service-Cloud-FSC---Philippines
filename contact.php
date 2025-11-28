<?php
if (isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['message'])) {
    
    $first_name = htmlspecialchars(strip_tags($_POST['first_name']));
    $last_name = htmlspecialchars(strip_tags($_POST['last_name']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags($_POST['phone']));
    $message = htmlspecialchars(strip_tags($_POST['message']));
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo '<script>alert("Invalid email address."); window.location.href = "contact.html";</script>';
        exit;
    }

    $full_message = "Name: $first_name $last_name\r\nEmail: $email\r\nPhone: $phone\r\nMessage: $message";
    $subject = "New Contact Form Submission";
    $fromname = "cod-m-website-tailwind.vercel.app";
    $fromemail = $email;  // Use your domain email to avoid spam filters
    $mailto = "lucky.singh@codmsoftware.com";
    
    $headers = "From: $fromname <$fromemail>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($mailto, $subject, $full_message, $headers)) {
        header("Location: index.html");
        exit;
    } else {
        echo "Mail send failed!";
    }
} else {
    echo '<script>alert("Please fill in all required fields."); window.location.href = "contact.php";</script>';
}
?>
