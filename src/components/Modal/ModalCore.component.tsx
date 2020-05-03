import React from 'react'
import emiter from 'configs/emiter'
import event from 'constants/event'
import Modal from './Modal.component'
import { Success } from './components/Success'

const success = {
  show: ({ action, actionText, description, title }: ISuccessModal) =>
    emiter.emit(event.MODAL, {
      state: 'show',
      component: (
        <Success
          title={title}
          description={description}
          action={action}
          actionText={actionText}
        />
      ),
    }),
  hide: () => emiter.emit(event.MODAL, { state: 'hide' }),
}

export default {
  Core: Modal,
  success,
}