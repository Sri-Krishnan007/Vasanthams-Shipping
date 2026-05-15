<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Input validation
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $inquiryType = isset($_POST['inquiryType']) ? trim($_POST['inquiryType']) : 'General';

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format."]);
        exit;
    }

    // Sanitize inputs
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $inquiryType = htmlspecialchars($inquiryType, ENT_QUOTES, 'UTF-8');

    // Validate length
    if (strlen($name) < 2 || strlen($name) > 100) {
        echo json_encode(["status" => "error", "message" => "Name must be 2-100 characters."]);
        exit;
    }

    if (strlen($message) < 10 || strlen($message) > 5000) {
        echo json_encode(["status" => "error", "message" => "Message must be 10-5000 characters."]);
        exit;
    }

    // Business email
    $to = "info@vasanthamshipping.com"; // CHANGE THIS TO YOUR EMAIL
    $subject = "New Inquiry - $inquiryType from $name";
    
    $body = "New Inquiry Received\n";
    $body .= "=====================\n";
    $body .= "Type: $inquiryType\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Date: " . date('Y-m-d H:i:s') . "\n\n";
    $body .= "Message:\n";
    $body .= "$message\n\n";
    $body .= "-----\n";
    $body .= "This is an automated message from Vasanthams Shipping website.";

    // Email headers
    $headers = "From: noreply@vasanthamshipping.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        // Send confirmation to customer
        $customerBody = "Dear $name,\n\nThank you for your inquiry. We have received your message and will get back to you shortly.\n\nBest regards,\nVasanthams Shipping Team";
        mail($email, "Inquiry Confirmation - Vasanthams Shipping", $customerBody, $headers);
        
        echo json_encode(["status" => "success", "message" => "Thank you for your inquiry. We will contact you within 24 hours."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error sending message. Please try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>