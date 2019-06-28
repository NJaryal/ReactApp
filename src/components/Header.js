import React, { Component } from 'react'
import MoviesList from './MoviesList'
import MoviesData from '../data/moviesList'
import Search from './Search'
import SortSearch from './SortSearch'
import SortByCategory from './SortByCategory'

class Header extends Component {
    constructor(props) {
        super(props);
        this.MoviesData = MoviesData.data;
        this.state = {
            results: this.MoviesData,
            updatedMovieList: this.MoviesData,
            inputs: "",
            titleActive:true,
            genresActive:false,
            releaseActive:false,
            ratingActive:true
        };
    }

    onKeyHandle =(e) => {
        let inputVal = "";
        if (e.target.value !== '') {
            inputVal = e.target.value;
        }
        this.setState({
            inputs: inputVal
        })
    }
    
    resultsQuery = () => {
        const currentMovieList = this.state.updatedMovieList;
        let filteredItem = this.state.inputs;
        let movieList = "";
        if (filteredItem !== '') {
            movieList = currentMovieList.filter(movie => {
                filteredItem = filteredItem.toLowerCase();
                return movie.title.toLowerCase().includes(filteredItem);
            })
        } else {
            movieList = this.MoviesData;
        }
        this.setState({
            results: movieList,
            toggleActive:true
        });
    }

    sortGenres = () => {
        const movieGenres = this.state.results
        let sortResult = movieGenres.sort((a, b) => {
            if (a.genres > b.genres) {
                return 1
            } else if (a.genres < b.genres) {
                return -1
            }
        })
        this.setState({
            results: sortResult,
            genresActive:true,
            titleActive:false
        })
    }
    sortTitles = () => {
        const movieTitles = this.state.results
        let sortResult = movieTitles.sort((a, b) => {
            if (a.title > b.title) {
                return 1
            } else if (a.title < b.title) {
                return -1
            }
        })
        this.setState({
            results: sortResult,
            titleActive:true,
            genresActive:false
        })
    }

    sortRelease = () => {
        const movieReleaseDate = this.state.results
        let sortResult = movieReleaseDate.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
        })
        this.setState({
            results: sortResult,
            releaseActive:true,
            ratingActive:false
        })
    }
    sortRating = () => {
        const movieRatings = this.state.results
        let sortResult = movieRatings.sort((a, b) => {
            return b.vote_count - a.vote_count
        })
        this.setState({
            results: sortResult,
            releaseActive:false,
            ratingActive:true
        })
    }
    componentDidMount(){
        this.sortRating();
    }

    render() {  
        const data = this.state.results;
        
        return (
            <div>
                <div className="jumbotron">
                    <h4 className="mainHeading">
                        <strong>netflix</strong>roulette
                    </h4>
                    <h1 className="display-4 searchMovies">Find your Movie</h1>
                    <Search onKeyHandle={this.onKeyHandle} resultsQuery={this.resultsQuery}/>
                    <SortSearch sortTitles={this.sortTitles} genresActive={this.state.genresActive} titleActive={this.state.titleActive} sortGenres={this.sortGenres}/>      
                </div>
                <SortByCategory count={data.length} sortRelease={this.sortRelease} releaseActive={this.state.releaseActive} ratingActive={this.state.ratingActive} sortRating={this.sortRating} />              
                <MoviesList data={data} sortTitles={this.sortTitles} />                        
            </div>
        );
    }
}
export default Header;