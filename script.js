 // Mobile Menu Toggle
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Collection card animation on scroll
        const collectionCards = document.querySelectorAll('.collection-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        collectionCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
            observer.observe(card);
        });

        // Process step animation
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.style.transitionDelay = `${index * 0.2}s`;
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

       



        // EmailJS integration for contact form
    document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Send email using EmailJS
    emailjs.sendForm('service_ejrew0t', 'template_k4824h3', form)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            showFashionAlert('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
            
            // Optional: Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Email Sent'
                });
            }
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            let errorMessage = 'Failed to send message';
            if (error.status === 400) {
                errorMessage = 'Please check your email address';
            } else if (error.status === 0) {
                errorMessage = 'Network error - please try again';
            }
            
            showFashionAlert(errorMessage, 'error');
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
});

// Stylish alert function matching your portfolio aesthetic
function showFashionAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = 'fashion-alert ' + type;
    alert.innerHTML = `
        <div class="fashion-alert-content">
            <span class="fashion-alert-icon">${type === 'success' ? '✓' : '✕'}</span>
            <span class="fashion-alert-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 500);
    }, 4000);
}