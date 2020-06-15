import React, {useState} from 'react';
import Papa from 'papaparse';
import './ButtonFields.css';

const ButtonFields = ({buttonEvent}) => {

    const [csvFile, setCSVFile] = useState(undefined);
    const [fileAvailable, setfileAvailable] = useState(false);

    const handleChange = event => {
        if(event.target.files[0]) {
            setfileAvailable(true);
            setCSVFile(event.target.files[0]);
        }
        
  };
   const importCSV = () => {
       Papa.parse(csvFile, {
            complete: updateData,
            header: true
        });
    };

    const updateData = (result) => {
        var data = result.data[0];
        setCSVFile(data);
        buttonEvent(data)
    };
    return (
        <div className="row button-fields">
            <div className="col-sm-12 text-center">
                <button 
                    className="add-from-scratch"
                    type='button'  
                    onClick={buttonEvent}
                    style={{marginRight : '5px'}}
                    >
                    Add from scratch
                </button>
                <label className="custom-file-upload">
                    <input  onChange={handleChange} type="file"/>
                    Custom Upload
                </label>
                {fileAvailable && <button 
                    className="upload-now"
                    onClick={importCSV}
                > Upload now!</button>}
            </div>
        </div>    
    )
}

export default ButtonFields;