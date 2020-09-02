import React, { Component } from 'react'
import { reduce, isEmpty, findIndex } from 'lodash'
import { ALink, Collapse } from 'components'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import parse from 'html-react-parser'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import colors from 'constants/colors'
import qas from 'assets/json/qa'
import './qandA.style.scss'

const constants = {
  back: 'กลับ',
  qa: 'ถาม - ตอบ',
}

declare interface QandAState {
  collapseState: { type: TQAType; state: boolean }[]
}

class QandAContainer extends Component<RouteComponentProps<{ type: TQAType }>, QandAState> {

  state: QandAState = {
    collapseState: qas.map(qa => ({ type: qa.type, state: false })),
  }

  componentDidMount() {
    const qaType = this.props.match.params.type
    if (!isEmpty(qaType)) {
      const expandIndex = findIndex(this.state.collapseState, ['type', qaType])
      const expandObject = qas[expandIndex]
      if (isEmpty(expandObject)) { return }
      const newExpandObject: { type: TQAType; state: boolean } = { ...expandObject, state: true }
      const newCallapseState = [...this.state.collapseState]
      newCallapseState[expandIndex] = newExpandObject
      this.setState({ collapseState: newCallapseState })
    }
  }

  onPressBack = () => {
    this.props.history.goBack()
  }

  onStateCollapseChanged = (state: boolean, index: number) => {
    const changedObject = this.state.collapseState[index]
    if (isEmpty(changedObject)) { return }
    const newCollapseState = [...this.state.collapseState]
    newCollapseState[index] = { ...changedObject, state }
    this.setState({ collapseState: newCollapseState })
  }

  renderQAContent = () => {
    const qaContent: IQAContent[] = qas
    const ContentComponent = qaContent.map((content, indexContent) => {
      const collapseState = this.state.collapseState[indexContent]
      return (
        <Collapse
          expanded={collapseState.state}
          key={`qa-${indexContent}-${content.id}`}
          onStateChanged={state => this.onStateCollapseChanged(state, indexContent)}
          RenderHeaderComponent={this.renderHeader(content.title, collapseState.state)}
          RenderBodyComponent={this.renderContent(content.content)}
        />
      )
    })
    return (<>{ContentComponent}</>)
  }

  renderHeader = (title: string, state: boolean) => (): JSX.Element => (
    <div className="d-flex flex-row p2-x p2-y align-items-center qa-header-wrapper">
      <h3 className="flex">{title}</h3>
      <FontAwesomeIcon
        icon={faChevronRight}
        className={`chevron-right-icon ${state ? 'expanded' : ''} primary-blue-text`}
      />
    </div>
  )

  renderContent = (content: string = '') => (): JSX.Element => {
    return (
      <div className="primary-bg flex">
        {parse(reduce<string, string>(content, (prev, curr) => prev.concat(curr), ''))}
      </div>
    )
  }

  render() {
    const QAContentComponent = this.renderQAContent
    return (
      <div className="qa-container primary-bg">
        <div className="container">
          <div className="row">
            <div className="col">
              <ALink id="backto-previus-page" color={colors.PRIMARY_RED} bold onClick={this.onPressBack}>
                <FontAwesomeIcon icon={faChevronLeft} className="m1-r" />
                {constants.back}
              </ALink>
            </div>
          </div>
          <div className="row m4-t">
            <div className="col">
              <h2>{constants.qa}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="border-rounded secondary-bg m3-t p1-y">
                <QAContentComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default QandAContainer