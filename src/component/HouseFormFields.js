import React from "react";
import { GoogleComponent } from "react-google-location";
import "./HouseFormFields.css";

const API_KEY = "AIzaSyB4AutW3ws-MlkG-VZ02GsiwC7yQHMbin0";

class HouseFormFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.data ? props.data.A : null,
      bedroom: props.data ? props.data.B : "",
      bathroom: props.data ? props.data.C : "",
      description: props.data ? props.data.D : "",
      errors: {
        address: "",
        bedroom: "",
        bathroom: "",
        description: "",
      },
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }
    this.props.buttonEvent(this.state);
  };

  handleChangeAddress = (e) => {
   this.setState({ address: e.place })
  };

  canBeSubmitted() {
    const { address, bedroom, bathroom } = this.state;
    return (
      !isNaN(bedroom) &&
      bedroom.length > 0 &&
      bedroom.length <= 10 &&
      !isNaN(bathroom) &&
      bathroom.length > 0 &&
      bathroom.length <= 5 &&
      address.length > 0
    );
  }

  // For future implementation - need to call onFocus from input to display error msg
  handleBlur(name) {
    const { address, bedroom, bathroom } = this.state;
    const { errors } = this.state;
    switch (name) {
      case "address":
        errors.address =
          address === undefined || address.length === 0
            ? "you must enter address"
            : "";
        break;
      case "bedroom":
        errors.bedroom =
          bedroom !== undefined &&
          !isNaN(bedroom) &&
          bedroom.length > 0 &&
          bedroom.length <= 10
            ? ""
            : "bedroom length must be valid";
        break;
      case "bathroom":
        errors.bathroom =
          bathroom !== undefined &&
          !isNaN(bathroom) &&
          bathroom.length > 0 &&
          bathroom.length <= 5
            ? ""
            : "bathroom length must be valid";
        break;
      default:
        break;
    }

    this.setState({ errors });
  }

  render() {
    const { address, bedroom, bathroom, errors } = this.state;
    const enable = this.canBeSubmitted();
    return (
      <div id="main-registration-container">
        <div id="register">
          <h3>Registration page</h3>
          <form name="userRegistrationForm" onSubmit={this.handleSubmit}>
            <label>Address:</label>
              <GoogleComponent
                apiKey={API_KEY}
                language={"en"}
                country={"country:in|country:us"}
                locationBoxStyle={"custom-style"}
                locationListStyle={"custom-style-list"}
                onChange={(e) => {
                  this.handleChangeAddress(e);
                }}
              />
            <label>Bedroom:</label>
            <input
              type="number"
              name="bedroom"
              value={bedroom || ""}
              onChange={this.handleChange}
            />
            <label>Bathroom:</label>
            <input
              type="number"
              name="bathroom"
              value={bathroom || ""}
              onChange={this.handleChange}
            />
            <label>Description of Property:</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <button className="button" disabled={!enable}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default HouseFormFields;
