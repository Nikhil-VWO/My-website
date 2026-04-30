// Navbar as custom element with open shadow root, fixed at top (does not scroll with page)
class NavBar extends HTMLElement {
    connectedCallback() {
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    z-index: 1000;
                    transition: background 0.3s ease, box-shadow 0.3s ease;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }
                .logo {
                    font-size: 1.5rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    flex-shrink: 0;
                }
                .nav-links {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                    align-items: center;
                    list-style: none;
                    gap: 1rem 1.25rem;
                    margin: 0;
                    padding: 0;
                    flex: 1 1 auto;
                    min-width: 0;
                }
                .nav-links a {
                    text-decoration: none;
                    color: #1f2937;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    position: relative;
                }
                .nav-links a:hover {
                    color: #6366f1;
                }
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #6366f1;
                    transition: width 0.3s ease;
                }
                .nav-links a:hover::after {
                    width: 100%;
                }
            </style>
            <div class="container">
                <div class="logo">MyWebsite</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#form-elements">Form Elements</a></li>
                    <li><a href="about.html" target="_blank" rel="noopener noreferrer">About Us ↗</a></li>
                    <li><a href="services.html" target="_blank" rel="noopener noreferrer">Services ↗</a></li>
                    <!-- Opens contact.html in a new tab (same domain) -->
                    <li><a href="contact.html" target="_blank" rel="noopener noreferrer">Contact Us ↗</a></li>
                    <li><a href="dashboard.html" target="_blank" rel="noopener noreferrer">Dashboard ↗</a></li>
                    <li><a href="cart.html" target="_blank" rel="noopener noreferrer">Cart ↗</a></li>
                    <li><a href="spa.html" target="_blank" rel="noopener noreferrer">SPA ↗</a></li>
                    <li><a href="responsive.html" target="_blank" rel="noopener noreferrer">Responsive ↗</a></li>
                    <li><a href="courses.html" target="_blank" rel="noopener noreferrer">Courses ↗</a></li>
                </ul>
            </div>
        `;
        root.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}
customElements.define('nav-bar', NavBar);

// Smooth scrolling for any other anchor links in light DOM
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Function to scroll to a section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navbar background on scroll (style applied to host so it stays fixed at top)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav-bar');
    if (!navbar) return;
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

// <feature-section> — entire section (heading, desc, grid + all cards) inside one open shadow root.
// The heading, description, grid wrapper, and all 6 <feature-card> components live fully inside
// this shadow root. Nothing in this section is reachable from the light DOM.
class FeatureSection extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :host { display: block; font-family: system-ui, -apple-system, sans-serif; }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1f2937;
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .section-desc {
                    font-size: 1rem;
                    color: #6b7280;
                    line-height: 1.7;
                    text-align: center;
                    max-width: 640px;
                    margin: 0 auto 2.5rem;
                }

                .section-desc code {
                    background: #ede9fe;
                    color: #6d28d9;
                    padding: 0.15em 0.4em;
                    border-radius: 4px;
                    font-size: 0.9em;
                }

                .feature-card-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                @media (max-width: 600px) {
                    .section-title { font-size: 1.5rem; }
                    .feature-card-grid { grid-template-columns: 1fr; }
                }
            </style>

            <div class="container">
                <h2 class="section-title">Why Choose Us</h2>
                <p class="section-desc">
                    This entire section — heading, description, grid, and every card — lives inside
                    one <code>open</code> shadow root on <code>&lt;feature-section&gt;</code>.
                    Each <code>&lt;feature-card&gt;</code> inside adds its own nested open shadow root.
                </p>
                <div class="feature-card-grid">
                    <feature-card data-accent="#6366f1">
                        <span slot="icon">🚀</span>
                        <span slot="heading">Fast Delivery</span>
                        <span slot="body">From kickoff to launch in weeks, not months. We move fast without cutting corners on quality.</span>
                    </feature-card>
                    <feature-card data-accent="#6366f1">
                        <span slot="icon">🎨</span>
                        <span slot="heading">Pixel-Perfect Design</span>
                        <span slot="body">Every component is crafted to match your brand — responsive, accessible, and beautiful on every screen.</span>
                    </feature-card>
                    <feature-card data-accent="#6366f1">
                        <span slot="icon">🔒</span>
                        <span slot="heading">Secure by Default</span>
                        <span slot="body">Security best practices baked in from the start — HTTPS, CSP headers, dependency audits, and more.</span>
                    </feature-card>
                    <feature-card data-accent="#10b981">
                        <span slot="icon">📈</span>
                        <span slot="heading">Data-Driven</span>
                        <span slot="body">Analytics, A/B testing, and conversion tracking set up so you can measure what works and iterate.</span>
                    </feature-card>
                    <feature-card data-accent="#f59e0b">
                        <span slot="icon">🤝</span>
                        <span slot="heading">Ongoing Support</span>
                        <span slot="body">We don't disappear after launch. Monthly maintenance, updates, and priority support keep you covered.</span>
                    </feature-card>
                    <feature-card data-accent="#ef4444">
                        <span slot="icon">⚡</span>
                        <span slot="heading">Performance First</span>
                        <span slot="body">Core Web Vitals, Lighthouse audits, image optimisation, and CDN delivery — your site loads fast for everyone.</span>
                    </feature-card>
                </div>
            </div>
        `;

        // Apply per-card accent colour via CSS custom property after shadow renders
        shadow.querySelectorAll('feature-card[data-accent]').forEach(card => {
            card.style.setProperty('--fc-accent', card.dataset.accent);
        });
    }
}
customElements.define('feature-section', FeatureSection);

// <feature-card> — slots-based web component with open shadow root.
// This is the pattern used by Shoelace, Material Web, Adobe Spectrum, GitHub Primer.
// Content is projected via <slot>, theming is exposed via CSS custom properties.
class FeatureCard extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                /* CSS custom properties — host page can override these */
                :host {
                    display: block;
                    --fc-accent:      #6366f1;
                    --fc-bg:          #ffffff;
                    --fc-border:      #e5e7eb;
                    --fc-radius:      16px;
                    --fc-padding:     1.75rem 1.5rem;
                    --fc-icon-size:   2.5rem;
                    --fc-heading-color: #1e293b;
                    --fc-body-color:  #6b7280;
                }

                .card {
                    background: var(--fc-bg);
                    border: 1px solid var(--fc-border);
                    border-radius: var(--fc-radius);
                    padding: var(--fc-padding);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
                }

                .card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
                    border-color: var(--fc-accent);
                }

                /* Icon slot */
                .icon-wrap {
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    background: color-mix(in srgb, var(--fc-accent) 12%, transparent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--fc-icon-size);
                    line-height: 1;
                    flex-shrink: 0;
                }

                /* Heading slot */
                .heading {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--fc-heading-color);
                    line-height: 1.3;
                }

                /* Body slot */
                .body {
                    font-size: 0.875rem;
                    color: var(--fc-body-color);
                    line-height: 1.65;
                    flex: 1;
                }

                /* Accent bar at bottom */
                .accent-bar {
                    height: 3px;
                    border-radius: 99px;
                    background: var(--fc-accent);
                    opacity: 0;
                    transition: opacity 0.22s;
                    margin-top: 0.25rem;
                }
                .card:hover .accent-bar { opacity: 1; }
            </style>

            <div class="card">
                <div class="icon-wrap">
                    <slot name="icon">⭐</slot>
                </div>
                <div class="heading">
                    <slot name="heading">Feature</slot>
                </div>
                <div class="body">
                    <slot name="body">Description goes here.</slot>
                </div>
                <div class="accent-bar"></div>
            </div>
        `;
    }
}
customElements.define('feature-card', FeatureCard);

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

// Carousel (Customer Reviews - auto-scroll + prev/next arrows)
const carouselViewport = document.getElementById('carousel-viewport');
const carouselTrack = document.getElementById('carousel-track');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const CAROUSEL_INTERVAL_MS = 5000;
const CARD_GAP = 20;

if (carouselViewport && carouselTrack && carouselPrev && carouselNext) {
    const cards = carouselTrack.querySelectorAll('.review-card');
    const total = cards.length;
    let currentIndex = 0;
    let autoInterval = null;

    function getCardWidth() {
        return cards[0] ? cards[0].offsetWidth : 300;
    }

    function getMaxIndex() {
        const viewportWidth = carouselViewport.offsetWidth;
        const cardWidth = getCardWidth();
        const cardsVisible = Math.floor((viewportWidth + CARD_GAP) / (cardWidth + CARD_GAP));
        return Math.max(0, total - cardsVisible);
    }

    function updateArrows() {
        carouselPrev.disabled = currentIndex <= 0;
        carouselNext.disabled = currentIndex >= getMaxIndex();
    }

    function goToIndex(index) {
        const maxIdx = getMaxIndex();
        currentIndex = Math.max(0, Math.min(index, maxIdx));
        const offset = currentIndex * (getCardWidth() + CARD_GAP);
        carouselTrack.style.transform = `translateX(-${offset}px)`;
        updateArrows();
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoInterval = setInterval(() => {
            const maxIdx = getMaxIndex();
            goToIndex(currentIndex >= maxIdx ? 0 : currentIndex + 1);
        }, CAROUSEL_INTERVAL_MS);
    }

    function stopAutoScroll() {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }

    carouselPrev.addEventListener('click', () => {
        goToIndex(currentIndex - 1);
        startAutoScroll();
    });

    carouselNext.addEventListener('click', () => {
        goToIndex(currentIndex + 1);
        startAutoScroll();
    });

    window.addEventListener('resize', () => {
        goToIndex(currentIndex);
    });

    const reviewsCta = document.getElementById('reviews-cta');
    if (reviewsCta) {
        reviewsCta.addEventListener('click', () => {
            scrollToSection('contact');
        });
    }

    updateArrows();
    startAutoScroll();
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
