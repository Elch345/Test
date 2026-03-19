// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// CTA button scrolls to About section
document.getElementById('cta-btn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Contact form handler
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Danke fuer deine Nachricht! (Dies ist eine Test-Website)');
    e.target.reset();
});
