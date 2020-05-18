import React from 'react'

export const migrateInnerChildren = (tags, props) => {
    if (props.inEntry && document && document.body) {
        for (let tag of tags) {
            console.log('migrate')
            console.log(props.elementsPath)
            const tagPath = tag + props.elementsPath
            console.log(tagPath)
            const oldDiv = document.querySelector(
                'div[websiterforprocessing="' + tagPath + '"]'
            )
            if (!oldDiv) return
            let newDiv = document.querySelector(
                'div[websiterforprocessing="' + tagPath + '_Temp"]'
            )
            if (!newDiv) {
                newDiv = document.createElement('div')
                newDiv.setAttribute('websiterforprocessing', tagPath + '_Temp')
                newDiv.setAttribute(
                    'style',
                    'position:absolute;left:-10000px;top:-10000px;width:0px;height:0px;display:none;'
                )
                document.body.appendChild(newDiv)
            }
            while (oldDiv.childNodes.length > 0) {
                newDiv.appendChild(oldDiv.childNodes[0])
            }
        }
    }
}

export const returnInnerElements = (tags, props) => {
    if (props.inEntry && document && document.body) {
        for (let tag of tags) {
            console.log('return')
            console.log(props.elementsPath)
            const tagPath = tag + props.elementsPath

            const newDiv = document.querySelector(
                'div[websiterforprocessing="' + tagPath + '"]'
            )
            const oldDiv = document.querySelector(
                'div[websiterforprocessing="' + tagPath + '_Temp"]'
            )
            if (!oldDiv || !newDiv) return
            while (oldDiv.childNodes.length > 0) {
                newDiv.appendChild(oldDiv.childNodes[0])
            }
            oldDiv.parentElement.removeChild(oldDiv)
        }
    }
}

export const getInnerElement = (tag, attr, addProps, props) => {
    console.log('get')
    console.log(props.elementsPath)
    if (props.inEntry) {
        const element = document.querySelector(
            'div[websiterforprocessing="' + tag + props.elementsPath + '"]'
        )
        return (
            <div
                websiterforprocessing={tag + props.elementsPath}
                dangerouslySetInnerHTML={{
                    __html: element.innerHTML,
                }}
                {...(addProps ? addProps : {})}
            />
        )
    } else {
        return (
            <div websiterforprocessing={tag + props.elementsPath}>
                {props[attr]}
            </div>
        )
    }
}
