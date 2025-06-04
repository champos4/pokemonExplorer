// Search history functionality
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

function updateSearchHistory(pokemonName) {
    if (!searchHistory.includes(pokemonName)) {
        searchHistory.unshift(pokemonName);
        if (searchHistory.length > 5) {
            searchHistory.pop();
        }
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        updateHistoryDisplay();
    }
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = searchHistory
        .map(name => `<span class="history-item" onclick="searchPokemon('${name}')">${name}</span>`)
        .join('');
}

function searchPokemon(name) {
    document.getElementById('input').value = name;
    fetchData();
}

// Random Pokemon functionality
async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // There are 898 Pokemon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    displayPokemonInfo(data);
    updateSearchHistory(data.name);
}

// Loading spinner functionality
function showLoading() {
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

function showError(message) {
    const pokemonInfo = document.getElementById("pokemonInfo");
    pokemonInfo.innerHTML = `
        <div class="pokemon-info error-message">
            <p>${message}</p>
        </div>
    `;
}

async function fetchData() {
    const pokemonName = document.getElementById("input").value.trim().toLowerCase();
    
    // Clear previous error messages
    document.getElementById("pokemonInfo").innerHTML = '';
    
    // Validate input
    if (!pokemonName) {
        showError("Please enter a Pokemon name!");
        document.getElementById("input").focus();
        return;
    }

    try {
        showLoading();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error(`Pokemon "${pokemonName}" not found! Please check the spelling and try again.`);
        }

        const data = await response.json();
        displayPokemonInfo(data);
        updateSearchHistory(pokemonName);
    }
    catch (error) {
        showError(error.message);
    }
    finally {
        hideLoading();
    }
}

function displayPokemonInfo(pokemon) {
    const pokemonInfo = document.getElementById("pokemonInfo");
    
    // Format abilities
    const abilities = pokemon.abilities.map(ability => 
        `<li>${ability.ability.name}</li>`
    ).join('');

    // Format types
    const types = pokemon.types.map(type => 
        `<li>${type.type.name}</li>`
    ).join('');

    // Format stats
    const stats = pokemon.stats.map(stat => 
        `<p>${stat.stat.name}: ${stat.base_stat}</p>`
    ).join('');

    pokemonInfo.innerHTML = `
        <div class="pokemon-info">
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>ID:</strong> ${pokemon.id}</p>
            <p><strong>Height:</strong> ${pokemon.height / 10}m</p>
            <p><strong>Weight:</strong> ${pokemon.weight / 10}kg</p>
            
            <h3>Types:</h3>
            <ul class="abilities-list">${types}</ul>
            
            <h3>Abilities:</h3>
            <ul class="abilities-list">${abilities}</ul>
            
            <h3>Base Stats:</h3>
            ${stats}
        </div>
    `;
}

// Initialize search history display
document.addEventListener('DOMContentLoaded', updateHistoryDisplay);