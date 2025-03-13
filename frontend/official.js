// filepath: /workspaces/Waiting-System/frontend/official.js
document.addEventListener('DOMContentLoaded', () => {
    const requestList = document.getElementById('requestList');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Function to fetch requests
    async function fetchRequests() {
        try {
            const response = await fetch('/api/requests');
            const requests = await response.json();
            displayRequests(requests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    }
    
    // Function to display requests
    function displayRequests(requests) {
        requestList.innerHTML = '';
        requests.forEach(request => {
            const li = document.createElement('li');
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `${request.name}: ${request.description}`;
            li.appendChild(nameSpan);
            
            const actionDiv = document.createElement('div');
            actionDiv.className = 'request-actions';
            
            const approveBtn = document.createElement('button');
            approveBtn.textContent = 'Ask to Enter';
            approveBtn.onclick = () => respondToRequest(request.id, 'approve');
            
            const laterBtn = document.createElement('button');
            laterBtn.textContent = 'Come Later';
            laterBtn.onclick = () => {
                const minutes = prompt('How many minutes later?', '15');
                if (minutes) {
                    respondToRequest(request.id, 'later', minutes);
                }
            };
            
            const rejectBtn = document.createElement('button');
            rejectBtn.textContent = 'Busy';
            rejectBtn.onclick = () => respondToRequest(request.id, 'reject');
            
            actionDiv.appendChild(approveBtn);
            actionDiv.appendChild(laterBtn);
            actionDiv.appendChild(rejectBtn);
            
            li.appendChild(actionDiv);
            requestList.appendChild(li);
        });
    }
    
    // Function to respond to a request
    async function respondToRequest(requestId, action, minutes = null) {
        try {
            const response = await fetch(`/api/respond/${requestId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action, minutes })
            });
            
            if (response.ok) {
                fetchRequests(); // Refresh the list
            }
        } catch (error) {
            console.error('Error responding to request:', error);
        }
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
        document.querySelectorAll('button').forEach(button => {
            button.classList.toggle('dark-mode');
        });
        document.querySelectorAll('#requestList li').forEach(item => {
            item.classList.toggle('dark-mode');
        });
    });
    
    // Initial fetch of requests
    fetchRequests();
    
    // Set up periodic refresh
    setInterval(fetchRequests, 10000); // Refresh every 10 seconds
});