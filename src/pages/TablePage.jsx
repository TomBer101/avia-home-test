import React, { useState, useEffect } from "react";
import TableWithPagination from "../components/TablePage/TableComponent";
import SearchBar from "../components/TablePage/SearchBar";
import AddCustomerForm from "../components/TablePage/AddCustomerForm";
import HorizontalAccordion from "../wrappers/HorizontalAccordion";


const TablePage = () => {

    const [customers, setCustomers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const plans = ["All Plans", "care", "light", "connect", "home", "navigate"]

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
        <div className="container">
            <h1>Table Page</h1>
            <SearchBar onSearch={setSearchTerm} />
            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                <HorizontalAccordion>
                    {(toggleForm) => (
                        <AddCustomerForm
                        onClose={toggleForm}
                        plans={plans}
                        onAddCustomer={handleAddCustomer}
                    />)}
                </HorizontalAccordion>
                <TableWithPagination data={customers} searchTerm={searchTerm} />
            </div>

        </div>

    )


}
export default TablePage;

