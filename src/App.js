import React, { Component } from 'react';
import './App.css'
import Header from './components/Header';
import MoviesList from './components/MoviesList';
import Favorites from './components/Favorites';
import {
  Grommet,
  Box,
} from 'grommet';


const theme = {
  global: {
    colors: {
      brand: '#fff',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const apiKey = '3bfc2790af0abb18fd91abed5ebdd0d2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesIsOpen: false,
      movies: undefined,
    }
  }

  getQuery = (val) => {
    this.setState({
      movies: val,
      favoritesIsOpen: false,
    })
  }

  getGenres = () => {
      fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => this.setState({
          genres: data.genres,
      })
    )
  }

  getMovies = () => {
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => {
        let movies = data.results;
        movies.map(movie => movie['isFavorite'] = false)
        this.setState({
          movies: movies,
        })
      })
  }

  componentDidMount() {
    this.getMovies()
    this.getGenres()
  }

  render() {
    return (
      <Grommet theme={theme} full>
            <Box fill>

                <Header
                  toggleFavorites={() => this.setState({
                    favoritesIsOpen: !this.state.favoritesIsOpen
                  })
                  }
                  apiKey={apiKey}
                  goHome={() => {
                    this.setState({
                      favoritesIsOpen: false,
                      showMovieCard: false
                    })
                    this.getMovies();
                  }}
                  sendData={this.getQuery} />

              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>

                {
                  this.state.favoritesIsOpen ?
                  (<Favorites genres={this.state.genres} />)
                  :
                  (<MoviesList
                   sendFavorites={this.getFavorites} movies={this.state.movies} genres={this.state.genres}
                   />)
                }
              </Box>
            </Box>
      </Grommet>
    );
  }
}

export default App;
