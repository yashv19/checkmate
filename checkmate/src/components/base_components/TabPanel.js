import React from 'react'

const TabPanel = ({ children, value, index, ...rest }) => {
    return (
        <>
            {value === index &&
                <>
                    {children}
                </>
            }
        </>
    )
}

export default TabPanel;
