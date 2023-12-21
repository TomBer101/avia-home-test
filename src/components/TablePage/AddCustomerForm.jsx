import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faPhone, faBriefcase } from '@fortawesome/free-solid-svg-icons'



const AddCustomerForm = ({ onAddCustomer, plans, onClose }) => {
    const [newCustomer, setNewCustomer] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        plan: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();


        onAddCustomer(newCustomer);
        onClose();
        setNewCustomer({
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            plan: "",
        });

        
        alert("Client added successfully :)");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNewCustomer((prevCustomer) => {
            return {
                ...prevCustomer,
                [name]: value
            };
        });
    };

    return (

        <div className="container" >
            <div className="card bg-light">
                <div className="card-body mx-auto" style={{ maxWidth: '400px' }}>
                    <h4 className="card-title mt-3 text-center">Register</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <FontAwesomeIcon icon={faUser} /> </span>
                            </div>
                            <input
                                onChange={handleChange}
                                name="firstname"
                                className="form-control"
                                placeholder="First name"
                                type="text"
                                value={newCustomer.firstname}
                                required
                            />
                        </div>

                        <div className="form-group mb-3 input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <FontAwesomeIcon icon={faUser} /> </span>
                            </div>
                            <input
                                onChange={handleChange}
                                name="lastname"
                                className="form-control"
                                placeholder="Last name"
                                type="text"
                                value={newCustomer.lastname} 
                                required
                            />
                        </div>

                        <div className="form-group mb-3 input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <FontAwesomeIcon icon={faEnvelope} /> </span>
                            </div>
                            <input
                                onChange={handleChange}
                                name="email"
                                className="form-control"
                                placeholder="Email address"
                                type="email"
                                value={newCustomer.email} required />
                        </div>
                        <div className="form-group mb-3 input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <FontAwesomeIcon icon={faPhone} /> </span>
                            </div>
                            <input
                                onChange={handleChange}
                                name="phone"
                                className="form-control"
                                placeholder="Phone number"
                                type="phone"
                                value={newCustomer.phone} required />
                        </div>

                        <div className="form-group mb-3 input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <FontAwesomeIcon icon={faBriefcase} /></span>
                            </div>
                            <select className="form-control" id='plan' name='plan' value={newCustomer.plan} onChange={handleChange} required>
                                <option disabled value=""> Select a plan</option>
                                {plans.map(plan => {
                                    return (
                                        <option key={plan} value={plan}>{plan}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Register!  </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    );

};

export default AddCustomerForm;