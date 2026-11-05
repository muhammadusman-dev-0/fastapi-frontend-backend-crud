const API = "http://127.0.0.1:8000/tickets";


// READ
function getTickets() {
    fetch(API)
        .then(response => response.json())
        .then(tickets => {
            let output = "";

            tickets.forEach(ticket => {
                output += `
                    <div class="ticket">
                        <h3>${ticket.title}</h3>
                        <p>${ticket.description}</p>
                        <p>Status: ${ticket.status}</p>

                        <div class="ticket-actions">
                            <button onclick="updateTicket(${ticket.id})">Update</button>
                            <button class="delete" onclick="deleteTicket(${ticket.id})">Delete</button>
                        </div>
                    </div>
                `;
            });

            if (tickets.length === 0) {
                output = "<p>No tickets found.</p>";
            }

            document.getElementById("ticketList").innerHTML = output;
        });
}


// CREATE
function addTicket() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let status = document.getElementById("status").value;

    if (title === "" || description === "") {
        alert("Please enter title and description");
        return;
    }

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            status: status
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);

            document.getElementById("title").value = "";
            document.getElementById("description").value = "";

            getTickets();
        });
}


// UPDATE
function updateTicket(id) {
    let title = prompt("Enter new title:");
    if (title === null || title.trim() === "") return;

    let description = prompt("Enter new description:");
    if (description === null || description.trim() === "") return;

    let status = prompt("Enter status: Open, In Progress, or Resolved");
    if (status === null || status.trim() === "") return;

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            status: status
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getTickets();
        });
}


// DELETE
function deleteTicket(id) {
    fetch(`${API}/${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getTickets();
        });
}


// Load tickets when page opens
getTickets();
