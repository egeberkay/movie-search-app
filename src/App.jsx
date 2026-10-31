import { useState, useEffect } from 'react';
import Search from './components/Search.jsx'
import {Spinner} from "./components/Spinner.jsx";
import {MovieCard} from "./components/MovieCard.jsx";
import {useDebounce} from 'react-use'
import {getTrendMovies, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}


export const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [trendingMovies, setTrendingMovies] = useState([])
    //Debounce the search term to prevent making too many API request
    useDebounce(() => {setDebouncedSearchTerm(searchTerm)}, 500, [searchTerm] );

    const fetchMovies = async ( query='') => {
        setIsLoading(true);
        setErrorMessage('')
        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                const errorData = await response.json().catch(() => null)
                throw new Error(errorData?.status_message || 'Failed to fetch movies')
            }
            const data = await response.json()

            setMovieList(data.results || [])
            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0])
            }

        } catch (error){
            console.error(`Error fetching movies: ${error}`)
            setErrorMessage(error.message || "Error fetching movies, Please try again later.")
        } finally {
            setIsLoading(false)
        }
    }
    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendMovies()
            setTrendingMovies(movies)

        }catch (error) {
            console.error(`Error fetching trending movies: ${error}`)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMovies(debouncedSearchTerm)
    },[debouncedSearchTerm])

    useEffect(() => {
        loadTrendingMovies()
    },[])

    return (
        <main>
            <div className="pattern"/>

            <div className="wrapper">
                <header>
                    <img src="./hero-img.png" alt="Hero Banner" />
                <h1>
                   Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
                </h1>

                <Search searchTerm={searchTerm}  setSearchTerm={setSearchTerm} />
                </header>

                { trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2> Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )

                }
                <section className="all-movies">
                    <h2  className="mt-20" >All Movies</h2>
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) :
                    <ul>
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </ul>}
                </section>
            </div>

        </main>
    )
}
export default App
