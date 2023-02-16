import React from 'react';
import Modal from "react-modal";

/**
 * Style options available for the modal
 */
const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: "#333",
    padding: "60px",
    borderRadius: "15px"
    }
} 

/**
 * Changing password for a logged in user
 * 
 * Displays the changing password modal alongside using the /user/changepassword
 * endpoint to make the changes alongside checking the new password is
 * strong enough/meets the criteria and if not outputing error/success messages
 * 
 * @author Adam Lyon w19023403
 */
class ChangePassword extends React.Component {
    /**
     * Controlling the input values then checking that and outputting error messages where
     * required that render below the input box
     */
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,

            currentPassword: "",
            newPassword: "",
            newPasswordCheck: "",

            currentPasswordError: "",
            newPasswordError: "",
            newPasswordCheckError: "",
            changePasswordError: ""
        }

        this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
        this.handleNewPassword = this.handleNewPassword.bind(this);
        this.handleNewPasswordCheck = this.handleNewPasswordCheck.bind(this);
        this.handleChangePasswordClick = this.handleChangePasswordClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
     * Event change listners
     */
    handleCurrentPassword = (e) => { this.setState({ currentPassword: e.target.value }); }
    handleNewPassword = (e) => { this.setState({ newPassword: e.target.value, newPasswordError: null }); }
    handleNewPasswordCheck = (e) => { this.setState({ newPasswordCheck: e.target.value, newPasswordCheckError: null }) }

    /**
     * Focus lost for the new password and the retype password check check for errors
     * and output message if required
     */
    handleNewPasswordFocusLost = () => {
        this.setState({ 
            newPasswordError: (this.state.newPassword.length > 7 ) ? null : "Password must be atleast 8 characters"
         })
    }
    handleNewPasswordCheckFocusLost = () => {
        this.setState({
            newPasswordCheckError: (this.state.newPasswordCheck === this.state.newPassword) ? null : "Doesn't match your first password!"
        })
    }

    /**
     * Stop rendering of the modal / allow re-clicks of the changepassword
     */
    closeModal() { this.props.handleChangePasswordClick() }

    /**
     * Change password clicked run the focus lost events again and check that no messages were
     * outputed then attempt using the endpoint also fetching a new access token when required
     */
    handleChangePasswordClick = (e) => {
        this.handleNewPasswordFocusLost();
        this.handleNewPasswordCheckFocusLost();
        
        if (this.state.password === this.state.passwordCheck && this.state.newPasswordError === null && this.state.newPasswordCheckError === null) {
            let url = "https://adam-lyon.com/kf6012/part1/api/user/changepassword";
            
            let formData = new FormData();
            formData.append("token", this.props.token)
            formData.append("password", this.state.currentPassword);
            formData.append("newpassword", this.state.newPassword);

            // fetch request with POST method
            fetch(url, {method: 'POST',
                        headers: new Headers(),
                        body: formData})
            .then((response) => {
                if (response.status === 204) {
                    this.setState({
                        changePasswordError: "Password changed!",
                        currentPassword: "",
                        newPassword: "",
                        newPasswordCheck: ""
                    });

                } else if (response.status === 401) {
                    this.props.newAccessToken();
                    this.setState({ changePasswordError: "Incorrect details!, try again!" })
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
     * Create the modal with the inputs required for changing password
     * alongside the error message spaces to be displayed if the error
     * is not an empty string
     */
    render() {
        return (
            <Modal
                isOpen={this.state.isOpen}
                ariaHideApp={false}
                style={customStyles}
                onRequestClose={this.closeModal}
            >
                <div className="changePassword">
                <h2>Change Password</h2>
                <label>Current Password</label>
                <br></br>
                <input
                    type='password'
                    placeholder='current password'
                    value={this.state.currentPassword}
                    onChange={this.handleCurrentPassword}
                />
                <p className='error'>{this.state.currentPasswordError}</p>
                <label>New Password</label>
                <br></br>
                <input
                    type='password'
                    placeholder='new password'
                    value={this.state.newPassword}
                    onChange={this.handleNewPassword}
                    onBlur={this.handleNewPasswordFocusLost}
                />
                <p className='error'>{this.state.newPasswordError}</p>
                <label>Retype New Password</label>
                <br></br>
                <input
                    type='password'
                    placeholder='retype new password'
                    value={this.state.newPasswordCheck}
                    onChange={this.handleNewPasswordCheck}
                    onBlur={this.handleNewPasswordCheckFocusLost}
                />
                <p className='error'>{this.state.newPasswordCheckError}</p>
                <button onClick={this.handleChangePasswordClick}>Change Password</button>
                <p className='error'>{this.state.changePasswordError}</p>
                <button onClick={this.closeModal}>Cancel</button>
                </div>
            </Modal>      
        ) 
    }
}
export default ChangePassword