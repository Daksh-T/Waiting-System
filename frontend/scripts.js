document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('requestForm');
    const requestList = document.getElementById('requestList');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Handle form submission
    requestForm.addEventListener('submit', async (event) => {
        event.preventDefault();
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
            addRequestToList(result.data);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Add request to the list
    function addRequestToList(request) {
        const listItem = document.createElement('li');
        listItem.textContent = `${request.name}: ${request.description}`;
        requestList.appendChild(listItem);
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
