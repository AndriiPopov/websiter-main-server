import React, { useEffect } from 'react'
// import Menu, { SubMenu, MenuItem } from './MenuModule/index'
import Menu, { SubMenu, MenuItem } from './MenuModule'
import buildItemsForMenu from './methods/buildItemsForMenu'

const activeKeys = []

const MenuElement = props => {
    useEffect(() => {
        if (!document.getElementById('__menu__popup__container__')) {
            const container = document.createElement('div')
            container.setAttribute('id', '__menu__popup__container__')
            container.setAttribute(
                'style',
                'z-index:100000;position: absolute;'
            )
            document.body.appendChild(container)
        }
    })
    const builtItems = buildItemsForMenu(props)

    activeKeys.length = 0
    const innerItems = builtItems.map((item, index) => {
        const key = item.id + '_' + index
        if (item.children.length === 0) {
            if (
                item.url === props.mD.baseUrl + props.pageInStructure.relUrl ||
                (item.url === props.mD.baseUrl &&
                    props.pageInStructure.homepage)
            )
                activeKeys.push(key)
            return (
                <MenuItem
                    key={key}
                    className={item.properties ? item.properties.itemClass : ''}
                >
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            display: 'block',
                        }}
                        href="item.url"
                        target={item.properties.newTab ? '_blank' : '_self'}
                        // onClick={() =>
                        //     item.properties.newTab
                        //         ? window.open(item.url, '_blank')
                        //         : (window.location = item.url)
                        // }
                    >
                        {item.name}
                    </div>
                </MenuItem>
            )
        } else {
            return (
                <SubMenu1
                    item={item}
                    key={key}
                    pageInStructure={props.pageInStructure}
                    mD={props.mD}
                />
            )
        }
    })
    return (
        <Menu
            prefixCls={'systemclass_menu'}
            getPopupContainer={() =>
                document.getElementById('__menu__popup__container__')
            }
            topMenuBlockClasses={props.refinedProperties.topMenuBlockClasses}
            topMenuItemClasses={props.refinedProperties.topMenuItemClasses}
            topMenuItemActiveClasses={
                props.refinedProperties.topMenuItemActiveClasses
            }
            popupMenuBlockClasses={
                props.refinedProperties.popupMenuBlockClasses
            }
            popupMenuItemClasses={props.refinedProperties.popupMenuItemClasses}
            popupMenuItemActiveClasses={
                props.refinedProperties.popupMenuItemActiveClasses
            }
            mode={props.refinedProperties.mode}
            selectable={false}
            triggerSubMenuAction={props.refinedProperties.trigger}
            activeKeys={activeKeys}
            overflowedIndicator={props.overflowIcon}
        >
            {innerItems}
        </Menu>
    )
}

const SubMenu1 = props => {
    const { ...other } = props
    return (
        <SubMenu {...other} title={props.item.name} mD={props.mD}>
            {props.item.children.map((item, index) => {
                const key = item.id + '_' + index
                if (item.children.length === 0) {
                    if (
                        item.url ===
                            props.mD.baseUrl + props.pageInStructure.relUrl ||
                        (item.url === props.mD.baseUrl &&
                            props.pageInStructure.homepage)
                    )
                        activeKeys.push(key)
                    return (
                        <MenuItem key={key}>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    display: 'block',
                                }}
                                href="item.url"
                                target={
                                    item.properties.newTab ? '_blank' : '_self'
                                }
                                // onClick={() =>
                                //     item.properties.newTab
                                //         ? window.open(item.url, '_blank')
                                //         : (window.location = item.url)
                                // }
                            >
                                {item.name}
                            </div>
                        </MenuItem>
                    )
                } else {
                    return (
                        <SubMenu2
                            {...other}
                            item={item}
                            key={key}
                            pageInStructure={props.pageInStructure}
                            mD={props.mD}
                        />
                    )
                }
            })}
        </SubMenu>
    )
}

const SubMenu2 = SubMenu1

export default MenuElement
