import { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pokemon, setpokemon] = useState();
    // const [pokemonType, setPokemonType] = useState(null);
    const [filteredpokemon, setFilteredPokemon] = useState([])



     useEffect(() => {
        const fetchpokemon = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
                setpokemon(response.data.results);
            } catch (error) {
                setError(error.message);
                console.log(error.message)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        fetchpokemon();
    }, [])

    const searchHandler = (e) => {
        const inputValue = e.target.value;
        const pokemonBySearch = pokemon && pokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredPokemon(pokemonBySearch)
        console.log(filteredpokemon);
    }

    return (
        <>
            <div className="bg-[url('https://images.freecreatives.com/wp-content/uploads/2016/03/Stunning-Pokemon-background-Wallpapers.jpg')] h-[500px] mt-36 bg-cover bg-center pt-44 lg:mx-44 md:mx-24 sm:mx-2 mx-0">
                <div className="lg:w-[750px] md:w-[550px] sm:w-[450px] w-[280px] h-12 relative mx-auto my-12 bg- flex items-center justify-center border-2 border-green-500">
                    <form className="flex">
                        <input type="text" onChange={searchHandler} placeholder="Enter Pokemon name" className="lg:w-80 md:w-72 sm:w-64 w-44 h-8 p-2 border-2 border-gray-600 outline-none" />
                        <button type="submit" className="bg-green-600 rounded-lg px-3 ml-3 text-white hover:bg-green-700">Search</button>
                    </form>
                </div>
                {loading && <p className="bg-green-500 rounded-xl md:w-96 w-52 h-8 text-white mx-auto text-center text-xl grid place-items-center">Loading...</p>}
                {error && <p className="bg-red-500 rounded-xl md:w-96 w-64 h-8 text-white mx-auto text-center md:text-xl text-sm grid place-items-center">Error in Fetching details</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[80%] mx-auto my-12 gap-12">
                {filteredpokemon &&
                    filteredpokemon.map((pokemon, index) => {
                    let pokemonId = pokemon.url.split('/')[6]
                    return (
                        <div key={pokemon.name} className="border-2 border-gray-500">
                            <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`} alt="" className="w-40 h-40 mx-auto my-5" />
                            <div className="mb-4 space-between">
                                <span className="text-lg mx-4 sm:text-xl md:text-3xl font-bold bg-transparent capitalize">{pokemon.name}</span>
                                <span className="text-md mx-4 sm:text-lg md:text-2xl text-gray-600 bg-transparent">#{pokemonId}</span>
                            </div>
                                {/* {pk.types && pk.types.map((typeData) => {
                                    if (typeData.type.name === "grass" || typeData.type.name === "poison" || typeData.type.name === "bug") {
                                        return (
                                            <div className={`h-12 pt-2 bg-green-500`}>
                                            <span key={typeData.type.name}>
                                                <p className="w-16 mx-4 text-center bg-green-300 rounded-lg text-lg capitalize">{typeData.type.name}</p>
                                            </span>
                                            </div>

                                        )
                                    }
                                    if (typeData.type.name === "fire" || typeData.type.name === "fighting") {
                                        return (
                                            <div className={`h-12 pt-2 bg-red-400`}>
                                            <span key={typeData.type.name}>
                                                <p className="w-16 mx-4 text-center bg-red-300 rounded-lg text-lg capitalize">{typeData.type.name}</p>
                                            </span>
                                            </div>

                                        )
                                    }
                                    if (typeData.type.name === "water" || typeData.type.name === "ice") {
                                        return (
                                            <div className={`h-12 pt-2 bg-blue-400`}>
                                            <span key={typeData.type.name}>
                                                <p className="w-16 mx-4 text-center bg-blue-300 rounded-lg text-lg capitalize">{typeData.type.name}</p>
                                            </span>
                                            </div>

                                        )
                                    }
                                    if (typeData.type.name === "normal" || typeData.type.name === "dark") {
                                        return (
                                            <div className={`h-12 pt-2 bg-gray-500`}>
                                            <span key={typeData.type.name}>
                                                <p className="w-16 mx-4 text-center bg-gray-300 rounded-lg text-lg capitalize">{typeData.type.name}</p>
                                            </span>
                                            </div>

                                        )
                                    }
                                    if (typeData.type.name === "flying") {
                                        return (
                                            <div className={`h-12 pt-2 bg-gradient-to-r from-blue-400 to-gray-500`}>
                                            <span key={typeData.type.name}>
                                                <p className="w-16 mx-4 text-center bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg text-lg capitalize">{typeData.type.name}</p>
                                            </span>
                                            </div>

                                        )
                                    }
                                    if (typeData.type.name === "fairy" || typeData.type.name === "ghost") {
                                        return (
                                            <div className={`h-12 pt-2 bg-pink-500`}>
                                            <span key={typeData.type.name}>
                                                <p className="w-16 mx-4 text-center bg-pink-400 rounded-lg text-lg capitalize">{typeData.type.name}</p>
                                            </span>
                                            </div>

                                        )
                                    }
                                    if (typeData.type.name === "ground" || typeData.type.name === "psychic" || typeData.type.name === "rock") {
                                        return (
                                            <div className={`h-12 pt-2 bg-yellow-500`}>
                                            <span key={typeData.type.name}>
                                                <p className="w-16 mx-4 text-center bg-yellow-300 rounded-lg text-lg capitalize">{typeData.type.name}</p>
                                            </span>
                                            </div>

                                        )
                                    }
                                })} */}
                        </div>
                    )}
                    )}
            </div>

        </>
    )
}

export default Search;