const events = {
  'list': function (data) {
    console.log('Client', this.socket.id, 'retrived list of pins')
    this.socket.emit('pins/list', gpio.getPins())
  },
  'get': function (data) {
    this.io.emit('pins/get', gpio.getPinState(data.id))
  },
  'toggle': function (data) {
    console.log('Client', this.socket.id, 'toggled pin', data.id)
    gpio.powerToggle(data.id)
    this.io.emit('pins/list', gpio.getPins())
  }
}

module.exports = (io, socket, namespace) => {
  for (let key in events) {
    socket.on(`${namespace}/${key}`, events[key].bind({socket, io}))
  }
}
