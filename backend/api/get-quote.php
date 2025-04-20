<?php
// Database connection details
$host = 'localhost';
$dbname = 'derot';
$dbusername = 'root';
$dbpassword = '';

// Start a session to store the last quote
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Create a new PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the last quote from the session (if it exists)
    $lastQuote = isset($_SESSION['last_quote']) ? $_SESSION['last_quote'] : null;

    // Query to get a random quote, excluding the last one
    if ($lastQuote) {
        $stmt = $pdo->prepare("SELECT quote FROM quotes WHERE quote != :lastQuote ORDER BY RAND() LIMIT 1");
        $stmt->bindParam(':lastQuote', $lastQuote, PDO::PARAM_STR);
    } else {
        $stmt = $pdo->query("SELECT quote FROM quotes ORDER BY RAND() LIMIT 1");
    }

    // Execute the query
    $stmt->execute();
    $quote = $stmt->fetch(PDO::FETCH_ASSOC);

    // Store the current quote in the session
    $_SESSION['last_quote'] = $quote['quote'];

    // Return the quote as JSON
    header('Content-Type: application/json');
    echo json_encode($quote);

} catch (PDOException $e) {
    // Handle connection errors
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>