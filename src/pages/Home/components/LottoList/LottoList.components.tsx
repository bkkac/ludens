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
    <div key={`lotto-card-${index}`} className="container m3-b">
      <LottoCard lotto={lotto} />
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