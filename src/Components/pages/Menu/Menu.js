import React, { useEffect } from 'react'
// import Menu, { SubMenu, MenuItem } from './MenuModule/index'
import Menu, { SubMenu, MenuItem } from './MenuModule'
import {
    migrateInnerChildren,
    returnInnerElements,
    getInnerElement,
} from '../utils/hydrateUtils'

const activeKeys = []

const MenuElement = props => {
    console.log(props.elementsPath)
    useEffect(() => {
        if (
            !document.getElementById(
                '__menu__popup__container__' + props.element.id
            )
        ) {
            const container = document.createElement('div')
            container.setAttribute(
                'id',
                '__menu__popup__container__' + props.element.id
            )
            container.setAttribute(
                'style',
                'z-index:100000;position: absolute;'
            )
            document.body.appendChild(container)
        }

        returnInnerElements(['websitermenuoverflow_'], props)
    })
    const builtItems = props.builtItems

    activeKeys.length = 0
    const innerItems = builtItems.map((item, index) => {
        const key = item.id + '_' + index
        if (item.children.length === 0) {
            if (
                item.url === props.pageInStructure.relUrl ||
                (item.url === '' && props.pageInStructure.homepage)
            )
                activeKeys.push(key)
            return (
                <MenuItem
                    key={key}
                    className={item.properties ? item.properties.class : ''}
                    href={item.url}
                    target={
                        item.properties &&
                        (item.properties.newTab ? '_blank' : '_self')
                    }
                >
                    {item.name}
                </MenuItem>
            )
        } else {
            return (
                <SubMenu1
                    item={item}
                    key={key}
                    pageInStructure={props.pageInStructure}
                />
            )
        }
    })
    migrateInnerChildren(['websitermenuoverflow_'], props)
    return (
        <Menu
            prefixCls={'systemclass_menu'}
            getPopupContainer={() =>
                document.getElementById(
                    '__menu__popup__container__' + props.element.id
                )
            }
            selectable={false}
            activeKeys={activeKeys}
            overflowedIndicator={getInnerElement(
                'websitermenuoverflow_',
                'overflowIcon',
                {},
                props
            )}
            inEntry={props.inEntry}
            {...props.refinedProperties}
        >
            {innerItems}
        </Menu>
    )
}

const SubMenu1 = props => {
    const { ...other } = props
    return (
        <SubMenu {...other} title={props.item.name}>
            {props.item.children.map((item, index) => {
                const key = item.id + '_' + index
                if (item.children.length === 0) {
                    if (
                        item.url === props.pageInStructure.relUrl ||
                        (item.url === '' && props.pageInStructure.homepage)
                    )
                        activeKeys.push(key)
                    return (
                        <MenuItem
                            key={key}
                            className={
                                item.properties ? item.properties.class : ''
                            }
                            href={item.url}
                            target={
                                item.properties &&
                                (item.properties.newTab ? '_blank' : '_self')
                            }
                        >
                            {item.name}
                        </MenuItem>
                    )
                } else {
                    return (
                        <SubMenu2
                            {...other}
                            item={item}
                            key={key}
                            pageInStructure={props.pageInStructure}
                        />
                    )
                }
            })}
        </SubMenu>
    )
}

const SubMenu2 = SubMenu1

export default MenuElement
