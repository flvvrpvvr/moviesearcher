import React from 'react';
import './MoviesList.css'
import { Box } from 'grommet';
import MovieCard from './MovieCard';


class MoviesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieIndex: undefined,
      showMovieCard: false,
    }
  }

  render() {
    return this.props.movies !== undefined
     ?
      (
        <Box className="movies-wrapper">

        {
          this.props.movies.map((movie, i) => {
            return (
               <div key={movie.id} className="textWithBlurredBg">
                <span onClick={() => {
                  movie['isFavorite'] = !movie['isFavorite'];
                  this.props.sendFavorites(movie)
                }} className='heart'>
                  <input id="fav" type="checkbox" />
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
          <MovieCard  movie={this.props.movies[this.state.movieIndex]} genres={this.props.genres} close={() => this.setState({
           showMovieCard: !this.state.showMovieCard
          })} />
        }
        </Box>
    )
       : null
  }
}


export default MoviesList;
