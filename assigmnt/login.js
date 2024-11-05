
function validate() {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;

    // Check if user and pass are equal to "admin" and "12345"
    if (user === "admin" && pass === "12345") {
        console.log(user);
        list(); // Load the todo list on successful login
        return true;
    } else {
        alert("Invalid username or password!");
        return false;
    }
}

// Function to fetch and display todos with checkboxes
function list() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);  // Parse the response

            let output = '<table class="table table-bordered"><thead><tr><th>Title</th><th>Status</th></tr></thead><tbody>';

            // Loop through the data and create table rows with checkboxes
            for (let i = 0; i < data.length; i++) {
                // Determine if the checkbox should be checked or disabled
                let checked = data[i].completed ? 'checked' : ''; // Mark checkbox as checked if completed
                let disabled = data[i].completed ? 'disabled' : ''; // Disable the checkbox if completed

                output += `<tr>
                            <td>${data[i].title}</td>
                            <td>
                                <input type="checkbox" 
                                       ${checked} 
                                       ${disabled} 
                                       onchange="toggleStatus(${i})" 
                                       id="checkbox-${i}">
                            </td>
                           </tr>`;
            }

            output += '</tbody></table>';  // Close the table tags

            // Insert the table into the DOM
            document.getElementById('todo-table').innerHTML = output;
        }
    };
}

// Counter for completed tasks (checkboxes)
let completedCount = 0;

// Function to handle checkbox changes and track completed tasks
function toggleStatus(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    const isChecked = checkbox.checked;

    // Update the count of completed tasks
    if (isChecked) {
        completedCount++;
    } else {
        completedCount--;
    }

    // Check if exactly 5 tasks have been completed
    if (completedCount === 5) {
        alert("Congratulations! You have completed 5 tasks.");
    }

    console.log(`Task ${index} checked: ${isChecked}`);
}
