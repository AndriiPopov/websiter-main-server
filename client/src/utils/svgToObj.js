
export const svgStringToObj = svg => {
    const obj = [];

    const stack = [];

    while (svg.length > 0){
        svg = svg.trim();
        if(svg.indexOf('</') === 0) {
            svg = svg.substring(2);
            if(svg.indexOf('<') > 0){
                svg = svg.substring(svg.indexOf('<'));
                stack.pop();
            } else {
                svg = '';
            }
        } else {
            svg = svg.substring(svg.indexOf('<'));
            const curObj = {
                type: svg.substring(1, svg.indexOf(' ')),
                children: []
            };
            svg = svg.substring(svg.indexOf(' '));
            let attr = svg.substring(0, svg.indexOf('>'));
            let selfclosing = attr.indexOf('/>') >= 0;
            
            svg = svg.substring(svg.indexOf('>') + 1).trim();
            while (attr.length > 0) {
                let key = attr.substring(0, attr.indexOf('=')).trim();
                attr = attr.substring(attr.indexOf('"') + 1);
                let value = attr.substring(0, attr.indexOf('"')).trim();
                attr = attr.substring(attr.indexOf('"') + 1).trim();
                curObj[key] = value;
            }
            if (stack.length === 0) {
                obj.push(curObj)
            } else {
                stack[stack.length - 1].children.push(curObj);
            }
            if(!selfclosing) {
                stack.push(curObj);
            }
        }
    }
    return obj[0];
}


