import React, { Component } from 'react';
import './App.css';
//import { lists } from './lists';
import Table from './Table';
import Search from './Search';
import Button from './Button'


const DEFAULT_QUERY = 'react';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '5';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//const PROXY = "https://cors-anywhere.herokuapp.com/"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      searchKey: '',
      search: DEFAULT_QUERY
    }
    this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.removeHandler = this.removeHandler.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  needsToSearchTopstories(search) {
    return !this.state.results[search]
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearchTopstories(search, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${search}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  onSearchSubmit(event) {
    const { search } = this.state;
    this.setState({ searchKey: search })
    if (this.needsToSearchTopstories(search)) {
      this.fetchSearchTopstories(search, DEFAULT_PAGE);
    }
    event.preventDefault();
  }

  componentDidMount() {
    const { search } = this.state;
    this.setState({ searchKey: search })
    this.fetchSearchTopstories(search, DEFAULT_PAGE);
  }

  removeHandler(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    })
  }

  searchHandler(event) {
    this.setState({ search: event.target.value })
  }

  render() {

    //retrieving cached data from an API call
    const {
      search,
      results,
      searchKey
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page)
      || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={search}
            onChange={this.searchHandler}
            onSubmit={this.onSearchSubmit}
          >
            Search
        </Search>
        </div>
        <Table
          list={list}
          //pattern={search}
          remove={this.removeHandler}
        />
        {/* { result &&
            <Table
            list={result.hits}
            pattern={search}
            remove={this.removeHandler}
        /> }  also conditionally renders the table renders always if true but is skipped if false*/}
        {/* <Button remove={this.removeHandler}/> */}
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
            more
          </Button>
        </div>
      </div>
    )
  }
}

export default App;

export {
  Button,
  Search,
  Table,
}
