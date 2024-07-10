import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'

export const action = async ({ params }) => {
    try {
        await customFetch.delete(`/jobs/${params.id}`)
        toast.success("job deleted")
        return redirect("/dashboard/all-jobs")
    } catch (error) {
        toast.error(error.response.data.message)
    }
    return redirect("/dashboard/all-jobs")
}

