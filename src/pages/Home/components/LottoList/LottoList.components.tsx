import React, { SFC } from 'react'
import { map } from 'lodash'
import { LottoResultCard } from 'components'
import './lottoList.style.scss'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoProps = {
  data: [],
}

const LottoList: SFC<ILottoProps & DefaultProps> = (props) => {

  const LottoCardComponents = map(props.data, (lotto, index) => (
    <div key={`lotto-card-${index}`} className="m3-b">
      <div className="row">
        <LottoResultCard lotto={lotto} />
      </div>
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