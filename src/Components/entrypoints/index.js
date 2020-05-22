import React from 'react'

import { hydrate } from 'react-dom'

import Drawer from '../pages/Drawer/Drawer'
import Menu from '../pages/Menu/Menu'
import BasicForm from '../pages/BasicForm/BasicForm'

const getDepth = script => {
    let i = 0
    let el = script
    while (el.parentNode) {
        el = el.parentNode
        i++
    }
    return i
}

const scriptsForHydrate = Array.from(
    document.querySelectorAll('script[websiterforprocessing]')
)
    .map(script => ({
        script,
        depth: getDepth(script),
    }))
    .sort(function(a, b) {
        return a.depth - b.depth
    })

for (let script of scriptsForHydrate) {
    const scriptDom = script.script
    switch (scriptDom.getAttribute('websiterforprocessing')) {
        case 'websiterDrawer':
            hydrate(
                <Drawer
                    {...window[
                        'websiterDrawerProps_' +
                            scriptDom.getAttribute('websiterpropsforelement')
                    ]}
                    inEntry={true}
                />,
                scriptDom.parentNode
            )
            break
        case 'websiterMenu':
            hydrate(
                <Menu
                    {...window[
                        'websiterMenuProps_' +
                            scriptDom.getAttribute('websiterpropsforelement')
                    ]}
                    inEntry={true}
                />,
                scriptDom.parentNode
            )
            break

        case 'websiterBasicForm':
            hydrate(
                <BasicForm
                    {...window[
                        'websiterBasicFormProps_' +
                            scriptDom.getAttribute('websiterpropsforelement')
                    ]}
                    inEntry={true}
                />,
                scriptDom.parentNode
            )
            break
        default:
            break
    }
}
