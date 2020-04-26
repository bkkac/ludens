import React, { SFC } from 'react'

const ResponsiveIcon: SFC<IResponsiveIcon> = ({
  icon,
  alt,
  className,
}) => {

  if (typeof icon === 'string') {
    return <img alt={alt} className={className} src={icon} />
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

export default ResponsiveIcon