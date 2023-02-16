import React from "react";
import Papers from "./Papers/Papers";
import PapersConference from "./papersConference.jpg";

/**
 * Main/home screen get a random papers details to output
 * by sending random as the paper_id parameter to the /papers
 * endpoint alongside an appropriate image
 * 
 * @author Adam Lyon W19023403
 */
class HomePage extends React.Component {
    render(){
        return(
            <div className="home">
                <img src={PapersConference} alt="Papers conference" />
                <p>
                    Photo by <a href="https://unsplash.com/photos/Hb6uWq0i4MI">Climate Reality</a> on <a href="https://unsplash.com/s/photos/cinema?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                </p>
                
                <Papers 
                    paperid={"random"} 
                    showAllDetails={true}
                />
            </div>
        )
    }
}
export default HomePage;