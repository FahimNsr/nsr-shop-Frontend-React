import React, { useEffect } from "react";
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
                  <img className="card-img" src={pathFile + product.imageName} alt={product.name} />
                  <div className="card-body">
                    <h4 className="card-title">{product.name}</h4>
                    <div className="row justify-content-center align-items-center ">
                        <h5 className="text-success mt-2">${product.price}</h5>
                      {product.countInStock ? (
                        <h6
                          className="btn btn-sm btn-outline-primary m-2"
                          onClick={() => addToCartHandler(product._id)}
                        >
                          Add to Cart
                        </h6>
                      ) : (
                        <h6 className="btn btn-sm btn-disable m-2">soldout</h6>
                      )}
                    </div>
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
