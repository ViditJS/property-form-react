import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HouseFormFields from './component/HouseFormFields';
import ButtonFields from './component/ButtonFields';
import UploadImages from './component/UploadImages';
import './steppers.css';

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

const getSteps =() => {
  return ['Add from scratch/Upload CSV', 'House form field', 'Upload images'];
}

const getStepContent = (stepIndex, callbckFun, setDataToUploadImage, uploadData) => {
  switch (stepIndex) {
    case 0:
        return (
            <ButtonFields buttonEvent= {setDataToUploadImage}/>
        )
    case 1:
      return (
          < HouseFormFields buttonEvent = {
            setDataToUploadImage
          }
          data = { uploadData } />
      );
    case 2:
      return (
        <UploadImages formData = { uploadData }/>
      )
    default:
      return 'Unknown stepIndex';
  }
}

const HorizontalLabelPositionBelowStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [uploadData, setUploadData] = React.useState({});

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const setDataToUploadImage = (data) => {
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
            < div className = {
              classes.instructions
            } > {
              getStepContent(activeStep, handleNext, setDataToUploadImage, uploadData)
            } >
            </div>
          )}
        </div>
      </div>
  );
}

export default HorizontalLabelPositionBelowStepper;
