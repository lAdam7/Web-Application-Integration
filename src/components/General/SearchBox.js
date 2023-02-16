import React from "react";

/**
 * Search box used for the Authors page searching by author name
 * and on the Papers page for searching by the title and abstract
 * 
 * @author Adam Lyon W19023403
 */
class SearchBox extends React.Component {
    render() {
        return (
            <div className="queryInputContainer">
                <label>{this.props.info}</label>
                <br></br>
                <input 
                    className="queryInput" 
                    type='text' 
                    placeholder={this.props.info} 
                    value={this.props.search} 
                    onChange={this.props.handleSearch}
                />
                <br></br>
            </div>
        )
    }
}
export default SearchBox;