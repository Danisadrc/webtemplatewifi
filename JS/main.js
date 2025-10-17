// Main JavaScript functionality
// Main JavaScript functionality
class WiFiMarketing {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.setupAnimations();
        this.setupHeroAnimations();
    }

    // Smooth scrolling for navigation links
    setupSmoothScroll() {
        document.querySelectorAll('nav a, a.btn[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Only handle internal links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const nav = document.querySelector('nav ul');
        
        if (mobileMenu && nav) {
            mobileMenu.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        }
    }

    // Animation for hero section
    setupHeroAnimations() {
        const heroText = document.querySelector('.hero-text');
        const heroStats = document.querySelector('.hero-stats');
        const heroImage = document.querySelector('.hero-image');

        if (heroText && heroStats && heroImage) {
            // Set initial state
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateX(-50px)';
            heroStats.style.opacity = '0';
            heroStats.style.transform = 'translateY(30px)';
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(50px)';

            // Animate on load
            setTimeout(() => {
                heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateX(0)';

                heroStats.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';

                heroImage.style.transition = 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }, 300);
        }
    }

    // Animation on scroll untuk elements lain
    setupAnimations() {
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

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .testimonial-card, .benefit-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Counter animation for stats
class Counter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        this.current = 0;
    }

    start() {
        this.startTime = performance.now();
        this.animate();
    }

    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        this.current = Math.floor(progress * this.target);
        this.element.textContent = this.formatNumber(this.current);

        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        } else {
            this.element.textContent = this.formatNumber(this.target);
        }
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        if (num === 99.9) {
            return '99.9%';
        }
        return num.toString();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new WiFiMarketing();
    
    // Initialize counters
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        let target;
        const text = counter.textContent.trim();
        
        if (text.includes('K+')) {
            target = parseInt(text) * 1000;
        } else if (text.includes('%')) {
            target = parseFloat(text);
        } else {
            target = parseInt(text);
        }
        
        // Start counter animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterInstance = new Counter(counter, target);
                    counterInstance.start();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
});

    // Scroll effects for header
    // setupScrollEffects() {
    //     const header = document.querySelector('header');
    //     let lastScrollTop = 0;

    //     window.addEventListener('scroll', () => {
    //         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
    //         // Header background on scroll
    //         if (scrollTop > 100) {
    //             header.style.backgroundColor = 'rgba(44, 90, 160, 0.95)';
    //             header.style.backdropFilter = 'blur(10px)';
    //         } else {
    //             header.style.backgroundColor = 'var(--primary)';
    //             header.style.backdropFilter = 'none';
    //         }

    //         // Hide/show header on scroll
    //         if (scrollTop > lastScrollTop && scrollTop > 200) {
    //             header.style.transform = 'translateY(-100%)';
    //         } else {
    //             header.style.transform = 'translateY(0)';
    //         }
            
    //         lastScrollTop = scrollTop;
    //     });
    // }

//     // Animation on scroll
//     setupAnimations() {
//         const observerOptions = {
//             threshold: 0.1,
//             rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.style.opacity = '1';
//                     entry.target.style.transform = 'translateY(0)';
//                 }
//             });
//         }, observerOptions);

//         // Observe elements for animation
//         document.querySelectorAll('.benefit-item, .testimonial-item, .feature-item').forEach(el => {
//             el.style.opacity = '0';
//             el.style.transform = 'translateY(30px)';
//             el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//             observer.observe(el);
//         });
//     }
// }

// Counter animation for stats
class Counter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        this.current = 0;
    }

    start() {
        this.startTime = performance.now();
        this.animate();
    }

    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        this.current = Math.floor(progress * this.target);
        this.element.textContent = this.formatNumber(this.current);

        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        } else {
            this.element.textContent = this.formatNumber(this.target);
        }
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        if (num === 99.9) {
            return '99.9%';
        }
        return num.toString();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new WiFiMarketing();
    
    // Initialize counters
    const counters = document.querySelectorAll('.feature-value');
    counters.forEach(counter => {
        let target;
        const text = counter.textContent.trim();
        
        if (text.includes('K+')) {
            target = parseInt(text) * 1000;
        } else if (text.includes('%')) {
            target = parseFloat(text);
        } else {
            target = parseInt(text);
        }
        
        // Start counter animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterInstance = new Counter(counter, target);
                    counterInstance.start();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
});