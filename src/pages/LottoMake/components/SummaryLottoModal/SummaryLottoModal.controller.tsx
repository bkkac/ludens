import React from 'react'
import emiter from 'configs/emiter'
import event from 'constants/event'
import { ModalProps } from 'react-bootstrap/Modal'
import SummaryLottoModalComponent from './SummaryLottoModal.component'

const summaryLottoModalController = {
  show: ({
    betRates,
    lottoList,
    onClickBet,
    onClickClose,
  }: ISummaryLottoModalProps) => {
    const modalProps: ModalProps = {
      size: 'sm',
      scrollable: true,
    }
    return emiter.emit(event.MODAL, {
      state: 'show',
      extraProps: modalProps,
      component: (
        <SummaryLottoModalComponent
          betRates={betRates}
          lottoList={lottoList}
          onClickBet={onClickBet}
          onClickClose={onClickClose}
        />
      ),
    })
  },
  hide: () => emiter.emit(event.MODAL, { state: 'hide' }),
}

export default summaryLottoModalController