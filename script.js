document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       THEME TOGGLING (LIGHT/DARK)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
            themeToggleBtn.setAttribute('title', 'Switch to light mode');
            themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fa-solid fa-moon';
            themeToggleBtn.setAttribute('title', 'Switch to dark mode');
            themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    /* ==========================================================================
       STICKY HEADER & SCROLL TO TOP
       ========================================================================== */
    const header = document.getElementById('main-header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header scroll styling trigger
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to Top visibility trigger
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Set active nav class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* ==========================================================================
       SCROLL REVEAL (FADE-IN ELEMENT ANIMATION)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in full view
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       DYNAMIC IMPACT METRIC COUNTERS
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.impact-stats-grid');
    let countersAnimated = false;

    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // Animation duration in milliseconds
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const timer = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            // Ease-out quad function for smooth deceleration
            const easedProgress = progress * (2 - progress);
            const currentValue = Math.floor(easedProgress * target);
            
            element.textContent = currentValue.toLocaleString();

            if (currentFrame >= totalFrames) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, frameRate);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                statNumbers.forEach(num => countUp(num));
                countersAnimated = true; // Prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       NEWSLETTER FORM VALIDATION
       ========================================================================== */
    const newsletterForm = document.getElementById('newsletter-form');
    const formMessage = document.getElementById('form-message');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const submitBtn = document.getElementById('form-submit-btn');

        // Simple check
        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.className = 'form-message error';
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Subscribing... <i class="fa-solid fa-spinner fa-spin"></i>';

        // Mock API call delay
        setTimeout(() => {
            formMessage.textContent = `Thank you, ${nameInput.value.split(' ')[0]}! You have subscribed successfully.`;
            formMessage.className = 'form-message success';
            
            // Reset fields
            nameInput.value = '';
            emailInput.value = '';
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Subscribe <i class="fa-solid fa-paper-plane"></i>';
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }, 1200);
    });

    /* ==========================================================================
       DONATION MODAL INTERACTIVE CONTROLS
       ========================================================================== */
    const donationModal = document.getElementById('donation-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const navCtaBtn = document.getElementById('nav-cta-btn');
    const heroPrimaryBtn = document.getElementById('hero-primary-btn');
    const donationAmountBtns = document.querySelectorAll('.donate-amt-btn');
    const customAmtContainer = document.getElementById('custom-amt-container');
    const customDonationInput = document.getElementById('custom-donation-input');
    const donateSubmitBtn = document.getElementById('donate-submit-btn');
    const donorNameInput = document.getElementById('donor-name');
    const donorEmailInput = document.getElementById('donor-email');
    const modalSuccessMessage = document.getElementById('modal-message');

    let selectedAmount = '50';

    const openModal = () => {
        donationModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop page scrolling
    };

    const closeModal = () => {
        donationModal.classList.remove('active');
        document.body.style.overflow = ''; // Resume page scrolling
        resetModalState();
    };

    const resetModalState = () => {
        // Reset selections
        donationAmountBtns.forEach(btn => btn.classList.remove('active'));
        donationAmountBtns[1].classList.add('active'); // Reset to default $50
        selectedAmount = '50';
        customAmtContainer.classList.add('hidden');
        customDonationInput.value = '';
        donorNameInput.value = '';
        donorEmailInput.value = '';
        
        // Hide success message and show submit button
        modalSuccessMessage.classList.add('hidden');
        donateSubmitBtn.classList.remove('hidden');
        donateSubmitBtn.textContent = 'Complete Donation';
        donateSubmitBtn.disabled = false;
    };

    // Open Modal Event Listeners
    if (navCtaBtn) navCtaBtn.addEventListener('click', openModal);
    if (heroPrimaryBtn) heroPrimaryBtn.addEventListener('click', openModal);

    // Also connect the "Get Involved" or section triggers to open the modal
    const impactCtaBtn = document.getElementById('impact-cta-btn');
    if (impactCtaBtn) impactCtaBtn.addEventListener('click', openModal);

    // Close Modal Event Listeners
    modalCloseBtn.addEventListener('click', closeModal);
    donationModal.addEventListener('click', (e) => {
        if (e.target === donationModal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && donationModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Donation amount button triggers
    donationAmountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            donationAmountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const amt = btn.getAttribute('data-amt');
            if (amt === 'custom') {
                customAmtContainer.classList.remove('hidden');
                customDonationInput.focus();
                selectedAmount = 'custom';
            } else {
                customAmtContainer.classList.add('hidden');
                selectedAmount = amt;
            }
        });
    });

    // Handle Donation Submit
    donateSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Field Validation
        if (!donorNameInput.value.trim() || !donorEmailInput.value.trim()) {
            alert('Please fill out your Name and Email address.');
            return;
        }

        let finalAmount = selectedAmount;
        if (selectedAmount === 'custom') {
            finalAmount = customDonationInput.value.trim();
            if (!finalAmount || parseFloat(finalAmount) <= 0) {
                alert('Please enter a valid custom amount.');
                return;
            }
        }

        // Simulating Donation Loading and Success State
        donateSubmitBtn.disabled = true;
        donateSubmitBtn.innerHTML = 'Processing Donation... <i class="fa-solid fa-spinner fa-spin"></i>';

        setTimeout(() => {
            donateSubmitBtn.classList.add('hidden');
            modalSuccessMessage.classList.remove('hidden');
            
            // Close modal after 4 seconds
            setTimeout(() => {
                closeModal();
            }, 4000);
        }, 1500);
    });

    // Extra trigger for "Learn More" links in Programs section to trigger modal
    const programLinks = document.querySelectorAll('.program-link');
    programLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });
    
    // About Read More trigger
    const aboutReadMoreBtn = document.getElementById('about-read-more');
    if (aboutReadMoreBtn) {
        aboutReadMoreBtn.addEventListener('click', () => {
            alert("Opening She Can Foundation Annual Report (Demo Only).");
        });
    }
});
