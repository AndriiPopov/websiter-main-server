import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../../../../store/actions/index';
import BigButtonWithRadio from '../../../../../UI/Buttons/BigButtonWithRadio/BigButtonWithRadio';
import BigButton from '../../../../../UI/Buttons/BigButton/BigButton';

export const BoxAlignMenu = props => {
    const alignMode = props.alignMode || 'parent';
    return (
        <table>
            <tbody>
                <tr>
                    <td colSpan="3">Align scope</td>
                </tr>
                <tr>
                <td><BigButtonWithRadio
                        icon='<svg width="30px" height="30px" viewBox="-467 269 24 24"><path d="M-464,280h2v2h-2V280z M-460,288h2v2h-2V288z M-464,276h2v2h-2V276z M-464,272h2v2h-2V272z M-456,272h2v2h-2V272z M-464,284	h2v2h-2V284z M-464,288h2v2h-2V288z M-460,272h2v2h-2V272z M-456,288h2v2h-2V288z M-448,280h2v2h-2V280z M-448,276h2v2h-2V276z	 M-448,272h2v2h-2V272z M-448,284h2v2h-2V284z M-448,288h2v2h-2V288z M-452,288h2v2h-2V288z M-452,272h2v2h-2V272z M-458.4,277.6 h6.9v6.9h-6.9V277.6z"></path></svg>'
                        checked={alignMode === 'parent'}
                        clicked={() => props.changeAlignMode()}
                        value="parent" /></td>
                    <td><BigButtonWithRadio
                        icon='<svg width="30px" height="30px" viewBox="-467 269 24 24"><path d="M-464,280h2v2h-2V280z M-464,276h2v2h-2V276z M-464,272h2v2h-2V272z M-456,272h2v2h-2V272z M-464,284h2v2h-2V284z M-460,272	h2v2h-2V272z M-456,288h2v2h-2V288z M-448,280h2v2h-2V280z M-448,276h2v2h-2V276z M-448,272h2v2h-2V272z M-452,272h2v2h-2V272z	 M-460,272h6v6h-6V272z M-448,284h-4v4v2h2h2h2v-2v-2v-2H-448z M-464,284v4v2h2h2h2v-2v-4H-464z"></path></svg>'
                        checked={alignMode === 'selection'}
                        clicked={() => props.changeAlignMode()}
                        value="selection" /></td>
                    <td><BigButtonWithRadio
                        icon='<svg width="30px" height="30px" viewBox="-467 269 24 24"><path d="M-464,280h2v2h-2V280z M-464,276h2v2h-2V276z M-464,272h2v2h-2V272z M-456,272h2v2h-2V272z M-464,284h2v2h-2V284z M-460,272	h2v2h-2V272z M-456,288h2v2h-2V288z M-448,280h2v2h-2V280z M-448,276h2v2h-2V276z M-448,272h2v2h-2V272z M-452,272h2v2h-2V272z	 M-460,272h6v6h-6V272z M-448,284h-4v4v2h2h2h2v-2v-2v-2H-448z M-464,284v4v2h2h2h2v-2v-4H-464z"></path></svg>'
                        checked={alignMode === 'element'}
                        clicked={() => props.changeAlignMode()}
                        value="element" /></td>
                </tr>
                <tr>
                    <td colSpan="3">Align type</td>
                </tr>
                <tr>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30" style="transform: rotate(-90deg);"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></svg>'
                        clickedBut={() => props.alignBoxes('left')} />
                    </td>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30" style="transform: rotate(-90deg);"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></svg>'
                        clickedBut={() => props.alignBoxes('hCenter')} />
                    </td>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30" style="transform: rotate(-90deg);"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></svg>'
                        clickedBut={() => props.alignBoxes('right')} />
                    </td>
                </tr>
                <tr>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30" style="transform: rotate(-90deg);"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></svg>'
                        clickedBut={() => props.alignBoxes('top')} />
                    </td>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></svg>'
                        clickedBut={() => props.alignBoxes('vCenter')} />
                    </td>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path></svg>'
                        clickedBut={() => props.alignBoxes('bottom')} />
                    </td>
                </tr>
                <tr>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></svg>'
                        clickedBut={() => props.alignBoxes('hDistribute')} />
                    </td>
                    <td><BigButton
                        icon='<svg height="30" viewBox="0 0 24 24" width="30"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></svg>'
                        clickedBut={() => props.alignBoxes('vDistribute')} />
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};

BoxAlignMenu.propTypes = {
    alignMode: PropTypes.oneOf(['parent', 'selection', 'element'])
};

const mapStateToProps = state => {
    return {
        alignMode: state.builder.present.alignMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        alignBoxes: type => dispatch(actions.alignBoxes(type)),
        changeAlignMode: () => dispatch(actions.changeAlignMode())        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxAlignMenu);