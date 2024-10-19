import React, { useState } from 'react'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { MdLastPage } from "react-icons/md";
import { MdFirstPage } from "react-icons/md";



function ListItem({ data }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(data.length / postPerPage);

    const paginate = (page) => setCurrentPage(page);

    const getPaginationRange = () => {
        const pageNumbers = [];
        const totalVisiblePages = 3; // Number of visible pages before adding dots

        if (totalPages <= totalVisiblePages + 2) {
            // If the total number of pages is less than visible pages, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= totalVisiblePages) {
                for (let i = 1; i <= totalVisiblePages + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - totalVisiblePages) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - totalVisiblePages; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (

        <div className='mx-3'>
            <div className='flex justify-center items-center mt-4'>
               <h1 className='md:text-[25px] text-[26px] font-bold'>Pagination</h1>
               
            </div>
            <div className='flex justify-center items-center my-4 mx-1'>
                <ul className=''>
                    {currentPosts.map((item, id) => (
                        <li className='list-none  rounded-md bg-black text-sm text-white border-black py-2 my-2 px-2' key={id}>{item.id}. {item.title}</li>
                    ))}
                </ul>
            </div>

            {/* pagination */}
            <div className='mt-4 flex flex-row justify-center items-center '>
                <button onClick={() => paginate(1)} disabled={currentPage === 1} className='border-black border-2 rounded  md:p-2 md:mr-2 md:text-[18px] text-[16px] p-2 mr-1 hover:bg-black hover:text-white duration-200'><MdFirstPage /></button>
                <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} className='border-black rounded border-2 md:p-2 md:mr-2 p-2 mr-1 md:text-[16px] text-[13px]  hover:bg-black hover:text-white duration-200'><GrPrevious /></button>

                <div className='flex'>
                    {getPaginationRange().map((page, id) => (
                        <button
                            key={id}
                            onClick={() => typeof page === 'number' && paginate(page)}
                            className={currentPage === page ? 'bg-black text-white rounded border-black border-2 md:p-4 mr-1 md:h-7 md:w-7 p-4 h-1 w-1 md:text-[16px] text-[16px] flex justify-center items-center' : 'border-black border-2 flex justify-center items-center md:p-4 mr-1 md:h-7 md:w-7 p-4 h-1 w-1 rounded-full'}
                            disabled={typeof page !== 'number'}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)} className='border-black rounded  border-2 md:p-2 md:mr-2 p-2 mr-1 md:text-[16px] text-[13px]  hover:bg-black hover:text-white duration-200'><GrNext /></button>
                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className='border-black  rounded border-2 md:p-2 md:mr-2 p-2 mr-1  md:text-[18px] text-[16px] hover:bg-black hover:text-white duration-200'><MdLastPage /></button>
            </div>
        </div>
    )
}

export default ListItem;
