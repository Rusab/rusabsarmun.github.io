// Achievement data
const achievements = [
    {
        title: "QU Health Research Symposium",
        position: "Runner Up",
        year: "2024",
        place: "Qatar University",
        description: "Runner Up at the Eighth QU Health Sector Annual Research Symposium",
        image: "assets/images/achievements/QU_Health.jpg"
    },
    {
        title: "DUSS Competition",
        position: "First Place",
        year: "2023",
        place: "Dhaka University",
        description: "Won first place in the robotics competition",
        image: "assets/images/achievements/DUSS.jpg"
    },
    {
        title: "Robo Fiesta",
        position: "Champion",
        year: "2022",
        place: "IUT Robotics Competition",
        description: "Secured championship in the robotics competition",
        image: "assets/images/achievements/Robo_Fiesta.jpg"
    }
];

// Project data
const projects = [
    {
        category: "Machine Learning",
        title: "CV Based Batch-Billing System",
        description: "A computer vision-based billing system using YOLO for simultaneous detection of multiple retail products, featuring hybrid ArUco markers for weight-dependent items.",
        image: "assets/images/projects/batch-billing.jpg", 
        pdf: "assets/cv-batch-billing.pdf",
        details: "projects/batch-billing.html"
    },
    {
        category: "Robotics",
        title: "Autonomous Navigation Robot",
        description: "A robot designed for autonomous navigation and obstacle avoidance using advanced sensors and control algorithms.",
        image: "assets/images/projects/robot1.jpg", 
        details: "projects/robot1.html"
    },
    {
        category: "Robotics",
        title: "Multi-terrain Robot",
        description: "A versatile robot capable of traversing various terrains using adaptive locomotion mechanisms.",
        image: "assets/images/projects/robot2.jpg", 
        details: "projects/robot2.html"
    }
];

// Function to create achievement card
function createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    
    card.innerHTML = `
        <div class="achievement-image">
            <img src="${achievement.image}" alt="${achievement.title}" loading="lazy">
        </div>
        <div class="achievement-content">
            <h3>${achievement.title}</h3>
            <p class="position">${achievement.position}</p>
            <p class="year">${achievement.year}</p>
            <p class="place">${achievement.place}</p>
            <p class="description">${achievement.description}</p>
        </div>
    `;
    
    return card;
}

// Function to create project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
                ${project.pdf ? `
                    <a href="${project.pdf}" target="_blank" class="project-link">
                        <i class="fas fa-file-pdf"></i> PDF
                    </a>
                ` : ''}
                ${project.details ? `
                    <a href="${project.details}" class="project-link">
                        <i class="fas fa-info-circle"></i> Learn More
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Load achievements
function loadAchievements() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    achievementsGrid.innerHTML = ''; 
    
    achievements.forEach(achievement => {
        const achievementCard = createAchievementCard(achievement);
        achievementsGrid.appendChild(achievementCard);
    });
}

// Load projects
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = ''; 
    
    // Create category sections
    const categories = [...new Set(projects.map(p => p.category))];
    
    categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'project-category';
        
        categorySection.innerHTML = `
            <h2 class="category-title">${category}</h2>
            <div class="category-grid">
                ${projects
                    .filter(p => p.category === category)
                    .map(project => `
                        <div class="project-card">
                            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                            <div class="project-content">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <div class="project-links">
                                    ${project.pdf ? `
                                        <a href="${project.pdf}" target="_blank" class="project-link">
                                            <i class="fas fa-file-pdf"></i> PDF
                                        </a>
                                    ` : ''}
                                    ${project.details ? `
                                        <a href="${project.details}" class="project-link">
                                            <i class="fas fa-info-circle"></i> Learn More
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
            </div>
        `;
        
        projectsGrid.appendChild(categorySection);
    });
}

// Load all projects
function loadAllProjects() {
    const mlProjectsGrid = document.querySelector('.category-section:nth-child(2) .projects-grid');
    const roboticsProjectsGrid = document.querySelector('.category-section:nth-child(3) .projects-grid');

    // Load ML Projects
    projects.filter(p => p.category === 'Machine Learning').forEach(project => {
        const projectCard = createProjectCard(project);
        mlProjectsGrid.appendChild(projectCard);
    });

    // Load Robotics Projects
    projects.filter(p => p.category === 'Robotics').forEach(project => {
        const projectCard = createProjectCard(project);
        roboticsProjectsGrid.appendChild(projectCard);
    });
}

// Load all achievements
function loadAllAchievements() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    achievements.forEach(achievement => {
        const achievementCard = createAchievementCard(achievement);
        achievementsGrid.appendChild(achievementCard);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadAchievements();
    loadProjects();
    loadAllProjects();
    loadAllAchievements();
});
