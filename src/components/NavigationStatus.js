import React from "react";
import SettingsDropdown from "./UserManagement/SettingsDropdown";

/**
 * Creates the navigation options located on the right if the
 * user isn't currently logged in providing access to the login/register options
 * and if logged in provind the logout/user settings options
 * 
 * @author Adam Lyon W19023403
 */
class NavigationStatus extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    
    /**
     * Show then login menu to the user
     */
    handleLoginMenuClick = () => {
        this.props.viewLoginMenu();
    }
    /**
     * Show the register menu to the user
     */
    handleRegisterMenuClick = () => {
        this.props.viewRegisterMenu();
    }

    /**
     * Logout button clicked clear all tokens from state and authentication state
     * and remove all tokens from localStorage and blacklist the refresh token
     * so new access tokens can no longer be created
     */
    handleLogoutClick() {
        let url = "https://adam-lyon.com/kf6012/part1/api/logout";

        let formData = new FormData();
        formData.append('token', this.props.refreshToken);
        
        fetch(url, {method: 'POST',
                    headers: new Headers(),
                    body:formData})
        .then((response) => {
            if (response.status === 204) {
                // Blacklsited token
            } else {
                throw Error(response.statusText)
            }
        })
        .catch((err) => {
            console.log("something went wrong ", err)
        })
        this.props.updateStatus(false, null, null);
        localStorage.removeItem("myAccessToken");
        localStorage.removeItem("myRefreshToken");
    }

    /**
     * First app run check if any tokens are stored in localStorage and set the states as needed
     * allows revisting the website to auto-login if not expired
     */
    componentDidMount() {
        let accessToken = (localStorage.getItem("myAccessToken")) ? localStorage.getItem("myAccessToken") : null;
        let refreshToken = (localStorage.getItem("myRefreshToken")) ? localStorage.getItem("myRefreshToken") : null;
        if (accessToken !== null) {
            this.props.updateStatus(true, accessToken, refreshToken);
        }
    }

    /**
     * If logged in show the logout/user settings options
     * else show login/register options
     */
    render() {
        let navigationUniqueContent = [
            <li key="logout" className="right"><button onClick={this.handleLogoutClick}>Logout</button></li>,
            <li key="settings" className="right">
                <SettingsDropdown token={this.props.token} newAccessToken={this.props.newAccessToken} />
            </li>
        ];

        if (!this.props.authenticated) {
            navigationUniqueContent = [
              <li key="login" className="right"><button onClick={this.handleLoginMenuClick}>Login</button></li>,
              <li key="register" className="right"><button onClick={this.handleRegisterMenuClick}>Register</button></li>
            ];
        }

        return (
            <div>
                {navigationUniqueContent}
            </div>       
        )
    }
}
export default NavigationStatus;