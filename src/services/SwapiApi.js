export default class SwapiApi {
  _baseUrl = "https://swapi.dev/api";

  async getSwapi(req) {
    try {
      const res = await fetch(`${this._baseUrl}${req}`);
      if (!res.ok) {
        throw new Error("Trouble with network, unable to connect :(");
      }
      const data = await res.json();
      return data.results;
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async getFilms() {
    const films = await this.getSwapi("/films/");
    return films;
  }

  getFilm(id) {
    return this.getSwapi(`/films/${id}`);
  }

  async getPeople() {
    const people = await this.getSwapi("/people/");
    return people;
  }

  getPerson(id) {
    return this.getSwapi(`/people/${id}`);
  }

  async getStarships() {
    const starships = await this.getSwapi("/starships/");
    return starships;
  }

  getStarship(id) {
    return this.getSwapi(`/starships/${id}`);
  }
  async getNamesFilms() {
    let listObj = [];
    const newData = await this.getFilms().then((arr) => (listObj = [...arr]));
    return newData;
  }

  async getFilmsNameArray() {
    let namesList = [];
    (await this.getNamesFilms()).forEach((el) => {
      namesList.push(el.title);
    });
    return namesList;
  }

  async getNamesPeople() {
    let listObj = [];
    const newData = await this.getPeople().then((arr) => (listObj = [...arr]));
    return newData;
  }

  async getPeopleNameArray() {
    let namesList = [];
    (await this.getNamesPeople()).forEach((el) => {
      namesList.push(el.name);
    });
    return namesList;
  }

  async getNamesStarships() {
    let listObj = [];
    const newData = await this.getStarships().then(
      (arr) => (listObj = [...arr])
    );
    return newData;
  }

  async getStarshipsNameArray() {
    let namesList = [];
    (await this.getNamesStarships()).forEach((el) => {
      namesList.push(el.name);
    });
    return namesList;
  }

  async getList() {
    const listFilmsName = await this.getFilmsNameArray();
    const listPeopleName = await this.getPeopleNameArray();
    const listStarshipsName = await this.getStarshipsNameArray();
    return { listFilmsName, listPeopleName, listStarshipsName };
  }

  async getAll() {
    const allFilms = await this.getFilms();
    const allPeople = await this.getPeople();
    const allStarships = await this.getStarships();
    return { allFilms, allPeople, allStarships };
  }
}
