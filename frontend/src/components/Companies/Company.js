import React from 'react'
import {Link} from 'react-router-dom'

const Company = (props) => {
    return (
        <Link to={`/companypage/${props.id}`}>
            <div key={props.id}>
                <img
                    src={props.url}
                    alt={props.title}
                    width="150px" height ="150px"
                />
                <h2>{props.title}</h2>
            </div>
        </Link>
    )
}

export default Company;
