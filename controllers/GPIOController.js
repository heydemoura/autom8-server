const exec = require('child_process').exec
const rpio = require('rpio')
const _ = require('lodash')

module.exports = function (pins) {
  this.pins = _.orderBy(pins, 'id')

  this.pins.forEach(pin => {
    rpio.open(pin.id, pin.mode, pin.value)
  })

  rpio.open(5, rpio.INPUT, rpio.PULL_DOWN)

  /*
  setInterval(() => {
    console.log(rpio.read(5))
  }, 500)
  */

  rpio.poll(5, pin => {
    console.log('PIN 5 =', rpio.read(pin))
    if (rpio.read(pin)) {
      //exec('sudo shutdown -h now')
    }
  })

  this.powerOn = function (id) {
    rpio.open(id, rpio.OUTPUT, rpio.LOW)
    this.pins = this.pins.filter(pin => {
      if (pin.id === id) {
        pin.mode = rpio.OUTPUT
        pin.value = rpio.LOW
      }

      return pin
    })
  }

  this.powerOff = function (pin) {
    rpio.open(pin, rpio.OUTPUT, rpio.HIGH)
    this.pins = this.pins.filter(pin => {
      if (pin.id == id) {
        pin.mode = rpio.OUTPUT
        pin.value = rpio.HIGH
      }

      return pin
    })
  }

  this.powerToggle = function (id) {
    const state = rpio.read(id)
    rpio.open(id, rpio.OUTPUT, +!state)
    this.pins = this.pins.filter(pin => {
      if (pin.id == id) {
        pin.mode = rpio.OUTPUT
        pin.value = +!pin.value
      }

      return pin
    })
  }

  this.getPins = function () {
    return this.pins
  }

  this.getPinState = function (id) {
    return this.pins.filter(pin => pin.id === index)[0]
  }
}
