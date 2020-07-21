import React, { SFC } from 'react'
import { isEmpty } from 'lodash'

type DefaultProps = Readonly<typeof defaultProps>

const defaultProps: IResponsiveIcon = {
  icon: '',
  alt: '',
  className: '',
}

const ResponsiveIcon: SFC<IResponsiveIcon & DefaultProps> = ({
  icon,
  alt,
  className,
}) => {

  if (typeof icon === 'string') {
    if (!isEmpty(icon)) {
      return <img alt={alt} className={className} src={icon} />
    }
  } else if (typeof icon === 'object') {
    return (
      <img
        alt={alt}
        className={className}
        src={icon.x1}
        srcSet={`${icon.x2} 2x, ${icon.x3} 3x`}
      />
    )
  }
  return <></>
}

ResponsiveIcon.defaultProps = defaultProps

export default ResponsiveIcon