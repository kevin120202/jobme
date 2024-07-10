import React from 'react'
import { Link, Form, redirect, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { FormRow, Logo } from '../components'

export const action = async (data) => {
    console.log(data);
    return null
}

export default function Register() {
    return (
        <Wrapper>
            <Form method="POST" className='form'>
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
            </Form>
        </Wrapper>
    )
}
