import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../../../store/actions/index';
import Textarea from '../../../../../UI/Textarea/Textarea';

export const PageSettingsMenu = props => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td><Textarea 
                        startValue={props.page.name}
                        changed={value => {props.savePage({name: value}, props.currentPageId)}}
                        valueKey="name" />
                    </td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td><Textarea 
                        startValue={props.page.title}
                        changed={value => {props.savePage({title: value}, props.currentPageId)}}
                        valueKey="title" />
                    </td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td><Textarea 
                        startValue={props.page.description}
                        changed={value => {props.savePage({description: value}, props.currentPageId)}}
                        valueKey="description" />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

const mapStateToProps = state => {
    return {
        page: state.website.pagesObjects[state.website.currentPage],
        currentPageId: state.website.currentPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        savePage: (newValue, currentPageId) => dispatch(actions.savePage(newValue, currentPageId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsMenu);