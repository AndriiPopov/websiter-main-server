"use strict";

(window.webpackJsonp = window.webpackJsonp || []).push([[4], {
  1001: function (e, t) {},
  1011: function (e, t, n) {
    e.exports = {
      Overlay: "Overlay_Overlay__3WlT_"
    };
  },
  1027: function (e, t, n) {
    "use strict";

    var r = n(0),
        a = n.n(r),
        i = n(26),
        o = n(9),
        l = n(495),
        s = n(522),
        c = n(512),
        u = ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "parseHTML", "plaintext", "pre", "progress", "q", "richEditor", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "websiterMenu", "websiterGallery", "xmp"],
        d = n(476),
        p = n(5),
        m = n(483);
    t.a = Object(i.b)(function (e, t) {
      var n = e.mD[p.b[t.mode]].structure.find(function (e) {
        return e.id === t.node.id;
      });
      return n ? {
        isCurrentBox: e.mD[p.b[t.mode]].currentBox === n.id,
        isFocused: e.activeContainer === t.mode + "elements",
        currentNode: n,
        currentNodeValues: e.mD[p.b[t.mode]].values[n.id],
        currentResource: e.mD[p.a[t.mode]],
        pluginsStructure: e.mD.pluginsStructure,
        hoveredElementId: -100
      } : {};
    }, function (e, t) {
      return {
        chooseBox: function (t, n) {
          return e(o.j(t, n));
        },
        changeBoxPropertyInStructure: function (t, n, r, a, i) {
          return e(o.g(t, n, r, !1, i));
        },
        hoverBox: function (t, n) {
          return e(o.u(t, n));
        },
        unhoverBox: function () {
          return e(o.Q());
        },
        checkUserRights: function (t) {
          return e(Object(d.a)(t));
        },
        addBox: function (t, n) {
          return e(o.a(t, n));
        },
        deleteBox: function (t, n) {
          return e(o.o(t, n));
        }
      };
    })(function (e) {
      if (!e.currentNode) return null;
      var t,
          n = e,
          r = n.scaffoldBlockPxWidth,
          i = n.toggleChildrenVisibility,
          o = n.connectDragPreview,
          d = n.connectDragSource,
          p = n.isDragging,
          h = n.canDrop,
          f = n.canDrag,
          b = n.node,
          g = n.draggedNode,
          v = n.path,
          _ = n.treeIndex,
          y = n.isSearchMatch,
          C = n.isSearchFocus,
          S = n.didDrop;
      f && (t = d(a.a.createElement("div", {
        className: l.rst__moveHandle
      }, a.a.createElement("i", {
        className: "material-icons"
      }, "more_vert"))));
      var E = !S && p,
          w = g && Object(c.e)(g, b),
          O = {
        left: -.5 * r
      },
          M = e.node,
          x = M.id,
          P = M.mode,
          T = M.itemPath,
          j = e.currentResource,
          V = e.pluginsStructure,
          I = e.currentNodeValues,
          D = e.isCurrentBox,
          R = e.currentNode,
          k = R.tag,
          z = R.text,
          B = R.isChildren,
          F = R.isElementFromCMSVariable,
          N = R.childrenTo,
          H = R.isPropagatingItem,
          W = [l.rst__row];
      E && W.push(l.rst__rowLandingPad), E && !h && W.push(l.rst__rowCancelPad), y && W.push(l.rst__rowSearchMatch), C && W.push(l.rst__rowSearchFocus), E || W.push(D ? e.isFocused ? [l.Chosen] : [l.ChosenBlur] : x === e.hoveredElementId ? [l.Hovered] : null);
      return a.a.createElement("div", Object.assign({}, Object(c.a)({
        style: {
          height: "100%"
        }
      }, {}), {
        onMouseDown: function () {
          return e.chooseBox(P, x);
        }
      }), i && b.children && (b.children.length > 0 || "function" === typeof b.children) && a.a.createElement("div", {
        onMouseDown: function (e) {
          return e.stopPropagation();
        }
      }, a.a.createElement("button", {
        type: "button",
        "aria-label": b.expanded ? "Collapse" : "Expand",
        className: b.expanded ? l.rst__collapseButton : l.rst__expandButton,
        style: O,
        onClick: function () {
          return i({
            node: b,
            path: v,
            treeIndex: _
          });
        }
      }), b.expanded && !p && a.a.createElement("div", {
        style: {
          width: r
        },
        className: l.rst__lineChildren
      })), a.a.createElement("div", {
        className: l.rst__rowWrapper
      }, o(a.a.createElement("div", {
        className: W.join(" "),
        style: Object(c.b)({
          opacity: w ? .5 : 1
        })
      }, t, a.a.createElement("div", {
        className: f ? l.rst__rowContents : [l.rst__rowContents, l.rst__rowContentsDragDisabled].join(" ")
      }, a.a.createElement("div", {
        className: l.rst__rowLabel
      }, z && I ? "text" + (I.textContent ? ' - "' + I.textContent.substr(0, 25) + (I.textContent.length > 25 ? "..." : "") + '"' : "") : a.a.createElement(a.a.Fragment, null, B || F ? F ? "From CMS variable - " : "" : "<", ("plugin" === P && T.length > 0 || "template" === P && T.length > 1 || "element_02" === T[0] || H) && e.checkUserRights("page" === P ? ["content"] : ["developer"], !0) ? a.a.createElement(s.a, {
        readonly: N,
        value: k,
        items: u.map(function (e) {
          return {
            abbr: e,
            name: e
          };
        }),
        blur: function (t) {
          if (e.checkUserRights("page" === e.mode ? ["content"] : ["developer"]) && t !== k) {
            if ("plugin" === P) {
              var n = V.find(function (e) {
                return e.id === j;
              });
              if (!n) return;
              if (t === n.name) return void alert("Plugin can not be inside itself.");
            }

            e.changeBoxPropertyInStructure(P, "tag", t, !1, x);
          }
        },
        withState: !0,
        maxLength: "40",
        maxWidth: "220px"
      }) : k, I && I.properties ? a.a.createElement(a.a.Fragment, null, I.properties.id ? ' id="'.concat(I.properties.id.substr(0, 25) + (I.properties.id.length > 25 ? "..." : ""), '"') : "", I.properties.class ? ' class="'.concat(I.properties.class.substr(0, 25) + (I.properties.class.length > 25 ? "..." : ""), '"') : "") : "", B || F ? F ? "" : " (inherited children)" : " >")), "page" === P ? a.a.createElement("div", null, I.CMSVariableType && 0 === I.CMSVariableType.indexOf("propagating_") || "array" === I.CMSVariableType ? a.a.createElement(m.a, {
        inline: !0,
        buttonClicked: function () {
          return e.addBox(P, "inside");
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M21.6,13.4H13.4v8.2H10.6V13.4H2.4V10.6h8.2V2.4h2.8v8.2h8.2Zm-2.4,2.8h-.1l-.9.9,1.5,1.4H16.2V15.1H15.1v4.4h4.6l-1.5,1.4.9.9,2.6-2.7h.1Z"></path></svg>'
      }) : null, H ? a.a.createElement(a.a.Fragment, null, T.length > 0 && "trash" !== T[0] ? a.a.createElement(m.a, {
        inline: !0,
        buttonClicked: function () {
          return e.addBox(P);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>'
      }) : null, a.a.createElement(m.a, {
        inline: !0,
        buttonClicked: function () {
          return e.deleteBox(P, !0);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>'
      })) : null) : null)))));
    });
  },
  1031: function (e, t, n) {
    "use strict";

    n.r(t);

    var r = n(0),
        a = n.n(r),
        i = n(26),
        o = n(9),
        l = n(505),
        s = n(489),
        c = n(492),
        u = n(591),
        d = n.n(u),
        p = n(592),
        m = n(83),
        h = n(1),
        f = n(515),
        b = n(23),
        g = n.n(b),
        v = n(28),
        _ = n.n(v),
        y = n(560),
        C = n(619),
        S = n(483),
        E = n(531),
        w = n(13),
        O = n.n(w),
        M = n(522),
        x = n(512),
        P = n(40),
        T = n(476),
        j = n(50),
        V = n(561),
        I = n.n(V),
        D = n(622),
        R = n.n(D),
        k = n(532),
        z = n.n(k),
        B = function (e, t, n, r, a) {
      var i = e.find(function (e) {
        return e.id === t;
      });
      if (!i) return "";
      var o = n ? "" : "v=" + (i.v || "0");
      o = (o.length > 0 ? "&" : "") + (r ? "thumbnail=1" : "");
      var l = a ? a + "/" : "",
          s = i.path.reduce(function (t, n) {
        return t + "/" + e.find(function (e) {
          return e.id === n;
        }).name;
      }, "");
      return l + (s.length > 0 ? s + "/" : "") + i.name + (o ? "?" + o : "");
    },
        F = Object(i.b)(function (e, t) {
      return {
        userId: e.userId,
        structure: e.mD.filesStructure,
        currentWebsiteId: e.mD.currentWebsiteId,
        currentFileId: e.mD.currentFileId,
        currentWebsiteObject: e.mD.currentWebsiteObject
      };
    }, function (e) {
      return {
        chooseResource: function (t) {
          return e(o.k(t, "file"));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        },
        sendUpdate: function (t, n, r) {
          return e(j.k(t, n, r));
        }
      };
    })(function (e) {
      var t,
          n = e,
          r = n.scaffoldBlockPxWidth,
          i = n.toggleChildrenVisibility,
          o = n.connectDragPreview,
          l = n.connectDragSource,
          s = n.isDragging,
          c = n.canDrop,
          u = n.canDrag,
          d = n.node,
          p = n.draggedNode,
          m = n.path,
          h = n.treeIndex,
          f = n.isSearchMatch,
          b = n.isSearchFocus,
          g = n.className,
          v = n.style,
          _ = n.didDrop;
      u && (t = l(a.a.createElement("div", {
        className: y.rst__moveHandle
      }, a.a.createElement("i", {
        className: "material-icons"
      }, "more_vert"))));
      var C = !_ && s,
          S = p && Object(x.e)(p, d),
          E = {
        left: -.5 * r
      },
          w = e.node,
          T = w.name,
          j = w.id,
          V = w.size,
          D = w.type,
          k = [y.rst__row];
      C && k.push(y.rst__rowLandingPad), C && !c && k.push(y.rst__rowCancelPad), f && k.push(y.rst__rowSearchMatch), b && k.push(y.rst__rowSearchFocus), C || k.push(g);
      return a.a.createElement("div", Object.assign({}, Object(x.a)({
        style: {
          height: "100%"
        }
      }), {
        onMouseDown: function () {
          return function (t) {
            e.currentFileId !== t && e.chooseResource(t);
          }(j);
        }
      }), i && d.children && (d.children.length > 0 || "function" === typeof d.children) && a.a.createElement("div", {
        onMouseDown: function (e) {
          return e.stopPropagation();
        }
      }, a.a.createElement("button", {
        type: "button",
        "aria-label": d.expanded ? "Collapse" : "Expand",
        className: d.expanded ? y.rst__collapseButton : y.rst__expandButton,
        style: E,
        onClick: function () {
          return i({
            node: d,
            path: m,
            treeIndex: h
          });
        }
      }), d.expanded && !s && a.a.createElement("div", {
        style: {
          width: r
        },
        className: y.rst__lineChildren
      })), a.a.createElement("div", {
        className: y.rst__rowWrapper
      }, o(a.a.createElement("div", {
        className: k.join(" "),
        style: Object(x.b)({
          opacity: S ? .5 : 1
        }, v)
      }, t, a.a.createElement("div", {
        className: u ? y.rst__rowContents : [y.rst__rowContents, y.rst__rowContentsDragDisabled].join(" ")
      }, a.a.createElement("div", {
        className: y.rst__rowLabel
      }, e.checkUserRights(["content", "developer"], !0) ? a.a.createElement(M.a, {
        value: T,
        items: [],
        blur: function (t) {
          return function (t, n, r) {
            if (e.checkUserRights(["content", "developer"])) {
              n = n.trim();
              var a = O()(e.structure),
                  i = a.find(function (e) {
                return e.id === r;
              });
              i[t] !== n && (i[t] = n, e.sendUpdate("website", {
                filesStructure: a
              }, e.currentWebsiteId));
            }
          }("name", t, j);
        },
        withState: !0,
        requiredRights: ["content", "developer"],
        maxLength: "38",
        maxWidth: "320px"
      }) : T, a.a.createElement("div", {
        style: {
          display: "inline-block"
        }
      }, I()(V, {
        decimalPlaces: 1
      })), a.a.createElement("div", {
        style: {
          color: "#777",
          paddingLeft: "5px"
        }
      }, a.a.createElement(z.a, {
        date: e.node.modifiedDate
      })), a.a.createElement("div", {
        style: {
          position: "absolute",
          right: "-40px",
          top: "0px",
          width: "40px",
          height: "40px",
          overflow: "hidden",
          background: "#fff",
          border: "1px solid #eee",
          boxSizing: "border-box",
          lineHeight: "40px",
          textAlign: "center"
        }
      }, D.indexOf("image") >= 0 ? a.a.createElement(R.a, {
        height: 40
      }, a.a.createElement("img", {
        src: B(e.structure, j, !1, !0, e.currentWebsiteObject.domain),
        style: {
          maxWidth: "100%",
          maxHeight: "100%",
          verticalAlign: "middle"
        },
        alt: "websiter"
      })) : a.a.createElement(P.a, {
        icon: '<svg width="40" height="30" viewBox="0 0 24 24"><path fill="#555" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></svg>'
      }))))))));
    }),
        N = n(562),
        H = n(60),
        W = n(513),
        L = n(620),
        K = n.n(L),
        A = Object(i.b)(function (e, t) {
      return {
        structure: e.mD.filesStructure,
        currentResource: e.mD.currentFileId,
        currentWebsiteId: e.mD.currentWebsiteId,
        currentResourcesStructureElement: e.mD.currentFileItem,
        isFocused: "filesresources" === e.activeContainer,
        tooltipsOff: e.mD.tooltipsOff
      };
    }, function (e, t) {
      return {
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        },
        setActiveContainer: function (t) {
          return e(o.K(t));
        },
        unsetActiveContainer: function (t) {
          return e(o.R(t));
        },
        uploadFile: function (t) {
          return e(o.V(t));
        },
        deleteFile: function (t) {
          return e(o.p(t));
        },
        sendUpdate: function (t, n, r) {
          return e(j.k(t, n, r));
        }
      };
    })(function (e) {
      var t = e.structure,
          n = e.currentResource,
          i = e.currentResourcesStructureElement,
          o = Object(H.a)(t),
          l = function () {
        i && function (e) {
          var t = document.createElement("textarea");
          t.value = e, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", document.body.appendChild(t);
          var n = document.getSelection().rangeCount > 0 && document.getSelection().getRangeAt(0),
              r = document.activeElement;
          t.select(), document.execCommand("copy"), document.body.removeChild(t), n && (document.getSelection().removeAllRanges(), document.getSelection().addRange(n)), r && r.focus();
        }(B(e.structure, i.id, !0));
      },
          s = function () {
        var t = new File([""], "New file.css", {
          type: "text/css"
        });
        e.uploadFile([t]);
      },
          c = Object(r.useState)({
        searchString: "",
        searchFocusIndex: 0,
        searchFoundCount: null,
        searchStringHasBeenCleared: !0,
        searchOpen: !1
      }),
          u = Object(m.a)(c, 2),
          d = u[0],
          p = u[1],
          b = function (t) {
        if ("blur" === t) e.unsetActiveContainer("filesresources");else if (e.setActiveContainer("filesresources"), t) {
          var r = t.code;
          if (!e.checkUserRights(["content", "developer"])) return;

          switch (r) {
            case "KeyA":
              t.ctrlKey && (t.preventDefault(), t.shiftKey ? s() : v.current && v.current.click());
              break;

            case "KeyS":
              t.ctrlKey && (t.preventDefault(), e.saveFile(n, !t.shiftKey));
              break;

            case "KeyF":
              t.ctrlKey && (t.preventDefault(), p(Object(h.a)({}, d, {
                searchOpen: !d.searchOpen
              })));
              break;

            case "Delete":
              t.preventDefault(), e.deleteFile(n);
              break;

            case "KeyL":
              t.ctrlKey && (t.preventDefault(), l());
          }
        }
      },
          v = Object(r.useRef)(null);

      return a.a.createElement("div", {
        className: y.Container,
        tabIndex: "0",
        onKeyDown: function (e) {
          b(e.nativeEvent);
        },
        onMouseDown: function () {
          b();
        },
        onTouchStart: function () {
          b();
        },
        onFocus: function () {
          b();
        },
        onBlur: function () {
          b("blur");
        }
      }, a.a.createElement("div", null, a.a.createElement("label", {
        "data-tip": "Upload file",
        className: [y.ImageContainer, C.Button, C.Inline].join(" ")
      }, a.a.createElement("input", {
        ref: v,
        className: y.ImageInput,
        type: "file",
        onChange: function (t) {
          e.checkUserRights(["developer", "content"]) && e.uploadFile(t.target.files);
        }
      }), a.a.createElement(P.a, {
        className: C.Svg,
        icon: '<svg height="20" viewBox="0 0 24 24" width="20"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" ></path></svg>'
      })), e.tooltipsOff ? null : a.a.createElement(K.a, {
        effect: "solid",
        multiline: !0,
        place: "top",
        className: C.Tooltip,
        delayShow: 250,
        overridePosition: S.c
      }), a.a.createElement(S.b, {
        inline: !0,
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>',
        buttonClicked: s,
        tooltip: "Create new file",
        requiredRights: ["developer", "content"]
      }), a.a.createElement(S.b, {
        inline: !0,
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg>',
        buttonClicked: function () {
          return e.saveFile(n, !0);
        },
        tooltip: "Save file",
        requiredRights: ["developer", "content"]
      }), a.a.createElement(S.b, {
        inline: !0,
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M10,14H8.5H5v-3.8C5,10.1,5.1,10,5.3,10h3.3H10V9H4.5C4.2,9,4,9.2,4,9.5V14H2V2h2v3.5C4,5.8,4.2,6,4.5,6h5   C9.8,6,10,5.8,10,5.5V2h0.8c0.3,0,0.5,0.1,0.7,0.3l1.9,2C13.8,4.7,14,5.2,14,5.7v2.8V10h1V5.4c0-0.5-0.2-1-0.6-1.4l-2.4-2.4   C11.7,1.2,11.2,1,10.7,1H1.5C1.2,1,1,1.2,1,1.5v13C1,14.8,1.2,15,1.5,15H10V14z M7,2.3C7,2.1,7.1,2,7.3,2h1.5C8.9,2,9,2.1,9,2.3   v2.5C9,4.9,8.9,5,8.8,5H7.3C7.1,5,7,4.9,7,4.8V2.3z"></path></svg>',
        buttonClicked: function () {
          return e.saveFile(n);
        },
        tooltip: "Save as a new file",
        requiredRights: ["developer", "content"]
      }), a.a.createElement(S.b, {
        inline: !0,
        icon: '<svg height="20" viewBox="0 0 24 24" width="20"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" ></path></svg>',
        buttonClicked: function () {
          return e.deleteFile(n);
        },
        tooltip: "Delete file",
        requiredRights: ["developer", "content"]
      }), a.a.createElement(S.b, {
        inline: !0,
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>',
        buttonClicked: function () {
          return p(Object(h.a)({}, d, {
            searchOpen: !d.searchOpen
          }));
        },
        tooltip: "Show or hide search (Ctrl + F)"
      }), a.a.createElement(S.b, {
        inline: !0,
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>',
        buttonClicked: l,
        tooltip: "Copy path to the media file to clipboard.<br>You can paste it where needed.",
        requiredRights: ["developer", "content"]
      })), a.a.createElement("div", {
        className: y.TreeContainer
      }, a.a.createElement(f.a, {
        treeData: o,
        onChange: function (n) {
          var r = [];

          if (Object(E.a)(n, [], r), !g()(r, t)) {
            if (!g()(r.map(function (e) {
              return _()(e, ["expanded", "children", "itemPath"]);
            }), t.map(function (e) {
              return _()(e, ["expanded", "children", "itemPath"]);
            })) && !e.checkUserRights(["content", "developer"])) return;
            e.sendUpdate("website", {
              filesStructure: r
            }, e.currentWebsiteId);
          }
        },
        nodeContentRenderer: F,
        scaffoldBlockPxWidth: 22,
        isVirtualized: !0,
        rowHeight: 40,
        searchQuery: d.searchString,
        searchFocusOffset: d.searchFocusIndex,
        searchFinishCallback: function (e) {
          return p(Object(h.a)({}, d, {
            searchFoundCount: e.length,
            searchFocusIndex: e.length > 0 ? d.searchFocusIndex % e.length : 0
          }));
        },
        searchMethod: function (e) {
          var t = e.node,
              n = (e.path, e.treeIndex, e.searchQuery);
          return !!n && (t.name.indexOf(n) > -1 || void 0);
        },
        style: {
          flex: "1 1",
          height: "auto !important",
          overflow: "auto"
        },
        generateNodeProps: function (t) {
          return {
            className: t.node.id === n ? e.isFocused ? [y.Chosen] : [y.ChosenBlur] : null,
            type: e.type
          };
        }
      }), a.a.createElement(W.a, null)), d.searchOpen ? a.a.createElement(N.a, {
        state: d,
        setState: p
      }) : null);
    }),
        U = n(8),
        q = n.n(U),
        G = (n(770), n(503)),
        Z = n(504),
        Y = (n(801), n(802), n(803)),
        J = n.n(Y),
        Q = n(811),
        X = n.n(Q),
        $ = function (e) {
      return a.a.createElement("div", {
        className: e.inline ? [X.a.Div, X.a.Inline].join(" ") : X.a.Div
      }, e.title, a.a.createElement("input", {
        "data-testid": e.datatestid || "input",
        type: "number",
        className: X.a.Input,
        value: e.value || 0,
        onChange: function (t) {
          var n = parseInt(t.target.value) || 0;
          void 0 !== e.min && n < e.min && (n = e.min), void 0 !== e.max && n > e.max && (n = e.max), e.changed(n);
        }
      }));
    },
        ee = n(89),
        te = Object(r.forwardRef)(function (e, t) {
      Object(r.useEffect)(function () {
        e.setLoaded(!1);
      }, [e.currentFileId]);
      var n = Object(r.useState)(e.currentFileItem.resolution),
          i = Object(m.a)(n, 2),
          o = i[0],
          l = i[1],
          s = Object(r.useState)(e.currentFileItem.size),
          c = Object(m.a)(s, 2),
          u = c[0],
          h = c[1],
          f = Object(r.useState)(),
          b = Object(m.a)(f, 2),
          g = b[0],
          v = b[1];
      if (!e.currentFileItem) return null;

      var _ = function (t, n) {
        l("width" === n ? {
          width: t,
          height: t * (e.currentFileItem.resolution.height / e.currentFileItem.resolution.width)
        } : {
          width: t * (e.currentFileItem.resolution.width / e.currentFileItem.resolution.height),
          height: t
        });
      };

      var y = function () {
        !function (e, t) {
          var n = new XMLHttpRequest();
          n.open("get", e), n.responseType = "blob", n.onload = function () {
            var e = new FileReader();
            e.onload = function () {
              t(this.result);
            }, e.readAsDataURL(n.response);
          }, n.send();
        }(B(e.structure, e.currentFileItem.id, !1, !1, e.currentWebsiteObject.domain), function (t) {
          v(t), e.setValue(t);
        });
      };

      if (e.currentFileItem.type.indexOf("image") >= 0) {
        return e.loaded ? "resize" === e.loaded ? a.a.createElement("div", null, a.a.createElement("div", null, a.a.createElement("table", null, a.a.createElement("tbody", null, a.a.createElement("tr", null, a.a.createElement("td", null, "Current size"), a.a.createElement("td", null, I()(u, {
          decimalPlaces: 1
        }))), a.a.createElement("tr", null, a.a.createElement("td", null, "Current resolution"), a.a.createElement("td", null, e.currentFileItem.resolution.width, " ", "X", " ", e.currentFileItem.resolution.height)), a.a.createElement("tr", null, a.a.createElement("td", null, "Set new resolution"), a.a.createElement("td", null, a.a.createElement($, {
          min: 0,
          changed: function (e) {
            return _(e, "width");
          },
          value: parseInt(o.width),
          inline: !0
        }), " ", "X", " ", a.a.createElement($, {
          min: 0,
          changed: function (e) {
            return _(e, "height");
          },
          value: parseInt(o.height),
          inline: !0
        }), a.a.createElement(S.b, {
          title: "Apply",
          inline: !0,
          buttonClicked: function () {
            Object(ee.b)(g, o, function () {
              var t = Object(p.a)(d.a.mark(function t(n) {
                var r;
                return d.a.wrap(function (t) {
                  for (;;) switch (t.prev = t.next) {
                    case 0:
                      return e.setValue(n), t.next = 3, Object(ee.d)(n, e.currentFileItem.name + " (copy)");

                    case 3:
                      r = t.sent, h(r.size);

                    case 5:
                    case "end":
                      return t.stop();
                  }
                }, t);
              }));
              return function (e) {
                return t.apply(this, arguments);
              };
            }()), e.setValue();
          }
        })))))), a.a.createElement("img", {
          alt: "Is loading",
          src: e.value
        })) : a.a.createElement(J.a, {
          ref: t,
          includeUI: {
            loadImage: {
              path: B(e.structure, e.currentFileItem.id, !1, !1, e.currentWebsiteObject.domain),
              name: "SampleImage"
            },
            theme: {},
            menu: ["crop", "flip", "rotate", "draw", "shape", "icon", "text", "mask", "filter"],
            initMenu: "filter",
            uiSize: {
              width: "1000px",
              height: "700px"
            },
            menuBarPosition: "right"
          },
          cssMaxHeight: 500,
          cssMaxWidth: 700,
          selectionStyle: {
            cornerSize: 20,
            rotatingPointOffset: 70
          },
          usageStatistics: !1
        }) : a.a.createElement("div", {
          style: {
            margin: "30px auto"
          }
        }, a.a.createElement("button", {
          onClick: function () {
            return e.setLoaded(!0);
          }
        }, "Edit"), a.a.createElement("button", {
          onClick: function () {
            e.setLoaded("resize"), y();
          }
        }, "Resize"), a.a.createElement("img", {
          src: B(e.structure, e.currentFileItem.id, !1, !0, e.currentWebsiteObject.domain),
          style: {
            maxHeight: "120",
            maxWidth: "120",
            display: "block"
          },
          alt: "websiter"
        }), e.currentFileItem ? a.a.createElement("table", null, a.a.createElement("tbody", null, a.a.createElement("tr", null, a.a.createElement("td", null, "Name"), a.a.createElement("td", null, e.currentFileItem.name)), a.a.createElement("tr", null, a.a.createElement("td", null, "Size"), a.a.createElement("td", null, I()(e.currentFileItem.size, {
          decimalPlaces: 1
        }))), a.a.createElement("tr", null, a.a.createElement("td", null, "Type"), a.a.createElement("td", null, e.currentFileItem.type)), a.a.createElement("tr", null, a.a.createElement("td", null, "Date created"), a.a.createElement("td", null, a.a.createElement(z.a, {
          date: e.currentFileItem.createdDate
        }))), a.a.createElement("tr", null, a.a.createElement("td", null, "Date modified"), a.a.createElement("td", null, a.a.createElement(z.a, {
          date: e.currentFileItem.modifiedDate
        }))))) : null);
      }

      if (e.currentFileItem.type.indexOf("text") >= 0) {
        var C = [{
          value: "text",
          label: "text"
        }, {
          value: "css",
          label: "css"
        }, {
          value: "javascript",
          label: "javascript"
        }, {
          value: "json",
          label: "json"
        }, {
          value: "html",
          label: "html"
        }];
        return e.loaded ? a.a.createElement(a.a.Fragment, null, a.a.createElement(Z.a, {
          options: C,
          default: C.findIndex(function (t) {
            return t.label === e.editorMode;
          }),
          onChange: function (t) {
            return e.setEditorMode(t.value);
          },
          isClearable: !1,
          requiredRights: ["developer", "content"]
        }), a.a.createElement(G.a, {
          currentElement: e.currentFileId,
          elementValue: e.value,
          editorMode: e.editorMode,
          handleChange: function (t) {
            return e.setValue(t);
          },
          name: "editorProperties",
          requiredRights: ["developer"],
          currentResource: "0"
        })) : a.a.createElement("div", {
          style: {
            margin: "30px auto"
          }
        }, a.a.createElement("button", {
          onClick: function () {
            q.a.get(e.currentFileItem.url).then(function (t) {
              e.setValue(t.data), e.setEditorMode(e.currentFileItem.editorMode || "css"), e.setLoaded(!0);
            });
          }
        }, "Edit"), a.a.createElement(P.a, {
          icon: '<svg width="100" height="100" viewBox="0 0 24 24"><path fill="#555" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></svg>'
        }));
      }

      return a.a.createElement("div", {
        style: {
          margin: "30px auto"
        }
      }, a.a.createElement(P.a, {
        icon: '<svg width="100" height="100" viewBox="0 0 24 24"><path fill="#555" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></svg>'
      }));
    }),
        ne = Object(i.b)(function (e) {
      return {
        currentFileItem: e.mD.currentFileItem,
        currentFileId: e.mD.currentFileId,
        structure: e.mD.filesStructure,
        currentWebsiteObject: e.mD.currentWebsiteObject
      };
    }, null, null, {
      forwardRef: !0
    })(te),
        re = Object(i.b)(function (e) {
      return {
        currentWebsiteObject: e.mD.currentWebsiteObject,
        barSizes: e.barSizes,
        currentFileItem: e.mD.currentFileItem
      };
    }, function (e, t) {
      return {
        uploadFile: function (t, n, r) {
          return e(o.V(t, n, r));
        }
      };
    })(function (e) {
      var t = Object(r.useState)(""),
          n = Object(m.a)(t, 2),
          i = n[0],
          o = n[1],
          l = Object(r.useState)("css"),
          u = Object(m.a)(l, 2),
          h = u[0],
          f = u[1],
          b = Object(r.useState)(!1),
          g = Object(m.a)(b, 2),
          v = g[0],
          _ = g[1],
          y = function () {
        var t = Object(p.a)(d.a.mark(function t(n, r) {
          var a, o;
          return d.a.wrap(function (t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (n !== e.currentFileItem.id) {
                  t.next = 17;
                  break;
                }

                if ("resize" !== v) {
                  t.next = 7;
                  break;
                }

                return t.next = 4, Object(ee.d)(i, e.currentFileItem.name + " (copy)");

              case 4:
                a = t.sent, t.next = 15;
                break;

              case 7:
                if (!(C.current && e.currentFileItem.type.indexOf("image") >= 0)) {
                  t.next = 14;
                  break;
                }

                return o = C.current.getInstance().toDataURL(), t.next = 11, Object(ee.d)(o, e.currentFileItem.name + " (copy)");

              case 11:
                a = t.sent, t.next = 15;
                break;

              case 14:
                a = new File([i], e.currentFileItem.name + " (copy)", {
                  type: e.currentFileItem.type
                });

              case 15:
                r && (r = e.currentFileItem), e.uploadFile([a], r, h);

              case 17:
              case "end":
                return t.stop();
            }
          }, t);
        }));
        return function (e, n) {
          return t.apply(this, arguments);
        };
      }(),
          C = Object(r.useRef)(null);

      return e.currentWebsiteObject ? a.a.createElement("div", {
        className: s.Content
      }, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width + "px"
        }
      }, a.a.createElement(A, {
        saveFile: y
      }), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width,
        type: "width"
      })), e.currentFileItem ? a.a.createElement("div", {
        className: s.LastContainer
      }, a.a.createElement(ne, {
        ref: C,
        value: i,
        setValue: o,
        editorMode: h,
        setEditorMode: f,
        loaded: v,
        setLoaded: _
      })) : null) : null;
    }),
        ae = n(17),
        ie = n(495),
        oe = n(5),
        le = Object(i.b)(function (e, t) {
      return {
        newVersionResources: e.newVersionResources,
        notSavedResources: e.notSavedResources,
        resourcesObjects: e.resourcesObjects,
        userId: e.userId,
        structure: e.mD[oe.e[t.type]],
        currentWebsiteId: e.mD.currentWebsiteId,
        currentPageId: e.mD.currentPageId,
        currentTemplateId: e.mD.currentTemplateId,
        currentPluginId: e.mD.currentPluginId,
        globalSettingsPageId: e.mD.globalSettingsPageId,
        globalSettingsTemplateId: e.mD.globalSettingsTemplateId
      };
    }, function (e) {
      return {
        chooseResource: function (t, n) {
          return e(o.k(t, n));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        },
        sendUpdate: function (t, n, r) {
          return e(j.k(t, n, r));
        }
      };
    })(function (e) {
      var t,
          n = e,
          r = n.scaffoldBlockPxWidth,
          i = n.toggleChildrenVisibility,
          o = n.connectDragPreview,
          l = n.connectDragSource,
          s = n.isDragging,
          c = n.canDrop,
          u = n.canDrag,
          d = n.node,
          p = n.draggedNode,
          m = n.path,
          h = n.treeIndex,
          f = n.isSearchMatch,
          b = n.isSearchFocus,
          g = n.className,
          v = n.style,
          _ = n.didDrop;
      u && (t = l(a.a.createElement("div", {
        className: ie.rst__moveHandle
      }, a.a.createElement("i", {
        className: "material-icons"
      }, "more_vert"))));
      var y = !_ && s,
          C = p && Object(x.e)(p, d),
          S = {
        left: -.5 * r
      },
          E = e.node,
          w = E.name,
          T = E.id,
          j = E.url,
          V = E.homepage,
          I = E.hidden,
          D = E.published,
          R = (E.generalSettings, E.propagating),
          k = T === e.globalSettingsPageId || T === e.globalSettingsTemplateId,
          z = [ie.rst__row];
      y && z.push(ie.rst__rowLandingPad), y && !c && z.push(ie.rst__rowCancelPad), f && z.push(ie.rst__rowSearchMatch), b && z.push(ie.rst__rowSearchFocus), y || z.push(g);

      var B = function (t, n, r) {
        if (e.checkUserRights("page" === e.type ? ["content"] : ["developer"])) {
          n = n.trim(), "url" === t && (n = n.replace(/\s+/g, "-").toLowerCase());
          var a = O()(e.structure),
              i = a.find(function (e) {
            return e.id === r;
          });
          i[t] !== n && (i[t] = n, e.sendUpdate("website", Object(ae.a)({}, oe.e[e.type], a), e.currentWebsiteId));
        }
      };

      return a.a.createElement("div", Object.assign({}, Object(x.a)({
        style: {
          height: "100%"
        }
      }), {
        onMouseDown: function () {
          return function (t) {
            e.currentPageId !== t && e.currentTemplateId !== t && e.currentPluginId !== t && e.chooseResource(t, e.type);
          }(T);
        }
      }), i && d.children && (d.children.length > 0 || "function" === typeof d.children) && a.a.createElement("div", {
        onMouseDown: function (e) {
          return e.stopPropagation();
        }
      }, a.a.createElement("button", {
        type: "button",
        "aria-label": d.expanded ? "Collapse" : "Expand",
        className: d.expanded ? ie.rst__collapseButton : ie.rst__expandButton,
        style: S,
        onClick: function () {
          return i({
            node: d,
            path: m,
            treeIndex: h
          });
        }
      }), d.expanded && !s && a.a.createElement("div", {
        style: {
          width: r
        },
        className: ie.rst__lineChildren
      })), a.a.createElement("div", {
        className: ie.rst__rowWrapper
      }, o(a.a.createElement("div", {
        className: z.join(" "),
        style: Object(x.b)({
          opacity: C ? .5 : 1
        }, v)
      }, t, a.a.createElement("div", {
        className: u ? ie.rst__rowContents : [ie.rst__rowContents, ie.rst__rowContentsDragDisabled].join(" "),
        style: "page" === e.type ? {
          minWidth: "350px"
        } : {}
      }, a.a.createElement("div", {
        className: ie.rst__rowLabel
      }, e.checkUserRights("page" === e.type ? ["content"] : ["developer"], !0) && !k ? a.a.createElement(M.a, {
        value: w,
        items: [],
        blur: function (e) {
          return B("name", e, T);
        },
        withState: !0,
        requiredRights: "page" === e.type ? ["content"] : ["developer"],
        maxLength: "40",
        maxWidth: "220px"
      }) : w), a.a.createElement("div", {
        className: [ie.IconsContainer, "page" === e.type ? ie.IconsContainerPage : ie.IconsContainerNotPage].join(" ")
      }, a.a.createElement("div", null, e.notSavedResources.includes(T) ? a.a.createElement(P.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg>'
      }) : a.a.createElement(P.a, {
        icon: '<svg width="17" height="17"></svg>'
      })), a.a.createElement("div", null, D ? a.a.createElement(P.a, {
        icon: '<svg width="17" height="17"></svg>'
      }) : a.a.createElement(P.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></svg>'
      })), a.a.createElement("div", null, e.newVersionResources.includes(T) ? a.a.createElement(P.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M20,4H4C2.89,4,2.01,4.89,2.01,6L2,18c0,1.11,0.89,2,2,2h16c1.11,0,2-0.89,2-2V6C22,4.89,21.11,4,20,4z M8.5,15H7.3 l-2.55-3.5V15H3.5V9h1.25l2.5,3.5V9H8.5V15z M13.5,10.26H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4V10.26z M20.5,14 c0,0.55-0.45,1-1,1h-4c-0.55,0-1-0.45-1-1V9h1.25v4.51h1.13V9.99h1.25v3.51h1.12V9h1.25V14z"></path></svg>'
      }) : a.a.createElement(P.a, {
        icon: '<svg width="17" height="17"></svg>'
      })), "page" !== e.type || k ? null : a.a.createElement("div", null, V ? a.a.createElement(P.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>'
      }) : a.a.createElement(P.a, {
        icon: '<svg width="17" height="17"></svg>'
      })), "page" !== e.type || k ? null : a.a.createElement("div", null, I ? a.a.createElement(P.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>'
      }) : a.a.createElement(P.a, {
        icon: '<svg width="17" height="17"></svg>'
      })), "plugin" === e.type ? a.a.createElement("div", null, R ? a.a.createElement(P.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M8,8H6v7c0,1.1,0.9,2,2,2h9v-2H8V8z"></path><path d="M20,3h-8c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,11h-8V7h8V11z"></path><path d="M4,12H2v7c0,1.1,0.9,2,2,2h9v-2H4V12z"></path></svg>'
      }) : a.a.createElement(P.a, {
        icon: '<svg width="17" height="17"></svg>'
      })) : null), "page" !== e.type || k ? null : a.a.createElement("div", {
        className: ie.rst__rowLabel
      }, "url:", e.checkUserRights("page" === e.type ? ["content"] : ["developer"], !0) ? a.a.createElement(M.a, {
        value: j,
        items: [],
        blur: function (e) {
          return B("url", e, T);
        },
        withState: !0,
        allowEmpty: !0,
        maxLength: "30",
        maxWidth: "200px"
      }) : j))))));
    }),
        se = Object(i.b)(function (e, t) {
      return {
        newVersionResources: e.newVersionResources,
        structure: e.mD[oe.e[t.type]],
        currentResource: e.mD[oe.a[t.type]],
        isGlobalSettingsPage: e.mD[oe.a[t.type]] === e.mD.globalSettingsPageId || e.mD[oe.a[t.type]] === e.mD.globalSettingsTemplateId,
        currentWebsiteId: e.mD.currentWebsiteId,
        currentResourcesStructureElement: e.mD[oe.c[t.type]],
        templatesStructure: e.mD.templatesStructure,
        isFocused: e.activeContainer === t.type + "resources"
      };
    }, function (e, t) {
      return {
        revertResource: function (t, n, r) {
          return e(j.i(t, n, r));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        },
        sendUpdate: function (t, n, r) {
          return e(j.k(t, n, r));
        },
        publishResource: function (t) {
          return e(j.h(t));
        },
        addResource: function (t, n) {
          return e(j.a(t, n));
        },
        deleteResource: function (t) {
          return e(j.e(t));
        },
        setActiveContainer: function (t) {
          return e(o.K(t));
        },
        unsetActiveContainer: function (t) {
          return e(o.R(t));
        }
      };
    })(function (e) {
      var t = e.structure,
          n = e.currentResource,
          i = e.currentResourcesStructureElement,
          o = Object(H.a)(t),
          l = function (r, a) {
        if (i) {
          var o = t.map(function (e) {
            return e.id === n ? Object(h.a)({}, e, Object(ae.a)({}, r, a)) : "homepage" === r ? Object(h.a)({}, e, {
              homepage: !1
            }) : e;
          });
          e.sendUpdate("website", Object(ae.a)({}, oe.e[e.type], o), e.currentWebsiteId);
        }
      },
          s = function () {
        i && e.sendUpdate(e.type, {}, n);
      },
          c = function (t) {
        i && e.publishResource(e.type);
      },
          u = Object(r.useState)({
        searchString: "",
        searchFocusIndex: 0,
        searchFoundCount: null,
        searchStringHasBeenCleared: !0,
        searchOpen: !1
      }),
          d = Object(m.a)(u, 2),
          p = d[0],
          b = d[1],
          v = e.templatesStructure.filter(function (e) {
        return !e.generalSettings && !e.hidden;
      }).map(function (e) {
        return {
          label: e.name,
          value: e.name
        };
      }),
          y = {
        add: "page" === e.type ? ["content"] : ["developer"],
        home: ["content"]
      },
          C = function (t) {
        if ("blur" === t) e.unsetActiveContainer(e.type + "resources");else if (e.setActiveContainer(e.type + "resources"), t) {
          var n = t.code;
          if (!e.checkUserRights(y["KeyH" === n ? "home" : "add"])) return;

          switch (n) {
            case "KeyA":
              t.ctrlKey && (t.preventDefault(), e.addResource(e.type));
              break;

            case "KeyD":
              t.ctrlKey && (t.preventDefault(), e.addResource(e.type, !0));
              break;

            case "KeyH":
              t.ctrlKey && i && (t.preventDefault(), l("hidden", !i.hidden));
              break;

            case "KeyS":
              t.ctrlKey && (t.preventDefault(), s());
              break;

            case "KeyP":
              t.ctrlKey && (t.preventDefault(), c());
              break;

            case "KeyF":
              t.ctrlKey && (t.preventDefault(), b(Object(h.a)({}, p, {
                searchOpen: !p.searchOpen
              })));
              break;

            case "Delete":
              t.preventDefault(), e.deleteResource(e.type);
          }
        }
      };

      return a.a.createElement("div", {
        className: ie.Container,
        tabIndex: "0",
        onKeyDown: function (e) {
          C(e.nativeEvent);
        },
        onMouseDown: function () {
          C();
        },
        onTouchStart: function () {
          C();
        },
        onFocus: function () {
          C();
        },
        onBlur: function () {
          C("blur");
        }
      }, a.a.createElement("div", null, a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return e.addResource(e.type);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>',
        tooltip: "Add new resource (page, template or plugin) (Ctrl + A)",
        requiredRights: y.add
      }), e.isGlobalSettingsPage ? null : a.a.createElement(a.a.Fragment, null, a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return e.addResource(e.type, !0);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>',
        tooltip: "Duplicate resource (Ctrl + D)",
        requiredRights: y.add
      }), a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return e.deleteResource(e.type);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>',
        tooltip: "Delete resource (Delete)",
        requiredRights: y.add
      })), "page" !== e.type || e.isGlobalSettingsPage ? null : a.a.createElement(a.a.Fragment, null, a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return l("homepage", !0);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>',
        tooltip: "Set as the homepage",
        requiredRights: y.home
      }), a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          i && l("hidden", !i.hidden);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>',
        tooltip: "Make hidden or visible. <br>Hidden resources do not influence other resources. (Ctrl + H)",
        requiredRights: y.home
      })), a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return s();
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg>',
        tooltip: "Save all changes in the resource.<br>Saved changes are not visible on the live version if they are not published. (Ctrl + S)",
        requiredRights: y.add
      }), a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return c();
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></svg>',
        tooltip: "Publish last saved changes of the resource. (Ctrl + P)",
        requiredRights: y.add
      }), e.newVersionResources.includes(n) ? a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return e.revertResource(e.type, "draft");
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M20,4H4C2.89,4,2.01,4.89,2.01,6L2,18c0,1.11,0.89,2,2,2h16c1.11,0,2-0.89,2-2V6C22,4.89,21.11,4,20,4z M8.5,15H7.3 l-2.55-3.5V15H3.5V9h1.25l2.5,3.5V9H8.5V15z M13.5,10.26H11v1.12h2.5v1.26H11v1.11h2.5V15h-4V9h4V10.26z M20.5,14 c0,0.55-0.45,1-1,1h-4c-0.55,0-1-0.45-1-1V9h1.25v4.51h1.13V9.99h1.25v3.51h1.12V9h1.25V14z"></path></svg>',
        tooltip: "A new version of this resource is available. Press the button to load the new version.",
        requiredRights: y.add
      }) : null, a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return e.revertResource(e.type, "published");
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M15.2,8c-3.8,0-6.8,3.1-6.8,6.8c0,3.8,3,6.8,6.8,6.8s6.8-3.1,6.8-6.8S19,8,15.2,8z M19.9,12.1h-2c-0.2-0.9-0.5-1.7-0.9-2.4   C18.2,10.1,19.3,11,19.9,12.1z M15.2,9.4c0.6,0.8,1,1.7,1.3,2.7h-2.6C14.2,11.2,14.7,10.3,15.2,9.4z M13.5,9.7   c-0.5,0.8-0.8,1.6-1,2.4h-2C11.2,11,12.2,10.1,13.5,9.7z M9.9,16.2c-0.1-0.4-0.2-0.9-0.2-1.4s0.1-0.9,0.2-1.4h2.3   c-0.1,0.4-0.1,0.9-0.1,1.4s0,0.9,0.1,1.4H9.9z M10.5,17.6h2c0.2,0.9,0.5,1.7,0.9,2.4C12.2,19.6,11.2,18.7,10.5,17.6z M15.2,20.3   c-0.6-0.8-1-1.7-1.3-2.7h2.6C16.2,18.6,15.8,19.5,15.2,20.3z M16.8,16.2h-3.2c-0.1-0.4-0.1-0.9-0.1-1.4s0-0.9,0.1-1.4h3.2   c0.1,0.4,0.1,0.9,0.1,1.4S16.9,15.8,16.8,16.2z M17,20c0.4-0.8,0.7-1.6,0.9-2.4h2C19.3,18.7,18.2,19.6,17,20z M18.2,16.2   c0.1-0.4,0.1-0.9,0.1-1.4s0-0.9-0.1-1.4h2.3c0.1,0.4,0.2,0.9,0.2,1.4s-0.1,0.9-0.2,1.4H18.2z M9,10.6H2V3.5l2,2   c4-3.1,8.1-2.1,11.1,0C12.1,5,9.5,6,7,8.5L9,10.6z"></path></svg>',
        tooltip: "Revert resource to the last published version",
        requiredRights: y.add
      }), a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return e.revertResource(e.type, "draft");
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M18.6,10.1h-7.3c-0.7,0-1.2,0.5-1.2,1.2v8.5c0,0.7,0.5,1.2,1.2,1.2h8.5c0.7,0,1.2-0.5,1.2-1.2v-7.3L18.6,10.1z M15.6,19.8   c-1,0-1.8-0.8-1.8-1.8c0-1,0.8-1.8,1.8-1.8c1,0,1.8,0.8,1.8,1.8C17.4,19,16.6,19.8,15.6,19.8z M17.4,13.7h-6v-2.4h6V13.7z    M10.1,10.1H3V3l2,2c4-3,8.1-2,11.1,0c-3-0.5-5.6,0.5-8.1,3L10.1,10.1z"></path></svg>',
        tooltip: "Revert resource to the last saved version",
        requiredRights: y.add
      }), "plugin" === e.type ? a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          if (i) {
            if (i.propagating && !window.confirm("Are you sure you want to turn off propagating of this plugin? This will remove all CMS variables of this plugin.")) return;
            l("propagating", !i.propagating);
          }
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M8,8H6v7c0,1.1,0.9,2,2,2h9v-2H8V8z"></path><path d="M20,3h-8c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V5C22,3.9,21.1,3,20,3z M20,11h-8V7h8V11z"></path><path d="M4,12H2v7c0,1.1,0.9,2,2,2h9v-2H4V12z"></path></svg>',
        tooltip: "Make pluging propagating.<br>Propagating plugins can be propagated on page.",
        requiredRights: y.add
      }) : null, a.a.createElement(S.b, {
        inline: !0,
        buttonClicked: function () {
          return b(Object(h.a)({}, p, {
            searchOpen: !p.searchOpen
          }));
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>',
        tooltip: "Show or hide search (Ctrl + F)"
      }), "page" === e.type && i ? i.generalSettings ? null : a.a.createElement("div", {
        className: ie.selectContainer
      }, a.a.createElement(Z.a, {
        onChange: function (e) {
          l("template", e.value);
        },
        options: v,
        default: i ? v.findIndex(function (e) {
          return e.value === i.template;
        }) : 0,
        requiredRights: ["content"]
      })) : null), a.a.createElement("div", {
        className: ie.TreeContainer
      }, a.a.createElement(f.a, {
        treeData: o,
        onChange: function (n) {
          var r = [];

          if (Object(E.a)(n, [], r), !g()(r, t)) {
            if (!g()(r.map(function (e) {
              return _()(e, ["expanded", "children", "itemPath"]);
            }), t.map(function (e) {
              return _()(e, ["expanded", "children", "itemPath"]);
            })) && !e.checkUserRights("page" === e.type ? ["content"] : ["developer"])) return;
            e.sendUpdate("website", Object(ae.a)({}, oe.e[e.type], r), e.currentWebsiteId);
          }
        },
        nodeContentRenderer: le,
        scaffoldBlockPxWidth: 22,
        isVirtualized: !0,
        rowHeight: 20,
        searchQuery: p.searchString,
        searchFocusOffset: p.searchFocusIndex,
        searchFinishCallback: function (e) {
          return b(Object(h.a)({}, p, {
            searchFoundCount: e.length,
            searchFocusIndex: e.length > 0 ? p.searchFocusIndex % e.length : 0
          }));
        },
        searchMethod: function (e) {
          var t = e.node,
              n = (e.path, e.treeIndex, e.searchQuery);
          return !!n && (t.name.indexOf(n) > -1 || void 0);
        },
        style: {
          flex: "1 1",
          height: "auto !important",
          overflow: "auto"
        },
        canDrag: function (e) {
          return !e.node.generalSettings;
        },
        canDrop: function (e) {
          var t = e.nextParent;
          return e.nextPath, e.prevPath, !t || !t.generalSettings;
        },
        generateNodeProps: function (t) {
          return {
            className: t.node.id === n ? e.isFocused ? [ie.Chosen] : [ie.ChosenBlur] : null,
            type: e.type
          };
        }
      }), a.a.createElement(W.a, null)), p.searchOpen ? a.a.createElement(N.a, {
        state: p,
        setState: b
      }) : null);
    }),
        ce = n(567),
        ue = n(2),
        de = (n(630), n(533)),
        pe = n(816),
        me = Object(i.b)(null, function (e, t) {
      return {
        splitText: function (t, n, r) {
          return e(o.M(t, n, r));
        },
        textToSpan: function (t, n, r) {
          return e(o.O(t, n, r));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      var t = Object(r.useState)({
        selectionStart: 0,
        selectionEnd: 0,
        value: ""
      }),
          n = Object(m.a)(t, 2),
          i = n[0],
          o = n[1],
          l = Object(r.useRef)(null);
      Object(r.useEffect)(function () {
        e.elementValues.textContent !== i.value && o({
          selectionStart: 0,
          selectionEnd: 0,
          value: e.elementValues.textContent
        });
      }, [e.elementValues.textContent]);

      var s = function (e) {
        o(Object(h.a)({}, i, {
          selectionStart: e.target.selectionStart,
          selectionEnd: e.target.selectionEnd
        }));
      };

      return e.elementValues ? a.a.createElement(a.a.Fragment, null, a.a.createElement("div", null, a.a.createElement("div", {
        className: pe.SelectContainer
      }, a.a.createElement(Z.a, {
        options: [{
          value: "text",
          label: "text"
        }, {
          value: "css",
          label: "css"
        }, {
          value: "javascript",
          label: "javascript"
        }],
        default: "text" === e.elementValues.textMode ? 0 : "css" === e.elementValues.textMode ? 1 : 2,
        onChange: function (t) {
          e.changeProperty("textMode", t.value);
        },
        isClearable: !1,
        requiredRights: e.requiredRights
      })), "text" === e.elementValues.textMode ? a.a.createElement(a.a.Fragment, null, a.a.createElement(S.b, {
        title: "Split",
        buttonClicked: function () {
          e.splitText(e.type, i.selectionStart, i.selectionEnd);
        },
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"></path></svg>',
        inline: !0,
        requiredRights: e.requiredRights
      }), a.a.createElement(S.b, {
        title: "To span",
        buttonClicked: function () {
          e.textToSpan(e.type, i.selectionStart, i.selectionEnd);
        },
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"></path></svg>',
        inline: !0,
        requiredRights: e.requiredRights
      })) : a.a.createElement(S.b, {
        buttonClicked: function () {
          l.current.makeCodePrettier();
        },
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"></path></svg>',
        inline: !0,
        tooltip: "Beautify the code",
        requiredRights: e.requiredRights
      })), a.a.createElement("div", {
        className: pe.Editors
      }, "text" === e.elementValues.textMode ? a.a.createElement("textarea", {
        className: pe.Textarea,
        onChange: function (t) {
          if (e.checkUserRights(e.requiredRights)) {
            var n = t.target.value.replace(/\r\n|\r|\n/g, " ");
            "text" === e.elementValues.textMode && o({
              selectionStart: t.target.selectionStart,
              selectionEnd: t.target.selectionEnd,
              value: n
            }), e.changeProperty("textContent", n);
          }
        },
        value: i.value,
        onKeyUp: s,
        onMouseUp: s
      }) : a.a.createElement(G.a, {
        ref: l,
        currentElement: e.element.id,
        elementValue: e.elementValues.textContent || "",
        editorMode: e.elementValues.textMode,
        handleChange: function (t) {
          e.checkUserRights(e.requiredRights) && (t = t.replace(/\r\n|\r|\n/g, " "), e.changeProperty("textContent", t));
        },
        name: "editorText",
        requiredRights: e.requiredRights
      }))) : null;
    }),
        he = n(817),
        fe = Object(i.b)(null, function (e, t) {
      return {
        parseHTML: function (t, n) {
          return e(o.z(t, n));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      var t = Object(r.useState)(""),
          n = Object(m.a)(t, 2),
          i = n[0],
          o = n[1];
      return e.element ? a.a.createElement(a.a.Fragment, null, a.a.createElement("div", null, a.a.createElement(S.b, {
        title: "Parse the code",
        buttonClicked: function () {
          e.parseHTML(e.type, i);
        },
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"></path></svg>',
        inline: !0,
        requiredRights: e.requiredRights
      })), a.a.createElement("div", {
        className: he.Editors
      }, a.a.createElement(G.a, {
        currentElement: e.currentBox,
        editorValue: "",
        editorMode: "html",
        handleChange: function (t) {
          e.checkUserRights(e.requiredRights) && o(t);
        },
        name: "editorParse",
        requiredRights: ["developer"]
      }))) : null;
    }),
        be = {
      websiterMenu: [{
        value: "horizontal | vertical",
        label: "mode"
      }, {
        value: ["class"],
        label: "topMenuBlockClasses"
      }, {
        value: ["class"],
        label: "topMenuItemClasses"
      }, {
        value: ["class"],
        label: "topMenuItemActiveClasses"
      }, {
        value: ["class"],
        label: "popupMenuBlockClasses"
      }, {
        value: ["class"],
        label: "popupMenuItemClasses"
      }, {
        value: ["class"],
        label: "popupMenuItemActiveClasses"
      }],
      baseHtmlProps: [{
        value: "id",
        label: "id"
      }, {
        value: "class",
        label: "class"
      }]
    },
        ge = n(569),
        ve = n(1025),
        _e = function (e) {
      return Object(r.useEffect)(function () {
        e.setState(!1);
      }), null;
    },
        ye = Object(i.b)(function (e) {
      return {
        sizeIsChanging: e.sizeIsChanging
      };
    }, function (e, t) {
      return {
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      var t = Object(r.useState)(!1),
          n = Object(m.a)(t, 2),
          i = n[0],
          o = n[1],
          l = Object(r.useState)(e.value),
          s = Object(m.a)(l, 2),
          c = s[0],
          u = s[1],
          d = Object(r.useState)(e.currentBox),
          p = Object(m.a)(d, 2),
          h = p[0],
          f = p[1];
      Object(r.useEffect)(function () {
        u(e.value), f(e.currentBox), o(!0);
      }, [e.currentBox]);

      var b = function (t, n) {
        e.checkUserRights(e.requiredRights) && e.handleChange(t, n, h);
      };

      return a.a.createElement("div", {
        style: {
          display: "flex",
          flex: "1",
          flexDirection: "column",
          height: "100%",
          position: "relative"
        }
      }, i ? a.a.createElement(_e, {
        setState: o
      }) : a.a.createElement(ve.a, {
        apiKey: "cgz3v5s8p6m4ivfow51e7pin01evzej1lqy90qmi5z75ly57",
        value: c,
        init: {
          readonly: e.readOnly ? 1 : 0,
          plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table contextmenu paste"],
          toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
          menu: {
            file: {
              title: "File",
              items: " print "
            },
            edit: {
              title: "Edit",
              items: "undo redo | cut copy paste | selectall | searchreplace"
            },
            view: {
              title: "View",
              items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen"
            },
            insert: {
              title: "Insert",
              items: "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime"
            },
            format: {
              title: "Format",
              items: "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat"
            },
            tools: {
              title: "Tools",
              items: "spellchecker spellcheckerlanguage | code wordcount"
            },
            table: {
              title: "Table",
              items: "inserttable | cell row column | tableprops deletetable"
            },
            help: {
              title: "Help",
              items: "help"
            }
          },
          menubar: !0,
          image_advtab: !0
        },
        onChange: b,
        onKeyUp: b,
        onMouseUp: b
      }), e.sizeIsChanging ? a.a.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          opacity: "0",
          position: "absolute"
        }
      }) : null);
    }),
        Ce = n(631),
        Se = Object(i.b)(function (e, t) {
      return {
        userId: e.userId,
        structure: e.mD.filesStructure,
        currentWebsiteId: e.mD.currentWebsiteId,
        currentWebsiteObject: e.mD.currentWebsiteObject
      };
    }, function (e) {
      return {
        chooseResource: function (t) {
          return e(o.k(t, "file"));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      var t = e,
          n = t.scaffoldBlockPxWidth,
          r = t.toggleChildrenVisibility,
          i = t.connectDragPreview,
          o = t.isDragging,
          l = t.canDrop,
          s = t.canDrag,
          c = t.node,
          u = t.draggedNode,
          d = t.path,
          p = t.treeIndex,
          m = t.isSearchMatch,
          h = t.isSearchFocus,
          f = t.className,
          b = t.style,
          g = !t.didDrop && o,
          v = u && Object(x.e)(u, c),
          _ = {
        left: -.5 * n
      },
          C = e.node,
          S = C.name,
          E = C.id,
          w = (C.size, C.type),
          O = [y.rst__row, Ce.rst__row];
      g && O.push(y.rst__rowLandingPad), g && !l && O.push(y.rst__rowCancelPad), m && O.push(y.rst__rowSearchMatch), h && O.push(y.rst__rowSearchFocus), g || O.push(f);
      return a.a.createElement("div", Object.assign({}, Object(x.a)({
        style: {
          height: "100%"
        }
      }), {
        onMouseDown: function () {
          return function (t) {
            e.changeProperty("currentFileId", t);
          }(E);
        }
      }), r && c.children && (c.children.length > 0 || "function" === typeof c.children) && a.a.createElement("div", {
        onMouseDown: function (e) {
          return e.stopPropagation();
        }
      }, a.a.createElement("button", {
        type: "button",
        "aria-label": c.expanded ? "Collapse" : "Expand",
        className: c.expanded ? y.rst__collapseButton : y.rst__expandButton,
        style: _,
        onClick: function () {
          return r({
            node: c,
            path: d,
            treeIndex: p
          });
        }
      })), a.a.createElement("div", {
        className: y.rst__rowWrapper
      }, i(a.a.createElement("div", {
        className: O.join(" "),
        style: Object(x.b)({
          opacity: v ? .5 : 1
        }, b)
      }, a.a.createElement("div", {
        style: {
          width: "100px",
          height: "60px",
          overflow: "hidden",
          boxSizing: "border-box",
          lineHeight: "60px",
          textAlign: "center"
        }
      }, w.indexOf("image") >= 0 ? a.a.createElement(R.a, {
        height: 60
      }, a.a.createElement("img", {
        src: B(e.structure, E, !1, !0, e.currentWebsiteObject.domain),
        style: {
          maxWidth: "100%",
          maxHeight: "100%",
          verticalAlign: "middle"
        },
        alt: "websiter"
      })) : a.a.createElement(P.a, {
        icon: '<svg width="40" height="30" viewBox="0 0 24 24"><path fill="#555" d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></svg>'
      })), a.a.createElement("div", {
        style: {
          padding: "0 7px 0 15px",
          border: "none"
        },
        className: s ? y.rst__rowContents : [y.rst__rowContents, y.rst__rowContentsDragDisabled].join(" ")
      }, a.a.createElement("div", {
        className: y.rst__rowLabel
      }, a.a.createElement("div", null, S), a.a.createElement("div", {
        style: {
          color: "#555"
        }
      }, a.a.createElement(z.a, {
        date: e.node.modifiedDate
      }))))))));
    }),
        Ee = n(133),
        we = Object(i.b)(function (e) {
      return {
        barSizes: e.barSizes,
        filesStructure: e.mD.filesStructure,
        currentWebsiteObject: e.mD.currentWebsiteObject,
        isFocused: "filesitems" === e.activeContainer
      };
    }, function (e, t) {
      return {
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        },
        setActiveContainer: function (t) {
          return e(o.K(t));
        },
        unsetActiveContainer: function (t) {
          return e(o.R(t));
        }
      };
    })(function (e) {
      var t = Object(r.useState)({
        treeDataSource: []
      }),
          n = Object(m.a)(t, 2),
          i = n[0],
          o = n[1];
      Object(r.useEffect)(function () {
        var t = Object(H.a)(e.filesStructure).map(function (e) {
          return Object(h.a)({}, e);
        });
        o(Object(h.a)({}, i, {
          treeDataSource: t
        }));
      }, [e.filesStructure]);

      var u = function (t) {
        "blur" === t ? e.unsetActiveContainer("filesitems") : e.setActiveContainer("filesitems");
      },
          d = e.filesStructure.find(function (t) {
        return t.id === e.elementValues.currentFileId;
      }),
          p = e.filesStructure.find(function (t) {
        return B(e.filesStructure, t.id, !0) === e.elementValues[e.attrName];
      }),
          b = function (e) {
        return a.a.createElement("table", null, a.a.createElement("tbody", null, a.a.createElement("tr", null, a.a.createElement("td", null, "Name"), a.a.createElement("td", null, e.name)), a.a.createElement("tr", null, a.a.createElement("td", null, "Size"), a.a.createElement("td", null, I()(e.size, {
          decimalPlaces: 1
        }))), a.a.createElement("tr", null, a.a.createElement("td", null, "Type"), a.a.createElement("td", null, e.type)), a.a.createElement("tr", null, a.a.createElement("td", null, "Date created"), a.a.createElement("td", null, a.a.createElement(z.a, {
          date: e.createdDate
        }))), a.a.createElement("tr", null, a.a.createElement("td", null, "Date modified"), a.a.createElement("td", null, a.a.createElement(z.a, {
          date: e.modifiedDate
        })))));
      };

      return e.element && e.elementValues ? a.a.createElement("div", {
        className: s.Content
      }, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + (e.barSizes.width3 || 50) + "px"
        },
        tabIndex: "0",
        onKeyDown: function (e) {
          u(e.nativeEvent);
        },
        onMouseDown: function () {
          u();
        },
        onTouchStart: function () {
          u();
        },
        onFocus: function () {
          u();
        },
        onBlur: function () {
          u("blur");
        }
      }, a.a.createElement("div", {
        className: ie.TreeContainer
      }, a.a.createElement(f.a, {
        className: Ce.FilesTree,
        treeData: i.treeDataSource,
        nodeContentRenderer: Se,
        isVirtualized: !0,
        generateNodeProps: function (t) {
          var n = t.node;
          return {
            type: e.type,
            className: p && n.id === p.id ? [ie.ChosenGreen] : n.id === e.elementValues.currentFileId ? e.isFocused ? [ie.Chosen] : [ie.ChosenBlur] : null,
            changeProperty: e.changeProperty,
            elementId: e.element.id,
            fileUrl: e.elementValues[e.attrName],
            attrName: e.attrName
          };
        },
        rowHeight: 60,
        scaffoldBlockPxWidth: 22,
        canDrop: function () {
          return !1;
        },
        canDrag: function () {
          return !1;
        },
        shouldCopyOnOutsideDrop: !0,
        dndType: e.attrName,
        style: {
          flex: "1 1",
          height: "auto !important",
          overflow: "auto"
        },
        onChange: function (e) {
          return o(Object(h.a)({}, i, {
            treeDataSource: e
          }));
        }
      }), a.a.createElement(W.a, null)), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width3 || 50,
        type: "width3"
      })), a.a.createElement("div", {
        className: s.LastContainer
      }, a.a.createElement(l.d, {
        className: ["react-tabs", s.reactTabs, ie.MenuItemsTabs].join(" ")
      }, a.a.createElement(l.b, null, a.a.createElement(l.a, {
        className: ["react-tabs__tab", s.reactTabsTab].join(" ")
      }, "Highlighted file"), a.a.createElement(l.a, {
        className: ["react-tabs__tab", s.reactTabsTab].join(" ")
      }, "Chosen file")), a.a.createElement(l.c, {
        selectedClassName: ["react-tabs__tab-panel--selected", s.reactTabsTabPanelSelected].join(" ")
      }, d ? a.a.createElement("div", {
        style: {
          flex: 1
        }
      }, d.type.indexOf("image") >= 0 ? a.a.createElement(a.a.Fragment, null, a.a.createElement(Ee.a, {
        checked: e.elementValues[e.attrName] === B(e.filesStructure, d.id, !0) && !e.elementValues[e.attrThumb],
        onChange: function (t) {
          var n;
          e.changeProperty((n = {}, Object(ae.a)(n, e.attrName, B(e.filesStructure, d.id, !0)), Object(ae.a)(n, e.attrThumb, !1), n));
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#666" d="M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zM5 17l3.5-4.5 2.5 3.01L14.5 11l4.5 6H5z"></path></svg>',
        title: "Select original size"
      }), a.a.createElement(Ee.a, {
        checked: e.elementValues[e.attrName] === B(e.filesStructure, d.id, !0) && e.elementValues[e.attrThumb],
        onChange: function (t) {
          var n;
          e.changeProperty((n = {}, Object(ae.a)(n, e.attrName, B(e.filesStructure, d.id, !0)), Object(ae.a)(n, e.attrThumb, !0), n));
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#666" d="M23 15h-2v2h2v-2zm0-4h-2v2h2v-2zm0 8h-2v2c1 0 2-1 2-2zM15 3h-2v2h2V3zm8 4h-2v2h2V7zm-2-4v2h2c0-1-1-2-2-2zM3 21h8v-6H1v4c0 1.1.9 2 2 2zM3 7H1v2h2V7zm12 12h-2v2h2v-2zm4-16h-2v2h2V3zm0 16h-2v2h2v-2zM3 3C2 3 1 4 1 5h2V3zm0 8H1v2h2v-2zm8-8H9v2h2V3zM7 3H5v2h2V3z"></path></svg>',
        title: "Select thumbnail size"
      }), a.a.createElement("img", {
        src: B(e.filesStructure, e.elementValues.currentFileId, !1, !0, e.currentWebsiteObject.domain),
        style: {
          maxWidth: "100%",
          maxHeight: "100%",
          verticalAlign: "middle"
        },
        alt: "websiter"
      })) : a.a.createElement(Ee.a, {
        style: {},
        checked: e.elementValues[e.attrName] === B(e.filesStructure, d.id, !0) && !e.thumbnail,
        onChange: function (t) {
          var n;
          e.changeProperty((n = {}, Object(ae.a)(n, e.attrName, B(e.filesStructure, d.id, !0)), Object(ae.a)(n, e.attrThumb, !1), n));
        },
        title: "Select file"
      }), b(d)) : null, a.a.createElement(W.a, null)), a.a.createElement(l.c, {
        selectedClassName: ["react-tabs__tab-panel--selected", s.reactTabsTabPanelSelected].join(" ")
      }, e.elementValues[e.attrName] ? a.a.createElement(a.a.Fragment, null, a.a.createElement("div", {
        style: {
          flex: 1
        }
      }, a.a.createElement("img", {
        src: "http://live.websiter.dev:5000/" + e.currentWebsiteObject.domain + e.elementValues[e.attrName],
        style: {
          maxWidth: "100%",
          maxHeight: "100%",
          verticalAlign: "middle"
        },
        alt: "websiter"
      }), p ? b(p) : null)) : null, a.a.createElement(W.a, null))))) : null;
    }),
        Oe = n(632),
        Me = Object(i.b)(null, function (e) {
      return {
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      var t = Object(r.useRef)(null),
          n = e.pannelClass,
          i = e.tabClass,
          o = e.elementValues,
          s = e.currentBox,
          c = e.currentResource,
          u = e.element,
          d = e.propertiesSuggestedList,
          p = e.handlePropertiesChange,
          m = e.changeProperty,
          h = e.mode,
          f = [{
        label: "Plain text",
        value: "text"
      }, {
        label: "HTML",
        value: "html"
      }, {
        label: "Number",
        value: "number"
      }, {
        label: "Range",
        value: "range"
      }, {
        label: "Select",
        value: "select"
      }, {
        label: "File",
        value: "file"
      }, {
        label: "Color",
        value: "color"
      }, {
        label: "Color select",
        value: "colorSelect"
      }, {
        label: "Menu tems",
        value: "menuItems"
      }, {
        label: "Array",
        value: "array"
      }].concat(Object(ue.a)(e.propagatingPlugins));
      return a.a.createElement(l.d, {
        className: ["react-tabs", de.reactTabs].join(" "),
        selectedTabPanelClassName: n
      }, a.a.createElement(l.b, null, a.a.createElement(l.a, {
        className: i
      }, "Type"), a.a.createElement(l.a, {
        className: i
      }, "System name"), a.a.createElement(l.a, {
        className: i
      }, "Properties"), a.a.createElement(l.a, {
        className: i
      }, "Desription"), a.a.createElement(l.a, {
        className: i
      }, "Default value")), a.a.createElement(l.c, null, a.a.createElement(Z.a, {
        onChange: function (e) {
          return m("CMSVariableType", e.value);
        },
        options: f,
        default: f.findIndex(function (e) {
          return e.value === o.CMSVariableType;
        }),
        requiredRights: ["developer"]
      })), a.a.createElement(l.c, null, a.a.createElement(G.a, {
        currentElement: s,
        elementValue: o.CMSVariableSystemName,
        elementCurrentCursor: o.cursorPosition,
        editorMode: "text",
        handleChange: function (e) {
          return m("CMSVariableSystemName", e);
        },
        name: "editorCMSName",
        requiredRights: ["developer"],
        currentResource: c
      })), a.a.createElement(l.c, null, a.a.createElement(G.a, {
        suggestOptions: [].concat(Object(ue.a)("menu" !== u.tag ? d.baseHtmlProps : []), Object(ue.a)(d[u.tag] ? d[u.tag] : [])),
        currentElement: s,
        elementValue: o.propertiesString || "{}",
        elementCurrentCursor: o.cursorPosition,
        editorMode: "json",
        handleChange: p,
        name: "editorProperties",
        requiredRights: ["developer"],
        currentResource: c
      })), a.a.createElement(l.c, null, a.a.createElement(G.a, {
        currentElement: s,
        elementValue: o.CMSVariableDescription,
        elementCurrentCursor: o.cursorPosition,
        editorMode: "text",
        handleChange: function (e) {
          return m("CMSVariableDescription", e);
        },
        name: "editorCMSDescription",
        requiredRights: ["developer"],
        currentResource: c
      })), a.a.createElement(l.c, null, "html" === o.CMSVariableType ? a.a.createElement(ye, {
        value: o.CMSVariableDefaultValue,
        handleChange: function (e, t) {
          m("CMSVariableDefaultValue", t.getContent());
        },
        requiredRights: ["developer"]
      }) : "menuItems" === o.CMSVariableType ? a.a.createElement(ge.a, {
        elementValues: o,
        element: u,
        changeProperty: m,
        mode: h,
        attrName: "defaultMenuItems"
      }) : "text" === o.CMSVariableType ? a.a.createElement(G.a, {
        currentElement: s,
        elementValue: o.CMSVariableDefaultValue,
        elementCurrentCursor: o.cursorPosition,
        editorMode: "text",
        handleChange: function (e) {
          return m("CMSVariableDefaultValue", e);
        },
        name: "editorCMSDefaultValue",
        requiredRights: ["developer"],
        currentResource: c
      }) : "number" === o.CMSVariableType || "range" === o.CMSVariableType ? a.a.createElement(a.a.Fragment, null, a.a.createElement("input", {
        type: o.CMSVariableType,
        style: {
          margin: "5px"
        },
        defaultValue: o.CMSVariableDefaultValue,
        onChange: function (n) {
          e.checkUserRights(["developer"]) && (t.current && (t.current.value = n.target.value), m("CMSVariableDefaultValue", n.target.value));
        },
        max: o.properties ? o.properties.max : void 0,
        min: o.properties ? o.properties.min : void 0,
        step: o.properties ? o.properties.step : void 0
      }), "range" === o.CMSVariableType ? a.a.createElement("input", {
        type: "number",
        ref: t,
        defaultValue: o.CMSVariableDefaultValue,
        readOnly: !0
      }) : null) : "select" === o.CMSVariableType ? a.a.createElement(Z.a, {
        options: o.properties && o.properties.options || [],
        default: (o.properties && o.properties.options || []).findIndex(function (e) {
          return e.value.toString() === o.CMSVariableDefaultValue.toString();
        }),
        onChange: function (t) {
          e.checkUserRights(["developer"]) && m("CMSVariableDefaultValue", t.value);
        }
      }) : "colorSelect" === o.CMSVariableType ? a.a.createElement("div", {
        style: {
          padding: "10px"
        }
      }, a.a.createElement(Oe.CirclePicker, {
        colors: o.properties ? o.properties.colors : void 0,
        color: o.defaultColor,
        onChangeComplete: function (t) {
          e.checkUserRights(["developer"]) && m("defaultColor", t.rgb);
        }
      })) : "file" === o.CMSVariableType ? a.a.createElement(we, {
        elementValues: o,
        element: u,
        changeProperty: m,
        mode: h,
        attrName: "defaultFileUrl"
      }) : "color" === o.CMSVariableType ? a.a.createElement(Oe.SketchPicker, {
        presetColors: o.properties ? o.properties.colors : void 0,
        color: o.defaultColor,
        onChangeComplete: function (t) {
          e.checkUserRights(["developer"]) && m("defaultColor", t.rgb);
        },
        disableAlpha: o.properties ? o.properties.disableAlpha : void 0
      }) : a.a.createElement("div", null, "Default value for array and propagating plugin variable cannot be set.")));
    }),
        xe = Object(i.b)(function (e, t) {
      var n = e.mD[oe.b[t.mode]],
          r = null,
          a = null;
      n.structure && (r = n.structure.find(function (e) {
        return n.currentBox === e.id;
      })) && (a = n.values[r.id]);
      var i = e.mD.pluginsStructure.filter(function (e) {
        return e.propagating;
      }).map(function (e) {
        return {
          label: e.name + " (for propagating plugin)",
          value: "propagating_" + e.id
        };
      });
      return {
        element: r,
        elementValues: a,
        currentBox: n.currentBox,
        currentResource: e.mD[oe.a[t.mode]],
        propagatingPlugins: i
      };
    })(function (e) {
      var t = e.element,
          n = e.elementValues,
          r = e.currentBox,
          i = e.currentResource,
          o = ["react-tabs__tab", de.reactTabsTab].join(" "),
          s = ["react-tabs__tab-panel--selected", de.reactTabsTabPanelSelected].join(" "),
          c = function (t, n) {
        if (t) {
          var r,
              a = {};
          a.cursorPosition = n, a.propertiesString = t;

          try {
            r = JSON.parse(t);
          } catch (i) {
            r = null;
          }

          r && (a.properties = r, a.propertiesString = JSON.stringify(r)), e.changeProperty(a, t);
        }
      },
          u = !!t && Object(H.b)(t.tag.charAt(0)),
          d = null;

      return t && n && !t.isElementFromCMSVariable && (d = "page" === e.mode ? a.a.createElement(me, {
        type: e.mode,
        element: t,
        elementValues: n,
        changeProperty: e.changeProperty,
        currentResource: i
      }) : t.isCMSVariable ? a.a.createElement(Me, {
        tabClass: o,
        pannelClass: s,
        propagatingPlugins: e.propagatingPlugins,
        elementValues: n,
        currentBox: r,
        currentResource: i,
        element: t,
        propertiesSuggestedList: be,
        handlePropertiesChange: c,
        changeProperty: e.changeProperty,
        mode: e.mode
      }) : t.text && !u ? a.a.createElement(me, {
        type: e.mode,
        element: t,
        elementValues: n,
        changeProperty: e.changeProperty,
        currentResource: i,
        requiredRights: ["developer"]
      }) : "richEditor" === t.tag ? a.a.createElement(ye, {
        value: n.textContent,
        handleChange: function (t, n, r) {
          e.changeProperty("textContent", n.getContent(), r);
        },
        requiredRights: ["developer"],
        currentBox: r
      }) : "parseHTML" === t.tag ? a.a.createElement(fe, {
        type: e.mode,
        requiredRights: ["developer"],
        currentResource: i,
        currentBox: r,
        element: t
      }) : a.a.createElement(l.d, {
        className: ["react-tabs", de.reactTabs].join(" "),
        selectedTabPanelClassName: s
      }, a.a.createElement(l.b, null, u ? null : a.a.createElement(l.a, {
        className: o
      }, "Style"), a.a.createElement(l.a, {
        className: o
      }, "Properties"), "websiterMenu" === t.tag ? a.a.createElement(l.a, {
        className: o
      }, "Items") : null), u ? null : a.a.createElement(l.c, null, a.a.createElement(G.a, {
        currentElement: r,
        elementValue: "{ " + (n.style || "") + " }",
        elementCurrentCursor: n.cursorPosition,
        editorMode: "css",
        handleChange: function (t, n) {
          if ("string" === typeof t) {
            (t = t.trim()).length < 3 ? t = "" : ("{" === t.charAt(0) && (t = t.slice(1)), "}" === t.charAt(t.length - 1) && (t = t.slice(0, t.length - 2)), t = t.trim());
            var r = {
              style: t,
              cursorPosition: n
            };
            e.changeProperty(r, t);
          }
        },
        name: "editorStyle",
        requiredRights: ["developer"],
        currentResource: i
      })), a.a.createElement(l.c, null, a.a.createElement(G.a, {
        suggestOptions: [].concat(Object(ue.a)("menu" !== t.tag ? be.baseHtmlProps : []), Object(ue.a)(be[t.tag] ? be[t.tag] : [])),
        currentElement: r,
        elementValue: n.propertiesString || "{}",
        elementCurrentCursor: n.cursorPosition,
        editorMode: "json",
        handleChange: c,
        name: "editorProperties",
        requiredRights: ["developer"],
        currentResource: i
      })), "websiterMenu" === t.tag ? a.a.createElement(l.c, null, a.a.createElement(ge.a, {
        elementValues: n,
        element: t,
        changeProperty: e.changeProperty,
        mode: e.mode,
        attrName: "menuItems"
      })) : null)), d;
    }),
        Pe = Object(i.b)(function (e) {
      return {
        barSizes: e.barSizes,
        currentPluginDraftExists: "undefined" != typeof e.mD.currentPluginDraft
      };
    }, function (e) {
      return {
        changeBoxPropertyInValues: function (t, n, r) {
          return e(o.h(t, n, r));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      return a.a.createElement("div", {
        className: s.Content
      }, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width + "px"
        }
      }, a.a.createElement(se, {
        type: "plugin"
      }), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width,
        type: "width"
      })), e.currentPluginDraftExists ? a.a.createElement(a.a.Fragment, null, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width2 + "px"
        }
      }, a.a.createElement(ce.a, {
        mode: "plugin"
      }), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width2,
        type: "width2"
      })), a.a.createElement("div", {
        className: s.LastContainer
      }, a.a.createElement(xe, {
        mode: "plugin",
        changeProperty: function (t, n) {
          e.checkUserRights(["content"]) && e.changeBoxPropertyInValues("plugin", t, n);
        }
      }))) : null);
    }),
        Te = Object(i.b)(function (e, t) {
      var n = e.mD[oe.b[t.mode]],
          r = null,
          a = null,
          i = null;
      if (n && n.structure && (r = n.structure.find(function (e) {
        return n.currentBox === e.id;
      })) && e.mD.pageTemplateDraft) if (a = n.values[r.id], r.forPropagatingPlugin) {
        var o = r.forPropagatingPlugin,
            l = o.pluginId,
            s = o.variable,
            c = Object(H.c)(l, e.mD.resourcesObjects);
        c && (i = c.values[s]);
      } else i = e.mD.pageTemplateDraft.values[r.id];
      return {
        element: r,
        elementValues: a,
        templateCMSElementValues: i,
        currentBox: n.currentBox,
        currentResource: e.mD.currentPageId
      };
    }, function (e) {
      return {
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      var t = Object(r.useRef)(null),
          n = ["react-tabs__tab", de.reactTabsTab].join(" "),
          i = ["react-tabs__tab-panel--selected", de.reactTabsTabPanelSelected].join(" ");
      return e.element && e.templateCMSElementValues ? a.a.createElement(l.d, {
        className: ["react-tabs", de.reactTabs].join(" "),
        selectedTabPanelClassName: i
      }, a.a.createElement(l.b, null, a.a.createElement(l.a, {
        className: n
      }, "Value"), a.a.createElement(l.a, {
        className: n
      }, "Description"), a.a.createElement(l.a, {
        className: n
      }, "Default value")), a.a.createElement(l.c, null, "html" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(ye, {
        value: e.elementValues.value,
        handleChange: function (t, n) {
          e.changeProperty("value", n.getContent());
        },
        requiredRights: ["content"]
      }) : "menuItems" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(ge.a, {
        elementValues: e.elementValues,
        element: e.element,
        changeProperty: e.changeProperty,
        mode: e.mode,
        attrName: "menuItems"
      }) : "text" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(G.a, {
        currentElement: e.currentBox,
        elementValue: e.elementValues.value,
        elementCurrentCursor: e.elementValues.cursorPosition,
        editorMode: "text",
        handleChange: function (t) {
          return e.changeProperty("value", t);
        },
        name: "editorPageValue",
        requiredRights: ["content"],
        currentResource: e.currentResource
      }) : "number" === e.templateCMSElementValues.CMSVariableType || "range" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(a.a.Fragment, null, a.a.createElement("input", {
        type: e.templateCMSElementValues.CMSVariableType,
        defaultValue: e.elementValues.value,
        style: {
          margin: "5px"
        },
        onChange: function (n) {
          e.checkUserRights(["content"]) && (t.current && (t.current.value = n.target.value), e.changeProperty("value", n.target.value));
        },
        max: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.max : void 0,
        min: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.min : void 0,
        step: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.step : void 0
      }), "range" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement("input", {
        type: "number",
        ref: t,
        defaultValue: e.elementValues.value,
        readOnly: !0
      }) : null) : "select" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(Z.a, {
        options: e.templateCMSElementValues.properties && e.templateCMSElementValues.properties.options || [],
        default: (e.templateCMSElementValues.properties && e.templateCMSElementValues.properties.options || []).findIndex(function (t) {
          return t.value.toString() === e.elementValues.value.toString();
        }),
        onChange: function (t) {
          e.checkUserRights(["developer"]) && e.changeProperty("value", t.value);
        }
      }) : "colorSelect" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement("div", {
        style: {
          padding: "10px"
        }
      }, a.a.createElement(Oe.CirclePicker, {
        colors: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.colors : void 0,
        color: e.elementValues.color,
        onChangeComplete: function (t) {
          e.checkUserRights(["content"]) && e.changeProperty("color", t.rgb);
        }
      })) : "color" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(Oe.SketchPicker, {
        presetColors: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.colors : void 0,
        color: e.elementValues.color,
        onChangeComplete: function (t) {
          e.checkUserRights(["content"]) && e.changeProperty("color", t.rgb);
        },
        disableAlpha: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.disableAlpha : void 0
      }) : "file" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(we, {
        elementValues: e.elementValues,
        element: e.element,
        changeProperty: e.changeProperty,
        mode: e.mode,
        attrName: "fileUrl",
        attrThumb: "fileThumbnail"
      }) : a.a.createElement("div", null, "Value for propagating plugin variable cannot be set.")), a.a.createElement(l.c, null, a.a.createElement(G.a, {
        currentElement: e.currentBox,
        elementValue: e.templateCMSElementValues.CMSVariableDescription,
        elementCurrentCursor: e.templateCMSElementValues.cursorPosition,
        editorMode: "text",
        handleChange: function () {},
        readOnly: !0,
        name: "editorPageCMSDescription",
        requiredRights: ["content"],
        currentResource: e.currentResource
      })), a.a.createElement(l.c, null, "html" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(ye, {
        value: e.templateCMSElementValues.CMSVariableDefaultValue,
        handleChange: function () {},
        readOnly: !0
      }) : "menuItems" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(ge.a, {
        elementValues: e.templateCMSElementValues,
        element: e.element,
        changeProperty: function () {},
        mode: e.mode,
        attrName: "defaultMenuItems"
      }) : "text" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(G.a, {
        currentElement: e.currentBox,
        elementValue: e.templateCMSElementValues.CMSVariableDefaultValue,
        elementCurrentCursor: e.templateCMSElementValues.cursorPosition,
        editorMode: "text",
        handleChange: function () {},
        readOnly: !0,
        name: "editorPageCMSDefaultValue",
        requiredRights: ["content"],
        currentResource: e.currentResource
      }) : "number" === e.templateCMSElementValues.CMSVariableType || "range" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(a.a.Fragment, null, a.a.createElement("input", {
        type: e.templateCMSElementValues.CMSVariableType,
        style: {
          margin: "5px"
        },
        defaultValue: e.templateCMSElementValues.CMSVariableDefaultValue,
        readOnly: !0
      }), "range" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement("input", {
        type: "number",
        defaultValue: e.templateCMSElementValues.CMSVariableDefaultValue,
        readOnly: !0
      }) : null) : "select" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(Z.a, {
        options: e.templateCMSElementValues.properties && e.templateCMSElementValues.properties.options || [],
        default: (e.templateCMSElementValues.properties && e.templateCMSElementValues.properties.options || []).findIndex(function (t) {
          return t.value.toString() === e.templateCMSElementValues.CMSVariableDefaultValue.toString();
        }),
        onChange: function (e) {}
      }) : "colorSelect" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement("div", {
        style: {
          padding: "10px"
        }
      }, a.a.createElement(Oe.CirclePicker, {
        colors: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.colors : void 0,
        color: e.templateCMSElementValues.defaultColor
      })) : "color" === e.templateCMSElementValues.CMSVariableType ? a.a.createElement(Oe.SketchPicker, {
        presetColors: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.colors : void 0,
        color: e.templateCMSElementValues.defaultColor,
        disableAlpha: e.templateCMSElementValues.properties ? e.templateCMSElementValues.properties.disableAlpha : void 0
      }) : a.a.createElement("div", null, "There is no default value for propagating plugin variable."))) : null;
    }),
        je = Object(i.b)(function (e) {
      return {
        barSizes: e.barSizes,
        currentPageDraftExists: "undefined" != typeof e.mD.currentPageDraft
      };
    }, function (e) {
      return {
        changeBoxPropertyInValues: function (t, n, r) {
          return e(o.h(t, n, r));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(Object(r.memo)(function (e) {
      return a.a.createElement("div", {
        className: s.Content
      }, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width + "px"
        }
      }, a.a.createElement(se, {
        type: "page"
      }), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width,
        type: "width"
      })), e.currentPageDraftExists ? a.a.createElement(a.a.Fragment, null, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width2 + "px"
        }
      }, a.a.createElement(ce.a, {
        mode: "page"
      }), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width2,
        type: "width2"
      })), a.a.createElement("div", {
        className: s.LastContainer
      }, a.a.createElement(Te, {
        mode: "page",
        changeProperty: function (t, n) {
          e.checkUserRights(["content"]) && e.changeBoxPropertyInValues("page", t, n);
        }
      }))) : null);
    })),
        Ve = Object(i.b)(function (e) {
      return {
        barSizes: e.barSizes,
        currentTemplateDraftExists: "undefined" != typeof e.mD.currentTemplateDraft
      };
    }, function (e) {
      return {
        changeBoxPropertyInValues: function (t, n, r, a) {
          return e(o.h(t, n, r, !1, a));
        },
        checkUserRights: function (t) {
          return e(Object(T.a)(t));
        }
      };
    })(function (e) {
      return a.a.createElement("div", {
        className: s.Content
      }, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width + "px"
        }
      }, a.a.createElement(se, {
        type: "template"
      }), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width,
        type: "width"
      })), e.currentTemplateDraftExists ? a.a.createElement(a.a.Fragment, null, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width2 + "px"
        }
      }, a.a.createElement(ce.a, {
        mode: "template"
      }), a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width2,
        type: "width2"
      })), a.a.createElement("div", {
        className: s.LastContainer
      }, a.a.createElement(xe, {
        mode: "template",
        changeProperty: function (t, n, r) {
          e.checkUserRights(["content"]) && e.changeBoxPropertyInValues("template", t, n, r);
        }
      }))) : null);
    }),
        Ie = Object(i.b)(function (e) {
      return {
        loading: e.loading,
        maxStorage: e.maxStorage,
        userId: e.userId,
        tooltipsOff: e.mD.tooltipsOff
      };
    }, function (e) {
      return {
        deleteUser: function () {
          return e(o.r());
        },
        logout: function (t) {
          return e(o.v(t));
        },
        switchTooltips: function () {
          return e(o.N());
        }
      };
    })(function (e) {
      return a.a.createElement("div", {
        className: s.Content
      }, a.a.createElement("div", null, a.a.createElement("div", {
        style: {
          margin: "10px"
        }
      }, "User ID:", " ", a.a.createElement("span", {
        style: {
          userSelect: "all"
        }
      }, e.userId)), a.a.createElement(S.a, {
        buttonClicked: e.logout,
        title: "Logout",
        icon: '<svg width="30" height="30" viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></svg>',
        style: {
          margin: "10px"
        }
      }), a.a.createElement(S.a, {
        buttonClicked: function () {
          return e.logout(!0);
        },
        title: "Logout on all devices",
        icon: '<svg width="30" height="30" viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></svg>',
        style: {
          margin: "10px"
        }
      }), a.a.createElement(S.a, {
        buttonClicked: e.switchTooltips,
        title: "Switch tooltips",
        icon: '<svg width="30" height="30" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></svg>',
        style: {
          margin: "10px"
        },
        tooltip: e.tooltipsOff ? "Tooltips are off (except this one)" : "Tooltips are on"
      }), a.a.createElement(S.a, {
        buttonClicked: e.deleteUser,
        title: "Delete account",
        icon: '<svg width="30" height="30" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"></path></svg>',
        style: {
          margin: "10px"
        }
      })));
    }),
        De = n(902),
        Re = n(905),
        ke = n(906),
        ze = n.n(ke),
        Be = function (e) {
      return a.a.createElement("div", {
        className: [ze.a.Div, e.inline ? ze.a.Inline : ""].join(" ")
      }, e.title, a.a.createElement("input", {
        "data-testid": e.datatestid || "MyInput",
        type: "text",
        className: [ze.a.Input, e.wrong ? ze.a.Wrong : "", e.right ? ze.a.Right : ""].join(" "),
        style: {
          minWidth: e.minWidth ? e.minWidth + "px" : "auto"
        },
        value: e.value || "",
        onChange: function (t) {
          return e.changed ? e.changed(t.target.value) : {};
        },
        onBlur: function (t) {
          return e.blur ? e.blur(t.target.value) : {};
        }
      }));
    },
        Fe = Object(i.b)(function (e) {
      return {
        currentWebsiteObject: e.mD.currentWebsiteObject,
        currentWebsiteId: e.mD.currentWebsiteId
      };
    }, function (e) {
      return {
        saveDomainName: function (t, n) {
          return e(j.j(t, n));
        },
        changeWebsiteProperty: function (t, n) {
          return e(j.d(t, n));
        },
        verifyCustomDomain: function () {
          return e(j.n());
        }
      };
    })(function (e) {
      Object(r.useEffect)(function () {
        var t = e.currentWebsiteObject,
            n = "";
        t && (n = t.domain), o(n), n = "", t && (n = t.customDomain || ""), "__delete__" === n && (n = ""), u(n);
      }, [e.currentWebsiteId, e.currentWebsiteObject.domain, e.currentWebsiteObject.customDomain]);
      var t = Object(r.useState)(""),
          n = Object(m.a)(t, 2),
          i = n[0],
          o = n[1],
          l = Object(r.useState)(""),
          s = Object(m.a)(l, 2),
          c = s[0],
          u = s[1],
          d = e.currentWebsiteObject;
      return d ? a.a.createElement("div", {
        className: Re.DomainSettings
      }, a.a.createElement("div", {
        className: Re.LocalDomain
      }, a.a.createElement("div", {
        className: Re.Title
      }, d ? a.a.createElement(a.a.Fragment, null, d.domainHidden ? a.a.createElement(P.a, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>'
      }) : null, d.domainNoIndex ? a.a.createElement(P.a, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></svg>'
      }) : null) : null, a.a.createElement("span", null, "Local domain:")), a.a.createElement("div", {
        className: Re.Input
      }, a.a.createElement("span", {
        className: Re.Span
      }, "https://live.websiter.dev/"), a.a.createElement(Be, {
        changed: function (e) {
          return o(e);
        },
        value: i,
        inline: !0,
        right: !0,
        minWidth: 220
      })), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg>',
        buttonClicked: function () {
          e.saveDomainName(i, "domain"), o(d.domain);
        },
        tooltip: "Save local domain name",
        inline: !0,
        requiredRights: ["admin", "developer"]
      }), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>',
        buttonClicked: function () {
          d && e.changeWebsiteProperty("domainHidden", !d.domainHidden);
        },
        tooltip: "Hide/show local domain",
        inline: !0,
        requiredRights: ["admin", "developer"]
      }), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>',
        buttonClicked: function () {
          i && window.open("https://live.websiter.dev/" + d.domain, "_blank");
        },
        tooltip: "Open in a new tab",
        inline: !0
      }), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></svg>',
        buttonClicked: function () {
          d && e.changeWebsiteProperty("domainNoIndex", !d.domainNoIndex);
        },
        tooltip: "Add the <meta name='robots' content='noindex'> tag disallowing search engines to index the website on this domain. The website will remian be indexed on your custom domain.",
        inline: !0,
        requiredRights: ["admin", "developer"]
      })), a.a.createElement("div", {
        className: Re.CustomDomain
      }, a.a.createElement("div", {
        className: Re.Title
      }, d && d.customDomainHidden ? a.a.createElement(P.a, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>'
      }) : null, d && d.customDomainVerified ? a.a.createElement(P.a, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></svg>'
      }) : null, a.a.createElement("span", null, "Custom domain:")), a.a.createElement("div", {
        className: Re.Input
      }, a.a.createElement("span", {
        className: Re.Span
      }, "https://"), a.a.createElement(Be, {
        changed: function (e) {
          return u(e);
        },
        value: c,
        inline: !0,
        right: !0,
        minWidth: 220
      })), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg>',
        buttonClicked: function () {
          d && e.saveDomainName(c, "customDomain"), u(d.customDomain);
        },
        tooltip: "Save custom domain name",
        inline: !0,
        requiredRights: ["admin", "developer"]
      }), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>',
        buttonClicked: function () {
          d && e.changeWebsiteProperty("customDomainHidden", !d.customDomainHidden);
        },
        tooltip: "Hide/show custom domain",
        inline: !0,
        requiredRights: ["admin", "developer"]
      }), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>',
        buttonClicked: function () {
          i && window.open("https://" + d.customDomain, "_blank");
        },
        tooltip: "Open in a new tab",
        inline: !0
      }), a.a.createElement(S.b, {
        icon: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></svg>',
        buttonClicked: function () {
          return e.verifyCustomDomain();
        },
        tooltip: "Verify website ownership",
        inline: !0,
        requiredRights: ["admin", "developer"]
      }), a.a.createElement(S.b, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>',
        buttonClicked: function () {
          return e.saveDomainName("__delete__", "customDomain");
        },
        tooltip: "Delete custom domain",
        inline: !0,
        requiredRights: ["admin", "developer"]
      }), d && d.customDomain && d.cname ? a.a.createElement("div", null, a.a.createElement("p", null, "In order to use your custom domain you need to create the following CNAME DNS record:"), a.a.createElement("p", null, a.a.createElement("span", {
        style: {
          userSelect: "all"
        }
      }, d.cname)), a.a.createElement("p", null, "Usually it takes 1-3 hours to connect a new domain. Please, allow this time and check the status."), a.a.createElement("p", null, "If you want to verify your domain ownership and make sure that nobody else could connect this domain to other website add the following TXT DNS record and press verify button:"), a.a.createElement("p", null, a.a.createElement("span", {
        style: {
          userSelect: "all"
        }
      }, d._id))) : null)) : null;
    }),
        Ne = n(907),
        He = Object(i.b)(function (e) {
      return {
        currentUserInWebsiteSharing: e.currentUserInWebsiteSharing,
        userId: e.mD.userId,
        currentWebsiteObject: e.mD.currentWebsiteObject,
        currentWebsiteId: e.mD.currentWebsiteId
      };
    }, function (e) {
      return {
        chooseUserInWebsiteSharing: function (t) {
          return e(o.l(t));
        },
        changeWebsiteProperty: function (t, n) {
          return e(j.d(t, n));
        },
        addUserInWebsiteSharing: function () {
          return e(j.b());
        },
        deleteUserInWebsiteSharing: function (t) {
          return e(j.f(t));
        },
        sharingRightsChange: function (t, n, r) {
          return e(j.l(t, n, r));
        },
        transferWebsite: function () {
          return e(j.m());
        }
      };
    })(function (e) {
      var t,
          n = e.currentWebsiteObject;
      if (!n) return null;
      var r = {
        rights: []
      },
          i = Object(ue.a)(n.sharing),
          o = i.find(function (e) {
        return e.userId === n.user;
      });
      return o || (o = {
        userId: n.user,
        rights: ["owner", "admin", "developer", "content"]
      }, i.unshift(o), e.changeWebsiteProperty("sharing", i)), n.user === e.userId && (t = !0), r = i.find(function (t) {
        return t.userId === e.userId;
      }) || r, e.currentWebsiteId && n ? t || r.rights.includes("admin") ? a.a.createElement("div", {
        style: {
          width: "100%"
        }
      }, a.a.createElement("div", null, a.a.createElement(S.b, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>',
        buttonClicked: function () {
          return e.addUserInWebsiteSharing();
        },
        tooltip: "Share the website with a new user. You need to know the user's id which can be found in the user's Account menu tab. The user will need to refresh page in browser to see the shared website.",
        inline: !0,
        requiredRights: ["admin", "user"]
      }), a.a.createElement(S.b, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>',
        buttonClicked: function () {
          e.currentUserInWebsiteSharing !== n.user && e.deleteUserInWebsiteSharing(e.currentUserInWebsiteSharing);
        },
        tooltip: "Stop sharing the website with this user.",
        inline: !0,
        requiredRights: ["admin", "user"]
      }), n.user === e.userId ? a.a.createElement(S.b, {
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>',
        buttonClicked: function () {
          return e.transferWebsite();
        },
        tooltip: "Transfer the website to another user.",
        inline: !0,
        requiredRights: ["owner"]
      }) : null), a.a.createElement("div", {
        style: {
          width: "100%"
        }
      }, a.a.createElement("table", {
        className: Ne.SharingTable
      }, a.a.createElement("tbody", null, a.a.createElement("tr", null, a.a.createElement("th", null, "User id"), a.a.createElement("th", null, "Name"), a.a.createElement("th", null), a.a.createElement("th", null, "Owner"), a.a.createElement("th", null, "Admin"), a.a.createElement("th", null, "Developer"), a.a.createElement("th", null, "Content manager")), i.map(function (t, r) {
        return a.a.createElement("tr", {
          key: r,
          className: e.currentUserInWebsiteSharing === t.userId ? Ne.Active : "",
          onMouseDown: function () {
            return e.chooseUserInWebsiteSharing(t.userId);
          }
        }, a.a.createElement("td", null, t.userId), a.a.createElement("td", null, t.accountInfo && t.accountInfo.displayName || ""), a.a.createElement("td", null, t.accountInfo && t.accountInfo.photos && t.accountInfo.photos[0] ? a.a.createElement("div", {
          style: {
            backgroundImage: "url(" + t.accountInfo.photos[0].value + ")"
          },
          className: Ne.Ava
        }) : ""), a.a.createElement("td", null, a.a.createElement(Ee.a, {
          checked: n.user === t.userId,
          onChange: function () {}
        })), n.user === t.userId ? a.a.createElement("td", null, a.a.createElement(Ee.a, {
          checked: !0,
          onChange: function () {}
        })) : null, [].concat(Object(ue.a)(n.user === t.userId ? [] : ["admin"]), ["developer", "content"]).map(function (n, r) {
          return a.a.createElement("td", {
            key: r
          }, a.a.createElement(Ee.a, {
            checked: t.rights.includes(n),
            onChange: function (r) {
              return e.sharingRightsChange(t.userId, n, r);
            }
          }));
        }));
      }))))) : a.a.createElement("p", null, "You are not the owner of the website and you do not have the admin rights.") : null;
    }),
        We = function (e) {
      var t = ["react-tabs__tab", de.reactTabsTab].join(" "),
          n = ["react-tabs__tab-panel--selected", de.reactTabsTabPanelSelected].join(" ");
      return a.a.createElement(l.d, {
        className: ["react-tabs", de.reactTabs].join(" "),
        selectedTabPanelClassName: n
      }, a.a.createElement(l.b, null, a.a.createElement(l.a, {
        className: t
      }, "Domains"), a.a.createElement(l.a, {
        className: t
      }, "Sharing")), a.a.createElement(l.c, null, a.a.createElement(Fe, null)), a.a.createElement(l.c, null, a.a.createElement(He, null)));
    },
        Le = Object(i.b)(function (e) {
      return {
        barSizes: e.barSizes,
        websites: e.mD.websites,
        currentWebsiteObject: e.mD.currentWebsiteObject
      };
    })(function (e) {
      return a.a.createElement("div", {
        className: s.Content
      }, a.a.createElement("div", {
        className: s.Container,
        style: {
          flex: "0 0 " + e.barSizes.width + "px"
        }
      }, e.websites ? a.a.createElement(De.a, {
        notVirtual: e.notVirtual
      }) : null, a.a.createElement(c.a, {
        addClass: s.widthControll,
        startValue: e.barSizes.width,
        type: "width"
      })), a.a.createElement("div", {
        className: s.LastContainer
      }, e.currentWebsiteObject ? a.a.createElement(We, null) : null));
    }),
        Ke = n(908),
        Ae = n(1021),
        Ue = Object(i.b)(function (e) {
      return {
        barSizes: e.barSizes,
        loading: e.loading,
        notSavedResources: e.notSavedResources
      };
    }, function (e) {
      return {
        changeBarSize: function (t) {
          return e(o.e(t));
        },
        toggleFindMode: function (t) {
          return e(o.P(t));
        },
        savePropertiesOnLeave: function () {
          return e(o.J());
        }
      };
    })(Object(r.memo)(function (e) {
      var t = ["react-tabs__tab", s.reactTabsTab].join(" "),
          n = ["react-tabs__tab-panel--selected", s.reactTabsTabPanelSelected].join(" "),
          r = ["react-tabs__tab--selected", s.TabSelected].join(" ");
      Object(Ke.useBeforeunload)(function () {
        return e.notSavedResources.length > 0 ? (setTimeout(function () {
          return e.savePropertiesOnLeave();
        }, 1), "Some data is not saved.") : void e.savePropertiesOnLeave();
      });
      return a.a.createElement("div", {
        style: {
          flex: "0 0 " + e.barSizes.height + "px"
        },
        className: s.mainContainer,
        tabIndex: "0"
      }, a.a.createElement("div", null, a.a.createElement(c.a, {
        addClass: s.heightControll,
        vertical: !0,
        startValue: e.barSizes.height,
        type: "height"
      }), a.a.createElement(l.d, {
        className: ["react-tabs", s.reactTabs].join(" "),
        selectedTabClassName: r,
        selectedTabPanelClassName: n
      }, a.a.createElement(l.b, {
        className: s.TabList
      }, a.a.createElement(l.a, {
        className: t
      }, "Pages"), a.a.createElement(l.a, {
        className: t
      }, "Templates"), a.a.createElement(l.a, {
        className: t
      }, "Plugins"), a.a.createElement(l.a, {
        className: t
      }, "Files"), a.a.createElement(l.a, {
        className: t
      }, "Websites"), a.a.createElement(l.a, {
        className: t
      }, "Account")), a.a.createElement(l.c, null, a.a.createElement(je, null)), a.a.createElement(l.c, null, a.a.createElement(Ve, null)), a.a.createElement(l.c, null, a.a.createElement(Pe, null)), a.a.createElement(l.c, null, a.a.createElement(re, null)), a.a.createElement(l.c, null, a.a.createElement(Le, null)), a.a.createElement(l.c, null, a.a.createElement(Ie, null))), a.a.createElement(Ae.a, {
        handleWidth: !0,
        handleHeight: !0,
        onResize: function () {
          return e.changeBarSize();
        }
      })));
    })),
        qe = n(32),
        Ge = n(33),
        Ze = n(36),
        Ye = n(34),
        Je = n(35),
        Qe = n(916),
        Xe = n(917),
        $e = n.n(Xe),
        et = n(920),
        tt = n(535),
        nt = n(572),
        rt = n(925),
        at = n(498),
        it = n.n(at),
        ot = n(477),
        lt = n.n(ot);

    function st(e, t) {
      var n = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r);
      }

      return n;
    }

    function ct(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    function ut(e, t) {
      return function (e) {
        if (Array.isArray(e)) return e;
      }(e) || function (e, t) {
        if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
        var n = [],
            r = !0,
            a = !1,
            i = void 0;

        try {
          for (var o, l = e[Symbol.iterator](); !(r = (o = l.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
        } catch (s) {
          a = !0, i = s;
        } finally {
          try {
            r || null == l.return || l.return();
          } finally {
            if (a) throw i;
          }
        }

        return n;
      }(e, t) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }

    var dt = /iPhone/i,
        pt = /iPod/i,
        mt = /iPad/i,
        ht = /\bAndroid(?:.+)Mobile\b/i,
        ft = /Android/i,
        bt = /\bAndroid(?:.+)SD4930UR\b/i,
        gt = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
        vt = /Windows Phone/i,
        _t = /\bWindows(?:.+)ARM\b/i,
        yt = /BlackBerry/i,
        Ct = /BB10/i,
        St = /Opera Mini/i,
        Et = /\b(CriOS|Chrome)(?:.+)Mobile/i,
        wt = /Mobile(?:.+)Firefox\b/i;

    function Ot(e, t) {
      return e.test(t);
    }

    function Mt(e) {
      var t = e || ("undefined" !== typeof navigator ? navigator.userAgent : ""),
          n = t.split("[FBAN");
      "undefined" !== typeof n[1] && (t = ut(n, 1)[0]);
      "undefined" !== typeof (n = t.split("Twitter"))[1] && (t = ut(n, 1)[0]);
      var r = {
        apple: {
          phone: Ot(dt, t) && !Ot(vt, t),
          ipod: Ot(pt, t),
          tablet: !Ot(dt, t) && Ot(mt, t) && !Ot(vt, t),
          device: (Ot(dt, t) || Ot(pt, t) || Ot(mt, t)) && !Ot(vt, t)
        },
        amazon: {
          phone: Ot(bt, t),
          tablet: !Ot(bt, t) && Ot(gt, t),
          device: Ot(bt, t) || Ot(gt, t)
        },
        android: {
          phone: !Ot(vt, t) && Ot(bt, t) || !Ot(vt, t) && Ot(ht, t),
          tablet: !Ot(vt, t) && !Ot(bt, t) && !Ot(ht, t) && (Ot(gt, t) || Ot(ft, t)),
          device: !Ot(vt, t) && (Ot(bt, t) || Ot(gt, t) || Ot(ht, t) || Ot(ft, t)) || Ot(/\bokhttp\b/i, t)
        },
        windows: {
          phone: Ot(vt, t),
          tablet: Ot(_t, t),
          device: Ot(vt, t) || Ot(_t, t)
        },
        other: {
          blackberry: Ot(yt, t),
          blackberry10: Ot(Ct, t),
          opera: Ot(St, t),
          firefox: Ot(wt, t),
          chrome: Ot(Et, t),
          device: Ot(yt, t) || Ot(Ct, t) || Ot(St, t) || Ot(wt, t) || Ot(Et, t)
        },
        any: null,
        phone: null,
        tablet: null
      };
      return r.any = r.apple.device || r.android.device || r.windows.device || r.other.device, r.phone = r.apple.phone || r.android.phone || r.windows.phone, r.tablet = r.apple.tablet || r.android.tablet || r.windows.tablet, r;
    }

    var xt = function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? st(Object(n), !0).forEach(function (t) {
          ct(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : st(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }({}, Mt(), {
      isMobile: Mt
    });

    function Pt(e) {
      return (Pt = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function Tt() {}

    function jt(e, t, n) {
      var r = t || "";
      return e.key || "".concat(r, "item_").concat(n);
    }

    function Vt(e) {
      return "".concat(e, "-menu-");
    }

    function It(e, t) {
      var n = -1;
      a.a.Children.forEach(e, function (e) {
        n += 1, e && e.type && e.type.isMenuItemGroup ? a.a.Children.forEach(e.props.children, function (e) {
          t(e, n += 1);
        }) : t(e, n);
      });
    }

    var Dt = ["defaultSelectedKeys", "selectedKeys", "defaultOpenKeys", "openKeys", "mode", "getPopupContainer", "onSelect", "onDeselect", "onDestroy", "openTransitionName", "openAnimation", "subMenuOpenDelay", "subMenuCloseDelay", "forceSubMenuRender", "triggerSubMenuAction", "level", "selectable", "multiple", "onOpenChange", "visible", "focusable", "defaultActiveFirst", "prefixCls", "inlineIndent", "parentMenu", "title", "rootPrefixCls", "eventKey", "active", "onItemHover", "onTitleMouseEnter", "onTitleMouseLeave", "onTitleClick", "popupAlign", "popupOffset", "isOpen", "renderMenuItem", "manualRef", "subMenuKey", "disabled", "index", "isSelected", "store", "activeKey", "builtinPlacements", "overflowedIndicator", "motion", "attribute", "value", "popupClassName", "inlineCollapsed", "menu", "theme", "itemIcon", "expandIcon"],
        Rt = function (e) {
      var t = e && "function" === typeof e.getBoundingClientRect && e.getBoundingClientRect().width;
      return t && (t = +t.toFixed(6)), t || 0;
    },
        kt = function (e) {
      var t = e && "function" === typeof e.getBoundingClientRect && e.getBoundingClientRect();
      return {
        left: t.left,
        right: t.right
      };
    },
        zt = function (e, t, n) {
      e && "object" === Pt(e.style) && (e.style[t] = n);
    },
        Bt = function () {
      return xt.any;
    },
        Ft = n(124),
        Nt = n.n(Ft),
        Ht = n(534),
        Wt = n(1022),
        Lt = n(673),
        Kt = {
      adjustX: 1,
      adjustY: 1
    },
        At = {
      topLeft: {
        points: ["bl", "tl"],
        overflow: Kt,
        offset: [0, -7]
      },
      bottomLeft: {
        points: ["tl", "bl"],
        overflow: Kt,
        offset: [0, 7]
      },
      leftTop: {
        points: ["tr", "tl"],
        overflow: Kt,
        offset: [-4, 0]
      },
      rightTop: {
        points: ["tl", "tr"],
        overflow: Kt,
        offset: [4, 0]
      }
    },
        Ut = {
      topLeft: {
        points: ["bl", "tl"],
        overflow: Kt,
        offset: [0, -7]
      },
      bottomLeft: {
        points: ["tl", "bl"],
        overflow: Kt,
        offset: [0, 7]
      },
      rightTop: {
        points: ["tr", "tl"],
        overflow: Kt,
        offset: [-4, 0]
      },
      leftTop: {
        points: ["tl", "tr"],
        overflow: Kt,
        offset: [4, 0]
      }
    };

    function qt(e) {
      return (qt = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function Gt(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function Zt(e) {
      return (Zt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function Yt(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function Jt(e, t) {
      return (Jt = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function Qt(e, t) {
      var n = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r);
      }

      return n;
    }

    function Xt(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Qt(Object(n), !0).forEach(function (t) {
          $t(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qt(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }

    function $t(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    var en = 0,
        tn = {
      horizontal: "bottomLeft",
      vertical: "rightTop",
      "vertical-left": "rightTop",
      "vertical-right": "leftTop"
    },
        nn = function (e, t, n) {
      var r = Vt(t),
          a = e.getState();
      e.setState({
        defaultActiveFirst: Xt({}, a.defaultActiveFirst, $t({}, r, n))
      });
    },
        rn = function (e) {
      function t(e) {
        var n, r, i;
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), r = this, i = Zt(t).call(this, e), (n = !i || "object" !== qt(i) && "function" !== typeof i ? Yt(r) : i).onDestroy = function (e) {
          n.props.onDestroy(e);
        }, n.onKeyDown = function (e) {
          var t = e.keyCode,
              r = n.menuInstance,
              a = n.props,
              i = a.isOpen,
              o = a.store;
          if (t === nt.a.ENTER) return n.onTitleClick(e), nn(o, n.props.eventKey, !0), !0;
          if (t === nt.a.RIGHT) return i ? r.onKeyDown(e) : (n.triggerOpenChange(!0), nn(o, n.props.eventKey, !0)), !0;

          if (t === nt.a.LEFT) {
            var l;
            if (!i) return;
            return (l = r.onKeyDown(e)) || (n.triggerOpenChange(!1), l = !0), l;
          }

          return !i || t !== nt.a.UP && t !== nt.a.DOWN ? void 0 : r.onKeyDown(e);
        }, n.onOpenChange = function (e) {
          n.props.onOpenChange(e);
        }, n.onPopupVisibleChange = function (e) {
          n.triggerOpenChange(e, e ? "mouseenter" : "mouseleave");
        }, n.onMouseEnter = function (e) {
          var t = n.props,
              r = t.eventKey,
              a = t.onMouseEnter,
              i = t.store;
          nn(i, n.props.eventKey, !1), a({
            key: r,
            domEvent: e
          });
        }, n.onMouseLeave = function (e) {
          var t = n.props,
              r = t.parentMenu,
              a = t.eventKey,
              i = t.onMouseLeave;
          r.subMenuInstance = Yt(n), i({
            key: a,
            domEvent: e
          });
        }, n.onTitleMouseEnter = function (e) {
          var t = n.props,
              r = t.eventKey,
              a = t.onItemHover,
              i = t.onTitleMouseEnter;
          a({
            key: r,
            hover: !0
          }), i({
            key: r,
            domEvent: e
          });
        }, n.onTitleMouseLeave = function (e) {
          var t = n.props,
              r = t.parentMenu,
              a = t.eventKey,
              i = t.onItemHover,
              o = t.onTitleMouseLeave;
          r.subMenuInstance = Yt(n), i({
            key: a,
            hover: !1
          }), o({
            key: a,
            domEvent: e
          });
        }, n.onTitleClick = function (e) {
          var t = Yt(n).props;
          t.onTitleClick({
            key: t.eventKey,
            domEvent: e
          }), "hover" !== t.triggerSubMenuAction && (n.triggerOpenChange(!t.isOpen, "click"), nn(t.store, n.props.eventKey, !1));
        }, n.onSubMenuClick = function (e) {
          "function" === typeof n.props.onClick && n.props.onClick(n.addKeyPath(e));
        }, n.onSelect = function (e) {
          n.props.onSelect(e);
        }, n.onDeselect = function (e) {
          n.props.onDeselect(e);
        }, n.getPrefixCls = function () {
          return "".concat(n.props.rootPrefixCls, "-submenu");
        }, n.getActiveClassName = function () {
          return "".concat(n.getPrefixCls(), "-active");
        }, n.getDisabledClassName = function () {
          return "".concat(n.getPrefixCls(), "-disabled");
        }, n.getSelectedClassName = function () {
          return "".concat(n.getPrefixCls(), "-selected");
        }, n.getOpenClassName = function () {
          return "".concat(n.props.rootPrefixCls, "-submenu-open");
        }, n.saveMenuInstance = function (e) {
          n.menuInstance = e;
        }, n.addKeyPath = function (e) {
          return Xt({}, e, {
            keyPath: (e.keyPath || []).concat(n.props.eventKey)
          });
        }, n.triggerOpenChange = function (e, t) {
          var r = n.props.eventKey,
              a = function () {
            n.onOpenChange({
              key: r,
              item: Yt(n),
              trigger: t,
              open: e
            });
          };

          "mouseenter" === t ? n.mouseenterTimeout = setTimeout(function () {
            a();
          }, 0) : a();
        }, n.isChildrenSelected = function () {
          var e = {
            find: !1
          };
          return function e(t, n, r) {
            t && !r.find && a.a.Children.forEach(t, function (t) {
              if (t) {
                var a = t.type;
                if (!a || !(a.isSubMenu || a.isMenuItem || a.isMenuItemGroup)) return;
                -1 !== n.indexOf(t.key) ? r.find = !0 : t.props.children && e(t.props.children, n, r);
              }
            });
          }(n.props.children, n.props.selectedKeys, e), e.find;
        }, n.isOpen = function () {
          return -1 !== n.props.openKeys.indexOf(n.props.eventKey);
        }, n.adjustWidth = function () {
          if (n.subMenuTitle && n.menuInstance) {
            var e = Nt.a.findDOMNode(n.menuInstance);
            e.offsetWidth >= n.subMenuTitle.offsetWidth || (e.style.minWidth = "".concat(n.subMenuTitle.offsetWidth, "px"));
          }
        }, n.saveSubMenuTitle = function (e) {
          n.subMenuTitle = e;
        }, n.getBaseProps = function () {
          var e = Yt(n).props;
          return {
            mode: "horizontal" === e.mode ? "vertical" : e.mode,
            visible: n.props.isOpen,
            level: e.level + 1,
            inlineIndent: e.inlineIndent,
            focusable: !1,
            onClick: n.onSubMenuClick,
            onSelect: n.onSelect,
            onDeselect: n.onDeselect,
            onDestroy: n.onDestroy,
            selectedKeys: e.selectedKeys,
            eventKey: "".concat(e.eventKey, "-menu-"),
            openKeys: e.openKeys,
            motion: e.motion,
            onOpenChange: n.onOpenChange,
            subMenuOpenDelay: e.subMenuOpenDelay,
            parentMenu: Yt(n),
            subMenuCloseDelay: e.subMenuCloseDelay,
            forceSubMenuRender: e.forceSubMenuRender,
            triggerSubMenuAction: e.triggerSubMenuAction,
            builtinPlacements: e.builtinPlacements,
            defaultActiveFirst: e.store.getState().defaultActiveFirst[Vt(e.eventKey)],
            multiple: e.multiple,
            prefixCls: e.rootPrefixCls,
            id: n.internalMenuId,
            manualRef: n.saveMenuInstance,
            itemIcon: e.itemIcon,
            expandIcon: e.expandIcon,
            direction: e.direction
          };
        }, n.getMotion = function (e, t) {
          var r = Yt(n).haveRendered,
              a = n.props,
              i = a.motion,
              o = a.rootPrefixCls;
          return Xt({}, i, {
            leavedClassName: "".concat(o, "-hidden"),
            removeOnLeave: !1,
            motionAppear: r || !t || "inline" !== e
          });
        };
        var o = e.store,
            l = e.eventKey,
            s = o.getState().defaultActiveFirst;
        n.isRootMenu = !1;
        var c = !1;
        return s && (c = s[l]), nn(o, l, c), n;
      }

      var n, r, i;
      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && Jt(e, t);
      }(t, a.a.Component), n = t, (r = [{
        key: "componentDidMount",
        value: function () {
          this.componentDidUpdate();
        }
      }, {
        key: "componentDidUpdate",
        value: function () {
          var e = this,
              t = this.props,
              n = t.mode,
              r = t.parentMenu,
              a = t.manualRef;
          a && a(this), "horizontal" === n && r.isRootMenu && this.props.isOpen && (this.minWidthTimeout = setTimeout(function () {
            return e.adjustWidth();
          }, 0));
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          var e = this.props,
              t = e.onDestroy,
              n = e.eventKey;
          t && t(n), this.minWidthTimeout && clearTimeout(this.minWidthTimeout), this.mouseenterTimeout && clearTimeout(this.mouseenterTimeout);
        }
      }, {
        key: "renderChildren",
        value: function (e) {
          var t = this,
              n = this.getBaseProps(),
              r = this.getMotion(n.mode, n.visible);
          if (this.haveRendered = !0, this.haveOpened = this.haveOpened || n.visible || n.forceSubMenuRender, !this.haveOpened) return a.a.createElement("div", null);
          var i = n.direction;
          return a.a.createElement(Lt.a, Object.assign({
            visible: n.visible
          }, r), function (r) {
            var o = r.className,
                l = r.style,
                s = lt()("".concat(n.prefixCls, "-sub"), o, r.popupMenuBlockClasses, $t({}, "".concat(n.prefixCls, "-rtl"), "rtl" === i));
            return a.a.createElement(kn, Object.assign({}, n, {
              id: t.internalMenuId,
              className: s,
              style: l
            }), e);
          });
        }
      }, {
        key: "render",
        value: function () {
          var e,
              t = Xt({}, this.props),
              n = t.isOpen,
              r = this.getPrefixCls(),
              i = "inline" === t.mode,
              o = lt()(r, "".concat(r, "-").concat(t.mode), ($t(e = {}, t.className, !!t.className), $t(e, this.getOpenClassName(), n), $t(e, this.getActiveClassName(), t.active || n && !i), $t(e, this.getDisabledClassName(), t.disabled), $t(e, this.getSelectedClassName(), this.isChildrenSelected()), e));
          o = [o, t.isSub ? t.store.getState().popupMenuItemClasses : t.store.getState().topMenuItemClasses].join(" "), this.internalMenuId || (t.eventKey ? this.internalMenuId = "".concat(t.eventKey, "$Menu") : (en += 1, this.internalMenuId = "$__$".concat(en, "$Menu")));
          var l = {},
              s = {},
              c = {};
          t.disabled || (l = {
            onMouseLeave: this.onMouseLeave,
            onMouseEnter: this.onMouseEnter
          }, s = {
            onClick: this.onTitleClick
          }, c = {
            onMouseEnter: this.onTitleMouseEnter,
            onMouseLeave: this.onTitleMouseLeave
          });
          var u = {},
              d = t.direction;
          i && ("rtl" === d ? u.paddingRight = t.inlineIndent * t.level : u.paddingLeft = t.inlineIndent * t.level);
          var p = {};
          this.props.isOpen && (p = {
            "aria-owns": this.internalMenuId
          });
          var m = null;
          "horizontal" !== t.mode && (m = this.props.expandIcon, "function" === typeof this.props.expandIcon && (m = a.a.createElement(this.props.expandIcon, Xt({}, this.props))));

          var h = a.a.createElement("div", Object.assign({
            ref: this.saveSubMenuTitle,
            style: u,
            className: "".concat(r, "-title"),
            role: "button"
          }, c, s, {
            "aria-expanded": n
          }, p, {
            "aria-haspopup": "true",
            title: "string" === typeof t.title ? t.title : void 0
          }), t.title, m || a.a.createElement("i", {
            className: "".concat(r, "-arrow")
          })),
              f = this.renderChildren(t.children),
              b = t.parentMenu.isRootMenu ? t.parentMenu.props.getPopupContainer : function (e) {
            return e.parentNode;
          },
              g = tn[t.mode],
              v = t.popupOffset ? {
            offset: t.popupOffset
          } : {},
              _ = "inline" === t.mode ? "" : t.popupClassName;

          _ += "rtl" === d ? " ".concat(r, "-rtl") : "";
          var y = t.disabled,
              C = t.triggerSubMenuAction,
              S = t.subMenuOpenDelay,
              E = t.forceSubMenuRender,
              w = t.subMenuCloseDelay,
              O = t.builtinPlacements;
          Dt.forEach(function (e) {
            return delete t[e];
          }), delete t.onClick, delete t.isSub;
          var M = "rtl" === d ? Object.assign({}, Ut, O) : Object.assign({}, At, O);
          return delete t.direction, a.a.createElement("li", Object.assign({}, t, l, {
            className: o,
            role: "menuitem"
          }), i && h, i && f, !i && a.a.createElement(Wt.a, {
            prefixCls: r,
            popupClassName: lt()("".concat(r, "-popup"), _),
            getPopupContainer: b,
            builtinPlacements: M,
            popupPlacement: g,
            popupVisible: n,
            popupAlign: v,
            popup: f,
            action: y ? [] : [C],
            mouseEnterDelay: S,
            mouseLeaveDelay: w,
            onPopupVisibleChange: this.onPopupVisibleChange,
            forceRender: E
          }, h));
        }
      }]) && Gt(n.prototype, r), i && Gt(n, i), t;
    }();

    rn.defaultProps = {
      onMouseEnter: Tt,
      onMouseLeave: Tt,
      onTitleMouseEnter: Tt,
      onTitleMouseLeave: Tt,
      onTitleClick: Tt,
      manualRef: Tt,
      mode: "vertical",
      title: ""
    };
    var an = Object(tt.connect)(function (e, t) {
      var n = e.openKeys,
          r = e.activeKey,
          a = e.selectedKeys,
          i = t.eventKey,
          o = t.subMenuKey;
      return {
        isOpen: n.indexOf(i) > -1,
        active: r[o] === i,
        selectedKeys: a
      };
    })(rn);
    an.isSubMenu = !0;
    var on = an;

    function ln(e) {
      return (ln = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function sn(e) {
      return function (e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];

          return n;
        }
      }(e) || function (e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
      }(e) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }();
    }

    function cn(e, t) {
      var n = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r);
      }

      return n;
    }

    function un(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? cn(Object(n), !0).forEach(function (t) {
          dn(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cn(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }

    function dn(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    function pn(e, t) {
      if (null == e) return {};

      var n,
          r,
          a = function (e, t) {
        if (null == e) return {};
        var n,
            r,
            a = {},
            i = Object.keys(e);

        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);

        return a;
      }(e, t);

      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);

        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]);
      }

      return a;
    }

    function mn(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function hn(e) {
      return (hn = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function fn(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function bn(e, t) {
      return (bn = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    var gn = "menuitem-overflowed",
        vn = .5,
        _n = function (e) {
      function t() {
        var e, n, r;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), n = this, r = hn(t).apply(this, arguments), (e = !r || "object" !== ln(r) && "function" !== typeof r ? fn(n) : r).resizeObserver = null, e.mutationObserver = null, e.originalTotalWidth = 0, e.overflowedItems = [], e.ulSizes = {}, e.menuItemSizes = [], e.state = {
          lastVisibleIndex: void 0
        }, e.getMenuItemNodes = function () {
          var t = e.props.prefixCls,
              n = Nt.a.findDOMNode(fn(e));
          return n ? [].slice.call(n.children).filter(function (e) {
            return e.className.split(" ").indexOf("".concat(t, "-overflowed-submenu")) < 0;
          }) : [];
        }, e.getMenuItemNodesOver = function () {
          var t = e.props.prefixCls,
              n = Nt.a.findDOMNode(fn(e));
          return n ? [].slice.call(n.children).filter(function (e) {
            return e.className.split(" ").indexOf("".concat(t, "-overflowed-submenu")) >= 0;
          }) : [];
        }, e.getOverflowedSubMenuItem = function (t, n, r) {
          var i = e.props,
              o = i.overflowedIndicator,
              l = i.level,
              s = i.mode,
              c = i.prefixCls,
              u = i.theme;
          if (1 !== l || "horizontal" !== s) return null;
          var d = e.props.children[0].props,
              p = (d.children, d.title, d.style),
              m = pn(d, ["children", "title", "style"]),
              h = un({}, p),
              f = "".concat(t, "-overflowed-indicator"),
              b = "".concat(t, "-overflowed-indicator");
          0 === n.length && !0 !== r ? h = un({}, h, {
            display: "none"
          }) : r && (h = un({}, h, {
            visibility: "hidden",
            position: "absolute"
          }), f = "".concat(f, "-placeholder"), b = "".concat(b, "-placeholder"));
          var g = u ? "".concat(c, "-").concat(u) : "",
              v = {};
          return Dt.forEach(function (e) {
            void 0 !== m[e] && (v[e] = m[e]);
          }), a.a.createElement(on, Object.assign({
            title: o,
            className: "".concat(c, "-overflowed-submenu"),
            popupClassName: g
          }, v, {
            key: f,
            eventKey: b,
            disabled: !1,
            style: h
          }), n);
        }, e.setChildrenWidthAndResize = function () {
          if ("horizontal" === e.props.mode) {
            var t = Nt.a.findDOMNode(fn(e));

            if (t) {
              var n = t.children;

              if (n && 0 !== n.length) {
                var r = e.getMenuItemNodesOver(),
                    a = r.map(function (e) {
                  return e.style.display;
                });
                r.forEach(function (e) {
                  zt(e, "display", "none");
                });
                var i = t.children[n.length - 1];
                zt(i, "display", "inline-block");
                var o = e.getMenuItemNodes(),
                    l = o.filter(function (e) {
                  return e.className.split(" ").indexOf(gn) >= 0;
                });
                l.forEach(function (e) {
                  zt(e, "display", "inline-block");
                }), e.menuItemSizes = o.map(function (e) {
                  return kt(e);
                }), e.ulSizes = kt(t), l.forEach(function (e) {
                  zt(e, "display", "none");
                }), r.forEach(function (e, t) {
                  return e.style.display = a[t];
                }), t.children[t.children.length - 1].style.display = "inline-block", e.overflowedIndicatorWidth = Rt(t.children[t.children.length - 1]), e.menuItemSizes.length > 0 && (e.originalTotalWidth = e.menuItemSizes[e.menuItemSizes.length - 1].right - e.ulSizes.left), e.handleResize(), zt(i, "display", "none");
              }
            }
          }
        }, e.handleResize = function () {
          if ("horizontal" === e.props.mode && Nt.a.findDOMNode(fn(e))) {
            var t,
                n = e.ulSizes.right - e.ulSizes.left;
            e.overflowedItems = [], e.originalTotalWidth > n + vn && (t = -1, e.menuItemSizes.forEach(function (n, r) {
              r > 0 && n.left + e.overflowedIndicatorWidth <= e.ulSizes.right && (t += 1);
            })), e.setState({
              lastVisibleIndex: t
            });
          }
        }, e;
      }

      var n, r, i;
      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && bn(e, t);
      }(t, a.a.Component), n = t, (r = [{
        key: "componentDidMount",
        value: function () {
          var e = this;

          if (this.setChildrenWidthAndResize(), 1 === this.props.level && "horizontal" === this.props.mode) {
            var t = Nt.a.findDOMNode(this);
            if (!t) return;
            this.resizeObserver = new Ht.default(function (t) {
              t.forEach(e.setChildrenWidthAndResize);
            }), [].slice.call(t.children).concat(t).forEach(function (t) {
              e.resizeObserver.observe(t);
            }), "undefined" !== typeof MutationObserver && (this.mutationObserver = new MutationObserver(function () {
              e.resizeObserver.disconnect(), [].slice.call(t.children).concat(t).forEach(function (t) {
                e.resizeObserver.observe(t);
              }), e.setChildrenWidthAndResize();
            }), this.mutationObserver.observe(t, {
              attributes: !1,
              childList: !0,
              subTree: !1
            }));
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          this.resizeObserver && this.resizeObserver.disconnect(), this.mutationObserver && this.mutationObserver.disconnect();
        }
      }, {
        key: "renderChildren",
        value: function (e) {
          var t = this,
              n = this.state.lastVisibleIndex;
          return (e || []).reduce(function (r, i, o) {
            var l = i;

            if ("horizontal" === t.props.mode) {
              var s = t.getOverflowedSubMenuItem(i.props.eventKey, []);
              void 0 !== n && -1 !== t.props.className.indexOf("".concat(t.props.prefixCls, "-root")) && (o > n && (l = a.a.cloneElement(i, {
                style: {
                  display: "none"
                },
                eventKey: "".concat(i.props.eventKey, "-hidden"),
                className: "".concat(gn)
              })), o === n + 1 && (t.overflowedItems = e.slice(n + 1).map(function (e) {
                return a.a.cloneElement(e, {
                  key: e.props.eventKey,
                  mode: "vertical-left"
                });
              }), s = t.getOverflowedSubMenuItem(i.props.eventKey, t.overflowedItems)));
              var c = [].concat(sn(r), [s, l]);
              return o === e.length - 1 && c.push(t.getOverflowedSubMenuItem(i.props.eventKey, [], !0)), c;
            }

            return [].concat(sn(r), [l]);
          }, []);
        }
      }, {
        key: "render",
        value: function () {
          var e = this.props,
              t = (e.visible, e.prefixCls, e.overflowedIndicator, e.mode, e.level, e.tag),
              n = e.children,
              r = (e.theme, pn(e, ["visible", "prefixCls", "overflowedIndicator", "mode", "level", "tag", "children", "theme"])),
              i = t;
          return a.a.createElement(i, Object.assign({}, r), this.renderChildren(n));
        }
      }]) && mn(n.prototype, r), i && mn(n, i), t;
    }();

    _n.defaultProps = {
      tag: "div",
      className: ""
    };
    var yn = _n;

    function Cn(e) {
      return (Cn = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function Sn() {
      return (Sn = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];

          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }

        return e;
      }).apply(this, arguments);
    }

    function En(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function wn(e) {
      return (wn = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function On(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function Mn(e, t) {
      return (Mn = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    function xn(e, t) {
      var n = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r);
      }

      return n;
    }

    function Pn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? xn(Object(n), !0).forEach(function (t) {
          Tn(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xn(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }

    function Tn(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    function jn(e, t, n) {
      var r = e.getState();
      e.setState({
        activeKey: Pn({}, r.activeKey, Tn({}, t, n))
      });
    }

    function Vn(e) {
      return e.eventKey || "0-menu-";
    }

    function In(e, t) {
      var n,
          r = t,
          a = e.children,
          i = e.eventKey;
      if (r && (It(a, function (e, t) {
        e && e.props && !e.props.disabled && r === jt(e, i, t) && (n = !0);
      }), n)) return r;
      return r = null, e.defaultActiveFirst ? (It(a, function (e, t) {
        r || !e || e.props.disabled || (r = jt(e, i, t));
      }), r) : r;
    }

    function Dn(e) {
      if (e) {
        var t = this.instanceArray.indexOf(e);
        -1 !== t ? this.instanceArray[t] = e : this.instanceArray.push(e);
      }
    }

    var Rn = function (e) {
      function t(e) {
        var n, r, i;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), r = this, i = wn(t).call(this, e), (n = !i || "object" !== Cn(i) && "function" !== typeof i ? On(r) : i).onKeyDown = function (e, t) {
          var r,
              a = e.keyCode;
          if (n.getFlatInstanceArray().forEach(function (t) {
            t && t.props.active && t.onKeyDown && (r = t.onKeyDown(e));
          }), r) return 1;
          var i = null;
          return a !== nt.a.UP && a !== nt.a.DOWN || (i = n.step(a === nt.a.UP ? -1 : 1)), i ? (e.preventDefault(), jn(n.props.store, Vn(n.props), i.props.eventKey), "function" === typeof t && t(i), 1) : void 0;
        }, n.onItemHover = function (e) {
          var t = e.key,
              r = e.hover;
          jn(n.props.store, Vn(n.props), r ? t : null);
        }, n.onDeselect = function (e) {
          n.props.onDeselect(e);
        }, n.onSelect = function (e) {
          n.props.onSelect(e);
        }, n.onClick = function (e) {
          n.props.onClick(e);
        }, n.onOpenChange = function (e) {
          n.props.onOpenChange(e);
        }, n.onDestroy = function (e) {
          n.props.onDestroy(e);
        }, n.getFlatInstanceArray = function () {
          return n.instanceArray;
        }, n.step = function (e) {
          var t = n.getFlatInstanceArray(),
              r = n.props.store.getState().activeKey[Vn(n.props)],
              a = t.length;
          if (!a) return null;
          e < 0 && (t = t.concat().reverse());
          var i = -1;

          if (t.every(function (e, t) {
            return !e || e.props.eventKey !== r || (i = t, !1);
          }), n.props.defaultActiveFirst || -1 === i || (o = t.slice(i, a - 1)).length && !o.every(function (e) {
            return !!e.props.disabled;
          })) {
            var o,
                l = (i + 1) % a,
                s = l;

            do {
              var c = t[s];
              if (c && !c.props.disabled) return c;
              s = (s + 1) % a;
            } while (s !== l);

            return null;
          }
        }, n.renderCommonMenuItem = function (e, t, r) {
          var i = n.props.store.getState(),
              o = On(n).props,
              l = jt(e, o.eventKey, t),
              s = e.props;
          if (!s || "string" === typeof e.type) return e;
          var c = l === i.activeKey,
              u = Pn({
            mode: s.mode || o.mode,
            level: o.level,
            inlineIndent: o.inlineIndent,
            renderMenuItem: n.renderMenuItem,
            rootPrefixCls: o.prefixCls,
            index: t,
            parentMenu: o.parentMenu,
            manualRef: s.disabled ? void 0 : Object(rt.a)(e.ref, Dn.bind(On(n))),
            eventKey: l,
            active: !s.disabled && c,
            multiple: o.multiple,
            onClick: function (e) {
              (s.onClick || Tt)(e), n.onClick(e);
            },
            onItemHover: n.onItemHover,
            motion: o.motion,
            subMenuOpenDelay: o.subMenuOpenDelay,
            subMenuCloseDelay: o.subMenuCloseDelay,
            forceSubMenuRender: o.forceSubMenuRender,
            onOpenChange: n.onOpenChange,
            onDeselect: n.onDeselect,
            onSelect: n.onSelect,
            builtinPlacements: o.builtinPlacements,
            itemIcon: s.itemIcon || n.props.itemIcon,
            expandIcon: s.expandIcon || n.props.expandIcon
          }, r, {
            direction: o.direction
          });
          return ("inline" === o.mode || Bt()) && (u.triggerSubMenuAction = "click"), a.a.cloneElement(e, u);
        }, n.renderMenuItem = function (e, t, r) {
          if (!e) return null;
          var a = n.props.store.getState(),
              i = {
            openKeys: a.openKeys,
            selectedKeys: a.selectedKeys,
            triggerSubMenuAction: n.props.triggerSubMenuAction,
            subMenuKey: r
          };
          return n.renderCommonMenuItem(e, t, i);
        }, e.store.setState({
          activeKey: Pn({}, e.store.getState().activeKey, Tn({}, e.eventKey, In(e, e.activeKey)))
        }), n.instanceArray = [], n;
      }

      var n, r, i;
      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && Mn(e, t);
      }(t, a.a.Component), n = t, (r = [{
        key: "componentDidMount",
        value: function () {
          this.props.manualRef && this.props.manualRef(this);
        }
      }, {
        key: "shouldComponentUpdate",
        value: function (e) {
          var t = this.props;
          return this.props.visible || e.visible || !it()([this.props.className, t.store.getState().topMenuBlockClasses, t.store.getState().topMenuItemClasses, t.store.getState().topMenuItemActiveClasses, t.store.getState().popupMenuBlockClasses, t.store.getState().popupMenuItemClasses, t.store.getState().popupMenuItemActiveClasses], [e.className, e.topMenuBlockClasses, e.topMenuItemClasses, e.topMenuItemActiveClasses, e.popupMenuBlockClasses, e.popupMenuItemClasses, e.popupMenuItemActiveClasses]) || !it()(this.props.style, e.style);
        }
      }, {
        key: "componentDidUpdate",
        value: function (e) {
          var t = this.props,
              n = "activeKey" in t ? t.activeKey : t.store.getState().activeKey[Vn(t)],
              r = In(t, n);
          if (r !== n) jn(t.store, Vn(t), r);else if ("activeKey" in e) {
            r !== In(e, e.activeKey) && jn(t.store, Vn(t), r);
          }
        }
      }, {
        key: "render",
        value: function () {
          var e = this,
              t = Sn({}, this.props);
          this.instanceArray = [];
          var n = {
            className: [lt()(t.prefixCls, t.className, "".concat(t.prefixCls, "-").concat(t.mode)), t.level < 2 ? t.store.getState().topMenuBlockClasses : t.store.getState().popupMenuBlockClasses].join(" "),
            role: t.role || "menu"
          };
          t.id && (n.id = t.id), t.focusable && (n.tabIndex = 0, n.onKeyDown = this.onKeyDown);
          var r = t.prefixCls,
              i = t.eventKey,
              o = t.visible,
              l = t.level,
              s = t.mode,
              c = t.overflowedIndicator,
              u = t.theme;
          return Dt.forEach(function (e) {
            return delete t[e];
          }), delete t.onClick, delete t.topMenuBlockClasses, delete t.topMenuItemClasses, delete t.topMenuItemActiveClasses, delete t.popupMenuBlockClasses, delete t.popupMenuItemClasses, delete t.popupMenuItemActiveClasses, delete t.activeKeys, a.a.createElement(yn, Object.assign({}, t, {
            prefixCls: r,
            mode: s,
            tag: "ul",
            level: l,
            theme: u,
            visible: o,
            overflowedIndicator: c
          }, n), a.a.Children.map(t.children, function (t, n) {
            return e.renderMenuItem(t, n, i || "0-menu-", {
              isSub: l > 1
            });
          }));
        }
      }]) && En(n.prototype, r), i && En(n, i), t;
    }();

    Rn.defaultProps = {
      prefixCls: "rc-menu",
      className: "",
      mode: "vertical",
      level: 1,
      inlineIndent: 24,
      visible: !0,
      focusable: !0,
      style: {},
      manualRef: Tt
    };
    var kn = Object(tt.connect)()(Rn),
        zn = n(929);

    function Bn(e) {
      return (Bn = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function Fn(e) {
      var t = e.prefixCls,
          n = e.motion,
          r = e.openAnimation,
          a = e.openTransitionName;
      if (n) return n;
      if ("object" === Bn(r) && r) Object(zn.a)(!1, "Object type of `openAnimation` is removed. Please use `motion` instead.");else if ("string" === typeof r) return {
        motionName: "".concat(t, "-open-").concat(r)
      };
      return a ? {
        motionName: a
      } : null;
    }

    function Nn(e) {
      return (Nn = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function Hn(e, t) {
      var n = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r);
      }

      return n;
    }

    function Wn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Hn(Object(n), !0).forEach(function (t) {
          Ln(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hn(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }

    function Ln(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    function Kn(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function An(e) {
      return (An = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function Un(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function qn(e, t) {
      return (qn = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    var Gn = function (e) {
      function t(e) {
        var n, r, a;
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), r = this, a = An(t).call(this, e), (n = !a || "object" !== Nn(a) && "function" !== typeof a ? Un(r) : a).onSelect = function (e) {
          var t = Un(n).props;

          if (t.selectable) {
            var r = n.store.getState().selectedKeys,
                a = e.key;
            r = t.multiple ? r.concat([a]) : [a], "selectedKeys" in t || n.store.setState({
              selectedKeys: r
            }), t.onSelect(Wn({}, e, {
              selectedKeys: r
            }));
          }
        }, n.onClick = function (e) {
          n.props.onClick(e);
        }, n.onKeyDown = function (e, t) {
          n.innerMenu.getWrappedInstance().onKeyDown(e, t);
        }, n.onOpenChange = function (e) {
          var t = Un(n).props,
              r = n.store.getState().openKeys.concat(),
              a = !1,
              i = function (e) {
            var t = !1;
            if (e.open) (t = -1 === r.indexOf(e.key)) && r.push(e.key);else {
              var n = r.indexOf(e.key);
              (t = -1 !== n) && r.splice(n, 1);
            }
            a = a || t;
          };

          Array.isArray(e) ? e.forEach(i) : i(e), a && ("openKeys" in n.props || n.store.setState({
            openKeys: r
          }), t.onOpenChange(r));
        }, n.onDeselect = function (e) {
          var t = Un(n).props;

          if (t.selectable) {
            var r = n.store.getState().selectedKeys.concat(),
                a = e.key,
                i = r.indexOf(a);
            -1 !== i && r.splice(i, 1), "selectedKeys" in t || n.store.setState({
              selectedKeys: r
            }), t.onDeselect(Wn({}, e, {
              selectedKeys: r
            }));
          }
        }, n.getOpenTransitionName = function () {
          var e = Un(n).props,
              t = e.openTransitionName,
              r = e.openAnimation;
          return t || "string" !== typeof r || (t = "".concat(e.prefixCls, "-open-").concat(r)), t;
        }, n.setInnerMenu = function (e) {
          n.innerMenu = e;
        }, n.isRootMenu = !0;
        var i = e.defaultSelectedKeys,
            o = e.defaultOpenKeys;
        return "selectedKeys" in e && (i = e.selectedKeys || []), "openKeys" in e && (o = e.openKeys || []), n.store = Object(tt.create)({
          selectedKeys: i,
          openKeys: o,
          activeKey: {
            "0-menu-": In(e, e.activeKey)
          }
        }), n;
      }

      var n, r, i;
      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && qn(e, t);
      }(t, a.a.Component), n = t, (r = [{
        key: "componentDidMount",
        value: function () {
          this.updateMiniStore();
        }
      }, {
        key: "componentDidUpdate",
        value: function () {
          this.updateMiniStore();
        }
      }, {
        key: "updateMiniStore",
        value: function () {
          "selectedKeys" in this.props && this.store.setState({
            selectedKeys: this.props.selectedKeys || []
          }), "openKeys" in this.props && this.store.setState({
            openKeys: this.props.openKeys || []
          }), this.updateClassesInMiniStore();
        }
      }, {
        key: "updateClassesInMiniStore",
        value: function () {
          "topMenuBlockClasses" in this.props && this.store.setState({
            topMenuBlockClasses: this.props.topMenuBlockClasses || []
          }), "topMenuItemClasses" in this.props && this.store.setState({
            topMenuItemClasses: this.props.topMenuItemClasses || []
          }), "topMenuItemActiveClasses" in this.props && this.store.setState({
            topMenuItemActiveClasses: this.props.topMenuItemActiveClasses || []
          }), "popupMenuBlockClasses" in this.props && this.store.setState({
            popupMenuBlockClasses: this.props.popupMenuBlockClasses || []
          }), "popupMenuItemClasses" in this.props && this.store.setState({
            popupMenuItemClasses: this.props.popupMenuItemClasses || []
          }), "popupMenuItemActiveClasses" in this.props && this.store.setState({
            popupMenuItemActiveClasses: this.props.popupMenuItemActiveClasses || []
          }), "activeKeys" in this.props && this.store.setState({
            activeKeys: this.props.activeKeys || []
          });
        }
      }, {
        key: "render",
        value: function () {
          this.updateClassesInMiniStore();
          var e = Wn({}, this.props);
          return e.className += " ".concat(e.prefixCls, "-root"), "rtl" === e.direction && (e.className += " ".concat(e.prefixCls, "-rtl")), delete (e = Wn({}, e, {
            onClick: this.onClick,
            onOpenChange: this.onOpenChange,
            onDeselect: this.onDeselect,
            onSelect: this.onSelect,
            parentMenu: this,
            motion: Fn(this.props)
          })).openAnimation, delete e.openTransitionName, a.a.createElement(tt.Provider, {
            store: this.store
          }, a.a.createElement(kn, Object.assign({}, e, {
            ref: this.setInnerMenu
          }), this.props.children));
        }
      }]) && Kn(n.prototype, r), i && Kn(n, i), t;
    }();

    Gn.defaultProps = {
      selectable: !0,
      onClick: Tt,
      onSelect: Tt,
      onOpenChange: Tt,
      onDeselect: Tt,
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
      subMenuOpenDelay: .1,
      subMenuCloseDelay: .1,
      triggerSubMenuAction: "hover",
      prefixCls: "rc-menu",
      className: "",
      mode: "vertical",
      style: {},
      builtinPlacements: {},
      overflowedIndicator: a.a.createElement("span", null, "\xb7\xb7\xb7"),
      topMenuBlockClasses: [],
      topMenuItemClasses: [],
      topMenuItemActiveClasses: [],
      popupMenuBlockClasses: [],
      popupMenuItemClasses: [],
      popupMenuItemActiveClasses: [],
      activeKeys: []
    };
    var Zn = Gn,
        Yn = n(1029);

    function Jn(e) {
      return (Jn = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function Qn(e, t) {
      var n = Object.keys(e);

      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r);
      }

      return n;
    }

    function Xn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Qn(Object(n), !0).forEach(function (t) {
          $n(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qn(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }

      return e;
    }

    function $n(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    function er(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function tr(e) {
      return (tr = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function nr(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }

    function rr(e, t) {
      return (rr = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    var ar = function (e) {
      function t() {
        var e, n, r;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), n = this, r = tr(t).apply(this, arguments), (e = !r || "object" !== Jn(r) && "function" !== typeof r ? nr(n) : r).onKeyDown = function (t) {
          if (t.keyCode === nt.a.ENTER) return e.onClick(t), !0;
        }, e.onMouseLeave = function (t) {
          var n = e.props,
              r = n.eventKey,
              a = n.onItemHover,
              i = n.onMouseLeave;
          a({
            key: r,
            hover: !1
          }), i({
            key: r,
            domEvent: t
          });
        }, e.onMouseEnter = function (t) {
          var n = e.props,
              r = n.eventKey,
              a = n.onItemHover,
              i = n.onMouseEnter;
          a({
            key: r,
            hover: !0
          }), i({
            key: r,
            domEvent: t
          });
        }, e.onClick = function (t) {
          var n = e.props,
              r = n.eventKey,
              a = n.multiple,
              i = n.onClick,
              o = n.onSelect,
              l = n.onDeselect,
              s = n.isSelected,
              c = {
            key: r,
            keyPath: [r],
            item: nr(e),
            domEvent: t
          };
          i(c), a ? s ? l(c) : o(c) : s || o(c);
        }, e.saveNode = function (t) {
          e.node = t;
        }, e;
      }

      var n, r, i;
      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && rr(e, t);
      }(t, a.a.Component), n = t, (r = [{
        key: "componentDidMount",
        value: function () {
          this.callRef();
        }
      }, {
        key: "componentDidUpdate",
        value: function (e) {
          var t = this.props,
              n = t.active,
              r = t.parentMenu,
              a = t.eventKey;
          e.active || !n || r && r["scrolled-".concat(a)] ? r && r["scrolled-".concat(a)] && delete r["scrolled-".concat(a)] : this.node && (Object(Yn.a)(this.node, {
            scrollMode: "if-needed",
            boundary: Nt.a.findDOMNode(r),
            block: "nearest"
          }), r["scrolled-".concat(a)] = !0), this.callRef();
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          var e = this.props;
          e.onDestroy && e.onDestroy(e.eventKey);
        }
      }, {
        key: "getPrefixCls",
        value: function () {
          return "".concat(this.props.rootPrefixCls, "-item");
        }
      }, {
        key: "getActiveClassName",
        value: function () {
          return "".concat(this.getPrefixCls(), "-active");
        }
      }, {
        key: "getSelectedClassName",
        value: function () {
          return "".concat(this.getPrefixCls(), "-selected");
        }
      }, {
        key: "getDisabledClassName",
        value: function () {
          return "".concat(this.getPrefixCls(), "-disabled");
        }
      }, {
        key: "callRef",
        value: function () {
          this.props.manualRef && this.props.manualRef(this);
        }
      }, {
        key: "render",
        value: function () {
          var e,
              t = Xn({}, this.props),
              n = lt()(this.getPrefixCls(), t.className, ($n(e = {}, this.getActiveClassName(), !t.disabled && t.active), $n(e, this.getSelectedClassName(), t.isSelected), $n(e, this.getDisabledClassName(), t.disabled), e)),
              r = Xn({}, t.attribute, {
            title: t.title,
            className: [n].concat(Object(ue.a)(t.isSub || t.mode.indexOf("vertical") > -1 ? t.store.getState().popupMenuItemClasses : t.store.getState().topMenuItemClasses), Object(ue.a)(t.store.getState().activeKeys.includes(this.props.eventKey) ? t.isSub || t.mode.indexOf("vertical") > -1 ? t.store.getState().popupMenuItemActiveClasses : t.store.getState().topMenuItemActiveClasses : [])).join(" "),
            role: t.role || "menuitem",
            "aria-disabled": t.disabled
          });
          "option" === t.role ? r = Xn({}, r, {
            role: "option",
            "aria-selected": t.isSelected
          }) : null !== t.role && "none" !== t.role || (r.role = "none");
          var i = {
            onClick: t.disabled ? null : this.onClick,
            onMouseLeave: t.disabled ? null : this.onMouseLeave,
            onMouseEnter: t.disabled ? null : this.onMouseEnter
          },
              o = Xn({}, t.style);
          "inline" === t.mode && ("rtl" === t.direction ? o.paddingRight = t.inlineIndent * t.level : o.paddingLeft = t.inlineIndent * t.level), Dt.forEach(function (e) {
            return delete t[e];
          }), delete t.direction;
          var l = this.props.itemIcon;
          return "function" === typeof this.props.itemIcon && (l = a.a.createElement(this.props.itemIcon, this.props)), delete t.isSub, a.a.createElement("li", Object.assign({}, t, r, i, {
            style: o,
            ref: this.saveNode
          }), t.children, l);
        }
      }]) && er(n.prototype, r), i && er(n, i), t;
    }();

    ar.isMenuItem = !0, ar.defaultProps = {
      onSelect: Tt,
      onMouseEnter: Tt,
      onMouseLeave: Tt,
      manualRef: Tt
    };
    var ir = Object(tt.connect)(function (e, t) {
      var n = e.activeKey,
          r = e.selectedKeys,
          a = t.eventKey;
      return {
        active: n[t.subMenuKey] === a,
        isSelected: -1 !== r.indexOf(a)
      };
    })(ar);

    function or(e) {
      return (or = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }

    function lr() {
      return (lr = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];

          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }

        return e;
      }).apply(this, arguments);
    }

    function sr(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function cr(e, t) {
      return !t || "object" !== or(t) && "function" !== typeof t ? function (e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
      }(e) : t;
    }

    function ur(e) {
      return (ur = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
    }

    function dr(e, t) {
      return (dr = Object.setPrototypeOf || function (e, t) {
        return e.__proto__ = t, e;
      })(e, t);
    }

    var pr = function (e) {
      function t() {
        var e;
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), (e = cr(this, ur(t).apply(this, arguments))).renderInnerMenuItem = function (t) {
          var n = e.props;
          return (0, n.renderMenuItem)(t, n.index, e.props.subMenuKey);
        }, e;
      }

      var n, r, i;
      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            writable: !0,
            configurable: !0
          }
        }), t && dr(e, t);
      }(t, a.a.Component), n = t, (r = [{
        key: "render",
        value: function () {
          var e = lr({}, this.props),
              t = e.className,
              n = void 0 === t ? "" : t,
              r = e.rootPrefixCls,
              i = "".concat(r, "-item-group-title"),
              o = "".concat(r, "-item-group-list"),
              l = e.title,
              s = e.children;
          return Dt.forEach(function (t) {
            return delete e[t];
          }), delete e.onClick, delete e.direction, a.a.createElement("li", Object.assign({}, e, {
            className: "".concat(n, " ").concat(r, "-item-group")
          }), a.a.createElement("div", {
            className: i,
            title: "string" === typeof l ? l : void 0
          }, l), a.a.createElement("ul", {
            className: o
          }, a.a.Children.map(s, this.renderInnerMenuItem)));
        }
      }]) && sr(n.prototype, r), i && sr(n, i), t;
    }();

    pr.isMenuItemGroup = !0, pr.defaultProps = {
      disabled: !0
    };

    var mr = function (e) {
      var t = e.className,
          n = e.rootPrefixCls,
          r = e.style;
      return a.a.createElement("li", {
        className: "".concat(t, " ").concat(n, "-item-divider"),
        style: r
      });
    };

    mr.defaultProps = {
      disabled: !0,
      className: "",
      style: {}
    };

    var hr = Zn,
        fr = [],
        br = function (e) {
      var t = Object(et.a)({}, e);
      return a.a.createElement(on, Object.assign({}, t, {
        title: e.item.name
      }), e.item.children.map(function (n, r) {
        if (0 === n.children.length) {
          var i = n.id + "_" + r;
          return (n.url === e.pageInStructure.url || "" === n.url && e.pageInStructure.homepage) && fr.push(i), a.a.createElement(ir, {
            key: i
          }, a.a.createElement("div", {
            style: {
              height: "100%",
              width: "100%"
            },
            onClick: function () {
              return window.location = n.url;
            }
          }, n.name));
        }

        return a.a.createElement(gr, Object.assign({
          item: n
        }, t, {
          key: n.id + "_" + r,
          pageInStructure: e.pageInStructure
        }));
      }));
    },
        gr = br,
        vr = Object(i.b)(function (e) {
      return {
        pagesStructure: e.mD.pagesStructure,
        pageInStructure: e.mD.currentPageItem
      };
    })(function (e) {
      Object(r.useEffect)(function () {
        if (!e.document.getElementById("__menu__popup__container__")) {
          var t = e.document.createElement("div");
          t.setAttribute("id", "__menu__popup__container__"), t.setAttribute("style", "z-index:100000;position: absolute;"), e.document.body.appendChild(t);
        }
      });

      var t = function (e) {
        var t = [];
        return e.pagesStructure.forEach(function (e) {
          e.hidden && t.push(e.id);
        }), e.pagesStructure.forEach(function (e) {
          e.path.forEach(function (n) {
            t.includes(n) && t.push(e.id);
          });
        }), Object(H.a)(function (n) {
          var r = [],
              a = [];
          return n && (n.forEach(function (t) {
            "variable" === t.generatedFrom ? e.parentPluginProps[t.name] && (r = [].concat(Object(ue.a)(r), Object(ue.a)(e.parentPluginProps[t.name]))) : r.push(t);
          }), r.forEach(function (n) {
            "all" === n.generatedFrom ? e.pagesStructure.forEach(function (e) {
              t.includes(e.id) || a.push({
                name: e.name,
                properties: n.properties,
                id: n.id + e.id,
                path: [].concat(Object(ue.a)(n.path), Object(ue.a)(e.path.map(function (e) {
                  return n.id + e;
                }))),
                url: e.url
              });
            }) : n.all ? e.pagesStructure.forEach(function (e) {
              e.path.includes(n.generatedFrom) && !t.includes(e.id) && a.push({
                id: n.id + e.id,
                name: e.name,
                properties: n.properties,
                path: [].concat(Object(ue.a)(n.path), Object(ue.a)(e.path.slice(e.path.indexOf(n.generatedFrom) - 1).map(function (e) {
                  return n.id + e;
                }))),
                url: e.url
              });
            }) : "link" !== n.generatedFrom ? e.pagesStructure.forEach(function (e) {
              e.id !== n.generatedFrom || t.includes(e.id) || a.push({
                id: n.id,
                name: n.name,
                properties: n.properties,
                path: n.path,
                url: e.url
              });
            }) : "link" === n.generatedFrom && a.push({
              id: n.id,
              name: n.name,
              path: n.path,
              url: n.properties && n.properties.url || "",
              properties: n.properties
            });
          })), a;
        }(e.elementValues.menuItems));
      }(e);

      fr.length = 0;
      var n = t.map(function (t, n) {
        if (0 === t.children.length) {
          var r = t.id + "_" + n;
          return (t.url === e.pageInStructure.url || "" === t.url && e.pageInStructure.homepage) && fr.push(r), a.a.createElement(ir, {
            key: r,
            className: t.properties ? t.properties.class : ""
          }, a.a.createElement("div", {
            style: {
              height: "100%",
              width: "100%"
            },
            onClick: function () {
              return window.location = t.url;
            }
          }, t.name));
        }

        return a.a.createElement(br, {
          item: t,
          key: t.id + "_" + n,
          pageInStructure: e.pageInStructure
        });
      });
      return a.a.createElement(hr, {
        prefixCls: "systemclass_menu",
        getPopupContainer: function () {
          return e.document.getElementById("__menu__popup__container__");
        },
        topMenuBlockClasses: e.elementValues.properties.topMenuBlockClasses,
        topMenuItemClasses: e.elementValues.properties.topMenuItemClasses,
        topMenuItemActiveClasses: e.elementValues.properties.topMenuItemActiveClasses,
        popupMenuBlockClasses: e.elementValues.properties.popupMenuBlockClasses,
        popupMenuItemClasses: e.elementValues.properties.popupMenuItemClasses,
        popupMenuItemActiveClasses: e.elementValues.properties.popupMenuItemActiveClasses,
        mode: e.elementValues.properties.mode,
        selectable: !1,
        triggerSubMenuAction: e.elementValues.properties.trigger,
        activeKeys: fr,
        overflowedIndicator: e.overflowIcon
      }, n);
    }),
        _r = (n(930), n(931), n(932)),
        yr = n.n(_r),
        Cr = function (e, t, n) {
      for (; e.attributes.length > 0;) e.removeAttribute(e.attributes[0].name);

      if (n.elementValues.style) {
        var r = n.elementValues.style.replace(/\$[^:;\$\s]*\$/g, function (e) {
          var t = Object(H.d)(e);
          return t && n.parentPluginProps[t] || "";
        });
        e.setAttribute("style", r);
      }

      for (var a in t) {
        var i = a.toLowerCase();

        switch (i) {
          case "style":
          case "":
            break;

          default:
            e.setAttribute(i, t[i]);
        }
      }
    },
        Sr = function (e) {
      var t = {};

      for (var n in e.elementValues.properties) {
        var r = Object(H.d)(e.elementValues.properties[n]);
        t[n] = r ? e.parentPluginProps[r] : e.elementValues.properties[n], t[n] && (t[n] = JSON.parse(JSON.stringify(t[n]).replace(/\$[A-Za-z0-9]*\$/g, function (t) {
          var n = Object(H.d)(t);
          return n && e.parentPluginProps[n] || "";
        })));
      }

      return {
        refinedProperties: Object(h.a)({}, e.parentPluginProps, t),
        ownRefinedProperties: t
      };
    },
        Er = function (e, t) {
      e.stopPropagation(), "page" === t.findMode ? t.hoverBox(t.routePlugin || t.element.id, "page", !0) : "plugin" === t.findMode && t.sourcePlugin && (t.chooseResource(t.sourcePlugin, "plugin"), t.hoverBox(t.element.id, "plugin", !0));
    },
        wr = function (e, t) {
      t.findMode && (e.stopPropagation(), t.unhoverBox());
    },
        Or = function (e, t) {
      "page" === t.findMode ? (e.stopPropagation(), t.chooseBox(t.findMode, t.routePlugin || t.element.id)) : "plugin" === t.findMode && (e.stopPropagation(), t.sourcePlugin && (t.chooseResource(t.sourcePlugin, "plugin"), t.chooseBox(t.findMode, t.element.id))), t.toggleFindMode();
    },
        Mr = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"],
        xr = ["meta", "title", "link", "base", "style", "script", "noscript", "text"],
        Pr = n(946),
        Tr = n.n(Pr),
        jr = n(958),
        Vr = n.n(jr),
        Ir = n(568),
        Dr = Object(i.b)(function (e, t) {
      var n,
          r = t.sourcePlugin || t.currentResource;
      return r && (n = Object(H.c)(r, e.resourcesObjects).values[t.element.id]), {
        findMode: e.findMode,
        elementValues: n,
        pluginsStructure: e.mD.pluginsStructure,
        currentWebsiteObject: e.mD.currentWebsiteObject,
        filesStructure: e.mD.filesStructure
      };
    }, function (e) {
      return {
        saveHoveredElementRect: function (t, n) {
          return e(o.G(t, n));
        },
        hoverBox: function (t, n, r) {
          return e(o.u(t, n, r));
        },
        unhoverBox: function () {
          return e(o.Q());
        },
        chooseBox: function (t, n) {
          return e(o.j(t, n));
        },
        toggleFindMode: function (t) {
          return e(o.P(t));
        },
        chooseResource: function (t, n, r) {
          return e(o.k(t, n, r));
        }
      };
    })(Object(r.memo)(function (e) {
      var t = Object(r.useRef)(null);
      if (Object(r.useEffect)(function () {
        var n = t.current;
        if (n && o) if ("script" === s) {
          var r = e.document.createElement(s);
          r.textContent = n.textContent, Cr(r, o, e), n.parentNode.appendChild(r);
        } else Cr(n, o, e);
      }), !e.elementValues) return null;
      var n = Sr(e),
          i = n.refinedProperties,
          o = n.ownRefinedProperties,
          l = [].concat(Object(ue.a)(e.element.path), [e.element.id]),
          s = e.element.tag || "div";
      s = s.length > 0 ? s : "div";

      var c = function (t) {
        var n = {},
            r = Ir.b[t] || [],
            i = !0,
            o = !1,
            l = void 0;

        try {
          for (var s, c = function () {
            var t = s.value,
                r = e.structure.find(function (n) {
              return n.forModule === e.element.id && n.childrenTo === t.id;
            }),
                i = void 0;
            r && (i = e.structure.filter(function (e) {
              return g()(e.path, [].concat(Object(ue.a)(r.path), [r.id]));
            }).map(function (t) {
              return a.a.createElement(Dr, {
                key: t.id,
                structure: e.structure.filter(function (e) {
                  return e.path.includes(t.id);
                }),
                element: t,
                document: e.document,
                pluginsPathArray: e.pluginsPathArray,
                sourcePlugin: e.sourcePlugin,
                routePlugin: e.routePlugin,
                parentPluginProps: e.parentPluginProps,
                childrenForPlugin: e.childrenForPlugin,
                currentResource: e.currentResource
              });
            })), i && (n[t.id] = i);
          }, u = r[Symbol.iterator](); !(i = (s = u.next()).done); i = !0) c();
        } catch (d) {
          o = !0, l = d;
        } finally {
          try {
            i || null == u.return || u.return();
          } finally {
            if (o) throw l;
          }
        }

        return n;
      };

      if (e.element.childrenTo) return null;

      if (e.element.isChildren) {
        var u = e.childrenForPlugin.find(function (t) {
          return t.childrenTo === e.element.id && t.forPlugin === e.sourcePlugin;
        });

        if (u) {
          var d = e.childrenForPlugin.filter(function (e) {
            return e.path.includes(u.id);
          });
          return d.filter(function (e) {
            return e.path.length > 0 && e.path[e.path.length - 1] === u.id;
          }).map(function (t) {
            return a.a.createElement(Dr, {
              key: t.id,
              structure: d,
              element: t,
              document: e.document,
              pluginsPathArray: e.pluginsPathArray,
              sourcePlugin: u.sourcePlugin,
              routePlugin: e.routePlugin,
              parentPluginProps: e.parentPluginProps,
              childrenForPlugin: e.childrenForPlugin,
              currentResource: t.fromResource,
              isHead: e.isHead
            });
          });
        }

        return null;
      }

      if (e.element.isElementFromCMSVariable) {
        var p = e.element.tag,
            m = "";
        return p && e.parentPluginProps[p] && (m = e.parentPluginProps[p]), Tr()(Vr()(m, {
          allowedTags: !1,
          allowedAttributes: !1
        }));
      }

      if (Object(H.b)(s.charAt(0))) {
        var f = e.pluginsStructure.find(function (e) {
          return e.name === s;
        });

        if (f) {
          var b = [].concat(Object(ue.a)(e.structure.filter(function (t) {
            return t.path.includes(e.element.id);
          }).map(function (t) {
            return Object(h.a)({}, t, {
              fromResource: e.currentResource
            });
          })), Object(ue.a)(e.childrenForPlugin ? e.childrenForPlugin : []));
          return e.pluginsPathArray.find(function (e) {
            return e.plugin === f.id;
          }) ? null : a.a.createElement(kr, {
            pluginsStructure: e.pluginsStructure,
            plugin: f,
            tag: s,
            document: e.document,
            routePlugin: e.routePlugin || e.element.id,
            pluginsPathArray: [].concat(Object(ue.a)(e.pluginsPathArray), [{
              id: e.element.id,
              plugin: f.id
            }]),
            parentPluginProps: i,
            childrenForPlugin: b,
            currentResource: f.id,
            isHead: e.isHead
          });
        }

        return null;
      }

      if (!e.isHead || xr.includes(s)) {
        if ("websiterMenu" === s) return a.a.createElement("div", {
          ref: t,
          onMouseEnter: function (t) {
            return Er(t, e);
          },
          onMouseMove: function (t) {
            return Er(t, e);
          },
          onMouseLeave: function (t) {
            return wr(t, e);
          },
          onMouseDown: function (t) {
            return Or(t, e);
          }
        }, a.a.createElement(vr, Object.assign({
          element: e.element,
          elementValues: e.elementValues,
          document: e.document,
          parentPluginProps: e.parentPluginProps,
          childrenForPlugin: e.childrenForPlugin
        }, c(s))));

        if ("websiterGallery" === s) {
          var v = i.items || [];
          return i.originalClass && (v = v.map(function (e) {
            return Object(h.a)({}, e, {
              originalClass: i.originalClass
            });
          })), a.a.createElement("div", {
            ref: t,
            onMouseEnter: function (t) {
              return Er(t, e);
            },
            onMouseMove: function (t) {
              return Er(t, e);
            },
            onMouseLeave: function (t) {
              return wr(t, e);
            },
            onMouseDown: function (t) {
              return Or(t, e);
            }
          }, a.a.createElement(yr.a, Object.assign({}, {
            dots: !0,
            infinite: !0,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          }, i, c(s)), a.a.createElement("div", null, a.a.createElement("div", {
            style: {
              width: "100px",
              height: "100px",
              background: "red"
            }
          }, "sdfsdf")), e.currentWebsiteObject && e.filesStructure ? v.map(function (e) {
            return a.a.createElement("div", null, a.a.createElement("img", {
              src: e.original
            }));
          }) : null));
        }

        return "richEditor" === s ? Tr()(Vr()(e.elementValues.textContent, {
          allowedTags: !1,
          allowedAttributes: !1
        })) : e.element.text ? e.elementValues.textContent ? e.elementValues.textContent.replace(/\$[A-Za-z0-9]*\$/g, function (t) {
          var n = Object(H.d)(t);
          return n && e.parentPluginProps[n] || "";
        }) : e.isHead ? "" : null : (s = (s = s.replace(/[^a-z]/g, "")).trim(), Mr.includes(s) ? a.a.createElement(s, Object.assign({
          ref: t,
          onMouseEnter: function (t) {
            return Er(t, e);
          },
          onMouseMove: function (t) {
            return Er(t, e);
          },
          onMouseLeave: function (t) {
            return wr(t, e);
          },
          onMouseDown: function (t) {
            return Or(t, e);
          }
        }, _()(e.isHead ? o : {}, ["class", "for"]))) : a.a.createElement(s, Object.assign({
          ref: t,
          onMouseEnter: function (t) {
            return Er(t, e);
          },
          onMouseMove: function (t) {
            return Er(t, e);
          },
          onMouseLeave: function (t) {
            return wr(t, e);
          },
          onMouseDown: function (t) {
            return Or(t, e);
          }
        }, _()(e.isHead ? o : {}, ["class", "for"])), "menu" !== s ? e.structure.filter(function (e) {
          return g()(e.path, l);
        }).map(function (t) {
          return a.a.createElement(Dr, {
            key: t.id,
            structure: e.structure.filter(function (e) {
              return e.path.includes(t.id);
            }),
            element: t,
            document: e.document,
            pluginsPathArray: e.pluginsPathArray,
            sourcePlugin: e.sourcePlugin,
            routePlugin: e.routePlugin,
            parentPluginProps: e.parentPluginProps,
            childrenForPlugin: e.childrenForPlugin,
            currentResource: e.currentResource
          });
        }) : null));
      }

      return null;
    }, function (e, t) {
      return g()(e, t);
    })),
        Rr = Dr,
        kr = Object(i.b)(function (e, t) {
      var n = Object(H.c)(t.plugin.id, e.resourcesObjects);
      return {
        pluginStructure: n ? n.structure : []
      };
    })(function (e) {
      return !e.plugin.hidden && e.pluginStructure ? e.plugin.propagating ? Array.isArray(e.parentPluginProps.items) ? e.parentPluginProps.items.map(function (t) {
        return e.pluginStructure.filter(function (e) {
          return g()(e.path, ["element_0"]);
        }).map(function (n) {
          return a.a.createElement(Dr, {
            key: n.id,
            structure: e.pluginStructure,
            element: n,
            document: e.document,
            sourcePlugin: e.plugin.id,
            routePlugin: e.routePlugin,
            pluginsPathArray: e.pluginsPathArray,
            parentPluginProps: Object(h.a)({}, e.parentPluginProps, t),
            childrenForPlugin: e.childrenForPlugin,
            currentResource: e.currentResource,
            isHead: e.isHead
          });
        });
      }) : null : e.pluginStructure.filter(function (e) {
        return g()(e.path, ["element_0"]);
      }).map(function (t) {
        return a.a.createElement(Dr, {
          key: t.id,
          structure: e.pluginStructure,
          element: t,
          document: e.document,
          sourcePlugin: e.plugin.id,
          routePlugin: e.routePlugin,
          pluginsPathArray: e.pluginsPathArray,
          parentPluginProps: e.parentPluginProps,
          childrenForPlugin: e.childrenForPlugin,
          currentResource: e.currentResource,
          isHead: e.isHead
        });
      }) : null;
    }),
        zr = n(76),
        Br = n.n(zr),
        Fr = Object(i.b)(function (e) {
      return {
        hoveredElementId: -100,
        hoveredElementSize: e.hoveredElementSize,
        hoverMode: e.hoverMode,
        currentPlugin: e.currentPlugin
      };
    })(function (e) {
      var t = document.getElementById("builderFrame");
      if (!t) return null;

      var n = t.contentWindow.pageYOffset,
          r = t.contentWindow.pageXOffset,
          i = [],
          o = [],
          l = function e(t) {
        if (Br()(t.children)) i.push(a.a.createElement("div", {
          key: i.length,
          style: {
            background: "blue",
            opacity: ".3",
            position: "fixed",
            left: t.left - r + "px",
            top: t.top - n + "px",
            width: t.width + "px",
            height: t.height + "px",
            pointerEvents: "none",
            zIndex: "2147483647",
            border: "none",
            margin: "0px",
            padding: "0px",
            borderRadius: "0px",
            boxShadow: "none",
            backgroundImage: "none"
          }
        }));else for (var o in t.children) e(t.children[o]);
      };

      return e.hoveredElementId && ("page" === e.hoverMode ? e.hoveredElementSize[e.hoveredElementId] && l(e.hoveredElementSize[e.hoveredElementId]) : "plugin" === e.hoverMode && (function t(n) {
        for (var r in n) if (n[r].plugin === e.currentPlugin) for (var a in n[r].children) a === e.hoveredElementId && o.push(n[r].children[a]);else t(n[r].children);
      }(e.hoveredElementSize), o.forEach(function (e) {
        l(e);
      }))), i;
    }),
        Nr = n(1009),
        Hr = n(228),
        Wr = function (e, t, n, r, a) {
      var i = t && t.currentId ? t.currentId : 0;

      if (t && n) {
        var o = function n(r, a, o, l, s, c) {
          if (!r || !a) return {
            structure: [],
            values: {}
          };
          var u = r.structure,
              d = a.structure;
          if (!d || !u) return {
            structure: [],
            values: {}
          };
          var p = [],
              m = !0,
              f = !1,
              b = void 0;

          try {
            for (var v, _ = u[Symbol.iterator](); !(m = (v = _.next()).done); m = !0) {
              var y = v.value;
              r.values[y.id].CMSVariableType && r.values[y.id].CMSVariableType.indexOf(!0) && "array" !== r.values[y.id].CMSVariableType && p.push(y);
            }
          } catch (W) {
            f = !0, b = W;
          } finally {
            try {
              m || null == _.return || _.return();
            } finally {
              if (f) throw b;
            }
          }

          var C = [],
              S = [],
              E = d.filter(function (e) {
            return e.path.length > 0 && "element_02" === e.path[0] && !e.path.find(function (e) {
              return a.values[e] && "array" === a.values[e].CMSVariableType;
            });
          });
          E = l ? E.map(function (e) {
            var t = {
              pluginId: l,
              variable: e.id
            },
                n = p.find(function (e) {
              return g()(e.forPropagatingPlugin, t);
            });
            if (n) return C.push(e.id), S.push(n.id), Object(h.a)({}, e, {
              forPropagatingPlugin: t,
              id: n.id,
              isCMSVariable: !1
            });
            var r = "elementCMS_" + i;
            return i++, C.push(e.id), S.push(r), Object(h.a)({}, e, {
              id: r,
              forPropagatingPlugin: t,
              isCMSVariable: !1
            });
          }).map(function (e) {
            var t = e.path.indexOf(c);
            return Object(h.a)({}, e, {
              path: [].concat(Object(ue.a)(s), Object(ue.a)(e.path.filter(function (e, n) {
                return "element_02" !== e && n > t;
              }).map(function (e) {
                return S[C.indexOf(e.id)];
              })))
            });
          }) : E.map(function (e) {
            return C.push(e.id), S.push(e.id), Object(h.a)({}, e, {
              path: e.path.slice(1),
              isCMSVariable: !1
            });
          });
          var w = [],
              O = !0,
              M = !1,
              x = void 0;

          try {
            for (var P, T = E[Symbol.iterator](); !(O = (P = T.next()).done); O = !0) {
              var j = P.value,
                  V = C[S.indexOf(j.id)];
              a.values[V].CMSVariableType.indexOf(!1) && w.push(j.id);
            }
          } catch (W) {
            M = !0, x = W;
          } finally {
            try {
              O || null == T.return || T.return();
            } finally {
              if (M) throw x;
            }
          }

          var I = {},
              D = [],
              R = !0,
              k = !1,
              z = void 0;

          try {
            for (var B, F = function () {
              var i = B.value,
                  s = C[S.indexOf(i.id)],
                  d = a.values[s],
                  p = r.structure.find(function (e) {
                return e.id === i.id;
              }),
                  m = Object(h.a)({}, i, {
                CMSVariableType: d.CMSVariableType
              });

              if (p && (m = Object(h.a)({}, m, {
                expanded: p.expanded
              })), I[i.id] = Object(h.a)({}, a.values[s], {
                value: "",
                menuItems: [],
                currentMenuItem: "",
                currentMenuId: 0
              }, r.values[i.id] || {}, {
                CMSVariableType: a.values[s].CMSVariableType
              }), D.push(Object(h.a)({}, m, {
                path: i.path.filter(function (e) {
                  return !w.includes(e);
                })
              })), 0 === d.CMSVariableType.indexOf("propagating_")) {
                var f = u.filter(function (e) {
                  return g()(e.path, [].concat(Object(ue.a)(i.path), [i.id]));
                }),
                    b = d.CMSVariableType.slice("propagating_".length),
                    v = Object(H.c)(b, e.resourcesObjects),
                    _ = !0,
                    y = !1,
                    E = void 0;

                try {
                  for (var O, M = function () {
                    var e = O.value,
                        r = [].concat(Object(ue.a)(e.path), [e.id]),
                        a = u.filter(function (e) {
                      return g()(e.path, r);
                    }),
                        i = n({
                      structure: a,
                      values: t.values
                    }, v, o, b, r, c),
                        l = i.structure,
                        s = i.values;
                    D = [].concat(Object(ue.a)(D), [e], Object(ue.a)(l)), I = Object(h.a)({}, I, s, Object(ae.a)({}, e.id, t.values[e.id]));
                  }, x = f[Symbol.iterator](); !(_ = (O = x.next()).done); _ = !0) M();
                } catch (W) {
                  y = !0, E = W;
                } finally {
                  try {
                    _ || null == x.return || x.return();
                  } finally {
                    if (y) throw E;
                  }
                }
              }

              if ("array" === d.CMSVariableType) {
                var P = u.filter(function (e) {
                  return g()(e.path, [].concat(Object(ue.a)(i.path), [i.id]));
                }),
                    T = {
                  structure: a.structure.filter(function (e) {
                    return e.path.includes(i.id);
                  }),
                  values: {}
                },
                    j = !0,
                    V = !1,
                    R = void 0;

                try {
                  for (var k, z = T.structure[Symbol.iterator](); !(j = (k = z.next()).done); j = !0) {
                    var F = k.value;
                    T.values[F.id] = a.values[F.id];
                  }
                } catch (W) {
                  V = !0, R = W;
                } finally {
                  try {
                    j || null == z.return || z.return();
                  } finally {
                    if (V) throw R;
                  }
                }

                var N = !0,
                    L = !1,
                    K = void 0;

                try {
                  for (var A, U = function () {
                    var e = A.value,
                        r = [].concat(Object(ue.a)(e.path), [e.id]),
                        a = u.filter(function (e) {
                      return g()(e.path, r);
                    }),
                        s = n({
                      structure: a,
                      values: t.values
                    }, T, o, l || o, r, i.id),
                        c = s.structure,
                        d = s.values;
                    D = [].concat(Object(ue.a)(D), [e], Object(ue.a)(c)), I = Object(h.a)({}, I, d, Object(ae.a)({}, e.id, t.values[e.id]));
                  }, q = P[Symbol.iterator](); !(N = (A = q.next()).done); N = !0) U();
                } catch (W) {
                  L = !0, K = W;
                } finally {
                  try {
                    N || null == q.return || q.return();
                  } finally {
                    if (L) throw K;
                  }
                }
              }
            }, N = E[Symbol.iterator](); !(R = (B = N.next()).done); R = !0) F();
          } catch (W) {
            k = !0, z = W;
          } finally {
            try {
              R || null == N.return || N.return();
            } finally {
              if (k) throw z;
            }
          }

          return {
            structure: D,
            values: I
          };
        }(t, n, a),
            l = o.structure,
            s = o.values,
            c = {
          currentId: i,
          structure: l,
          values: s
        },
            u = !0,
            d = !1,
            p = void 0;

        try {
          for (var m, f = t.structure.filter(function (e) {
            return "trash" === e.id || e.path.length > 0 && "trash" === e.path[0];
          })[Symbol.iterator](); !(u = (m = f.next()).done); u = !0) {
            var b = m.value;
            c.structure.push(b), c.values[b.id] = t.values[b.id];
          }
        } catch (v) {
          d = !0, p = v;
        } finally {
          try {
            u || null == f.return || f.return();
          } finally {
            if (d) throw p;
          }
        }

        if (c.structure = c.structure.map(function (e) {
          return _()(e, "itemPath");
        }), !g()(c.structure.map(function (e) {
          return _()(e, ["expanded", "children", "itemPath", "itemIndex"]);
        }), t.structure.map(function (e) {
          return _()(e, ["expanded", "children", "itemPath", "itemIndex"]);
        })) || !g()(c.values, t.values)) return ["page", c, r];
      }

      return !1;
    },
        Lr = n(1011),
        Kr = Object(i.b)(function (e) {
      return {
        sizeIsChanging: e.sizeIsChanging
      };
    })(function (e) {
      return e.sizeIsChanging ? a.a.createElement("div", {
        className: Lr.Overlay
      }) : null;
    }),
        Ar = function (e) {
      function t() {
        var e, n;
        Object(qe.a)(this, t);

        for (var r = arguments.length, a = new Array(r), i = 0; i < r; i++) a[i] = arguments[i];

        return (n = Object(Ze.a)(this, (e = Object(Ye.a)(t)).call.apply(e, [this].concat(a)))).state = {
          headValue: ""
        }, n.head = "", n.currentScroll = 0, n.prod = !0, n;
      }

      return Object(Je.a)(t, e), Object(Ge.a)(t, [{
        key: "componentDidUpdate",
        value: function (e) {
          var t = this;
          e.currentPageId !== this.props.currentPageId && (this.currentScroll = 0), document.getElementById("builderFrame") && (this.props.isRefreshing || setTimeout(function () {
            var e = document.getElementById("builderFrame");
            e && (e.contentWindow.document.documentElement.scrollTop = e.contentWindow.document.body.scrollTop = t.currentScroll, e.contentWindow.scrollTo(t.currentScroll, t.currentScroll));
          }, 1));
        }
      }, {
        key: "shouldComponentUpdate",
        value: function (e) {
          return !this.props.sizeIsChanging && !e.sizeIsChanging;
        }
      }, {
        key: "componentWillReceiveProps",
        value: function (e) {
          if (!e.isRefreshing) {
            var t = document.getElementById("builderFrame");
            t && (this.currentScroll = t.contentWindow.document.documentElement.scrollTop || t.contentWindow.document.body.scrollTop);
          }

          if (e.pagesStructure) {
            var n;
            if (e.refreshedGlobalStructure) return void (n = this.props).saveElementsStructureFromBuilder.apply(n, Object(ue.a)(e.refreshedGlobalStructure));

            if (e.currentPageDraftStructure && e.pageTemplateDraftStructure) {
              var r;
              if (e.refreshedPageStructure) return void (r = this.props).saveElementsStructureFromBuilder.apply(r, Object(ue.a)(e.refreshedPageStructure));
              var o = e.pageTemplateDraftStructure.filter(function (e) {
                return g()(e.path, ["element_01", "element_0"]);
              }).map(function (t) {
                return a.a.createElement(Rr, {
                  key: t.id,
                  structure: e.pageTemplateDraftStructure,
                  element: t,
                  hoveredElementId: e.hoveredElementId,
                  document: document,
                  pluginsPathArray: [],
                  parentPluginProps: e.refinedProperties,
                  isHead: !0,
                  currentResource: e.pageTemplateId
                });
              }),
                  l = Object(Nr.renderToString)(a.a.createElement(i.a, {
                store: Hr.store
              }, o)) || "";
              (l !== this.state.headValue || e.shouldRefresh) && (this.props.markRefreshing(!0), this.props.markShouldRefreshing(), this.setState({
                headValue: l
              }));
            }
          }
        }
      }, {
        key: "render",
        value: function () {
          var e = null;

          if (this.props.pageTemplateDraftStructure && this.props.currentPageDraftStructure) {
            var t = this.props,
                n = t.zoom / 100,
                r = 100 / n + "%",
                i = t.pageTemplateDraftStructure,
                o = O()(t.bodyValues.properties),
                l = t.bodyValues.style;
            "string" === typeof l && (o.style = l);
            var s = O()(t.htmlValues.properties),
                c = t.htmlValues.style;
            "string" === typeof c && (s.style = c), e = this.props.isRefreshing ? a.a.createElement(Gr, null) : a.a.createElement(a.a.Fragment, null, a.a.createElement($e.a, {
              id: "builderFrame",
              key: 1,
              style: {
                width: r,
                height: r,
                msZoom: n,
                MozTransform: "scale(".concat(n, ")"),
                MozTransformOrigin: "0 0",
                OTransform: "scale(".concat(n, ")"),
                OTransformOrigin: "0 0",
                WebkitTransform: "scale(".concat(n, ")"),
                WebkitTransformOrigin: "0 0",
                border: "none",
                margin: "0",
                padding: "0",
                position: "absolute"
              },
              bodyProps: o,
              htmlProps: s,
              base: '  <base href="http'.concat(this.prod ? "s" : "", "://live.websiter.dev").concat(this.prod ? "" : ":5000", "/").concat(this.props.currentWebsiteObject.domain, '/" />  '),
              initialContent: "\n<style>\n                        @font-face {\n                        font-family: 'FontAwesome';\n                        src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.eot');\n                        src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.eot?#iefix')\n                                format('embedded-opentype'),\n                            url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.woff')\n                                format('woff'),\n                            url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.ttf')\n                                format('truetype'),\n                            url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/fonts/fontawesome-webfont.svg?#fontawesomeregular')\n                                format('svg');\n                        font-weight: normal;\n                        font-style: normal;\n                    }\n                    .systemclass_menu {\n                        list-style: none;\n                            margin: 0px;\n    padding: 0px;\n        outline: none;\n                    }\n                    .systemclass_menu-hidden {\n                        display: none;\n                    }\n                    .systemclass_menu-collapse {\n                        overflow: hidden;\n                        transition: height 0.3s ease-out;\n                    }\n                    .systemclass_menu-item-group-list {\n                        margin: 0;\n                        padding: 0;\n                    }\n                    .systemclass_menu-item-group-title {\n                        color: #999;\n                        line-height: 1.5;\n                        \n                        border-bottom: 1px solid #dedede;\n                    }\n                    \n                    .systemclass_menu-item-selected {\n                        background-color: #eaf8fe;\n                        transform: translateZ(0);\n                    }\n                    .systemclass_menu-submenu-selected {\n                        background-color: #eaf8fe;\n                    }\n                    .systemclass_menu > li.systemclass_menu-submenu {\n                        padding: 0;\n                    }\n                    \n                    .systemclass_menu-item,\n                    .systemclass_menu-submenu-title {\n                        margin: 0;\n                        position: relative;\n                        display: block;\n                        padding: 0px;\n                        white-space: nowrap;\n                    }\n                    .systemclass_menu-item.systemclass_menu-item-disabled,\n                    .systemclass_menu-submenu-title.systemclass_menu-item-disabled,\n                    .systemclass_menu-item.systemclass_menu-submenu-disabled,\n                    .systemclass_menu-submenu-title.systemclass_menu-submenu-disabled {\n                        color: #777 !important;\n                    }\n                    .systemclass_menu > .systemclass_menu-item-divider {\n                        height: 1px;\n                        margin: 1px 0;\n                        overflow: hidden;\n                        padding: 0;\n                        line-height: 0;\n                        background-color: #e5e5e5;\n                    }\n                    .systemclass_menu-submenu-popup {\n                        position: absolute;\n                    }\n                    .systemclass_menu-submenu-popup .submenu-title-wrapper {\n                        padding-right: 20px;\n                    }\n                    \n                    .systemclass_menu .systemclass_menu-submenu-title .anticon,\n                    .systemclass_menu .systemclass_menu-item .anticon {\n                        width: 14px;\n                        height: 14px;\n                        \n                        top: -1px;\n                    }\n                    .systemclass_menu-horizontal {\n                        border: none;\n                        box-shadow: none;\n                        white-space: nowrap;\n                        overflow: hidden;\n                    }\n                    .systemclass_menu-horizontal > .systemclass_menu-item,\n                    .systemclass_menu-horizontal\n                        > .systemclass_menu-submenu\n                        > .systemclass_menu-submenu-title {\n                        \n                    }\n                    .systemclass_menu-horizontal > .systemclass_menu-submenu,\n                    .systemclass_menu-horizontal > .systemclass_menu-item {\n                        \n                        display: inline-block;\n                        vertical-align: bottom;\n                    }\n                    \n                    .systemclass_menu-horizontal:after {\n                        content: ' ';\n                        display: block;\n                        height: 0;\n                        clear: both;\n                    }\n                    \n                    .systemclass_menu-vertical .systemclass_menu-submenu-arrow,\n                    .systemclass_menu-vertical-left\n                        .systemclass_menu-submenu-arrow,\n                    .systemclass_menu-vertical-right\n                        .systemclass_menu-submenu-arrow,\n                    .systemclass_menu-inline .systemclass_menu-submenu-arrow {\n                        display: inline-block;\n                        font: normal normal normal 14px/1 FontAwesome;\n                        font-size: inherit;\n                        vertical-align: baseline;\n                        text-align: center;\n                        text-transform: none;\n                        text-rendering: auto;\n                        position: absolute;\n                        right: 16px;\n                        line-height: 1.5em;\n                    }\n                    .systemclass_menu-vertical\n                        .systemclass_menu-submenu-arrow:before,\n                    .systemclass_menu-vertical-left\n                        .systemclass_menu-submenu-arrow:before,\n                    .systemclass_menu-vertical-right\n                        .systemclass_menu-submenu-arrow:before,\n                    .systemclass_menu-inline\n                        .systemclass_menu-submenu-arrow:before {\n                        content: '\f0da';\n                    }\n                    .systemclass_menu-inline .systemclass_menu-submenu-arrow {\n                        transform: rotate(90deg);\n                        transition: transform 0.3s;\n                    }\n                    .systemclass_menu-inline\n                        .systemclass_menu-submenu-open\n                        > .systemclass_menu-submenu-title\n                        .systemclass_menu-submenu-arrow {\n                        transform: rotate(-90deg);\n                    }\n\n                    .systemclass_menu-sub.systemclass_menu-inline {\n                        padding: 0;\n                        border: none;\n                        border-radius: 0;\n                        box-shadow: none;\n                    }\n                    .systemclass_menu-sub.systemclass_menu-inline\n                        > .systemclass_menu-item,\n                    .systemclass_menu-sub.systemclass_menu-inline\n                        > .systemclass_menu-submenu\n                        > .systemclass_menu-submenu-title {\n                        \n                        padding: 0;\n                    }\n                    .systemclass_menu-open-slide-up-enter,\n                    .systemclass_menu-open-slide-up-appear {\n                        animation-duration: 0.3s;\n                        animation-fill-mode: both;\n                        transform-origin: 0 0;\n                        opacity: 0;\n                        animation-timing-function: cubic-bezier(\n                            0.08,\n                            0.82,\n                            0.17,\n                            1\n                        );\n                        animation-play-state: paused;\n                    }\n                    .systemclass_menu-open-slide-up-leave {\n                        animation-duration: 0.3s;\n                        animation-fill-mode: both;\n                        transform-origin: 0 0;\n                        opacity: 1;\n                        animation-timing-function: cubic-bezier(\n                            0.6,\n                            0.04,\n                            0.98,\n                            0.34\n                        );\n                        animation-play-state: paused;\n                    }\n                    .systemclass_menu-open-slide-up-enter.systemclass_menu-open-slide-up-enter-active,\n                    .systemclass_menu-open-slide-up-appear.systemclass_menu-open-slide-up-appear-active {\n                        animation-name: systemclassMenuOpenSlideUpIn;\n                        animation-play-state: running;\n                    }\n                    .systemclass_menu-open-slide-up-leave.systemclass_menu-open-slide-up-leave-active {\n                        animation-name: systemclassMenuOpenSlideUpOut;\n                        animation-play-state: running;\n                    }\n                    @keyframes systemclassMenuOpenSlideUpIn {\n                        0% {\n                            opacity: 0;\n                            transform-origin: 0% 0%;\n                            transform: scaleY(0);\n                        }\n                        100% {\n                            opacity: 1;\n                            transform-origin: 0% 0%;\n                            transform: scaleY(1);\n                        }\n                    }\n                    @keyframes systemclassMenuOpenSlideUpOut {\n                        0% {\n                            opacity: 1;\n                            transform-origin: 0% 0%;\n                            transform: scaleY(1);\n                        }\n                        100% {\n                            opacity: 0;\n                            transform-origin: 0% 0%;\n                            transform: scaleY(0);\n                        }\n                    }\n                    .systemclass_menu-open-zoom-enter,\n                    .systemclass_menu-open-zoom-appear {\n                        opacity: 0;\n                        animation-duration: 0.3s;\n                        animation-fill-mode: both;\n                        transform-origin: 0 0;\n                        animation-timing-function: cubic-bezier(\n                            0.08,\n                            0.82,\n                            0.17,\n                            1\n                        );\n                        animation-play-state: paused;\n                    }\n                    .systemclass_menu-open-zoom-leave {\n                        animation-duration: 0.3s;\n                        animation-fill-mode: both;\n                        transform-origin: 0 0;\n                        animation-timing-function: cubic-bezier(\n                            0.6,\n                            0.04,\n                            0.98,\n                            0.34\n                        );\n                        animation-play-state: paused;\n                    }\n                    .systemclass_menu-open-zoom-enter.systemclass_menu-open-zoom-enter-active,\n                    .systemclass_menu-open-zoom-appear.systemclass_menu-open-zoom-appear-active {\n                        animation-name: systemclassMenuOpenZoomIn;\n                        animation-play-state: running;\n                    }\n                    .systemclass_menu-open-zoom-leave.systemclass_menu-open-zoom-leave-active {\n                        animation-name: systemclassMenuOpenZoomOut;\n                        animation-play-state: running;\n                    }\n                    @keyframes systemclassMenuOpenZoomIn {\n                        0% {\n                            opacity: 0;\n                            transform: scale(0, 0);\n                        }\n                        100% {\n                            opacity: 1;\n                            transform: scale(1, 1);\n                        }\n                    }\n                    @keyframes systemclassMenuOpenZoomOut {\n                        0% {\n                            transform: scale(1, 1);\n                        }\n                        100% {\n                            opacity: 0;\n                            transform: scale(0, 0);\n                        }\n                    }\n                    </style>\n " + '<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />' + this.state.headValue
            }, a.a.createElement(Xe.FrameContextConsumer, null, function (e) {
              var n = e.document;
              e.window;
              return i ? i.filter(function (e) {
                return g()(e.path, ["element_01", "element_1"]);
              }).map(function (e) {
                return a.a.createElement(Rr, {
                  key: e.id,
                  structure: i,
                  element: e,
                  hoveredElementId: t.hoveredElementId,
                  document: n,
                  pluginsPathArray: [],
                  parentPluginProps: t.refinedProperties,
                  currentResource: t.pageTemplateId
                });
              }) : null;
            }), a.a.createElement(Fr, null)));
          }

          return a.a.createElement("main", {
            "data-testid": "siteBuilderLayoutMain",
            className: Qe.Content
          }, e, a.a.createElement(Kr, null));
        }
      }]), t;
    }(r.Component),
        Ur = function (e) {
      var t = function (e) {
        var t = function t(n, r, a, i) {
          if (a) {
            var o,
                l = r.values[n.id],
                s = n.forPropagatingPlugin ? n.forPropagatingPlugin.variable : n.id,
                c = a.values[s];

            if (c.CMSVariableSystemName) {
              if ("menuItems" === c.CMSVariableType) return Object(ae.a)({}, c.CMSVariableSystemName, l && l.menuItems && l.menuItems.length > 0 ? l.menuItems : c.defaultMenuItems);
              if ("file" === c.CMSVariableType) return Object(ae.a)({}, c.CMSVariableSystemName, "http://live.websiter.dev:5000/" + e.currentWebsiteObject.domain + (l && l.fileUrl || c.defaultFileUrl));
              if ("colorSelect" === c.CMSVariableType || "color" === c.CMSVariableType) return Object(ae.a)({}, c.CMSVariableSystemName, (o = l && l.color ? l.color : c.defaultColor) ? "rgba(".concat(o.r, ", ").concat(o.g, ", ").concat(o.b, ", ").concat(o.a, ")") : "rgba(0,0,0,0)");
              if (0 !== c.CMSVariableType.indexOf("propagating_") && "array" !== c.CMSVariableType) return Object(ae.a)({}, c.CMSVariableSystemName, l && l.value || c.CMSVariableDefaultValue);

              var u = function () {
                var a = "array" === c.CMSVariableType ? i : c.CMSVariableType.slice("propagating_".length),
                    o = Object(H.c)(a, e.resourcesObjects),
                    l = [],
                    s = r.structure.filter(function (e) {
                  return g()([].concat(Object(ue.a)(n.path), [n.id]), e.path);
                }),
                    u = !0,
                    d = !1,
                    p = void 0;

                try {
                  for (var m, f = function () {
                    var e = m.value,
                        n = {},
                        i = r.structure.filter(function (t) {
                      return g()([].concat(Object(ue.a)(e.path), [e.id]), t.path);
                    }).filter(function (e) {
                      return !!e.forPropagatingPlugin && e.forPropagatingPlugin.pluginId === a;
                    }),
                        s = !0,
                        c = !1,
                        u = void 0;

                    try {
                      for (var d, p = i[Symbol.iterator](); !(s = (d = p.next()).done); s = !0) {
                        var f = d.value,
                            b = t(f, r, o, a);
                        b && (n = Object(h.a)({}, n, b));
                      }
                    } catch (v) {
                      c = !0, u = v;
                    } finally {
                      try {
                        s || null == p.return || p.return();
                      } finally {
                        if (c) throw u;
                      }
                    }

                    l.push(n);
                  }, b = s[Symbol.iterator](); !(u = (m = b.next()).done); u = !0) f();
                } catch (v) {
                  d = !0, p = v;
                } finally {
                  try {
                    u || null == b.return || b.return();
                  } finally {
                    if (d) throw p;
                  }
                }

                return {
                  v: Object(ae.a)({}, c.CMSVariableSystemName, l)
                };
              }();

              if ("object" === typeof u) return u.v;
            }
          }
        },
            n = function (e, n, r) {
          var a = {};

          if (n && e) {
            var i = !0,
                o = !1,
                l = void 0;

            try {
              for (var s, c = n.structure[Symbol.iterator](); !(i = (s = c.next()).done); i = !0) {
                var u = s.value;

                if (u.path.length > 0 && "element_02" === u.path[0] && !u.path.find(function (e) {
                  return "array" === n.values[e].CMSVariableType;
                })) {
                  var d = t(Object(h.a)({}, u, {
                    path: u.path.filter(function (e) {
                      return "element_02" !== e;
                    })
                  }), e, n, r);
                  d && (a = Object(h.a)({}, a, d));
                }
              }
            } catch (p) {
              o = !0, l = p;
            } finally {
              try {
                i || null == c.return || c.return();
              } finally {
                if (o) throw l;
              }
            }
          }

          return a;
        },
            r = n(e.currentPageFSBDraft, e.pageTemplateFSBDraft, e.pageTemplateFSBId),
            a = n(e.globalSettingsPageDraft, e.globalSettingsTemplateDraft, e.globalSettingsTemplateId);

        return Object(h.a)({}, a, r);
      }(e.mD),
          n = {
        properties: {},
        style: ""
      },
          r = {
        properties: {},
        style: ""
      };

      e.mD.pageTemplateFSBDraft && (n = e.mD.pageTemplateFSBDraft.values.element_1, r = e.mD.pageTemplateFSBDraft.values.element_01);
      var a = {
        properties: Sr({
          parentPluginProps: t,
          elementValues: n
        }),
        style: n.style
      },
          i = {
        properties: Sr({
          parentPluginProps: t,
          elementValues: r
        }),
        style: r.style
      },
          o = e.mD.globalSettingsPageDraft ? e.mD.globalSettingsPageDraft.structure : null,
          l = e.mD.globalSettingsTemplateDraft ? e.mD.globalSettingsTemplateDraft.structure : null,
          s = e.mD.currentPageFSBDraft ? e.mD.currentPageFSBDraft.structure : null,
          c = e.mD.pageTemplateFSBDraft ? e.mD.pageTemplateFSBDraft.structure : null,
          u = Wr(e.mD, e.mD.currentPageFSBDraft || null, e.mD.pageTemplateFSBDraft || null, !1, e.mD.pageTemplateFSBId),
          d = Wr(e.mD, e.mD.globalSettingsPageDraft || null, e.mD.globalSettingsTemplateDraft || null, !0, e.mD.globalSettingsTemplateId);
      return {
        currentPageId: e.mD.currentPageId,
        zoom: e.pageZoom,
        isRefreshing: e.isRefreshing,
        shouldRefresh: e.shouldRefresh,
        pagesStructure: e.mD.pagesStructure,
        currentPageDraftStructure: s,
        pageTemplateDraftStructure: c,
        currentPageDraftStructureGlobalSettings: o,
        pageTemplateDraftStructureGlobalSettings: l,
        refinedProperties: t,
        bodyValues: a,
        htmlValues: i,
        pageTemplateId: e.mD.pageTemplateFSBId,
        sizeIsChanging: e.sizeIsChanging,
        refreshedGlobalStructure: d,
        refreshedPageStructure: u,
        currentWebsiteObject: e.mD.currentWebsiteObject
      };
    },
        qr = function (e) {
      return {
        markRefreshing: function (t) {
          return e(o.w(t));
        },
        saveHoveredElementRect: function (t, n) {
          return e(o.G(t, n));
        },
        markShouldRefreshing: function (t) {
          return e(o.x(t));
        },
        saveElementsStructure: function (t, n) {
          return e(o.E(t, n));
        },
        saveElementsStructureFromBuilder: function (t, n, r) {
          return e(o.F(t, n, r));
        }
      };
    },
        Gr = Object(i.b)(Ur, qr)(function (e) {
      var t = Object(r.useRef)(null);
      return Object(r.useEffect)(function () {
        t.current && e.markRefreshing(!1);
      }), a.a.createElement("span", {
        ref: t,
        style: {
          display: "none"
        }
      });
    }),
        Zr = Object(i.b)(Ur, qr)(Ar),
        Yr = n(7),
        Jr = n(614),
        Qr = n(1026),
        Xr = n(1023),
        $r = n(617),
        ea = n(641),
        ta = n.n(ea),
        na = n(1015),
        ra = (t.default = Object(i.b)(function (e) {
      return {
        userObject: e.mD.userObject
      };
    })(function (e) {
      return a.a.createElement(Jr.a, {
        backend: Qr.a,
        options: Xr.a
      }, a.a.createElement(na.a, null, a.a.createElement("base", {
        href: "http".concat("s", "://live.websiter.dev").concat("")
      })), e.userObject ? a.a.createElement("div", {
        style: {
          flexDirection: "column",
          display: "flex",
          flexWrap: "nowrap",
          height: "100%"
        }
      }, a.a.createElement(Zr, null), a.a.createElement(Ue, null)) : "Loading...", a.a.createElement(Yr.a, null), a.a.createElement(ra, null));
    }), Object(i.b)(null, function (e) {
      return {
        changeBarSize: function (t) {
          return e(o.e(t));
        }
      };
    })(Object(r.memo)(function (e) {
      var t = Object($r.a)(function (e) {
        return {
          item: e.getItem(),
          currentOffset: e.getDifferenceFromInitialOffset()
        };
      }),
          n = t.item,
          i = t.currentOffset,
          o = Object(r.useCallback)(ta()(function (t) {
        return e.changeBarSize(t);
      }, 50), []);

      if (n && "barSizes" === n.type) {
        var l = "height" === n.id ? n.startValue - i.y : n.startValue + i.x;
        o({
          key: n.id,
          value: l
        });
      }

      return a.a.createElement("div", null);
    }, function () {
      return !0;
    })));
  },
  476: function (e, t, n) {
    "use strict";

    t.a = function (e, t) {
      return function (n, r) {
        if (sessionStorage.getItem("tryWebsiter")) return !0;
        var a = r().mD;

        if (e && !a.tryWebsiter) {
          if (0 === e.length) return !0;
          var i = a.currentWebsiteObject;
          if (!i) return t || alert("No website."), !1;
          var o = i.sharing.find(function (e) {
            return e.userId === a.userId;
          });
          if (!o) return t || alert("You do not have rights for this action"), !1;
          var l = !1;
          if (e.forEach(function (e) {
            o.rights.includes(e) && (l = !0);
          }), !l) return t || alert("You do not have rights for this action"), !1;
        }

        return !0;
      };
    };
  },
  483: function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return p;
    }), n.d(t, "c", function () {
      return m;
    });

    var r = n(0),
        a = n.n(r),
        i = n(620),
        o = n.n(i),
        l = n(26),
        s = n(619),
        c = n.n(s),
        u = n(40),
        d = n(476),
        p = function (e) {
      return a.a.createElement(a.a.Fragment, null, a.a.createElement("button", {
        "data-tip": !e.tooltipsOff && e.tooltip ? e.tooltip : "",
        "data-testid": "MyButton",
        className: "".concat(e.disabled ? c.a.ButtonDisabled : c.a.Button, " ").concat(e.inline ? c.a.Inline : ""),
        onClick: function () {
          if (e.buttonClicked) {
            if (e.requiredRights && !e.checkUserRights(e.requiredRights || [])) return;
            e.buttonClicked && e.buttonClicked();
          }
        },
        onMouseDown: e.mouseDown,
        disabled: e.disabled,
        style: e.style
      }, a.a.createElement("table", {
        className: c.a.Table
      }, a.a.createElement("tbody", null, a.a.createElement("tr", null, a.a.createElement("td", {
        className: c.a.Cell
      }, e.icon ? a.a.createElement(u.a, {
        icon: e.icon,
        className: c.a.Svg
      }) : null), a.a.createElement("td", {
        className: c.a.Cell
      }, e.title))))), !e.tooltipsOff && e.tooltip ? a.a.createElement(o.a, {
        effect: "solid",
        multiline: !0,
        place: "top",
        className: c.a.Tooltip,
        delayShow: 250,
        overridePosition: m
      }) : null);
    },
        m = function (e, t, n, r, a, i, o, l) {
      var s,
          c,
          u,
          d = window.innerWidth;
      return t.target ? (s = n.getBoundingClientRect(), c = r.getBoundingClientRect()) : (s = t.getBoundingClientRect(), c = n.getBoundingClientRect()), u = s.top - (c.bottom - c.top) >= 0 ? s.top - (c.bottom - c.top) : s.bottom, {
        left: s.left + (c.right - c.left) <= d ? s.left : d - (c.right - c.left),
        top: u
      };
    };

    t.b = Object(l.b)(function (e) {
      return {
        tooltipsOff: e.mD.tooltipsOff
      };
    }, function (e) {
      return {
        checkUserRights: function (t) {
          return e(Object(d.a)(t));
        }
      };
    })(p);
  },
  489: function (e, t, n) {
    e.exports = {
      Content: "AdvancedBar_Content__2eu8X",
      Container: "AdvancedBar_Container__ouxly",
      LastContainer: "AdvancedBar_LastContainer__2gmGl",
      reactTabs: "AdvancedBar_reactTabs__PeMUE",
      reactTabsTabPanelSelected: "AdvancedBar_reactTabsTabPanelSelected__3Z5LQ",
      reactTabsTab: "AdvancedBar_reactTabsTab__1i-7U",
      TabSelected: "AdvancedBar_TabSelected__2gsJ3",
      mainContainer: "AdvancedBar_mainContainer__3Igr9",
      heightControll: "AdvancedBar_heightControll__kZHcw",
      widthControll: "AdvancedBar_widthControll__1TDc2",
      TabList: "AdvancedBar_TabList__DeMU7"
    };
  },
  492: function (e, t, n) {
    "use strict";

    var r = n(83),
        a = n(0),
        i = n.n(a),
        o = n(676),
        l = n(669),
        s = n(9),
        c = n(26),
        u = n(590);
    t.a = Object(c.b)(null, function (e) {
      return {
        setSizeIsChanging: function (t) {
          return e(s.L(t));
        }
      };
    })(Object(a.memo)(function (e) {
      var t = Object(l.a)({
        item: {
          id: e.type,
          type: "barSizes",
          startValue: e.startValue
        },
        begin: function (t) {
          e.setSizeIsChanging(!0);
        },
        end: function (t) {
          e.setSizeIsChanging(!1);
        }
      }),
          n = Object(r.a)(t, 3),
          s = n[1],
          c = n[2];
      return Object(a.useEffect)(function () {
        c(Object(u.a)(), {
          captureDraggingState: !0
        });
      }, []), i.a.createElement("div", {
        ref: s,
        className: [o.SectionHeight, e.addClass].join(" "),
        "data-testid": "sizeDragController"
      }, e.vertical ? null : i.a.createElement("div", {
        className: o.InnerDiv
      }));
    }, function (e, t) {
      return e.type === t.type && e.startValue === t.startValue;
    }));
  },
  495: function (e, t, n) {
    e.exports = {
      rst__virtualScrollOverride: "ResourcesTree_rst__virtualScrollOverride__14H_n",
      ReactVirtualized__Grid__innerScrollContainer: "ResourcesTree_ReactVirtualized__Grid__innerScrollContainer__3oB7v",
      rst__rtl: "ResourcesTree_rst__rtl__2v8si",
      ReactVirtualized__Grid: "ResourcesTree_ReactVirtualized__Grid__2itHy",
      rst__node: "ResourcesTree_rst__node__1UngL",
      rst__nodeContent: "ResourcesTree_rst__nodeContent__T6EAQ",
      rst__lineBlock: "ResourcesTree_rst__lineBlock__WqdmT",
      rst__absoluteLineBlock: "ResourcesTree_rst__absoluteLineBlock__kLCAo",
      rst__lineHalfHorizontalRight: "ResourcesTree_rst__lineHalfHorizontalRight__3y3sx",
      rst__lineFullVertical: "ResourcesTree_rst__lineFullVertical__3Ymv5",
      rst__lineHalfVerticalTop: "ResourcesTree_rst__lineHalfVerticalTop__3t0z_",
      rst__lineHalfVerticalBottom: "ResourcesTree_rst__lineHalfVerticalBottom__2EWSD",
      rst__highlightLineVertical: "ResourcesTree_rst__highlightLineVertical__2bs3i",
      "arrow-pulse": "ResourcesTree_arrow-pulse__33hBy",
      rst__highlightTopLeftCorner: "ResourcesTree_rst__highlightTopLeftCorner__lPAZc",
      rst__highlightBottomLeftCorner: "ResourcesTree_rst__highlightBottomLeftCorner__25QNo",
      rst__rowWrapper: "ResourcesTree_rst__rowWrapper__3XsZ3",
      rst__row: "ResourcesTree_rst__row__bcARd",
      rst__rowLandingPad: "ResourcesTree_rst__rowLandingPad__1f07p",
      rst__rowCancelPad: "ResourcesTree_rst__rowCancelPad__FcoMC",
      rst__rowSearchMatch: "ResourcesTree_rst__rowSearchMatch__1dEhr",
      rst__rowSearchFocus: "ResourcesTree_rst__rowSearchFocus__hn8oU",
      rst__rowContents: "ResourcesTree_rst__rowContents__TJoCP",
      rst__rowLabel: "ResourcesTree_rst__rowLabel__3YFrc",
      rst__rowToolbar: "ResourcesTree_rst__rowToolbar__19RS7",
      rst__moveHandle: "ResourcesTree_rst__moveHandle__3rWVj",
      rst__toolbarButton: "ResourcesTree_rst__toolbarButton__evOf_",
      rst__rowContentsDragDisabled: "ResourcesTree_rst__rowContentsDragDisabled__1EWBY",
      rst__loadingHandle: "ResourcesTree_rst__loadingHandle__2Zu5M",
      rst__loadingCircle: "ResourcesTree_rst__loadingCircle__1_Ncp",
      rst__loadingCirclePoint: "ResourcesTree_rst__loadingCirclePoint__3Iqw0",
      pointFade: "ResourcesTree_pointFade__DIUx5",
      rst__rowTitle: "ResourcesTree_rst__rowTitle__XvyLR",
      rst__rowTitleWithSubtitle: "ResourcesTree_rst__rowTitleWithSubtitle__FsOAp",
      rst__rowSubtitle: "ResourcesTree_rst__rowSubtitle__33HgD",
      rst__collapseButton: "ResourcesTree_rst__collapseButton__3ZMhA",
      rst__expandButton: "ResourcesTree_rst__expandButton__2IdqU",
      rst__lineChildren: "ResourcesTree_rst__lineChildren__3e7wI",
      rst__placeholder: "ResourcesTree_rst__placeholder__3z4Y9",
      rst__placeholderLandingPad: "ResourcesTree_rst__placeholderLandingPad__33C1B",
      rst__placeholderCancelPad: "ResourcesTree_rst__placeholderCancelPad__1dnkd",
      ReactVirtualized__Table__headerRow: "ResourcesTree_ReactVirtualized__Table__headerRow__2ItiE",
      ReactVirtualized__Table__row: "ResourcesTree_ReactVirtualized__Table__row__3Dbho",
      ReactVirtualized__Table__headerTruncatedText: "ResourcesTree_ReactVirtualized__Table__headerTruncatedText__Cw5HL",
      ReactVirtualized__Table__headerColumn: "ResourcesTree_ReactVirtualized__Table__headerColumn__14jIY",
      ReactVirtualized__Table__rowColumn: "ResourcesTree_ReactVirtualized__Table__rowColumn__3wE69",
      ReactVirtualized__Table__sortableHeaderColumn: "ResourcesTree_ReactVirtualized__Table__sortableHeaderColumn__3a1cB",
      ReactVirtualized__Table__sortableHeaderIconContainer: "ResourcesTree_ReactVirtualized__Table__sortableHeaderIconContainer__1pMeg",
      ReactVirtualized__Table__sortableHeaderIcon: "ResourcesTree_ReactVirtualized__Table__sortableHeaderIcon__3O5xb",
      Hovered: "ResourcesTree_Hovered__2-yOq",
      Chosen: "ResourcesTree_Chosen__3cVK7",
      ChosenBlur: "ResourcesTree_ChosenBlur__2uMjy",
      ChosenGreen: "ResourcesTree_ChosenGreen__1_oSl",
      IconsContainer: "ResourcesTree_IconsContainer__y_KXp",
      IconsContainerPage: "ResourcesTree_IconsContainerPage__1OwQJ",
      IconsContainerNotPage: "ResourcesTree_IconsContainerNotPage__1isHi",
      TreeContainer: "ResourcesTree_TreeContainer__1uytI",
      selectContainer: "ResourcesTree_selectContainer__JxR_e",
      Container: "ResourcesTree_Container__1Fntm"
    };
  },
  503: function (e, t, n) {
    "use strict";

    var r = n(32),
        a = n(36),
        i = n(34),
        o = n(33),
        l = n(35),
        s = n(140),
        c = n(0),
        u = n.n(c),
        d = n(26),
        p = (n(9), n(771)),
        m = n.n(p),
        h = n(564),
        f = n.n(h),
        b = (n(779), n(780), n(781), n(782), n(783), n(784), n(785), n(786), n(476)),
        g = n(787),
        v = n.n(g),
        _ = n(504);

    f.a.config.set("basePath", "/ace-builds/src-noconflict"), f.a.config.set("modePath", "/ace-builds/src-noconflict"), f.a.config.set("themePath", "/ace-builds/src-noconflict"), f.a.config.set("workerPath", "/ace-builds/src-noconflict");

    var y = function (e) {
      function t(e) {
        var n;
        return Object(r.a)(this, t), (n = Object(a.a)(this, Object(i.a)(t).call(this, e))).onChange = function (e) {
          n.props.checkUserRights(n.props.requiredRights) && (n.setState({
            value: e,
            updateValue: !1
          }), n.state.isBeatifying || setTimeout(function () {
            return n.props.handleChange(e, n.editor.getSelection().getCursor());
          }, 10));
        }, n.handleSelectProperty = function (e) {
          if (e) {
            var t;

            try {
              t = JSON.parse(n.state.value);
            } catch (a) {
              t = null;
            }

            if (t) {
              t[e.label] = e.value;
              var r = JSON.stringify(t);
              n.onChange(r);
            }

            n.makeCodePrettier();
          }
        }, n.makeCodePrettier = function () {
          setTimeout(function () {
            if (n.editor.moveCursorToPosition(n.props.elementCurrentCursor || {
              column: 0,
              row: 0
            }), !n.state.updateValue) {
              if (n.setState({
                isBeatifying: !0
              }), "json" === n.props.editorMode) {
                var e;

                try {
                  e = JSON.parse(n.state.value);
                } catch (a) {
                  e = null;
                }

                e && n.setState({
                  value: JSON.stringify(e, null, "\t"),
                  updateValue: !1
                });
              } else if ("css" === n.props.editorMode) {
                var t = Object(g.css)(n.state.value);
                n.setState({
                  value: t
                });
              } else if ("javascript" === n.props.editorMode) {
                var r = v()(n.state.value);
                n.setState({
                  value: r
                });
              }

              n.setState({
                isBeatifying: !1
              });
            }
          }, 10);
        }, n.state = {
          value: "",
          updateValue: !1,
          isBeatifying: !1
        }, n.onChange = n.onChange.bind(Object(s.a)(Object(s.a)(n))), n;
      }

      return Object(l.a)(t, e), Object(o.a)(t, [{
        key: "componentDidUpdate",
        value: function (e, t) {
          var n = this.props;
          !1 === t.updateValue && !0 === this.state.updateValue || (n.currentElement !== e.currentElement || n.currentResource !== e.currentResource || this.state.updateValue || n.editorMode !== e.editorMode) && (n.currentElement ? (this.setState({
            value: n.elementValue,
            updateValue: !1
          }), this.makeCodePrettier()) : this.setState({
            value: "",
            updateValue: !1
          }));
        }
      }, {
        key: "componentDidMount",
        value: function () {
          var e = this;
          this.editor = this.refs.aceEditor.editor, setInterval(function () {
            e.editor.resize();
          }, 1e3), this.setState({
            value: this.props.elementValue,
            updateValue: !1
          }), this.makeCodePrettier();
        }
      }]), Object(o.a)(t, [{
        key: "render",
        value: function () {
          return u.a.createElement(u.a.Fragment, null, this.props.suggestOptions ? u.a.createElement("div", null, u.a.createElement(_.a, {
            placeholder: "Possible properties",
            onChange: this.handleSelectProperty,
            options: this.props.suggestOptions,
            isSearchable: !0,
            requiredRights: this.props.requiredRights
          })) : null, u.a.createElement(m.a, {
            ref: "aceEditor",
            value: this.state.value,
            mode: this.props.editorMode,
            readOnly: this.props.readOnly,
            theme: "github",
            onChange: this.onChange,
            name: this.props.name,
            fontSize: 14,
            showPrintMargin: !0,
            showGutter: !0,
            highlightActiveLine: !0,
            style: {
              flex: "1",
              width: "auto",
              height: "auto"
            },
            placeholder: "Put your code here",
            setOptions: {
              enableBasicAutocompletion: "text" !== this.props.editorMode,
              enableLiveAutocompletion: "text" !== this.props.editorMode,
              enableSnippets: "text" !== this.props.editorMode,
              showLineNumbers: "text" !== this.props.editorMode,
              tabSize: 2,
              useWorker: !1
            }
          }));
        }
      }]), t;
    }(c.Component);

    t.a = Object(d.b)(null, function (e, t) {
      return {
        checkUserRights: function (t) {
          return e(Object(b.a)(t));
        }
      };
    }, null, {
      forwardRef: !0
    })(y);
  },
  504: function (e, t, n) {
    "use strict";

    var r = n(1),
        a = n(0),
        i = n.n(a),
        o = n(1028),
        l = n(26),
        s = n(789),
        c = n.n(s),
        u = n(476),
        d = function (e) {
      var t = {
        menu: function (e, t) {
          return Object(r.a)({}, e, {
            width: "100%",
            top: "auto",
            zIndex: "100000",
            margin: "0px"
          });
        },
        selectContainer: function (e) {
          return Object(r.a)({}, e, {
            width: "200px",
            top: "auto"
          });
        },
        clearIndicator: function (e) {
          return Object(r.a)({}, e, {
            padding: "0px"
          });
        },
        dropdownIndicator: function (e) {
          return Object(r.a)({}, e, {
            padding: "0px 5px"
          });
        },
        control: function (e) {
          return Object(r.a)({}, e, {
            minHeight: "auto"
          });
        }
      };
      return i.a.createElement("div", {
        className: c.a.Div
      }, e.title, i.a.createElement(o.a, {
        styles: t,
        value: e.options[e.default] || 0,
        isClearable: e.isClearable,
        isSearchable: e.isSearchable,
        onChange: function (t) {
          e.checkUserRights(e.requiredRights || []) && e.onChange(t);
        },
        options: e.options,
        placeholder: e.placeholder
      }));
    };

    d.defaultProps = {
      default: 0
    };
    t.a = Object(l.b)(null, function (e) {
      return {
        checkUserRights: function (t) {
          return e(Object(u.a)(t));
        }
      };
    })(d);
  },
  512: function (e, t, n) {
    "use strict";

    function r() {
      return (r = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];

          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }

        return e;
      }).apply(this, arguments);
    }

    function a(e, t) {
      if (null == e) return {};

      var n,
          r,
          a = function (e, t) {
        if (null == e) return {};
        var n,
            r,
            a = {},
            i = Object.keys(e);

        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (a[n] = e[n]);

        return a;
      }(e, t);

      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);

        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n]);
      }

      return a;
    }

    function i(e, t) {
      return !!e.children && "function" !== typeof e.children && e.children.some(function (e) {
        return e === t || i(e, t);
      });
    }

    function o(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e;
    }

    function l(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {},
            r = Object.keys(n);
        "function" === typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
          return Object.getOwnPropertyDescriptor(n, e).enumerable;
        }))), r.forEach(function (t) {
          o(e, t, n[t]);
        });
      }

      return e;
    }

    function s(e) {
      return function (e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];

          return n;
        }
      }(e) || function (e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
      }(e) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }();
    }

    n.d(t, "a", function () {
      return r;
    }), n.d(t, "c", function () {
      return a;
    }), n.d(t, "e", function () {
      return i;
    }), n.d(t, "b", function () {
      return l;
    }), n.d(t, "d", function () {
      return s;
    });
  },
  513: function (e, t, n) {
    "use strict";

    var r = n(0),
        a = n.n(r),
        i = n(26);
    t.a = Object(i.b)(function (e) {
      return {
        sizeIsChanging: e.sizeIsChanging
      };
    })(function (e) {
      return e.sizeIsChanging ? a.a.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          opacity: "0",
          position: "absolute"
        }
      }) : null;
    });
  },
  522: function (e, t, n) {
    "use strict";

    var r = n(1),
        a = n(83),
        i = n(0),
        o = n.n(i),
        l = n(758),
        s = n.n(l),
        c = n(762),
        u = n.n(c),
        d = Object(i.forwardRef)(function (e, t) {
      var n = Object(i.useRef)(null),
          l = Object(i.useState)({
        active: !1,
        value: e.value,
        startValue: e.value
      }),
          c = Object(a.a)(l, 2),
          d = c[0],
          p = c[1];
      Object(i.useEffect)(function () {
        p(Object(r.a)({}, d, {
          value: e.value,
          startValue: e.value
        }));
      }, [e.value]);
      var m = e.blur,
          h = e.focus,
          f = e.maxLength,
          b = e.maxWidth,
          g = e.value,
          v = e.withState;
      return o.a.createElement("div", {
        className: u.a.InspectorDiv
      }, e.readonly ? o.a.createElement("span", e.value && e.maxLength && e.value.length > e.maxLength ? {
        title: e.value
      } : {}, e.maxLength ? e.value ? e.value.substr(0, e.maxLength) + (e.value.length > e.maxLength ? "..." : "") : "" : e.value) : o.a.createElement(s.a, {
        ref: n,
        items: e.items || [],
        value: e.withState ? d.value : e.value,
        onChange: function (t, n) {
          p(Object(r.a)({}, d, {
            value: n
          })), e.changed && e.changed(n);
        },
        onSelect: function (e) {
          p(Object(r.a)({}, d, {
            value: e,
            active: !1
          })), setTimeout(function () {
            n.current && n.current.blur();
          }, 50);
        },
        shouldItemRender: function (e, t) {
          return -1 !== e.name.toLowerCase().indexOf(t.toLowerCase()) || -1 !== e.abbr.toLowerCase().indexOf(t.toLowerCase());
        },
        getItemValue: function (e) {
          return e.name;
        },
        renderItem: function (e, t) {
          return o.a.createElement("div", {
            className: t ? u.a.ItemHighlighted : null,
            key: e.abbr
          }, e.name);
        },
        renderMenu: function (e, t, n) {
          return o.a.createElement("div", {
            style: {
              zIndex: 1e3,
              position: "absolute",
              background: "white",
              border: "1px solid #ccc",
              color: "#333",
              maxHeight: "100px",
              overflow: "auto"
            },
            children: e
          });
        },
        renderInput: function (e, n) {
          var a = f,
              i = b,
              l = v ? d.value : g;
          return o.a.createElement(o.a.Fragment, null, o.a.createElement("span", {
            ref: t,
            className: u.a.Span,
            style: i ? {
              maxWidth: i
            } : {},
            onClick: function () {
              return p(Object(r.a)({}, d, {
                active: !0
              }));
            },
            onFocus: function () {
              return p(Object(r.a)({}, d, {
                active: !0
              }));
            }
          }, d.active ? l : a ? l ? l.substr(0, a) + (l.length > a ? "..." : "") : "" : l), o.a.createElement("input", Object.assign({}, l && a && l.length > a ? {
            title: l
          } : {}, e, {
            onBlur: function (t) {
              e.onBlur(t), m && m(t.target.value), p(Object(r.a)({}, d, {
                active: !1
              }));
            },
            onFocus: function (t) {
              e.onBlur(t), p(Object(r.a)({}, d, {
                active: !0
              })), h && h();
            },
            onMouseDown: function (e) {
              p(Object(r.a)({}, d, {
                active: !0
              })), h && h();
            },
            className: d.active ? u.a.Input : [u.a.Input, u.a.InputHidden].join(" "),
            style: i ? {
              maxWidth: i
            } : {},
            value: d.active ? l : a ? l ? l.substr(0, a) + (l.length > a ? "..." : "") : "" : l,
            onKeyDown: function (e) {
              (e.ctrlKey && "z" === e.key || e.ctrlKey && "Z" === e.key) && e.preventDefault();
            }
          })));
        }
      }));
    });
    t.a = d;
  },
  531: function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return l;
    });

    var r = n(2),
        a = n(1),
        i = n(28),
        o = n.n(i),
        l = function (e, t, n) {
      return function e(t, i) {
        t.forEach(function (t) {
          n.push(Object(a.a)({}, o()(t, ["children", "resourceDraft", "currentResource", "mode", "pluginsStructure"]), {
            path: i
          })), t.children && e(t.children, [].concat(Object(r.a)(i), [t.id]));
        });
      }(e, t), n;
    };
  },
  533: function (e, t, n) {
    e.exports = {
      OlContainer: "Properties_OlContainer__363Ba",
      reactTabs: "Properties_reactTabs__1n7Tw",
      reactTabsTabPanelSelected: "Properties_reactTabsTabPanelSelected__2YQhG",
      reactTabsTab: "Properties_reactTabsTab__3p2jn"
    };
  },
  560: function (e, t, n) {
    e.exports = {
      rst__virtualScrollOverride: "FilesTree_rst__virtualScrollOverride__2zPfB",
      ReactVirtualized__Grid__innerScrollContainer: "FilesTree_ReactVirtualized__Grid__innerScrollContainer__2-QLv",
      rst__rtl: "FilesTree_rst__rtl__1QaYg",
      ReactVirtualized__Grid: "FilesTree_ReactVirtualized__Grid__3WCin",
      rst__node: "FilesTree_rst__node__1BucA",
      rst__nodeContent: "FilesTree_rst__nodeContent__1Vx6z",
      rst__lineBlock: "FilesTree_rst__lineBlock__1OVDj",
      rst__absoluteLineBlock: "FilesTree_rst__absoluteLineBlock__1fWbt",
      rst__lineHalfHorizontalRight: "FilesTree_rst__lineHalfHorizontalRight__1FhFf",
      rst__lineFullVertical: "FilesTree_rst__lineFullVertical__106ef",
      rst__lineHalfVerticalTop: "FilesTree_rst__lineHalfVerticalTop__FaSdr",
      rst__lineHalfVerticalBottom: "FilesTree_rst__lineHalfVerticalBottom__3laM4",
      rst__highlightLineVertical: "FilesTree_rst__highlightLineVertical__2xmkt",
      "arrow-pulse": "FilesTree_arrow-pulse__3c9kW",
      rst__highlightTopLeftCorner: "FilesTree_rst__highlightTopLeftCorner__3u96X",
      rst__highlightBottomLeftCorner: "FilesTree_rst__highlightBottomLeftCorner__2LBb-",
      rst__rowWrapper: "FilesTree_rst__rowWrapper__TmlBB",
      rst__row: "FilesTree_rst__row__24I9P",
      rst__rowLandingPad: "FilesTree_rst__rowLandingPad__M7Wwz",
      rst__rowCancelPad: "FilesTree_rst__rowCancelPad__1DWvZ",
      rst__rowSearchMatch: "FilesTree_rst__rowSearchMatch__1R5P3",
      rst__rowSearchFocus: "FilesTree_rst__rowSearchFocus__3OcV2",
      rst__rowContents: "FilesTree_rst__rowContents__2rb0J",
      rst__rowLabel: "FilesTree_rst__rowLabel__10aF-",
      rst__rowToolbar: "FilesTree_rst__rowToolbar__3Sjn5",
      rst__moveHandle: "FilesTree_rst__moveHandle__38v10",
      rst__toolbarButton: "FilesTree_rst__toolbarButton__18Yni",
      rst__rowContentsDragDisabled: "FilesTree_rst__rowContentsDragDisabled__3-a2-",
      rst__loadingHandle: "FilesTree_rst__loadingHandle__DCv7X",
      rst__loadingCircle: "FilesTree_rst__loadingCircle__2y-qD",
      rst__loadingCirclePoint: "FilesTree_rst__loadingCirclePoint__1n-qD",
      pointFade: "FilesTree_pointFade__TOZ39",
      rst__rowTitle: "FilesTree_rst__rowTitle__2lYvX",
      rst__rowTitleWithSubtitle: "FilesTree_rst__rowTitleWithSubtitle__HF5HY",
      rst__rowSubtitle: "FilesTree_rst__rowSubtitle__2Izrt",
      rst__collapseButton: "FilesTree_rst__collapseButton__3FVF4",
      rst__expandButton: "FilesTree_rst__expandButton__3onDk",
      rst__lineChildren: "FilesTree_rst__lineChildren__iWpjl",
      rst__placeholder: "FilesTree_rst__placeholder__2KUYk",
      rst__placeholderLandingPad: "FilesTree_rst__placeholderLandingPad__1LIQQ",
      rst__placeholderCancelPad: "FilesTree_rst__placeholderCancelPad__3DIur",
      ReactVirtualized__Table__headerRow: "FilesTree_ReactVirtualized__Table__headerRow__3uzao",
      ReactVirtualized__Table__row: "FilesTree_ReactVirtualized__Table__row__Dtl9p",
      ReactVirtualized__Table__headerTruncatedText: "FilesTree_ReactVirtualized__Table__headerTruncatedText__1g898",
      ReactVirtualized__Table__headerColumn: "FilesTree_ReactVirtualized__Table__headerColumn__3SyZJ",
      ReactVirtualized__Table__rowColumn: "FilesTree_ReactVirtualized__Table__rowColumn__2gE7G",
      ReactVirtualized__Table__sortableHeaderColumn: "FilesTree_ReactVirtualized__Table__sortableHeaderColumn__2UPA4",
      ReactVirtualized__Table__sortableHeaderIconContainer: "FilesTree_ReactVirtualized__Table__sortableHeaderIconContainer__1uSen",
      ReactVirtualized__Table__sortableHeaderIcon: "FilesTree_ReactVirtualized__Table__sortableHeaderIcon__3VS1O",
      Hovered: "FilesTree_Hovered__3IUxY",
      Chosen: "FilesTree_Chosen__3K2so",
      ChosenBlur: "FilesTree_ChosenBlur__24Xw9",
      IconsContainer: "FilesTree_IconsContainer__13Ho9",
      IconsContainerPage: "FilesTree_IconsContainerPage__2QiHO",
      IconsContainerNotPage: "FilesTree_IconsContainerNotPage__1X9uD",
      TreeContainer: "FilesTree_TreeContainer__3BKcR",
      selectContainer: "FilesTree_selectContainer__21DWs",
      Container: "FilesTree_Container__yyHP0",
      ImageContainer: "FilesTree_ImageContainer__2xrj2",
      ImageInput: "FilesTree_ImageInput__3Sm6j"
    };
  },
  562: function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return s;
    });

    var r = n(1),
        a = n(0),
        i = n.n(a),
        o = n(769),
        l = n(483),
        s = function (e) {
      return i.a.createElement("div", {
        className: o.Container
      }, i.a.createElement("input", {
        className: o.Input,
        type: "text",
        onChange: function (t) {
          return function (e, t, n) {
            t(Object(r.a)({}, e, {
              searchString: n.target.value
            }));
          }(e.state, e.setState, t);
        }
      }), i.a.createElement("div", {
        className: o.Label
      }, e.state.searchFoundCount ? e.state.searchFocusIndex + 1 : 0, "/", e.state.searchFoundCount), i.a.createElement(l.b, {
        inline: !0,
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>',
        buttonClicked: function () {
          return function (e, t) {
            var n = e.searchFocusIndex,
                a = e.searchFoundCount;
            t(Object(r.a)({}, e, {
              searchFocusIndex: null !== a ? null !== n ? (a + n - 1) % a : a - 1 : null
            }));
          }(e.state, e.setState);
        },
        tooltip: "Search previous"
      }), i.a.createElement(l.b, {
        inline: !0,
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>',
        buttonClicked: function () {
          return function (e, t) {
            var n = e.searchFocusIndex,
                a = e.searchFoundCount;
            t(Object(r.a)({}, e, {
              searchFocusIndex: null !== a ? null !== n ? (n + 1) % a : 0 : null
            }));
          }(e.state, e.setState);
        },
        tooltip: "Search next"
      }), i.a.createElement(l.b, {
        inline: !0,
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>',
        buttonClicked: function () {
          return e.setState(Object(r.a)({}, e.state, {
            searchOpen: !1,
            searchString: ""
          }));
        },
        tooltip: "Close"
      }));
    };
  },
  567: function (e, t, n) {
    "use strict";

    (function (e) {
      var r = n(83),
          a = n(1),
          i = n(0),
          o = n.n(i),
          l = n(60),
          s = n(26),
          c = n(515),
          u = n(9),
          d = n(495),
          p = n(531),
          m = n(1027),
          h = n(562),
          f = n(812),
          b = n(813),
          g = n(23),
          v = n.n(g),
          _ = n(28),
          y = n.n(_),
          C = n(476),
          S = n(5),
          E = n(814),
          w = n(513),
          O = n(121),
          M = n(815),
          x = n(568);

      t.a = Object(s.b)(function (e, t) {
        var n = {},
            r = !0,
            a = !1,
            i = void 0;

        try {
          for (var o, s = e.mD.pluginsStructure[Symbol.iterator](); !(r = (o = s.next()).done); r = !0) {
            var c = o.value,
                u = Object(l.c)(c.id, e.resourcesObjects);
            n[c.id] = u ? u.structure : [];
          }
        } catch (b) {
          a = !0, i = b;
        } finally {
          try {
            r || null == s.return || s.return();
          } finally {
            if (a) throw i;
          }
        }

        var d = e.mD[S.b[t.mode]] ? e.mD[S.b[t.mode]].structure : null,
            p = e.mD[S.a[t.mode]],
            m = e.mD.pluginsStructure,
            h = Object(f.a)(d, p, n, m, t.mode, e.mD[S.c[t.mode]]);
        return {
          hoveredElementId: -100,
          findMode: e.findMode,
          fromFrame: e.fromFrame,
          currentResource: p,
          resourceDraftStructure: d,
          pluginsStructure: m,
          pluginElementsStructures: n,
          structureWithPluginChildren: h,
          currentBox: e.mD[S.b[t.mode]].currentBox
        };
      }, function (e, t) {
        return {
          saveElementsStructure: function (t, n, r) {
            return e(u.E(t, n, r));
          },
          checkUserRights: function (t) {
            return e(Object(C.a)(t));
          },
          setActiveContainer: function (t) {
            return e(u.K(t));
          },
          unsetActiveContainer: function (t) {
            return e(u.R(t));
          },
          copyBox: function (t, n) {
            return e(u.n(t, !1, n));
          },
          cutBox: function (t, n) {
            return e(u.n(t, !0, n));
          },
          pasteBox: function (t, n) {
            return e(u.A(t, n));
          },
          addBox: function (t, n) {
            return e(u.a(t, n));
          },
          duplicateBox: function (t, n) {
            return e(u.t(t, n));
          },
          mergeBoxToPlugin: function (t, n) {
            return e(u.y(t, n));
          },
          dissolvePluginToBox: function (t) {
            return e(u.s(t));
          },
          deleteBox: function (t, n) {
            return e(u.o(t, n));
          },
          toggleFindMode: function (t) {
            return e(u.P(t));
          },
          markShouldRefreshing: function (t) {
            return e(u.x(t));
          }
        };
      })(Object(i.memo)(function (t) {
        var n = t.resourceDraftStructure,
            s = t.structureWithPluginChildren;
        if (!n) return null;
        var u = Object(l.a)(s.map(function (e) {
          return Object(a.a)({}, e, {
            itemPath: e.path,
            mode: t.mode
          });
        })),
            f = Object(i.useState)({
          searchString: "",
          searchFocusIndex: 0,
          searchFoundCount: null,
          searchStringHasBeenCleared: !0,
          searchOpen: !1
        }),
            g = Object(r.a)(f, 2),
            _ = g[0],
            C = g[1];
        Object(i.useEffect)(function () {
          Object(b.c)(t, _, C);
        }, [t.hoveredElementId, t.findMode]);
        var S = Object(i.useState)(t.structureWithPluginChildren.map(function (e) {
          return e.id;
        })),
            P = Object(r.a)(S, 2),
            T = P[0],
            j = P[1];
        Object(i.useEffect)(function () {
          var e = t.structureWithPluginChildren.map(function (e) {
            return e.id;
          });
          v()(e, T) || (t.saveElementsStructure(t.mode, t.structureWithPluginChildren, t.resourceDraftStructure), j(e));
        }, [t.structureWithPluginChildren]);

        var V = Object(O.a)(t),
            I = Object(M.a)(t, V),
            D = function (e) {
          if ("blur" === e) t.unsetActiveContainer(t.mode + "elements");else if (t.setActiveContainer(t.mode + "elements"), e) {
            var n = e.code;
            if (!t.checkUserRights(["developer"])) return;
            if ("page" === t.mode) switch (n) {
              case "KeyA":
                e.ctrlKey && (e.preventDefault(), t.addBox(t.mode, "page"));
                break;

              case "KeyD":
                e.ctrlKey && (e.preventDefault(), t.duplicateBox(t.mode, "page"));
                break;

              case "KeyF":
                e.ctrlKey && (e.preventDefault(), C(Object(a.a)({}, _, {
                  searchOpen: !_.searchOpen
                })));
                break;

              case "KeyR":
                e.ctrlKey && (e.preventDefault(), t.markShouldRefreshing(!0));
                break;

              case "KeyC":
                e.ctrlKey && (e.preventDefault(), t.copyBox(t.mode, "page"));
                break;

              case "KeyX":
                e.ctrlKey && (e.preventDefault(), t.cutBox(t.mode, "page"));
                break;

              case "KeyV":
                e.ctrlKey && (e.preventDefault(), t.pasteBox(t.mode, "page"));
                break;

              case "Delete":
                t.deleteBox(t.mode, "page");
            } else switch (n) {
              case "KeyA":
                e.ctrlKey && e.shiftKey && I.addInside ? (e.preventDefault(), t.addBox(t.mode, "inside")) : e.ctrlKey && I.addNext && (e.preventDefault(), t.addBox(t.mode));
                break;

              case "KeyQ":
                e.ctrlKey && I.addText && (e.preventDefault(), t.addBox(t.mode, "text"));
                break;

              case "KeyD":
                I.duplicate && (e.ctrlKey && e.shiftKey ? (e.preventDefault(), t.duplicateBox(t.mode, !0)) : e.ctrlKey && (e.preventDefault(), t.duplicateBox(t.mode)));
                break;

              case "KeyF":
                e.ctrlKey && (e.preventDefault(), C(Object(a.a)({}, _, {
                  searchOpen: !_.searchOpen
                })));
                break;

              case "KeyR":
                e.ctrlKey && (e.preventDefault(), t.markShouldRefreshing(!0));
                break;

              case "KeyC":
                e.ctrlKey && e.shiftKey ? (e.preventDefault(), t.copyBox(t.mode, !0)) : e.ctrlKey && (e.preventDefault(), t.copyBox(t.mode));
                break;

              case "KeyX":
                e.ctrlKey && e.shiftKey ? (e.preventDefault(), t.cutBox(t.mode, !0)) : e.ctrlKey && (e.preventDefault(), t.cutBox(t.mode));
                break;

              case "KeyV":
                e.ctrlKey && e.shiftKey ? (e.preventDefault(), t.pasteBox(t.mode, !0)) : e.ctrlKey && (e.preventDefault(), t.pasteBox(t.mode));
                break;

              case "Delete":
                I.delete && (e.preventDefault(), e.shiftKey ? t.deleteBox(t.mode, !0) : t.deleteBox(t.mode));
            }
          }
        };

        return o.a.createElement("div", {
          className: d.Container,
          tabIndex: "0",
          onKeyDown: function (e) {
            D(e.nativeEvent);
          },
          onMouseDown: function () {
            D();
          },
          onTouchStart: function () {
            D();
          },
          onFocus: function () {
            D();
          },
          onBlur: function () {
            D("blur");
          }
        }, o.a.createElement("div", null, o.a.createElement(E.a, {
          state: _,
          setState: C,
          mode: t.mode,
          addBox: t.addBox,
          duplicateBox: t.duplicateBox,
          mergeBoxToPlugin: t.mergeBoxToPlugin,
          dissolvePluginToBox: t.dissolvePluginToBox,
          deleteBox: t.deleteBox,
          toggleFindMode: t.toggleFindMode,
          markShouldRefreshing: t.markShouldRefreshing,
          buttonRules: I
        })), o.a.createElement("div", {
          className: d.TreeContainer
        }, o.a.createElement(c.a, {
          treeData: u,
          onChange: function (e) {
            var r = [];

            if (Object(p.a)(e, [], r), !v()(r, n)) {
              if (!v()(r.map(function (e) {
                return y()(e, ["expanded", "children", "itemPath"]);
              }), n.map(function (e) {
                return y()(e, ["expanded", "children", "itemPath"]);
              })) && !t.checkUserRights("page" === t.mode ? null : ["developer"])) return;
              t.saveElementsStructure(t.mode, r, n);
            }
          },
          nodeContentRenderer: m.a,
          canDrag: function (e) {
            var t = e.node;
            return "page" === t.mode ? !!t.isPropagatingItem : !("trash" === t.itemPath[0] && t.itemPath.length > 1) && t.itemPath.length > ("template" === t.mode && "element_02" !== t.itemPath[0] && "trash" !== t.itemPath[0] ? 1 : 0) && !t.childrenTo;
          },
          canDrop: function (e) {
            var t = e.node,
                n = e.nextParent,
                r = e.prevParent;
            if (!n) return !1;
            if (!n.itemPath) return !1;
            if ("page" === n.mode) return n.CMSVariableType && (n.CMSVariableType.indexOf("propagating_") >= 0 || "array" === n.CMSVariableType);
            if (n.text) return !1;
            if (n.isElementFromCMSVariable) return !1;
            if (n.isCMSVariable || "element_02" === n.id) return t.isCMSVariable;

            switch (n.itemPath[0]) {
              case "trash":
                return "trash" === n.id;

              case "element_02":
                return t.isCMSVariable;

              default:
                return !t.isCMSVariable && "element_02" !== r.itemPath[0] && !n.isChildren && !x.a.includes(n.tag) && !(Object(l.b)(n.tag.charAt(0)) && 0 !== n.itemPath.length && !n.forChildren) && ("template" !== n.mode || 0 !== n.itemPath.length);
            }
          },
          scaffoldBlockPxWidth: 22,
          rowHeight: 20,
          generateNodeProps: function (e) {
            return e.node, {
              mode: t.mode
            };
          },
          isVirtualized: !0,
          onMoveNode: function (t) {
            var n = t.node,
                r = t.treeIndex,
                a = t.path;
            return e.console.debug("node:", n, "treeIndex:", r, "path:", a);
          },
          searchQuery: _.searchString,
          searchFocusOffset: _.searchFocusIndex,
          searchFinishCallback: function (e) {
            C(Object(a.a)({}, _, {
              searchFoundCount: e.length,
              searchFocusIndex: e.length > 0 ? _.searchFocusIndex % e.length : 0
            }));
          },
          searchMethod: t.findMode ? b.b : b.a,
          style: {
            flex: "1 1",
            height: "auto !important",
            overflow: "auto"
          }
        })), _.searchOpen ? o.a.createElement(h.a, {
          state: _,
          setState: C
        }) : null, o.a.createElement(w.a, null));
      }, function (e, t) {
        return v()(e.pluginElementsStructures, t.pluginElementsStructures) && v()(e.structureWithPluginChildren, t.structureWithPluginChildren) && v()(e.currentResource, t.currentResource) && v()(e.currentBox, t.currentBox);
      }));
    }).call(this, n(19));
  },
  568: function (e, t, n) {
    "use strict";

    n.d(t, "a", function () {
      return r;
    }), n.d(t, "b", function () {
      return a;
    });
    var r = ["websiterMenu", "parseHTML", "websiterGallery"],
        a = {
      websiterMenu: [{
        tag: "Overflow icon",
        id: "overflowIcon"
      }, {
        tag: "Expand icon",
        id: "expandIcon"
      }],
      websiterGallery: []
    };
  },
  569: function (e, t, n) {
    "use strict";

    (function (e) {
      var r = n(17),
          a = n(2),
          i = n(1),
          o = n(83),
          l = n(0),
          s = n.n(l),
          c = n(26),
          u = n(515),
          d = n(505),
          p = n(13),
          m = n.n(p),
          h = n(495),
          f = n(489),
          b = n(531),
          g = n(818),
          v = n(60),
          _ = n(492),
          y = n(503),
          C = n(483),
          S = n(513);

      t.a = Object(c.b)(function (e) {
        return {
          barSizes: e.barSizes,
          pagesStructure: e.mD.pagesStructure,
          templatesStructure: e.mD.templatesStructure
        };
      })(function (t) {
        var n = Object(l.useState)({
          treeDataSource: []
        }),
            c = Object(o.a)(n, 2),
            p = c[0],
            E = c[1];
        Object(l.useEffect)(function () {
          var e = [{
            path: [],
            all: !1,
            id: "link",
            generatedFrom: "link",
            sourceItem: !0,
            name: "Link",
            properties: {},
            propertiesString: ""
          }, {
            path: [],
            all: !0,
            id: "all",
            generatedFrom: "all",
            sourceItem: !0,
            name: "All pages"
          }];
          "page" === t.mode || t.element.isCMSVariable || e.push({
            path: [],
            all: !1,
            id: "variable",
            generatedFrom: "variable",
            sourceItem: !0,
            name: "Variable",
            properties: {}
          }), t.pagesStructure.forEach(function (t) {
            e.push(Object(i.a)({}, t, {
              sourceItem: !0,
              all: !1,
              id: t.id,
              generatedFrom: t.id,
              path: ["all"].concat(Object(a.a)(t.path))
            })), e.push({
              path: ["all"].concat(Object(a.a)(t.path), [t.id]),
              all: !0,
              id: t.id + "_all",
              generatedFrom: t.id,
              sourceItem: !0,
              name: "All in " + t.name
            });
          });
          var n = Object(v.a)(e).filter(function (e) {
            return !e.generalSettings;
          }).map(function (e) {
            return Object(i.a)({}, e, {
              type: t.mode
            });
          });
          E(Object(i.a)({}, p, {
            treeDataSource: n
          }));
        }, [t.pagesStructure, t.templatesStructure]);
        var w = t.elementValues[t.attrName] || [];
        w = w.map(function (e) {
          return Object(i.a)({}, e, {
            type: t.mode
          });
        });
        var O = Object(v.a)(w),
            M = t.elementValues.currentMenuItem && t.elementValues[t.attrName] ? t.elementValues[t.attrName].find(function (e) {
          return e.id === t.elementValues.currentMenuItem;
        }) : null;
        return t.element && t.elementValues ? s.a.createElement("div", {
          className: f.Content
        }, s.a.createElement("div", {
          className: f.Container,
          style: {
            flex: "0 0 " + (t.barSizes.width3 || 50) + "px"
          }
        }, s.a.createElement("div", null, s.a.createElement(C.b, {
          inline: !0,
          buttonClicked: function () {
            if (t.elementValues.currentMenuItem) {
              var e = t.elementValues[t.attrName].filter(function (e) {
                return e.id !== t.elementValues.currentMenuItem;
              });
              t.changeProperty(t.attrName, e);
            }
          },
          icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>',
          tooltip: "Delete menu item",
          requiredRights: "page" === t.mode ? ["content"] : ["developer"]
        })), s.a.createElement("div", {
          className: h.TreeContainer
        }, 0 === O.length ? s.a.createElement("div", {
          style: {
            position: "absolute",
            border: "1px dashed #777",
            left: "20px",
            padding: "4px"
          }
        }, "Drop menu items here") : null, s.a.createElement(u.a, {
          onChange: function (e) {
            var n,
                a = m()(e),
                i = function e(t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                if (r.sourceItem) return r;
                if (r.children.length > 0) return e(r.children);
              }
            }(a),
                o = null;

            i && (i.children = [], i.id = "item_" + (t.elementValues.currentMenuId || 0), i.sourceItem = !1, o = t.elementValues.currentMenuId ? t.elementValues.currentMenuId + 1 : 1);
            var l = [];
            Object(b.a)(a, [], l);
            var s = (n = {}, Object(r.a)(n, t.attrName, l), Object(r.a)(n, "currentMenuId", -1), n);
            o && (s.currentMenuId = o), t.changeProperty(s, "");
          },
          treeData: O,
          nodeContentRenderer: g.a,
          generateNodeProps: function (e) {
            return {
              className: e.node.id === t.elementValues.currentMenuItem ? [h.Chosen] : null
            };
          },
          isVirtualized: !0,
          onMoveNode: function (t) {
            var n = t.node,
                r = t.treeIndex,
                a = t.path;
            e.console.debug("node:", n, "treeIndex:", r, "path:", a);
          },
          rowHeight: 20,
          scaffoldBlockPxWidth: 22,
          className: h.Tree,
          dndType: t.attrName,
          canDrop: function (e) {
            var t = e.nextParent;
            return !t || "variable" !== t.generatedFrom && !t.all;
          },
          style: {
            flex: "1 1",
            height: "auto !important",
            overflow: "auto"
          }
        }), s.a.createElement(S.a, null)), s.a.createElement(_.a, {
          addClass: f.widthControll,
          startValue: t.barSizes.width3 || 50,
          type: "width3"
        })), s.a.createElement("div", {
          className: f.LastContainer
        }, s.a.createElement(d.d, {
          className: ["react-tabs", f.reactTabs, h.MenuItemsTabs].join(" ")
        }, s.a.createElement(d.b, null, s.a.createElement(d.a, {
          className: ["react-tabs__tab", f.reactTabsTab].join(" ")
        }, "Source elements"), M ? s.a.createElement(d.a, {
          className: ["react-tabs__tab", f.reactTabsTab].join(" ")
        }, "Item properties") : null), s.a.createElement(d.c, {
          selectedClassName: ["react-tabs__tab-panel--selected", f.reactTabsTabPanelSelected].join(" ")
        }, s.a.createElement(u.a, {
          treeData: p.treeDataSource,
          nodeContentRenderer: g.a,
          isVirtualized: !0,
          onMoveNode: function (t) {
            var n = t.node,
                r = t.treeIndex,
                a = t.path;
            return e.console.debug("node:", n, "treeIndex:", r, "path:", a);
          },
          rowHeight: 20,
          scaffoldBlockPxWidth: 22,
          canDrop: function () {
            return !1;
          },
          shouldCopyOnOutsideDrop: !0,
          dndType: t.attrName,
          onChange: function (e) {
            return E(Object(i.a)({}, p, {
              treeDataSource: e
            }));
          },
          style: {
            flex: "1 1",
            height: "auto !important",
            overflow: "auto"
          }
        }), s.a.createElement(S.a, null)), M ? s.a.createElement(d.c, {
          selectedClassName: ["react-tabs__tab-panel--selected", f.reactTabsTabPanelSelected].join(" ")
        }, s.a.createElement(y.a, {
          currentElement: t.elementValues.currentMenuItem,
          elementValue: M.propertiesString,
          elementCurrentCursor: t.elementValues.cursorPosition,
          editorMode: "json",
          handleChange: function (e, n) {
            if (e && t.elementValues.currentMenuItem) {
              var r;

              try {
                r = JSON.parse(e);
              } catch (i) {
                r = null;
              }

              var a = t.elementValues[t.attrName].map(function (n) {
                if (n.id === t.elementValues.currentMenuItem) {
                  var a = m()(n);
                  return a.propertiesString = e, r && (a.properties = r), a;
                }

                return n;
              });
              t.changeProperty(t.attrName, a, n);
            }
          },
          name: "editorMenuItems"
        })) : null))) : null;
      });
    }).call(this, n(19));
  },
  619: function (e, t, n) {
    e.exports = {
      Button: "SmallButton_Button__2auv6",
      ButtonDisabled: "SmallButton_ButtonDisabled__8lcil",
      Inline: "SmallButton_Inline__2j7Md",
      Table: "SmallButton_Table__1QigA",
      Cell: "SmallButton_Cell__1cD_6",
      Svg: "SmallButton_Svg__3X4Wp",
      Tooltip: "SmallButton_Tooltip__3GG4i"
    };
  },
  631: function (e, t, n) {},
  645: function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.FrameContextConsumer = t.FrameContextProvider = t.FrameContext = void 0;
    var r,
        a = n(0),
        i = (r = a) && r.__esModule ? r : {
      default: r
    };
    var o = void 0,
        l = void 0;
    "undefined" !== typeof document && (o = document), "undefined" !== typeof window && (l = window);
    var s = t.FrameContext = i.default.createContext({
      document: o,
      window: l
    }),
        c = s.Provider,
        u = s.Consumer;
    t.FrameContextProvider = c, t.FrameContextConsumer = u;
  },
  676: function (e, t, n) {
    e.exports = {
      SectionHeight: "SizeDragController_SectionHeight__2xHTI",
      InnerDiv: "SizeDragController_InnerDiv__3XbGX",
      touchDrag: "SizeDragController_touchDrag__32PQq"
    };
  },
  762: function (e, t, n) {
    e.exports = {
      InspectorDiv: "InspectorValue_InspectorDiv__3NoW1",
      Input: "InspectorValue_Input__3jg9o",
      InputHidden: "InspectorValue_InputHidden__20aPX",
      Span: "InspectorValue_Span__2r1SY",
      ItemHighlighted: "InspectorValue_ItemHighlighted__10tLg",
      DropDown: "InspectorValue_DropDown__12yME"
    };
  },
  769: function (e, t, n) {
    e.exports = {
      Container: "TreeSearch_Container__gqL_q",
      Input: "TreeSearch_Input__1fDdy",
      Label: "TreeSearch_Label__1_Jf9"
    };
  },
  770: function (e, t, n) {
    e.exports = {
      OlContainer: "FileProperties_OlContainer__2xDLP",
      reactTabs: "FileProperties_reactTabs__3V4aV",
      reactTabsTabPanelSelected: "FileProperties_reactTabsTabPanelSelected__930iU",
      reactTabsTab: "FileProperties_reactTabsTab__3TJSy"
    };
  },
  789: function (e, t, n) {
    e.exports = {
      Div: "Select_Div__3ogAU",
      Input: "Select_Input__1mnhJ",
      StyleControls: "Select_StyleControls__3ci3w"
    };
  },
  806: function (e, t) {},
  807: function (e, t) {},
  808: function (e, t) {},
  811: function (e, t, n) {
    e.exports = {
      Div: "ValueInput_Div__3mmk4",
      Inline: "ValueInput_Inline__3bZyM",
      Input: "ValueInput_Input__1deA2",
      StyleControls: "ValueInput_StyleControls__dkx5_"
    };
  },
  812: function (e, t, n) {
    "use strict";

    var r = n(1),
        a = n(2),
        i = n(60),
        o = n(568);

    t.a = function (e, t, n, l, s, c) {
      var u = [],
          d = [],
          p = !0,
          m = !1,
          h = void 0;

      try {
        for (var f, b = function () {
          var c = f.value;

          if (c.childrenTo || d.includes(c.id) || u.push(c), Object(i.b)(c.tag.charAt(0))) {
            var p = l.find(function (e) {
              return e.name === c.tag;
            });

            if (p) {
              var m = n[p.id];

              if (m) {
                var h = m.filter(function (e) {
                  return e.isChildren;
                }),
                    b = e.filter(function (e) {
                  return e.path.includes(c.id);
                });
                d = [].concat(Object(a.a)(d), Object(a.a)(b.map(function (e) {
                  return e.id;
                })));

                var g = !0,
                    v = !1,
                    _ = void 0;

                try {
                  for (var y, C = function () {
                    var e = y.value,
                        n = b.find(function (t) {
                      return t.childrenTo === e.id;
                    });
                    if (n) u = [].concat(Object(a.a)(u), [Object(r.a)({}, n, {
                      tag: "Children for ".concat(e.tag)
                    })], Object(a.a)(b.filter(function (e) {
                      return e.path.includes(n.id);
                    })));else {
                      var i = {
                        id: "".concat(c.id, "_forPlugin_").concat(p.id, "_childrenTo_").concat(e.id),
                        childrenTo: e.id,
                        forPlugin: p.id,
                        sourcePlugin: "plugin" === s ? t : "",
                        path: [].concat(Object(a.a)(c.path), [c.id]),
                        text: !1,
                        isChildren: !1,
                        forChildren: !0,
                        tag: "Children for ".concat(e.tag)
                      };
                      u.push(i);
                    }
                  }, S = h[Symbol.iterator](); !(g = (y = S.next()).done); g = !0) C();
                } catch (V) {
                  v = !0, _ = V;
                } finally {
                  try {
                    g || null == S.return || S.return();
                  } finally {
                    if (v) throw _;
                  }
                }
              }
            }
          } else if (o.a.includes(c.tag)) {
            var E = o.b[c.tag] || [],
                w = e.filter(function (e) {
              return e.path.includes(c.id);
            });
            d = [].concat(Object(a.a)(d), Object(a.a)(w.map(function (e) {
              return e.id;
            })));
            var O = !0,
                M = !1,
                x = void 0;

            try {
              for (var P, T = function () {
                var e = P.value,
                    n = w.find(function (t) {
                  return t.childrenTo === e.id && t.forModule === c.id;
                });
                if (n) u = [].concat(Object(a.a)(u), [Object(r.a)({}, n, {
                  tag: e.tag
                })], Object(a.a)(w.filter(function (e) {
                  return e.path.includes(n.id);
                })));else {
                  var i = {
                    id: "".concat(c.id, "_childrenTo_").concat(e.id),
                    childrenTo: e.id,
                    forModule: c.id,
                    sourcePlugin: "plugin" === s ? t : "",
                    path: [].concat(Object(a.a)(c.path), [c.id]),
                    text: !1,
                    isChildren: !1,
                    forChildren: !0,
                    tag: e.tag
                  };
                  u.push(i);
                }
              }, j = E[Symbol.iterator](); !(O = (P = j.next()).done); O = !0) T();
            } catch (V) {
              M = !0, x = V;
            } finally {
              try {
                O || null == j.return || j.return();
              } finally {
                if (M) throw x;
              }
            }
          }
        }, g = e[Symbol.iterator](); !(p = (f = g.next()).done); p = !0) b();
      } catch (v) {
        m = !0, h = v;
      } finally {
        try {
          p || null == g.return || g.return();
        } finally {
          if (m) throw h;
        }
      }

      return "plugin" === s && (c.propagating ? u.find(function (e) {
        return "element_02" === e.id;
      }) || u.unshift({
        id: "element_02",
        path: [],
        text: !1,
        isChildren: !1,
        forChildren: !1,
        tag: "CMS variables"
      }) : u = u.filter(function (e) {
        return !("element_02" === e.id || e.path.length > 0 && "element_02" === e.path[0]);
      })), u;
    };
  },
  813: function (e, t, n) {
    "use strict";

    n.d(t, "c", function () {
      return a;
    }), n.d(t, "a", function () {
      return i;
    }), n.d(t, "b", function () {
      return o;
    });

    var r = n(1),
        a = function (e, t, n) {
      e.findMode && e.fromFrame ? n(Object(r.a)({}, t, {
        searchString: e.hoveredElementId || "",
        searchStringHasBeenCleared: !1
      })) : t.searchStringHasBeenCleared || n(Object(r.a)({}, t, {
        searchString: "",
        searchStringHasBeenCleared: !0
      }));
    },
        i = function (e) {
      var t = e.node,
          n = (e.path, e.treeIndex, e.searchQuery);
      return !!n && (t.tag.indexOf(n) > -1 || !!(t.properties.id && t.properties.id.indexOf(n) > -1) || !!(t.properties.class && t.properties.class.indexOf(n) > -1) || void 0);
    },
        o = function (e) {
      var t = e.node,
          n = (e.path, e.treeIndex, e.searchQuery);
      return !!n && (t.id.indexOf(n) > -1 || void 0);
    };
  },
  814: function (e, t, n) {
    "use strict";

    var r = n(1),
        a = n(0),
        i = n.n(a),
        o = (n(9), n(483));
    t.a = Object(a.memo)(function (e) {
      return i.a.createElement(i.a.Fragment, null, "page" !== e.mode ? i.a.createElement(i.a.Fragment, null, e.buttonRules.addNext ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.addBox(e.mode);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>',
        tooltip: "Add a new element next to the chosen element (Ctrl + A)",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.addNext && e.buttonRules.addFromCMSVariable ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.addBox(e.mode, "cmsVariable");
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>',
        tooltip: "Add a new element from CMS variable",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.addInside ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.addBox(e.mode, "inside");
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M21.6,13.4H13.4v8.2H10.6V13.4H2.4V10.6h8.2V2.4h2.8v8.2h8.2Zm-2.4,2.8h-.1l-.9.9,1.5,1.4H16.2V15.1H15.1v4.4h4.6l-1.5,1.4.9.9,2.6-2.7h.1Z"></path></svg>',
        tooltip: "Add a new element inside the chosen element (Ctrl + Shift + A)",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.addChildren ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.addBox(e.mode, "children");
        },
        title: "Children",
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>',
        tooltip: "Add a new inherited children",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.addText ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.addBox(e.mode, "text");
        },
        title: "Text",
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M21.6,13.4H13.4v8.2H10.7V13.4H2.4V10.7h8.2V2.4h2.7v8.2h8.2v2.8Zm0,1.7H15.1v2h2.2v4.7h2.2V17.1h2.2v-2Z"></path></svg>',
        tooltip: "Add a new text element (Ctrl + Q)",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.duplicate ? i.a.createElement(i.a.Fragment, null, i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.duplicateBox(e.mode);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>',
        tooltip: "Duplicate the element without children elements (Ctrl + D)",
        requiredRights: ["developer"]
      }), i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.duplicateBox(e.mode, !0);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M4,3C3,3,2.3,3.8,2.3,4.8v14.4C2.3,20.2,3,21,4,21h10.6c1,0,1.8-0.8,1.8-1.8V8.4L11.3,3H4z M10.4,9.3v-5l4.8,5H10.4z   M17.8,15.9h4V21h-4V15.9z M17.8,9.4h4v5.2h-4V9.4z M21.8,3v5.1h-4V3H21.8z"></path></svg>',
        tooltip: "Duplicate the element with children elements (Ctrl + Shift + D)",
        requiredRights: ["developer"]
      })) : null, e.buttonRules.mergeToPlugin ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.mergeBoxToPlugin(e.mode);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M14,2H10V5H7l5,5,5-5H14ZM2,14H5v3l5-5L5,7v3H2Zm12-2,5,5V14h3V10H19V7ZM10,22h4V19h3l-5-5L7,19h3Z"></path></svg>',
        tooltip: "Merge element and children elements into a new plugin",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.mergeToPluginChildren && "page" !== e.mode ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.mergeBoxToPlugin(e.mode, !0);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M11.4,4.1H8.6V6.3H6.5L10,9.8l3.5-3.5H11.4ZM2.2,13.4H4.3v2.1l3.6-3.6L4.3,8.4v2.1H2.2Zm9.9-1.5,3.6,3.6V13.4h2.1V10.5H15.7V8.4ZM8.6,19.7h2.8V17.6h2.1L10,14.1,6.5,17.6H8.6Zm9.2-3.8h4V21h-4Zm0-6.5h3.9v5.1H17.8Zm0-6.4h4V8.1h-4Z"></path></svg>',
        tooltip: "Merge children elements into a new plugin",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.dissolve ? i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.dissolvePluginToBox(e.mode);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M10,9h4V6h3L12,1,7,6h3Zm5,5h3v3l5-5L18,7v3H15ZM1,12l5,5V14H9V10H6V7Zm13,3H10v3H7l5,5,5-5H14Z"></path></svg>',
        tooltip: "Dissolve the plugin into elements",
        requiredRights: ["developer"]
      }) : null, e.buttonRules.delete ? i.a.createElement(i.a.Fragment, null, i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.deleteBox(e.mode);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>',
        tooltip: "Delete element without children.<br>All children will remain on the page (Delete)",
        requiredRights: ["developer"]
      }), i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.deleteBox(e.mode, !0);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M11.8,3h-5l-1,1H2.3v2h14V4h-3.5L11.8,3z M3.3,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7h-12C3.3,7,3.3,19,3.3,19z M17.8,3  v5.1h4V3H17.8z M17.8,21h4v-5.1h-4V21z M17.8,14.6h4V9.4h-4V14.6z"></path></svg>',
        tooltip: "Delete element with all children inside (Shift + Delete)",
        requiredRights: ["developer"]
      })) : null) : null, i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.setState(Object(r.a)({}, e.state, {
            searchOpen: !e.state.searchOpen
          }));
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>',
        tooltip: "Show or hide search (Ctrl + F)"
      }), i.a.createElement(o.b, {
        inline: !0,
        buttonClicked: function () {
          return e.markShouldRefreshing(!0);
        },
        icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg>',
        tooltip: "Reload page (Ctrl + R)"
      }));
    });
  },
  815: function (e, t, n) {
    "use strict";

    t.a = function (e, t) {
      if ("trash" === t) return {};
      var n = {};
      return "isCMSVariable" !== t && "isElementFromCMSVariable" !== t && "CMSRoute" !== t && "isFromPropagatingPlugin" !== t && (n.addText = !0), "CMSRoute" !== t && "isFromPropagatingPlugin" !== t && (n.addFromCMSVariable = !0), ["childrenTo", "isElementFromCMSVariable", "isFromPropagatingPlugin", "headBody", "html"].includes(t) || (n.addNext = !0), "plugin" === e.mode && (n.addChildren = !0), "plugin" !== t && "children" !== t && "isElementFromCMSVariable" !== t && "text" !== t && (n.addInside = !0), "element" !== t && "text" !== t && "plugin" !== t && "children" !== t || (n.duplicate = !0), "element" !== t && "text" !== t || (n.mergeToPlugin = !0), "element" !== t && "headBody" !== t || (n.mergeToPluginChildren = !0), "plugin" === t && (n.dissolve = !0), "element" !== t && "plugin" !== t && "children" !== t && "isCMSVariable" !== t && "text" !== t || (n.delete = !0), n;
    };
  },
  816: function (e, t, n) {
    e.exports = {
      Textarea: "TextProperty_Textarea__2wNAE",
      Editors: "TextProperty_Editors__3uGEn",
      SelectContainer: "TextProperty_SelectContainer__zyD1_"
    };
  },
  817: function (e, t, n) {
    e.exports = {
      Textarea: "ParseProperty_Textarea__3tqLc",
      Editors: "ParseProperty_Editors__3-_wF",
      SelectContainer: "ParseProperty_SelectContainer__1uKK3"
    };
  },
  818: function (e, t, n) {
    "use strict";

    var r = n(0),
        a = n.n(r),
        i = n(26),
        o = n(9),
        l = n(495),
        s = n(522),
        c = n(512),
        u = n(40);
    t.a = Object(i.b)(function (e) {
      return {
        userId: e.userId,
        resourcesObjects: e.resourcesObjects
      };
    }, function (e, t) {
      return {
        changeBoxPropertyInValues: function (t, n) {
          return e(o.h(t, "currentMenuItem", n, !0));
        },
        changeMenuItemProperty: function (t, n, r, a) {
          return e(o.i(t, n, r, a));
        }
      };
    })(function (e) {
      var t,
          n = e,
          r = n.scaffoldBlockPxWidth,
          i = n.toggleChildrenVisibility,
          o = n.connectDragPreview,
          d = n.connectDragSource,
          p = n.isDragging,
          m = n.canDrop,
          h = n.canDrag,
          f = n.node,
          b = n.draggedNode,
          g = n.path,
          v = n.treeIndex,
          _ = n.isSearchMatch,
          y = n.isSearchFocus,
          C = n.className,
          S = n.style,
          E = n.didDrop,
          w = Object(c.c)(n, ["scaffoldBlockPxWidth", "toggleChildrenVisibility", "connectDragPreview", "connectDragSource", "isDragging", "canDrop", "canDrag", "node", "title", "subtitle", "draggedNode", "path", "treeIndex", "isSearchMatch", "isSearchFocus", "buttons", "className", "style", "didDrop", "treeId", "isOver", "parentNode", "currentPage", "currentPlugin", "resourcesObjects", "chooseMenuItem", "changeMenuItemProperty", "isSub", "name", "id", "sourceItem", "type", "generatedFrom", "rowDirection", "currentTemplate"]);
      h && (t = "function" === typeof f.children && f.expanded ? a.a.createElement("div", {
        className: l.rst__loadingHandle
      }, a.a.createElement("div", {
        className: l.rst__loadingCircle
      }, Object(c.d)(new Array(12)).map(function (e, t) {
        return a.a.createElement("div", {
          key: t,
          className: l.rst__loadingCirclePoint
        });
      }), ")}")) : d(a.a.createElement("div", {
        className: l.rst__moveHandle
      }, a.a.createElement("i", {
        className: "material-icons"
      }, "more_vert"))));
      var O = !E && p,
          M = b && Object(c.e)(b, f),
          x = {
        left: -.5 * r
      },
          P = e.node,
          T = P.name,
          j = P.id,
          V = P.sourceItem,
          I = P.type,
          D = P.generatedFrom,
          R = [l.rst__row];
      return O && R.push(l.rst__rowLandingPad), O && !m && R.push(l.rst__rowCancelPad), _ && R.push(l.rst__rowSearchMatch), y && R.push(l.rst__rowSearchFocus), O || R.push(C), a.a.createElement("div", Object.assign({}, Object(c.a)({
        style: {
          height: "100%"
        }
      }, w), {
        onMouseDown: function () {
          return e.changeBoxPropertyInValues(I, j);
        }
      }), i && f.children && (f.children.length > 0 || "function" === typeof f.children) && a.a.createElement("div", {
        onMouseDown: function (e) {
          return e.stopPropagation();
        }
      }, a.a.createElement("button", {
        type: "button",
        "aria-label": f.expanded ? "Collapse" : "Expand",
        className: f.expanded ? l.rst__collapseButton : l.rst__expandButton,
        style: x,
        onClick: function () {
          return i({
            node: f,
            path: g,
            treeIndex: v
          });
        }
      }), f.expanded && !p && a.a.createElement("div", {
        style: {
          width: r
        },
        className: l.rst__lineChildren
      })), a.a.createElement("div", {
        className: l.rst__rowWrapper
      }, o(a.a.createElement("div", {
        className: R.join(" "),
        style: Object(c.b)({
          opacity: M ? .5 : 1
        }, S)
      }, t, a.a.createElement("div", {
        className: h ? l.rst__rowContents : [l.rst__rowContents, l.rst__rowContentsDragDisabled].join(" ")
      }, a.a.createElement("div", {
        className: l.rst__rowLabel
      }, V ? T : a.a.createElement(s.a, {
        value: T,
        blur: function (t) {
          return e.changeMenuItemProperty(I, "name", t, j);
        },
        withState: !0,
        maxLength: "40",
        maxWidth: "220px"
      })), a.a.createElement("div", {
        className: [l.IconsContainer, "page" === e.type ? l.IconsContainerPage : l.IconsContainerNotPage].join(" ")
      }, a.a.createElement("div", null, "link" === D ? a.a.createElement(u.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg>'
      }) : "variable" === D ? a.a.createElement(u.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></svg>'
      }) : a.a.createElement(u.a, {
        icon: '<svg width="17" height="17" viewBox="0 0 24 24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></svg>'
      }))))))));
    });
  },
  902: function (e, t, n) {
    "use strict";

    (function (e) {
      var r = n(0),
          a = n.n(r),
          i = n(515),
          o = n(26),
          l = n(495),
          s = n(483),
          c = n(903),
          u = n(50),
          d = n(23),
          p = n.n(d),
          m = n(513);
      t.a = Object(o.b)(function (e) {
        return {
          treeData: e.mD.websites.map(function (t) {
            return {
              name: e.resourcesObjects[t.id] ? e.resourcesObjects[t.id].name : "Loading...",
              id: t.id,
              children: {}
            };
          }),
          currentWebsiteId: e.mD.currentWebsiteId
        };
      }, function (e) {
        return {
          addWebsite: function () {
            return e(u.c());
          },
          deleteWebsite: function () {
            return e(u.g());
          }
        };
      })(Object(r.memo)(function (t) {
        return a.a.createElement(a.a.Fragment, null, a.a.createElement("div", null, a.a.createElement(s.b, {
          inline: !0,
          buttonClicked: function () {
            return t.addWebsite();
          },
          icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>',
          tooltip: "Add a new website"
        }), a.a.createElement(s.b, {
          inline: !0,
          buttonClicked: function () {
            return t.deleteWebsite();
          },
          icon: '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>',
          tooltip: "Delete website.<br>This action can not be reverted."
        })), a.a.createElement("div", {
          className: l.TreeContainer
        }, a.a.createElement(i.a, {
          treeData: t.treeData,
          onChange: function () {},
          nodeContentRenderer: c.a,
          canDrop: function () {
            return !1;
          },
          canDrag: function () {
            return !1;
          },
          generateNodeProps: function (e) {
            return {
              className: e.node.id === t.currentWebsiteId ? [l.Chosen] : null
            };
          },
          isVirtualized: !t.notVirtual,
          onMoveNode: function (t) {
            var n = t.node,
                r = t.treeIndex,
                a = t.path;
            return e.console.debug("node:", n, "treeIndex:", r, "path:", a);
          },
          scaffoldBlockPxWidth: 22,
          rowHeight: 20,
          style: {
            flex: "1 1",
            height: "auto !important",
            overflow: "auto"
          }
        }), a.a.createElement(m.a, null)));
      }, function (e, t) {
        return p()(e.treeData, t.treeData) && e.currentWebsiteId === t.currentWebsiteId;
      }));
    }).call(this, n(19));
  },
  903: function (e, t, n) {
    "use strict";

    var r = n(0),
        a = n.n(r),
        i = n(26),
        o = n(9),
        l = n(904),
        s = n(522),
        c = n(512),
        u = n(476),
        d = n(50);
    t.a = Object(i.b)(function (e) {
      return {
        resourcesObjects: e.resourcesObjects,
        userId: e.userId
      };
    }, function (e) {
      return {
        chooseWebsite: function (t) {
          return e(o.m(t));
        },
        checkUserRights: function (t) {
          return e(Object(u.a)(t));
        }
      };
    })(function (e) {
      var t = e,
          n = t.connectDragPreview,
          r = t.className,
          i = t.style,
          o = e.node,
          u = o.name,
          p = o.id,
          m = [l.rst__row, r];
      return a.a.createElement("div", Object.assign({}, Object(c.a)({
        style: {
          height: "100%"
        }
      }), {
        onMouseDown: function () {
          e.chooseWebsite(p);
        },
        "data-testid": u
      }), a.a.createElement("div", {
        className: l.rst__rowWrapper
      }, n(a.a.createElement("div", {
        className: m.join(" "),
        style: Object(c.b)({
          opacity: 1
        }, i)
      }, a.a.createElement("div", {
        className: [l.rst__rowContents, l.rst__rowContentsDragDisabled].join(" ")
      }, a.a.createElement("div", {
        className: l.rst__rowLabel
      }, a.a.createElement(s.a, {
        value: u,
        items: [],
        blur: function (t) {
          e.checkUserRights(["owner"]) && t !== u && d.d("name", t, p);
        },
        withState: !0,
        maxLength: "30",
        maxWidth: "220px"
      })))))));
    });
  },
  904: function (e, t, n) {
    e.exports = {
      rst__virtualScrollOverride: "WebsitesTree_rst__virtualScrollOverride__3zbIC",
      ReactVirtualized__Grid__innerScrollContainer: "WebsitesTree_ReactVirtualized__Grid__innerScrollContainer__2P6dm",
      rst__rtl: "WebsitesTree_rst__rtl__3iVcx",
      ReactVirtualized__Grid: "WebsitesTree_ReactVirtualized__Grid__1cJYw",
      rst__node: "WebsitesTree_rst__node__3jU7p",
      rst__nodeContent: "WebsitesTree_rst__nodeContent__29s16",
      rst__lineBlock: "WebsitesTree_rst__lineBlock__1_T2J",
      rst__absoluteLineBlock: "WebsitesTree_rst__absoluteLineBlock__4gyz3",
      rst__lineHalfHorizontalRight: "WebsitesTree_rst__lineHalfHorizontalRight__1IMJ8",
      rst__lineFullVertical: "WebsitesTree_rst__lineFullVertical__1OWaW",
      rst__lineHalfVerticalTop: "WebsitesTree_rst__lineHalfVerticalTop__39jCq",
      rst__lineHalfVerticalBottom: "WebsitesTree_rst__lineHalfVerticalBottom__2qsPL",
      rst__highlightLineVertical: "WebsitesTree_rst__highlightLineVertical__2DrSL",
      "arrow-pulse": "WebsitesTree_arrow-pulse__3fbyg",
      rst__highlightTopLeftCorner: "WebsitesTree_rst__highlightTopLeftCorner__1VjlE",
      rst__highlightBottomLeftCorner: "WebsitesTree_rst__highlightBottomLeftCorner__8cL4Q",
      rst__rowWrapper: "WebsitesTree_rst__rowWrapper__3N8x9",
      rst__row: "WebsitesTree_rst__row__sOpMM",
      rst__rowLandingPad: "WebsitesTree_rst__rowLandingPad__8iBh_",
      rst__rowCancelPad: "WebsitesTree_rst__rowCancelPad__168WQ",
      rst__rowSearchMatch: "WebsitesTree_rst__rowSearchMatch__3tvfk",
      rst__rowSearchFocus: "WebsitesTree_rst__rowSearchFocus__i0tQK",
      rst__rowContents: "WebsitesTree_rst__rowContents__2gjT5",
      rst__rowLabel: "WebsitesTree_rst__rowLabel__2vqlv",
      rst__rowToolbar: "WebsitesTree_rst__rowToolbar__1ywUi",
      rst__moveHandle: "WebsitesTree_rst__moveHandle__ZTCAp",
      rst__toolbarButton: "WebsitesTree_rst__toolbarButton__1WSvf",
      rst__rowContentsDragDisabled: "WebsitesTree_rst__rowContentsDragDisabled__UefNT",
      rst__loadingHandle: "WebsitesTree_rst__loadingHandle__3Nd3-",
      rst__loadingCircle: "WebsitesTree_rst__loadingCircle__2N8ti",
      rst__loadingCirclePoint: "WebsitesTree_rst__loadingCirclePoint__2UkRf",
      pointFade: "WebsitesTree_pointFade__3_7pL",
      rst__rowTitle: "WebsitesTree_rst__rowTitle__3cKTG",
      rst__rowTitleWithSubtitle: "WebsitesTree_rst__rowTitleWithSubtitle__1PmlO",
      rst__rowSubtitle: "WebsitesTree_rst__rowSubtitle__3UVA_",
      rst__collapseButton: "WebsitesTree_rst__collapseButton__33uiF",
      rst__expandButton: "WebsitesTree_rst__expandButton__1Xkuw",
      rst__lineChildren: "WebsitesTree_rst__lineChildren__2vODD",
      rst__placeholder: "WebsitesTree_rst__placeholder__2LIHl",
      rst__placeholderLandingPad: "WebsitesTree_rst__placeholderLandingPad__1pKvB",
      rst__placeholderCancelPad: "WebsitesTree_rst__placeholderCancelPad__3-6r7",
      ReactVirtualized__Table__headerRow: "WebsitesTree_ReactVirtualized__Table__headerRow__29v2k",
      ReactVirtualized__Table__row: "WebsitesTree_ReactVirtualized__Table__row__1YT8P",
      ReactVirtualized__Table__headerTruncatedText: "WebsitesTree_ReactVirtualized__Table__headerTruncatedText__3M-mT",
      ReactVirtualized__Table__headerColumn: "WebsitesTree_ReactVirtualized__Table__headerColumn__VGmzH",
      ReactVirtualized__Table__rowColumn: "WebsitesTree_ReactVirtualized__Table__rowColumn__3lTTO",
      ReactVirtualized__Table__sortableHeaderColumn: "WebsitesTree_ReactVirtualized__Table__sortableHeaderColumn__2q3-M",
      ReactVirtualized__Table__sortableHeaderIconContainer: "WebsitesTree_ReactVirtualized__Table__sortableHeaderIconContainer__UrZlv",
      ReactVirtualized__Table__sortableHeaderIcon: "WebsitesTree_ReactVirtualized__Table__sortableHeaderIcon__X_qVi",
      Chosen: "WebsitesTree_Chosen__4l8J5",
      Loaded: "WebsitesTree_Loaded__3Jl7q"
    };
  },
  905: function (e, t, n) {
    e.exports = {
      Span: "DomainsProperties_Span__2bgyT",
      Input: "DomainsProperties_Input__1sfvF",
      Button: "DomainsProperties_Button__1eWcl",
      LocalDomain: "DomainsProperties_LocalDomain__2LikX",
      Title: "DomainsProperties_Title__1O_-V"
    };
  },
  906: function (e, t, n) {
    e.exports = {
      Div: "TextInput_Div__1cUnp",
      Input: "TextInput_Input__iGsIp",
      StyleControls: "TextInput_StyleControls__2aGfC",
      Wrong: "TextInput_Wrong__2kJTR",
      Inline: "TextInput_Inline__3BzMb",
      Right: "TextInput_Right__3iZqV"
    };
  },
  907: function (e, t, n) {
    e.exports = {
      Span: "SharingProperties_Span__2_cvY",
      Input: "SharingProperties_Input__t_zUN",
      Button: "SharingProperties_Button__9sYGP",
      LocalDomain: "SharingProperties_LocalDomain__GHfyW",
      Title: "SharingProperties_Title__2OTNF",
      SharingTable: "SharingProperties_SharingTable__3D-F0",
      Active: "SharingProperties_Active__1jgt1",
      Ava: "SharingProperties_Ava__3tBDp"
    };
  },
  916: function (e, t, n) {
    e.exports = {
      Content: "SiteBuilder_Content__1Cixl",
      Overlay: "SiteBuilder_Overlay__Ed0dz"
    };
  },
  917: function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.FrameContextConsumer = t.FrameContext = void 0;
    var r = n(645);
    Object.defineProperty(t, "FrameContext", {
      enumerable: !0,
      get: function () {
        return r.FrameContext;
      }
    }), Object.defineProperty(t, "FrameContextConsumer", {
      enumerable: !0,
      get: function () {
        return r.FrameContextConsumer;
      }
    });
    var a,
        i = n(918),
        o = (a = i) && a.__esModule ? a : {
      default: a
    };
    t.default = o.default;
  },
  918: function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var r = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }

      return e;
    },
        a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        i = n(0),
        o = d(i),
        l = d(n(124)),
        s = d(n(3)),
        c = n(645),
        u = d(n(919));

    function d(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var p = function (e) {
      function t(e, n) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t);

        var r = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));

        return r.handleLoad = function () {
          r.forceUpdate();
        }, r._isMounted = !1, r;
      }

      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, i.Component), a(t, [{
        key: "componentDidMount",
        value: function () {
          this._isMounted = !0;
          var e = this.getDoc();
          e && "complete" === e.readyState ? this.forceUpdate() : this.node.addEventListener("load", this.handleLoad);
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          this._isMounted = !1, this.node.removeEventListener("load", this.handleLoad);
        }
      }, {
        key: "getDoc",
        value: function () {
          return this.node.contentDocument;
        }
      }, {
        key: "getMountTarget",
        value: function () {
          var e = this.getDoc();
          return this.props.mountTarget ? e.querySelector(this.props.mountTarget) : e.body;
        }
      }, {
        key: "getMountTargetHtml",
        value: function () {
          var e = this.getDoc();
          return this.props.mountTarget ? e.querySelector(this.props.mountTarget) : e.documentElement;
        }
      }, {
        key: "renderFrameContents",
        value: function () {
          if (!this._isMounted) return null;
          var e = this.getDoc(),
              t = this.props.contentDidMount,
              n = this.props.contentDidUpdate,
              r = e.defaultView || e.parentView;
          this.props.updateHead && (this._setInitialContent = !1);
          var a = !this._setInitialContent,
              i = o.default.createElement(u.default, {
            contentDidMount: t,
            contentDidUpdate: n
          }, o.default.createElement(c.FrameContextProvider, {
            value: {
              document: e,
              window: r
            }
          }, this.props.children));
          a && (e.open("text/html", "replace"), e.write("<!DOCTYPE html><html><head>" + this.props.base + "</head><body></body></html>"), e.close(), this._setInitialContent = !0), e.head.innerHTML = function (e) {
            var t = document.createElement("textarea");
            return t.innerHTML = e, t.value;
          }(this.props.initialContent) + this.props.base;
          var s = this.getMountTarget();

          for (var d in this.props.bodyProps) s.setAttribute(d, this.props.bodyProps[d]);

          var p = this.getMountTargetHtml();

          for (var m in this.props.htmlProps) p.setAttribute(m, this.props.htmlProps[m]);

          return [l.default.createPortal(i, s)];
        }
      }, {
        key: "render",
        value: function () {
          var e = this,
              t = r({}, this.props, {
            children: void 0
          });
          return delete t.head, delete t.initialContent, delete t.mountTarget, delete t.contentDidMount, delete t.contentDidUpdate, delete t.bodyProps, delete t.htmlProps, delete t.base, o.default.createElement("iframe", r({}, t, {
            ref: function (t) {
              e.node = t;
            }
          }), this.renderFrameContents());
        }
      }]), t;
    }();

    p.propTypes = {
      style: s.default.object,
      head: s.default.node,
      base: s.default.string,
      bodyProps: s.default.object,
      htmlProps: s.default.object,
      initialContent: s.default.string,
      mountTarget: s.default.string,
      contentDidMount: s.default.func,
      contentDidUpdate: s.default.func,
      children: s.default.oneOfType([s.default.element, s.default.arrayOf(s.default.element)])
    }, p.defaultProps = {
      style: {},
      base: "",
      head: null,
      bodyProps: {},
      htmlProps: {},
      children: void 0,
      mountTarget: void 0,
      contentDidMount: function () {},
      contentDidUpdate: function () {},
      initialContent: "<!DOCTYPE html><html><head></head><body></body></html>"
    }, t.default = p;
  },
  919: function (e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    });

    var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = n(0),
        i = (o(a), o(n(3)));

    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }

    var l = function (e) {
      function t() {
        return function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t), function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
      }

      return function (e, t) {
        if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, a.Component), r(t, [{
        key: "componentDidMount",
        value: function () {
          this.props.contentDidMount();
        }
      }, {
        key: "componentDidUpdate",
        value: function () {
          this.props.contentDidUpdate();
        }
      }, {
        key: "render",
        value: function () {
          return a.Children.only(this.props.children);
        }
      }]), t;
    }();

    l.propTypes = {
      children: i.default.element.isRequired,
      contentDidMount: i.default.func.isRequired,
      contentDidUpdate: i.default.func.isRequired
    }, t.default = l;
  },
  973: function (e, t) {},
  984: function (e, t) {},
  985: function (e, t) {},
  986: function (e, t) {}
}]);