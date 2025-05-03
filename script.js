async function fetchHeroes() {
  try {
    const response = await fetch('https://api.opendota.com/api/heroStats');
    const data = await response.json();
    displayHeroes(data);
    createRoleCheckboxes(data);
  } catch (error) {
    console.error('Error fetching heroes:', error);
  }
}

function displayHeroes(heroes) {
  const container = document.getElementById('heroContainer');
  container.innerHTML = '';
  heroes.forEach(hero => {
    const card = document.createElement('div');
    card.className = 'hero-card';
    card.setAttribute('data-roles', hero.roles.join(',').toLowerCase());
    card.style.backgroundImage = `url(https://cdn.cloudflare.steamstatic.com${hero.img})`;

    card.innerHTML = `
      <div class="hero-info">
        <div class="hero-name">${hero.localized_name}</div>
        <div class="hero-roles">${hero.roles.join(', ')}</div>
      </div>
    `;
    container.appendChild(card);
  });
}


function createRoleCheckboxes(heroes) {
  const roleSet = new Set();
  heroes.forEach(hero => {
    hero.roles.forEach(role => roleSet.add(role));
  });

  const checkboxContainer = document.getElementById('roleCheckboxes');
  checkboxContainer.innerHTML = '';

  roleSet.forEach(role => {
    const label = document.createElement('label');
    label.className = 'role-checkbox-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = role.toLowerCase();
    checkbox.className = 'role-checkbox';
    checkbox.onchange = filterBySelectedRoles;

    const span = document.createElement('span');
    span.textContent = ' ' + role;

    label.appendChild(checkbox);
    label.appendChild(span);
    checkboxContainer.appendChild(label);

    setTimeout(() => {
      label.classList.add('loaded');
    }, 50);
  });
}


function filterBySelectedRoles() {
  const selectedRoles = Array.from(document.querySelectorAll('.role-checkbox:checked')).map(cb => cb.value);
  const heroCards = document.querySelectorAll('.hero-card');

  heroCards.forEach(card => {
    const heroRoles = card.getAttribute('data-roles').split(',');
    const hasAllSelectedRoles = selectedRoles.every(role => heroRoles.includes(role));
    card.style.display = selectedRoles.length === 0 || hasAllSelectedRoles ? 'block' : 'none';
  });
}

function searchHeroes() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const heroCards = document.querySelectorAll('.hero-card');
  heroCards.forEach(card => {
    const heroName = card.querySelector('.hero-name').textContent.toLowerCase();
    const isVisible = heroName.includes(searchInput);
    card.style.display = isVisible ? 'block' : 'none';
  });
}

fetchHeroes();
