import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movieFact, setMovieFact] = useState('');
  const [movieImageUrl, setMovieImageUrl] = useState('');

  useEffect(() => {
    const fetchMovieFact = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=0dfa15e8626a34579531bd83a4f1bca6');
        const data = await response.json();

        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];


        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=0dfa15e8626a34579531bd83a4f1bca6`);
        const movieData = await movieResponse.json();

        setMovieFact(movieData.overview);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieFact();
  }, []);

  useEffect(() => {
    if (movieFact) {
      const generateMovieImage = async () => {
        try {
          const firstWord = movieFact.split(' ', 3).join(' ');
          const response = await fetch(`https://api.pexels.com/v1/search?query=${firstWord}&per_page=1`, {
            headers: {
              Authorization: '9QpL1dlRYrWxvw3J6QwnnR7dNS5CQrFA0P9Nn6Hu8h6XQAsjTzkSUlik'
            }
          });

          if (response.ok) {
            const data = await response.json();
            const imageUrl = data.photos[0].src.large;
            setMovieImageUrl(imageUrl);
          } else {
            console.error('Error fetching movie image:', response.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      };

      generateMovieImage();
    }
  }, [movieFact]);

  return (
    <>
      <h1>Dato curioso de película aleatorio</h1>
      {movieFact && <p>{movieFact}</p>}
      {movieImageUrl && (
        <img src={movieImageUrl} alt="random movie" width={300} height={300} />
      )}
      {movieImageUrl && <p>Imagen generada en base a la primera palabra del dato.</p>}
    </>
  );
}

export default App;