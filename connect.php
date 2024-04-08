<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $firstname = $_POST['firstname'];
      $lastname = $_POST['lastname'];
      $email = $_POST['email'];
      $number = $_POST['number'];
      $address = $_POST['address'];
      $payment_method	 = $_POST['payment_method'];
      $quantity = $_POST['quantity'];

      $conn = new mysqli('localhost', 'root', '', 'test');
      if ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
      } else {
        $stmt = $conn->prepare("INSERT INTO orders (firstname, lastname, email, number, address, payment_method	, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssi", $firstname, $lastname, $email, $number, $address, $payment_method, $quantity);
        $execval = $stmt->execute();
        $stmt->close();
        $conn->close();

        if ($execval) {
          echo '<script>alert("Order placed successfully.");</script>';
        } else {
          echo '<script>alert("Error: Order placement failed.");</script>';
        }
      }
    }
  ?>