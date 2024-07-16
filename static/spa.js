const apiBaseUrl = 'http://127.0.0.1:5000/api/v1';

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
    const response = await fetch(`${apiBaseUrl}/pokemon`);
    const data = await response.json();
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';
    data.pokemons.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.className = 'pokemon-card';
        pokemonCard.innerHTML = `
                    <h2>${pokemon.nome}</h2>
                    <img src="${pokemon.imagem}" alt="${pokemon.nome}">
                    <p>${pokemon.descricao}</p>
                    <a href="#/details/${pokemon.id}" onclick="navigateTo(event, '/details/${pokemon.id}')">View Details</a>
                `;
        pokemonList.appendChild(pokemonCard);
    });
}

async function addPokemon(event) {
    event.preventDefault();
    const form = document.getElementById('add-pokemon-form');
    const formData = new FormData();

    formData.append('nome', document.getElementById('nome').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('valor', document.getElementById('valor').value);
    formData.append('tempo', document.getElementById('tempo').value);
    formData.append('usuario', document.getElementById('usuario').value);
    formData.append('imagem', document.getElementById('imagem').value);

    const response = await fetch(`${apiBaseUrl}/pokemon`, {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: formData
    });
    if (response.ok) {
        alert('Pokemon added successfully!');
        form.reset();
        navigateTo(null, '/');
        loadPokemons();
    } else {
        alert('Failed to add Pokemon.');
    }
}

async function loadPokemonDetails(id) {
    const response = await fetch(`${apiBaseUrl}/pokemon/${id}`);
    const pokemon = await response.json();
    const pokemonDetails = document.getElementById('pokemon-details');
    pokemonDetails.innerHTML = `
                <h2>${pokemon.nome}</h2>
                <img src="${pokemon.imagem}" alt="${pokemon.nome}">
                <p>${pokemon.descricao}</p>
                <p>Value: ${pokemon.valor}</p>
                <p>Time: ${pokemon.tempo}</p>
                <p>User: ${pokemon.usuario}</p>
            `;
}
