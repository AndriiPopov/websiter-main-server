export const dragStart = (e, callbackMove, callbackStop) => {
    const window = document.getElementById('builderFrame').contentWindow;
    const startMouseX = e.pageX;
    const startMouseY = e.pageY;
    let prevMouseX = e.pageX; 
    let prevMouseY = e.pageY;

    const dragMouseMove = e => {
        const totalDifX = e.pageX - startMouseX;
        const totalDifY = e.pageY - startMouseY;
        const relDifX = e.pageX - prevMouseX;
        const relDifY = e.pageY - prevMouseY;
        prevMouseX = e.pageX; 
        prevMouseY = e.pageY;
        callbackMove(totalDifX, totalDifY, relDifX, relDifY);
    };

    const dragMouseUp = () => {
        window.removeEventListener('mousemove', dragMouseMove);
        window.removeEventListener('mouseup', dragMouseUp);
        callbackStop();
    }

    window.addEventListener('mousemove', dragMouseMove);
    window.addEventListener('mouseup', dragMouseUp);
}

