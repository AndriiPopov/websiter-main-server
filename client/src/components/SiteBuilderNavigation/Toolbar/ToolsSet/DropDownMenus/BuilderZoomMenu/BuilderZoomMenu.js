import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../../../../store/actions/index';
import BigButton from '../../../../../UI/Buttons/BigButton/BigButton';

export const BuilderZoomMenu = props => {
    return (
        <table>
            <tbody>
                <tr>
                    <td><BigButton
                        icon='<sv width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></svg>'
                        clickedBut={() => props.builderZoomOut()}  /></td>
                    <td>{props.zoom}</td>
                    <td><BigButton
                        icon='<sv width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></svg>'
                        clickedBut={() => props.builderZoomIn()}  /></td>
                    <td><BigButton
                        icon='<svg width="24" height="24" viewBox="0 0 24 24"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></svg>'
                        clickedBut={() => props.builderZoomReset()}  /></td>
                </tr>
            </tbody>
        </table>
    );
}

BuilderZoomMenu.propTypes = {
    zoom: PropTypes.number.isRequired
};

const mapStateToProps = state => {
    return {
        zoom: state.builder.present.pageZoom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        builderZoomOut: () => dispatch(actions.builderZoomOut()),
        builderZoomIn: () => dispatch(actions.builderZoomIn()),
        builderZoomReset: () => dispatch(actions.builderZoomReset())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BuilderZoomMenu);