import React from 'react'

export const migrateInnerChildren = (tags, props) => {
    if (props.inEntry && document && document.body) {
        for (let tag of tags) {
            const tagPath = tag + props.elementsPath
            const oldDiv = document.querySelector(
                'div[websiterforprocessing="' + tagPath + '"]'
            )
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
            const tagPath = tag + props.elementsPath

            const newDiv = document.querySelector(
                'div[websiterforprocessing="' + tagPath + '"]'
            )
            const oldDiv = document.querySelector(
                'div[websiterforprocessing="' + tagPath + '_Temp"]'
            )
            while (oldDiv.childNodes.length > 0) {
                newDiv.appendChild(oldDiv.childNodes[0])
            }
            oldDiv.parentElement.removeChild(oldDiv)
        }
    }
}

export const getInnerElement = (tag, attr, addProps, props) =>
    props.inEntry ? (
        <div
            websiterforprocessing={tag + props.elementsPath}
            dangerouslySetInnerHTML={{
                __html: document.querySelector(
                    'div[websiterForProcessing="' +
                        tag +
                        props.elementsPath +
                        '"]'
                ).innerHTML,
            }}
            {...(addProps ? addProps : {})}
        />
    ) : (
        <div
            websiterforprocessing={tag + props.elementsPath}
            {...(addProps ? addProps : {})}
        >
            {props[attr]}
        </div>
    )
