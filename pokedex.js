const pokemonCount = 151

var pokedex = {} // {name: "bulbasaur", type: ['grass'], img: "url image"}

printPokedex();

async function printPokedex() {

    base_card = document.getElementById('1');
    pokedex = document.querySelector('#pokedex')
    base_card.remove();

    for(let i = 1; i <= pokemonCount; i++){
        await getPokemon(i);

        const next = base_card.cloneNode(true);
        next.id = i;

        next.getElementsByClassName("name")[0].innerHTML = pokedex[i]["name"].toUpperCase();
        next.getElementsByClassName("poke-img")[0].src = pokedex[i]["pokemonImg"];
        next.getElementsByClassName("poke-id")[0].innerHTML = "#" + i.toString().padStart(3, "0");;
        let typesDiv = next.getElementsByClassName("poke-types")[0];
        
        while (typesDiv.firstChild) {
            typesDiv.firstChild.remove();
        }

        let types = pokedex[i]["types"]

        for(let j = 0; j < types.length; j++){
            let newType = document.createElement("span");
            newType.innerText = types[j]["type"]["name"].toUpperCase();
            newType.classList.add("type");
            newType.classList.add(types[j]["type"]["name"]);
            typesDiv.append(newType);
        }
        
        pokedex.appendChild(next);
        base_card = document.getElementById(i);
 
    }
    
}

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let response = await fetch(url);
    let pokemon = await response.json();

    let pokemonName = pokemon["name"];
    let pokemonTypes = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];

    pokedex[num] = {"name": pokemonName, "types": pokemonTypes, "pokemonImg": pokemonImg};
}