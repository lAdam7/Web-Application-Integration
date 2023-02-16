import React from "react";

/**
 * Button used for watching/unwatching a paper
 * 
 * Used when viewing papers whilst logged in adding a final column that
 * allows the user to mark the paper for watching / remove it additionally
 * used within the paper modal at the bottom of the page
 * 
 * @author Adam Lyon W19023403
 */
class WatchPaperButton extends React.Component {
    /**
     * @param boolean checked Is the paper currently being watched
     * @param boolean handling Activated when a 401 error occurs when trying to add/remove a paper
     * if the backend sends a new access token (previous expired) re-run operation
     */
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            handling: false
        }
    }

    /**
     * Mark the papers as 'WATCHED' that are sent with the viewinglist prop
     */
    componentDidMount() {
        if (this.props.viewinglist !== undefined) {
            let filteredList = this.props.viewinglist.filter((item) => (this.isOnList(item)))
            if (filteredList.length > 0) {
                this.setState({ checked: true })
            }
        }
    }
    /**
     * Deal with updating of the WATCH due to it being available in the table and at the bottom of the modal
     * make sure any changes, update everywhere for exit/entry of modal the value matches
     * 
     * If a new token is recieved and this component requested a new access_token to be generated re-run
     * the selecting of the button
     */
    componentDidUpdate(prevProps) {
        if (this.props.viewinglist !== prevProps.viewinglist) {
            let filteredList = this.props.viewinglist.filter((item) => (this.isOnList(item)))
            if (filteredList.length > 0) {
                this.setState({checked: true})
            } else {
                this.setState({checked: false})
            }
        } else if (this.props.token !== prevProps.token && this.state.handling) {
            this.handleOnChange();
        }
    }
    /**
     * Paper being watched
     */
    isOnList = (item) => {
        return (item.paper_id === this.props.paper_id)
    }
    /**
     * Button clicked depending if already on list add/remove
     */
    handleOnChange = () => {
        if (this.state.checked) {
            this.removeFromViewingList()
        } else {
            this.addToViewingList()
        }
    }
    /**
     * Add to the viewinglist listening for a 401 return to see if a new access token will deal with the issue
     */
    addToViewingList = () => {
        let url = "https://adam-lyon.com/kf6012/part1/api/viewinglist"

        let formData = new FormData();
        formData.append('token', this.props.token)
        formData.append('add', this.props.paper_id)
        
        fetch(url, {method: 'POST',
                    headers: new Headers(),
                    body: formData})
        .then((response) => {
            if ((response.status === 200) || (response.status === 204)) {
                this.setState({ checked: true, handling: false });
                this.props.addViewingList(this.props.paper_id);
            } else if (response.status === 401) {
                if (!this.state.handling) { // only attempt once
                    this.setState({ handling: true });
                    this.props.newAccessToken();
                } else {
                    this.setState({ handling: false });
                }        
            } else {
                throw Error(response.statusText)
            }
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        })
    }
    /**
     * Remove to the viewinglist listening for a 401 return to see if a new access token will deal with the issue
     */
    removeFromViewingList = () => {
        let url = "https://adam-lyon.com/kf6012/part1/api/viewinglist"

        let formData = new FormData();
        formData.append('token', this.props.token)
        formData.append('remove', this.props.paper_id)

        fetch(url, {method: 'POST',
                    headers: new Headers(),
                    body:formData})
        .then((response) => {
            if ((response.status === 200) || (response.status === 204)) {
                this.setState({ checked: false, handling: false });
                this.props.removeViewingList(this.props.paper_id);
            } else if (response.status === 401) {
                if (!this.state.handling) { // only attempt once
                    this.setState({ handling: true });
                    this.props.newAccessToken();
                } else {
                    this.setState({ handling: false });
                }      
            } else {
                throw Error(response.statusText)
            }
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        })
    }

    /**
     * Set text depending if the paper is currently being watched and
     * set the className depending on this for different styling
     */
    render() {
        let text = "WATCH";
        if (this.state.checked) {
            text = "UNWATCH";
        }
        
        return (
            <button className={"btnWatch " + text} onClick={this.handleOnChange}>{text}</button>
        )
    }
}
export default WatchPaperButton