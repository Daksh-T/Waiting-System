document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('requestForm');
    const requestList = document.getElementById('requestList');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const loadingIndicator = document.getElementById('loadingIndicator');
    let currentRequestId = null;

    // Handle form submission
    requestForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        loadingIndicator.style.display = 'block';
        const formData = new FormData(requestForm);
        const data = {
            name: formData.get('name'),
            description: formData.get('description')
        };

        try {
            const response = await fetch('/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            currentRequestId = result.id; // Store the request ID
            addRequestToList(result.data);
            
            // Start checking for notifications
            if (currentRequestId) {
                checkNotifications();
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });

    // Add request to the list
    function addRequestToList(request) {
        const listItem = document.createElement('li');
        listItem.textContent = `${request.name}: ${request.description}`;
        requestList.appendChild(listItem);
    }

    // Function to check for notifications
    async function checkNotifications() {
        if (!currentRequestId) return;
        
        try {
            const response = await fetch(`/api/check-notification/${currentRequestId}`);
            const data = await response.json();
            
            if (data.message && data.message !== 'No notification') {
                alert(data.message);
                // You could use a more sophisticated notification system than alert()
            }
        } catch (error) {
            console.error('Error checking notifications:', error);
        }
        
        // Check again in 5 seconds
        setTimeout(checkNotifications, 5000);
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
});