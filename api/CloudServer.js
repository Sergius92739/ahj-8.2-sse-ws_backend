class CloudServer {
  constructor(id) {
    this.id = id;
    this.state = CloudServer.status.stopped;
  }

  static get status() {
    return {
      started: 'Running',
      stopped: 'Stopped',
    }
  }
}

module.exports = CloudServer;
