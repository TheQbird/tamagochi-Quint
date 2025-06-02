// Zet of het nacht is (true/false)
// 'let' betekent: maak een variabele aan die later kan veranderen
let isNight = false;
// Houdt bij of de pokemon zichtbaar is (voor toekomstig gebruik)
let isVisible = true;

// Geluiden voor acties (gooien, terughalen, evolueren)
// 'const' betekent: maak een variabele aan die niet meer verandert (constant)
const throwSound = new Audio("Audio/pokeball-throw.mp3");
throwSound.volume = 0.1;
const returnSound = new Audio("Audio/pokeball-return.mp3");
returnSound.volume = 0.1;
const evolveSound = new Audio("Audio/pokemon-evolve.mp3"); 
evolveSound.volume = 0.1;

// Een array is een lijst met meerdere dingen (hier: alle mogelijke Pokémon)
// Elke Pokémon is een object met eigenschappen zoals naam en plaatje
// De eerste ("-") is niks, dus geen Pokémon geselecteerd
const pokemons = [
  {
    name: "-",
    img: "",
    evolvedName: null,
    evolvedImg: null,
    finalName: null,
    finalImg: null
  },
  {
    name: "Gastly",
    img: "Fotos/pokemons/gastly.png",
    evolvedName: "Haunter",
    evolvedImg: "Fotos/pokemons/haunter.png",
    finalName: "Gengar",
    finalImg: "Fotos/pokemons/gengar.png"
  },
  {
    name: "Magikarp",
    img: "Fotos/pokemons/magikarp.png",
    evolvedName: "Gyarados",
    evolvedImg: "Fotos/pokemons/gyarados.png",
    finalName: null,
    finalImg: null
  }
];

// Houdt bij in welke evolutiestap je zit (0 = basis, 1 = eerste evolutie, 2 = tweede evolutie)
let evolutionStage = 0; 
// Welke Pokémon is nu geselecteerd (index in de array hierboven)
let currentPokemonIndex = 0; 
// Het huidige Pokémon object (naam, plaatje, etc)
let currentPokemon = { ...pokemons[currentPokemonIndex] };

// Een functie ('function') is een stukje code dat je kunt hergebruiken
// Wissel tussen dag en nacht modus
function toggleDagNacht() {
  // Zet dag/nacht om
  isNight = !isNight;
  // Pas de achtergrond aan
  document.body.className = isNight ? "night" : "day";
  // Pas de tekst van de knop aan
  document.getElementById("toggle-day").innerText = isNight ? "Maak het dag" : "Maak het nacht";
  console.log("Toggling day/night. Current isNight:", isNight);
}

// Laat je Pokémon evolueren (als dat kan)
function evolvePokemon() {
  // Als er geen Pokémon is gekozen, doe niks
  if (currentPokemonIndex === 0) {
    console.log("Geen Pokémon geselecteerd, kan niet evolven.");
    return;
  }

  // Haal de juiste elementen op om het plaatje en de naam te veranderen
  const pokemonImg = document.getElementById('pokemon-img');
  const pokemonName = document.getElementById('pokemon-name'); 
  const poke = pokemons[currentPokemonIndex];

  // Evolutie logica: als je nog niet geëvolueerd bent, ga naar de eerste evolutie
  if (evolutionStage === 0) {
    currentPokemon.name = poke.evolvedName;
    currentPokemon.img = poke.evolvedImg;
    evolutionStage = 1;
    evolveSound.play();
    console.log("Evolved to:", currentPokemon.name, "Stage:", evolutionStage);
  // Als je al één keer geëvolueerd bent en er is nog een evolutie, ga daar naartoe
  } else if (evolutionStage === 1 && poke.finalName && poke.finalImg) {
    currentPokemon.name = poke.finalName;
    currentPokemon.img = poke.finalImg;
    evolutionStage = 2;
    evolveSound.play();
    console.log("Evolved to:", currentPokemon.name, "Stage:", evolutionStage);
  // Anders ga je terug naar de basisvorm
  } else {
    currentPokemon.name = poke.name;
    currentPokemon.img = poke.img;
    evolutionStage = 0;
    console.log("Reset to base form:", currentPokemon.name, "Stage:", evolutionStage);
  }
  // Update het plaatje en de naam op het scherm
  pokemonImg.src = currentPokemon.img;
  pokemonName.textContent = currentPokemon.name;
}

// Laat de dropdown zien zodat je een andere Pokémon kunt kiezen
function togglePokemon() {
  const button = document.getElementById("toggle-pokemon");
  const img = document.getElementById("pokemon-img");
  const select = document.getElementById("pokemon-dropdown");
  const evolveBtn = document.getElementById("evolve-btn");

  // Speel het geluid van terughalen af
  returnSound.play();

  // Zet de dropdown op "niks" en update de state
  select.value = "0";
  currentPokemonIndex = 0;
  evolutionStage = 0;
  currentPokemon = { ...pokemons[0] };
  updatePokemonDisplay();
  // Verberg de evolve knop en het plaatje
  if (evolveBtn) evolveBtn.style.display = "none";
  img.style.display = "none";

  // Toon de dropdown en verberg de "verander" knop
  select.style.display = "";
  button.style.display = "none";
}

// Deze code wordt uitgevoerd als de pagina geladen is
document.addEventListener("DOMContentLoaded", function() {
  const select = document.getElementById("pokemon-dropdown");
  const button = document.getElementById("toggle-pokemon");
  const img = document.getElementById("pokemon-img");
  const evolveBtn = document.getElementById("evolve-btn");
  // Start direct in "niks" state: geen Pokémon zichtbaar, dropdown open
  select.value = "0";
  currentPokemonIndex = 0;
  evolutionStage = 0;
  currentPokemon = { ...pokemons[0] };
  updatePokemonDisplay();
  if (evolveBtn) evolveBtn.style.display = "none";
  img.style.display = "none";
  select.style.display = "";
  button.style.display = "none";

  if (select) {
    // Als je een andere Pokémon kiest in de dropdown
    select.onchange = function () {
      const idx = parseInt(this.value, 10);
      currentPokemonIndex = idx;
      evolutionStage = 0;
      currentPokemon = { ...pokemons[idx] };
      updatePokemonDisplay();
      // Speel het geluid van gooien af
      throwSound.play();
      // Verberg de dropdown en toon de "verander" knop weer
      select.style.display = "none";
      button.style.display = "";
      // Laat de evolve knop alleen zien als er een Pokémon is gekozen
      if (evolveBtn) evolveBtn.style.display = (idx === 0) ? "none" : "";
      // Laat het plaatje alleen zien als er een Pokémon is gekozen
      img.style.display = (idx === 0) ? "none" : "block";
    };
    // Laat de evolve knop alleen zien als er een Pokémon is gekozen
    const evolveBtn = document.getElementById("evolve-btn");
    if (evolveBtn) evolveBtn.style.display = (currentPokemonIndex === 0) ? "none" : "";
  }
});

// (Optioneel) Functie om direct een Pokémon te kiezen via index
function selectPokemon(index) {
  console.log("Selecting Pokemon at index:", index);
  currentPokemonIndex = index;
  evolutionStage = 0;
  currentPokemon = { ...pokemons[index] };
  updatePokemonDisplay();
}

// Update het plaatje en de naam van de huidige Pokémon op het scherm
function updatePokemonDisplay() {
  const pokemonImg = document.getElementById('pokemon-img');
  const pokemonName = document.getElementById('pokemon-name');
  // Als er geen Pokémon is gekozen, verberg alles
  if (currentPokemonIndex === 0) {
    pokemonImg.style.display = "none";
    pokemonName.textContent = "";
  } else {
    // Anders laat het plaatje en de naam zien
    pokemonImg.src = currentPokemon.img;
    pokemonImg.style.display = "block";
    pokemonName.textContent = currentPokemon.name;
  }
  console.log("Updating Pokemon Display to:", currentPokemon.name, currentPokemon.img);
}