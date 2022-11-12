import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      `https://site--backend-vinted--6qn7tv96v7tt.code.run/offer/${id}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  });

  return isLoading ? (
    <div className="loading">
      <p className="loading-text">LOADING ...</p>
    </div>
  ) : (
    <div className="master">
      <div className="offer-presentation">
        <div className="img-element">
          <img
            className="img-offer"
            src={data.product_image["secure_url"]}
            alt=""
          />
        </div>
        <div className="box-details">
          {" "}
          <div className="detail-price">{data.product_price} €</div>
          <div className="listing-props">
            <div className="detail-elem">
              <div className="elem-id">MARQUE</div>{" "}
              <div>{data.product_details[0]["brand"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">TAILLE</div>{" "}
              <div>{data.product_details[1]["size"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">ETAT</div>{" "}
              <div>{data.product_details[2]["quality"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">COULEUR</div>
              <div>{data.product_details[3]["color"]}</div>
            </div>
            <div className="detail-elem">
              <div className="elem-id">EMPLACEMENT</div>
              <div>{data.product_details[4]["city"]}</div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="product-name">{data.product_name} </div>
          <div className="product-description">{data.product_description} </div>
          <div className="user-id-offer">
            <img
              className="avatar-profil"
              src={data.owner.avatar.secure_url}
              alt=""
            />

            {data.owner === undefined ? null : data.owner["account"].username}
          </div>
          <div className="buy-button">
            <button>ACHETER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
