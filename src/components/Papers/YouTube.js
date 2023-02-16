import React from "react";

/**
 * Using iframe put youtube video into react used when viewing 
 * paper in modal view since there is space available getting the id
 * from the existing youtube URL by taken the starting string out
 * 
 * @author Adam Lyon W19023403
 */
class Youtube extends React.Component {
    render() {
        return (
            <div className="center">
                <iframe 
                    title={this.props.videoURL} 
                    width="490" 
                    height="320"
                    src={"https://www.youtube.com/embed/" + this.props.videoURL.replace('https://www.youtube.com/watch?v=','')}
                >
                </iframe>
            </div>
        )
    }
}
export default Youtube;