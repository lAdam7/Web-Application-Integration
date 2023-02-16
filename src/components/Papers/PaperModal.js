import React from "react";
import Authors from "../Authors/Authors";
import Youtube from "./YouTube";
import WatchPaperButton from "./WatchPaperButton";

/**
 * Show paper details and authors who contributed in a modal
 * 
 * Modal has to be created then this class generates the content inside,
 * to allow for the content to be added to pre-existing modals e.g. for the Authors
 * modal when selecting papers. Provides all details related to a paper in a
 * clear view and collecting affiliation details if paper is selected for a specific
 * author
 * 
 * @author Adam Lyon W19023403
 */
class PaperModal extends React.Component {
    /**
     * @param boolean isOpen the visibility of the modal (actual property within the modal component)
     * @param boolean All others used for the visibility of the content depending if the user clicked
     * the tab
     */
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            showAbstract: true,
            showAuthors: false,
            showVideo: false,
            showPreview: false
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleAbstract = this.handleAbstract.bind(this);
        this.handleAuthors = this.handleAuthors.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
    } 
 
    closeModal() { this.setState({ isOpen: false }); }

    /**
     * Clicking the tab revert the state to make it visible/invisible
     */
    handleAbstract() { this.setState({ showAbstract: !this.state.showAbstract }); }
    handleAuthors() { this.setState({ showAuthors: !this.state.showAuthors }); }
    handleVideo() { this.setState({ showVideo: !this.state.showVideo }); }
    handlePreview() { this.setState({ showPreview: !this.state.showPreview }); }

    render() {
        let watchPaper = null;

        /**
         * If a viewinglist prop recieved add a watch paper button at
         * the bottom of the paper modal
         */
        if (this.props.viewinglist !== undefined) {
            watchPaper = (
                <WatchPaperButton
                    viewinglist={this.props.viewinglist}
                    paper_id={this.props.paper.paper_id}
                    addViewingList={this.props.addViewingList}
                    removeViewingList={this.props.removeViewingList}
                    token={this.props.token}
                    newAccessToken={this.props.newAccessToken}
                />
            )
        }
        /**
         * Show paper information depending on the visibility of the set states
         */
        let abstract = (this.state.showAbstract)
                     ? <p>{this.props.paper.abstract}</p>
                     : null;
        let authors = (this.state.showAuthors)
                    ? <Authors 
                            paper_id={this.props.paper.paper_id} 
                            authenticated={this.props.authenticated}
                            token={this.props.token}
                            newAccessToken={this.props.newAccessToken}
                      />
                    : null;
        let video = (this.state.showVideo)
                  ? <Youtube videoURL={this.props.paper.video} />
                  : null;
        let preview = (this.state.showPreview)
                    ? <Youtube videoURL={this.props.paper.preview} />
                    : null;
        let award = (this.props.paper.Award === null)
                  ? "N/A"
                  : this.props.paper.Award;
        
        /**
         * When viewing a paper linked to a specific author a affiliations
         * prop is recieved if so show the data of how the author is affiliated
         */
        let affiliations = (this.props.affiliations !== undefined)
                        ? (
                            <div className="affiliations">
                                <h4>Paper Affiliation(s)</h4>
                                {this.props.affiliations}
                            </div>
                        )
                        : null;
        
        /**
         * Parent class that sets up modal has sent a closeModal method
         * use that and add button
         */      
        let close = (this.props.close !== undefined)
                  ? <button className="close" onClick={this.props.close}>Close</button>
                  : null;

        /**
         * Using h3 and upon clicking the data is then displayed within the modal
         */
        return(  
            <div className="paperModal">
                <h2>{this.props.paper.title}</h2>

                {affiliations}

                <p>Awards: {award}</p>
                <p>Available at: <a href={this.props.paper.doi} target="_blank" rel="noopener noreferrer">{this.props.paper.doi}</a></p>
                

                <h3 onClick={this.handleAbstract}>Abstract
                    <div className={(abstract === null) ? 'triDown' : 'triUp'}></div>
                </h3>
                {abstract}

                <h3 onClick={this.handleAuthors}>Authors ({this.props.paper.Authors})
                    <div className={(authors === null) ? 'triDown' : 'triUp'}></div>
                </h3>
                {authors}

                <h3 onClick={this.handlePreview}>Preview (YouTube)
                    <div className={(preview === null) ? 'triDown' : 'triUp'}></div>
                </h3>
                {preview}

                <h3 onClick={this.handleVideo}>Video (YouTube)
                    <div className={(video === null) ? 'triDown' : 'triUp'}></div>
                </h3>
                {video}

                {watchPaper}
                {close}
            </div>
        )
    }
}
export default PaperModal;