import React, { useState, useEffect } from 'react';

const TableWithPagination = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPlan, setFilteredPlan] = useState('');
    const plans = ["All Plans", "care", "light", "connect", "home", "navigate"]


    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredCustomers = filteredPlan != plans[0] ? data.filter((customer) => customer.plan === filteredPlan) : data;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePlanChange = (event) => {
        setCurrentPage(1);
        setFilteredPlan(event.target.value);
    };



    return (
        <div>

            <div style={{height : '250px'}} className='mb-3'>
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


            </div>
            <div>
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
            </div>
            </div>
    );
};

export default TableWithPagination;
