const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 151;
const colors = {
    fire: ' #ff0000',
    grass: ' #90ee90',
    electric: ' #FFFF00',
    water: ' #00ffff',
    ground: ' #e2725b',
    rock: ' #C0C0C0',
    fairy: ' #b4f0f0',
    poison: ' #800080',
    bug: ' #CCFF00',
    dragon: ' #1F4D75',
    psychic: ' #8A2BE2',
    flying: ' #87CEEB',
    fighting: ' #D32F2F',
    normal: ' #D3D3D3',
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data)
    
};
const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > - 1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
     <div class = "imgcontainer">
     <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt = "${name}">
    </div>
    <div class="info">
    <span class ="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
    </div> 
` 

card.innerHTML = pokemonInnerHTML
pokeContainer.appendChild(card)


}

fetchPokemons();
