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

// About Us paragraph in closed shadow root (plain text, no visible indication)
class AboutUsText extends HTMLElement {
    constructor() {
        super();
        this._shadow = null;
    }

    connectedCallback() {
        this._shadow = this.attachShadow({ mode: 'closed' });
        this._shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                p {
                    font-size: 1.1rem;
                    color: #6b7280;
                    margin-bottom: 1.5rem;
                    line-height: 1.8;
                }
                p:last-child {
                    margin-bottom: 0;
                }
            </style>
            <p>We create beautiful, modern websites that are both functional and visually appealing. Our focus is on user experience and clean design.</p>
            <p>With attention to detail and a passion for web development, we bring your ideas to life.</p>
        `;
    }
}
customElements.define('about-us-text', AboutUsText);

// Whole section in one open shadow root (mode: 'open' — accessible via element.shadowRoot from outside)
class OpenShadowSection extends HTMLElement {
    connectedCallback() {
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }
                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: #1f2937;
                }
                .shadow-section-desc {
                    font-size: 1rem;
                    color: #6b7280;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                .shadow-section-desc code {
                    background: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    font-size: 0.9em;
                }
                .shadow-demo-box {
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
                .shadow-text code {
                    background: rgba(0, 0, 0, 0.2);
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
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
            <div class="container">
                <h2 class="section-title">Open Shadow Root</h2>
                <p class="shadow-section-desc">This entire section is inside a custom element with an <strong>open</strong> shadow root. The shadow DOM is still encapsulated, but <code>element.shadowRoot</code> returns the root—so external scripts can inspect or modify the content inside.</p>
                <div class="shadow-demo-box">
                    <div class="shadow-title">Encapsulated content (open)</div>
                    <p class="shadow-text">This paragraph lives in the same open shadow root as the section title above. You can access this root via <code>document.querySelector('open-shadow-section').shadowRoot</code> in the console.</p>
                    <span class="shadow-badge">mode: open</span>
                </div>
            </div>
        `;
    }
}
customElements.define('open-shadow-section', OpenShadowSection);

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

// Modal popup
const modalOverlay = document.getElementById('modal-overlay');
const modalTrigger = document.getElementById('modal-trigger');
const modalClose = document.getElementById('modal-close');

if (modalTrigger) {
    modalTrigger.addEventListener('click', () => {
        if (modalOverlay) {
            modalOverlay.hidden = false;
        }
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        if (modalOverlay) modalOverlay.hidden = true;
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.hidden = true;
    });
}

// Accordion (collapsed by default)
const accordionTrigger = document.getElementById('accordion-trigger');
const accordionPanel = document.getElementById('accordion-panel');

if (accordionTrigger && accordionPanel) {
    accordionTrigger.addEventListener('click', () => {
        const isExpanded = accordionPanel.hidden;
        accordionPanel.hidden = !isExpanded;
        accordionTrigger.setAttribute('aria-expanded', isExpanded);
    });
}

// DOM mutation (counter + list update every 10s — slow interval for observer)
const rapidCounterEl = document.getElementById('rapid-counter');
const rapidListEl = document.getElementById('rapid-list');
const rapidItems = ['Notification', 'Data synced', 'Update complete', 'Processing', 'Ready'];

if (rapidCounterEl && rapidListEl) {
    let count = 0;
    let index = 0;

    function updateRapidDOM() {
        count += 1;
        index = (index + 1) % rapidItems.length;
        rapidCounterEl.textContent = String(count);
        rapidListEl.innerHTML = rapidItems
            .slice(index)
            .concat(rapidItems.slice(0, index))
            .map((label) => `<li>${label}</li>`)
            .join('');
    }

    updateRapidDOM();
    setInterval(updateRapidDOM, 10000);
}

// Observe service cards and other elements
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const aboutContent = document.querySelectorAll('about-us-text, .about-stats, open-shadow-section');

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
