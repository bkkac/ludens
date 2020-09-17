import React, { FC } from 'react'
import { Badge } from 'components'
import { includes, split, groupBy, map, isEmpty } from 'lodash'
import colors from 'constants/colors'
import { LOTTO_GAME_TYPE_NAME, LOTTO_TYPE, LOTTO_FLAG_ALPHA } from 'constants/variables'
import LottoFlags from 'assets/images/global/flags'
import './lottoResultCard.style.scss'
import { date } from 'utils'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoResultCard = {
  lotto: {
    code: 'GOVN',
    createdAt: '',
    lotto: [],
  },
}

const constants = {
  lotto: 'หวย',
}

const LottoResultCard: FC<ILottoResultCard & DefaultProps> = (props) => {

  const { lotto } = props

  const {
    code,
    createdAt,
    lotto: lottos,
  } = lotto

  const normalizationCode: TLottoType = includes(code, 'YEGEE') ? 'YEGEE' : code
  const dateDisplay = date.calibratingTime(createdAt).format('Do MMM YY')

  const groupLottoTypes: { [type in TLottoGameType]: ILottoResult[] } =
    groupBy<ILottoResult>(lottos, 'type') as { [type in TLottoGameType]: ILottoResult[] }

  const NumberComponent =
    ({ lottoNumber, type, gameType }: { lottoNumber: ILottoResult[]; type: TLottoType; gameType: TLottoGameType }) => {
      if (isEmpty(lottoNumber) || typeof lottoNumber === 'undefined') {
        return <></>
      }
      return (
        <>
          <div className="row pt-1">
            <div className="col text-center">
              <h5 className="secondary-text" id={`lotto-name-${type}-${gameType}`}>
                {LOTTO_GAME_TYPE_NAME[gameType]}
              </h5>
            </div>
          </div>
          <div className="row m1-t">
            <div className="col text-center">
              {
                map(lottoNumber, (numberResult: ILottoResult, resultIndex: number) => (
                  <h1
                    className="lotto secondary-blue-text"
                    key={`lotto-number-${type}-${gameType}-${resultIndex}`}
                    id={`lotto-number-${type}-${gameType}-${resultIndex}`}
                  >
                    {numberResult.numbers}
                  </h1>
                ))
              }
            </div>
          </div>
        </>
      )
    }

  const LottoNumbersFormat = () => {
    switch (normalizationCode) {
      case 'GOVN':
        return (
          <>
            <NumberComponent
              type={normalizationCode}
              lottoNumber={groupLottoTypes.ONE_AWARD}
              gameType="ONE_AWARD"
            />
            <NumberComponent
              type={normalizationCode}
              lottoNumber={groupLottoTypes.TWO_DOWN}
              gameType="TWO_DOWN"
            />
            <div className="row">
              <div className="col">
                <NumberComponent
                  type={normalizationCode}
                  lottoNumber={groupLottoTypes.THREE_FRONT}
                  gameType="THREE_FRONT"
                />
              </div>
              <div className="col">
                <NumberComponent
                  type={normalizationCode}
                  lottoNumber={groupLottoTypes.THREE_BACK}
                  gameType="THREE_BACK"
                />
              </div>
            </div>
          </>
        )
      case 'GSB':
      case 'BAAC':
      case 'TH_SHARE_MORNING':
      case 'TH_SHARE_MIDDAY':
      case 'TH_SHARE_AFTERNOON':
      case 'TH_SHARE_EVENING':
      case 'NAT_SHARE_DOWNJON':
      case 'NAT_SHARE_EGYPT':
      case 'NAT_SHARE_GERMANY':
      case 'NAT_SHARE_NIKAII_MORNING':
      case 'NAT_SHARE_NIKAII_AFTERNOON':
      case 'NAT_SHARE_CHINA_MORNING':
      case 'NAT_SHARE_CHINA_AFTERNOON':
      case 'NAT_SHARE_TAIWAN':
      case 'NAT_SHARE_KOREA':
      case 'NAT_SHARE_SINGAPORE':
      case 'NAT_SHARE_INDIA':
      case 'NAT_SHARE_HANOI_SPECIAL':
      case 'NAT_SHARE_MALAY':
      case 'NAT_SHARE_VIETNAM_HANOI':
      case 'NAT_SHARE_VIETNAM_HANOI_VIP':
      case 'NAT_SHARE_HANOI_4D':
      case 'NAT_SHARE_RUSSIA':
      case 'NAT_SHARE_ENGLISH':
      case 'NAT_SHARE_HUNGSENG_MORNING':
      case 'NAT_SHARE_HUNGSENG_AFTERNOON':
      case 'NAT_SHARE_LAO':
      case 'YEGEE':
        return (
          <div className="row">
            <div className="col">
              <NumberComponent
                type={normalizationCode}
                lottoNumber={groupLottoTypes.THREE_UP}
                gameType="THREE_UP"
              />
            </div>
            <div className="col">
              <NumberComponent
                type={normalizationCode}
                lottoNumber={groupLottoTypes.TWO_DOWN}
                gameType="TWO_DOWN"
              />
            </div>
          </div>
        )
      case 'LAO':
        return (
          <div className="row">
            <div className="col">
              <NumberComponent
                type={normalizationCode}
                lottoNumber={groupLottoTypes.FOUR_SUIT}
                gameType="FOUR_SUIT"
              />
            </div>
          </div>
        )
      default:
        return <></>
    }
  }

  const FlagIcon = LottoFlags[LOTTO_FLAG_ALPHA[normalizationCode]].Icon
  const gameName = normalizationCode === 'YEGEE'
    ? `${constants.lotto}${LOTTO_TYPE[normalizationCode]}`
    : LOTTO_TYPE[normalizationCode]
  const gameRound = normalizationCode === 'YEGEE'
    ? Number(split(code, '_')[1])
    : ''

  return (
    <div className="col-12">
      <div className="lotto-card-container secondary-bg p3">
        <div className="row m2-b">
          <div className="col text-left d-flex flex-row align-items-center">
            <h4>{gameName} {gameRound}</h4>
            <img alt="lotto-flag" src={FlagIcon} className="flag-icon" />
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