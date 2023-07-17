import { useState, useEffect } from 'react';

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import CardProduct from '../components/CardProduct';
import CraeteProduct from '../components/CreateProduct';
import LoadingSpinner from '../components/LoadingSpinner';
import { MdAddCircle } from 'react-icons/md'
import { Pagination } from '@mui/material';

import Swal from 'sweetalert2';
import * as API from '../services/product.service'

import './styles/Products.scss';

function Products() {

    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("");
    const [userData, setUserData] = useState({});

    const showPopup = () => {
        setVisible(true);
    };

    const closePopup = () => {
        setVisible(false);
    };

    const getProducts = async () => {
        setIsLoading(true);
        await API.getProducts()
            .then((response) => {
                /* const data  = []; */
                const prods = response?.data
                const data = Object.keys(prods).map((item) => {
                    return { id: item, product: prods[item] };
                })
                setProducts(data);
                setIsLoading(false)

                /* console.log(data); */
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const handleDelete = async (id) => {

        const { value: res } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            input: 'text',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need confirm typing "Si"!'
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                await API.deleteProduct(id)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            `Product removed`,
                            'success'
                        )
                        getProducts();
                    }).catch(err => {
                        Swal.fire(
                            'Error!',
                            `Internal Server Error`,
                            'error'
                        )
                        console.log(err);
                        console.log(err.response?.data[0]);
                    });
            }else{
                return 'Something wrong'
            }
        });
        getProducts();
    }

    const setRoleData = async () => {
        if (userData) {
            await setRole(userData?.data?.user?.role);
        }
    }
    useEffect(() => {
        setRoleData();
    }, [userData]);

    useEffect(() => {
        document.title = "Products";
        getProducts();
        setUserData(JSON.parse(localStorage.getItem('dataLogin')));
        /* console.log(products.length); */
    }, [])

    //Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = products.slice(startIndex, endIndex);

    const showButton = (
        <>
            <button className="btn-show-create" onClick={showPopup}> <MdAddCircle /> </button>
            {visible && <CraeteProduct handleClose={closePopup} handleReload={getProducts} />}
        </>
    )
    return (
        <>

            <NavBar />
            <main className="main-products">
                <div className="btn-create-product">
                    {
                        role === 'ADMIN'
                            ?
                            showButton
                            :
                            null
                    }
                </div>
                <section className="cards-section">
                    {
                        isLoading
                            ?
                            <LoadingSpinner />
                            :
                            role == "ADMIN"
                                ?
                                currentData.map(product =>
                                    <CardProduct key={product.id} product={product} handleDelete={handleDelete} />
                                )
                                :
                                currentData.filter((product) => {
                                    return product.product?.quantity > 0
                                }).map(product =>
                                    <CardProduct key={product.id} product={product} handleDelete={handleDelete} />
                                )

                    }
                    <Pagination
                        className={'pagination-inputs'}
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Products;