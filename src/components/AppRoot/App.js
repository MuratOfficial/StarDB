import React, { Component } from "react";
import SwapiApi from "../../services/SwapiApi";
import Navbar from "./Navbar";
import ListSideBar from "../ListSideBar/ListSideBar";
import Description from "../Description/Description";
import "./App.css";

export default class App extends Component {
  swapiApi = new SwapiApi();

  constructor() {
    super();
    this.state = {
      filmsList: [],
      starshipsList: [],
      peopleList: [],
      showList: [
        "A New Hope",
        "The Empire Strikes Back",
        "Return of the Jedi",
        "The Phantom Menace",
        "Attack of the Clones",
        "Revenge of the Sith",
      ],
      typeList: "films",
      filmsAll: null,
      peopleAll: null,
      starshipsAll: null,
      description: {
        title: "Film name",
        director: "Director",
        producer: "Producer",
        characters: ["Character 1, ", "Character 2"],
        dateYear: "1999",
        text: "...there will be intersting opening crawl...",
      },
      loading: true,
    };
  }

  componentDidMount() {
    this.onObjectUpdate();
    this.onListUpdate();
  }

  onListUpdate() {
    this.swapiApi.getList().then((ls) => {
      this.setState({
        filmsList: ls.listFilmsName,
        starshipsList: ls.listStarshipsName,
        peopleList: ls.listPeopleName,
        showList: ls.listFilmsName,
        typeList: "films",
        loading: false,
      });
    });
  }

  onObjectUpdate() {
    this.swapiApi.getAll().then((obj) => {
      this.setState({
        filmsAll: obj.allFilms,
        peopleAll: obj.allPeople,
        starshipsAll: obj.allStarships,
      });
    });
  }

  onToggleType = (type) => {
    let { filmsList, peopleList, starshipsList } = this.state;
    let showData = [];
    let newTypeList = "";
    if (type === "films") {
      showData = filmsList;
      newTypeList = "films";
    }
    if (type === "people") {
      showData = peopleList;
      newTypeList = "people";
    }
    if (type === "starships") {
      showData = starshipsList;
      newTypeList = "starships";
    }
    this.setState({
      showList: showData,
      typeList: newTypeList,
    });
  };

  // Alternative way of optimizing fetch data

  // onToggleType = (type) => {
  //   let {
  //     filmsAll,
  //     peopleAll,
  //     starshipsAll,
  //     filmsList,
  //     peopleList,
  //     starshipsList,
  //   } = this.state;
  //   if (filmsList.length < 1) {
  //     filmsAll.forEach((el) => {
  //       filmsList.push(el.title);
  //     });
  //   }
  //   if (peopleList.length < 1) {
  //     peopleAll.forEach((el) => {
  //       peopleList.push(el.name);
  //     });
  //   }
  //   if (starshipsList.length < 1) {
  //     starshipsAll.forEach((el) => {
  //       starshipsList.push(el.name);
  //     });
  //   }

  //   let showData = [];
  //   let newTypeList = "";
  //   if (type === "films") {
  //     showData = filmsList;
  //     newTypeList = "films";
  //   }
  //   if (type === "people") {
  //     showData = peopleList;
  //     newTypeList = "people";
  //   }
  //   if (type === "starships") {
  //     showData = starshipsList;
  //     newTypeList = "starships";
  //   }
  //   this.setState({
  //     showList: showData,
  //     typeList: newTypeList,
  //   });
  // };

  getNameElement = (el) => {
    const {
      typeList,
      filmsAll,
      filmsList,
      peopleAll,
      peopleList,
      starshipsAll,
      starshipsList,
    } = this.state;
    let idx = {};
    if (typeList === "films") {
      idx = {
        title: filmsAll[filmsList.indexOf(el)].title,
        director: filmsAll[filmsList.indexOf(el)].director,
        producer: filmsAll[filmsList.indexOf(el)].producer,
        characters: filmsAll[filmsList.indexOf(el)].characters,
        dateYear: filmsAll[filmsList.indexOf(el)].release_date,
        text: filmsAll[filmsList.indexOf(el)].opening_crawl,
      };
    }

    if (typeList === "people") {
      idx = {
        name: peopleAll[peopleList.indexOf(el)].name,
        birth_date: peopleAll[peopleList.indexOf(el)].birth_year,
        height: peopleAll[peopleList.indexOf(el)].height,
        mass: peopleAll[peopleList.indexOf(el)].mass,
        hair_color: peopleAll[peopleList.indexOf(el)].hair_color,
        eye_color: peopleAll[peopleList.indexOf(el)].eye_color,
        films: peopleAll[peopleList.indexOf(el)].films,
      };
    }
    if (typeList === "starships") {
      idx = {
        name: starshipsAll[starshipsList.indexOf(el)].name,
        manufacturer: starshipsAll[starshipsList.indexOf(el)].manufacturer,
        model: starshipsAll[starshipsList.indexOf(el)].model,
        cost_in_credits:
          starshipsAll[starshipsList.indexOf(el)].cost_in_credits,
        starship_class: starshipsAll[starshipsList.indexOf(el)].starship_class,
        hyperdrive_rating:
          starshipsAll[starshipsList.indexOf(el)].hyperdrive_rating,
        consumables: starshipsAll[starshipsList.indexOf(el)].consumables,
      };
    }

    this.setState({
      description: idx,
    });
  };

  render() {
    const loading = this.state.loading;
    const withLoader = () => {
      if (loading) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-5 pt-5"></div>
              <div className="col-2 pt-5">
                <div class="custom-loader"></div>
              </div>
              <div className="col-5 pt-5"></div>
            </div>
          </div>
        );
      } else {
        return (
          <Description
            typeList={this.state.typeList}
            description={this.state.description}
          />
        );
      }
    };
    return (
      <div className="App">
        <Navbar onToggleType={this.onToggleType} />
        <div className="container">
          <div className="row">
            <div className="col-3 pt-5">
              <ListSideBar
                namesList={this.state.showList}
                getNameElement={this.getNameElement}
              />
            </div>
            <div className="col-9 pt-5">{withLoader()}</div>
          </div>
        </div>
      </div>
    );
  }
}
