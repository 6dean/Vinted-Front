import { Link } from "react-router-dom";

const Header = ({ token, transferToken, product, setProduct }) => {
  return (
    <div className="sticky-header">
      <header>
        <div>
          <Link to="/">
            <img
              src="https://www.vinted.fr/assets/web-logo/default/logo.svg"
              alt="Vinted"
            />
          </Link>
        </div>
        <input
          className="search-bar"
          type="search"
          placeholder="Rechercher des articles"
          name="Vinted"
          onChange={(event) => {
            setProduct(event.target.value);
          }}
          value={product}
        />
        <div className="header-style">
          {token === null ? (
            <Link to="/Signup">
              <div className="button">S'inscrire | Se connecter</div>
            </Link>
          ) : (
            <div
              className="button"
              onClick={() => {
                transferToken(null);
              }}
            >
              deconnecter
            </div>
          )}
          <Link to="/Publish">
            <div className="button-sell">Vendre tes articles</div>
          </Link>
        </div>
      </header>{" "}
      <div className="line"></div>
    </div>
  );
};

export default Header;
