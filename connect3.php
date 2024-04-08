<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $conn = new mysqli('localhost', 'root', '', 'test');
    if ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    } else {
        $stmt = $conn->prepare("INSERT INTO login (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $password);
        $execval = $stmt->execute();
        $stmt->close();
        $conn->close();

        if ($execval) {
            // Redirect to index.html after successful sign-in
            header("Location:plants.html");
            exit(); // Ensure that no further code is executed after the redirection header
        } else {
            echo '<script>alert("Error: Order placement failed.");</script>';
        }
    }
}
?>
