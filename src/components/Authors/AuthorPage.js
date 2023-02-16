import React from "react";
import Authors from "./Authors.js";
import SearchBox from "../General/SearchBox.js";
import AuthorSort from "./AuthorSort.js";

/**
 * Main author page that loads when navigating to the "Authors" menu
 * 
 * Page for Authors used to display the author name search alongside
 * the sorting element that by default is sorted by contributions
 * descending alongside dealing with pagination when many elements are
 * displayed then referring to the Papers class to load the paper data
 * 
 * @author Adam Lyon W19023403
 */
class AuthorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            sort: "Contributions Descending",
            page: 1
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSortSelect = this.handleSortSelect.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
    }
    /**
     * Searching by author name
     */
    handleSearch = (e) => {
        this.setState({ search: e.target.value, page: 1 })
    }
    /**
     * Sort drop-down for how all the data is sorted
     */
    handleSortSelect = (e) => {
        this.setState({ sort: e.target.value, page: 1 })
    }
    /**
     * Handle next button clicked
     */
    handleNextClick = () => {
        this.setState({ page: this.state.page + 1 })
    }
    /**
     * New previous button clicked
     */
    handlePreviousClick = () => {
        this.setState({ page: this.state.page - 1 })
    }

    /**
     * Render the searchbox and authors select, alongside all the
     * authors that match any parameters set
     */
    render() {
       return (
            <div>
                <SearchBox search={this.state.search} handleSearch={this.handleSearch} info={"Author name"} />
                <AuthorSort sort={this.state.sort} handleSortSelect={this.handleSortSelect} />

                <Authors
                        search={this.state.search}
                        sort={this.state.sort}
                        page={this.state.page}
                        handleNextClick={this.handleNextClick}
                        handlePreviousClick={this.handlePreviousClick}
                        authenticated={this.props.authenticated}
                        token={this.props.token}
                        newAccessToken={this.props.newAccessToken}
                />
            </div>
        )
    }
}
export default AuthorPage;