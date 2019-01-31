export const updateChosenBoxesAndSectionValues = newState => {
    const styledElement = newState.hoveredElement || newState.activeElement;
    const boxesDragStartValues = [];

    newState.chosenBoxesValues = {};
    newState.chosenBoxes.forEach(box => {
        mergeValuesOfChosenBoxes(newState[box], newState.chosenBoxesValues);
        boxesDragStartValues.push({
            box: box,
            width: newState[box].width,
            height: newState[box].height,
            left: newState[box].left,
            right: newState[box].right,
            top: newState[box].top,
            bottom: newState[box].bottom
        });
    });

    const chosenBoxesValuesStyled = {}
    if (styledElement) {
        const endPath = newState.hoveredElement ?
            `_${styledElement}_hover` : `_${styledElement}_active`;

        newState.chosenBoxes.forEach( (box, index) => {
            let fullPath = box + endPath;
            if (newState[fullPath]) {
                mergeValuesOfChosenBoxes(newState[fullPath], chosenBoxesValuesStyled);
                boxesDragStartValues[index] = {
                    ...boxesDragStartValues[index],
                    ...newState[fullPath]
                }
            }
        });
    }
    newState.chosenBoxesValues = {
        ...newState.chosenBoxesValues,
        ...chosenBoxesValuesStyled
    };
    newState.boxesDragStartValues = boxesDragStartValues;

    newState.chosenSectionValue = { ...newState[newState.chosenSection] };

    if (styledElement) {
        const style = newState[`${newState.chosenSection}_${styledElement}_${newState.hoveredElement ? 'hover' : 'active'}`];
        if (newState[style]) {
            newState.chosenSectionValue = {
                ...newState.chosenSectionValue,
                ...newState[style]
            }
        }
    }
    return newState;
}

const mergeValuesOfChosenBoxes = (source, result) => {
    for (let attr in source) {
        if (result[attr] === undefined) {
            result[attr] = source[attr];
        } else {
            if (result[attr] !== source[attr]) {
                result[attr] = false;
            }
        }
    }
}

export const changeElementPropertyValue = (state, action) => {
    const updatedElements = {};

    const getUpdatedElement = (state, action, el, values) => {
        if (!state.hoveredElement && !state.activeElement) {
            updatedElements[el] = { ...state[el] };
            if (!values) {
                updatedElements[el][action.key] = action.value;
            } else {
                values.forEach( value => {
                    updatedElements[el][value.key] = value.value;
                });
            }
        } else {
            const key = state.hoveredElement
                ? `${el}_${state.hoveredElement}_hover`
                : `${el}_${state.activeElement}_active`;
            if (!state[el].styles.includes(key)) {
                updatedElements[el] = {
                    ...state[el],
                    styles: [
                        ...state[el].styles,
                        key
                    ]
                };
            }
            updatedElements[key] = {
                ...state[key],
                influencer: state.hoveredElement,
                type: state.hoveredElement ? 'hover' : 'active'
            };
            if (!values) {
                updatedElements[key][action.key] = action.value;
            } else {
                values.forEach( value => {
                    updatedElements[key][value.key] = value.value;
                });
            }
        }
    }

    if (!action.isSection) {
        if (!action.items) {
            state.chosenBoxes.forEach(box => {
                getUpdatedElement(state, action, box);
            });
        } else {
            action.items.forEach( item => {
                getUpdatedElement(state, action, item.item, item.values);
            })
            //getUpdatedElement(state, action, action.item);
        }
    } else {
        getUpdatedElement(state, action, state.chosenSection);
    }
    return updateChosenBoxesAndSectionValues({
        ...state,
        ...updatedElements
    });
};

export const deselectElements = state => {
    return updateChosenBoxesAndSectionValues({
        ...state,
        chosenBoxes: [],
        chosenSection: null,
        enteredBoxes: [],
        chosenBoxesValues: {}
    });
};

export const deselectInner = (state, action) => {
    return updateChosenBoxesAndSectionValues({
        ...state,
        chosenBoxes: [],
        enteredBoxes: [action.item]
    });
};

const generateIncomeIds = (state, elements, incomeIds) => {
    elements.forEach(el => {
        incomeIds.push(el);
        generateIncomeIds(state, state[el].children, incomeIds);
    })
}

export const getElementsToAdd = (state, elements, firstLayerElements, newElementsObj, parent, parentId, stateId, idsObj) => {
    if (firstLayerElements) {
        let incomeIds = [];
        generateIncomeIds(state, elements, incomeIds);
        idsObj = {};
        incomeIds.forEach(id => {
            let newId;
            if (!stateId) {
                newId = 'element_' + state.currentId;
                state.currentId = state.currentId + 1;
            } else {
                newId = 'element_' + stateId.currentId;
                stateId.currentId = stateId.currentId + 1;
            }
            idsObj[id] = newId;
        });
        newElementsObj = {};
    }
    elements.forEach(element => {
        const newId = idsObj[element];
        const styles = [];
        state[element].styles.forEach(style => {
            let styleObj = {
                ...state[style],
                influencer: idsObj[state[style].influencer] || state[style].influencer
            };
            let newStyleId = `${newId}_${styleObj.influencer}_${styleObj.type}`;
            styles.push(newStyleId);
            newElementsObj[newStyleId] = styleObj;
        })

        const newElement = {
            ...state[element],
            styles: styles,
            children: []
        };
        if (firstLayerElements) {
            firstLayerElements.push(newId)
        } else {
            newElement.parent = parentId;
            parent.children.push(newId);
        }
        newElementsObj[newId] = newElement;
        getElementsToAdd(state, state[element].children, null, newElementsObj, newElement, newId, stateId, idsObj);
    });
    if (firstLayerElements) {
        return newElementsObj;
    }
}

export const getElementsToDelete = (elements, state) => {
    let toDelete = [];
    elements.forEach(element => {
        toDelete.push(element);
        toDelete = toDelete.concat(getElementsToDelete(state[element].children, state));
    });
    return toDelete;
}