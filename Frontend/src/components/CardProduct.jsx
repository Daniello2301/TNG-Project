import './styles/CardProduct.scss';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function CardProduct({ product, handleDelete }) {

    const [clicked, setCliked] = useState('');

    const handleClick = () => {
        clicked == 'bottom' ? setCliked('clicked bottom') : setCliked('bottom');
    }

    const [dataLogin, setDataLogin] = useState({});
    const [role, setRole] = useState("");

    useEffect(() => {
        setDataLogin(JSON.parse(localStorage.getItem('dataLogin')));
        if (dataLogin != null) {
            setRole(dataLogin.data?.user.role || dataLogin.userData?.role);
        }
    }, [role])

    /* const  handleDelete  */

    return (
        <div className="wrapper">
            <div className="container-card">
                <div className="top">
                    <img src={product?.product.images[0].url} alt='Product Image' />
                    {
                        role == "ADMIN"
                            ?
                            <div className='admin-actions'>
                                <NavLink className="edit-product" to={`/product/edit/${product.id}`}> Edit </NavLink>
                                <button className='delete-product' onClick={() => handleDelete(product.id)}> Delete</button>
                            </div>
                            :
                            null
                    }
                </div>
                <div className={clicked || "bottom"}>
                    <div className="left">
                        <div className="details">
                            <h1> {product?.product.name} </h1>
                            <p>${product?.product.price}</p>
                        </div>
                        <div className={'buy'} onClick={handleClick} ><i className="material-icons">add_shopping_cart</i></div>
                    </div>
                    <div className="right">
                        <div className="done"><i className="material-icons">done</i></div>
                        <div className="details">
                            <h1>{product?.product.name}</h1>
                            <p>Added to your cart</p>
                        </div>
                        <div className="remove" onClick={handleClick} ><i className="material-icons">clear</i></div>
                    </div>
                </div>
            </div>
            <div className="inside">
                <div className="icon"><i className="material-icons">info_outline</i></div>
                <div className="contents">
                    <p>{product?.product.description}</p>
                    {
                        role == "ADMIN"
                            ?
                        <p> Quatity:  {product.product.quantity} </p>
                            :
                        null
                    }
                    {
                        product?.product.ar_experience != null
                            ?
                            <a href={product?.product.ar_experience}> AR Experience</a>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default CardProduct;