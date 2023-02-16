import React from "react";
import Affiliation from "./Affiliation";

/**
 * Gather all affiliations for a paper and/or specific author
 * 
 * Get all affiliations from the api/affiliations endpoint used
 * when selecting papers on the authors page to show the client
 * the affiliations of that author using the paperid and authorid
 * 
 * @author Adam Lyon W19023403
 */
class Affiliations extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            results: []
        }
    }
    
    /**
     * Get affiliations information using the paper_id and 
     * author_id props if recieved
     */
    componentDidMount() {
        let url = "https://adam-lyon.com/kf6012/part1/api/affiliations";

        if (this.props.paper_id !== undefined) {
            url += "?id=" + this.props.paper_id
        }

        if (this.props.author_id !== undefined) {
            url += "&authorid=" + this.props.author_id
        }

        fetch(url)
        .then( (response) => { 
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({results:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    /**
     * Show data if loaded into state or 
     * loading if not yet gathered
     */
    render() {
        let noData = null;
        if (this.state.results.length === 0) {
            noData = <p>Loading...</p>
        }
        
        return (
            <div>
                {noData}
                {
                    this.state.results.map( (affiliation, i) => (
                        <Affiliation key={i} affiliation={affiliation}/>
                    ))
                }          
            </div>
        )
    }
}
export default Affiliations;