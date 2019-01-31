export default (el, styles, hoveredElement, activeElement) => {
    let styleEl = {...el};
    styles.forEach( style => {
        if (style.type === 'hover' && style.influencer === hoveredElement) {
            styleEl = {
                ...styleEl,
                ...style
            };
        }
        if (style.type === 'active' && style.influencer === activeElement) {
            styleEl = {
                ...styleEl,
                ...style
            };
        }
    });
    return styleEl;
};
    