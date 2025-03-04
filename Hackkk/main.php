<?php 
include_once("connection.php");

$con = connection();

$sql = "SELECT * FROM customer1 ORDER BY Type DESC";
$canteen = $con->query($sql) or die($con->error);
$row = $canteen->fetch_assoc();


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meter Tampering Detection</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js">
    </script>
</head>
<body>
    <div class="container">
        <h1>Meter Tampering Detection Tool</h1>

        <div class="input-form">
            <label for="date">Date:</label>
            <input type="date" id="date">
            <label for="kwh">Total kWh:</label>
            <input type="number" id="kwh" placeholder="Enter kWh consumption">
            <button onclick="addData()">Submit</button>
        </div>

        <div class="result">
            <h2>Consumption History</h2>
            <canvas id="consumptionChart"></canvas>

            <h2>Data Table</h2>
            <table id="dataTable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total kWh</th>
                        <th>Trends</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data Table -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="jumper.js"></script>
</body>
</html>
