<?php


if (!isset($_SESSION)) {
  session_start();
}

include_once("connection.php");
$con = connection();

if (isset($_POST['login'])) {

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";

  $user = $con->query($sql) or die($con->error);
  $row = $user->fetch_assoc();
  $total = $user->num_rows;

  if ($total > 0) {
    $_SESSION['UserLogin'] = $row['username'];
    $_SESSION['Access'] = $row['access'];

    echo header("Location: index.php");
  } else {
    echo "<h1>No User Found</h1>";
  }

}
if (isset($_POST['cancelbtn'])) {
  echo header("Location: index.php");
}
?>




<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Login</title>
  <link rel="stylesheet" href="bootstrap.css">
  <link rel="stylesheet" href="bootstrap.min.css">
  <link rel="stylesheet" href="bootstrap-grid.css">
  <link rel="stylesheet" href="bootstrap-utilities.css">
  <link rel="stylesheet" href="bootstrap-reboot.css">
  <link rel="stylesheet" href="login.css">
  <script>
    src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"
  </script>

</head>

<body>
  <br><br>
  <form action="" method="post">

    <div class="container">
      <div class="row">
        <div class="col">
          <!-- nothing -->
        </div>
        <div class="col login">
          <center>
            <h2>Login</h2>
          </center>
          <label for="username"><b>Username</b></label>
          <input type="text" placeholder="Enter Username" name="username" id="username">

          <label for="password"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="password" id="password">
          <button type="submit" name="login" id="login">Login</button>
        

        <div class="container d text-center">
          <button type="submit" name="cancelbtn" id="cancelbtn" class="cancelbtn" value="cancelbtn">Cancel</button>
        </div>
      </div>
    </div>
  </form>


</body>

</html>