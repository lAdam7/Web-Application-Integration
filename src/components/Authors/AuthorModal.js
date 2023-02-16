import React from "react";
import Modal from "react-modal";
import Papers from "../Papers/Papers";
import PaperModal from "../Papers/PaperModal";
import Affiliations from "../Affiliations/Affiliations";

/**
 * Show author details and paper contributions in a Modal
 * 
 * Used once selecting an author opens a Modal component
 * displaying the authors name, followed by their contributing
 * papers where selecting a paper loads the information for that
 * paper at the bottom of the modal
 * 
 * @author Adam Lyon W19023403
 */
class AuthorModal extends React.Component {
    /**
     * @param boolean isOpen modal visible/not actual property for the modal component
     * @param array JSON of the paper data returned from Papers (used when clicking a paper attached to an Author)
     */
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            paperData: null
        }

        this.closeModal = this.closeModal.bind(this);
        this.handlePaperData = this.handlePaperData.bind(this);
    } 
    /**
     * Reset so clicking the same author opens the modal again
     */
    closeModal() { this.props.handleDisplay(false); this.setState({ isOpen: false }); }

    /**
     * Data returned from Papers class to get the data on the clicked paper
     */
    handlePaperData(data) { this.setState({ paperData: data }) }

    render() {
        /**
         * Paper information with the data from Papers adding
         * affiliations information aditionally to know how the particular
         * author was involved with the paper
         */
        let paperInfo = (this.state.paperData !== null)
                      ? (
                          <div>
                                <PaperModal 
                                    paper={this.state.paperData}
                                    close={this.closeModal} 
                                    affiliations={
                                                    <Affiliations 
                                                        paper_id={this.state.paperData.paper_id}
                                                        author_id={this.props.author.author_id}
                                                    />
                                                 } 
                                />
                          </div>
                      )
                      : null;
        
        /**
         * Modal for authors showing there name followed by a table
         * containing a list of every paper the author has contributed
         * towards
         */
        return(  
            <Modal
                isOpen={this.state.isOpen}
                ariaHideApp={false}
                onRequestClose={this.closeModal}
            >
                <button className="closeTopRight" onClick={this.closeModal}>X</button>
                <h1>{this.props.author.first_name} {this.props.author.middle_name} {this.props.author.last_name}</h1>

                <Papers
                    authorid={this.props.author.author_id}
                    handlePaperData={this.handlePaperData} 
                    currentPaperData={this.state.paperData} 
                    authenticated={this.props.authenticated} 
                    token={this.props.token} 
                    newAccessToken={this.props.newAccessToken}
                /> 

                {paperInfo}     
            </Modal>  
        )
    }
}
export default AuthorModal;