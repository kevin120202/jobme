import React from 'react'
import Wrapper from "../assets/wrappers/SmallSidebar"
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import links from '../utils/Links';
import { NavLink } from 'react-router-dom';

export default function SmallSidebar() {
    const data = useDashboardContext()

    return (
        <Wrapper>
            <div className="sidebar-container show-sidebar">
                <div className="content">
                    <button className="close-btn" type='button'>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <div className="nav-links">
                        {links.map(link => {
                            const { text, path, icon } = link
                            return (
                                <NavLink to={path} key={text} className="nav-link">
                                    <span className='icon'>
                                        {icon}
                                    </span>
                                    {text}
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
