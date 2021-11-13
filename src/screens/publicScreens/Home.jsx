import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
const pathFile = "http://localhost:8000/";

const Home = (props) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  const addToCartHandler = (productId) => {
    props.history.push(`/cart/${productId}?qty=1`);
  };

  return (
    <div className=" text-center mt-5">
      <Helmet>
        <title>NSR | Home</title>
      </Helmet>
      <h3>Newest Arrivals</h3>
      <div className="row d-flex justify-content-center align-items-center mx-1 my-3">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.map((product) => (
              <div key={`${product._id}`} className=" col-xl-3 col-lg-3 col-md-5 col-sm-5 col-xs-4 my-4">
                <div className="card text-center">
                  <Link to={`/product/${product._id}`}>
                    <img className="card-img" src={pathFile + product.imageName} alt={product.name} />
                  </Link>
                  <div className="card-body">
                    <Link to={`/product/${product._id}`} className="text-decoration-none">
                      <h4 className="h5 card-title text-muted">{product.name}</h4>
                    </Link>
                      <h5 className="text-success mt-2">${product.price}</h5>
                      {cartItems.filter((items) => {
                        return items.product === product._id;
                      }).length ? (
                        <Link to="/cart" className="btn fst-italic btn-sm btn-outline-success px-4">
                          Already in Cart
                        </Link>
                      ) : product.countInStock ? (
                        <h6
                          className="btn btn-sm btn-outline-primary px-4"
                          onClick={() => addToCartHandler(product._id)}
                        >
                          Add to Cart
                        </h6>
                      ) : (
                        <h6 className="btn btn-sm btn-disable px-4">soldout</h6>
                      )}
                    </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
