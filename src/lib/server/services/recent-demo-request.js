class RecentDemoRequest {
  #requestData = null;

  get() {
    return this.#requestData;
  }

  set(reqData) {
    this.#requestData = reqData;
  }
}

const recentDemoRequest = new RecentDemoRequest();
export default recentDemoRequest;
