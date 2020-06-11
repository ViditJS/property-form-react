import React from 'react';
import './HouseFormFields.css';

class HouseFormFields extends React.Component {

  constructor() {
    super();
    this.state = {
      address: '',
      bedroom: '',
      bathroom: '',
      description: ''
    };
  }

  handleAddressChange = (e) => {
    this.setState({address: e.target.value});
  }

  handleBedRoomChange = (e) => {
    this.setState({ bedroom: e.target.value });
  };

  handleBathRoomChange = (e) => {
    this.setState({ bathroom: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    evt.preventDefault();
    console.log('submit', this.state);
    this.props.buttonEvent(this.state);
  };

  canBeSubmitted() {
    const { address, bedroom, bathroom } = this.state;
    return (bedroom.length > 0 && bedroom.length <=10) 
      && (bathroom.length > 0 && bathroom.length <=5) 
      && (address.length > 0);
  }

  render() {
    const enable = this.canBeSubmitted();
    return (
      <div id="main-registration-container">
      <div id="register">
          <h3>Registration page</h3>
          <form name="userRegistrationForm"  onSubmit= {this.handleSubmit} >
            <label>Address:</label>
            <input type="text" name="address" value={this.state.address} onChange={this.handleAddressChange} />
            <label>Bedroom:</label>
            <input type="number" name="bedroom" value={this.state.bedroom} maxLength="10" onChange={this.handleBedRoomChange}  />
            <label>Bathroom:</label>
            <input type="number" name="bathroom" value={this.state.bathroom} maxLength="5" onChange={this.handleBathRoomChange}  />
            <label>Description of Property:</label>
            <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange}/>
            <button className="button" disabled={!enable}>Submit</button>
          </form>
        </div>
      </div>
      );
    }
}

export default HouseFormFields;