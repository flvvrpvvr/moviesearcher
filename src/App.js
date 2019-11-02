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

let genres = [];
const apiKey = '3bfc2790af0abb18fd91abed5ebdd0d2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesIsOpen: false,
      movies: [],
    }
  }

  getGenres = (movies) => {
    movies.forEach(movie => movie.genres = movie.genre_ids.map(id => genres.filter(genre => genre.id === id)[0].name))
  }

  getQuery = (val) => {
    this.setState({loading: true})
    this.getGenres(val)
    setTimeout(() => {
      this.setState({
        movies: val,
        favoritesIsOpen: false,
        loading: false,
      })
    }, 500
    )
  }

  getMovies = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => genres = data.genres)
    .then(() => fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`))
    .then(res => res.json())
    .then(data => {
      this.getGenres(data.results)
      this.setState({
        movies: data.results,
        })
      }
    )
  }

  componentDidMount() {
    this.getMovies()
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
                  (<Favorites />)
                  :
                  (<MoviesList loading={this.state.loading} movies={this.state.movies} />)
                }
              </Box>
            </Box>
      </Grommet>
    );
  }
}

export default App;
