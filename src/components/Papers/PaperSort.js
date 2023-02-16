import React from "react";

/**
 * Sorting options available for the Papers page
 * 
 * Select sort for the papers page the values are
 * utilized in the Papers class to sort where the default
 * value has already been set as Title A-Z
 * 
 * @author Adam Lyon W19023403
 */
class PaperSort extends React.Component {
    render() {
        return (
            <label>Sort
                <br></br>
                <select value={this.props.sort} onChange={this.props.handleSortSelect}>
                    <option value="Title A-Z">Title A-Z</option>
                    <option value="Title Z-A">Title Z-A</option>
                    <option value="Authors Ascending">Authors Ascending</option>
                    <option value="Authors Descending">Authors Descending</option>
                </select>
                <br></br>
            </label>
        )
    }
}
export default PaperSort;