import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push("/dashboard/products");
    }
  }, [dispatch, props.history, success]);

  const submitProduct = (event) => {
    event.preventDefault();
    if (name && price && countInStock && image && image.size < 3000000) {
      const imageName = Date.now() + "-" + image.name;
      let newProduct = { name, brand, category, price, countInStock, description, imageName };
      const file = new FormData();
      file.append("imageName", imageName);
      file.append("image", image);
      dispatch(createProduct(newProduct, file));
    }
  };

  return (
    <div className="row d-flex justify-content-center align-items-center ">
            <Helmet>
        <title>Create Product</title>
      </Helmet>

      <div className="col-8 col-auto">
        <div className="card text-black">
          <div className="card-body ">
            <div className="justify-content-center">
              <h2 className="text-center fw-bold m-4 ">Add New Product</h2>
              <form onSubmit={submitProduct}>
                <div className="d-flex flex-row align-items-center mb-4">
                  {loading && <LoadingBox></LoadingBox>}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                  <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <label className="form-label">Name</label>
                    <input
                      className={"form-control"}
                      name="name"
                      type="text"
                      maxLength="64"
                      required
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
                      required
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                    {image && image.size > 3000000 && (
                      <p className="alert alert-danger mt-3"> Thumbnail must be less than 3 MB.</p>
                    )}
                  </div>
                </div>
                <button type="submit" className="form-control btn btn-success opacity-75 m-2">
                  Create Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="col-auto">
        {image && <img height="200" width="160" src={URL.createObjectURL(image)} alt="" />}
      </div>
    </div>
  );
};

export default AddProduct;
