import React from 'react'

import './Post.css'
import Aux from '../../hoc/Auxiliary'
import Backdrop from '../../components/UI/Backdrop/Backdrop'

const Post = (props) => {
    return (
        <Aux>
        <Backdrop show={props.show} click={props.click}/>
        <form className="form">
           <h2>COMPANY INFORMATION</h2>
           <input type="text" placeholder="Company Name"/>
           <input type="text" placeholder="Address"/>
           <input type="date" placeholder="Date"/>
           <label htmlFor="upload-photo">Upload your company image...</label>
           <input id="upload-photo" style={{display:"none"}} type="file" accept="image/*"/>
           <textarea placeholder="Introduce about your company..."/>
           <button>POST</button>
        </form>
        </Aux>
    )
}

export default Post;