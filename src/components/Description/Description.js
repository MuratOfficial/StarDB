import React, { Component } from "react";
import SwapiApi from "../../services/SwapiApi";

export default class Description extends Component {
  render() {
    const { typeList, description } = this.props;
    const formType = () => {
      if (typeList === "films") {
        return (
          <div className="card mb-3 text-bg-dark">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-header">
              <h3 className="card-title">{description.title}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Director: </strong> {description.director}
              </p>
              <p className="card-text">
                <strong>Producer: </strong> {description.producer}
              </p>
              <p className="card-text">
                <strong>Characters: </strong> {description.characters}
              </p>
              <p className="card-text">
                <strong>Release year: </strong> {description.dateYear}
              </p>
              <p className="card-text">{description.text}</p>
            </div>
          </div>
        );
      }
      if (typeList === "people") {
        return (
          <div className="card mb-3 text-bg-dark">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-header">
              <h3 className="card-title">{description.name}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Birth Date: </strong> {description.birth_date}
              </p>
              <p className="card-text">
                <strong>Height: </strong> {description.height}
              </p>
              <p className="card-text">
                <strong>Mass: </strong> {description.mass}
              </p>
              <p className="card-text">
                <strong>Hair Color: </strong> {description.hair_color}
              </p>
              <p className="card-text">
                <strong>Eye Color: </strong> {description.eye_color}
              </p>
              <p className="card-text">
                <strong>Films: </strong> {description.films}
              </p>
            </div>
          </div>
        );
      }
      if (typeList === "starships") {
        return (
          <div className="card mb-3 text-bg-dark">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-header">
              <h3 className="card-title">{description.name}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                <strong>Manufacturer: </strong>
                {description.manufacturer}
              </p>
              <p className="card-text">
                <strong>Model: </strong> {description.model}
              </p>
              <p className="card-text">
                <strong>Cost: </strong> {description.cost_in_credits} credits
              </p>
              <p className="card-text">
                <strong>Class: </strong> {description.starship_class}
              </p>
              <p className="card-text">
                <strong>Hyperdrive Rating: </strong>
                {description.hyperdrive_rating}
              </p>
              <p className="card-text">
                <strong>Consumables: </strong> {description.consumables}
              </p>
            </div>
          </div>
        );
      }
    };
    return <div className="container">{formType()}</div>;
  }
}
