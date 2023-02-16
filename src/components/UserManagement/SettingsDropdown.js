import React from 'react';
import ChangePassword from './ChangePassword';

/**
 * Settings drop-down used for changing password
 * 
 * Shows the 'User Settings' button detects when mouse is
 * hovered over it and opens the sub-menu that currently
 * only shows change-password but more functionaltiy can
 * easily be added onto that
 * 
 * @author Adam Lyon W19023403
 */
class SettingsDropdown extends React.Component {
    /**
     * @param boolean hovering Mouse currently hovering over the User Settings button or a menu option for the settings
     * @param boolean showChangePassword currently showing the change password screen/modal
     */
    constructor(props) {
        super(props);
        this.state = {
            hovering: false,
            showChangePassword: false,
        }

        this.handleChangePasswordClick = this.handleChangePasswordClick.bind(this);
    }

    /**
     * Used for detecting both moustenter and mouseleaving check which
     * event it is and update the visiblity of the menu as appropriate
     */
    handleHover = (e) => {
        if (e.type === "mouseenter") {
            this.setState({ hovering: true });
        } else {
            this.setState({ hovering: false });
        }
    }

    /**
     * Open/Show the change password modal
     */
    handleChangePasswordClick() {
        this.setState({ showChangePassword: !this.state.showChangePassword })
    }

    /**
     * Show the sub-menu if the mouse is currently hovering and the
     * change password component if selected
     */
    render() {
        let settingsOptions = (this.state.hovering)
                            ? (
                                <div onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} className='hoverSettings'>
                                    <button onClick={this.handleChangePasswordClick}>Change Password</button>
                                </div>
                            )
                            : null;
        /**
         * Access to the newAccessToken if the current token has expired
         */
        let changePassword = (this.state.showChangePassword)
                           ? <ChangePassword 
                                token={this.props.token}
                                newAccessToken={this.props.newAccessToken}
                                handleChangePasswordClick={this.handleChangePasswordClick}
                            />
                           : null;
        return (
            <div>
                <button onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>User Settings</button>
                {settingsOptions}
                {changePassword}
            </div>       
        )
    }
}
export default SettingsDropdown