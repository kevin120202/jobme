import React, { createContext, useContext } from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { JobsContainer, SearchContainer } from '../components'

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/jobs")
        return { data }
    } catch (error) {
        return redirect("/")
    }
}

const AllJobsContext = createContext()

export default function AllJobs() {
    const { data } = useLoaderData()

    return (
        <AllJobsContext.Provider value={{ data }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    )
}

export const useAllJobsContext = () => useContext(AllJobsContext)