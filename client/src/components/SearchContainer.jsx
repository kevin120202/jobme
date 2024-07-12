import React from 'react'
import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

export default function SearchContainer() {
    const { searchValues } = useAllJobsContext()
    const submit = useSubmit()

    const debounce = (onChange) => {
        let timeout
        return (e) => {
            const form = e.currentTarget.form
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                onChange(form)
            }, 1000)
        }
    }

    return (
        <Wrapper>
            <Form className='form'>
                <h5 className="form-title">search form</h5>
                <div className="form-center">
                    <FormRow type="search" name="search" defaultValue={searchValues.search} onChange={debounce((form) => {
                        submit(form)
                    })} />
                    <FormRowSelect labelText='job status' name="jobStatus" list={['all', ...Object.values(JOB_STATUS)]} defaultValue={searchValues.jobStatus} onChange={(e) => { submit(e.currentTarget.form) }} />
                    <FormRowSelect labelText='job type' name="jobType" list={['all', ...Object.values(JOB_TYPE)]} defaultValue={searchValues.jobType} onChange={(e) => { submit(e.currentTarget.form) }} />
                    <FormRowSelect name={searchValues.sort} list={[...Object.values(JOB_SORT_BY)]} defaultValue='newest' onChange={(e) => { submit(e.currentTarget.form) }} />
                    <Link to="/dashboard/all-jobs" className='btn form-btn delete-btn'>Reset values</Link>
                </div>
            </Form>
        </Wrapper>
    )
}
