import React, { Component } from 'react'
import Loader from 'react-loading'
import './loader.style.scss'

class LoaderContainer extends Component<ILoader> {

  render() {
    const containerClass = this.props.isLoading
      ? 'loader-container show'
      : 'loader-container hide'

    return (
      <div className={containerClass}>
        <Loader
          type="bubbles"
          color="white"
          height="80px"
          width="80px"
        />
      </div>
    )
  }
}

export default LoaderContainer