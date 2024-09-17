import React from 'react'

const TabPanel = ({children, value, index, ...rest}) => {
  return (
    <div
        hidden={value !== index}
        {...rest}
    >
        {children}
    </div>
  )
}

export default TabPanel;
