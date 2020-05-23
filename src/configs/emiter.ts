import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()

const Emitter = {
  on: (event: any, fn: (data: IModalShowProps | IModalHideProps) => void) =>
    eventEmitter.on(event, fn),
  once: (event: any, fn: (data: IModalShowProps | IModalHideProps) => void) =>
    eventEmitter.once(event, fn),
  off: (event: any, fn?: (data: IModalShowProps | IModalHideProps) => void) =>
    eventEmitter.off(event, fn),
  emit: (event: any, payload: IModalShowProps | IModalHideProps) =>
    eventEmitter.emit(event, payload),
}

Object.freeze(Emitter);

export default Emitter;