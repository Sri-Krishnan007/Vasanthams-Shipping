// Form Validation and Submission
document.getElementById('inquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();
    const inquiryType = document.querySelector('select[name="inquiryType"]').value.trim();

    // Validation
    if (!name || !email || !message || !inquiryType) {
        showMessage('Please fill all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email', 'error');
        return;
    }

    if (name.length < 2) {
        showMessage('Name must be at least 2 characters', 'error');
        return;
    }

    if (message.length < 10) {
        showMessage('Message must be at least 10 characters', 'error');
        return;
    }

    // Send via AJAX
    fetch('submit_inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            name: name,
            email: email,
            message: message,
            inquiryType: inquiryType
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showMessage('✅ Thank you! We will contact you within 24 hours.', 'success');
            e.target.reset();
        } else {
            showMessage('❌ ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('❌ Error sending message. Please try again.', 'error');
    });
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(msg, type) {
    const responseDiv = document.getElementById('responseMessage');
    responseDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    responseDiv.innerHTML = msg;
    responseDiv.style.display = 'block';
    
    // Auto-hide after 6 seconds
    setTimeout(() => {
        responseDiv.style.display = 'none';
    }, 6000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navbar links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});