document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navBrand = document.querySelector('.nav-brand');

    // Ensure nav brand text is always correct
    if (navBrand) {
        navBrand.textContent = 'Willy Zuo';
    }

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Handle navigation
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to load page content
    async function loadPage(page) {
        try {
            const path = page.startsWith('/') ? page.slice(1) : `pages/${page}.html`;
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            
            // Create a temporary container to parse the HTML
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = content;
            
            // Extract only the main content section
            const mainContent = tempContainer.querySelector('#content');
            if (mainContent) {
                contentDiv.innerHTML = mainContent.innerHTML;
            } else {
                contentDiv.innerHTML = content;
            }
            
            // Update active state in navigation
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.page === page);
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            
            // Update page title
            const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);
            document.title = `${pageTitle} - Willy Zuo`;
            
            // Ensure nav brand is correct after content load
            document.querySelector('.nav-brand').textContent = 'Willy Zuo';
        } catch (error) {
            console.error('Error loading page:', error);
            contentDiv.innerHTML = '<p>Error loading content. Please try again.</p>';
        }
    }

    // Handle navigation clicks - Only for nav-menu links
    document.querySelector('.nav-menu').addEventListener('click', (e) => {
        const navLink = e.target.closest('.nav-link');
        if (navLink) {
            e.preventDefault();
            const page = navLink.dataset.page;
            history.pushState({ page }, '', `/${page}`);
            loadPage(page);
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || 'about';
        loadPage(page);
    });

    // Load initial page only if we're not on a photography subpage
    const path = window.location.pathname;
    if (!path.includes('/photography/')) {
        const initialPage = path.slice(1) || 'about';
        history.replaceState({ page: initialPage }, '', `/${initialPage}`);
        loadPage(initialPage);
    }
}); 