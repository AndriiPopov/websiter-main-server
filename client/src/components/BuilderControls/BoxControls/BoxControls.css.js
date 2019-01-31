export const BoxDrag = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    bottom: '0px',
    right: '0px',
    cursor: 'default',
    zIndex: '16777270',
    display: 'block'
};

export const BoxResizeLeft = {
    display: 'block',
    position: 'absolute',
    left: '-10px',
    top: 'calc(50% - 10px)',
    background: 'rgb(169, 215, 232)',
    border: '1px solid grey',
    cursor: 'w-resize',
    width: '20px',
    height: '20px',
    zIndex: '16777270',
    borderRadius: '20px',
    boxSizing: 'border-box',
};

export const BoxResizeRight = {
    display: 'block',
    position: 'absolute',
    right: '-10px',
    top: 'calc(50% - 10px)',
    background: 'rgb(169, 215, 232)',
    border: '1px solid grey',
    cursor: 'e-resize',
    width: '20px',
    height: '20px',
    zIndex: '16777270',
    borderRadius: '20px',
    boxSizing: 'border-box',
};

export const BoxResizeTop = {
    display: 'block',
    position: 'absolute',
    top: '-10px',
    left: 'calc(50% - 10px)',
    background: 'rgb(169, 215, 232)',
    border: '1px solid grey',
    cursor: 'n-resize',
    width: '20px',
    height: '20px',
    zIndex: '16777270',
    borderRadius: '20px',
    boxSizing: 'border-box',
};

export const BoxResizeBottom = {
    display: 'block',
    position: 'absolute',
    bottom: '-10px',
    left: 'calc(50% - 10px)',
    background: 'rgb(169, 215, 232)',
    border: '1px solid grey',
    cursor: 's-resize',
    width: '20px',
    height: '20px',
    zIndex: '16777270',
    borderRadius: '20px',
    boxSizing: 'border-box',
};