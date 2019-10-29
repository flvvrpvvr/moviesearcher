import React from 'react';
import './MoviesList.css'
import { Box } from 'grommet';
import MovieCard from './MovieCard';

class Favorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.movies,
      showMovieCard: false,
    }
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

                  <span onClick={() => {
                    movie['isFavorite'] = !movie['isFavorite'];
                    this.setState({
                     movies: this.state.movies.filter(movie => movie['isFavorite'] === true)
                     })

                    console.log(this.state.movies);
                  }} className='heart'>
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
            <MovieCard movie={this.props.movies[this.state.movieIndex]} genres={this.props.genres} close={() => this.setState({showMovieCard: !this.state.showMovieCard})}
           />}
        </Box>
    )
       : (<Box className="nothing">
         <h2>Nothing here yet...</h2>
       </Box>)
  }
}


export default Favorites;
