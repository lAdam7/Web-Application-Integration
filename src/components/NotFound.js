import React from "react";
import notFound from "./notFound.jpg" // https://www.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_11235921.htm#query=not%20found&position=1&from_view=keyword

/**
 * Used when trying to access a page that doesn't exist
 * shows an appropriate image and tells the user about the
 * error with navigation options still available
 * 
 * @author Adam Lyon W19023403
 */
class NotFound extends React.Component {
    render(){
        return(
            <div>
                <img className="notFound" src={notFound} alt="Page not found" />
                <br></br>
                <a href="http://www.freepik.com" target="_blank" rel="noopener noreferrer">Image Designed by pch.vector / Freepik</a>

                <p>This page doesn't exist<br></br><br></br>Please use the menu at the top to navigate throughout the site</p>
            </div>
        )
    }
}
export default NotFound;