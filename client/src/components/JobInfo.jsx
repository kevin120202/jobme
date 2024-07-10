import React from 'react'
import Wrapper from '../assets/wrappers/JobInfo'

export default function JobInfo({ icon, text }) {
    return (
        <Wrapper>
            <span className='job-icon'>{icon}</span>
            <span className='job-text'>{text}</span>
        </Wrapper>
    )
}
