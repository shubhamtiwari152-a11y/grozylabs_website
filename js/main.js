document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Optional: Toggle icon between menu and close
            const icon = menuBtn.querySelector('.material-symbols-outlined');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.textContent = 'menu';
                } else {
                    icon.textContent = 'close';
                }
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update Active Button State
                filterBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20');
                    b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300', 'border', 'border-gray-200', 'dark:border-gray-700');
                    // Reset icon color
                    const icon = b.querySelector('.material-symbols-outlined');
                    if (icon) icon.classList.remove('text-white');
                    if (icon) icon.classList.add('text-slate-500');
                });

                // Set Active Style
                btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300', 'border', 'border-gray-200', 'dark:border-gray-700');
                btn.classList.add('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20');
                const activeIcon = btn.querySelector('.material-symbols-outlined');
                if (activeIcon) activeIcon.classList.remove('text-slate-500');
                if (activeIcon) activeIcon.classList.add('text-white');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                        card.style.display = 'flex';
                        // Re-trigger animation if needed, or just show
                        setTimeout(() => card.classList.add('visible'), 50);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('visible');
                    }
                });
            });
        });
    }
});
