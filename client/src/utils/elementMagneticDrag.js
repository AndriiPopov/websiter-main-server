
export const updateScrElPos = selectedBoxes => {
    const frameDoc = document.getElementById('builderFrame').contentWindow.document;
    const scrElPos = [];
    const rect = frameDoc.body.getBoundingClientRect();
    const top = rect.top;
    const bottom = rect.bottom;
    const left = rect.left;
    const right = rect.right;
    const keyElements = frameDoc.getElementsByName('keyElement');
    [...keyElements].forEach( element => {
        if (selectedBoxes.indexOf(element.id) < 0) {
            let isDecedant = false;
            selectedBoxes.forEach( box => {
                isDecedant = frameDoc.getElementById(box).contains(element) || isDecedant;
            });
            if(!isDecedant) {
                //if(d.els[i].type!="align") {
                const elRect = element.getBoundingClientRect();
                const n = {
                    element,
                    t: elRect.top,
                    l: elRect.left,
                    r: elRect.right,
                    b: elRect.bottom,
                    h: (elRect.bottom - elRect.top) / 2 + elRect.top,
                    v: (elRect.right - elRect.left) / 2 + elRect.left
                };
                
                if( 
                    (   (n.t > top && n.t < bottom) || 
                        (n.b > top && n.b < bottom) || 
                        (n.t < top && n.b > top) || 
                        (n.b > bottom && n.t < bottom) 
                    ) && 
                    (   (n.l > left && n.l < right) || 
                        (n.r > left && n.r < right) || 
                        (n.l < left && n.r > left) || 
                        (n.r > right && n.l < right) 
                    ) 
                ) {
                    scrElPos.push(n);
                }
                    
                // } else {
                // var r=d.els[i].outerDiv.getBoundingClientRect();
                // n.t=r.top;
                // n.type="hal";
                // scrElPos.push(n);
                // }
            }

            
        }
    });
    return scrElPos;    
};

export const magnetizeOnElementDrag = (scrElPos, dragType, elementId,
                                       left, right, top, bottom,
                                       difH, difV,
                                       lastMagneticChangeX, lastMagneticChangeY ) => {
    let changeX = 0;
    let changeY = 0;
    const rect = document.getElementById('builderFrame').contentWindow.document.getElementById(elementId).getBoundingClientRect();
    const newLeft = rect.left + difH + lastMagneticChangeX;
    const newRight = rect.right + difH + lastMagneticChangeX;
    const newVMiddle = newLeft + (newRight - newLeft) / 2;
    const newTop = rect.top + difV + lastMagneticChangeY;
    const newBottom = rect.bottom + difV + lastMagneticChangeY;
    const newHMiddle = newTop + (newBottom - newTop) / 2;
    let horM, horCl, horT, verM, verCl, verT, hor, ver;
    let highlightElementH, highlightLineH, highlightElementV, highlightLineV;

    scrElPos.forEach( c => {
        if(c.type !== "hal"){
            if(c.type !== "val")
                hor=Math.min(Math.abs(newTop-c.t),Math.abs(newBottom-c.b),Math.abs(newTop-c.b),Math.abs(newBottom-c.t),Math.abs(newTop-c.h),Math.abs(newBottom-c.h),Math.abs(newHMiddle-c.t),Math.abs(newHMiddle-c.h),Math.abs(newHMiddle-c.b));
            else 
                hor=0;
            if(dragType === "left" || dragType === "drag"){
                if(Math.abs(newLeft-c.l)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="ll";}}
                if(c.type !== "val"){
                    if(Math.abs(newLeft-c.v)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="lv";}}
                    if(Math.abs(newLeft-c.r)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="lr";}}
                }
            }
            if(dragType === "right" || dragType === "drag"){
                if(Math.abs(newRight-c.l)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="rl";}}
                if(c.type !== "val"){
                    if(Math.abs(newRight-c.v)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="rv";}}
                    if(Math.abs(newRight-c.r)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="rr";}}
                }
            }
            if(dragType === "drag"){
                if(Math.abs(newVMiddle-c.l)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="vl";}}
                if(c.type !== "val"){
                    if(Math.abs(newVMiddle-c.v)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="vv";}}
                    if(Math.abs(newVMiddle-c.r)<5){if(!horCl||(horCl&&hor<horM)){horM=hor;horCl=c;horT="vr";}}
                }
            }
        }
        if(c.type !== "val"){
            if(c.type !== "hal")
                ver=Math.min(Math.abs(newLeft-c.l),Math.abs(newRight-c.r),Math.abs(newLeft-c.r),Math.abs(newRight-c.l),Math.abs(newLeft-c.v),Math.abs(newRight-c.v),Math.abs(newVMiddle-c.l),Math.abs(newVMiddle-c.v),Math.abs(newVMiddle-c.r));
            else 
                ver=0;
            if(dragType === "top" || dragType === "drag"){
                if(Math.abs(newTop-c.t)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="tt";}}
                if(c.type !== "hal"){
                    if(Math.abs(newTop-c.h)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="th";}}
                    if(Math.abs(newTop-c.b)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="tb";}}
                }
            }
            if(dragType === "bottom" || dragType === "drag"){
                if(Math.abs(newBottom-c.t)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="bt";}}
                if(c.type !== "hal"){
                    if(Math.abs(newBottom-c.h)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="bh";}}
                    if(Math.abs(newBottom-c.b)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="bb";}}
                }
            }
            if(dragType === "drag"){
                if(Math.abs(newHMiddle-c.t)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="ht";}}
                if(c.type !== "hal"){
                    if(Math.abs(newHMiddle-c.h)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="hh";}}
                    if(Math.abs(newHMiddle-c.b)<5){if(!verCl||(verCl&&ver<verM)){verM=ver;verCl=c;verT="hb";}}
                }
            }
        }
    });

    if(horCl) {
        var p=[
            {n: "ll", k: newLeft,    h: horCl.l, c: 1,  s: left},
            {n: "lv", k: newLeft,    h: horCl.v, c: 1,  s: left},
            {n: "lr", k: newLeft,    h: horCl.r, c: 1,  s: left},
            {n: "rl", k: newRight,   h: horCl.l, c: -1, s: right},
            {n: "rv", k: newRight,   h: horCl.v, c: -1, s: right},
            {n: "rr", k: newRight,   h: horCl.r, c: -1, s: right},
            {n: "vl", k: newVMiddle, h: horCl.l},
            {n: "vv", k: newVMiddle, h: horCl.v},
            {n: "vr", k: newVMiddle, h: horCl.r}
        ];
        p.forEach( g => {
            if(horT === g.n){
                changeX = g.k - g.h;

                if(dragType === "drag"){
                    if(left) left = left - (g.k - g.h);
                    if(right) right = right + (g.k - g.h);
                } else {
                    if(left){
                        left = left - (g.k - g.h);
                    } else {
                        right = right + (g.k - g.h);
                    }
                }
            }
        });

        highlightElementH = {
            width: horCl.r - horCl.l,
            height: horCl.b - horCl.t,
            left: horCl.l,
            top: horCl.t
        };
        highlightLineH = {
            width: 1,
            top: Math.min(newTop, horCl.t),
            height: Math.max(newBottom, horCl.b) - Math.min(newTop, horCl.t)
        };

        switch (horT) {
            case "ll": highlightLineH.left = horCl.l - 1; break;
            case "lv": highlightLineH.left = horCl.l + (horCl.r - horCl.l) / 2 - 1; break;
            case "lr": highlightLineH.left = horCl.r; break;
            case "rl": highlightLineH.left = horCl.l - 1; break;
            case "rv": highlightLineH.left = horCl.l + (horCl.r - horCl.l) / 2; break;
            case "rr": highlightLineH.left = horCl.r; break;
            case "vl": highlightLineH.left = horCl.l - 1; break;
            case "vv": highlightLineH.left = horCl.l + (horCl.r - horCl.l) / 2; break;
            case "vr": highlightLineH.left = horCl.r; break;
            default:   highlightLineH.left = horCl.l - 1;
        };
    }
    
    if(verCl) {
        let p=[
            {n: "tt", k: newTop,     h: verCl.t ,c: 1,  s: top},
            {n: "th", k: newTop,     h: verCl.h ,c: 1,  s: top},
            {n: "tb", k: newTop,     h: verCl.b ,c: 1,  s: top},
            {n: "bt", k: newBottom,  h: verCl.t ,c: -1, s: bottom},
            {n: "bh", k: newBottom,  h: verCl.h ,c: -1, s: bottom},
            {n: "bb", k: newBottom,  h: verCl.b ,c: -1, s: bottom},
            {n: "ht", k: newHMiddle, h: verCl.t},
            {n: "hh", k: newHMiddle, h: verCl.h},
            {n: "hb", k: newHMiddle, h: verCl.b},
        ];
        p.forEach( g => {
            if(verT === g.n){
                changeY = g.k - g.h;

                if(dragType === "drag"){
                    if(top) top = top - (g.k - g.h);
                    if(bottom) bottom = bottom + (g.k - g.h);
                } else {
                    if(top){
                        top = top - (g.k - g.h);
                    } else {
                        bottom = bottom + g.k - g.h;
                    }
                }
            }
        });

        highlightElementV = {
            width: verCl.r - verCl.l,
            height: verCl.b - verCl.t,
            left: verCl.l,
            top: verCl.t
        };
        highlightLineV = {
            height: 1,
            left: Math.min(newLeft, verCl.l),
            width: Math.max(newRight, verCl.r) - Math.min(newLeft, verCl.l)
        };

        switch (verT) {
            case "tt": highlightLineV.top = verCl.t - 1; break;
            case "th": highlightLineV.top = verCl.t + (verCl.b - verCl.t) / 2 - 1; break;
            case "tb": highlightLineV.top = verCl.b; break;
            case "bt": highlightLineV.top = verCl.t - 1; break;
            case "bh": highlightLineV.top = verCl.t + (verCl.b - verCl.t) / 2; break;
            case "bb": highlightLineV.top = verCl.b; break;
            case "ht": highlightLineV.top = verCl.t - 1; break;
            case "hh": highlightLineV.top = verCl.t + (verCl.b - verCl.t) / 2; break;
            case "hb": highlightLineV.top = verCl.b; break;
            default:   highlightLineV.top = verCl.t - 1;
        };
    }

    return {
        left,
        right,
        top,
        bottom,
        changeX,
        changeY,
        highlightElementH,
        highlightLineH,
        highlightElementV,
        highlightLineV
    };
}