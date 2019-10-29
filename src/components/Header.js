import React from 'react';
import './Header.css'
import { Search } from 'grommet-icons';
import { Box,
         Heading,
         Collapsible,
         Button,
         Form, } from 'grommet';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false
    }
  }


  search = async (query) => {
      const apiUrl = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.props.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`)
      const data = await apiUrl.json();
      let movies = data.results;

      this.props.sendData(movies.filter(movie => movie.poster_path !== null))
  }

  handleChange = (e) => {
    e.preventDefault();
    const query = this.input.value;
    query && this.search(query);
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({
       showSearch: !this.state.showSearch
     }), 1000)
  }

  render() {
    return (
      <Box className='header' tag='header' direction='row' align='center' justify='between' background='brand' pad={{ left: 'medium', right: 'small', vertical: 'small' }} elevation='medium' style={{ zIndex: '3' }}>
        <Heading onClick={this.props.goHome} color='brand' level='3' margin='none'>Movie Searcher</Heading>

        <span onClick={this.props.toggleFavorites} role="img" aria-label='favorite' className='favorite' style={{fontSize: '2rem'}}>❤️</span>

        <Box flex direction='row' style={{ flex: 'none', alignItems: 'center' }}>
          <Collapsible direction="horizontal" open={this.state.showSearch}>
              <Form onChange={this.handleChange}>
                <input ref={input => {
                  this.input = input;
                  return input && input.focus()
                }} type='text' />
              </Form>
          </Collapsible>
          <Button
            icon={<Search color='brand' />}
            onClick={() =>
              this.setState({
               showSearch: !this.state.showSearch
               })
             }
          />
        </Box>
      </Box>
    )
  }
}

export default Header;
