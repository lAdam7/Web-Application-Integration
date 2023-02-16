import React from "react";
import PaperModal from "./PaperModal";
import Modal from "react-modal";
import WatchPaperButton from "./WatchPaperButton";

/**
 * Output data for one specific Paper
 * 
 * Output a paper that can be utilzed on the
 * Papers page alongside the Authors page when
 * modal is on to view the papers the specific author
 * contributed to, clicking the paper loads all the details
 * for that paper
 * 
 * @author Adam Lyon W19023403
 */
class Paper extends React.Component {
    /**
     * @param boolean display handles the click of the author in table list
     * @param boolean isOpen handles the visibility of the PaperModal
     */
    constructor(props) {
        super(props)
        this.state = { 
            display: false,
            isOpen: true
        }

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() { this.setState({ isOpen: false }) }

    /**
     * If data is requesed via the Authors (where handlePaperData prop is passed)
     * return data back to that else deal as a normal click on Papers page
     */
    handleClick = () => {
        if (this.props.handlePaperData !== undefined) {
            this.props.handlePaperData(this.props.paper);
            this.setState({ isOpen: true });
        } else {
            this.setState({
                isOpen: true,
                display: true
            })
        }
    }

    render() {
        let details = null;

        /**
         * If the user is logged in pass the token and method
         * to get a new access token if required (modal is created
         * here to allow for usability for Authors modal too)
         */
        if (this.state.display) {
            if (this.props.authenticated) {
                details = (
                    <Modal
                        isOpen={this.state.isOpen}
                        ariaHideApp={false}
                        onRequestClose={this.closeModal}
                    >
                        <button className="closeTopRight" onClick={this.closeModal}>X</button>
                        <PaperModal close={this.closeModal} authenticated={this.props.authenticated} newAccessToken={this.props.newAccessToken} token={this.props.token} paper={this.props.paper} viewinglist={this.props.viewinglist} addViewingList={this.props.addViewingList} removeViewingList={this.props.removeViewingList} />
                    </Modal>
                )
            } else {
                details = (
                    <Modal
                        isOpen={this.state.isOpen}
                        ariaHideApp={false}
                        onRequestClose={this.closeModal}
                    >
                        <button className="closeTopRight" onClick={this.closeModal}>X</button>
                        <PaperModal paper={this.props.paper} close={this.closeModal} />
                    </Modal>
                )
            }
        }

        let check = null;
        
        /**
         * If a user is logged in add a watch button
         * table data to every paper
         */
        if (this.props.authenticated) {
            check = (
                <td>
                    <WatchPaperButton 
                        newAccessToken={this.props.newAccessToken} 
                        token={this.props.token} 
                        viewinglist={this.props.viewinglist} 
                        paper_id={this.props.paper.paper_id} 
                        addViewingList={this.props.addViewingList}
                        removeViewingList={this.props.removeViewingList}
                    />
                </td>
            )
        }

        /**
         * If being used through Authors add a selected tag to allow it to appear in yellow 
         * making it clear the currently chosen paper
         */
        let className = (this.props.currentPaperData !== undefined && this.props.currentPaperData !== null && this.props.currentPaperData.paper_id === this.props.paper.paper_id)
                      ? "selected"
                      : "";
        
        /**
         * Show a table of recieved paper information showing the title and
         * amount of authors who contributed to the paper
         */
        return(
            <tr className={className}>
                <td onClick={this.handleClick}><p>{this.props.paper.title}</p></td>
                <td onClick={this.handleClick}><p>{this.props.paper.Authors}</p></td>
                {check}
                {details}
            </tr>
        )
    }
}
export default Paper;