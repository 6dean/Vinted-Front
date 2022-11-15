import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ product }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://site--backend-vinted--6qn7tv96v7tt.code.run/offers/?title=${product}`
    );
    setData(response.data);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return isLoading ? (
    <div className="loading">
      <>
        <p className="loading-text">LOADING ... </p>
      </>
    </div>
  ) : (
    <>
      <div className="box-advertise">
        <div className="style-advertise">
          Prêts à faire du tri dans vos placards ?
        </div>
        <Link to="/Publish">
          <button className="advertise-button">Vends maintenant</button>
        </Link>
      </div>
      <div className="img-advertise">
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          alt=""
        />
        <div className="scratch-effect">
          <img
            className="torn"
            src="https://static.vinted.com/assets/hero-block/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg"
            alt="torn"
          />
        </div>
      </div>
      <div className="offers-list">
        <div className="populaire">ARTICLES POPULAIRE</div>
        <Link to="/Offers">
          <div className="see-all">Voir tout</div>
        </Link>
      </div>
      <div className="introduction">
        {data.slice(0, 10).map((elem, index) => {
          return (
            <div key={index}>
              {elem.owner !== undefined ? (
                <div className="sell-card">
                  <div className="user-id">
                    <img
                      className="avatar"
                      src={elem.owner.avatar.secure_url}
                      alt=""
                    />

                    {elem.owner === undefined
                      ? "Team Reacteur"
                      : elem.owner.account.username}
                  </div>

                  <Link to={`/offer/${elem._id}`}>
                    <div className="image-container">
                      <img
                        src={
                          elem.product_image.secure_url
                            ? elem.product_image.secure_url
                            : null
                        }
                        alt=""
                      />
                    </div>
                  </Link>

                  <div className="product-price">{elem.product_price} €</div>
                  <div className="product-info">
                    {elem.product_details[1].size}
                  </div>
                  <div className="product-info">
                    {elem.product_details[0].brand}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
