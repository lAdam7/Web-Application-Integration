import React from "react";

/**
 * Wrap input into label so selecting the text also changes the
 * checked state used for viewing papers that the user has
 * already WATCHED
 * 
 * @author Adam Lyon W19023403
 */
class WatchPapersCheckbox extends React.Component {
    render() {
        return (
            <label>Only show Watching Papers
            <input
                className="checkbox"
                type="checkbox"
                id="viewlist"
                name="viewlist"
                value="paper"
                checked={this.props.watchingOnly}
                onChange={this.props.handleWatchingOnly}
            />
            </label>
        )
    }
}
export default WatchPapersCheckbox;