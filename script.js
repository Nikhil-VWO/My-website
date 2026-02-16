// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to scroll to a section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        
        // Reset form
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    }
}

// Custom element with closed shadow root (mode: 'closed' — not accessible via .shadowRoot from outside)
class ClosedShadowDemo extends HTMLElement {
    constructor() {
        super();
        this._shadow = null; // only reference to closed shadow root, kept internally
    }

    connectedCallback() {
        this._shadow = this.attachShadow({ mode: 'closed' });
        this._shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 2rem;
                    background: linear-gradient(145deg, #1e1b4b 0%, #312e81 100%);
                    border-radius: 16px;
                    color: #e0e7ff;
                    font-family: inherit;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
                }
                .shadow-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    color: #c7d2fe;
                }
                .shadow-text {
                    font-size: 1rem;
                    line-height: 1.6;
                    opacity: 0.95;
                }
                .shadow-badge {
                    display: inline-block;
                    margin-top: 1rem;
                    padding: 0.35rem 0.75rem;
                    background: rgba(99, 102, 241, 0.4);
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
            </style>
            <div class="shadow-title">Encapsulated content</div>
            <p class="shadow-text">This paragraph and its styles live inside the closed shadow root. External CSS and JavaScript cannot reach in here—only this custom element can update the shadow DOM.</p>
            <span class="shadow-badge">mode: closed</span>
        `;
    }
}
customElements.define('closed-shadow-demo', ClosedShadowDemo);

// Custom element with open shadow root (mode: 'open' — accessible via element.shadowRoot from outside)
class OpenShadowDemo extends HTMLElement {
    connectedCallback() {
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 2rem;
                    background: linear-gradient(145deg, #064e3b 0%, #047857 100%);
                    border-radius: 16px;
                    color: #d1fae5;
                    font-family: inherit;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
                }
                .shadow-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    color: #a7f3d0;
                }
                .shadow-text {
                    font-size: 1rem;
                    line-height: 1.6;
                    opacity: 0.95;
                }
                .shadow-badge {
                    display: inline-block;
                    margin-top: 1rem;
                    padding: 0.35rem 0.75rem;
                    background: rgba(16, 185, 129, 0.4);
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                }
            </style>
            <div class="shadow-title">Encapsulated content (open)</div>
            <p class="shadow-text">This paragraph lives in an open shadow root. Styles are encapsulated, but you can access this root via <code>document.querySelector('open-shadow-demo').shadowRoot</code> in the console.</p>
            <span class="shadow-badge">mode: open</span>
        `;
    }
}
customElements.define('open-shadow-demo', OpenShadowDemo);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutContent = document.querySelectorAll('.about-text, .about-stats');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    aboutContent.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
