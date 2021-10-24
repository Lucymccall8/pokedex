const apiEndPoint = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
var nextURL = "";
var prevURL = "";
const pokedex = document.querySelector("#pokemon-container");
const searchBar = document.querySelector(".search-bar");
const searchForm = document.querySelector(".search-form");

const fetchBasicData = (apiPage) => {
  pokedex.innerHTML = "";
  promises = [];
  axios.get(`${apiPage}`).then(response => {
    nextURL = response.data.next;
    prevURL = response.data.previous;
    data = response.data.results;
    console.log(data);
    
    fetchPokemon(data);
  })
  
}
const fetchPokemon = (data) => {
  data.forEach(poke => {
    promises.push(axios.get(`${poke.url}`))
  });
  Promise.all(promises).then((results) =>{
    const pokemon = results.map((pokedata) => ({
      name: pokedata.data.name,
      id: pokedata.data.id,
      sprite: pokedata.data.sprites.front_default,
      type: pokedata.data.types.map((type) => {
        return `<div class="card-type-inner"><div class="card-type-color" style="background-color:${typeColors[type.type.name]}"></div><p>${capitaliseString(type.type.name)}</p></div>`;
      }).join(""),
    }))
    displayPokemon(pokemon)
  })
}

const displayPokemon = (pokemon) => {
  const pokemonHTML = pokemon
    .map(
      (poke) =>
        `<div onclick="onResult('${poke.name}')" class="pokemon-card">
          <div class="card-effect">
            <div class="card-text"><h2>${capitaliseString(poke.name)}</h2></div>
            <div class="card-body">
              <div class="card-image"><img src="${poke.sprite}"/></div>
              <div class="card-type-outer">${poke.type}</div>
            </div>
          </div>
        </div>`
    )
    .join("");
  pokedex.innerHTML = pokemonHTML;
};

function onResult(result) {
  localStorage.setItem("pokemonname", result);
  window.location = "pokemoninformation.html";
}

const capitaliseString = (str) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

const pageButtonClick = (url) => {
  if(url == null) {
  }
  else {
    fetchBasicData(url)
  }
}

/* ------------------------------- search bar ------------------------------ */

searchForm.addEventListener("submit", (e) => {
  console.log("hi");
  e.preventDefault();
  onSearch(searchBar.value.toLowerCase());
});

new Autocomplete("#autocomplete-burgermenu", {
  search: (input) => {
    if (input.length < 1) {
      return [];
    }
    return pokemonlist.filter((pokemonlist) => {
      return pokemonlist.toLowerCase().startsWith(input.toLowerCase());
    });
  },

  onSubmit: (result) => {
    e.preventDefault();
    onSearch(result);
  },
});

function onSearch(result) {
  console.log(result)
  if(!pokemonlist.includes(result)) {
    console.log("hi")
  }
  else {
  localStorage.setItem("pokemonname", result);
  window.location = "pokemoninformation.html";
  }
}

$(document).ready(fetchBasicData(apiEndPoint));
