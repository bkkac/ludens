import React, { SFC } from 'react'
import { map } from 'lodash'
import { LottoCard } from 'components'
import './lottoList.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoListProps = {
  data: [],
}

const LottoList: SFC<ILottoListProps & DefaultProps> = (props) => {

  const LottoCardComponents = map(props.data, (lotto, index) => (
    <div key={`lotto-card-${index}`} className="container card-section-wrapper m3-b">
      {/* <div className="container"> */}
      <LottoCard type={lotto.code as LottoType} data={lotto} />
      {/* </div> */}
    </div>
  ))

  return (
    <div className="lotto-list-container p4-t">
      {LottoCardComponents}
    </div>
  )
}

LottoList.defaultProps = defaultProps

export default LottoList