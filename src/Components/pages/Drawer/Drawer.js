import React, { useState, useEffect } from 'react'
import Sidebar from 'react-sidebar'
import {
    migrateInnerChildren,
    returnInnerElements,
    getInnerElement,
} from '../utils/hydrateUtils'

const Drawer = props => {
    const [state, setState] = useState()

    const innerElements = ['websiterdrawercontent_', 'websiterdrawerhandler_']
    migrateInnerChildren(innerElements, props)

    const onSwitch = () => {
        setState(!state)
    }

    useEffect(() => {
        returnInnerElements(innerElements, props)
    })

    return (
        <>
            <Sidebar
                sidebar={getInnerElement(
                    'websiterdrawercontent_',
                    'content',
                    {},
                    props
                )}
                open={state}
                onSetOpen={() => setState()}
                styles={{ sidebar: { background: 'white' } }}
            >
                {getInnerElement(
                    'websiterdrawerhandler_',
                    'handler',
                    {
                        onClick: onSwitch,
                    },
                    props
                )}
            </Sidebar>
        </>
    )
}

export default Drawer
