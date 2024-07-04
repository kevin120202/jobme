import React, { useState } from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/LogoutContainer'
import { useDashboardContext } from '../pages/DashboardLayout'

export default function LogoutContainer() {
    const [showLogout, setShowLogout] = useState(false)
    const { user, logoutUser } = useDashboardContext()

    return (
        <Wrapper>
            <button className="btn logout-btn" onClick={() => setShowLogout(!showLogout)}>
                <FaUserCircle />
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                <button className="dropdown-btn" onClick={logoutUser}>
                    logout
                </button>
            </div>
        </Wrapper>
    )
}
