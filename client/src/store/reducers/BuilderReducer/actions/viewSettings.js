export const builderZoomOut = state => {
    return {
        ...state,
        pageZoom: state.pageZoom > 10 ? state.pageZoom - 10 : state.pageZoom
    }
}

export const builderZoomIn = state => {
    return {
        ...state,
        pageZoom: state.pageZoom + 10
    }
}

export const builderZoomReset = state => {
    return {
        ...state,
        pageZoom: 100
    }
}

export const pagePreview = state => {
    return {
        ...state,
        preview: !state.preview
    }
}