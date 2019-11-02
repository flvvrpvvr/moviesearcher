import React from 'react';
import './MoviesList.css'
import { Box } from 'grommet';
import MovieCard from './MovieCard';

class Favorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: JSON.parse(localStorage.getItem('favorites')),
      showMovieCard: false,
    }
  }

  removeFromStorage = (movie) => {
    this.setState({
     movies: this.state.movies.filter(item => movie !== item)
   }, () => {
     localStorage.setItem(
       'favorites',
         JSON.stringify(
           JSON.parse(localStorage.getItem('favorites')).filter(item => item.id !== movie.id)
         )
     )
   })
  }

  render() {
    return this.state.movies.length !== 0
     ?
      (
        <Box className="movies-wrapper">

          {
            this.state.movies.map((movie, i) => {
              return (
                 <div key={movie.id} className="textWithBlurredBg">
                  <span onClick={() => this.removeFromStorage(movie)}
                className='heart'>
                    <input id="fav" type="checkbox" defaultChecked />
                    <label htmlFor="fav"></label>
                  </span>
                  <img onClick={() =>
                    this.setState({
                     movieIndex: i,
                     showMovieCard: !this.state.showMovieCard
                     })
                  } alt='' src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} />
                  <h2>{movie.title} ({movie.release_date.split('-')[0]})</h2>
                  {/* <p>{movie.overview}</p> */}
                </div>
              )
            })
          }

          {this.state.showMovieCard &&
            <MovieCard movie={this.state.movies[this.state.movieIndex]} close={() => this.setState({showMovieCard: !this.state.showMovieCard})}
           />}
        </Box>
    )
       : (<Box className="nothing">
         <h2>Nothing here yet...</h2>
       </Box>)
  }
}


export default Favorites;
