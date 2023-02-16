import React from "react";
import Paper from "./Paper";
import PaperModal from "./PaperModal";
import loading from "../loading.png";

/**
 * Gather all papers or papers attached to a specific author
 * 
 * Get all papers from the api/papers endpoint used when on the Papers apge
 * and getting papers that link to a specific author or just one paper for
 * modal view. Handles the paper search functionality and the sorting
 * 
 * @author Adam Lyon W19023403
 */
class Papers extends React.Component {
    /**
     * @param array results The data gathered from the api/papers endpoint
     * @param arary viewingList The data gathered from the api/viewinglist endpoint
     */
    constructor(props){
        super(props)
        this.state = {
            results: [],
            viewingList: []
        }

        this.addViewingList = this.addViewingList.bind(this);
        this.removeViewingList = this.removeViewingList.bind(this);
    }

    /**
     * Add paper to viewingList array manually (ensure it updates on the main table & when in modal view)
     */
    addViewingList(add) { this.setState({ viewingList: [...this.state.viewingList, { paper_id: add }] }); }
    /**
     * Remove paper to viewingList array manually (ensure it updates on the main table & when in modal view)
     */
    removeViewingList(remove) {
        this.setState(prevState => ({
            viewingList: prevState.viewingList.filter(user => user.paper_id !== remove)
        }));
    }

    componentDidMount() {
        /**
         * Use the api/papers endpoint with querying any authorid/paperid 
         * if the relevent prop is recieved
         */
        let url = "https://adam-lyon.com/kf6012/part1/api/papers" 
    
        if (this.props.authorid !== undefined) {
            url += "?authorid=" + this.props.authorid
        }

        if (this.props.paperid !== undefined) {
            url += "?id=" + this.props.paperid;
        }

        fetch(url)
        .then( (response) => {
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText);
            }
        })
        .then( (data) => {
            this.setState({results:data.results})
            if (this.props.handlePaperData !== undefined) {
                this.props.handlePaperData(this.state.results[0]);
            } 
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
        /**
         * Get viewingList on first run
         */
        this.getViewingList();
    }

    /**
     * If authentication state changes or token (in case new access token needed)
     * recall the viewingList method to get correct data
     */
    componentDidUpdate(prevProps) {
        if (this.props.authenticated !== prevProps.authenticated) {
            this.getViewingList();
        } else if (this.props.token !== prevProps.token && this.props.token !== null) {
            this.getViewingList();
        }
    }

    /**
     * If authenticated use the token prop and get data for the viewinglist
     * for the logged in user
     */
    getViewingList = () => {
        if (this.props.authenticated) {
            let url = "https://adam-lyon.com/kf6012/part1/api/viewinglist";

            let formData = new FormData();
            formData.append('token', this.props.token);
        
            fetch(url, {method: 'POST',
                        headers: new Headers(),
                        body:formData})
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    this.props.newAccessToken();
                } else {
                    console.log(response);
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                if (data) {
                    this.setState({viewingList: data.results})
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            })
        }
    }
    /**
     * Dropdown for awards show all papers that aren't null if "all" selected
     * else match the values
     */
    filterByAward = (paper) => {
        return (this.props.award === "all" && paper.Award !== null) || ((paper.Award === this.props.award) || (this.props.award===""))
    }
    /**
     * Filter any title/abstract text changes
     */
    filterTitle = (s) => {
        return s.title.toLowerCase().includes(this.props.title.toLowerCase())
    }
    filterAbstract = (s) => {
        return s.abstract.toLowerCase().includes(this.props.abstract.toLowerCase())
    }
    /**
     * Checkbox for viewing only WATCHING papers return only ones in the viewingList data
     */
    filterWatching = (s) => {
        return this.state.viewingList.find(str => str.paper_id === s.paper_id)
    }

    render() {
        let noData = null;
        if (this.state.results.length === 0) {
            noData = <img className="loading" src={loading} alt="loading" /> // https://commons.wikimedia.org/wiki/File:Vector_Loading.svg
        }

        let filteredResults = this.state.results
        
        /**
         * Prop checking required as not utilzed when viewing papers for a specific author
         */
        if (this.props.award !== undefined) {
        filteredResults = filteredResults.filter(this.filterByAward)
        }
        if (this.props.title !== undefined) {
            filteredResults = filteredResults.filter(this.filterTitle) 
        }
        if (this.props.abstract !== undefined) {
            filteredResults = filteredResults.filter(this.filterAbstract)
        }
        if (this.props.watchingOnly !== undefined && this.props.watchingOnly) {
            filteredResults = filteredResults.filter(this.filterWatching)
        }
        /**
         * After applying filters no records were returned
         * output a message letting the user know
         */
        if (noData === null && filteredResults.length === 0) {
            noData = <p>No results matching query!</p>
        } 
        /**
         * Sort by the selected value default is Title A-Z
         */
        switch(this.props.sort) {
            case "Title Z-A":
                filteredResults.sort(function(a, b) { return b.title.localeCompare(a.title); })
            break;
            case "Authors Ascending":
                filteredResults.sort(function(a, b) { return a.Authors - b.Authors })
            break;
            case "Authors Descending":
                filteredResults.sort(function(a, b) { return b.Authors - a.Authors })
            break;
            default: // Title A-Z
                filteredResults.sort(function(a, b) { return a.title.localeCompare(b.title); })
        }

        /**
         * Display how many papers the user watches
         */
         let headerWatch = (this.props.authenticated)
                         ? <th>Watching ({ filteredResults.filter(this.filterWatching).length })</th>
                         : null;

        let buttons = null;
        /**
         * Next/Previous buttons utilized for the PaperPage to not show
         * all papers on one page
         */
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
         * Iterate through the papers recieved form the endpoint and 
         * put them into a table format
         */
        let paperInfo = (
            <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Authors</th>
                            {headerWatch}
                        </tr>
                    </thead>
                    <tbody>
                    {filteredResults.map( (paper, i) => (
                        <Paper
                            key={paper.paper_id}
                            paper={paper}
                            viewinglist={this.state.viewingList}
                            authenticated={this.props.authenticated}
                            addViewingList={this.addViewingList}
                            removeViewingList={this.removeViewingList}
                            handlePaperData={this.props.handlePaperData}
                            currentPaperData={this.props.currentPaperData}
                            newAccessToken={this.props.newAccessToken}
                            token={this.props.token}
                        />
                    ))}
                    </tbody>
                </table>
        );
        /**
         * showAllDetails only sent when viewing papers for specific authors
         * auto select the first paper to display data (highlights it yellow also)
         */
        if (this.props.showAllDetails !== undefined && filteredResults.length > 0) {
            paperInfo = <PaperModal paper={filteredResults[0]} />
        }
        return (
            <div>
                {paperInfo}
                {noData}
                {buttons}
            </div>
        )
    }
}
export default Papers;