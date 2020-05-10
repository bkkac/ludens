import React, { Component } from 'react'
import Emitter from 'configs/emiter'
import event from 'constants/event'
import ModalCore from 'react-bootstrap/Modal'
import './modal.style.scss'

class Modal extends Component<{}, IModalState> {

  state: IModalState = {
    show: false,
    RenderComponent: <></>,
    extraProps: {},
  }

  componentDidMount() {
    Emitter.on(event.MODAL, this.onEventSubscribed)
  }

  componentWillUnmount() {
    Emitter.off(event.MODAL)
  }

  onEventSubscribed = ({ state, component, extraProps }: IModalShowProps | IModalHideProps) => {
    if (state === 'show') {
      if (this.state.show) {
        return this.hideModal(() => {
          this.setState({ RenderComponent: component!, extraProps }, () => { this.setState({ show: true }) })
        })
      }
      this.setState({ RenderComponent: component! }, () => { this.setState({ show: true }) })
    } else if (state === 'hide') {
      this.hideModal()
    }
  }

  hideModal = (callback?: () => void) => {
    this.setState({
      show: false,
    }, () => {
      this.setState({ extraProps: {}, RenderComponent: <></> }, callback)
    })
  }

  render() {
    const RenderComponent = this.state.RenderComponent

    return (
      <>
        <ModalCore
          show={this.state.show}
          centered
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          onHide={() => this.setState({ show: false })}
          {...this.state.extraProps}
        >
          {RenderComponent}
        </ModalCore>
      </>
    )
  }
}

export default Modal