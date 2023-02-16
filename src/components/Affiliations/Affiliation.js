import React from "react";

/**
 * Output data for one specific affiliation
 * 
 * Output an affiliation that has been assigned a
 * unique key and sent from the Affiliations class many
 * values can be empty in the affiliation database, meaning
 * empty strings need to be checked to add commas where appropriate
 * 
 * @author Adam Lyon W19023403
 */
class Affiliation extends React.Component {    
    render() {
        return(
            <p>
                {(this.props.affiliation.country === "") ? "" : this.props.affiliation.country} 
                {(this.props.affiliation.state === "") ? "" : ", " + this.props.affiliation.state} 
                {(this.props.affiliation.city === "") ? "" : ", " + this.props.affiliation.city}
                {(this.props.affiliation.institution === "") ? "" : ", " + this.props.affiliation.institution}  
                {(this.props.affiliation.department === "") ? "" : ", " + this.props.affiliation.department} 
            </p>
        )
    }
}
export default Affiliation;