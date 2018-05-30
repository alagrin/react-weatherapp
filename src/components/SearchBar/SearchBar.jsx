import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.searchWeather = this.searchWeather.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    onInputChange(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    searchWeather(e) {
        e.preventDefault();
        this.props.onSearch(this.state.searchTerm);
    }

    clearData(e) {
        this.props.clearData();
    }

    render() {
        return (
            <form id="searchbar" onSubmit={this.searchWeather}>
                <i id="searchicon" className="fa fa-search fa-2x"></i>
                <input id="userinput" className="input has-icons-left" type="text" placeholder="City, State" onChange={this.onInputChange} />
                <i id="clearfield" className="fa fa-times fa-2x" onClick={this.props.clearData}></i>
            </form>
        );
    }
}

export default SearchBar;