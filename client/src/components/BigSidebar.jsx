import React from 'react'
import Wrapper from "../assets/wrappers/BigSidebar"
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useDashboardContext } from '../pages/DashboardLayout'

export default function BigSidebar() {
    const { showSidebar } = useDashboardContext()

    return (
        <Wrapper>
            <div className={showSidebar ? `sidebar-container` : "sidebar-container show-sidebar"}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSidebar />
                </div>
            </div>
        </Wrapper>
    )
}
