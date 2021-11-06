import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";

const pathFile = "http://localhost:8000/";

const ProductsList = (props) => {
  const { pageNumber = 1 } = useParams();
  const sellerMode = props.match.path.indexOf("/seller") >= 0;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber }));
  }, [dispatch, props.history, sellerMode, successDelete, userInfo._id, pageNumber]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(productId));
    }
  };
  return (
    <div className="text-center justify-content-center">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Link to="/dashboard/addProduct" className="btn btn-success opacity-75 mt-2">
        Add new Product
      </Link>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table table-secondary table-hover mt-3 text-center">
            <thead>
              <tr>
                <th scope="col">Image</th>
                {/* <th scope="col">ID</th> */}
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">In Stock</th>
                <th scope="col">Settings</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={`${product._id}`}>
                  <td>
                    <img height="60" width="40" src={pathFile + product.imageName} alt={`${product.name}`} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <h6>
                      <Link to={`/dashboard/product/${product._id}`} className="btn btn-sm btn-light ">
                        EDIT
                      </Link>
                    </h6>
                    <h6 className="btn btn-sm btn-dark" onClick={() => handleDelete(product._id)}>
                      DEL
                    </h6>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">In Stock</th>
                <th scope="col">Settings</th>
              </tr>
            </tfoot>
          </table>
          <div className=" row justify-content-center mt-5">
            <div className=" col-auto">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={"btn btn-sm me-1 " + (x + 1 === page ? "btn-outline-secondary " : "btn-secondary")}
                  key={x + 1}
                  to={`/dashboard/products/pageNumber/${x + 1}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsList;
