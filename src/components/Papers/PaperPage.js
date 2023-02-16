import React from "react";
import Papers from "./Papers";
import SelectAward from "./SelectAward";
import SearchBox from "../General/SearchBox.js";
import PaperSort from "./PaperSort";
import WatchingPapersCheckbox from "./WatchPapersCheckbox"

/**
 * Main paper page that loads when navigating to the "Papers" menu
 * 
 * Page for Papers used to display the paper title/authors alongside details
 * for watching a paper if the user is logged in and an option to view all papers
 * the user is currently watching. Handles the title and
 * abstract searches alongside the dropdowns for the award and sorting which
 * by default is set to Title A-Z and pagination when too many elements are displayed
 * to display them on different pages
 * 
 * @author Adam Lyon W19023403
 */
class PaperPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            award: "",
            title: "",
            abstract: "",
            sort: "Title A-Z",
            watchingOnly: false,
            page: 1
        }

        this.handleAwardSelect = this.handleAwardSelect.bind(this);
        this.handleSortSelect = this.handleSortSelect.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleAbstract = this.handleAbstract.bind(this);
        this.handleWatchingOnly = this.handleWatchingOnly.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
    }

    /**
     * Dealing with input changes
     */
    handleTitle = (e) => { this.setState({title:e.target.value, page: 1}) }
    handleAbstract = (e) => { this.setState({abstract: e.target.value, page: 1}) }
    handleAwardSelect = (e) => { this.setState({award: e.target.value, page: 1}) }
    handleWatchingOnly = (e) => { this.setState({ watchingOnly: !this.state.watchingOnly, page: 1 }) }
    handleSortSelect = (e) => { this.setState({ sort: e.target.value, page: 1 }) }

    /**
     * Next page clicked
     */
    handleNextClick = () => { this.setState({ page: this.state.page + 1 }) }

    /**
     * Previous page clicked
     */
    handlePreviousClick = () => { this.setState({ page: this.state.page - 1 }) }

    /**
     * The new methods are passed as props to the films component
     */
    render() {
        /**
         * If user logged in add a checkbox to allow filtering by only papers they're watching
         */
        let watchingPapers = (this.props.authenticated)
                           ? ( 
                                <WatchingPapersCheckbox watchingOnly={this.state.watchingOnly} handleWatchingOnly={this.handleWatchingOnly}/>
                             )
                           : null;
        /**
         * Add searchboxes/filters and the watchingPapers if required then
         * sent to Papers for it to utilize the /papers endpoint
         */
        return (           
            <div>
                <SearchBox search={this.state.title} handleSearch={this.handleTitle} info={"Title"} />
                <SearchBox search={this.state.abstract} handleSearch={this.handleAbstract} info={"Abstract"} />
                <SelectAward award={this.state.award} handleAwardSelect={this.handleAwardSelect} />
                <PaperSort sort={this.state.sort} handleSortSelect={this.handleSortSelect} />
                {watchingPapers}

                <Papers
                    title={this.state.title}
                    abstract={this.state.abstract}
                    award={this.state.award}
                    sort={this.state.sort}
                    watchingOnly={this.state.watchingOnly}
                    page={this.state.page}
                    handleNextClick={this.handleNextClick}
                    handlePreviousClick={this.handlePreviousClick}
                    authenticated={this.props.authenticated}
                    token={this.props.token}
                    loggingIn={this.props.loggingIn}
                    newAccessToken={this.props.newAccessToken}
                />
            </div>
        )
    }
}
export default PaperPage;