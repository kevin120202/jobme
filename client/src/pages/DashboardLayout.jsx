import React, { createContext, useContext, useState } from 'react'
import { Outlet, useLoaderData, redirect, useNavigate, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import SmallSidebar from '../components/SmallSidebar'
import BigSidebar from '../components/BigSidebar'
import Navbar from '../components/Navbar'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from "react-toastify"
import { Loading } from '../components'

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/users/current-user")
        return data
    } catch (error) {
        return redirect("/")
    }
}

const DashboardContext = createContext()

export default function DashboardLayout() {
    const { user } = useLoaderData()
    const navigate = useNavigate()
    const navigation = useNavigation()
    const isLoading = navigation.state === "loading"
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme
        setIsDarkTheme(newDarkTheme)
        document.body.classList.toggle("dark-theme", newDarkTheme)
        localStorage.setItem("darkTheme", newDarkTheme)
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    const logoutUser = async () => {
        navigate("/")
        await customFetch.get("/auth/logout")
        toast.success("Logging out")
    }

    return (
        <DashboardContext.Provider value={{ user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser }}>
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            {isLoading ? <Loading /> : <Outlet context={{ user }} />}
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>

    )
}

export const useDashboardContext = () => useContext(DashboardContext)