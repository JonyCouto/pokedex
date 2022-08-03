const endPoint = 'https://pokeapi.co/api/v2/pokemon/';
const imgPokemon = document.querySelector('[pk-img]');
const pokemon = document.querySelector('[pk-pokemon]');
const form = document.querySelector('form');
const pesquisa = document.querySelector('[pk-pesquisa]');
const btnProximo = document.querySelector('[pk-proximo]');
const btnAnterior = document.querySelector('[pk-anterior]');

let idPokemon = 1;

const naoEncontrado = () => {
    pesquisa.value = '';
    pokemon.innerHTML = 'Não encontrado!';
    imgPokemon.style.display = 'none';
}

const carregandoDados = () => {
    pokemon.innerHTML = 'Carregando...';
    imgPokemon.style.display = 'none';
}

const getPokemon = async pokemon => {
    carregandoDados();
    if (typeof(pokemon) != 'number'){
        pokemon = pokemon.toLowerCase();
    }
    const APIResponse = await fetch(`${endPoint}${pokemon}`);
    if (APIResponse.status == 200){
        const dados = await APIResponse.json();
        renderizaPokemon(dados);
    } else{
        naoEncontrado();
    }
}

const renderizaPokemon = dados => {
    idPokemon = dados.id;
    pesquisa.value = '';
    pokemon.innerHTML = `${dados.id}: ${dados.species.name}`;
    imgPokemon.src = dados["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    imgPokemon.style.display = 'block';
}

const proximoPokemon = () => {
    getPokemon(++idPokemon);
}

const anteriorPokemon = () => {
    if (idPokemon > 1){
        getPokemon(--idPokemon);
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const nomePokemon = pesquisa.value;
    getPokemon(nomePokemon);
})

btnProximo.addEventListener('click', () => {
    proximoPokemon();
})

btnAnterior.addEventListener('click', () => {
    anteriorPokemon();
})

getPokemon(idPokemon);