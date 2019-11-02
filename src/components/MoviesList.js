import React from 'react';
import './MoviesList.css'
import { Box } from 'grommet';
import MovieCard from './MovieCard';
import preloader from '../assets/preloader.svg';


class MoviesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieIndex: undefined,
      showMovieCard: false,
    }
  }

  store = (movie) => {
      let favorites = JSON.parse(localStorage.getItem('favorites'))

      if (favorites == null || favorites.length === 0) {
        console.log('1.favorites is empty - add movie');
        let movies = [];
        movies.push(movie)
        localStorage.setItem(
          'favorites',
            JSON.stringify(
              movies
            )
        )
      } else {
        if (favorites.some(item => item.id === movie.id)) {
        console.log('already exists - deleted');
        localStorage.setItem(
          'favorites',
            JSON.stringify(
              favorites.filter(item => item.id !== movie.id)
            )
        )
      } else {
          favorites.push(movie)
          localStorage.setItem(
            'favorites',
              JSON.stringify(
                favorites
              )
          )
      }
    }
  }


  render() {
    return (
        <Box className="movies-wrapper">
          {
            this.props.movies.length === 0 || this.props.loading ?
            <div className="wrapper">
              <img src={preloader} alt="" />
            </div>
             :
            this.props.movies.map((movie, i) => {
              return (
                 <div key={movie.id} className="textWithBlurredBg">
                  <span className='heart'>
                    <input onChange={() => this.store(movie)} id="fav" type="checkbox" />
                    <label htmlFor="fav"></label>
                  </span>
                  <img onClick={() =>
                    this.setState({
                     movieIndex: i,
                     showMovieCard: !this.state.showMovieCard
                     })
                  } alt='' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                  <h2>{movie.title} ({movie.release_date.split('-')[0]})</h2>
                  {/* <p>{movie.overview}</p> */}
                </div>
              )
            })
          }
        {
          this.state.showMovieCard &&
          <MovieCard  movie={this.props.movies[this.state.movieIndex]}  close={() => this.setState({
           showMovieCard: !this.state.showMovieCard
          })} />
        }
        </Box>
    )
  }
}


export default MoviesList;
