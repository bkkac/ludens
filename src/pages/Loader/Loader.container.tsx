import React, { Component } from 'react'
import Loader from 'react-loading'
import './loader.style.scss'

class LoaderContainer extends Component<ILoaderProps, ILoaderState> {

  state: ILoaderState = {
    loading: false,
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  componentDidUpdate(prevProps: ILoaderProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ loading: this.props.isLoading })
    }
  }

  render() {
    const containerClass = this.state.loading
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