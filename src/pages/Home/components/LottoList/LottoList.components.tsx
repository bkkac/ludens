import React, { FC } from 'react'
import { map } from 'lodash'
import { LottoResultCard } from 'components'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: ILottoProps = {
  data: [],
}

const LottoList: FC<ILottoProps & DefaultProps> = (props) => {

  const LottoCardComponents = map(props.data, (lotto, index) => (
    <div key={`lotto-card-${index}`} className="m3-b">
      <div className="row">
        <LottoResultCard lotto={lotto} />
      </div>
    </div>
  ))

  return (
    <div className="p4-t">
      {LottoCardComponents}
    </div>
  )
}

LottoList.defaultProps = defaultProps

export default LottoList