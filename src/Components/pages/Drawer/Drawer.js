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
    console.log(props)
    return (
        <>
            {props.handler && <div onClick={onSwitch}>{props.handler}</div>}
            <DrawerElement
                open={state}
                onClose={onTouchEnd}
                handler={props.elementValues.autoHandler}
                level={null}
                width="200px"
                getContainer={() =>
                    props.elementValues.container
                        ? document.getElementById(
                              props.elementValues.container
                          ) || document.body
                        : document.body
                }
                onHandleClick={onSwitch}
            >
                {props.content}
            </DrawerElement>
        </>
    )
}

export default Drawer
