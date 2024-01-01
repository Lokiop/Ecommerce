import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
// import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import useCategory from "../components/hooks/useCategory";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const categories = useCategory();

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  //load more
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
    else getAllProducts();
  }, [checked.length, radio]);

  //get filtered products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //total products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Shop Now"}>
      <div className="container-fluid m-3 p-2">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-center">Filter by Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}

              {/* price filter */}
              <h4 className="text-center mt-2">Filter by Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="d-flex flex-column mt-2 p-3">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  RESET Filters
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-3" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title"> {p.name} </h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> ₹ {p.price}</p>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary m-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item added to Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
