import { updateChosenBoxesAndSectionValues } from '../utils';


export const changeAlignMode = (state, action) => {
    return {
        ...state,
        alignMode: action.value
    };
};


export const alignBoxes = (state, action) => {
    let updatedElements;
    switch (action.alignType) {
        case 'left': updatedElements = alignLeft(state, 'parent'); break;
        case 'hCenter': updatedElements = alignHCenter(state, 'parent'); break;
        case 'right': updatedElements = alignRight(state, 'parent'); break;
        case 'top': updatedElements = alignTop(state, 'parent'); break;
        case 'vCenter': updatedElements = alignVCenter(state, 'parent'); break;
        case 'bottom': updatedElements = alignBottom(state, 'parent'); break;
        case 'hDistribute': updatedElements = alignHDistribute(state, 'parent'); break;
        case 'vDistribute': updatedElements = alignVDistribute(state, 'parent'); break;
        default: updatedElements = alignLeft(state, 'parent');
    }

    return updateChosenBoxesAndSectionValues({
        ...state,
        ...updatedElements
    });
};

const alignLeft = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = [];

    chosenBoxes.forEach( box => {
        boxesRects.push(frameDoc.getElementById(box).getBoundingClientRect());
    });

    let newLeft = 0;
    switch (state.alignMode) {
        case 'parent': newLeft = 0; break;
        case 'element': newLeft = boxesRects[0].left-parentRect.left; break;
        case 'selection':
            chosenBoxes.forEach( index => {
                let boxRect = boxesRects[index];
                if (index === 0) newLeft = boxRect.left;
                else newLeft = newLeft > boxRect.left ? boxRect.left : newLeft;
            });
            newLeft= newLeft - parentRect.left; break;
        default: newLeft = 0;
    }

    const updatedElements = {};
    chosenBoxes.forEach( (box, index) => {
        if(state[box].left || state[box].left === 0){
            updatedElements[box] = {
                ...state[box],
                left: newLeft
            };
        } else {
            updatedElements[box] = {
                ...state[box],
                right: parentRect.right - parentRect.left - newLeft - ( boxesRects[index].right - boxesRects[index].left)
            };
        }  
    });
    return updatedElements;
};
  
const alignRight = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = [];

    chosenBoxes.forEach( box => {
        boxesRects.push(frameDoc.getElementById(box).getBoundingClientRect());
    });

    let newRight = 0;
    switch (state.alignMode) {
        case 'parent': newRight = parentRect.right - parentRect.left; break;
        case 'element': newRight = boxesRects[0].right-parentRect.left; break;
        case 'selection':
            chosenBoxes.forEach( index => {
                let boxRect = boxesRects[index];
                if (index === 0) newRight = boxRect.right;
                else newRight = newRight < boxRect.right ? boxRect.right : newRight;
            });
            newRight = newRight - parentRect.left; break;
        default: newRight = parentRect.right - parentRect.left;
    }

    const updatedElements = {};
    chosenBoxes.forEach( (box, index) => {
        if(state[box].left || state[box].left === 0){
            updatedElements[box] = {
                ...state[box],
                left: newRight - (boxesRects[index].right - boxesRects[index].left)
            };
        } else {
            updatedElements[box] = {
                ...state[box],
                right: parentRect.right - parentRect.left - newRight
            };
        }
    });
    return updatedElements;
};
  
const alignTop = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = [];

    chosenBoxes.forEach( box => {
        boxesRects.push(frameDoc.getElementById(box).getBoundingClientRect());
    });

    let newTop = 0;
    switch (state.alignMode) {
        case 'parent': newTop = 0; break;
        case 'element': newTop = boxesRects[0].top-parentRect.top; break;
        case 'selection':
            chosenBoxes.forEach( index => {
                let boxRect = boxesRects[index];
                if (index === 0) newTop = boxRect.top;
                else newTop = newTop > boxRect.top ? boxRect.top : newTop;
            });
            newTop= newTop - parentRect.top; break;
        default: newTop = 0;
    }

    const updatedElements = {};
    chosenBoxes.forEach( (box, index) => {
        if(state[box].top || state[box].top === 0){
            updatedElements[box] = {
                ...state[box],
                top: newTop
            };
        } else {
            updatedElements[box] = {
                ...state[box],
                bottom: parentRect.bottom - parentRect.top - newTop - ( boxesRects[index].bottom - boxesRects[index].top)
            };
        }  
    });
    return updatedElements;
};
  
const alignBottom = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = [];

    chosenBoxes.forEach( box => {
        boxesRects.push(frameDoc.getElementById(box).getBoundingClientRect());
    });

    let newBottom = 0;
    switch (state.alignMode) {
        case 'parent': newBottom = parentRect.bottom - parentRect.top; break;
        case 'element': newBottom = boxesRects[0].bottom-parentRect.top; break;
        case 'selection':
            chosenBoxes.forEach( index => {
                let boxRect = boxesRects[index];
                if (index === 0) newBottom = boxRect.bottom;
                else newBottom = newBottom < boxRect.bottom ? boxRect.bottom : newBottom;
            });
            newBottom = newBottom - parentRect.top; break;
        default: newBottom = parentRect.bottom - parentRect.top;
    }

    const updatedElements = {};
    chosenBoxes.forEach( (box, index) => {
        if(state[box].top || state[box].top === 0){
            updatedElements[box] = {
                ...state[box],
                top: newBottom - (boxesRects[index].bottom - boxesRects[index].top)
            };
        } else {
            updatedElements[box] = {
                ...state[box],
                bottom: parentRect.bottom - parentRect.top - newBottom
            };
        }
    });
    return updatedElements;
};

const alignHCenter = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = [];

    chosenBoxes.forEach( box => {
        boxesRects.push(frameDoc.getElementById(box).getBoundingClientRect());
    });

    let newCenter = 0;
    switch (state.alignMode) {
        case 'parent': newCenter = (parentRect.right - parentRect.left) / 2; break;
        case 'element': newCenter = (boxesRects[0].right - boxesRects[0].left) / 2 + boxesRects[0].left - parentRect.left; break;
        case 'selection':
            let newLeft, newRight;
            chosenBoxes.forEach( index => {
                let boxRect = boxesRects[index];
                if (index === 0) newLeft = boxRect.left;
                else newLeft = newLeft > boxRect.left ? boxRect.left : newLeft;
                if (index === 0) newRight = boxRect.right;
                else newRight = newRight < boxRect.right ? boxRect.right : newRight;
            });
            newCenter = (newRight - newLeft) / 2 + newLeft - parentRect.left; break;
        default: newCenter = 0;
    }

    const updatedElements = {};
    chosenBoxes.forEach( (box, index) => {
        if(state[box].left || state[box].left === 0){
            updatedElements[box] = {
                ...state[box],
                left: newCenter - (boxesRects[index].right - boxesRects[index].left) / 2
            };
        } else {
            updatedElements[box] = {
                ...state[box],
                right: parentRect.right - parentRect.left - (newCenter + (boxesRects[index].right - boxesRects[index].left) / 2)
            };
        }  
    });
    return updatedElements;
};

const alignVCenter = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = [];

    chosenBoxes.forEach( box => {
        boxesRects.push(frameDoc.getElementById(box).getBoundingClientRect());
    });

    let newCenter = 0;
    switch (state.alignMode) {
        case 'parent': newCenter = (parentRect.bottom - parentRect.top) / 2; break;
        case 'element': newCenter = (boxesRects[0].bottom - boxesRects[0].top) / 2 + boxesRects[0].top - parentRect.top; break;
        case 'selection':
            let newTop, newBottom;
            chosenBoxes.forEach( index => {
                let boxRect = boxesRects[index];
                if (index === 0) newTop = boxRect.top;
                else newTop = newTop > boxRect.top ? boxRect.top : newTop;
                if (index === 0) newBottom = boxRect.bottom;
                else newBottom = newBottom < boxRect.bottom ? boxRect.bottom : newBottom;
            });
            newCenter = (newBottom - newTop) / 2 + newTop - parentRect.top; break;
        default: newCenter = 0;
    }

    const updatedElements = {};
    chosenBoxes.forEach( (box, index) => {
        if(state[box].top || state[box].top === 0){
            updatedElements[box] = {
                ...state[box],
                top: newCenter - (boxesRects[index].bottom - boxesRects[index].top) / 2
            };
        } else {
            updatedElements[box] = {
                ...state[box],
                bottom: parentRect.bottom - parentRect.top - (newCenter + (boxesRects[index].bottom - boxesRects[index].top) / 2)
            };
        }  
    });
    return updatedElements;
};

const alignHDistribute = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = []; 
    let newLeftCenter, newRightCenter, newLeft, newRight;
    chosenBoxes.forEach( (box, index) => {
        let rect = frameDoc.getElementById(box).getBoundingClientRect();
        boxesRects.push({
            box,
            rect
        });
        if(index === 0) {
            newLeft = rect.left; 
            newLeftCenter = rect.left + (rect.right - rect.left) / 2;
        } else {
            if(newLeft > rect.left) {
                newLeft = rect.left; 
                newLeftCenter = rect.left + (rect.right - rect.left) / 2;
            }
        }
        if(index === 0) {
            newRight = rect.right; 
            newRightCenter = rect.left + (rect.right - rect.left) / 2;
        } else {
            if(newRight < rect.right) {
                newRight = rect.right; 
                newRightCenter = rect.left + (rect.right - rect.left) / 2;
            }
        }
    });

    let start = 0, width;
    const step = boxesRects.length * 2;
    switch (state.alignMode) {
        case 'parent': width = parentRect.right - parentRect.left; break;
        case 'element': width = boxesRects[0].rect.right - boxesRects[0].rect.left; break;
        case 'selection':
            let quantity = (newRightCenter - newLeftCenter) / ((boxesRects.length - 1) * 2);
            width=step*quantity;
            start = newLeftCenter - parentRect.left - quantity;
            break;
        default: width = parentRect.right - parentRect.left;
    }

    boxesRects.sort( (a, b) => (a.rect.left > b.rect.left));
    const updatedElements = {};
    boxesRects.forEach( (el, index) => {
        if (state.alignMode === 'selection' || (index !== 0 && index !== boxesRects.length - 1)) {
            let box = el.box;
            let boxCenter = start + (1 + index * 2) * width / step;
            var rect = el.rect;
            var boxWidth = rect.right - rect.left;
            
            if (state[box].left || state[box].left === 0) {
                updatedElements[box] = {
                    ...state[box],
                    left: boxCenter - boxWidth / 2
                };
            } else {
                updatedElements[box] = {
                    ...state[box],
                    right: boxCenter - boxWidth / 2
                };
            }
        }
    });
    return updatedElements;
};

const alignVDistribute = state => {
    const chosenBoxes = [...state.chosenBoxes];
    const parent = state[chosenBoxes[0]].parent;
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const parentRect = frameDoc.getElementById(parent).getBoundingClientRect();
    const boxesRects = []; 
    let newTopCenter, newBottomCenter, newTop, newBottom;
    chosenBoxes.forEach( (box, index) => {
        let rect = frameDoc.getElementById(box).getBoundingClientRect();
        boxesRects.push({
            box,
            rect
        });
        if(index === 0) {
            newTop = rect.top; 
            newTopCenter = rect.top + (rect.bottom - rect.top) / 2;
        } else {
            if(newTop > rect.top) {
                newTop = rect.top; 
                newTopCenter = rect.top + (rect.bottom - rect.top) / 2;
            }
        }
        if(index === 0) {
            newBottom = rect.bottom; 
            newBottomCenter = rect.top + (rect.bottom - rect.top) / 2;
        } else {
            if(newBottom < rect.bottom) {
                newBottom = rect.bottom; 
                newBottomCenter = rect.top + (rect.bottom - rect.top) / 2;
            }
        }
    });

    let start = 0, height;
    const step = boxesRects.length * 2;
    switch (state.alignMode) {
        case 'parent': height = parentRect.bottom - parentRect.top; break;
        case 'element': height = boxesRects[0].rect.bottom - boxesRects[0].rect.top; break;
        case 'selection':
            let quantity = (newBottomCenter - newTopCenter) / ((boxesRects.length - 1) * 2);
            height=step*quantity;
            start = newTopCenter - parentRect.top - quantity;
            break;
        default: height = parentRect.bottom - parentRect.top;
    }

    boxesRects.sort( (a, b) => (a.rect.top > b.rect.top));
    const updatedElements = {};
    boxesRects.forEach( (el, index) => {
        if (state.alignMode === 'selection' || (index !== 0 && index !== boxesRects.length - 1)) {
            let box = el.box;
            let boxCenter = start + (1 + index * 2) * height / step;
            var rect = el.rect;
            var boxHeight = rect.bottom - rect.top;
            
            if (state[box].top || state[box].top === 0) {
                updatedElements[box] = {
                    ...state[box],
                    top: boxCenter - boxHeight / 2
                };
            } else {
                updatedElements[box] = {
                    ...state[box],
                    bottom: boxCenter - boxHeight / 2
                };
            }
        }
    });
    return updatedElements;
};