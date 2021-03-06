import React from "react";
import { addToMailingList } from "../../api";

export default class MailingListForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      messsage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
      message: "",
    });
  }

  handleSubmit(event) {
    // Add email to database
    addToMailingList(this.state);
    this.setState({
      email: "",
      message: "You should receive an email from us shortly",
    });

    event.preventDefault();
  }

  render() {
    return (
      <div className="mailing-list-form">
        <form>
          <div className="mail-container">
            <label>
              Interested? Sign up to our mailing list and you will be the first
              to know when we launch
            </label>
            <div className="flex-container">
              <div className="mail-input">
                <input
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Your email"
                />
              </div>
              <button id="mail-signup" onClick={this.handleSubmit}>
                SIGN UP
              </button>
              <br />
              <div>{this.state.message}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
