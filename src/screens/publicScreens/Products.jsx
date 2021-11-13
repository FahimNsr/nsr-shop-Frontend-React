import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
const pathFile = "http://localhost:8000/";

const Products = (props) => {
  const { name = "all", category = "all", min = 0, max = 0, order = "newest", pageNumber = 1 } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, all, products, page, pages, count } = productList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, pageNumber]);

  const addToCartHandler = (productId) => {
    props.history.push(`/cart/${productId}?qty=1`);
  };
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/products/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Products {name && name !== "all" ? "| " + name : ""}</title>
      </Helmet>
      <div className="row justify-content-center align-items-center m-1">
        <div className="col-auto ">
          Sort by
          <select
            className="ms-2"
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>
        </div>
        <div className="col-auto ">
          <div className="input-group  my-4 ">
            <span className="input-group-text">$</span>
            <input
              name="min"
              type="number"
              className="form-control"
              placeholder={
                min && min !== 0
                  ? min
                  : all
                  ? Math.min.apply(
                      Math,
                      all.map(function (a) {
                        return a.price;
                      })
                    )
                  : ""
              }
              min={
                all
                  ? Math.min.apply(
                      Math,
                      all.map(function (a) {
                        return a.price;
                      })
                    )
                  : 0
              }
              max={
                max && Number(max) !== 0
                  ? max
                  : all
                  ? Math.max.apply(
                      Math,
                      all.map(function (a) {
                        return a.price;
                      })
                    )
                  : ""
              }
              onBlur={(e) => {
                props.history.push(getFilterUrl({ min: e.target.value }));
              }}
            />
            <span className="input-group-text">min</span>
            <span className="input-group-text">$</span>
            <input
              name="max"
              type="number"
              className="form-control"
              placeholder={
                max && max !== 0
                  ? max
                  : all
                  ? Math.max.apply(
                      Math,
                      all.map(function (a) {
                        return a.price;
                      })
                    )
                  : ""
              }
              min={
                min && Number(min) !== 0
                  ? min
                  : all
                  ? Math.min.apply(
                      Math,
                      all.map(function (a) {
                        return a.price;
                      })
                    )
                  : 0
              }
              max={
                all
                  ? Math.max.apply(
                      Math,
                      all.map(function (a) {
                        return a.price;
                      })
                    )
                  : ""
              }
              onBlur={(e) => {
                props.history.push(getFilterUrl({ max: e.target.value }));
              }}
            />
            <span className="input-group-text">max</span>
          </div>
        </div>
        <div className=" text-center">
          {!count ? "No Results" : count === 1 ? `${count} Result` : `${count} Results`}
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.map((product) => (
              <div key={`${product._id}`} className="col-xl-2 col-lg-2 col-md-5 col-sm-5 col-xs-4  mx-2 my-4">
                <div className="card text-center">
                  <img className="card-img" src={pathFile + product.imageName} alt={product.name} />
                  <div className="card-body">
                    <h4 className="card-title">{product.name}</h4>
                    <div className="row justify-content-center align-items-center ">
                      <div className="price text-success">
                        <h5 className="mt-2">${product.price}</h5>
                      </div>
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
            <div className=" row justify-content-center pb-2 mb-5">
              <div className=" col-auto">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={"btn btn-sm me-1 " + (x + 1 === page ? "btn-outline-secondary " : "btn-secondary")}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
