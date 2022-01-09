import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listCategories } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
const pathFile = "http://localhost:8000/";

const Products = (props) => {
  const { name = "all", category = "all", min = 0, max = 0, order = "newest", pageNumber = 1 } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, all, products, page, pages, count } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listCategories());
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

  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
    props.history.push("/cart");
  };

  const minPrice = all
    ? Math.min.apply(
        Math,
        all.map((a) => {
          return a.price;
        })
      )
    : 0;
  const maxPrice = all
    ? Math.max.apply(
        Math,
        all.map((a) => {
          return a.price;
        })
      )
    : 0;

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
    <div className="mt-2">
      <Helmet>
        <title>Products {name && name !== "all" ? "| " + name : ""}</title>
      </Helmet>
      {categories ? (
        <div className="container">
          <div className="h5 d-flex justify-content-between mx-5">
            <Link
              className={`text-decoration-none ${category === "all" ? " text-black" : " text-muted"} `}
              to={getFilterUrl({ category: "all" })}
            >
              all
            </Link>
            {categories.map((cate) => (
              <Link
                key={cate}
                className={`text-decoration-none ${cate === category ? " text-black" : " text-muted"} `}
                to={getFilterUrl({ category: cate })}
              >
                {cate}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
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
              min={minPrice}
              max={maxPrice}
              type="number"
              className="form-control"
              placeholder={Number(min) === 0 ? minPrice : min}
              onBlur={(e) => {
                props.history.push(getFilterUrl({ min: e.target.value }));
              }}
            />
            <span className="input-group-text">min</span>
            <span className="input-group-text">$</span>
            <input
              name="max"
              min={minPrice}
              max={maxPrice}
              type="number"
              className="form-control"
              placeholder={Number(max) === 0 ? maxPrice : max}
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
                      <h6 className="btn btn-sm btn-outline-primary px-4" onClick={() => addToCartHandler(product._id)}>
                        Add to Cart
                      </h6>
                    ) : (
                      <h6 className="btn btn-sm btn-disable px-4">soldout</h6>
                    )}
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
