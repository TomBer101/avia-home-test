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

    const headers = [
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Email", key: "email" },
        {label: "Phone", key: "phone"},
        {label: "Plan", key: "plan"}
      ];

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
        </div>

    )


}
export default TablePage;





