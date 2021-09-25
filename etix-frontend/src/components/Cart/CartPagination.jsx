import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export const CartPagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    var pageNum = 0;

    for(let i=1; i<= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
        pageNum += 1;
    }
    
    return (
        <div>
            <ul className="pagination mx-auto justify-content-center" >
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a href='!#' onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
                
            </ul>        
        </div>
    )
}
