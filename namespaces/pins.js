const events = {
  'toggle': data => {
    console.log('MSG:', data)
  }
}

module.exports = (socket, namespace) => {
  for (let key in events) {
    socket.on(`${namespace}/${key}`, events[key])
  }
}
