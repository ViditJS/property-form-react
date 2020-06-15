import React from 'react';
import { GoogleComponent } from 'react-google-location';
import PlacesAutocomplete, {geocodeByAddress, getLating} from 'react-places-autocomplete';
import './HouseFormFields.css';

const API_KEY = 'AIzaSyCOnjzHV45GnYzfqu9dLXZ6GBwqsDwjs5Y';

class HouseFormFields extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: props.data ? props.data.A : '',
      bedroom: props.data ? props.data.B : '',
      bathroom: props.data ? props.data.C : '',
      description: props.data ? props.data.D : '',
      place: null,
      errors: {
        address: '',
        bedroom: '',
        bathroom: '',
        description: ''
      }
    };
  }

  // const [address, setAddress] = useState('');

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({[name]: value});

  }

  handleSubmit = evt => {
    evt.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }
    this.props.buttonEvent(this.state);
  };

  canBeSubmitted() {
    const { address, bedroom, bathroom } = this.state;
    return ( !isNaN(bedroom) && bedroom.length > 0 && bedroom.length <=10 ) 
      && ( !isNaN(bathroom) && bathroom.length > 0 && bathroom.length <=5 ) 
      && (address.length > 0);
  }

  // For future implementation - need to call onFocus from input to display error msg
  handleBlur(name) {
    const {address, bedroom, bathroom} = this.state;
    const {errors} = this.state;
    switch(name) {
      case 'address': 
        errors.address = (address === undefined || address.length === 0) ? 'you must enter address' : '';
        break; 
      case 'bedroom':
        errors.bedroom = ((bedroom !== undefined) && (!isNaN(bedroom) && bedroom.length > 0 && bedroom.length <=10) )
          ? '' 
          : 'bedroom length must be valid';
        break;
      case 'bathroom':
        errors.bathroom = ((bathroom !== undefined) && (!isNaN(bathroom) && bathroom.length > 0 && bathroom.length <=5)) 
        ? ''
        : 'bathroom length must be valid';
        break;
      default:
        break;       
    }

    this.setState({errors});

  } 

  // componentDidMount = () => {
  //   document.getElementById("myButton").focus()
  // }

  // const handleSelect = (value) => {

  // }

  render() {
    console.log('place', this.state.place);
    const enable = this.canBeSubmitted();
    const errors = this.state.errors;
    return (
      <div id="main-registration-container">
        <div id="register">
          <h3>Registration page</h3>
          <form name="userRegistrationForm"  onSubmit= {this.handleSubmit} >
            <label>Address:</label>
            {/* <input type="text" name="address" id='myButton' value={this.state.address} onChange={this.handleChange}/> */}
          
        <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:us'} onChange={(e) => { this.setState({ place: e }) }} />
            {/* <PlacesAutocomplete value = {address} onChange={setAddress} onSelect={handleSelect} */}
            {errors.address.length > 0 && <span className='errorMsg'>{errors.address}</span>}
            <label>Bedroom:</label>
            <input type="number" name="bedroom" value={this.state.bedroom} onChange={this.handleChange}  />
            {errors.bedroom.length > 0 && <span className='errorMsg'>{errors.bedroom}</span>}
            <label>Bathroom:</label>
            <input type="number" name="bathroom" value={this.state.bathroom} onChange={this.handleChange}  />
            {errors.bathroom.length > 0 && <span className='errorMsg'>{errors.bathroom}</span>}
            <label>Description of Property:</label>
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
            <button className="button" disabled={!enable}>Submit</button>
          </form>
        </div>
      </div>
      );
    }
}

export default HouseFormFields;