HELP DESK SYSTEM - RUN INSTRUCTIONS

1. Open the HelpDeskSystem folder in VS Code.
2. Open a terminal in the main HelpDeskSystem folder.
3. Create a virtual environment:
   python -m venv venv
4. Activate it in Windows PowerShell:
   .\venv\Scripts\Activate.ps1
5. Install packages:
   pip install fastapi uvicorn
6. Start the backend:
   uvicorn main:app --reload
7. Open frontend/index.html with VS Code Live Server.

FastAPI documentation:
http://127.0.0.1:8000/docs

The project uses tickets.json for storage. Keep the backend terminal running
while using the frontend.
