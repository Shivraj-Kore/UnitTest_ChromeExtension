document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
    
    // Get the input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Create a div to display the results
    let resultDiv = document.getElementById('result');
    
    // If result div doesn't exist, create it
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'result';
        document.body.appendChild(resultDiv);
    }
    
    // Display the values
    resultDiv.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
    `;
});
