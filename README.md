# Waiting-System
A waiting system for avoiding time wastage.

## What is it?
A simple website that works with two pages:
1. A page for the person in the office
2. A page for those wishing to talk to the person

## How does it work?
When a person wishes to talk to the official in the office, they will submit a request on the 2nd page, along with their name and an optional short description of why they are there.
The official inside the office will get a ping on their desktop and upon visiting their page they'll see an option to ask them to enter or return later (with an optional dropdown showing how much later to return: 15 mins, 30 mins, etc.) or just say they're busy right now and not give a time to come later.
The person outside gets a ping on their device too when the official tells them to either come later or come in. 
If they are asked to come later, after the time selected has elapsed - a message will appear on the official's screen asking to either ask the user to come back or cancel their 'later'. In both cases, the users will receieve a notifcation with what has been decided.

## Setting up the Python backend
1. Install Python 3.8 or higher.
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```
4. Install the required packages:
   ```
   pip install -r backend/requirements.txt
   ```
5. Run the Flask application:
   ```
   python backend/app.py
   ```

## Setting up the front-end
1. Open the `frontend/index.html` file in a web browser.
2. Ensure that the `frontend/styles.css` and `frontend/scripts.js` files are in the same directory as `index.html`.

## Enabling dark mode
1. Click the dark mode toggle button on the front-end interface.
2. The front-end will switch to dark mode.
3. To switch back to light mode, click the toggle button again.
