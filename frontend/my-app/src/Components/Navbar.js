import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../Images/Logo.png";
import Cart from "../Images/Cart.png";
import Add from "../Images/Add.png";
import "./CSS/Navbar.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Navbar() {
    
    const [image, setImage] = useState();
    const [formValues, setFormValues] = useState({
        pname: "",
        pdescription: "",
        pquantity: 0,
        pprice: 0
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {            
            const response  = await fetch('http://localhost:3000/storeProduct',{
                method: "post",
                headers: { 'Content-Type': "application/json"},
                body : JSON.stringify({
                    "name" : formValues.pname,
                    "image": image,
                    "description": formValues.pdescription,
                    "quantity": formValues.pquantity,
                    "price": formValues.pprice
                })
            })
            
            toast.success("Product Added Successfully...", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
            setTimeout(() => window.location.href = "/product", 6000)
        } catch (error) {
            toast.error("Error! Product Not Added...", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };    
    
    const handleImageChange = async (event) => {
        const formData = new FormData();
        formData.append('pimage', event.target.files[0]);

        const response = await axios.post('http://localhost:3000/addProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        setImage(response.data);
    }

    return (
        <>
            <nav className="navbar bg-dark " >
                <div className="container-fluid">
                    <Link to="/product" className="navbar-brand">
                        <img src={Logo} alt="" width="70" height="25%" className="d-inline-block logo" />
                        <span className='text'> EProducts </span>
                    </Link>
                    <div className="d-flex">
                        <Link to="#" className="navbar-brand" data-bs-toggle="modal" data-bs-target="#addProduct">
                            <img src={Add} alt="" width="45" height="80%" className="d-inline-block align-text-top" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add Products" />
                        </Link>
                        <Link to="/cart" className="navbar-brand">
                            <img src={Cart} alt="" width="45" height="80%" className="d-inline-block align-text-top" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Add to Cart" />
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="modal fade" id="addProduct" tabIndex={-1} aria-labelledby="addProductLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <h5 className="modal-title" id="addProductLabel"> Add Product </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                setFormValues({
                                    pname: "",
                                    pdescription: "",
                                    pquantity: 0,
                                    pprice: 0,
                                });
                            }}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <label htmlFor="#pname"> Product Name: <span className='asetrik'>*</span> </label> &emsp;
                                <input
                                    type="text"
                                    name="pname"
                                    id="pname"
                                    value={formValues.pname}
                                    onChange={handleFormChange}
                                    required 
                                />
                                <br /> <br />
                                <label htmlFor="#pimage"> Product Image:<span className='asetrik'>*</span> </label> &emsp;
                                <input
                                    type="file"
                                    name="pimage"
                                    id="pimage"
                                    onChange={handleImageChange}
                                    required 
                                />
                                <br /> <br />
                                <label htmlFor="#pdescription"> Description:<span className='asetrik'>*</span> </label> &emsp;
                                <input
                                    type="text"
                                    name="pdescription"
                                    id="pdescription"
                                    value={formValues.pdescription}
                                    onChange={handleFormChange}
                                    required
                                    
                                />
                                <br /> <br />
                                <label htmlFor="#pquantity"> Quantity:<span className='asetrik'>*</span> </label> &emsp;
                                <input
                                    type="number"
                                    name="pquantity"
                                    id="pquantity"
                                    min="1"
                                    value={formValues.pquantity}
                                    onChange={handleFormChange}
                                    required
                                    
                                />
                                <br /> <br />
                                <label htmlFor="#pprice"> Price:<span className='asetrik'>*</span> </label> &emsp;
                                <input
                                    type="number"
                                    name="pprice"
                                    id="pprice"
                                    min="100"
                                    value={formValues.pprice}
                                    onChange={handleFormChange}
                                    required
                                />
                                <br /> <br />
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                > Add
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                                setFormValues({
                                    pname: "",
                                    pdescription: "",
                                    pquantity: 0,
                                    pprice: 0
                                });
                            }}
                            >Close</button>
                        </div>
                    </div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />                
            </div>
        </>
    )
}

export default Navbar
