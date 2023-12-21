import React, { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';
import TableWithPagination from "../components/TablePage/TableComponent";
import SearchBar from "../components/TablePage/SearchBar";
import AddCustomerForm from "../components/TablePage/AddCustomerForm";
import HorizontalAccordion from "../wrappers/HorizontalAccordion";
import "../styles/components/TablePage.css";

const TablePage = () => {

    const [customers, setCustomers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const plans = [ "care", "light", "connect", "home", "navigate"]

    useEffect(() => {
        fetch('customers.json')
            .then((response) => response.json())
            .then((jsonData) => setCustomers(jsonData))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
    }



    return (
        <div className="container-fluid table-page" >
            <div className="row">
                <div className="col page-title-container">
                    <h1 className="page-title">Customers</h1>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-sm-6 col-sm-4 col-md-4 offset-sm-3 col-xs-3 offset-md-4 mb-2">
                    <SearchBar onSearch={setSearchTerm} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-8  offset-md-2 offset-sm-2 col-sm-10  ">
                    <TableWithPagination customers={customers} searchTerm={searchTerm} />
                </div>
            </div>
            <HorizontalAccordion closedTitle={'Add Customer'} openedTitle={"Cancel"}>
                {(toggleForm) => (
                    <AddCustomerForm
                        onClose={toggleForm}
                        plans={plans}
                        onAddCustomer={handleAddCustomer}
                    />)}
            </HorizontalAccordion>
        </div>

    )


}
export default TablePage;





