import React, { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';
import TableWithPagination from "../components/TablePage/TableComponent";
import SearchBar from "../components/TablePage/SearchBar";
import AddCustomerForm from "../components/TablePage/AddCustomerForm";
import HorizontalAccordion from "../wrappers/HorizontalAccordion";


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
        <div className="container"  >
            <div className="row">
                <div className="col-md-12 text-center">
                    <h1 >Customers</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4 col-sm-7">
                    <SearchBar onSearch={setSearchTerm} />
                </div>
            </div>
            <div className="row ">
                <div className="col-md-2 col-sm-12">
                        <HorizontalAccordion>
                            {(toggleForm) => (
                                <AddCustomerForm
                                    onClose={toggleForm}
                                    plans={plans}
                                    onAddCustomer={handleAddCustomer}
                                />)}
                        </HorizontalAccordion>
                </div>
                <div className="col-md-8 col-sm-12">
                    <TableWithPagination data={customers} searchTerm={searchTerm} />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8 col-sm-12 text-center">
                    <CSVLink
                        data={customers}
                        headers={headers}
                        filename="customer_data.csv"
                        className="btn btn-primary"
                    >
                        Download CSV
                    </CSVLink>
                </div>
            </div>




        </div>

    )


}
export default TablePage;





