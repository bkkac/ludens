import React from 'react'
import emiter from 'configs/emiter'
import event from 'constants/event'
import { ModalProps } from 'react-bootstrap/Modal'
import Modal from './Modal.component'
import { Success } from './components/Success'
import { Error } from './components/Error'

const success = {
  show: ({ action, actionText, description, title }: ISuccessModal) => {
    const modalProps: ModalProps = {
      size: 'sm',
    }
    return emiter.emit(event.MODAL, {
      state: 'show',
      extraProps: modalProps,
      component: (
        <Success
          title={title}
          description={description}
          action={action}
          actionText={actionText}
        />
      ),
    })
  },
  hide: () => emiter.emit(event.MODAL, { state: 'hide' }),
}

const error = {
  show: ({ action, actionText, description, title }: IErrorModal) => {
    const modalProps: ModalProps = {
      size: 'sm',
    }
    return emiter.emit(event.MODAL, {
      state: 'show',
      extraProps: modalProps,
      component: (
        <Error
          title={title}
          description={description}
          action={action}
          actionText={actionText}
        />
      ),
    })
  },
  hide: () => emiter.emit(event.MODAL, { state: 'hide' }),
}

export default {
  Core: Modal,
  success,
  error,
}