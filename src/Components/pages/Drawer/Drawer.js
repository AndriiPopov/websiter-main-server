import React, { useState } from 'react'
import DrawerElement from 'rc-drawer'

const Drawer = props => {
    const [state, setState] = useState()

    const onTouchEnd = () => {
        setState(false)
    }
    const onSwitch = () => {
        setState(!state)
    }
    return (
        <>
            {props.handler && <div onClick={onSwitch}>{props.handler}</div>}
            <DrawerElement
                open={state}
                onClose={onTouchEnd}
                handler={props.autoHandler}
                level={null}
                getContainer={() =>
                    props.refinedProperties.container
                        ? document.getElementById(
                              props.refinedProperties.container
                          ) || document.body
                        : document.body
                }
                onHandleClick={onSwitch}
                {...props.refinedProperties}
            >
                {props.content}
            </DrawerElement>
        </>
    )
}

export default Drawer
