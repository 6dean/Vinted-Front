import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Offerslist = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [value, setvalue] = useState("");

  const fetchData = async () => {
    const response = await axios.get(
      `https://site--backend-vinted--6qn7tv96v7tt.code.run/offers${value}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading">
      <div className="loading-text">LOADING ...</div>
    </div>
  ) : (
    <>
      <div className="nav-bar-offers">
        <button className="button-offer" onClick={() => {}}>
          Prix ↑
        </button>
        <button className="button-offer" onClick={() => {}}>
          Prix ↓
        </button>
        <input
          className="input-offer"
          type="text"
          placeholder="Prix mini"
        ></input>
        <input
          className="input-offer"
          type="text"
          placeholder="Prix maxi"
        ></input>
        <input
          className="input-offer"
          type="text"
          placeholder="Couleur"
        ></input>
        <input className="input-offer" type="text" placeholder="Marque"></input>
      </div>
      <div className="introduction">
        {data.map((elem, index) => {
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

export default Offerslist;
