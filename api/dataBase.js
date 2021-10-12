const CloudServer = require('./CloudServer');

const dataBase = {
  instances: [],
  handlers: {
    instanceData: null,
    notification: null,
  },
  listen(handler1, handler2) {
    this.handlers.instanceData = handler1;
    this.handlers.notification = handler2;
  },
  contains(id) {
    return this.instances.some((instance) => instance.id === id);
  },
  add(id) {
    const cloudServer = new CloudServer(id)
    this.instances.push(cloudServer);
    return {
      action: 'created',
      instance: cloudServer
    };
  },
  delete(id) {
    if (this.contains(id)) {
      const index = this.instances.findIndex((elem) => elem.id === id);
      return {
        action: 'removed',
        instance: this.instances.splice(index, 1)[0]
      };
    }
  },
  stateChange(id, state) {
    if (this.contains(id)) {
      this.instances.find((elem) => elem.id === id).state = CloudServer.status[state];
      const instance = this.instances.find((e) => e.id === id)
      if (CloudServer.status[state] === 'Running') {
        return {
          action: 'started',
          instance,
        }
      } else {
        return {
          action: 'stopped',
          instance,
        }
      }
    }
  }
}

module.exports = dataBase;
