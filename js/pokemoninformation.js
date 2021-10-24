const pokemonContainer = document.querySelector(".pokemon-info-container");
pokemonName = localStorage.getItem("pokemonname");
const searchBar = document.querySelector(".search-bar");
const searchForm = document.querySelector(".search-form");
var redBlueMoves = [];
var yellowMoves = [];

axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
    pokemondata = response.data;
    displayPokemon(pokemondata);
    })
    .catch((err) => {
        console.log(err)
    });

const displayPokemon = (pokemondata) => {

    const pokemonTypes = pokemondata.types
        .map((type) => {
        return `<div class="type-div" style="background-color:${typeColors[type.type.name]};"><p>${type.type.name}</p></div>`;
        })
        .join("");
    
    const pokemonStats = pokemondata.stats
        .map((stat) => {
        return `<li>${splitStats(stat.stat.name)}: ${stat.base_stat}</li>`;
        })
        .join("");
    
    const getMovesForGeneration = (moves, generation) => {
        return moves.filter((move) =>
        move.version_group_details.some(
            ({ version_group }) => version_group.name === generation
        )
        );
    };
    
    redBlueMoves = getMovesForGeneration(pokemondata.moves, "red-blue");
    yellowMoves = getMovesForGeneration(pokemondata.moves, "yellow");

    const pokemonRedBlueMoves = redBlueMoves
    .map((move) => {
        return `<tr><td>${move.move.name}</td>
        <td>${move.version_group_details[0].level_learned_at}</td>
        <td>${move.version_group_details[0].move_learn_method.name}</td>
        </tr>`;
        })
        .join("");

    const pokemonYellowMoves = yellowMoves
    .map((move) => {
        return `<tr><td>${move.move.name}</td>
        <td>${move.version_group_details[0].level_learned_at}</td>
        <td>${move.version_group_details[0].move_learn_method.name}</td>
        </tr>`;
        })
        .join("");

    const pokemonHTML = `
    <div class="pokemon-information">
    
        <div><h1>${pokemondata.name}</h1></div>
    
        <div class="image-container">
        <img class="pokemon-image" src="${pokemondata.sprites.front_default}"/>
        </div>
    
        <div class="pokemon-types-outer">${pokemonTypes}</div>
        
        <div class="stat-list">
        <ul>
        ${pokemonStats}
        </ul>
        </div>

        <h3>Moves</h3>
        <button id="redblue-collapse" class="collapse-moves" onClick="displayRedBlue()"><text>Red and Blue</text></button>
        <div id="redblue-content" class="move-content">
        <table class="move-table">
        <tr><th>Name</th><th>Level</th><th>Method</th></tr>
        ${pokemonRedBlueMoves}
        </table>
        </div>

        <button id="yellow-collapse" class="collapse-moves" onClick="displayYellow()"><text>Yellow</text></button>
        <div id="yellow-content" class="move-content">
        <table class="move-table">
        <tr><th>Name</th><th>Level</th><th>Method</th></tr>
        ${pokemonYellowMoves}
        </table>
        </div>
    
    </div>`;
    pokemonContainer.innerHTML = pokemonHTML;
};

//turn stats into two seperate words
function splitStats(stat) {
    if(stat.includes("-")) {
        stats = stat.split("-")
        return stats.join(" ");
    } else {
        return stat;
    }
}

function displayRedBlue() {
    if(redBlueMoves === undefined || redBlueMoves.length === 0) {
        return;
    } else {
        $("#redblue-collapse").toggleClass("active");
        $("#redblue-content").slideToggle();
    }
}
function displayYellow() {
    if(yellowMoves == undefined || yellowMoves.length ==0) {
        return;
    } else {
        $("#yellow-collapse").toggleClass("active");
        $("#yellow-content").slideToggle();
    }
}

// const capitaliseString = (str) => {
//     const lower = str.toLowerCase();
//     return str.charAt(0).toUpperCase() + lower.slice(1);
// };

/* ------------------------------- search bars ------------------------------ */
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // pokemonContainer.innerHTML = "";
    onSearch(searchBar.value.toLowerCase());
  });
  
  new Autocomplete("#autocomplete-header", {
    search: (input) => {
      if (input.length < 1) {
        return [];
      }
      // console.log(pokemonlist)
      // $(".no-results").hide();
      return pokemonlist.filter((pokemonlist) => {
        return pokemonlist.toLowerCase().startsWith(input.toLowerCase());
      });
    },
  
    onSubmit: (result) => {
      // pokemonContainer.innerHTML = "";
      onSearch(result);
    },
  });
  
  new Autocomplete("#autocomplete-burgermenu", {
    search: (input) => {
      if (input.length < 1) {
        return [];
      }
      // console.log(pokemonlist)
      // $(".no-results").hide();
      return pokemonlist.filter((pokemonlist) => {
        return pokemonlist.toLowerCase().startsWith(input.toLowerCase());
      });
    },
  
    onSubmit: (result) => {
      // pokemonContainer.innerHTML = "";
      onSearch(result);
    },
  });

  function onSearch(result) {
    console.log(result)
    if(!pokemonlist.includes(result)) {
      // $(".no-results").show();
    }
    else {
    localStorage.setItem("pokemonname", result);
    window.location = "pokemoninformation.html";
    }
  }