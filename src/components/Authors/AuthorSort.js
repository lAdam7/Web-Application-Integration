import React from "react";

/**
 * Sorting options available for the Authors page
 * 
 * Select sort for the authors page the values are
 * utilized in the Authors class to sort where the default
 * value has already been set as contributions descending
 * 
 * @author Adam Lyon W19023403
 */
class AuthorSort extends React.Component {
    render() {
        return (
            <label>Sort
                <br></br>
                <select value={this.props.sort} onChange={this.props.handleSortSelect}>
                    <option value="Surname A-Z">Surname A-Z</option>
                    <option value="Surname Z-A">Surname Z-A</option>
                    <option value="Contributions Ascending">Contributions Ascending</option>
                    <option value="Contributions Descending">Contributions Descending</option>
                </select>
                <br></br>
            </label>   
        )
    }
}
export default AuthorSort;