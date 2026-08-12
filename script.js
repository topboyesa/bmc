document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Mobile nav toggle ---------- */
    const navToggle = document.getElementById("navToggle");
    const navbar = document.getElementById("primaryNav");

    if (navToggle && navbar) {
        navToggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        });

        // Close the menu after tapping a link (mobile)
        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Open menu");
            });
        });
    }

    /* ---------- Sticky header shadow on scroll ---------- */
    const header = document.getElementById("site-header");
    if (header) {
        const onScroll = () => {
            header.style.boxShadow = window.scrollY > 8
                ? "0 4px 20px rgba(0,0,0,0.25)"
                : "0 4px 20px rgba(0,0,0,0.15)";
        };
        document.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---------- Carousels ---------- */
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    class Carousel {
        constructor(root) {
            this.root = root;
            this.slides = Array.from(root.querySelectorAll(".carousel-slide"));
            this.dotsWrap = root.querySelector("[data-dots]");
            this.prevBtn = root.querySelector("[data-prev]");
            this.nextBtn = root.querySelector("[data-next]");
            this.index = 0;
            this.timer = null;

            if (this.slides.length === 0) return;

            this.buildDots();
            this.show(0);

            this.prevBtn && this.prevBtn.addEventListener("click", () => this.step(-1));
            this.nextBtn && this.nextBtn.addEventListener("click", () => this.step(1));

            // Pause autoplay on hover/focus, resume on leave/blur
            root.addEventListener("mouseenter", () => this.stop());
            root.addEventListener("mouseleave", () => this.play());
            root.addEventListener("focusin", () => this.stop());
            root.addEventListener("focusout", () => this.play());

            if (this.slides.length > 1) this.play();
        }

        buildDots() {
            if (!this.dotsWrap || this.slides.length < 2) return;
            this.slides.forEach((_, i) => {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.setAttribute("aria-label", `Show photo ${i + 1} of ${this.slides.length}`);
                dot.addEventListener("click", () => { this.show(i); this.resetTimer(); });
                this.dotsWrap.appendChild(dot);
            });
        }

        show(i) {
            this.index = (i + this.slides.length) % this.slides.length;
            this.slides.forEach((slide, idx) => slide.classList.toggle("active", idx === this.index));
            if (this.dotsWrap) {
                Array.from(this.dotsWrap.children).forEach((dot, idx) =>
                    dot.classList.toggle("active", idx === this.index));
            }
        }

        step(dir) {
            this.show(this.index + dir);
            this.resetTimer();
        }

        play() {
            if (prefersReducedMotion || this.slides.length < 2) return;
            this.stop();
            this.timer = setInterval(() => this.show(this.index + 1), 5000);
        }

        stop() {
            if (this.timer) clearInterval(this.timer);
            this.timer = null;
        }

        resetTimer() {
            this.stop();
            this.play();
        }
    }

    document.querySelectorAll("[data-carousel]").forEach(el => new Carousel(el));

    /* ---------- Ministries tabs ---------- */
    const tabButtons = Array.from(document.querySelectorAll(".tab"));
    const panels = Array.from(document.querySelectorAll(".tab-panel"));

    function activateTab(btn) {
        tabButtons.forEach(b => {
            const selected = b === btn;
            b.classList.toggle("active", selected);
            b.setAttribute("aria-selected", String(selected));
            b.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(panel => {
            panel.hidden = panel.dataset.panel !== btn.dataset.tab;
            panel.classList.toggle("active", panel.dataset.panel === btn.dataset.tab);
        });
    }

    tabButtons.forEach((btn, i) => {
        btn.addEventListener("click", () => activateTab(btn));
        btn.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next = e.key === "ArrowRight"
                    ? tabButtons[(i + 1) % tabButtons.length]
                    : tabButtons[(i - 1 + tabButtons.length) % tabButtons.length];
                next.focus();
                activateTab(next);
            }
        });
    });

    /* ---------- Contact form (demo only — wire to a real backend) ---------- */
    const form = document.getElementById("contactForm");
    const note = document.getElementById("formNote");
    if (form && note) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            note.textContent = "Thanks — this demo form doesn't send yet. Connect it to Formspree, EmailJS, or your own backend.";
            form.reset();
        });
    }

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
