import React from "react";

import "./Post.css";

const post = (props) => {
  return (
    <div className="post">
      <div className="introduce-user">
        <i className="fas fa-user fa-2x" />
        <div className="name-date">
          <span>{props.name}</span>
          <span className="date">{props.date}</span>
        </div>
      </div>
      <div className="content-post">{props.content}</div>
      <img src={props.image} />
    </div>
  );
};

export default post;
