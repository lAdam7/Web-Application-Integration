import React from "react";
import Author from "./Author.js";
import loading from "../loading.png";

/**
 * Gather all authors or authors for a specific paper
 * 
 * Get all authors from the api/authors endpoint used when on the Authors
 * page and getting Authors for a specific paper on the Papers page when
 * on a modal. Handles the author search functionality and the sort
 * where by default its sorted by authors with the most contributions
 * 
 * @author Adam Lyon W19023403
 */
class Authors extends React.Component {
    constructor(props){
        super(props)
        this.state = { results: [] }
    }
    
    /**
     * Gather authors either all or for a specific paper used
     * in both the Authors and Papers classes
     */
    componentDidMount() {
        let url = "https://adam-lyon.com/kf6012/part1/api/authors";

        if (this.props.paper_id !== undefined) {
            url += "?paperid=" + this.props.paper_id
        }

        fetch(url)
        .then( (response) => { 
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({ results: data.results })
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    /**
     * Filter by the authors first and last name combined
     * to allow both names being searchable at the same time
     */
    filterSearch = (s) => {
        return ( (s.first_name.toLowerCase() + " " + s.last_name.toLowerCase()).includes(this.props.search.toLowerCase()))
    }

    render() {
        let noData = null;
        if (this.state.results.length === 0) {
            noData = <img className="loading" src={loading} alt="loading" /> // https://commons.wikimedia.org/wiki/File:Vector_Loading.svg
        }

        let filteredResults = this.state.results
        
        /**
         * Apply any search filters or sorting the data
         */
        if ((filteredResults.length > 0) && (this.props.search !== undefined)) {
            filteredResults = filteredResults.filter(this.filterSearch);
        }
        /**
         * After applying filter no records were returned
         * output a message letting the user know
         */
         if (noData === null && filteredResults.length === 0) {
            noData = <p>No results matching query!</p>
        } 
        /**
        * Sort authors by selected option in drop-down defauly is
        * surname A-Z
        */
        switch(this.props.sort) {
            case "Surname Z-A":
                filteredResults.sort(function(a, b) { return b.last_name.localeCompare(a.last_name); })
            break;
            case "Contributions Ascending":
                filteredResults.sort(function(a, b) { return a.Contributions - b.Contributions })
            break;
            case "Contributions Descending":
                filteredResults.sort(function(a, b) { return b.Contributions - a.Contributions })
            break;
            default: // Surname A-Z
                filteredResults.sort(function(a, b) { return a.last_name.localeCompare(b.last_name); })
        }

        /**
         * If page prop recieved have buttons to sort authors
         * and not display the full list
         */
        let buttons = null;
        if (this.props.page !== undefined) {
            const pageSize = 10
            let pageMax = this.props.page * pageSize
            let pageMin = pageMax - pageSize
        
            buttons = (
                <div>
                    <button onClick={this.props.handlePreviousClick} disabled={this.props.page <= 1}>Previous</button>
                    <button onClick={this.props.handleNextClick} disabled={this.props.page >= Math.ceil(filteredResults.length / pageSize)}>Next</button>
                    <p>Page {this.props.page} of {Math.ceil(filteredResults.length / pageSize)}</p>
                </div>
            )
            filteredResults = filteredResults.slice(pageMin,pageMax)
        }

        /**
         * Get author information into a table using the Author class to create
         * the row/body content of the table used for both Authors and Papers classes
         */
        return (
            <div>
                <table className="tblAuthors">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Paper Contributions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map( (author, i) => (<Author 
                                                                key={author.author_id} 
                                                                author={author} 
                                                                authenticated={this.props.authenticated} 
                                                                token={this.props.token} 
                                                                newAccessToken={this.props.newAccessToken} 
                                                                />))
                        }
                    </tbody>
                </table>
                {noData}
                {buttons}
            </div>
        )
    }
}
export default Authors;