const apiBaseUrl = 'http://localhost:8081/api/v1/pokemon';
const pokeApiBaseUrl = 'http://localhost:8080/api/v2/pokemon/';
let currentPokemonId = null; // Global variable to hold current Pokemon ID

document.addEventListener('DOMContentLoaded', () => {
    loadPokemons();
    window.addEventListener('hashchange', () => {
        const path = window.location.hash.substring(1);
        navigateTo(null, path);
    });
});

function navigateTo(event, path) {
    if (event) event.preventDefault();
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    const targetPage = document.querySelector(`#${path.split('/')[1] || 'home'}`);
    if (targetPage) targetPage.classList.remove('hidden');

    if (path.startsWith('/details')) {
        const id = path.split('/')[2];
        loadPokemonDetails(id);
    }
}

async function loadPokemons() {
    try {
        const response = await fetch(apiBaseUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon data');
        }

        const data = await response.json();
        const pokemonList = document.getElementById('pokemon-list');
        pokemonList.innerHTML = '';

        data.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'pokemon-card';
            pokemonCard.innerHTML = `
                <h2>${pokemon.nome}</h2>
                <img src="${pokemon.imagem}" alt="${pokemon.nome}">
                <p>${pokemon.descricao}</p>
                <p>Treinador: ${pokemon.usuario}</p>
                <a href="#/details/${pokemon.id}" onclick="navigateTo(event, '/details/${pokemon.id}')">View Details</a>
            `;
            pokemonList.appendChild(pokemonCard);
        });
    } catch (error) {
        console.error('Error loading Pokémon:', error);
    }
}

async function addPokemon(event) {
    event.preventDefault();
    const form = document.getElementById('add-pokemon-form');
    const formData = {
        nome: form.nome.value,
        descricao: form.descricao.value,
        valor: form.valor.value,
        tempo: form.tempo.value,
        usuario: form.usuario.value,
        imagem: form.imagem.value,
    };
    const response = await fetch(apiBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if (response.ok) {
        alert('Pokemon added successfully!');
        form.reset();
        navigateTo(null, '/');
        await loadPokemons();
    } else {
        alert('Failed to add Pokemon.');
    }
}

async function loadPokemonDetails(id) {
    const apiBaseWithId = apiBaseUrl +"/"+ id;
    const response = await fetch(apiBaseWithId);
    const pokemon = await response.json();
    const pokemonDetails = document.getElementById('pokemon-details');
    currentPokemonId = id; // Save current Pokemon ID for later use (delete or update)

    pokemonDetails.innerHTML = `
            <h2>${pokemon.nome}</h2>
            <img src="${pokemon.imagem}" alt="${pokemon.nome}">
            <p>${pokemon.descricao}</p>
            <p>Value: ${pokemon.valor}</p>
            <p>Time: ${pokemon.tempo}</p>
            <p>User: ${pokemon.usuario}</p>
        `;
}

async function updateTrainer(event) {
    event.preventDefault();
    const newTrainer = document.getElementById('new-trainer').value;
    const call = apiBaseUrl+"/pokemon/"+currentPokemonId+"/treinador";
    if (currentPokemonId) {
        const response = await fetch(call, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTrainer)
        });

        if (response.ok) {
            alert('Trainer updated successfully!');
            document.getElementById('new-trainer').value = ''; // Clear input
            loadPokemonDetails(currentPokemonId); // Reload details
        } else {
            alert('Failed to update trainer.');
        }
    }
}

async function deletePokemon() {
    if (currentPokemonId) {
        const call = apiBaseUrl+"/pokemon/"+currentPokemonId;
        const response = await fetch(call, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Pokemon deleted successfully!');
            navigateTo(null, '/'); // Redirect to home
            loadPokemons(); // Refresh list
        } else {
            alert('Failed to delete Pokemon.');
        }
    }
}

async function searchPokemon(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-name').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    try {
        const call = pokeApiBaseUrl+searchInput;
        const response = await fetch(call);
        if (!response.ok) throw new Error('Pokemon not found.');
        const pokemon = await response.json();
        searchResults.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Height: ${(pokemon.height / 10)} m</p>
        <p>Weight: ${(pokemon.weight / 10)} kg</p>
        <p>Types: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p>Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        <h3>Base Stats:</h3>
        <ul>
        ${pokemon.stats.map(stat => `
            <li>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</li>
        `).join('')}
    </ul>
`;
    } catch (error) {
        searchResults.innerHTML = `<p>${error.message}</p>`;
    }
}