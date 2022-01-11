import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { detailsProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const pathFile = "http://localhost:8000/";

const ProductDetails = (props) => {
  const { t } = useTranslation();
  const productId = props.match.params.id;

  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [imageName, setImageName] = useState();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const existInCart = cartItems.filter((items) => {
    return items.product === productId;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setImageName(product.imageName);
    }
  }, [dispatch, product, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart(productId, 1));
    props.history.push("/cart");
  };

  return (
    <div className="row justify-content-center m-5">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Helmet>
            <title>{name}</title>
          </Helmet>
          <div className=" col-auto ">
            <img height="300" width="250" src={imageName ? pathFile + imageName : ""} alt={name} />
            <div className="text-center">
              {existInCart.length ? (
                <Link to="/cart" className="btn btn-sm btn-outline-success px-4 mt-2">
                  {t("products.already-in-cart")}
                </Link>
              ) : countInStock ? (
                <h6 className="btn btn-sm btn-success px-4 mt-2" onClick={() => addToCartHandler()}>
                  {t("products.add-to-cart")}
                </h6>
              ) : (
                <h6 className="btn btn-sm btn-disable px-4 mt-2">soldout</h6>
              )}
            </div>
          </div>
          <div className="col-auto text-center">
            <div className="row justify-content-between mt-5">
              <h6>
                <span className="h5 text-secondary"> {name}</span>
              </h6>
            </div>
            <div className="row justify-content-between mt-3">
              <h6>
                <span className="text-muted text-sm opacity-50 me-1">{t("products.category")}</span>
                <span className="h5 text-secondary opacity-75">{category}</span>
              </h6>
            </div>
            <div className="row justify-content-between mt-3">
              <h6>
                <span className="text-muted opacity-50 me-1">{t("products.brand")}</span>
                <span className="h5 text-secondary opacity-75">{brand}</span>
              </h6>
            </div>
            <div className="row justify-content-between mt-3">
              <h6>
                <span className="h5 text-success">${price}</span>
              </h6>
            </div>
            <div className="row justify-content-between mt-5">
              <h6 className="text-light bg-dark bg-gradient p-2 rounded">{t("products.description")}</h6>
              <h6 className="h5 text-secondary opacity-75">{description}</h6>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
