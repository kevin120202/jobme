import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'

export default function Register() {
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>Register</h4>
                <FormRow type="text" name="name" defaultValue="kevin" />
                <FormRow type="text" name="lastname" defaultValue="delapaz" labelText="last name" />
                <FormRow type="text" name="location" defaultValue="chicago" />
                <FormRow type="email" name="email" defaultValue="kevindelapaz21@gmail.com" />
                <FormRow type="password" name="password" defaultValue="123" />
                <button type='submit' className='btn btn-block'>submit</button>
                <p>Already a member?
                    <Link to="/login" className='member-btn'>Login</Link>
                </p>
            </form>
        </Wrapper>
    )
}
