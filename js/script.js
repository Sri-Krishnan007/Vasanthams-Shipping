

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate email sending logic
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    // Display acknowledgment
    const acknowledgment = document.getElementById('acknowledgment');
    acknowledgment.classList.remove('d-none');
    acknowledgment.textContent = 'Thank you! Your message has been sent.';

    // Reset form
    e.target.reset();
});