import React from "react";
import AuthorModal from "./AuthorModal";

/**
 * Output data for one specific Author
 * 
 * Output an author that can be utilzed on the
 * Authors page alongside viewing authors attached
 * to a specific Paper whilst viewing Papers with 
 * clicking the author loading up their paper/affiliations
 * that are recorded
 * 
 * @author Adam Lyon W19023403
 */
class Author extends React.Component {
    constructor(props) {
        super(props)
        this.state = { display: false }

        this.handleDisplay = this.handleDisplay.bind(this);
    }

    /** 
     * Open up/close modal in Authors with boolean recieved as parameter
     */
    handleDisplay() {
        this.setState({ display: !this.state.display })
    }

    /**
     * If author has been clicked render the AuthorModal giving props
     * to reauthenticate if required to allow WATCH/UNWATCHING of
     * papers through authors
     */
    render() {
        let details = null

        if (this.state.display) {
            details = <AuthorModal 
                            author={this.props.author}
                            authenticated={this.props.authenticated}
                            token={this.props.token}
                            newAccessToken={this.props.newAccessToken}
                            handleDisplay={this.handleDisplay}
                      />
        }

        /**
         * List of every author in a table format
         */
        return(
            <tr>
                <td onClick={this.handleDisplay}><p>{this.props.author.first_name} {this.props.author.middle_name} {this.props.author.last_name}</p></td>
                <td onClick={this.handleDisplay}><p>{this.props.author.Contributions}</p></td>
                {details}
            </tr>
        )
    }
}
export default Author;