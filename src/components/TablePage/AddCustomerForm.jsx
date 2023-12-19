import React, { useState } from 'react';


// TODO: fix icons

const AddCustomerForm = ({ onAddCustomer, plans, onClose }) => {
    const [newCustomer, setNewCustomer] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        plan: "",
    });
   
    const handleSubmit = (event) => {
        event.preventDefault();

        // TODO: validatetionogic ?

        onAddCustomer(newCustomer);

        setNewCustomer({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            plan: "",
        });

        onClose();
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

        <div className="container">
        <div className="card bg-light">
          <div className="card-body mx-auto" style={{ maxWidth: '400px' }}>
            <h4 className="card-title mt-3 text-center">Register</h4>
            <form onSubmit={handleSubmit}>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input onChange={handleChange} name="firstName" className="form-control" placeholder="Full name" type="text" value={newCustomer.firstName} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input onChange={handleChange} name="lastName" className="form-control" placeholder="Last name" type="text" value={newCustomer.lastName} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input onChange={handleChange} name="email" className="form-control" placeholder="Email address" type="email" value={newCustomer.email} />
                        </div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                            </div>
                            <input onChange={handleChange} name="phone" className="form-control" placeholder="Phone number" type="phone" value={newCustomer.phone} />
                        </div>

                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                {/* <span className="input-group-text"> <FontAwesomeIcon icon="fa-solid fa-briefcase" /></span> */}
                            </div>
                            <select className="form-control" id='plan' name='plan' value={newCustomer.plan} onChange={handleChange}>
                                <option disabled  value=""> Select a plan</option> 
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