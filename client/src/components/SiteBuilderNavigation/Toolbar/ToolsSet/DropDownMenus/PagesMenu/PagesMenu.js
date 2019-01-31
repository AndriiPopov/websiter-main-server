import React from 'react';
import { connect } from 'react-redux';

import * as classes from './PagesMenu.module.css';
import ToolSet from '../../ToolsSet';
import Pages from '../../TopMenuSections/Pages';
import Aux from '../../../../../../hoc/Aux';
import PagesMenuList from './PagesMenuList/PagesMenuList';
import Spinner from '../../../../../UI/Spinner/Spinner';

export const PagesMenu = props => {
    const items = props.pagesStructure.map( page => {
        return {
            ...page,
            name: props.pagesObjects[page.id].name
        }
    });
    return (
        <Aux>
            <header className={classes.Toolbar}>
                <div className={classes.ToolSetsContainer}>
                    <ToolSet isActive >
                        <Pages />
                    </ToolSet>
                </div>
            </header>
            <div className={classes.Content}>
                <PagesMenuList 
                    items={items}
                    currentPage={props.currentPage}
                    pagesObjects={props.pagesObjects}
                    websiteId={props.websiteId}
                    savePagesStructure={props} />
            </div>
            {props.loading ? <Spinner cover /> : null}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        currentPage: state.website.currentPage,
        pagesStructure: state.website.pagesStructure,
        pagesObjects: state.website.pagesObjects,
        websiteId: state.website._id,
        loading: state.website.pagesLoading
    }
}

export default connect(mapStateToProps)(PagesMenu);