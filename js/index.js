const pokemonContainer = document.querySelector(".pokemon-container");
const searchForm = document.querySelector(".search-form");
const searchBar = document.querySelector(".home-search-bar");

// $(document).ready(getautofill());
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onResult(searchBar.value.toLowerCase());
});

new Autocomplete("#autocomplete", {
  search: (input) => {
    if (input.length < 1) {
      return [];
    }
    $(".no-results").hide();
    return pokemonlist.filter((pokemonlist) => {
      return pokemonlist.toLowerCase().startsWith(input.toLowerCase());
    });
  },

  onSubmit: (result) => {
    onResult(result);
  },
});

function onResult(result) {
  console.log(result)
  if(!pokemonlist.includes(result)) {
    $(".no-results").show();
  }
  else {
  localStorage.setItem("pokemonname", result);
  window.location = "pokemoninformation.html";
  }
}
// const fetchPokemon = (pokename) => {
//   axios
//     .get(`https://pokeapi.co/api/v2/pokemon/${pokename}`)
//     .then((response) => {
//       pokemondata = response.data;
//       displayPokemon(pokemondata);
//     })
//     .catch((err) => {
//       noResults();
//     });
// };

// const displayPokemon = (pokemondata) => {
//   var pokemonName = capitaliseString(pokemondata.name);

//   const pokemonTypes = pokemondata.types
//     .map((type) => {
//       return `<div class="type-div"style="background-color:${typeColors[type.type.name]}"><p>${type.type.name}</p></div>`;
//     })
//     .join("");

//   const pokemonStats = pokemondata.stats
//     .map((stat) => {
//       return `<tr><td>${stat.stat.name}: ${stat.base_stat}</td></tr>`;
//     })
//     .join("");

//   const getMovesForGeneration = (moves, generation) => {
//     return moves.filter((move) =>
//       move.version_group_details.some(
//         ({ version_group }) => version_group.name === generation
//       )
//     );
//   };
  
//   const redBlueMoves = getMovesForGeneration(pokemondata.moves, "red-blue");
//   console.log(redBlueMoves);

//   const pokemonMoves = redBlueMoves
//     .map((move) => {
//       return `<tr><td>${move.move.name}</td>
//       <td>${move.version_group_details[0].level_learned_at}</td>
//       <td>${move.version_group_details[0].move_learn_method.name}</td>
//       </tr>`;
//     })
//     .join("");
//   const pokemonHTML = `
//   <div class="pokemon-information">
//     <button class="back-button" onclick="history.go(0)"><i class="fas fa-long-arrow-alt-left"></i></button>

//     <div><h1>${pokemonName}</h1></div>

//     <div class="image-container">
//       <img class="pokemon-image" src="${pokemondata.sprites.front_default}"/>
//     </div>

//     <div>${pokemonTypes}</div>

//     <table class="stat-table">
//       <tr><th>Base stats</th></tr>
//       ${pokemonStats}
//     </table>

//     <table class="move-table">
//       <tr><th colspan="3">Moves</th></tr>
//       <tr><th>Name</th><th>Level</th><th>Method</th></tr>
//       ${pokemonMoves}
//     </table>

//   </div>`;
//   pokemonContainer.innerHTML = pokemonHTML;
//   searchBar.value = "";
// };

// const noResults = () => {
//   $(".no-results").show();
// };

// const capitaliseString = (str) => {
//   const lower = str.toLowerCase();
//   return str.charAt(0).toUpperCase() + lower.slice(1);
// };
