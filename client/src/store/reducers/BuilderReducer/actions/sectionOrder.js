export const moveUpSection = state => {
    const currentIndex = state.sectionsOnPage.indexOf(state.chosenSection);
    if (currentIndex > 0) {
        const newSectionsOnPage = [...state.sectionsOnPage];
        newSectionsOnPage[currentIndex] = state.sectionsOnPage[currentIndex - 1];
        newSectionsOnPage[currentIndex - 1] = state.chosenSection;
        return {
            ...state,
            sectionsOnPage: newSectionsOnPage
        };
    }
    return { ...state };
};

export const moveDownSection = state => {
    const currentIndex = state.sectionsOnPage.indexOf(state.chosenSection);
    if (currentIndex < state.sectionsOnPage.length - 1) {
        const newSectionsOnPage = [...state.sectionsOnPage];
        newSectionsOnPage[currentIndex] = state.sectionsOnPage[currentIndex + 1];
        newSectionsOnPage[currentIndex + 1] = state.chosenSection;
        return {
            ...state,
            sectionsOnPage: newSectionsOnPage
        };
    }
    return { ...state };
};

