// Zet of het nacht is (true of false)
// 'let' betekent een variabele die later kan veranderen
let isNight = false
// Houdt bij of de pokemon zichtbaar is (voor later)
let isVisible = true

// Geluiden voor acties zoals gooien, terughalen en evolueren
// 'const' betekent een variabele die niet verandert
const throwSound = new Audio("Audio/pokeball-throw.mp3")
throwSound.volume = 0.1
const returnSound = new Audio("Audio/pokeball-return.mp3")
returnSound.volume = 0.1
const evolveSound = new Audio("Audio/pokemon-evolve.mp3")
evolveSound.volume = 0.1

// Een array is een lijst met meerdere dingen hier alle Pokémon
// Elke Pokémon heeft eigenschappen zoals naam en plaatje
// De eerste is niks dus geen Pokémon geselecteerd
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
]

// Houdt bij in welke evolutie je zit 0 is basis 1 is eerste evolutie en 2 is tweede evolutie / let betekent dat deze later kan veranderen
let evolutionStage = 0
// Welke Pokémon is nu geselecteerd (nummer in de lijst hierboven)
let currentPokemonIndex = 0
// Het huidige Pokémon object (naam, plaatje etc)
let currentPokemon = { ...pokemons[currentPokemonIndex] }

// Een functie is een stuk code dat je vaker kan gebruiken
// Wissel tussen dag en nacht modus
function toggleDagNacht() {
  // Zet dag of nacht aan of uit
  isNight = !isNight
  // Verander de achtergrond naar dag of nacht
  document.body.className = isNight ? "night" : "day"
  // Verander de tekst op de knop
  document.getElementById("toggle-day").innerText = isNight ? "Maak het dag" : "Maak het nacht"
  console.log("Toggling day/night Current isNight", isNight)
}

// Laat je Pokémon evolueren als dat kan
function evolvePokemon() {
  // Als er geen Pokémon is gekozen doe niks
  if (currentPokemonIndex === 0) {
    console.log("Geen Pokémon geselecteerd kan niet evolven")
    return
  }

  // Haal elementen op om plaatje en naam te veranderen
  const pokemonImg = document.getElementById('pokemon-img')
  const pokemonName = document.getElementById('pokemon-name')
  const poke = pokemons[currentPokemonIndex]

  // Evolutie regels: als je nog niet geëvolueerd bent ga naar eerste evolutie
  if (evolutionStage === 0) {
    currentPokemon.name = poke.evolvedName
    currentPokemon.img = poke.evolvedImg
    evolutionStage = 1
    evolveSound.play()
    console.log("Evolved to", currentPokemon.name, "Stage", evolutionStage)
  // Als je een keer geëvolueerd bent en er is nog een evolutie ga daarheen
  } else if (evolutionStage === 1 && poke.finalName && poke.finalImg) {
    currentPokemon.name = poke.finalName
    currentPokemon.img = poke.finalImg
    evolutionStage = 2
    evolveSound.play()
    console.log("Evolved to", currentPokemon.name, "Stage", evolutionStage)
  // Anders ga terug naar basis vorm
  } else {
    currentPokemon.name = poke.name
    currentPokemon.img = poke.img
    evolutionStage = 0
    console.log("Reset to base form", currentPokemon.name, "Stage", evolutionStage)
  }
  // Update het plaatje en naam op het scherm
  pokemonImg.src = currentPokemon.img
  pokemonName.textContent = currentPokemon.name
}

// Laat dropdown zien om andere Pokémon te kiezen
function togglePokemon() {
  const button = document.getElementById("toggle-pokemon")
  const img = document.getElementById("pokemon-img")
  const select = document.getElementById("pokemon-dropdown")
  const evolveBtn = document.getElementById("evolve-btn")

  // Speelt geluid af van terughalen
  returnSound.play()

  // Zet dropdown op niks en update state
  select.value = "0"
  currentPokemonIndex = 0
  evolutionStage = 0
  currentPokemon = { ...pokemons[0] }
  updatePokemonDisplay()
  // Verberg evolve knop en plaatje
  if (evolveBtn) evolveBtn.style.display = "none"
  img.style.display = "none"

  // Toon dropdown en verberg verander knop
  select.style.display = ""
  button.style.display = "none"
}

// Dit wordt uitgevoerd als de pagina klaar is en voert de functies uit / "DOM": Document Object Model is een brug tusse JavaScript-code en de HTML-pagina die in de browser wordt latenzien.
document.addEventListener("DOMContentLoaded", function() {
  const select = document.getElementById("pokemon-dropdown")
  const button = document.getElementById("toggle-pokemon")
  const img = document.getElementById("pokemon-img")
  const evolveBtn = document.getElementById("evolve-btn")
  // Begin met niks gekozen en dropdown open
  select.value = "0"
  currentPokemonIndex = 0
  evolutionStage = 0
  currentPokemon = { ...pokemons[0] }
  updatePokemonDisplay()
  if (evolveBtn) evolveBtn.style.display = "none"
  img.style.display = "none"
  select.style.display = ""
  button.style.display = "none"

  if (select) {
    // Als je een andere Pokémon kiest in dropdown / const idx maakt een vaste variabele aan die een index (positie) opslaat
    select.onchange = function () {
      const idx = parseInt(this.value, 10)
      currentPokemonIndex = idx
      evolutionStage = 0
      currentPokemon = { ...pokemons[idx] }
      updatePokemonDisplay()
      // Speel gooigeluid
      throwSound.play()
      // Verberg dropdown en toon verander knop
      select.style.display = "none"
      button.style.display = ""
      // Laat evolve knop alleen zien als er een Pokémon is gekozen
      if (evolveBtn) evolveBtn.style.display = (idx === 0) ? "none" : ""
      // Laat plaatje zien alleen als Pokémon gekozen is
      img.style.display = (idx === 0) ? "none" : "block"
    }
    // Laat evolve knop alleen zien als Pokémon is gekozen
    if (evolveBtn) evolveBtn.style.display = (currentPokemonIndex === 0) ? "none" : ""
  }
})

// (Optioneel) Kies direct een Pokémon via index
function selectPokemon(index) {
  console.log("Selecting Pokemon at index", index)
  currentPokemonIndex = index
  evolutionStage = 0
  currentPokemon = { ...pokemons[index] }
  updatePokemonDisplay()
}

// Update plaatje en naam van huidige Pokémon op scherm
function updatePokemonDisplay() {
  const pokemonImg = document.getElementById('pokemon-img')
  const pokemonName = document.getElementById('pokemon-name')
  // Als geen Pokémon gekozen verberg alles
  if (currentPokemonIndex === 0) {
    pokemonImg.style.display = "none"
    pokemonName.textContent = ""
  } else {
    // Anders laat plaatje en naam zien
    pokemonImg.src = currentPokemon.img
    pokemonImg.style.display = "block"
    pokemonName.textContent = currentPokemon.name
  }
  console.log("Updating Pokemon Display to", currentPokemon.name, currentPokemon.img)
}
