import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const NavigationItems = (props) => {
    return (
        <div className="navigation-items">
            <NavigationItem name="Home" icon="fas fa-home fa-2x" link="/"/>
            <NavigationItem name="Jobs" icon="fas fa-briefcase fa-2x" link="/jobs"/>
            <NavigationItem name="Notifications" icon="fas fa-bell fa-2x" link="/notifications"/>
            <NavigationItem name="Sign In" icon="fas fa-user fa-2x" link="/signin"/>
            <NavigationItem name="Log Out" icon="fas fa-sign-out-alt fa-2x" link="/signout"/>
        </div>
    )
}

export default NavigationItems;