import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookmarks() {
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);

  useEffect(() => {
    const fetchBookmarkedPokemons = async () => {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      const pokemonData = bookmarks.map((aa) => fetchPokemonData(aa.id));
      setBookmarkedPokemons(pokemonData.filter((pokemon) => pokemon !== undefined));
    };

    fetchBookmarkedPokemons();
  }, []);

  const fetchPokemonData = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.log(`Error fetching Pokémon data for ID ${id}:`, error);
    }
  };

  const handleRemoveBookmark = (id) => {
    console.log(id);
    const updatedBookmarks = bookmarkedPokemons.filter((pokemon) => pokemon.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks.map((pokemon) => pokemon.id)));
    setBookmarkedPokemons(updatedBookmarks);
  };

  return (
    <div className="bg-gray-100 min-h-screen md:mt-20 mt-16">
      <div className="container mx-auto py-8">
        <h2 className="md:text-xl mx-12 sm:text-lg text-md font-bold mb-4">Bookmarked Pokemon</h2>
        {bookmarkedPokemons.length > 0 ? (
          <ul className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
            {bookmarkedPokemons.map((pokemon, index) => (
              <li key={pokemon.id} className="flex items-center justify-between py-2 m-4 p-2">
                <span>{index < 2 ? 'Bulbasaur' : 'Ivysaur'}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveBookmark(pokemon.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No bookmarked Pokémon.</p>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
