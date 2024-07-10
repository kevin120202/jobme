import React from 'react'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'

export default function JobsContainer() {
    const { data } = useAllJobsContext()
    const { jobs } = data
    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>Go apply for jobs...</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div className="jobs">
                {jobs.map(job => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
        </Wrapper>
    )
}
