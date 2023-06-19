import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Listing() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const [pokemon, setPokemon] = useState([])
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [loadedUrls, setLoadedUrls] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchpokemon = async () => {
      try {
        setLoading(true);
        const offset = (page - 1) * 10;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
        const { results } = response.data
        setPokemon(prevPokemon => [...prevPokemon, ...results]);

        const newPokemonUrls = results
          .filter(({ url }) => !loadedUrls.includes(url)) // Exclude already loaded URLs
          .map(({ url }) => url);

        const pokemonDataPromises = newPokemonUrls.map(url => axios.get(url))
        const pokemonDataResponses = await Promise.all(pokemonDataPromises);
        setLoadedUrls((prevUrls) => [...prevUrls, ...newPokemonUrls]);
        // const typesData = pokemonDataResponses.map(response => response.data.types);

        const updatedPokemonTypes = pokemonDataResponses.map(({ data }) =>
          data.types.map((typeData) => typeData.type.name)
        );
        // typesData.forEach((types, index) => {
        //   const pokemonName = pokemonData[index].name;
        //   const pokemonTypeNames = types.map((typeData) => typeData.type.name);
        //   updatedPokemonTypes[pokemonName] = pokemonTypeNames;
        // });

        setPokemonTypes((prevPokemonTypes) => ([
          ...prevPokemonTypes,
          ...updatedPokemonTypes,
        ]));


      } catch (error) {
        console.log(error.message)
        setLoading(false)
        navigate('/pokedex')
      } finally {
        setLoading(false)
      }
    }
    fetchpokemon();
  }, [page])

  // Event listener for scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <div className='md:mt-36 mt-28'>
      {loading && <p className="bg-green-500 rounded-xl md:w-96 w-52 h-8 text-white mx-auto text-center text-xl grid place-items-center mb-12">Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[80%] mx-auto gap-12">
        {pokemon &&
          pokemon.map((pokemonItem, index) => {
            const pokemonTypeNames = pokemonTypes[index] || [];
            return (
              <Link to={`/pokedex/detail/${index+1}`} key={pokemonItem.name}>
              <div className="border-2 border-gray-500 break-words">
                <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`} alt="" className="w-44 h-44 mx-auto my-5" />
                <div className="mb-4 space-between">
                  <span className="text-lg mx-4 sm:text-xl md:text-3xl font-bold bg-transparent capitalize">{pokemonItem.name}</span>
                  <span className="text-md mx-4 sm:text-lg md:text-2xl text-gray-600 bg-transparent">#{index + 1}</span>
                </div>

                {pokemonTypeNames && pokemonTypeNames.map((typeNames) => {
                  let typeStyle = ''
                  let buttonTypeStyle = ''

                  switch (typeNames) {
                    case 'grass':
                    case 'poison':
                    case 'bug':
                      typeStyle = 'bg-green-500';
                      buttonTypeStyle = 'bg-green-400 text-green-900';
                      break;
                    case 'fire':
                    case 'fighting':
                      typeStyle = 'bg-red-400';
                      buttonTypeStyle = 'bg-red-300 text-red-900';
                      break;
                    case 'water':
                    case 'ice':
                      typeStyle = 'bg-blue-400';
                      buttonTypeStyle = 'bg-blue-300';
                      break;
                    case 'normal':
                    case 'dark':
                      typeStyle = 'bg-gray-500';
                      buttonTypeStyle = 'bg-gray-400';
                      break;
                    case 'flying':
                      typeStyle = 'bg-gradient-to-r from-blue-400 to-gray-500';
                      buttonTypeStyle = 'bg-gradient-to-r from-blue-600 to-gray-400 text-white';
                      break;
                    case 'fairy':
                    case 'ghost':
                      typeStyle = 'bg-pink-500';
                      buttonTypeStyle = 'bg-pink-400';
                      break;
                    case 'steel':
                      typeStyle = 'bg-gray-400';
                      buttonTypeStyle = 'bg-gray-300';
                      break;
                    case 'ground':
                    case 'psychic':
                    case 'rock':
                    case 'electric':
                      typeStyle = 'bg-yellow-500';
                      buttonTypeStyle = 'bg-yellow-400';
                      break;
                    default:
                      typeStyle = '';
                  }

                  return (
                    <div className={`h-12 pt-2 ${typeStyle}`}>
                      <span key={typeNames}>
                        <p className={`w-20 mx-4 text-center ${buttonTypeStyle} rounded-lg text-lg capitalize`}>
                          {typeNames}
                        </p>
                      </span>
                    </div>
                  );
                })}

              </div>
              </Link>
            )
          }
          )}
      </div>
    </div>
    </>
  );
}

export default Listing;

