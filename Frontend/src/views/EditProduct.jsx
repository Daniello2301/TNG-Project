import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useState, useEffect }  from "react";
import * as API from '../services/product.service';
import Swal from "sweetalert2";

import './styles/EditProduct.scss'

function EditProduct() {

    const { id } = useParams(); 
    const [ product, setProduct ] = useState({});
    const [dataForm,  setDataForm] = useState({});
    const [ image,  setImage ] = useState("");

    const getProduct = async() =>{
        const response = await API.getProduct(id);
        const product = await response?.data.product
        await setImage(product.images[0].url);
        await setProduct(product);
        /* console.log(product);
        console.log(image); */
    }

    useEffect(() =>{
        setDataForm({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity
        });
    },[product]);
    
    useEffect(() =>{
        getProduct();
    },[id]);


    const { name='',  description='', price='', quantity='' } = dataForm;

    const handleChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newproduct = {
            name,
            description,
            price,
            quantity,
        }
       /*  console.log(newproduct); */
        try {
            const response = await API.updateProduct(id, newproduct);
            /* console.log(response); */

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${response?.data?.msg}`,
                showConfirmButton: true,                
            }).then((response) => {
                if(response.success) {
                    window.location.href="/products";
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <NavBar />
            <main className="main-edit-product">
                {
                    !product
                        ?
                    <div>Seachirn</div>
                        :
                    <section className="edit-content">
                        <div className="right-side">
                            <div className="edit-content-header">
                                <h1>Edit Prodcut</h1>
                            </div>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={dataForm.name}
                                        onChange={handleChange}
                                        required />
                                    <label>Name</label>
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={dataForm.description}
                                        onChange={handleChange}
                                        required />
                                    <label>Description</label>
                                </div>
                                <div className="input-box">
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={dataForm.price}
                                        onChange={handleChange}
                                        required />
                                    <label>Price</label>
                                </div>
                                <div className="input-box">
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={dataForm.quantity}
                                        onChange={handleChange}
                                        required />
                                    <label>Quantity</label>
                                </div>
                                {/* <div className="input-box-image">
                                    <label htmlFor='images'>Imagen</label>
                                    <input
                                        title=''
                                        type="file"
                                        id="images"
                                        name="images"
                                        onChange={(e) => { setImage(e.target.files[0]) }}
                                        required />
                                </div> */}
                                <button type="submit" className="btn-update" onClick={(e) => handleSubmit(e)}>Update</button>
                                <Link type="submit" className="btn-update" to={'/products'}>Cancel</Link>
                            </form>
                        </div>
                        <div className="left-side">
                            <div className="image-product">
                                <img src={image} alt="image-product" />
                            </div>
                        </div>
                    </section>
                }
            </main>
            <Footer />
        </>
    )
}
export default EditProduct;