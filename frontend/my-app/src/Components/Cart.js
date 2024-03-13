import React, { useEffect, useState } from 'react'
import "./CSS/Card.css";
import "./CSS/Products.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {

    const [data, setData] = useState();
    const [productId, setProductId] = useState();
    const [formValues, setFormValues] = useState({
        pqty: 0
    });

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const response = await fetch("http://localhost:3000/getCart", {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })

        setData(await response.json());
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeQty = (productId) => {
        setProductId(productId);
    }

    const handleFormSubmit = async (event) => {
        try {
            const response = await fetch('http://localhost:3000/updateCart', {
                method: "put",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({
                    "productId": productId,
                    "quantity": formValues.pqty
                })
            })

            if(response.status == 401){
                toast.info("Quantity Out of Stock...", {
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
            else{
                toast.success("Quantity Changed Successfully...", {
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

            setTimeout(() => window.location.href = "/cart", 6000);

        } catch (error) {
            console.error('Error in adding Product:', error);
            toast.error("Error in Quantity Changed...", {
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
    }

    return (
        <div>
            <h1 className='title'> WELCOME TO YOUR WHISHLIST MENU </h1>
            <div className="container">
                {data
                    ? data.map((item, index) => {
                        {
                            if (item.quantity > 0) {
                                return (
                                    <div className="card">
                                        <div className="imgBx">
                                            {item.productId.image ? (
                                                <img
                                                    src={require(`../../../../backend/Images/${item.productId.image}`)}
                                                    key={item.productId.image} width={150} height={170}
                                                    alt="not fetched"
                                                />
                                            ) : (
                                                ""
                                            )
                                            }
                                        </div>
                                        <div className="contentBx">
                                            <h2> {item.productId.name} </h2> <br />
                                            <div className="size">
                                                <h3 style={{ "fontWeight": "300" }}> {item.productId.description} </h3> <br /> <br />
                                            </div>
                                            <div className="color">
                                                <h3>Quantity: <span> {item.quantity} </span> </h3>
                                            </div>
                                            <div className="color">
                                                <h3>Price: <span> {item.productId.price} &#8377;</span> </h3>
                                            </div> <br />
                                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#changeQty" onClick={() => handleChangeQty(item.productId)}> Change in Qty </button>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    }) : ""
                }
            </div>

            <div className="modal fade" id="changeQty" tabIndex={-1} aria-labelledby="changeQtyLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-info">
                            <h5 className="modal-title" id="addProductLabel"> Select Quantity </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                setFormValues({
                                    pqty: 0
                                });
                            }}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <label htmlFor="#pqty"> Select Qty: <span className='asetrik'>*</span> </label> &emsp;
                                <input
                                    type="number"
                                    name="pqty"
                                    id="pqty"
                                    min="1"
                                    value={formValues.pqty}
                                    onChange={handleFormChange}
                                    required
                                />
                                <br /> <br />

                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                > Update
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                                setFormValues({
                                    pqty: 0
                                });
                            }}
                            >Close</button>
                        </div>
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
    )
}

export default Cart
