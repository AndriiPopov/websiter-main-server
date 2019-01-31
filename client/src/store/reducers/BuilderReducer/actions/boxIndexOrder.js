export const moveUpBox = (state) => {
    const parent = state[state.chosenBoxes[0]].parent;
    const currentIndex = state[parent].children.indexOf(state.chosenBoxes[0]);
    if (currentIndex > 0) {
        const newChildren = [...state[parent].children];
        newChildren[currentIndex] = state[parent].children[currentIndex - 1];
        newChildren[currentIndex - 1] = state.chosenBoxes[0];
        return {
            ...state,
            [parent]: {
                ...state[parent],
                children: newChildren
            }
        };
    }
    return { ...state };
};

export const moveDownBox = (state) => {
    const parent = state[state.chosenBoxes[0]].parent;
    const currentIndex = state[parent].children.indexOf(state.chosenBoxes[0]);
    if (currentIndex < state[parent].children.length - 1) {
        const newChildren = [...state[parent].children];
        newChildren[currentIndex] = state[parent].children[currentIndex + 1];
        newChildren[currentIndex + 1] = state.chosenBoxes[0];
        return {
            ...state,
            [parent]: {
                ...state[parent],
                children: newChildren
            }
        };
    }
    return { ...state };
};

export const zIndexUpBox = (state) => {
    const children = state[state[state.chosenBoxes[0]].parent].children;
    const currentIndex = state[state.chosenBoxes[0]].zIndex;
    if (currentIndex < children.length - 1) {
        const elementForSwap = children.find(el => state[el].zIndex === currentIndex + 1);
        return {
            ...state,
            [elementForSwap]: {
                ...state[elementForSwap],
                zIndex: currentIndex
            },
            [state.chosenBoxes[0]]: {
                ...state[state.chosenBoxes[0]],
                zIndex: currentIndex + 1
            }
        };
    }
    return { ...state };
};

export const zIndexDownBox = state => {
    const children = state[state[state.chosenBoxes[0]].parent].children;
    const currentIndex = state[state.chosenBoxes[0]].zIndex;
    if (currentIndex > 0) {
        const elementForSwap = children.find(el => state[el].zIndex === currentIndex - 1);
        return {
            ...state,
            [elementForSwap]: {
                ...state[elementForSwap],
                zIndex: currentIndex
            },
            [state.chosenBoxes[0]]: {
                ...state[state.chosenBoxes[0]],
                zIndex: currentIndex - 1
            }
        };
    }
    return { ...state };
};