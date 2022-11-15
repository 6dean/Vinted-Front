import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import axios from "axios";

const OfferPay = ({ token }) => {
  const location = useLocation();

  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const { id, title, price, description, image } = location.state;

  console.log(id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    const response = await axios.post(
      "https://site--backend-vinted--6qn7tv96v7tt.code.run/offer/pay",
      {
        stripeToken,
        id,
        price,
        description,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <div className="master-3">
      <div className="payment">
        <div className="payment-form">
          <div className="listing-props">
            <div className="detail-elem-2">
              <div className="elem-id">PRODUIT</div> <div>{title}</div>
            </div>
            <div className="detail-elem-2">
              <div className="elem-id">PRIX</div> <div>{price} €</div>
            </div>
            <div className="img-pay">
              <img src={image} alt="offer" width="280px" />
            </div>
          </div>
          <div className="sure">
            <div className="sure-spacing<">
              <div className="total">Montant à payer</div>
              <div></div>
              <div className="somme"> {price} € </div>
            </div>

            <p>Frais de port offert par le Reacteur</p>
          </div>

          {!completed ? (
            <form onSubmit={handleSubmit}>
              <CardElement />

              <div className="button-pay-style">
                <button className="button-pay" type="submit">
                  Valider
                </button>
              </div>
            </form>
          ) : (
            <span>Paiement effectué ! </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferPay;
