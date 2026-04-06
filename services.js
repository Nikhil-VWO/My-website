/* ============================================================
   services.js — interactive behaviour for services.html
   ============================================================ */

(function () {
    'use strict';

    /* ── FAQ accordion ── */
    function initFaq() {
        var faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(function (item) {
            var btn = item.querySelector('.faq-question');
            if (!btn) return;

            btn.addEventListener('click', function () {
                var isOpen = item.classList.contains('open');

                // Close all other open items
                faqItems.forEach(function (other) {
                    if (other !== item && other.classList.contains('open')) {
                        other.classList.remove('open');
                        var otherBtn = other.querySelector('.faq-question');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                item.classList.toggle('open', !isOpen);
                btn.setAttribute('aria-expanded', String(!isOpen));
            });
        });
    }

    /* ── Card hover enhancement ── */
    function initCardHover() {
        var cards = document.querySelectorAll('.service-detail-card');
        if (!cards.length) return;

        cards.forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                card.classList.add('is-hovered');
            });
            card.addEventListener('mouseleave', function () {
                card.classList.remove('is-hovered');
            });
            // Keyboard-accessible hover state
            card.addEventListener('focusin', function () {
                card.classList.add('is-hovered');
            });
            card.addEventListener('focusout', function () {
                card.classList.remove('is-hovered');
            });
        });
    }

    /* ── Initialise on DOM ready ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initFaq();
            initCardHover();
        });
    } else {
        initFaq();
        initCardHover();
    }
})();
