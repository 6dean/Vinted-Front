import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Offerslist = ({ product, setProduct }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pricing, setPricing] = useState("");
  const [mini, setMini] = useState("");
  const [maxi, setMaxi] = useState("");
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://site--backend-vinted--6qn7tv96v7tt.code.run/offers?${pricing}&title=${product}&priceMin=${mini}&priceMax=${maxi}&page=${page}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricing, mini, maxi, product, page]);

  return isLoading ? (
    <div className="loading">
      <div className="loading-text">LOADING ...</div>
    </div>
  ) : (
    <>
      <div className="advertise-banner">
        <a href="https://www.lereacteur.io/">
          <img
            src="https://res.cloudinary.com/dlfp2xvis/image/upload/v1668287505/my-content/advertise_lereacteurv01_cmzths.png"
            alt="lereacteur-advertise"
          />
        </a>
      </div>

      <div className="nav-bar-offers">
        <button
          className="button-offer"
          onClick={() => {
            setPricing("sort=price-asc");
          }}
        >
          Prix ↑
        </button>
        <button
          className="button-offer"
          onClick={() => {
            setPricing("sort=price-desc");
          }}
        >
          Prix ↓
        </button>
        <input
          className="input-offer"
          type="text"
          placeholder="Prix mini"
          onChange={(elem) => setMini(elem.target.value)}
          value={mini}
        ></input>
        <input
          className="input-offer"
          type="text"
          placeholder="Prix maxi"
          onChange={(elem) => setMaxi(elem.target.value)}
          value={maxi}
        ></input>
        <input
          className="input-offer"
          type="text"
          placeholder="Article"
          onChange={(elem) => setProduct(elem.target.value)}
          value={product}
        ></input>
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
      <div className="page-selector">
        <div>
          {page === 1 ? null : (
            <button
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Page précédente
            </button>
          )}
        </div>
        <div>
          {page === 2 ? null : (
            <button
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Page Suivante
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Offerslist;
