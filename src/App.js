import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import Button from './components/button';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from './constants/index'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: DEFAULT_QUERY,
      result :null,
      error:null,
      isLoading: false
    };

  }
  setSearchTopStories(result) {
    const { hits, page } = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
  
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
  
    this.setState({
      result: { hits: updatedHits, page },
      isLoading: false
    });
  }
  
  onSearchSubmit= (event)=> {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
     event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({error}) );

  }
  onDismiss =(id)=>{
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ result: { ...this.state.result, hits: updatedHits } });
  }

  onSearchChange=(event)=>{
    this.setState({ searchTerm: event.target.value });
    if(event.target.value.length ===0 ){
      this.setState({result : null})
    }
    this.fetchSearchTopStories(this.state.searchTerm);
  }

  render(){
    const { searchTerm, result,error,isLoading } = this.state;
    const page = (result && result.page) || 0;
    // if (!result) { return null; }
    // if (error) {
    //   return <p>Something went wrong.</p>;
    // }

    return (
      <div className="page">
        <div className="interactions">
         <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        </div>
        {result && 
          <Table
          list={result.hits}
           onDismiss={this.onDismiss}
         />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }

}

export default App;




