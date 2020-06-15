import React, { useMemo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const error = {
  color: "red",
  textAlign: "center"
};

const UploadImages = props => {
  const [files, setFiles] = useState([]);
  const [fileChecked, setFileChecked] = useState([]);
  const {
    acceptedFiles,
    open,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    disabled: files.length > 4 ? true : false,
    noClick: true, // user unable to click
    onDrop: acceptedFiles => {
      const tempArray = _.cloneDeep(files);
      acceptedFiles.map(file => {
        tempArray.push({
          name: file.name,
          size: file.size,
          path: file.path,
          type: file.type,
          lastModified: file.lastModified,
          preview: URL.createObjectURL(file)
        })}
      );
      setFiles(tempArray);
    }
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const handleCheck = (e, file) => {
    const fileArray = _.cloneDeep(fileChecked);
    if (e.target.checked) {
      fileArray.push(file);
    } else {
      fileArray.splice(fileArray.indexOf(file), 1);
    }
    setFileChecked(fileArray);
  };

  const callback=(base64)=>{
    // get base 64 value
    console.log('base64', base64);
  }
  const onSubmit = () => {
    const { address, bathroom, bedroom, description } = props.formData; 
    toDatatURL(fileChecked[0].preview, callback);
    console.log('to get field value', address, bathroom, bedroom, description);
  }

  const toDatatURL = (src, callback)=> {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
      var fileReader = new FileReader();
      fileReader.onloadend = () => {
        callback( fileReader.result);
      };
      fileReader.readAsDataURL(xhttp.response);
    };
    xhttp.responseType = 'blob';
    xhttp.open('GET',src,true);
    xhttp.send();
  }

  const thumbs =
    files.length > 4 ? (
      <div>
        {isDragReject} <p style={error}>You can not drag more than 4 files</p>{" "}
      </div>
    ) : (
      files.map(file => (
        <React.Fragment key={file.name}>
          <div className="input-group mb-4 flex">
            <div>
              <div className="input-group-text">
                <input
                  type="checkbox"
                  style={{ padding: "10px" }}
                  onChange={e => handleCheck(e, file)}
                />
                <div style={thumb}>
                  <div style={thumbInner}>
                    <img src={file.preview} style={img} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))
    );

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <button
        className="btn btn-secondary btn-md"
        disabled={
          fileChecked.length === 0 || fileChecked.length > 1 ? true : false
        }
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default UploadImages;