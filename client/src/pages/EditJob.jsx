import React from 'react'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { FormRow, FormRowSelect } from '../components'
import { useLoaderData, useParams } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { Form, useNavigation, redirect } from "react-router-dom"
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`)
        const { job } = data
        return job
    } catch (error) {
        toast.error(error.response.data.message)
        return redirect("/dashboard/all-jobs")
    }

}

export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.patch(`/jobs/${params.id}`, data)
        toast.success("job edited")
        return redirect("/dashboard/all-jobs")
    } catch (error) {
        toast.error(error.response.data.message)
        return error
    }
}



export default function EditJob() {
    const job = useLoaderData()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const params = useParams()

    return (
        <Wrapper>
            <Form method="POST" className='form'>
                <h4 className="form-title">edit job</h4>
                <div className="form-center">
                    <FormRow type="text" name='position' defaultValue={job.position} />
                    <FormRow type="text" name='company' defaultValue={job.company} />
                    <FormRow type="text" name='jobLocation' labelText='location' defaultValue={job.jobLocation} />
                    <FormRowSelect name="jobStatus" labelText="job status" list={Object.values(JOB_STATUS)} defaultValue={job.jobStatus} />
                    <FormRowSelect name="jobType" labelText="job type" list={Object.values(JOB_TYPE)} defaultValue={job.jobType} />
                    <button type="submit" className='btn btn-block form-btn' disabled={isSubmitting}>{isSubmitting ? "submitting" : "submit"}</button>
                </div>
            </Form>
        </Wrapper>
    )
}
