const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {  
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.main_type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((main_type) => `<li class="type ${main_type}">${main_type}</li>`).join('')}
                    </ol>
                    
                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens (offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const quantRecordNextPage = offset + limit;

    if (quantRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit);
    }

})

    


