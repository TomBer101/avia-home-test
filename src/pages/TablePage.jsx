import React, { useState, useEffect } from "react";
import TableComponent from '../components/TablePage/TableComponent'
import TableWithPagination from "../components/TablePage/TableComponent";
import SearchBar from "../components/TablePage/SearchBar";
import AddCustomerForm from "../components/TablePage/AddCustomerForm";



const TablePage = () => {

    const [customers, setCustomers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const plans = ["All Plans", "care", "light", "connect", "home", "navigate"]

    useEffect(() => {
        fetch('customers.json')
            .then((response) => response.json())
            .then((jsonData) => setCustomers(jsonData))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleAddCustomer = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
    }

    return (
        <div className="container">
            <h1>Table Page</h1>
            <SearchBar />
            <TableWithPagination data={customers} />
            <div>
                <button className="btn btn-primary" onClick={handleToggleForm}>
                    Toggle Form
                </button>

                {isFormVisible && <AddCustomerForm 
                    onClose={handleToggleForm} 
                    plans={plans} 
                    onAddCustomer={handleAddCustomer} 
                />}
            </div>

        </div>

    )


}
export default TablePage;

