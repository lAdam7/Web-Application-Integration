import React from 'react';

/**
 * Register a new account with the system
 * 
 * Create the graphical element required for registering
 * and using the /user/create endpoint to create a new user
 * alongside the /user/exists to provide an error message if
 * the email address is already associated with an account
 * 
 * @author Adam Lyon W19023403
 */
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordCheck: "",

            emailError: null,
            passwordError: null,
            passwordCheckError: null,
            registerError: null
        }

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
    }
    /**
     * Event listeners 
     */
    handleEmail = (e) => { this.setState({ email: e.target.value }); }
    handlePassword = (e) => { this.setState({ password: e.target.value, passwordError: null }); }
    handlePasswordCheck = (e) => { this.setState({ passwordCheck: e.target.value, passwordCheckError: null }) }

    /**
     * Focus lost of the email address input, check if it's a valid email address
     * if so then ask the API to check if the email is already associated with a user
     */
    handleEmailFocusLost = () => {
        let emailCheck = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
        this.setState({
            emailError: (emailCheck)
                        ? null
                        : "Invalid email address"
        })
        
        if (emailCheck) { // Email address in correct format
            let url = "https://adam-lyon.com/kf6012/part1/api/user/exists?email=" + this.state.email;
   
            fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw Error(response.statusText)
                }
            })
            .then((data) => {
                // check exists value and set error message if returned true
                if ("exists" in data.results) {
                    this.setState({
                        emailError: (!data.results.exists)
                                    ? null
                                    : "Email already registered"
                    })
                }
            
            })
            .catch((err) => {
                console.log("Something went wrong ", err);
            })
        }
    }

    /**
     * Focus lost on the password / retype password inputs check that they're
     * valid inputs if not output a meaningful error message
     */
    handlePasswordFocusLost = () => {
        this.setState({ 
            passwordError: (this.state.password.length > 7 ) ? null : "Password must be atleast 8 characters"
         })
    }
    handlePasswordCheckFocusLost = () => {
        this.setState({
            passwordCheckError: (this.state.passwordCheck === this.state.password) ? null : "Doesn't match your first password!"
        })
    }

    /**
     * Register a user button clicked check the focus lost to see if any error messges
     * are generated / output to the user, then check there is no issues with the data
     * and use the user/create endpoint
     */
    handleRegisterClick = (e) => {
        this.handleEmailFocusLost();
        this.handlePasswordFocusLost();
        this.handlePasswordCheckFocusLost();
        
        if (this.state.password === this.state.passwordCheck && this.state.passwordCheckError === null && this.state.emailError === null) {
            let url = "https://adam-lyon.com/kf6012/part1/api/user/create";
            
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);

            fetch(url, {method: 'POST',
                        headers: new Headers(),
                        body:formData})
            
            .then((response) => {
                if (response.status === 204) { // Account created tell user to login
                    this.setState({ registerError: "Success! try login!" })
                } else {
                    throw Error(response.statusText)
                }
            })
            .catch((err) => {
                console.log("Something went wrong ", err);
            })
        }
    }

    /**
     * If the register menu is true show the form
     * required for registering a user with showing
     * error messages if the states are not empty strings
     */
    render() {
        if (this.props.viewRegisterMenu) {
            return (
                <div className='loginInput'>
                    <label>Email</label>
                    <br></br>
                    <input
                        type='text'
                        placeholder='email'
                        value={this.state.email}
                        onChange={this.handleEmail}
                        onBlur={this.handleEmailFocusLost}
                    />
                    <p className='error'>{this.state.emailError}</p>
                    <label>Password</label>
                    <br></br>
                    <input
                        type='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handlePassword}
                        onBlur={this.handlePasswordFocusLost}
                    />
                    <p className='error'>{this.state.passwordError}</p>
                    <label>Retype Password</label>
                    <br></br>
                    <input
                        type='password'
                        placeholder='retype password'
                        value={this.state.passwordCheck}
                        onChange={this.handlePasswordCheck}
                        onBlur={this.handlePasswordCheckFocusLost}
                    />
                    <p className='error'>{this.state.passwordCheckError}</p>
                    <button onClick={this.handleRegisterClick}>Register</button>
                    <p className='success'>{this.state.registerError}</p>
                </div>
            )
        } else {
            return (null)
        }
    }
}
export default Register