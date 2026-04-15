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
                    <li><a href="#carousel">Carousel</a></li>
                    <li><a href="#form-elements">Form Elements</a></li>
                    <li><a href="about.html" target="_blank" rel="noopener noreferrer">About Us ↗</a></li>
                    <li><a href="services.html" target="_blank" rel="noopener noreferrer">Services ↗</a></li>
                    <!-- Opens contact.html in a new tab (same domain) -->
                    <li><a href="contact.html" target="_blank" rel="noopener noreferrer">Contact Us ↗</a></li>
                    <li><a href="dashboard.html" target="_blank" rel="noopener noreferrer">Dashboard ↗</a></li>
                    <li><a href="dynamic-spa.html" target="_blank" rel="noopener noreferrer">Embedded ↗</a></li>
                    <li><a href="cart.html" target="_blank" rel="noopener noreferrer">Cart ↗</a></li>
                    <li><a href="spa.html" target="_blank" rel="noopener noreferrer">SPA ↗</a></li>
                    <li><a href="delayed.html" target="_blank" rel="noopener noreferrer">Delayed ↗</a></li>
                    <li><a href="responsive.html" target="_blank" rel="noopener noreferrer">Responsive ↗</a></li>
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

// Whole section in one open shadow root (mode: 'open' — accessible via element.shadowRoot from outside)
class OpenShadowSection extends HTMLElement {
    connectedCallback() {
        const root = this.attachShadow({ mode: 'open' });
        root.innerHTML = `
            <style>
                :host { display: block; }

                /* ── Layout ── */
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* ── Section heading & desc (same as light DOM) ── */
                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    color: #1f2937;
                }
                .section-desc {
                    font-size: 1rem;
                    color: #6b7280;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                .section-desc code {
                    background: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    font-size: 0.9em;
                }

                /* ── Sub-heading ── */
                .sub-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin: 2.5rem 0 1rem;
                }

                /* ── Services grid & boxes ── */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 1.5rem;
                }
                .service-box {
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 1.75rem 1.5rem;
                    text-align: center;
                    transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
                }
                .service-box:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 28px rgba(99, 102, 241, 0.13);
                    border-color: #a5b4fc;
                }
                .service-icon {
                    font-size: 2rem;
                    margin-bottom: 0.75rem;
                }
                .service-box h3 {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 0.4rem;
                }
                .service-box p {
                    font-size: 0.875rem;
                    color: #6b7280;
                    line-height: 1.55;
                    margin: 0;
                }

                /* ── Stats (same as light DOM) ── */
                .about-stats {
                    display: flex;
                    gap: 2rem;
                    flex-wrap: wrap;
                }
                .stat {
                    text-align: center;
                    flex: 1 1 80px;
                }
                .stat-number {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #6366f1;
                }
                .stat-label {
                    font-size: 0.875rem;
                    color: #6b7280;
                    margin-top: 0.25rem;
                }

                /* ── Reviews grid & items (same as light DOM) ── */
                .reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 1.5rem;
                }
                .review-item {
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 1.5rem;
                    font-style: normal;
                    margin: 0;
                }
                .review-item p {
                    font-size: 0.95rem;
                    color: #374151;
                    line-height: 1.65;
                    margin: 0 0 0.75rem;
                }
                .review-item footer {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #6366f1;
                }

                /* ── Review boxes ── */
                .review-boxes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 1.25rem;
                }
                .review-box {
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .review-stars {
                    color: #f59e0b;
                    font-size: 1rem;
                    letter-spacing: 0.05em;
                }
                .review-title {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin: 0;
                }
                .review-text {
                    font-size: 0.875rem;
                    color: #6b7280;
                    line-height: 1.6;
                    margin: 0;
                    flex: 1;
                }
                .review-verified {
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: #16a34a;
                }

                /* ── Iframe (same as light DOM) ── */
                .iframe-section-desc {
                    font-size: 1rem;
                    color: #6b7280;
                    line-height: 1.6;
                    margin-bottom: 1.25rem;
                }
                .iframe-section-desc code {
                    background: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    font-size: 0.9em;
                }
                .iframe-wrapper {
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                }
                .embed-iframe {
                    display: block;
                    width: 100%;
                    height: 300px;
                    border: none;
                }

                /* ── Badge ── */
                .section-badge {
                    display: inline-block;
                    margin-top: 2rem;
                    padding: 0.35rem 0.85rem;
                    background: #ede9fe;
                    color: #6d28d9;
                    border-radius: 9999px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                }
            </style>

            <div class="container">

                <!-- Heading -->
                <h2 class="section-title">Open Shadow Root</h2>
                <p class="section-desc">This entire section lives inside a custom element with an <strong>open</strong> shadow root. Outer page CSS cannot reach these elements, but the class names mirror the rest of the page. Access via <code>document.querySelector('open-shadow-section').shadowRoot</code>.</p>

                <!-- Services grid -->
                <h3 class="sub-title">Capabilities</h3>
                <div class="services-grid">
                    <div class="service-box">
                        <div class="service-icon">🔓</div>
                        <h3>Open Shadow DOM</h3>
                        <p>Shadow root with <code>mode: 'open'</code> — inspectable via <code>element.shadowRoot</code> in DevTools and external scripts.</p>
                    </div>
                    <div class="service-box">
                        <div class="service-icon">🎨</div>
                        <h3>Style Encapsulation</h3>
                        <p>Styles defined here are scoped to this shadow root. Outer page rules cannot bleed in, and inner rules cannot leak out.</p>
                    </div>
                    <div class="service-box">
                        <div class="service-icon">🧩</div>
                        <h3>Same Class Names</h3>
                        <p>Elements inside use the same CSS class names as the light DOM — <code>section-title</code>, <code>service-box</code>, <code>section-desc</code> — without conflict.</p>
                    </div>
                    <div class="service-box">
                        <div class="service-icon">⚡</div>
                        <h3>DOM Isolation</h3>
                        <p>Queries like <code>document.querySelector('.section-title')</code> won't reach inside — you must go through <code>shadowRoot</code> first.</p>
                    </div>
                    <div class="service-box">
                        <div class="service-icon">🔍</div>
                        <h3>DevTools Visible</h3>
                        <p>Unlike a closed shadow root, open mode lets browser DevTools and automation frameworks inspect and interact with the internals.</p>
                    </div>
                    <div class="service-box">
                        <div class="service-icon">📦</div>
                        <h3>Reusable Components</h3>
                        <p>Shadow DOM enables truly portable web components — drop the custom element anywhere and the styles travel with it.</p>
                    </div>
                </div>

                <!-- Stats -->
                <h3 class="sub-title">By the Numbers</h3>
                <div class="about-stats">
                    <div class="stat">
                        <div class="stat-number">1</div>
                        <div class="stat-label">Shadow Root</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">6</div>
                        <div class="stat-label">Service Cards</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">3</div>
                        <div class="stat-label">Client Reviews</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">3</div>
                        <div class="stat-label">Review Cards</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">CSS Leaks</div>
                    </div>
                </div>

                <!-- Client reviews (blockquote style) -->
                <h3 class="sub-title">Client Reviews</h3>
                <div class="reviews-grid">
                    <blockquote class="review-item">
                        <p>"Shadow DOM made our component library truly portable. No more style conflicts across teams."</p>
                        <footer>— Alex P., Frontend Lead at Stackify</footer>
                    </blockquote>
                    <blockquote class="review-item">
                        <p>"Open mode was the right call — our QA automation could still inspect and assert on the internals."</p>
                        <footer>— Maya R., QA Engineer at Testlab</footer>
                    </blockquote>
                    <blockquote class="review-item">
                        <p>"Same class names inside and outside the shadow root made our test selectors consistent across the whole app."</p>
                        <footer>— Sam K., Engineer at DevForge</footer>
                    </blockquote>
                </div>

                <!-- Review cards (carousel style) -->
                <h3 class="sub-title">Verified Feedback</h3>
                <div class="review-boxes-grid">
                    <div class="review-box">
                        <div class="review-stars">★★★★★</div>
                        <p class="review-title">Encapsulation done right</p>
                        <p class="review-text">Shadow DOM scoping solved our global CSS bleed issues overnight. Every component now owns its styles completely.</p>
                        <span class="review-verified">✓ Verified Client</span>
                    </div>
                    <div class="review-box">
                        <div class="review-stars">★★★★★</div>
                        <p class="review-title">Automation-friendly</p>
                        <p class="review-text">Open shadow roots gave our Playwright tests full access to internals without any extra configuration or workarounds.</p>
                        <span class="review-verified">✓ Verified Client</span>
                    </div>
                    <div class="review-box">
                        <div class="review-stars">★★★★★</div>
                        <p class="review-title">Consistent class naming</p>
                        <p class="review-text">Using the same class names inside and outside the shadow root kept our design system coherent and our selectors predictable.</p>
                        <span class="review-verified">✓ Verified Client</span>
                    </div>
                </div>

                <!-- Embedded iframe -->
                <h3 class="sub-title">Embedded Content</h3>
                <p class="iframe-section-desc">This <code>&lt;iframe&gt;</code> is a separate document nested inside the open shadow root. Its content uses its own CSS class names — <code>section-title</code>, <code>section-desc</code>, <code>service-iframe</code>, <code>service-icon</code> — defined independently inside the iframe.</p>
                <div class="iframe-wrapper">
                    <iframe
                        class="embed-iframe"
                        title="Embedded demo inside shadow DOM"
                        srcdoc="<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width,initial-scale=1.0'>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1e293b; padding: 1.5rem; }
  .section-title { font-size: 1.25rem; font-weight: 800; color: #1f2937; margin-bottom: 0.5rem; }
  .section-desc { font-size: 0.875rem; color: #6b7280; line-height: 1.6; margin-bottom: 1.25rem; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .service-iframe { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem; text-align: center; }
  .service-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .service-iframe h3 { font-size: 0.875rem; font-weight: 700; color: #1e293b; margin-bottom: 0.3rem; }
  .service-iframe p { font-size: 0.78rem; color: #6b7280; line-height: 1.5; margin: 0; }
</style>
</head>
<body>
  <h2 class='section-title'>Inside the iframe</h2>
  <p class='section-desc'>Separate document — same CSS class names, own styles.</p>
  <div class='services-grid'>
    <div class='service-iframe'><div class='service-icon'>📄</div><h3>Separate Doc</h3><p>Own browsing context, isolated from shadow DOM.</p></div>
    <div class='service-iframe'><div class='service-icon'>🎨</div><h3>Same Classes</h3><p>section-title, service-iframe, service-icon used here too.</p></div>
    <div class='service-iframe'><div class='service-icon'>🔒</div><h3>Own Styles</h3><p>CSS is redefined inside this iframe independently.</p></div>
  </div>
</body>
</html>"
                        loading="lazy"
                    ></iframe>
                </div>

                <span class="section-badge">mode: open</span>

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
