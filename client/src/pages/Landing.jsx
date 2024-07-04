import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import logo_lp from "../assets/images/logo-lp.svg"
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
                    <p>Finding and applying for jobs or internships can be overwhelming. That's wher JobMe comes into play - a simple, efficient way to keep track of all your applications in one place. Say goodbye to the stress of remembering deadlines, follow-ups, and application statuses.</p>
                    <Link to="/register" className='btn register-link'>Register</Link>
                    <Link to="/login" className='btn'>Login / Demo User</Link>
                </div>
                <img src={logo_lp} alt="job hunt" className='img main-img' />
            </div>
        </Wrapper>
    )
}

