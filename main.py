from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


class Ticket(BaseModel):
    title: str
    description: str
    status: str


def read_tickets():
    with open("tickets.json", "r") as file:
        return json.load(file)


def save_tickets(tickets):
    with open("tickets.json", "w") as file:
        json.dump(tickets, file, indent=4)


# CREATE
@app.post("/tickets")
def create_ticket(ticket: Ticket):
    tickets = read_tickets()

    new_id = 1
    for item in tickets:
        if item["id"] >= new_id:
            new_id = item["id"] + 1

    new_ticket = {
        "id": new_id,
        "title": ticket.title,
        "description": ticket.description,
        "status": ticket.status
    }

    tickets.append(new_ticket)
    save_tickets(tickets)

    return {"message": "Ticket created successfully"}


# READ
@app.get("/tickets")
def get_tickets():
    return read_tickets()


# UPDATE
@app.put("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, updated_ticket: Ticket):
    tickets = read_tickets()

    for ticket in tickets:
        if ticket["id"] == ticket_id:
            ticket["title"] = updated_ticket.title
            ticket["description"] = updated_ticket.description
            ticket["status"] = updated_ticket.status

            save_tickets(tickets)
            return {"message": "Ticket updated successfully"}

    return {"message": "Ticket not found"}


# DELETE
@app.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: int):
    tickets = read_tickets()

    for ticket in tickets:
        if ticket["id"] == ticket_id:
            tickets.remove(ticket)
            save_tickets(tickets)
            return {"message": "Ticket deleted successfully"}

    return {"message": "Ticket not found"}
