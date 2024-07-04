import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from '../components'

export default function Login() {
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>login</h4>
                <FormRow type="email" name="email" defaultValue="kevin@gmail.com" />
                <FormRow type="password" name="password" defaultValue="123" />
                <button type="submit" className='btn btn-block'>submit</button>
                <button type="button" className='btn btn-block'>demo</button>
                <p>
                    Not a member?
                    <Link to="/register" className='member-btn'> Register</Link>
                </p>
            </form>
        </Wrapper>
    )
}
