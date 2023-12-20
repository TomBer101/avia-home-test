import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileArrowDown} from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from 'react-csv';

import '../../styles/components/Table.css'

const TableWithPagination = ({ customers, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);

    const totalButtons = 5; 
    const plans = ["All Plans", "care", "light", "connect", "home", "navigate"]
    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" },
        {label: "Phone", key: "phone"},
        {label: "Plan", key: "plan"}
      ];
    const [filteredPlan, setFilteredPlan] = useState(plans[0]);

    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    
    const filterByPlan = (customer) => {
        if (filteredPlan === plans[0]) return true;
        return customer.plan === filteredPlan;
    }

    const filterBySearchTerm = (customer, normalizedSearchTerm) => {
        if (normalizedSearchTerm === '') return true;
        const fullName = `${customer.firstname} ${customer.lastname}`.toLowerCase();
        return fullName.includes(normalizedSearchTerm) || customer.phone.replace('-', '').includes(normalizedSearchTerm);
    };

    const filteredCustomers = useMemo(() => {
        return customers
            .filter(customer => filterByPlan(customer))
            .filter(customer => filterBySearchTerm(customer, searchTerm));
    }, [customers.length, filterByPlan, searchTerm]);

    let lastPage =Math.ceil(filteredCustomers.length / itemsPerPage);


    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if(currentPage === pageNumber) return;
        setPrevPage(currentPage);
        setCurrentPage(pageNumber);
    }

    const handlePlanChange = (event) => {
        setCurrentPage(1);
        setFilteredPlan(event.target.value);
    };

    // Pagination Calcultaions
    const [buttonsPerPage, setButtonsPerPage] = useState(5);
    useEffect(() => {
        const handleResize = () => {
          // Adjust the number of buttons based on window width
          const newButtonsPerPage = Math.floor(window.innerWidth / 100); // You can adjust the factor as needed
          setButtonsPerPage(newButtonsPerPage);
        };
    
        // Initial setup and subscribe to window resize event
        handleResize();
        window.addEventListener('resize', handleResize);
    
        // Cleanup on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

       // Calculate visible page numbers based on current page and total pages
    // const visiblePages =
    //     Array.from({ length: buttonsPerPage }, (_, index) => currentPage - Math.floor(buttonsPerPage / 2) + index)
    //     .filter(pageNumber => pageNumber > 0 && pageNumber <= Math.ceil(filteredCustomers.length / itemsPerPage));

      
    // ---------------------------

    const calculateVisiblePages = () => {
        let startPage, endPage;
    
        // If the total pages are less than or equal to totalButtons, show all pages
        if (lastPage <= totalButtons) {
          startPage = 1;
          endPage = lastPage;
        } else {
          // Calculate left and right sibling index and make sure they are within range 1 and lastPage
          const leftSiblingIndex = Math.max(currentPage - Math.floor(totalButtons / 2), 1);
          const rightSiblingIndex = Math.min(currentPage + Math.floor(totalButtons / 2), lastPage);
    
          // Adjust start and end pages based on sibling indexes
          startPage = Math.max(rightSiblingIndex - totalButtons + 1, 1);
          endPage = Math.min(startPage + totalButtons - 1, lastPage);
        }
    
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
      };
    
      const visiblePages = calculateVisiblePages();

    return (
        <div className='container' >

            <table className="table" >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>
                            <select id="planFilter" value={filteredPlan} onChange={handlePlanChange} style={{ fontWeight: "bold" }}>
                                {plans.map((plan, index) => {
                                    return (<option key={index} value={plan}  >{plan}</option>);
                                })}

                            </select></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 && currentItems.map((item, index) => (
                        <tr key={index} style={{ height: '42px' }}>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.plan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className='button-container'>
                {visiblePages.length > 0 && 
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(1)}>
                                &lt;&lt;
                            </button>
                        </li>
                        {visiblePages.map((pageNumber) => (
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(pageNumber)}>
                                    {pageNumber}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(lastPage)}>
                                &gt;&gt;
                            </button>
                        </li>
                    </ul>
                </nav>}
                <CSVLink
                    data={customers}
                    headers={headers}
                    filename="customers_data.csv"
                    className="btn btn-primary"
                >
                    <span>
                        Download as CSV
                    </span>
                    <FontAwesomeIcon icon={faFileArrowDown} />
                </CSVLink>
            </div>
        </div>
    );
};

export default TableWithPagination;
