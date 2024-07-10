import React from 'react'
import logo from "../assets/images/jobme-logo.png"


export default function Logo() {
    return (
        <img src={logo} alt="logo" className='logo' style={
            {
                width: "160px", marginTop: "20px"
            }
        } />
    )
}
