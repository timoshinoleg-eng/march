/**
 * ChatBot24 Studio — Landing Page Scripts
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const fallbackForm = document.getElementById('fallback-form');
    const toastContainer = document.getElementById('toast-container');

    // ========================================
    // Mobile Menu
    // ========================================
    function toggleMenu() {
        if (!menuToggle || !navMenu) return;
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-open');
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    }

    function closeMenu() {
        if (!menuToggle || !navMenu) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
        if (!navMenu || !menuToggle) return;
        if (navMenu.classList.contains('is-open') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
            if (menuToggle) menuToggle.focus();
        }
    });

    // ========================================
    // Active Navigation on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('is-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('is-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ========================================
    // Toast Notifications
    // ========================================
    function showToast(message, type = 'success') {
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        
        const iconSvg = type === 'success' 
            ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/></svg>'
            : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/></svg>';
        
        toast.innerHTML = `
            <span class="toast-icon">${iconSvg}</span>
            <span class="toast-message">${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('toast--out');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 4000);
    }

    // ========================================
    // Fallback Form Handling
    // ========================================
    if (fallbackForm) {
        // Telegram validation - normalize to @username format
        function normalizeTelegram(value) {
            value = value.trim();
            // Remove spaces
            value = value.replace(/\s/g, '');
            // Add @ if missing
            if (value && !value.startsWith('@')) {
                value = '@' + value;
            }
            return value;
        }

        function validateTelegram(value) {
            value = value.trim();
            if (!value) return 'Укажите Telegram';
            // Remove @ for validation
            const username = value.replace(/^@/, '');
            // Telegram username: 5-32 chars, a-z, 0-9, underscores
            if (username.length < 5) return 'Минимум 5 символов';
            if (username.length > 32) return 'Максимум 32 символа';
            if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Только буквы, цифры и подчёркивания';
            return '';
        }

        function validateMessage(value) {
            value = value.trim();
            if (!value) return 'Напишите сообщение';
            if (value.length < 10) return 'Минимум 10 символов';
            return '';
        }

        function showFieldError(field, errorElement, message) {
            if (message) {
                field.classList.add('is-error');
                errorElement.textContent = message;
                return false;
            } else {
                field.classList.remove('is-error');
                errorElement.textContent = '';
                return true;
            }
        }

        // Real-time validation
        const telegramInput = document.getElementById('fallback-telegram');
        const messageInput = document.getElementById('fallback-message');
        
        if (telegramInput) {
            telegramInput.addEventListener('blur', function() {
                const errorElement = document.getElementById('fallback-telegram-error');
                const error = validateTelegram(this.value);
                showFieldError(this, errorElement, error);
            });

            telegramInput.addEventListener('input', function() {
                // Auto-remove spaces
                if (this.value.includes(' ')) {
                    this.value = this.value.replace(/\s/g, '');
                }
                if (this.classList.contains('is-error')) {
                    this.classList.remove('is-error');
                    const errorElement = document.getElementById('fallback-telegram-error');
                    if (errorElement) errorElement.textContent = '';
                }
            });
        }

        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                const errorElement = document.getElementById('fallback-message-error');
                const error = validateMessage(this.value);
                showFieldError(this, errorElement, error);
            });

            messageInput.addEventListener('input', function() {
                if (this.classList.contains('is-error')) {
                    this.classList.remove('is-error');
                    const errorElement = document.getElementById('fallback-message-error');
                    if (errorElement) errorElement.textContent = '';
                }
            });
        }

        // Form submission
        fallbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const telegramField = document.getElementById('fallback-telegram');
            const messageField = document.getElementById('fallback-message');
            const nameField = document.getElementById('fallback-name');
            
            const telegramError = document.getElementById('fallback-telegram-error');
            const messageError = document.getElementById('fallback-message-error');

            // Validate
            let isValid = true;
            
            const telegramValidation = validateTelegram(telegramField.value);
            isValid = showFieldError(telegramField, telegramError, telegramValidation) && isValid;
            
            const messageValidation = validateMessage(messageField.value);
            isValid = showFieldError(messageField, messageError, messageValidation) && isValid;

            if (!isValid) {
                // Focus first error
                const firstError = fallbackForm.querySelector('.is-error');
                if (firstError) firstError.focus();
                return;
            }

            // Normalize telegram
            const telegram = normalizeTelegram(telegramField.value);
            const name = nameField ? nameField.value.trim() : '';
            const message = messageField.value.trim();

            // Prepare data
            const data = {
                telegram: telegram,
                message: message,
                name: name
            };

            // Submit to API
            try {
                const submitBtn = document.getElementById('fallback-submit');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Отправка...';
                }

                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить запрос';
                }

                if (response.ok) {
                    showToast('Готово! Ответим в Telegram в течение часа (в рабочее время).', 'success');
                    fallbackForm.reset();
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    showToast(errorData.message || 'Не получилось отправить. Попробуйте ещё раз или напишите в Telegram.', 'error');
                }
            } catch (error) {
                console.error('Submit error:', error);
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Отправить запрос';
                }
                
                showToast('Не получилось отправить. Попробуйте ещё раз или напишите в Telegram.', 'error');
            }
        });
    }

    // ========================================
    // Header scroll effect
    // ========================================
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            if (currentScroll > 10) {
                header.style.background = 'rgba(7, 10, 18, 0.95)';
            } else {
                header.style.background = 'rgba(7, 10, 18, 0.85)';
            }
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // ========================================
    // FAQ Accordion (smooth animation)
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        
        summary.addEventListener('click', (e) => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }
            });
        });
    });

    // ========================================
    // Initialize
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        // Handle hash in URL
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'auto'
                    });
                }, 100);
            }
        }
    });

})();