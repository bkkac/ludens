import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()

const Emitter = {
  on: <T = any>(event: TEvent, fn: (data: T) => void) =>
    eventEmitter.on(event, fn),
  once: <T = any>(event: TEvent, fn: (data: T) => void) =>
    eventEmitter.once(event, fn),
  off: <T = any>(event: TEvent, fn?: (data: T) => void) =>
    eventEmitter.off(event, fn),
  emit: <T = any>(event: TEvent, payload: T) =>
    eventEmitter.emit(event, payload),
}

Object.freeze(Emitter);

export default Emitter;