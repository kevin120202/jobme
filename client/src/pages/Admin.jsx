import React from 'react'
import customFetch from '../utils/customFetch'
import Wrapper from '../assets/wrappers/StatsContainer'
import { redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
import { StatItem } from '../components'

export const loader = async () => {
    try {
        const res = await customFetch.get("/users/admin/app-stats")
        return res.data
    } catch (error) {
        toast.error("you are not authorized to view this page")
        return redirect("/dashboard")
    }
}

export default function Admin() {
    const { users, jobs } = useLoaderData()
    return (
        <Wrapper>
            <StatItem title="current users" count={users} color="#9e8039" bcg="#fcefc7" icon={<FaSuitcaseRolling />} />
            <StatItem title="total jobs" count={jobs} color="#647acb" bcg="#e0e8f9" icon={<FaCalendarCheck />} />
        </Wrapper>
    )
}
