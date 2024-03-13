import React, { useEffect, useState } from 'react'
import "./CSS/Products.css";
import "./CSS/Card.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {

    const [data, setData] = useState();

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const response = await fetch("http://localhost:3000/getProduct", {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json();
        setData(data);
    }

    const handleAddCart = async (id, quantity) => {
        const response = await fetch("http://localhost:3000/addCart", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId: id,
                quantity: quantity
            })
        })

        if (response) {
            getData();
            toast.success("Product Added to Cart...", {
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
        else {
            toast.error("Error! Product Not Add in Cart...", {
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
            <h1 className='title'> GET YOUR DREAM PRODUCTS </h1>
            <div className="container">
                {data
                    ? data.map((item, index) => {
                        {
                            if (item.quantity > 0) {
                                return (
                                    <div className="card">
                                        <div className="imgBx">
                                            {item.image ? (
                                                <img
                                                    src={require(`../../../../backend/Images/${item.image}`)}
                                                    key={item.image} width={150} height={170}
                                                    alt="not fetched"
                                                />
                                            ) : (
                                                ""
                                            )
                                            }
                                        </div>
                                        <div className="contentBx">
                                            <h2> {item.name} </h2> <br />
                                            <div className="size">
                                                <h3 style={{ "fontWeight": "300" }}> {item.description} </h3> <br /> <br />
                                            </div>
                                            <div className="color">
                                                <h3>Quantity: <span> {item.quantity} </span> </h3>
                                            </div>
                                            <div className="color">
                                                <h3>Price: <span> {item.price} &#8377;</span> </h3>
                                            </div> <br />
                                            <button className='btn btn-primary' onClick={() => handleAddCart(item._id, item.quantity)}> Add to Cart </button>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    }) : ""
                }
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

export default Product
