import React from 'react';
import './MovieCard.css'


const MovieCard = ({ movie, genres, close }) => {
  return (
    <div>
      <div className="overlay" onClick={close} />
          <div className="card">
            <img alt='' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} />
          <div className="card_right">
            <h2>{movie.title}</h2>
            <div className="card_right__details">
              <div style={{justifyContent: 'space-between', display: 'flex', paddingRight: '4em'}}>
                <ul>
                  <li>{movie.release_date.split('-')[0]}</li>
                  <li>{movie.vote_average}</li>
                </ul>
                <ul id='genres'>
                  {movie.genre_ids.map(id => <li key={id}>{genres.filter(genre => genre.id === id)[0].name}</li>)}
                </ul>
              </div>
              <div className="card_right__rating">
                    <input id="star5" name="rating" type="radio" value="5" />
                    <label className="full" htmlFor="star5"></label>
                    <input id="star4" name="rating" type="radio" value="4" />
                    <label className="full" htmlFor="star4"></label>
                    <input id="star3" name="rating" type="radio" value="3" />
                    <label className="full" htmlFor="star3"></label>
                    <input id="star2" name="rating" type="radio" value="2" />
                    <label className="full" htmlFor="star2"></label>
                    <input id="star1" name="rating" type="radio" value="1" />
                    <label className="full" htmlFor="star1"></label>
              </div>
              <div className="card_right__review">
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MovieCard;
