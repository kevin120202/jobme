import React from 'react'
import { Link, redirect, Form, useNavigation } from 'react-router-dom'
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { FormRow, Logo } from '../components'
import customFetch from '../utils/customFetch.js'
import { toast } from "react-toastify"

export const action = async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post("/auth/login", data)
        toast.success("Login successful")
        return redirect("/dashboard")
    } catch (error) {
        toast.error(error.response.data.message)
        return error
    }
}

export default function Login() {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    return (
        <Wrapper>
            <Form method="post" className='form'>
                <Logo />
                <h4>login</h4>
                <FormRow type="email" name="email" defaultValue="kevin@gmail.com" />
                <FormRow type="password" name="password" defaultValue="123" />
                <button type="submit" className='btn btn-block' disabled={isSubmitting}>{isSubmitting ? "submitting" : "submit"}</button>
                <button type="button" className='btn btn-block'>demo</button>
                <p>
                    Not a member?
                    <Link to="/register" className='member-btn'> Register</Link>
                </p>
            </Form>
        </Wrapper>
    )
}
