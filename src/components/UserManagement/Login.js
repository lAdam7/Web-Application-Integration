import React from 'react';

/**
 * Logging a user into the system
 * 
 * Displays the graphical elements for logging in alongside
 * usng the /authenticate endpoint and outputting an error message
 * depending on login sucess from the API call
 * 
 * @author Adam Lyon W19023403
 */
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    /**
     * Event listners / change state onChange
     */
    handleEmail = (e) => { this.setState({ email: e.target.value }) }
    handlePassword = (e) => { this.setState({ password: e.target.value }) }

    /**
     * Login button pressed get the email and password and POST
     * to the /authenticate endpoint outputting if the provided details
     * were correct in a message, else logging in and clearing the Login UI
     */
    handleLoginClick = (e) => {
        let url = "https://adam-lyon.com/kf6012/part1/api/authenticate";
    
        let formData = new FormData();
        formData.append('username', this.state.email);
        formData.append('password', this.state.password);

        fetch(url, {method: 'POST',
                    headers: new Headers(),
                    body:formData})
        .then((response) => {
            if (response.status === 200 || response.status === 401) {
                return response.json();
            } else {
                throw Error(response.statusText)
            }
        })
        .then((data) => {
            // if the resuls include a token, change state to authenticated
            if (data.results.length === 0) {
                this.setState({ errorMessage: "Incorrect username or password" });
            } else if ("access_token" in data.results && "refresh_token" in data.results) {
                this.props.updateStatus(true, data.results.access_token, data.results.refresh_token);
                this.setState({
                    email: "",
                    password: ""
                })
                // save access and refresh in local storage
                localStorage.setItem("myAccessToken", data.results.access_token);
                localStorage.setItem("myRefreshToken", data.results.refresh_token);
            }
        })
        .catch((err) => {
            console.log("Something went wrong ", err);
        })
    }

    /**
     * If the viewing login menu then show the
     * login UI
     */
    render() {
        if (this.props.viewLoginMenu) {
            return (
                <div className='loginInput'>
                    <label>Email</label>
                    <br></br>
                    <input
                        type='text'
                        placeholder='email'
                        value={this.state.email}
                        onChange={this.handleEmail}
                    />
                    <br></br>
                    <label>Password</label>
                    <br></br>
                    <input
                        type='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handlePassword}
                    />
                    <p className='error'>{this.state.errorMessage}</p>
                    <button onClick={this.handleLoginClick}>Login</button>
                </div>
            )
        } else {
            return (null)
        }
    }
}
export default Login