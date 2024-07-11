import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import landing_logo from "../assets/images/landing-logo.svg"
import { Link } from 'react-router-dom'
import { Logo } from '../components'

export default function Landing() {
    return (
        <Wrapper>
            <nav>
                {/* <h2>JobMe</h2> */}
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>track your <span>Worries</span> away</h1>
                    <p>Finding and applying for jobs or internships can be overwhelming. That's where JobMe comes into play - a simple and efficient way to keep track of all your applications in one place.</p>
                    <Link to="/register" className='btn register-link'>Register</Link>
                    <Link to="/login" className='btn'>Login / Demo User</Link>
                </div>
                <img src={landing_logo} alt="job hunt" className='img main-img' />
            </div>
        </Wrapper>
    )
}

