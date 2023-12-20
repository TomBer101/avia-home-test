import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileArrowDown} from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from 'react-csv';

import '../../styles/components/Table.css'

const TableWithPagination = ({ customers, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);

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



    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePlanChange = (event) => {
        setCurrentPage(1);
        setFilteredPlan(event.target.value);
    };

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
                    {currentItems.map((item, index) => (
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
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(filteredCustomers.length / itemsPerPage) }).map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
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
