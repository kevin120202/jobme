import React from 'react'
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData()
    const file = formData.get("avatar")
    if (file && file.size > 500000) {
        toast.error("image size too large")
        return null
    }

    try {
        await customFetch.patch("/users/update-user", formData)
        toast.success("profile updated")
    } catch (error) {
        toast.error(error.response.data.message)
    }
    return null
}

export default function Profile() {
    const { user } = useOutletContext()
    const { name, lastName, email, location } = user
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'


    return (
        <Wrapper>
            <Form method="post" className='form' encType='multipart/form-data'>
                <h4 className="form-title">profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">
                            Select an image file (max 0.5MB)
                        </label>
                        <input type="file" id='avatar' name='avatar' className='form-input' accept='image/*' />
                    </div>
                    <FormRow type="text" name="name" defaultValue={name} />
                    <FormRow type="text" name="lastName" labelText="last name" defaultValue={lastName} />
                    <FormRow type="email" name="email" defaultValue={email} />
                    <FormRow type="text" name="location" defaultValue={location} />
                    <button type="submit" className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting ? "submitting" : "submit"}</button>
                </div>
            </Form>
        </Wrapper>
    )
}
