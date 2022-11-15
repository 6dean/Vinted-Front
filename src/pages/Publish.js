import { useNavigate } from "react-router-dom";
import React, { useState, Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

/// ----------- FUNCTION & USETATES ----------- ///

const Publish = ({ token }) => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quality, setQuality] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  /// ----------- DROPBOX FUNCTION ----------- ///

  class Basic extends Component {
    constructor() {
      super();
      this.onDrop = (files) => {
        setImage(files[0]);
        this.setState({ files });
      };
      this.state = {
        files: [],
      };
    }

    render() {
      const files = this.state.files.map((file) => (
        <p>
          {file.name} - {file.size} bytes
        </p>
      ));

      return (
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <button>Déposez vos images</button>
              </div>
              <aside>
                <p>{image && image.name} </p>
                <ul>{files}</ul>
              </aside>
            </section>
          )}
        </Dropzone>
      );
    }
  }

  /// ----------- CONDITIONNAL RENDERING IF ----------- ///

  if (token) {
    return (
      <div className="master-2">
        <div className="publish-style">
          <h2>Vends ton article</h2>
          <div>
            <div className="block-publish-2">
              <div className="dropbox">
                <Basic />;
              </div>
            </div>
            <div className="block-publish">
              <div className="settings-offer">
                <div>titre</div>
                <input
                  className="input-offer-2"
                  onChange={(title) => setTitle(title.target.value)}
                  type="text"
                  placeholder="ex : chemise"
                  name="title"
                  value={title}
                ></input>
              </div>
              <div className="settings-offer">
                <div>description</div>
                <input
                  className="input-offer-descript"
                  onChange={(description) =>
                    setDescription(description.target.value)
                  }
                  type="text"
                  placeholder="ex : article neuf et jamais porté"
                  name="descrtiption"
                  value={description}
                ></input>
              </div>
            </div>
            <div className="block-publish">
              <div className="settings-offer">
                <div>Marque</div>
                <input
                  className="input-offer-2"
                  onChange={(brand) => setBrand(brand.target.value)}
                  type="text"
                  placeholder="ex : Nike"
                  name="marque"
                  value={brand}
                ></input>
              </div>
              <div className="settings-offer">
                <div>Taille</div>
                <input
                  className="input-offer-2"
                  onChange={(size) => setSize(size.target.value)}
                  type="text"
                  placeholder="ex : chemise"
                  name="taille"
                  value={size}
                ></input>
              </div>
              <div className="settings-offer">
                <div>Couleur</div>
                <input
                  className="input-offer-2"
                  onChange={(color) => setColor(color.target.value)}
                  type="text"
                  placeholder="ex : Rouge"
                  name="couleur"
                  value={color}
                ></input>
              </div>
              <div>
                <div className="settings-offer">
                  <div>Qualité</div>
                  <input
                    className="input-offer-2"
                    onChange={(quality) => setQuality(quality.target.value)}
                    type="text"
                    placeholder="ex : Neuf"
                    name="etat"
                    value={quality}
                  ></input>
                </div>
                <div className="settings-offer">
                  <div>Ville</div>
                  <input
                    className="input-offer-2"
                    onChange={(city) => setCity(city.target.value)}
                    type="text"
                    placeholder="ex : Paris"
                    name="ville"
                    value={city}
                  ></input>
                </div>
              </div>
            </div>
            <div className="block-publish">
              <div className="settings-offer">
                <div>Prix</div>
                <input
                  className="input-offer-2"
                  onChange={(price) => setPrice(price.target.value)}
                  type="text"
                  placeholder="ex : 10€"
                  name="prix"
                  value={price}
                ></input>
              </div>
              <div className="settings-offer-2">
                <div className="invisible"> </div>
                <div>
                  <input className="checkmark" type="checkbox"></input> Je suis
                  intéréssé(e) par les échanges
                </div>
              </div>
            </div>
            <div className="button-add-offer">
              <div>
                <button
                  onClick={() => {
                    if (title === "" || description === "" || price === "") {
                      alert(`Vos informations produit ne sont pas complètes`);
                    } else {
                      const data = async () => {
                        const formdata = new FormData();

                        formdata.append("name", title);
                        formdata.append("description", description);
                        formdata.append("brand", brand);
                        formdata.append("size", size);
                        formdata.append("color", color);
                        formdata.append("quality", quality);
                        formdata.append("city", city);
                        formdata.append("price", price);
                        formdata.append("image", image);
                        console.log(formdata);
                        try {
                          const response = await axios.post(
                            "https://site--backend-vinted--6qn7tv96v7tt.code.run/offer/publish",
                            formdata,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          console.log(response.data);
                          navigate("/Offers");
                        } catch (error) {
                          console.log(error.message);
                        }
                      };
                      data();
                    }
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /// ----------- CONDITIONNAL RENDERING ELSE ----------- ///
  else {
    navigate("/signup");
  }
};

export default Publish;
