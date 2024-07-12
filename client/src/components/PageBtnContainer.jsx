import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

export default function PageBtnContainer() {
    const { data: { numOfPages, currentPage } } = useAllJobsContext()
    const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

    const { search, pathname } = useLocation()
    const navigate = useNavigate()

    const handlePageChange = (pageNum) => {
        const searchParams = new URLSearchParams(search)
        searchParams.set('page', pageNum)
        navigate(`${pathname}?${searchParams.toString()}`)
    }

    return (
        <Wrapper>
            <button className="btn prev-btn" onClick={() => {
                let prevPage = currentPage - 1
                if (prevPage < 1) prevPage = numOfPages
                handlePageChange(prevPage)
            }}>
                <HiChevronDoubleLeft />prev
            </button>
            <div className="btn-container">
                {pages.map(pageNum => {
                    return <button key={pageNum} className={`btn page-btn ${currentPage === pageNum && 'active'}`} onClick={() => handlePageChange(pageNum)}>
                        {pageNum}
                    </button>
                })}
            </div>
            <button className="btn next-btn" onClick={() => {
                let nextPage = currentPage + 1
                if (nextPage > numOfPages) nextPage = 1
                handlePageChange(nextPage)
            }}>
                next<HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}
