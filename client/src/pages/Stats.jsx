import React from 'react'
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { ChartsContainer, StatsContainer } from '../components';

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/jobs/stats")
        return data
    } catch (error) {
        console.log(error);
        return error
    }
}

export default function Stats() {
    const { defaultStats, monthlyApps } = useLoaderData()

    console.log(monthlyApps);

    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            {monthlyApps.length > 1 && <ChartsContainer data={monthlyApps} />}
        </>
    )
}
