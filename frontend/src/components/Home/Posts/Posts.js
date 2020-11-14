import React from 'react'

import Post from './Post/Post'
import './Posts.css'

const Posts = (props) => {
    return (
        <div className="posts">
            {props.posts ? props.posts.map(post => <Post name={post.name} date={post.date} image={post.image} content={post.content}/>):null}
        </div>
    )
}

export default Posts;