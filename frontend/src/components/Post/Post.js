import React, { useState, useEffect } from "react";

import "./Post.css";
import Aux from "../../hoc/Auxiliary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const Post = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [date, setDate] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
   console.log(name);
   console.log(date);
    return () => {
      
    };
  }, [name,address,date,image]);

  return (
    <Aux>
      <Backdrop show={props.show} click={props.click} />
      <form className="form">
        <h2>COMPANY INFORMATION</h2>
        <input
          type="text"
          placeholder="Company Name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          onChange={(event) => setDate(event.target.vaule)}
        />
        <label htmlFor="upload-photo">Upload your company image...</label>
        <input
          id="upload-photo"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
        />
        <textarea className="txt-introduce" placeholder="Introduce about your company..." />
        <button className="btn-post">POST</button>
      </form>
    </Aux>
  );
};

export default Post;
