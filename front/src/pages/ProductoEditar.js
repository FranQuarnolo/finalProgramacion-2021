import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detallesProducto, updateProduct } from '../actions/productoActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productoConstants';

export default function ProductoEditar(props) {
    const productoId = props.match.params.id;
    const [name, setName] = useState('');
    const [pages, setPages] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [editorial, setEditorial] = useState('');
    const [description, setDescription] = useState('');
    const productoDetalles = useSelector((state) => state.productoDetalles);
    const { loading, error, producto } = productoDetalles;

    const actualizarProducto = useSelector((state) => state.actualizarProducto);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = actualizarProducto;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!producto || producto._id !== productoId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detallesProducto(productoId));
        } else {
            setName(producto.name);
            setPages(producto.pages)
            setCategory(producto.category);
            setImage(producto.image);
            setPrice(producto.price);
            setStock(producto.stock);
            setEditorial(producto.editorial);
            setDescription(producto.description);
        }
    }, [producto, dispatch, productoId, successUpdate, props.history]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productoId,
                name,
                pages,
                category,
                image,
                price,
                stock,
                editorial,
                description,
            })
        );
    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const usuarioLogin = useSelector((state) => state.usuarioLogin);
    const { userInfo } = usuarioLogin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Editar Producto {productoId}</h1>
                </div>
                {loadingUpdate && <Loading></Loading>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (
                    <Loading></Loading>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="pages">Paginas</label>
                            <input
                                id="pages"
                                type="text"
                                placeholder="Paginas"
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Categoría"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Subir archivo...</label>
                            <input
                                type="file"
                                id="imageFile"
                                label="Elije una imagen..."
                                onChange={uploadFileHandler}
                            ></input>
                            {loadingUpload && <Loading></Loading>}
                            {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>
                            )}
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Precio"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="stock">Stock</label>
                            <input
                                id="stock"
                                type="text"
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="editorial">Editorial</label>
                            <input
                                id="editorial"
                                type="text"
                                placeholder="Editorial"
                                value={editorial}
                                onChange={(e) => setEditorial(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="description">Descripción</label>
                            <textarea
                                id="description"
                                rows="3"
                                type="text"
                                placeholder="Descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Actualizar
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}