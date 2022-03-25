import {useState} from 'react'
import api from './api';
import './App.css';


function App() {
  const[input, setInput] = useState('')
  const[pokemon, setPokemon] = useState({})

  async function handleSearch(){
    var apiCallString = "https://pokeapi.co/api/v2/pokemon/"+input

    if(input == ''){
      alert("pokemon nao existe")
      return
    }
    //Encontrar o pokemon
      try{
        await api.get(apiCallString).then(function(response){
          setPokemon(response.data)
        })}catch{
        alert("erro")
        setInput("")
      }
  }

  return (
    <div className='container'>
      <div className='content'>
        <h1>POKEDEX</h1>
        <div className='pokemon'>
          <div className='containerInput'>
            <input
            type="text"
            placeholder='Digite seu nickname...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            
            <button className='btn'
            onClick={handleSearch}>Procurar</button>
          </div>

        </div>

        {/* stats */}
        {Object.keys(pokemon).length > 0 &&(
          <div className='pokeStats'>
              <img src={pokemon.sprites.front_default}/>
              <h3>#{pokemon.id}-{pokemon.name} </h3>
              <p className='type'>type: {pokemon.types[0].type.name}</p>
            <div className='stats'>
              <p>ability 1: {pokemon.abilities[0].ability.name}</p>
              <p>ability 2: {pokemon.abilities[1].ability.name}</p>
              <p>hp: {pokemon.stats[0].base_stat}</p>
              <p>attack: {pokemon.stats[1].base_stat}</p>
              <p>defense: {pokemon.stats[2].base_stat}</p>
              <p>special attack: {pokemon.stats[3].base_stat}</p>
              <p>special defense: {pokemon.stats[4].base_stat}</p>
              <p>speed: {pokemon.stats[5].base_stat}</p>
            </div>

          </div>
        )} 
      </div> 
    </div>
  )
}

export default App;