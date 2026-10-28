const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const projectDialog = document.querySelector('.project-dialog');
const projectDetails = {
  vascular: {
    category: 'AI/ML · HEALTHCARE RESEARCH · REGRESSION',
    title: 'Vascular Age Prediction',
    description: 'Investigated vascular-age estimation using arterial-stiffness and clinical measurements, comparing statistical and machine-learning regression approaches. This is an estimation research project, not a medical diagnostic product. Performance metrics have not been added.',
    tags: ['Arterial stiffness', 'Regression', 'Model comparison'],
    url: 'https://github.com/dpc168/A-curated-arterial-stiffness-dataset-for-vascular-age-prediction-in-China',
  },
  ecg: {
    category: 'AI/ML · ECG SIGNALS · FOUNDATION MODELS',
    title: 'CLEF ECG Foundation Model',
    description: 'Built a CPU-compatible ECG chronological-age estimation workflow using the pretrained CLEF-Small foundation model and a regression head, with input verification and participant-level split auditing. No clinical validation or performance claims are implied.',
    tags: ['CLEF-Small', 'PTB-XL', 'CPU inference', 'Split auditing'],
    url: 'https://github.com/Nokia-Bell-Labs/ecg-foundation-model',
  },
  mntn: {
    category: 'FRONTEND · RESPONSIVE UI',
    title: 'MNTN Landing Page',
    description: 'Created a landing-page interface with HTML, CSS, and JavaScript, focusing on layout, styling, and frontend implementation.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/SaiVigneshKota/MNTN-LANDING_PAGE.git',
  },
  trustlens: {
    category: 'EDTECH · PRODUCT CONCEPT · SDG 4',
    title: 'TrustLens',
    description: 'A learning-support concept focused on helping students spot prerequisite knowledge gaps and plan targeted revision. The idea is oriented around SDG 4: inclusive, equitable quality education. It is a concept exploration, not a deployed learning platform.',
    tags: ['Prerequisite mapping', 'Focused revision', 'SDG 4'],
  },
  neat: {
    category: 'AI · NEUROEVOLUTION · EXPERIMENT',
    title: 'Flappy Bird AI with NEAT',
    description: 'An exploration of neuroevolution through neural-network agents in a Flappy Bird-style environment. The experiment uses the NEAT approach as a way to study how network structure and behavior can evolve across generations.',
    tags: ['NEAT', 'Neural networks', 'Simulation'],
  },
};

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
  siteNav.classList.toggle('is-open', !isExpanded);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    siteNav.classList.remove('is-open');
  }
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    document.querySelectorAll('.project').forEach((project) => {
      project.hidden = filter !== 'all' && project.dataset.category !== filter;
    });
  });
});

if (projectDialog) {
  document.querySelectorAll('.project-image').forEach((button) => {
    button.addEventListener('click', () => {
      const details = projectDetails[button.closest('.project').dataset.project];
      document.querySelector('#dialog-category').textContent = details.category;
      document.querySelector('#dialog-title').textContent = details.title;
      document.querySelector('#dialog-description').textContent = details.description;
      document.querySelector('#dialog-tags').replaceChildren(...details.tags.map((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        return element;
      }));
      const resourceLink = document.querySelector('#dialog-link');
      resourceLink.hidden = !details.url;
      if (details.url) resourceLink.href = details.url;
      projectDialog.showModal();
    });
  });

  projectDialog.addEventListener('click', (event) => {
    if (event.target === projectDialog) projectDialog.close();
  });
}

const revealTargets = document.querySelectorAll('.project, .about-inner, .skill-row, .timeline-item, .note-item, .contact-section, .about-page .about-reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element) => element.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
}

document.querySelector('#year').textContent = new Date().getFullYear();
