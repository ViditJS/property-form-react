import React, {useState} from 'react';

const ButtonFields = ({buttonEvent}) => {
    return (
        <div className="row">
            <div className="col-sm-12 text-center">
                <button id="btnSearch" className="btn btn-primary btn-md center-block" style={{width: "100px"}} onClick={buttonEvent} >Add from scratch</button>
                {/* <button id="btnClear" className="btn btn-danger btn-md center-block"  style={{width: "100px"}} onClick={()=>buttonEvent()} >Upload as CSV</button> */}
                <input
                    className="csv-input"
                    type="file"
                    // ref={input => {
                    //     this.filesInput = input;
                    // }}
                    name="file"
                    placeholder={null}
                    // onChange={this.handleChange}
                    />
                <button 
                // onClick={this.importCSV}
                > Upload now!</button>
            </div>
        </div>    
    )
}

export default ButtonFields;