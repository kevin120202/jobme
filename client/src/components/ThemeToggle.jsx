import React from 'react'
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs"
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboardContext } from '../pages/DashboardLayout'

export default function ThemeToggle() {
    const { isDarkTheme, toggleDarkTheme } = useDashboardContext()

    return (
        <Wrapper onClick={toggleDarkTheme}>
            {isDarkTheme ? <BsFillSunFill className="toggle-icon" /> : <BsFillMoonFill />}
        </Wrapper>
    )
}
