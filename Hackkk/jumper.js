
// Initialize Chart.js
const ctx = document.getElementById('consumptionChart').getContext('2d');
const consumptionChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Total kWh Consumed',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3,
            fill: false,
        }],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'kWh',
                },
            },
        },
    },
});

let meterData = []; // Stores the input data

// Function to add user input data
function addData() {
    const dateInput = document.getElementById('date').value;
    const kwhInput = document.getElementById('kwh').value;

    if (!dateInput || !kwhInput) {
        alert('Please fill in both fields!');
        return;
    }

    // Store the new data point
    meterData.push({ date: dateInput, kwh: parseFloat(kwhInput) });

    // Sort the data by date
    sortMeterDataByDate();

    // Update table and chart
    updateTable();
    updateChart();
}
function sortMeterDataByDate() {
    meterData.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Function to update the chart
function updateChart() {
    const dates = meterData.map(data => data.date);
    const kwhValues = meterData.map(data => data.kwh);

    consumptionChart.data.labels = dates;
    consumptionChart.data.datasets[0].data = kwhValues;
    consumptionChart.update();
}

// Function to update the data table
// Function to update the data table
function updateTable() {
    // Sort the data by date before displaying
    sortMeterDataByDate();
    
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    meterData.forEach((data, index) => {
        const row = tableBody.insertRow();
        const dateCell = row.insertCell(0);
        const kwhCell = row.insertCell(1);
        const trendCell = row.insertCell(2);
        const actionCell = row.insertCell(3);

        dateCell.textContent = data.date;
        kwhCell.textContent = data.kwh;

        //Trend Cell Data
        trendCell.className = 'trend';


        // Calculate the percentage change
        
        let percentageChangeData = 0;
        if (index > 0) {
            const previousMonthKWH = meterData[index - 1].kwh;
            //if (previousMonthKWH !== 0) {
            //    percentageChangeData = ((data.kwh - previousMonthKWH) / previousMonthKWH) * 100;
            //}
            if (previousMonthKWH !== 0) {
                percentageChangeData = ((data.kwh - previousMonthKWH) / previousMonthKWH);
            }
        }
        

        let monthlchanges

        // Display the percentage change in the trend cell
        if (index === 0) {
            trendCell.textContent = 'same'; // If it's the first entry, set percentage change to 0%
        } else {
            if (percentageChangeData > 0) {
                //trendCell.textContent = percentageChangeData.toFixed(2) + '%' + ' INCREASED'; // Show increase
                trendCell.textContent = percentageChangeData.toFixed(2) + " Increased";
                trendCell.style.color = "green"; // Set the color to green for increase
            } else if (percentageChangeData < 0) {
                //trendCell.textContent = percentageChangeData.toFixed(2) + '%' + ' DECREASED'; // Show decrease
                trendCell.textContent = percentageChangeData.toFixed(2) + " Decreased";
                trendCell.style.color = "red"; // Set the color to red for decrease
            } else {
                //trendCell.textContent = '0%'; // If no change, display 0%
                trendCell.textContent = percentageChangeData.toFixed(2) + ' Same';
                trendCell.style.color = "black"; // Set color to default
            }
        }

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.backgroundColor = "green";
        editButton.onclick = () => editData(index);
        actionCell.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = "red";
        deleteButton.onclick = () => deleteData(index);
        actionCell.appendChild(deleteButton);
    });
}


// Function to edit data
function editData(index) {
    const newDate = prompt("Enter new date:", meterData[index].date);
    const newKwh = prompt("Enter new kWh:", meterData[index].kwh);

    if (newDate && newKwh) {
        meterData[index].date = newDate;
        meterData[index].kwh = parseFloat(newKwh);

        // Update table and chart
        updateTable();
        updateChart();
    }
}

// Function to delete data
function deleteData(index) {
    if (confirm("Are you sure you want to delete this entry?")) {
        meterData.splice(index, 1);

        // Update table and chart
        updateTable();
        updateChart();
    }
}
function percentagechange(index) {
    const previousmonthKWH = meterData[index - 1].kwh;
    if (previousmonthKWH == null) {
        previousmonthKWH = 0;
        percentagechangeData = 0;
    }
    //const percentagechangeData = ((currentmonthKWH - previousmonthKWH) / -previousmonthKWH) * 100;
    const percentagechangeData = ((currentmonthKWH - previousmonthKWH));



    // Update table and chart
    updateTable();
    updateChart();
}