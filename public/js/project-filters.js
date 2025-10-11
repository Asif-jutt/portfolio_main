// Project filtering functionality

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
});

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!filterButtons.length || !projectCards.length) return;

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(projectCards, filter, projectsGrid);
        });
    });

    // Add search functionality
    const searchInput = createSearchInput();
    if (searchInput && projectsGrid) {
        projectsGrid.parentNode.insertBefore(searchInput, projectsGrid);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterProjectsBySearch(projectCards, searchTerm, projectsGrid);
        });
    }
}

function filterProjects(projectCards, filter, container) {
    let visibleCount = 0;
    
    projectCards.forEach((card, index) => {
        const technologies = card.getAttribute('data-technologies') || '';
        const isFeatured = card.getAttribute('data-featured') === 'true';
        
        let shouldShow = false;
        
        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'featured') {
            shouldShow = isFeatured;
        } else {
            shouldShow = technologies.includes(filter.toLowerCase());
        }
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'none';
            
            // Trigger reflow
            card.offsetHeight;
            
            // Add animation
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.5s ease forwards`;
                card.style.animationDelay = `${visibleCount * 0.1}s`;
            }, 10);
            
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no projects message
    showNoProjectsMessage(visibleCount === 0, container);
    
    // Update URL without page reload
    updateURL(filter);
}

function filterProjectsBySearch(projectCards, searchTerm, container) {
    let visibleCount = 0;
    
    projectCards.forEach((card, index) => {
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const technologies = Array.from(card.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        const searchContent = `${title} ${description} ${technologies}`;
        const shouldShow = searchContent.includes(searchTerm);
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = 'none';
            
            // Trigger reflow
            card.offsetHeight;
            
            // Add animation
            setTimeout(() => {
                card.style.animation = `fadeInUp 0.5s ease forwards`;
                card.style.animationDelay = `${visibleCount * 0.1}s`;
            }, 10);
            
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no projects message
    showNoProjectsMessage(visibleCount === 0, container);
}

function showNoProjectsMessage(show, container) {
    let noProjectsMsg = document.querySelector('.no-projects-message');
    
    if (show && !noProjectsMsg) {
        noProjectsMsg = document.createElement('div');
        noProjectsMsg.className = 'no-projects-message';
        noProjectsMsg.innerHTML = `
            <div class="no-projects-content">
                <i class="fas fa-search"></i>
                <h3>No projects found</h3>
                <p>No projects match your current filter. Try selecting a different category or searching for something else.</p>
                <button class="btn btn-primary" onclick="clearFilters()">
                    <i class="fas fa-times"></i>
                    Clear Filters
                </button>
            </div>
        `;
        
        if (container) {
            container.appendChild(noProjectsMsg);
        }
    } else if (!show && noProjectsMsg) {
        noProjectsMsg.remove();
    }
}

function createSearchInput() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'project-search';
    searchContainer.innerHTML = `
        <div class="search-container">
            <div class="search-input-wrapper">
                <i class="fas fa-search"></i>
                <input type="text" 
                       placeholder="Search projects by name, description, or technology..." 
                       class="search-input"
                       id="projectSearch">
                <button class="clear-search" id="clearSearch" style="display: none;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add search functionality
    const searchInput = searchContainer.querySelector('#projectSearch');
    const clearButton = searchContainer.querySelector('#clearSearch');
    
    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    });
    
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        this.style.display = 'none';
        
        // Reset to all projects
        const allButton = document.querySelector('[data-filter="all"]');
        if (allButton) {
            allButton.click();
        }
    });
    
    return searchContainer;
}

function updateURL(filter) {
    const url = new URL(window.location);
    if (filter === 'all') {
        url.searchParams.delete('filter');
    } else {
        url.searchParams.set('filter', filter);
    }
    
    // Update URL without page reload
    window.history.replaceState({}, '', url);
}

function clearFilters() {
    // Clear search input
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Reset to all projects
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
    
    // Update URL
    updateURL('all');
}

// Initialize filters based on URL parameters
function initFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    
    if (filter) {
        const filterButton = document.querySelector(`[data-filter="${filter}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
}

// Initialize filters from URL on page load
initFiltersFromURL();

// Add CSS for search input and animations
const filterStyles = document.createElement('style');
filterStyles.textContent = `
    .project-search {
        margin-bottom: 2rem;
    }
    
    .search-container {
        max-width: 500px;
        margin: 0 auto;
    }
    
    .search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .search-input-wrapper i {
        position: absolute;
        left: 1rem;
        color: var(--text-muted);
        z-index: 1;
    }
    
    .search-input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 3rem;
        border: 2px solid var(--border-color);
        border-radius: 2rem;
        font-size: 1rem;
        background: var(--bg-primary);
        color: var(--text-primary);
        transition: all 0.3s ease;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .clear-search {
        position: absolute;
        right: 1rem;
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .clear-search:hover {
        color: var(--accent-primary);
        background: var(--bg-tertiary);
    }
    
    .no-projects-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
    }
    
    .no-projects-content {
        max-width: 400px;
        margin: 0 auto;
    }
    
    .no-projects-content i {
        font-size: 4rem;
        color: var(--text-muted);
        margin-bottom: 1rem;
    }
    
    .no-projects-content h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
    
    .no-projects-content p {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card {
        transition: all 0.3s ease;
    }
    
    .filter-btn {
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover {
        transform: translateY(-2px);
    }
    
    .filter-btn.active {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
`;

document.head.appendChild(filterStyles);
