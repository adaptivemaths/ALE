import React from "react";

export default class Question {
    constructor() {
        super();
        this.state = {
            question: {

            }
        };
    }

    componentDidMount() {
        this.setState({question: this.props.question});
    }

    render() {
        return (
            <div>
                <div>
                    {question.text}
                </div>
                <div>
                    {question.images.map((image) => (
                        <div>
                            <img src={image}></img>
                        </div>
                    ))}
                </div>
                <div>
                    <form>
                        {question.fields.map((field) => (
                            <div>
                                <label>{field + " = "}</label>
                                <input type="number"></input>
                            </div>
                        ))}
                        <button>
                           <span>Skip</span> 
                        </button>
                        <button>
                        <span>Submit</span>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}