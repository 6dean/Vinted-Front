import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  // MES USESTATE
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [infos, setInfos] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="formulaire">
      <div className="App">
        <div>{infos ? <h1>Merci !</h1> : <h1>Inscris-toi !</h1>}</div>
        {infos === false ? (
          <div className="input-block">
            <div>
              <p className="input-text">Pseudo</p>
              <input
                className="input"
                onChange={(username) => setName(username.target.value)}
                type="text"
                placeholder="Utilisateur"
                name="name"
                value={username}
              />
            </div>
            <div>
              <p className="input-text">Email</p>
              <input
                className="input"
                onChange={(elem) => setEmail(elem.target.value)}
                type="email"
                placeholder="youraddress@mail.com"
                name="email"
                value={email}
              />
            </div>
            <div>
              <p className="input-text">Mot de passe</p>
              <input
                className="input"
                onChange={(elem) => setPassword(elem.target.value)}
                type="password"
                name="password"
                value={password}
              />
            </div>
            <div className="upload-avatar">
              <p className="input-text">Avatar</p>{" "}
              <div>
                <input
                  className="upload-button"
                  type="file"
                  onChange={(event) => setAvatar(event.target.value)}
                  value={avatar}
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                ></input>
              </div>
            </div>

            <div>
              <div className="flexbox-letter">
                <div>
                  <input
                    className="checkmark"
                    type="checkbox"
                    value={newsletter}
                    onChange={() => {
                      setNewsletter((current) => !current);
                    }}
                  ></input>
                </div>
                <div>
                  <span className="span-letter">
                    Je souhaite recevoir par e-mail des offres personnalisées et
                    les dernières mises à jour de Vinted
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button
                className="button-join"
                type="submit"
                onClick={() => {
                  if (username === "" || email === "") {
                    alert(`Vos informations ne sont pas complètes`);
                  } else {
                    const data = async () => {
                      try {
                        const response = await axios.post(
                          "https://site--backend-vinted--6qn7tv96v7tt.code.run/user/signup",
                          {
                            username: username,
                            email: email,
                            password: password,
                            newsletter: newsletter,
                            avatar: avatar,
                          }
                        );
                        const token = response.data.token;
                        Cookies.set("token", token, { expires: 1 });
                        token ? setInfos(true) : <p>une erreur est survenue</p>;
                        setInfos(true) && navigate("/");
                      } catch (error) {
                        console.log(error.message);
                      }
                    };
                    data();
                  }
                }}
              >
                Créer un compte
              </button>
              <div className="already-member">
                Vous avez déjà un compte ?{" "}
                <Link to="/Login">
                  <span>Se connecter</span>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Signup;
