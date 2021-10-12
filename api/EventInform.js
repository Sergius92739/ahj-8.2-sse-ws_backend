class EventInform {
  constructor(id, command) {
    this.date = EventInform.getDate;
    this.info = command;
    this.server = id;
  }

 static get getDate() {
    const formatter = new Intl.DateTimeFormat("ru", {
      timeZone: "Europe/Moscow",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
    return formatter.format(new Date());
  }

  static get info() {
    return {
      created: ['Received "Create command"', 'Created'],
      started: ['Received "Start command"', 'Started'],
      stopped: ['Received "Stop command"', 'Stopped'],
      removed: ['Received "Remove command"', 'Removed'],
    }
  }
}

module.exports = EventInform;
