import { useRef, useState } from 'react';
import { Link } from 'react-router-dom'

import * as API from '../services/product.service'

import { AiFillCloseSquare } from 'react-icons/ai'
import Swal from 'sweetalert2';
import './styles/CreateProduct.scss';

function CraeteProduct({ handleClose, handleReload }) {
    const modalRef = useRef(null);

    const [image, setImage] = useState(null);
    const [formProduct, setFormProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: ""
    });
    const closeWithAnimation = () => {
        if (modalRef.current) {
            modalRef.current.classList.add("closing");
            handleReload();
            setTimeout(() => {
                modalRef.current.classList.remove("closing");
                handleClose();
            }, 300);
        }
    };

    const handleChange = (e) => {
        setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
    }

    const handleSubmitProduct = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('name', formProduct.name);
            formData.append('description', formProduct.description);
            formData.append('price', formProduct.price);
            formData.append('quantity', formProduct.quantity);
            formData.append('images', image);

            await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#38761d',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, create it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await API.createProduct(formData)
                        .then(async (response) => {
                            await Swal.fire(
                                'Created!',
                                `${response.data?.message}`,
                                'success'
                            )
                        }).catch(err => {
                            Swal.fire(
                                'Error!',
                                `${err.response?.data[0] || err}`,
                                'error'
                            )
                            console.log(err);
                            console.log(err.response?.data[0]);
                        });
                }
            })

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div ref={modalRef} className="graphpop">
                <main className='main-create-product'>
                    <div className="content-header">
                        <h2>Add New Product</h2>
                        <Link className="btn-close-modal" onClick={closeWithAnimation} to={"/products"}> <AiFillCloseSquare /> </Link>
                    </div>
                    <div className='content-form'>
                        <form onSubmit={(e) => handleSubmitProduct(e)}>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formProduct.name}
                                    onChange={handleChange}
                                    required />
                                <label>Name</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formProduct.description}
                                    onChange={handleChange}
                                    required />
                                <label>Description</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formProduct.price}
                                    onChange={handleChange}
                                    required />
                                <label>Price</label>
                            </div>
                            <div className="input-box">
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={formProduct.quantity}
                                    onChange={handleChange}
                                    required />
                                <label>Quantity</label>
                            </div>
                            <div className="input-box-image">
                                <label htmlFor='images'>Imagen</label>
                                <input
                                    title=''
                                    type="file"
                                    id="images"
                                    name="images"
                                    onChange={(e) => { setImage(e.target.files[0]) }}
                                    required />
                            </div>
                            <button type="submit" className="btn-create" onClick={(e) => handleSubmitProduct(e)}>Add</button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    )
}

export default CraeteProduct;