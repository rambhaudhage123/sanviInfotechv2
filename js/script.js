// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', scrollFunction);
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Portfolio filtering
    const portfolioFilters = document.querySelectorAll('.portfolio-filter li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilters.length && portfolioItems.length) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                portfolioFilters.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to current filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            
            if (!name.value.trim()) {
                isValid = false;
                name.classList.add('error');
            } else {
                name.classList.remove('error');
            }
            
            if (!email.value.trim() || !validateEmail(email.value)) {
                isValid = false;
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }
            
            if (!message.value.trim()) {
                isValid = false;
                message.classList.add('error');
            } else {
                message.classList.remove('error');
            }
            
            if (isValid) {
                // Here you would send the form data to your server
                alert('Thank you for your message. We\'ll get back to you soon!');
                this.reset();
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add highlight to menu based on scroll position
    function highlightMenuOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    highlightMenuOnScroll();
    
    // Animated counter effect
    function setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        const aboutSection = document.getElementById('about');
        
        // Reset and animate counters when about section is in view
        function resetAndAnimateCounters() {
            counters.forEach(counter => {
                // Store original target value as a data attribute if not already stored
                if (!counter.dataset.target) {
                    counter.dataset.target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                    counter.dataset.suffix = counter.textContent.replace(/[0-9]/g, '');
                }
                
                const target = parseInt(counter.dataset.target);
                const suffix = counter.dataset.suffix;
                
                // Reset counter to zero before animating
                counter.textContent = '0' + suffix;
                let count = 0;
                const increment = target / 60; // Faster animation
                
                function updateCount() {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count) + suffix;
                        counter.animationId = requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target + suffix;
                    }
                }
                
                // Start the animation
                updateCount();
            });
        }
        
        // Create intersection observer for about section
        const aboutObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                resetAndAnimateCounters();
            } else {
                // Cancel any running animations when section leaves viewport
                counters.forEach(counter => {
                    if (counter.animationId) {
                        cancelAnimationFrame(counter.animationId);
                    }
                });
            }
        }, { threshold: 0.2 });
        
        // Observe the about section
        if (aboutSection) {
            aboutObserver.observe(aboutSection);
        }
    }
    
    setupCounterAnimations();
    
    // Add a simple testimonial slider
    function initTestimonialSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => {
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(20px)';
                slide.style.display = 'none';
            });
            
            slides[n].style.display = 'block';
            setTimeout(() => {
                slides[n].style.opacity = '1';
                slides[n].style.transform = 'translateX(0)';
            }, 100);
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Auto-advance slides every 5 seconds
        if (slides.length > 1) {
            setInterval(nextSlide, 5000);
        }
        
        // Show first slide initially
        if (slides.length > 0) {
            showSlide(0);
        }
    }
    
    // Only initialize testimonial slider if we're not on mobile
    if (window.innerWidth >= 768) {
        initTestimonialSlider();
    }
    
    // Fix service card hover issue
    function initServiceCardInteraction() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        // Add event listeners to each card
        serviceCards.forEach(card => {
            // Clean any existing transform when mouse leaves any card
            card.addEventListener('mouseleave', () => {
                serviceCards.forEach(c => {
                    c.style.transform = '';
                    c.style.zIndex = '1';
                    c.style.boxShadow = '';
                });
            });
            
            // Apply transform only to the hovered card
            card.addEventListener('mouseenter', () => {
                // First reset all cards
                serviceCards.forEach(c => {
                    c.style.transform = '';
                    c.style.zIndex = '1';
                    c.style.boxShadow = '';
                });
                
                // Then apply effect only to the current card
                card.style.transform = 'translateY(-10px) scale(1.03) rotateY(10deg)';
                card.style.zIndex = '2';
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            });
        });
    }
    
    // Initialize testimonial slider and service card interaction
    initTestimonialSlider();
    initServiceCardInteraction();
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Here you would send the email to your newsletter service
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Parallax effect for sections
    function parallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(element => {
                const distance = window.scrollY;
                element.style.transform = `translateY(${distance * 0.5}px)`;
            });
        });
    }
    parallaxEffect();
    
    // Initialize service card interaction
    initServiceCardInteraction();
    
    // Portfolio filtering functionality
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter the portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Initialize portfolio filtering
    initPortfolioFilter();
});
