import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HouseFormFields from './component/HouseFormFields';
import ButtonFields from './component/ButtonFields';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Add from scratch/Upload CSV', 'House form field', 'Upload images'];
}

function getStepContent(stepIndex, callbckFun, setDataToUploadImage) {
  console.log('callbckFun', callbckFun)
  switch (stepIndex) {
    case 0:
        return (
          <ButtonFields buttonEvent= {setDataToUploadImage}/>
        )
    case 1:
      return (
          <HouseFormFields buttonEvent = {setDataToUploadImage}/>
      );
    case 2:
      return 'Upload images';
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [uploadData, setUploadData] = React.useState({});

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const setDataToUploadImage = (data) => {
    console.log('data is', data);
    setUploadData(data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <div className={classes.instructions}>All steps completed</div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div className={classes.instructions}>{getStepContent(activeStep, handleNext, setDataToUploadImage)}>
          </div>
        )}
      </div>
    </div>
  );
}

// import React from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput } from "mdbreact";

// class StepperExample extends React.Component {

// state = {
//   formActivePanel1: 1,
//   formActivePanel1Changed: false,
// }

// swapFormActive = (a) => (param) => (e) => {
//   this.setState({
//     ['formActivePanel' + a]: param,
//     ['formActivePanel' + a + 'Changed']: true
//   });
// }

// handleNextPrevClick = (a) => (param) => (e) => {
//   this.setState({
//     ['formActivePanel' + a]: param,
//     ['formActivePanel' + a + 'Changed']: true
//   });
// }

// handleSubmission = () => {
//   alert('Form submitted!');
// }

// calculateAutofocus = (a) => {
//   if (this.state['formActivePanel' + a + 'Changed']) {
//     return true
//   }
// }

// render() {
//   return (
//     <MDBContainer>
//       <h2 className="text-center font-weight-bold pt-4 pb-5 mb-2"><strong>Registration form</strong></h2>
//       <MDBStepper icon>
//         <MDBStep far icon="folder-open" stepName="Basic Information" onClick={this.swapFormActive(1)(1)}></MDBStep>
//         <MDBStep icon="pencil-alt" stepName="Personal Data" onClick={this.swapFormActive(1)(2)}></MDBStep>
//         <MDBStep icon="photo" stepName="Terms and Conditions" onClick={this.swapFormActive(1)(3)}></MDBStep>
//         <MDBStep icon="check" stepName="Finish" onClick={this.swapFormActive(1)(4)}></MDBStep>
//       </MDBStepper>

//       <form role="form" action="" method="post">
//         <MDBRow>
//           {this.state.formActivePanel1 == 1 &&
//           (<MDBCol md="12">
//             <h3 className="font-weight-bold pl-0 my-4">
//               <strong>Basic Information</strong></h3>
//             <MDBInput label="Email" className="mt-4" autoFocus={this.calculateAutofocus(1)} />
//             <MDBInput label="Username" className="mt-4" />
//             <MDBInput label="Password" className="mt-4" />
//             <MDBInput label="Repeat Password" className="mt-4" />
//             <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>next</MDBBtn>
//           </MDBCol>)}

//           {this.state.formActivePanel1 == 2 &&
//           (<MDBCol md="12">
//             <h3 className="font-weight-bold pl-0 my-4"><strong>Personal Data</strong></h3>
//             <MDBInput label="First Name" className="mt-3" autoFocus={this.calculateAutofocus(1)} />
//             <MDBInput label="Second Name" className="mt-3" />
//             <MDBInput label="Surname" className="mt-3" />
//             <MDBInput label="Address" type="textarea" rows="2" />
//             <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
//             <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
//           </MDBCol>)}

//           {this.state.formActivePanel1 == 3 &&
//           (<MDBCol md="12">
//             <h3 className="font-weight-bold pl-0 my-4"><strong>Terms and conditions</strong></h3>
//             <MDBInput label="I agreee to the terms and conditions" type="checkbox" id="checkbox" autoFocus={this.calculateAutofocus(1)} />
//             <MDBInput label="I want to receive newsletter" type="checkbox" id="checkbox2" />
//             <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}>previous</MDBBtn>
//             <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(4)}>next</MDBBtn>
//           </MDBCol>)}

//           {this.state.formActivePanel1 == 4 &&
//           (<MDBCol md="12">
//             <h3 className="font-weight-bold pl-0 my-4"><strong>Finish</strong></h3>
//             <h2 className="text-center font-weight-bold my-4">Registration completed!</h2>
//             <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(3)}>previous</MDBBtn>
//             <MDBBtn color="success" rounded className="float-right" onClick={this.handleSubmission}>submit</MDBBtn>
//           </MDBCol>)}
//         </MDBRow>
//       </form>
//     </MDBContainer>
//     );
//   };
// }

// export default StepperExample;