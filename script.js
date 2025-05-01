async function fetchHeroes() {
    try {
      const response = await fetch('https://api.opendota.com/api/heroStats');
      const data = await response.json(); // Convert to JSON
      displayHeroes(data);
    } catch (error) {
      console.error('Error fetching heroes:', error);
    }
  }
  
  function displayHeroes(heroes) {
    const container = document.getElementById('heroContainer');
    heroes.forEach(hero => {
      const card = document.createElement('div');
      card.className = 'hero-card';
      card.innerHTML = `
        <img src="https://cdn.cloudflare.steamstatic.com${hero.img}" alt="${hero.localized_name}">
        <div class="hero-name">${hero.localized_name}</div>
        <div class="hero-roles">${hero.roles.join(', ')}</div>
      `;
      container.appendChild(card);
    });
  }
  
  // Call the function on page load
  fetchHeroes();
  