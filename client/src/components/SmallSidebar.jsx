import React from 'react'
import Wrapper from "../assets/wrappers/SmallSidebar"
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import NavLinks from './NavLinks';

export default function SmallSidebar() {
    const { showSidebar, toggleSidebar } = useDashboardContext()

    return (
        <Wrapper>
            <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ''}`}>
                <div className="content">
                    <button className="close-btn" type='button' onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    )
}
