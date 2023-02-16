import React from "react";

/**
 * Dropdown for the awards
 * 
 * Utilzing the api/awards endpoint so get every award type
 * and its value output every award name additionally add 
 * "all" as an option to view any paper that has recieved 
 * an award and "None" for no filtering
 * 
 * @author Adam Lyon W19023403
 */
class SelectAward extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }
    /**
     * Get award names from the endpoint to populate the dropdown
     */
    componentDidMount() {
        let url = "https://adam-lyon.com/kf6012/part1/api/awards";

        fetch(url)
        .then( (response) => { 
            if (response.status === 200) {
                return response.json() 
            } else {
                throw Error(response.statusText)
            }
        })
        .then( (data) => {
            this.setState({results: data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    /**
     * Put results state into the dropdown additionally with an option for ALL and None for no filtering
     */
    render() {
        return (
            <label>Award
                <br></br>
                <select value={this.props.award} onChange={this.props.handleAwardSelect}>
                    <option value="">None</option>
                    {this.state.results.map( (award, i) => (<option key={award.award_type_id} value={award.name}>{award.name}</option>))}
                    <option value="all">ALL</option>
                </select>
                <br></br>
            </label> 
        )
    }
}
export default SelectAward;