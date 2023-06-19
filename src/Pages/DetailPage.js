import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

function DetailsPage() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemonData(response.data);
        setIsBookmarked(checkIfBookmarked(response.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  const checkIfBookmarked = (pokemonData) => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    return bookmarks.some((bookmark) => bookmark.id === pokemonData.id);
  };

  const handleBookmarkToggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== pokemonData.id);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      bookmarks.push({...pokemonData});
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-gray-100 min-h-screen mt-12">
      <div className="container mx-auto py-8">
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {pokemonData && (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 capitalize text-center">
              {pokemonData.name}
              {isBookmarked ? (
                <FaBookmark
                  className="inline-block ml-2 cursor-pointer text-blue-500"
                  onClick={handleBookmarkToggle}
                />
              ) : (
                <FaRegBookmark
                  className="inline-block ml-2 cursor-pointer text-blue-500"
                  onClick={handleBookmarkToggle}
                />
              )}
            </h2>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
              alt=""
              className="w-44 h-44 mx-auto my-5"
            />

            <div className="grid grid-cols-2 md:gap-4 gap-1 mb-4">
              <div className="m-2 md:text-xl text-sm">
                <p>
                  <span className="font-semibold">Height:</span> {pokemonData.height}
                </p>
                <p>
                  <span className="font-semibold">Weight:</span> {pokemonData.weight}
                </p>
              </div>
              <div className="m-2 md:text-xl text-sm mb-4">
                <p>
                  <span className="font-semibold">Abilities:</span>
                </p>
                <ul className="list-disc ml-6">
                  {pokemonData.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-2 md:text-xl text-lg mb-4">
              <span className="font-semibold">Types:</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {pokemonData.types.map((type) => (
                <div
                  key={type.type.name}
                  className="px-3 py-1 mx-3 my-2 bg-blue-500 text-white rounded-md capitalize"
                >
                  {type.type.name}
                </div>
              ))}
            </div>
            <div className="p-4">
              <p className="p-2 md:text-xl text-lg mb-2">
                <span className="font-semibold">Moves:</span>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-6">
                {pokemonData.moves.map((move) => (
                  <div
                    key={move.move.name}
                    className="px-4 py-2 bg-green-500 text-white rounded-md capitalize"
                  >
                    {move.move.name}
                  </div>
                ))}
              </div>
            </div>
            {/* Render other details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
