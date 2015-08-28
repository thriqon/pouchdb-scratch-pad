

export default class Database {
  constructor() {
    this.documents = {};
  }

  destroy() {
    this.documents = null;
  }

  get(id) {
    return this.documents[id];
  }
}

