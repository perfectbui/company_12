import React from 'react'

import './Info.css'

const Info = (props) => {
    return (
        <div className="info-container">
            <h1>{props.company_title}</h1>
            <div className="tab">
                <button className="tablinks" onClick={(e) => openInfo(e, 'posts')}>Posts</button>
                <button className="tablinks" onClick={(e) => openInfo(e, 'about')}>About</button>
            </div>
            <div id="post"></div>
            <div id="about" className="tabcontent">
                <ul type="none">
                    <li>{props.email}</li>
                    <li>{props.phone}</li>
                    <li>{props.website}</li>
                    <li>{props.phrase}</li>
                </ul>
            </div>
        </div>
    )
}

function openInfo(e, info_name) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(info_name).style.display = "block";
    e.currentTarget.className += " active";
} 

export default Info;
