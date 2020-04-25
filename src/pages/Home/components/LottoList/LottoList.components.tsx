import React, { SFC } from 'react'
import { LottoCard } from 'components'
import './lottoList.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoListProps = {
  data: [],
}

const LottoList: SFC<ILottoListProps & DefaultProps> = (props) => {

  const LottoCardComponents = props.data.map((lotto, index) => (
    <div key={`lotto-card-${index}`} className="card-section-wrapper mb-4">
      <div className="container">
        <LottoCard type={lotto.code as LottoType} data={lotto} />
      </div>
    </div>
  ))

  return (
    <div className="lotto-list-container">
      {LottoCardComponents}
    </div>
  )
}

LottoList.defaultProps = defaultProps

export default LottoList