import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial time
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
      );

      setProduct(data?.product);
      getRelatedProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get related products
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-4 text-center">
          <img
            src={`${process.env.REACT_APP_API}/api/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ width: "350px", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center mb-3">Product Details</h1>
          <h5>Name: {product.name} </h5>
          <h5>Description: {product.description} </h5>
          <h5>Price: ₹ {product.price} </h5>
          <h5>Category: {product.category?.name} </h5>
          <h5>Shipping: {product.shipping ? "Yes" : "No"} </h5>
          <button className="btn btn-secondary m-1">Add to Cart</button>
        </div>
      </div>
      <div className="row container mt-3">
        <h1>Similar products</h1>
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-3" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title"> {p.name} </h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> ₹ {p.price}</p>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => {
                    navigate(`/product/${p?.slug}`);
                    // window.location.reload();
                  }}
                >
                  More Details
                </button>
                <button className="btn btn-secondary m-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
