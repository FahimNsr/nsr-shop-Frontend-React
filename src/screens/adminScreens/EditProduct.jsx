import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, detailsProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";

const pathFile = "http://localhost:8000/";

const EditProduct = (props) => {
  const productId = props.match.params.id;

  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [imageName, setImageName] = useState();
  const [image, setImage] = useState(null);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/dashboard/products");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
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
  }, [dispatch, product, productId, props.history, successUpdate]);

  const submitProduct = (event) => {
    event.preventDefault();
    if (name && brand && category && price && countInStock && description) {
      const updatedProduct = { name, brand, category, price, countInStock, description };
      const file = new FormData();
      if (image && image.size < 3000000) {
        const filename = Date.now() + "-" + image.name;
        file.append("imageName", filename);
        file.append("image", image);
        updatedProduct.imageName = filename;
      }
      dispatch(updateProduct(productId, updatedProduct, file));
    }
  };

  return (
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col-8 col-auto">
        <div className="card text-black">
          <div className="card-body ">
            <div className="justify-content-center">
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <>
                  <Helmet>
                    <title>{name}</title>
                  </Helmet>

                  <h2 className="text-center fw-bold m-4 ">Edit Product</h2>
                  <form onSubmit={submitProduct}>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Name</label>
                        <input
                          className={"form-control"}
                          name="name"
                          type="text"
                          maxLength="64"
                          required
                          value={name ? name : ""}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Brand</label>
                        <input
                          className="form-control"
                          name="brand"
                          type="text"
                          required
                          value={brand ? brand : ""}
                          onChange={(e) => {
                            setBrand(e.target.value);
                          }}
                        />
                      </div>
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Category</label>
                        <input
                          className="form-control"
                          name="category"
                          type="text"
                          required
                          value={category ? category : ""}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Price</label>
                        <input
                          className="form-control"
                          name="price"
                          type="number"
                          min="0"
                          required
                          value={price ? price : ""}
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </div>
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Count</label>
                        <input
                          className="form-control"
                          name="countInStock"
                          type="number"
                          min="0"
                          required
                          value={countInStock ? countInStock : ""}
                          onChange={(e) => {
                            setCountInStock(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label">Description</label>
                        <input
                          className={"form-control"}
                          name="description"
                          type="text"
                          maxLength="64"
                          required
                          value={description ? description : ""}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill">
                        <label className="form-label">Image</label>
                        <input
                          className="form-control"
                          name="image"
                          type="file"
                          accept="image/jpg ,image/jpeg, image/png"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                        {image && image.size > 3000000 && (
                          <p className="alert alert-danger mt-3"> Image must be less than 3 MB.</p>
                        )}
                      </div>
                    </div>
                    <button type="submit" className="form-control btn btn-success opacity-75 m-2">
                      Update Product
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-auto">
        {image ? (
          <img height="200" width="160" src={URL.createObjectURL(image)} alt={`${image.name}`} />
        ) : imageName ? (
          <img height="200" width="160" src={pathFile + imageName} alt={`${imageName}`} />
        ) : null}
      </div>
    </div>
  );
};

export default EditProduct;
