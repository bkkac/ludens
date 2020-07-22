import React, { SFC } from 'react'
import { Badge } from 'components'
import moment from 'moment'
import { replace } from 'lodash'
import colors from 'constants/colors'
import { LOTTO_GAME_TYPE, LOTTO_TYPE } from 'constants/variables'
import ThaiFlagIcon from 'assets/images/flags/thailand.png'
import './lottoResultCard.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoResultCard = {
  lotto: {
    code: 'GOVN',
    createdAt: '',
    lotto: [],
  },
}

const LottoResultCard: SFC<ILottoResultCard & DefaultProps> = (props) => {

  const { lotto } = props

  const {
    code,
    createdAt,
    lotto: lottos,
  } = lotto

  const dateDisplay = moment(replace(createdAt, /\s/g, '')).format('Do MMM YY')

  const NumberComponent = ({ lottoNumber, type }: { lottoNumber: ILottoResult; type: TLottoType }) => (
    <>
      <div className="row pt-1">
        <div className="col text-center lotto-title">
          <h5 className="secondary-text" id={`lotto-name-${type}-${lottoNumber.type}`}>
            {LOTTO_GAME_TYPE[lottoNumber.type]}
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <h1 className="lotto secondary-blue-text" id={`lotto-number-${type}-${lottoNumber.type}`}>
            {lottoNumber.numbers}
          </h1>
        </div>
      </div>
    </>
  )

  const LottoNumbersFormat = () => {
    switch (code) {
      case 'GOVN':
        return (
          <>
            <NumberComponent type={code} lottoNumber={lottos[0] || {}} />
            <NumberComponent type={code} lottoNumber={lottos[1] || {}} />
            <div className="row">
              <div className="col">
                <NumberComponent type={code} lottoNumber={lottos[2] || {}} />
              </div>
              <div className="col">
                <NumberComponent type={code} lottoNumber={lottos[3] || {}} />
              </div>
            </div>
          </>
        )
      case 'GSB':
      case 'BAAC':
        return (
          <div className="row">
            {lottos.map((lottoResult, index) => (
              <div className="col" key={`bank-${lottoResult.type}-${index}`}>
                <NumberComponent type={code} lottoNumber={lottoResult} />
              </div>
            ))}
          </div>
        )
      case 'LAO_SUITE':
        return (
          <>{lottos.map((lottoResult, index) =>
            <NumberComponent type={code} key={`lao-${lottoResult.type}-${index}`} lottoNumber={lottoResult} />)}</>
        )
      case 'TH_SHARE_AFTERNOON':
      case 'TH_SHARE_EVENING':
      case 'TH_SHARE_MIDDAY':
      case 'TH_SHARE_MORNING':
      case 'YEGEE':
        return <></>
      default:
        return <></>
    }
  }

  return (
    <div className="col-12">
      <div className="lotto-card-container secondary-bg p3">
        <div className="row mb-2">
          <div className="col text-left d-flex flex-row align-items-center">
            <h3>{LOTTO_TYPE[lotto.code]}</h3>
            <img alt="thailand" src={ThaiFlagIcon} className="flag-icon" />
          </div>
          <div className="col-auto text-right m-auto">
            <Badge text={dateDisplay} backgroundColor={colors.PRIMARY_GREEN} />
          </div>
        </div>
        <LottoNumbersFormat />
      </div>
    </div>
  )
}

export default LottoResultCard