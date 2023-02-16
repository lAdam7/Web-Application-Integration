import React, {Component} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import HomePage from './components/HomePage';
import PaperPage from './components/Papers/PaperPage';
import AuthorPage from './components/Authors/AuthorPage';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import NavigationStatus from './components/NavigationStatus';
import Login from './components/UserManagement/Login';
import Register from './components/UserManagement/Register';

/**
 * App component for navigation and access checks
 * 
 * Converted from a function to a class to make states easier to alter
 * than using the useState method and useEffects that would be required within a function.
 * Loads the navigation menus, controls the authentication state of the user alongisde contains
 * a method many components utilze for creating a new access token from the refresh token
 * and the navigation routes are declared 
 * 
 * @author Adam Lyon W19023403
 */
class App extends Component {
    /**
     * @var boolean authenticated Is the user logged in
     * @var string tokenAccess The access token from logging in / from local storage
     * @var string tokenRefresh The refresh token from logging in / from local storage
     * @var boolean loginMenu Is the login menu currently visible
     * @var boolean registerMenu Is the register menu currently visible
     */
    constructor() {
        super();
        this.state = {
            authenticated: false,
            tokenAccess: null,
            tokenRefresh: null,
            loginMenu: false,
            registerMenu: false
        }

        this.loggingIn = this.loggingIn.bind(this);
        this.newAccessToken = this.newAccessToken.bind(this);
        this.handleLoginMenuPress = this.handleLoginMenuPress.bind(this);
        this.handleRegisterMenuPress = this.handleRegisterMenuPress.bind(this);
    }

    /**
     * Update the state of the user (also used for logging out) and make sure loginMenu isn't visible
     * 
     * @param boolean authenticated User currently authenticated
     * @param string accessT New access token
     * @param string refreshT New refresh token
     */
    loggingIn(authenticated, accessT, refreshT) {
        this.setState({
            tokenAccess: accessT,
            tokenRefresh: refreshT,
            authenticated: authenticated,
            loginMenu: false
        })
    }

    /**
     * Component requested a new access token due to current one being expired
     * use the refresh token and ask the backend for a new access token to be generated
     */
    newAccessToken() {
        if (this.state.tokenRefresh !== null) {
            let url = "https://adam-lyon.com/kf6012/part1/api/authenticate/refresh";

            let formData = new FormData();
            formData.append('token', this.state.tokenRefresh);
      
            fetch(url, {method: 'POST',
                        headers: new Headers(),
                        body:formData})
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) { // Invalid refresh token
                    localStorage.removeItem("myAccessToken");
                    localStorage.removeItem("myRefreshToken");
                    this.loggingIn(false, null, null);
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                if (data && "access_token" in data.results) {
                    // access token recieved, update token so all other components will re-render and use
                    this.setState({ tokenAccess: data.results.access_token });
                    localStorage.setItem("myAccessToken", data.results.access_token);
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            })
        }
    }

    /**
     * Displaying the login/register menus when clicked
     */
    handleLoginMenuPress() {
        this.setState({ 
            loginMenu: !this.state.loginMenu,
            registerMenu: false
        })
    }
    handleRegisterMenuPress() {
        this.setState({
            registerMenu: !this.state.registerMenu,
            loginMenu: false
        })
    }

    render() {
        return (
            <BrowserRouter basename={"/kf6012/part2"}>
            <div className="App">
                <nav>
                    <ul>
                        <li key="/"><Link to="/">Home</Link></li>
                        <li key="papers"><Link to="papers">Papers</Link></li>
                        <li key="authors"><Link to="authors">Authors</Link></li>
                        <NavigationStatus 
                            authenticated={this.state.authenticated}
                            token={this.state.tokenAccess}
                            refreshToken={this.state.tokenRefresh}
                            newAccessToken={this.newAccessToken}
                            updateStatus={this.loggingIn}
                            viewLoginMenu={this.handleLoginMenuPress}
                            viewRegisterMenu={this.handleRegisterMenuPress}
                        />
                    </ul>

                    <Login 
                    viewLoginMenu={this.state.loginMenu}
                    updateStatus={this.loggingIn} />

                    <Register
                    viewRegisterMenu={this.state.registerMenu}
                    handleLoginMenuPress={this.handleLoginMenuPress} />
                </nav>
      
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="papers" element={<PaperPage authenticated={this.state.authenticated} token={this.state.tokenAccess} newAccessToken={this.newAccessToken} loggingIn={this.loggingIn} />} />
                    <Route path="authors" element={<AuthorPage authenticated={this.state.authenticated} token={this.state.tokenAccess} newAccessToken={this.newAccessToken} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
    </BrowserRouter>
    )
  }
}
export default App;