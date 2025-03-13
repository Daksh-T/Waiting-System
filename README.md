# Waiting-System
A waiting system for avoiding time wastage.

## What is it?
A simple website that works with two pages:
1. A page for the person in the office (official.html)
2. A page for those wishing to talk to the person (index.html)

## How does it work?
When a person wishes to talk to the official in the office, they will submit a request on the visitor page, along with their name and an optional short description of why they are there.

The official inside the office will see the pending request on their page and will have options to:

* Ask the visitor to enter
* Ask them to return later (specifying how many minutes - 15 mins, 30 mins, etc.)
* Indicate they're busy right now
The visitor will receive an alert notification when the official makes a decision. If they are asked to come later, after the specified time has elapsed, they should check back.

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

6. Access the interfaces in your browser:
* Visitor interface: http://localhost:5000/
* Official interface: http://localhost:5000/official.html

## Using the system
### As a visitor:
1. Open http://localhost:5000/ in your browser
2. Fill out the form with your name and request description
3. Submit the request and wait for a notification
4. When notified, follow the official's instructions (enter or return later)
### As an official:
1. Open http://localhost:5000/official.html in your browser
2. View the list of pending requests
3. For each request, choose to:
* Ask them to enter (approve)
* Ask them to come back later (specify minutes)
* Indicate you're busy (reject)


## Enabling dark mode
1. Click the dark mode toggle button on the interface.
2. The interface will switch to dark mode.
3. To switch back to light mode, click the toggle button again.

## Error Handling in the Backend
The backend includes error handling and validation to improve robustness. Invalid JSON data and missing required fields will result in appropriate error messages being returned to the client. Additionally, exceptions are handled gracefully, and user-friendly error messages are provided.

## UI Enhancements and Dark Mode Refinements
The front-end UI has been improved for a better user experience. The form design has been enhanced with better spacing and alignment. Loading indicators have been added for form submission to provide feedback to the user. The dark mode feature has been refined with improved color contrast for better readability, and all UI elements are properly styled in dark mode.