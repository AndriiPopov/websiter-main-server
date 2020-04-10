"use strict";

(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
  121: function (e, t, r) {
    "use strict";

    var n = r(60);

    t.a = function (e, t, r, i) {
      var u;
      return e && (t = e.resourceDraftStructure.find(function (t) {
        return t.id === e.currentBox;
      }), r = e.mode), t ? "page" === r ? u = t.CMSVariableType && t.CMSVariableType.indexOf("propagating_") >= 0 ? "isFromPropagatingPlugin" : "isElementFromCMSVariable" : (u = 0 !== t.path.length || i ? 1 !== t.path.length || i || "plugin" === r ? Object(n.b)(t.tag.charAt(0)) ? "plugin" : t.text ? "text" : "element" : "headBody" : "trash" === t.id ? "trash" : "element_02" === t.id ? "CMSRoute" : "html", t.isChildren && (u = "children"), t.childrenTo && (u = "childrenTo"), t.isCMSVariable && (u = "isCMSVariable"), t.isElementFromCMSVariable && (u = t.CMSVariableType.indexOf("propagating_") >= 0 ? "isFromPropagatingPlugin" : "isElementFromCMSVariable")) : u = "none", u;
    };
  },
  122: function (e, t, r) {
    e.exports = {
      Button: "LoginButton_Button__2dj44",
      Success: "LoginButton_Success__21MoZ",
      Danger: "LoginButton_Danger__2V7Lr"
    };
  },
  123: function (e, t, r) {
    e.exports = {
      Auth: "Auth_Auth__3LJcp",
      Form: "Auth_Form__2cblE",
      Title: "Auth_Title__akRbA",
      Subtitle: "Auth_Subtitle__2ymfd",
      ActionBlock: "Auth_ActionBlock__3jKGi",
      Middle: "Auth_Middle__J8yom",
      RememberForgot: "Auth_RememberForgot__vAgsm",
      ForgotPassword: "Auth_ForgotPassword__2P2hF",
      Link: "Auth_Link__1O5md",
      RememberMe: "Auth_RememberMe__3xI2n",
      RememberMeLabel: "Auth_RememberMeLabel__2SEKu",
      Container: "Auth_Container__KMvOh",
      socialButtons: "Auth_socialButtons__37I7_"
    };
  },
  133: function (e, t, r) {
    "use strict";

    var n = r(0),
        i = r.n(n),
        u = r(49),
        a = r.n(u),
        c = r(40);

    t.a = function (e) {
      return i.a.createElement("div", {
        className: e.inline ? [a.a.Div, a.a.Inline].join(" ") : a.a.Div,
        style: e.style
      }, i.a.createElement("label", null, i.a.createElement("input", {
        "data-testid": e.datatestid,
        type: e.radio ? "radio" : "checkbox",
        className: a.a.Input,
        checked: e.checked || !1,
        onChange: function (t) {
          return e.onChange(t.target.checked);
        }
      }), e.icon ? i.a.createElement(c.a, {
        icon: e.icon,
        className: a.a.Svg
      }) : null, e.title, e.children));
    };
  },
  228: function (e, t, r) {
    "use strict";

    r.r(t);
    var n = r(0),
        i = r.n(n),
        u = r(124),
        a = r.n(u),
        c = r(468),
        s = r(26),
        o = r(18),
        d = r(46),
        l = r(8),
        f = r.n(l),
        p = r(1),
        b = r(128),
        h = r.n(b),
        m = "redux-throttle/CANCEL",
        g = "redux-throttle/FLUSH";

    function v(e, t, r) {
      if (t.payload && t.payload.type) {
        var n = t.payload.type;
        return Array.isArray(n) || (n = [n]), void Object.keys(e).filter(function (e) {
          return n.includes(e);
        }).forEach(function (t) {
          return e[t][r]();
        });
      }

      Object.keys(e).forEach(function (t) {
        return e[t][r]();
      });
    }

    r(256);

    var O = r(32),
        _ = r(33),
        y = r(36),
        S = r(34),
        I = r(35),
        j = r(469),
        E = r(466),
        w = r(467),
        C = r(470),
        R = r(9),
        T = function (e) {
      function t() {
        return Object(O.a)(this, t), Object(y.a)(this, Object(S.a)(t).apply(this, arguments));
      }

      return Object(I.a)(t, e), Object(_.a)(t, [{
        key: "componentDidMount",
        value: function () {
          this.props.onLogout();
        }
      }, {
        key: "render",
        value: function () {
          return i.a.createElement(w.a, {
            to: "/login"
          });
        }
      }]), t;
    }(n.Component),
        D = Object(s.b)(null, function (e) {
      return {
        onLogout: function () {
          return e(R.v());
        }
      };
    })(T),
        x = function (e) {
      return function (t) {
        function r() {
          var e, t;
          Object(O.a)(this, r);

          for (var n = arguments.length, i = new Array(n), u = 0; u < n; u++) i[u] = arguments[u];

          return (t = Object(y.a)(this, (e = Object(S.a)(r)).call.apply(e, [this].concat(i)))).state = {
            component: null
          }, t;
        }

        return Object(I.a)(r, t), Object(_.a)(r, [{
          key: "componentDidMount",
          value: function () {
            var t = this;
            e().then(function (e) {
              t.setState({
                component: e.default
              });
            });
          }
        }, {
          key: "render",
          value: function () {
            var e = this.state.component;
            return e ? i.a.createElement(e, this.props) : i.a.createElement("div", null, "Loading...");
          }
        }]), r;
      }(n.Component);
    },
        A = r(83),
        N = r(133),
        M = r(81),
        P = r(122),
        k = r.n(P),
        W = function (e) {
      return i.a.createElement("button", {
        "data-testid": e.datatestid || "LoginButton",
        disabled: e.disabled,
        className: [k.a.Button, k.a[e.btnType]].join(" "),
        onClick: e.clicked
      }, e.children);
    },
        F = r(123),
        V = r.n(F),
        U = r(40),
        L = new M.a(),
        B = function (e) {
      var t = Object(n.useState)(!1),
          r = Object(A.a)(t, 2),
          u = r[0],
          a = r[1],
          c = Object(n.useState)(!1),
          s = Object(A.a)(c, 2),
          o = s[0],
          d = s[1];
      Object(n.useEffect)(function () {
        f();
      });
      var l = "?rememberme=false";
      u && (l = "?rememberme=true");

      var f = function () {
        L.get("cookies_consent") && d(!0);
      },
          p = "https://my.websiter.dev/api/auth/";

      return i.a.createElement("div", {
        className: V.a.Container
      }, o ? i.a.createElement(i.a.Fragment, null, i.a.createElement("h1", null, "Continue with:"), i.a.createElement("div", {
        className: V.a.socialButtons
      }, i.a.createElement("a", {
        href: p + "google/start".concat(l)
      }, i.a.createElement(U.a, {
        icon: '<svg width="50" height="50" viewBox="0 0 24 24"><path fill="#4285F4" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path></svg>'
      }), i.a.createElement("div", null, "GOOGLE")), i.a.createElement("a", {
        href: p + "facebook/start".concat(l)
      }, i.a.createElement(U.a, {
        icon: '<svg width="50" height="50" viewBox="0 0 24 24"><path fill="#1877F2" d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"></path></svg>'
      }), i.a.createElement("div", null, "FACEBOOK")), i.a.createElement("a", {
        href: p + "twitter/start".concat(l)
      }, i.a.createElement(U.a, {
        icon: '<svg width="50" height="50" viewBox="0 0 24 24"><path fill="#1DA1F2" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>'
      }), i.a.createElement("div", null, "TWITTER"))), i.a.createElement(N.a, {
        title: "Remember me",
        checked: u,
        onChange: function () {
          return a(!u);
        }
      })) : i.a.createElement(i.a.Fragment, null, i.a.createElement("div", null, "We use cookies only for login purposes. In order to proceed you need to agree with the use of cookies."), i.a.createElement(W, {
        btnType: "Success",
        clicked: function () {
          L.set("cookies_consent", "true", {
            path: "/",
            maxAge: 3153e4
          }), f();
        }
      }, "AGREE"), i.a.createElement(W, {
        btnType: "Danger",
        clicked: function () {
          window.open("https://websiter.dev", "_self");
        }
      }, "Return to the homepage")));
    },
        H = r(82),
        z = r.n(H),
        J = function (e) {
      return i.a.createElement(i.a.Fragment, null, e.cover ? i.a.createElement("div", {
        className: z.a.Cover,
        "data-testid": e.datatestid || "cover"
      }, i.a.createElement("div", {
        className: z.a.Loader
      }, "Loading...")) : i.a.createElement("div", {
        className: z.a.Loader
      }, "Loading..."));
    },
        G = (r(17), r(5)),
        q = r(13),
        K = r.n(q),
        Z = r(23),
        X = r.n(Z),
        $ = r(60),
        Q = r(28),
        Y = r.n(Q),
        ee = function (e, t) {
      return X()({
        structure: e.structure.map(function (e) {
          return Y()(e, ["expanded", "children", "itemPath", "itemIndex"]);
        }),
        values: e.values
      }, {
        structure: t.structure.map(function (e) {
          return Y()(e, ["expanded", "children", "itemPath", "itemIndex"]);
        }),
        values: t.values
      });
    },
        te = (r(96).create({
      objectHash: function (e) {
        return e.id;
      },
      propertyFilter: function (e, t) {
        return "__patch__" !== e;
      }
    }), function (e, t) {
      e.notSavedResources = e.notSavedResources.filter(function (e) {
        return e !== t._id;
      });
    }),
        re = function (e, t) {
      e.newVersionResources = e.newVersionResources.filter(function (e) {
        return e !== t._id;
      });
    },
        ne = r(212),
        ie = {
      resourcesObjects: {},
      error: null,
      loading: !1,
      domainNotOk: !1,
      customDomainNotOk: !1,
      maxStorage: 0,
      uploadingImage: !1,
      currentBoxInPlugin: "",
      currentImage: "",
      sizeIsChanging: !1,
      notSavedResources: [],
      newVersionResources: [],
      pageZoom: 100,
      hoveredElementId: null,
      hoveredElementSize: {},
      isRefreshing: !1,
      userId: null,
      barSizes: {
        height: 200,
        width: 400,
        width2: 200,
        width3: 200
      },
      findMode: null,
      hoverMode: "",
      fromFrame: !1,
      search: {},
      shouldRefresh: !1,
      tryWebsiter: !1,
      currentUserInWebsiteSharing: "",
      mD: {},
      activeContainer: "",
      clipboard: {}
    },
        ue = Object(ne.a)(ie, {
      REMOVE_RESOURCE_FROM_UNSAVED: function (e, t) {
        return te(e, t);
      },
      REMOVE_RESOURCE_FROM_NEW_VERSIONS: function (e, t) {
        return re(e, t);
      },
      ACTION_START_IMAGE_UPLOAD: function (e, t) {
        return function (e) {
          return Object(p.a)({}, e, {
            error: null,
            loading: !0
          });
        }(e);
      },
      ACTION_FAIL_IMAGE_UPLOAD: function (e, t) {
        return function (e, t) {
          return Object(p.a)({}, e, {
            error: t.error,
            loading: !1
          });
        }(e, t);
      },
      ACTION_SUCCESS_IMAGE_UPLOAD: function (e, t) {
        return function (e) {
          return Object(p.a)({}, e, {
            error: null,
            loading: !1
          });
        }(e);
      },
      CHOOSE_IMAGE: function (e, t) {
        return function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ie,
              t = arguments.length > 1 ? arguments[1] : void 0;
          e.currentImage = t.image;
        }(e, t);
      },
      SIZE_IS_CHANGING: function (e, t) {
        e.sizeIsChanging = t.isChanging;
      },
      ACTION_START: function (e, t) {
        e.error = null, e.pagesLoading = !0;
      },
      ACTION_FAIL: function (e, t) {
        e.error = t.error, e.pagesLoading = !1;
      },
      ACTION_SUCCESS: function (e, t) {
        e.error = null, e.pagesLoading = !1;
      },
      ADD_RESOURCE_VERSION: function (e, t) {
        return function (e, t) {
          var r = K()(t.globalSettings ? t.mD.globalSettingsPageObject : t.mD[G.d[t.resourceType]]);
          if (!X()(r.present, t.draft)) if (t.isNotForHistory) r.present = t.draft, e.resourcesObjects[r._id] = r;else {
            var n = Object(p.a)({}, t.draft);

            if (t.draft.structure && ["template", "plugin"].includes(t.resourceType)) {
              var i = [];
              t.draft.structure.forEach(function (e) {
                e.tag.length > 0 && e.path.length > 0 && (!Object($.b)(e.tag.charAt(0)) || e.childrenTo || e.isChildren || e.isElementFromCMSVariable || i.push({
                  name: e.tag,
                  type: "plugin"
                }));
              }), n.connectedResources = i;
            }

            var u = t.globalSettings ? t.mD.globalSettingsPageId : t.mD[G.a[t.resourceType]];
            ee(r.present.structure ? r.present : r.draft, n) || e.notSavedResources.includes(u) || e.notSavedResources.push(u), r.present = n, r.future = [], e.resourcesObjects[r._id] = r;
          }
        }(e, t);
      },
      AUTH_START: function (e, t) {
        return function (e) {
          e.loading = !0, e.error = null;
        }(e);
      },
      AUTH_SUCCESS: function (e, t) {
        return function (e, t) {
          e.userId = t.data._id, e.accountInfo = t.data.accountInfo, e.error = null, e.loading = !1, e.barSizes = Object(p.a)({}, e.barSizes, t.data.barSizes), e.tryWebsiter = t.data.tryWebsiter;
        }(e, t);
      },
      AUTH_FAIL: function (e, t) {
        return function (e, t) {
          e.loading = !1, e.error = t.error, e.userId = null;
        }(e, t);
      },
      AUTH_LOGOUT: function (e, t) {
        return function (e) {
          e.userId = null;
        }(e);
      },
      CHANGE_BAR_SIZE: function (e, t) {
        return function (e, t) {
          e.barSizes[t.key] = t.value;
        }(e, t);
      },
      SAVE_HOVERED_ELEMENT_RECT: function (e, t) {
        return function (e, t) {
          t.path.length > 0 && function e(r, n, i) {
            n < r.length - 1 ? (i[r[n].id] || (i[r[n].id] = {
              plugin: r[n].plugin,
              children: {}
            }), e(t.path, n + 1, i[r[n].id].children)) : i[r[n].id] = Object(p.a)({
              plugin: r[n].plugin,
              children: {}
            }, t.size);
          }(t.path, 0, e.hoveredElementSize);
        }(e, t);
      },
      REMOVE_FROM_HOVERED_SIZES: function (e, t) {
        return function (e, t) {
          !function e(r) {
            for (var n in r) if (r[n].plugin === t.currentResource) for (var i in r[n].children) t.removedElements.includes(i) && delete r[n].children[i];else e(r.children);
          }(e.hoveredElementSize);
        }(e, t);
      },
      HOVER_ELEMENT: function (e, t) {
        e.hoveredElementId = t.id, e.hoverMode = t.mode, e.fromFrame = t.fromFrame;
      },
      UNHOVER_ELEMENT: function (e, t) {
        e.hoveredElementId = null, e.fromFrame = !1;
      },
      TOGGLE_FIND_MODE: function (e, t) {
        return function (e, t) {
          t.value ? e.findMode === t.value ? e.findMode = null : e.findMode = t.value : e.findMode = null;
        }(e, t);
      },
      MARK_REFRESHING: function (e, t) {
        e.isRefreshing = t.refreshing;
      },
      MARK_SHOULD_REFRESHING: function (e, t) {
        e.shouldRefresh = t.value;
      },
      CHOOSE_USER_IN_WEBSITE_SHARING: function (e, t) {
        e.currentUserInWebsiteSharing = t.id;
      },
      SET_CURRENT_SITEBUILDER_MODE: function (e, t) {
        e.currentSiteBuilderMode = t.mode;
      },
      SAVE_MAIN_DATA: function (e, t) {
        e.mD = t.mD;
      },
      ADD_RESOURCE: function (e, t) {
        var r = e.mD;

        if (t.data && t.data._id) {
          if (r.resourcesObjects[t.data._id]) {
            if (r.resourcesObjects[t.data._id].draft) e.resourcesObjects[t.data._id] = Object(p.a)({}, r.resourcesObjects[t.data._id], {
              draft: t.data.draft,
              __v: t.data.__v
            }), !r.resourcesObjects[t.data._id].present.structure || ee(t.data.draft, r.resourcesObjects[t.data._id].present) ? (te(e, {
              _id: t.data._id
            }), re(e, {
              _id: t.data._id
            })) : (function (e, t) {
              e.notSavedResources.includes(t._id) || e.notSavedResources.push(t._id);
            }(e, {
              _id: t.data._id
            }), function (e, t) {
              e.newVersionResources.includes(t._id) || e.newVersionResources.push(t._id);
            }(e, {
              _id: t.data._id
            }));else e.resourcesObjects[t.data._id] = Object(p.a)({}, e.resourcesObjects[t.data._id], t.data);
          } else e.resourcesObjects[t.data._id] = t.data;
          t.data._id.toString() === r.userId.toString() && t.data.settings && t.data.settings.barSizes && (e.barSizes = t.data.settings.barSizes);
        }
      },
      DELETE_RESOURCE: function (e, t) {
        t.data && delete e.resourcesObjects[t.data.resourceId];
      },
      REVERT_RESOURCE: function (e, t) {
        t.data && (e.resourcesObjects[t.data._id].present = t.data.draft, "draft" === t.data.to && (te(e, {
          _id: t.data._id
        }), re(e, {
          _id: t.data._id
        })));
      },
      SAVE_OBJECT: function (e, t) {
        t.data && (e.resourcesObjects[t.data._id] = t.data);
      },
      SET_ACTIVE_CONTAINER: function (e, t) {
        e.activeContainer !== t.container && (e.activeContainer = t.container);
      },
      UNSET_ACTIVE_CONTAINER: function (e, t) {
        e.activeContainer === t.container && (e.activeContainer = "");
      },
      SAVE_TO_CLIPBOARD: function (e, t) {
        e.clipboard = t.data;
      }
    }),
        ae = x(function () {
      return Promise.all([r.e(2), r.e(4)]).then(r.bind(null, 1031));
    }),
        ce = function (e) {
      function t() {
        return Object(O.a)(this, t), Object(y.a)(this, Object(S.a)(t).apply(this, arguments));
      }

      return Object(I.a)(t, e), Object(_.a)(t, [{
        key: "componentDidMount",
        value: function () {
          this.props.onTryAutoSignup();
        }
      }, {
        key: "render",
        value: function () {
          var e = i.a.createElement(j.a, null, i.a.createElement(E.a, {
            path: "/login",
            component: B
          }), i.a.createElement(w.a, {
            to: "/login"
          }));
          return this.props.isAuthenticated && (e = i.a.createElement("div", {
            style: {
              height: "100%"
            }
          }, i.a.createElement(j.a, null, i.a.createElement(E.a, {
            path: "/editor",
            component: ae
          }), i.a.createElement(E.a, {
            path: "/logout",
            component: D
          }), i.a.createElement(w.a, {
            to: "/editor"
          })))), i.a.createElement(i.a.Fragment, null, e, " ", this.props.loading ? i.a.createElement(J, {
            cover: !0
          }) : null);
        }
      }]), t;
    }(n.Component),
        se = Object(C.a)(Object(s.b)(function (e) {
      return {
        isAuthenticated: null !== e.userId,
        loading: e.loading
      };
    }, function (e) {
      return {
        onTryAutoSignup: function () {
          return e(R.d());
        }
      };
    })(ce));

    r(464);
    r.d(t, "store", function () {
      return le;
    });
    var oe = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    f.a.defaults.baseURL = "https://api.websiter.dev";

    var de = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 300,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = {};
      return function (n) {
        return function (n) {
          return function (i) {
            if (i.type === m) return v(r, i, "cancel"), n(i);
            if (i.type === g) return v(r, i, "flush"), n(i);
            var u = (i.meta || {}).throttle;
            if (!u) return n(i);
            if (r[i.type]) return r[i.type](i);
            var a = e,
                c = t;
            return isNaN(u) || !0 === u ? "object" === typeof u && (a = u.wait || e, c = Object(p.a)({}, t, u)) : a = u, r[i.type] = h()(n, a, c), r[i.type](i);
          };
        };
      };
    }(300, {
      leading: !0,
      trailing: !0
    }),
        le = Object(o.createStore)(ue, oe ? oe(Object(o.applyMiddleware)(de, d.a)) : Object(o.applyMiddleware)(de, d.a)),
        fe = i.a.createElement(s.a, {
      store: le
    }, i.a.createElement(c.a, null, i.a.createElement(se, null))),
        pe = window.self !== window.top,
        be = document.getElementById("root");

    null === be || pe || a.a.render(fe, be);
  },
  229: function (e, t, r) {
    e.exports = r(228);
  },
  256: function (e, t, r) {},
  351: function (e, t) {},
  359: function (e, t) {},
  361: function (e, t) {},
  398: function (e, t) {},
  399: function (e, t) {},
  40: function (e, t, r) {
    "use strict";

    var n = r(0),
        i = r.n(n);

    t.a = function (e) {
      var t = null;

      if (e.icon) {
        var r = function (e) {
          for (var t = [], r = []; e.length > 0;) if (0 === (e = e.trim()).indexOf("</")) (e = e.substring(2)).indexOf("<") > 0 ? (e = e.substring(e.indexOf("<")), r.pop()) : e = "";else {
            var n = {
              type: (e = e.substring(e.indexOf("<"))).substring(1, e.indexOf(" ")),
              children: []
            },
                i = (e = e.substring(e.indexOf(" "))).substring(0, e.indexOf(">")),
                u = i.indexOf("/>") >= 0;

            for (e = e.substring(e.indexOf(">") + 1).trim(); i.length > 0;) {
              var a = i.substring(0, i.indexOf("=")).trim(),
                  c = (i = i.substring(i.indexOf('"') + 1)).substring(0, i.indexOf('"')).trim();
              i = i.substring(i.indexOf('"') + 1).trim(), n[a] = c;
            }

            0 === r.length ? t.push(n) : r[r.length - 1].children.push(n), u || r.push(n);
          }

          return t[0];
        }(e.icon);

        t = i.a.createElement("svg", {
          "data-testid": e.datatestid || "svg",
          height: r.height,
          width: r.width,
          viewBox: r.viewBox,
          className: e.className
        }, r.children.map(function (e, t) {
          return function e(t, r) {
            switch (t.type) {
              case "path":
                return i.a.createElement("path", {
                  key: r,
                  d: t.d,
                  fill: t.fill
                }, t.children.map(function (t, r) {
                  return e(t, r);
                }));

              case "g":
                return i.a.createElement("g", {
                  key: r,
                  fill: t.fill
                }, t.children.map(function (t, r) {
                  return e(t, r);
                }));

              default:
                return;
            }
          }(e, t);
        }));
      }

      return t;
    };
  },
  49: function (e, t, r) {
    e.exports = {
      Div: "Checkbox_Div__2PqSf",
      Input: "Checkbox_Input__1KbTF",
      StyleControls: "Checkbox_StyleControls__cb7Ky",
      Inline: "Checkbox_Inline__3XkB8",
      Svg: "Checkbox_Svg__3ctX6"
    };
  },
  5: function (e, t, r) {
    "use strict";

    r.d(t, "e", function () {
      return n;
    }), r.d(t, "a", function () {
      return i;
    }), r.d(t, "b", function () {
      return u;
    }), r.d(t, "c", function () {
      return a;
    }), r.d(t, "d", function () {
      return c;
    });
    var n = {
      page: "pagesStructure",
      plugin: "pluginsStructure",
      template: "templatesStructure",
      file: "filesStructure"
    },
        i = {
      page: "currentPageId",
      plugin: "currentPluginId",
      template: "currentTemplateId",
      file: "currentFileId"
    },
        u = {
      page: "currentPageDraft",
      plugin: "currentPluginDraft",
      template: "currentTemplateDraft",
      file: "currentFileDraft"
    },
        a = {
      page: "currentPageItem",
      plugin: "currentPluginItem",
      template: "currentTemplateItem",
      file: "currentFileItem"
    },
        c = {
      page: "currentPageObject",
      plugin: "currentPluginObject",
      template: "currentTemplateObject",
      file: "currentFileObject"
    };
  },
  50: function (e, t, r) {
    "use strict";

    var n = r(1),
        i = r(7),
        u = r(5),
        a = r(9),
        c = r(96).create({
      objectHash: function (e) {
        return e.id;
      },
      propertyFilter: function (e, t) {
        return "__patch__" !== e;
      }
    }),
        s = function (e, t, r) {
      return function (s, o) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var d,
            l,
            f = o().mD,
            p = f.resourcesObjects[r];

        if (p && (["page", "template", "plugin"].includes(e) ? (d = p.draft, l = f[u.b[e]]) : (d = p, l = p), d && t)) {
          var b = Object(n.a)({}, l, t),
              h = c.diff(d, b);
          h ? i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
            messageCode: "updateResource",
            type: e,
            _id: r,
            __patch__: h,
            __v: p.__v,
            markPublish: !!["page", "template", "plugin"].includes(e) && !f[u.c[e]].notPublished
          })) : (a.C({
            _id: r
          }), a.B({
            _id: r
          }));
        }
      };
    },
        o = function (e, t, r, n) {
      return function (a, c) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var s = c().mD;
        i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
          messageCode: "addResource",
          type: e,
          websiteId: s.currentWebsiteId,
          duplicate: t,
          _id: s[u.a[e]],
          name: r,
          resourceData: n
        }));
      };
    },
        d = function (e) {
      return function (t, r) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");

        if (window.confirm("Are you sure you want to delete this resource?")) {
          var n = r().mD;
          i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
            messageCode: "deleteResource",
            type: e,
            _id: n[u.a[e]]
          }));
        }
      };
    },
        l = function (e) {
      return function (t, r) {
        var n = r().mD;
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
          messageCode: "publishResource",
          type: e,
          _id: n[u.a[e]]
        }));
      };
    },
        f = function (e, t) {
      return function (r, n) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var c = n().mD;
        "draft" === t ? r(a.D({
          _id: c[u.a[e]],
          draft: c[u.d[e]].draft,
          to: t
        })) : i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
          messageCode: "revertResource",
          type: e,
          _id: c[u.a[e]],
          to: t
        }));
      };
    },
        p = r(2),
        b = r(13),
        h = r.n(b),
        m = function (e, t, r) {
      return function (n, i) {
        var u = i().mD;

        if (u.currentWebsiteObject && u.currentWebsiteId) {
          var a = h()(r ? u.resourcesObjects[r] : u.currentWebsiteObject);
          a && (a[e] = t, n(s("website", a, u.currentWebsiteId)));
        }
      };
    },
        g = function (e) {
      return function (t, r) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var n = r().mD;
        i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
          messageCode: "addWebsite",
          _id: n.currentWebsiteId,
          duplicate: e
        }));
      };
    },
        v = function () {
      return function (e, t) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");

        if (window.confirm("Are you sure you want to delete this website?")) {
          var r = t().mD;
          i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
            messageCode: "deleteWebsite",
            _id: r.currentWebsiteId
          }));
        }
      };
    },
        O = function () {
      return function (e, t) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var r = t().mD;
        i.b && 3 !== i.b.readyState && i.b.send(JSON.stringify({
          messageCode: "verifyCustomDomain",
          _id: r.currentWebsiteId
        }));
      };
    },
        _ = function (e, t, r) {
      return function (n, i) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var u = i().mD;

        if (u.currentWebsiteObject) {
          var a = h()(u.currentWebsiteObject.sharing),
              c = a.find(function (t) {
            return t.userId === e;
          });

          if (c) {
            var s = [];
            s = r ? [].concat(Object(p.a)(c.rights), [t]) : c.rights.filter(function (e) {
              return e !== t;
            }), c.rights = s, n(m("sharing", a, u.currentWebsiteId));
          }
        }
      };
    },
        y = function () {
      return function (e, t) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var r = t().mD;

        if (r.currentWebsiteObject) {
          var n = window.prompt("Paste the user id to share the website.");
          if (!n) return;
          i.b.send(JSON.stringify({
            messageCode: "addUserInSharing",
            _id: r.currentWebsiteId,
            userId: n,
            type: "add"
          }));
        }
      };
    },
        S = function (e) {
      return function (t, r) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");

        if (window.confirm("Are you sure you want to delete this user from sharing?")) {
          var n = r().mD;
          e && e !== n.userId && !window.confirm("Are you sure you want to remove this user from sharing?") || i.b.send(JSON.stringify({
            messageCode: "addUserInSharing",
            _id: n.currentWebsiteId,
            userId: e,
            type: "delete"
          }));
        }
      };
    },
        I = function () {
      return function (e, t) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var r = t().mD;

        if (r.currentWebsiteObject) {
          var n = window.prompt("Enter the user id to whom you would like to transfer the website. It can be found in the user account menu tab.");
          if (!n || !window.confirm("Are you sure you want to transfer this website to user - " + n + "?")) return;
          i.b.send(JSON.stringify({
            messageCode: "transferWebsite",
            _id: r.currentWebsiteId,
            userTo: n
          }));
        }
      };
    },
        j = function (e, t) {
      return function (r, n) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var u = n().mD;
        u.currentWebsiteObject && i.b.send(JSON.stringify({
          messageCode: "saveDomainName",
          _id: u.currentWebsiteId,
          name: e,
          type: t
        }));
      };
    };

    r.d(t, "k", function () {
      return s;
    }), r.d(t, "a", function () {
      return o;
    }), r.d(t, "e", function () {
      return d;
    }), r.d(t, "h", function () {
      return l;
    }), r.d(t, "i", function () {
      return f;
    }), r.d(t, "c", function () {
      return g;
    }), r.d(t, "g", function () {
      return v;
    }), r.d(t, "d", function () {
      return m;
    }), r.d(t, "n", function () {
      return O;
    }), r.d(t, "l", function () {
      return _;
    }), r.d(t, "b", function () {
      return y;
    }), r.d(t, "f", function () {
      return S;
    }), r.d(t, "m", function () {
      return I;
    }), r.d(t, "j", function () {
      return j;
    });
  },
  60: function (e, t, r) {
    "use strict";

    r.d(t, "b", function () {
      return u;
    }), r.d(t, "c", function () {
      return a;
    }), r.d(t, "a", function () {
      return o;
    }), r.d(t, "d", function () {
      return d;
    });

    var n = r(76),
        i = r.n(n),
        u = function (e) {
      if (e === e.toUpperCase() && e !== e.toLowerCase()) return !0;
    },
        a = function (e, t) {
      return e && t[e] ? i()(t[e].present) ? t[e].draft : t[e].present : null;
    };

    function c(e, t, r) {
      return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = r, e;
    }

    function s(e, t) {
      if (null == e) return {};

      var r,
          n,
          i = function (e, t) {
        if (null == e) return {};
        var r,
            n,
            i = {},
            u = Object.keys(e);

        for (n = 0; n < u.length; n++) r = u[n], t.indexOf(r) >= 0 || (i[r] = e[r]);

        return i;
      }(e, t);

      if (Object.getOwnPropertySymbols) {
        var u = Object.getOwnPropertySymbols(e);

        for (n = 0; n < u.length; n++) r = u[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
      }

      return i;
    }

    function o(e) {
      var t = function t(r) {
        return function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {},
                n = Object.keys(r);
            "function" === typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }))), n.forEach(function (t) {
              c(e, t, r[t]);
            });
          }

          return e;
        }({}, s(r, ["path"]), {
          children: e.filter(function (e) {
            return e.path[e.path.length - 1] === r.id;
          }).map(function (e) {
            return t(e);
          })
        });
      };

      return e.filter(function (e) {
        return 0 === e.path.length;
      }).map(function (e) {
        return t(e);
      });
    }

    var d = function (e) {
      var t = e.length;
      return t > 2 && "$" === e.charAt(0) && "$" === e.charAt(t - 1) && e.substr(1, t - 2);
    };
  },
  7: function (e, t, r) {
    "use strict";

    var n = r(32),
        i = r(33),
        u = r(36),
        a = r(34),
        c = r(35),
        s = r(0),
        o = r.n(s),
        d = r(26),
        l = r(8),
        f = r.n(l),
        p = r(9),
        b = function e(t, r, n, i, u) {
      u[r] || n.push({
        id: r,
        type: "resource"
      }), t && t.connectedResources && t.connectedResources.forEach(function (t) {
        var r;

        if ("plugin" === t.type && (r = i.pluginsStructure.find(function (e) {
          return e.name === t.name;
        })), r) {
          var a = u[r.id],
              c = {};
          a && (c = a.present.structure ? a.present : a.draft), e(c, r.id, n, i, u);
        }
      });
    };

    r.d(t, "b", function () {
      return h;
    });

    var h = !1,
        m = function (e) {
      function t() {
        var e, r;
        Object(n.a)(this, t);

        for (var i = arguments.length, c = new Array(i), s = 0; s < i; s++) c[s] = arguments[s];

        return (r = Object(u.a)(this, (e = Object(a.a)(t)).call.apply(e, [this].concat(c)))).state = {
          requestedResources: [],
          taskId: 0
        }, r.start = function () {
          var e, t;
          h = new WebSocket("wss://api.websiter.dev");

          var n = function () {
            clearTimeout(e), e = setTimeout(function () {
              h.close();
            }, 31e3);
            var t = {};

            for (var n in r.props.mD.resourcesObjects) t[n] = {
              __v: r.props.mD.resourcesObjects[n].__v,
              type: r.props.mD.resourcesObjects[n].draft ? "resource" : r.props.mD.resourcesObjects[n].pagesStructure ? "website" : "user"
            };

            h.send(JSON.stringify({
              messageCode: "heartbeat",
              versions: t
            }));
          };

          h.onopen = function (e) {
            h.send(JSON.stringify({
              messageCode: "auth",
              user: f.a.defaults.headers.common["x-auth-token"],
              tryWebsiter: sessionStorage.getItem("tryWebsiter")
            })), t = setInterval(function () {
              return h.send(JSON.stringify({
                messageCode: "auth",
                noRequest: !0,
                user: f.a.defaults.headers.common["x-auth-token"],
                tryWebsiter: sessionStorage.getItem("tryWebsiter")
              }));
            }, 6e5), n();
          }, h.onmessage = function (e) {
            var t = JSON.parse(e.data);

            switch (t.messageCode) {
              case "heartbeat":
                n();
                break;

              case "logout":
                r.props.logout();
                break;

              case "addResource":
                var i = t.resource;
                r.props.addResource(i);
                break;

              case "updateuser":
                r.props.updateUser(t, h);
                break;

              case "updatewebsite":
                r.props.updateWebsite(t, h);
                break;

              case "updateresource":
                r.props.updateResource(t, h);
                break;

              case "revertResource":
                r.props.revertResource(t);
                break;

              case "deleteuser":
              case "deletewebsite":
              case "deleteresource":
                r.props.deleteResource(t);
                break;

              case "confirmSaved":
                r.props.confirmSaved(t);
                break;

              case "notFoundResource":
                r.markNotFoundResource(t);
                break;

              case "error":
                alert(t.text);
            }
          }, h.onclose = function (r) {
            clearTimeout(e), clearInterval(t);
          };
        }, r.markNotFoundResource = function (e) {
          var t = r.state.requestedResources.filter(function (t) {
            return t.id.toString() === e._id.toString();
          });
          r.setState({
            requestedResources: t
          });
        }, r.checkInterval = null, r.check = function () {
          h && 3 !== h.readyState || r.start();
        }, r.reRequestResourcesInterval = null, r.reRequestResources = function () {
          var e = !0,
              t = !1,
              n = void 0;

          try {
            for (var i, u = r.state.requestedResources[Symbol.iterator](); !(e = (i = u.next()).done); e = !0) {
              var a = i.value;
              a && (r.props.mD.resourcesObjects[a.id] || h && 3 !== h.readyState && h.send(JSON.stringify({
                messageCode: "requestResource",
                id: a.id,
                type: a.type
              })));
            }
          } catch (c) {
            t = !0, n = c;
          } finally {
            try {
              e || null == u.return || u.return();
            } finally {
              if (t) throw n;
            }
          }
        }, r;
      }

      return Object(c.a)(t, e), Object(i.a)(t, [{
        key: "componentWillMount",
        value: function () {
          this.checkInterval = setInterval(this.check, 5e3);
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          clearInterval(this.reRequestResourcesInterval), clearInterval(this.checkInterval), h && h.close();
        }
      }, {
        key: "componentWillReceiveProps",
        value: function (e) {
          var t = this,
              r = function (e) {
            var t = e.mD,
                r = [];
            if (t.userId && t.resourcesObjects) if (t.userObject) {
              var n = t.currentWebsiteId,
                  i = !0,
                  u = !1,
                  a = void 0;

              try {
                for (var c, s = t.websites[Symbol.iterator](); !(i = (c = s.next()).done); i = !0) {
                  var o = c.value;
                  r.push({
                    id: o.id,
                    type: "website"
                  });
                }
              } catch (d) {
                u = !0, a = d;
              } finally {
                try {
                  i || null == s.return || s.return();
                } finally {
                  if (u) throw a;
                }
              }

              n ? (t.currentPageId && (b(t.currentPageDraft, t.currentPageId, r, t.currentWebsiteObject, t.resourcesObjects), t.pageTemplateId && b(t.pageTemplateDraft, t.pageTemplateId, r, t.currentWebsiteObject, t.resourcesObjects)), t.currentTemplateId && b(t.currentTemplateDraft, t.currentTemplateId, r, t.currentWebsiteObject, t.resourcesObjects), t.currentPluginId && b(t.currentPluginDraft, t.currentPluginId, r, t.currentWebsiteObject, t.resourcesObjects), t.globalSettingsPageId && b(t.globalSettingsPageDraft, t.globalSettingsPageId, r, t.currentWebsiteObject, t.resourcesObjects), t.globalSettingsTemplateId && b(t.globalSettingsTemplateDraft, t.globalSettingsTemplateId, r, t.currentWebsiteObject, t.resourcesObjects)) : (t.websites.length > 0 && (n = t.websites[0].id), n && e.chooseWebsite(n));
            } else r.push({
              id: t.userId,
              type: "user"
            });
            return r = Array.from(new Set(r));
          }(e),
              n = [],
              i = !0,
              u = !1,
              a = void 0;

          try {
            for (var c, s = function () {
              var e = c.value;

              if (e) {
                var r = t.state.requestedResources.find(function (t) {
                  return t.id === e.id;
                });
                r || h && 3 !== h.readyState && (h.send(JSON.stringify({
                  messageCode: "requestResource",
                  id: e.id,
                  type: e.type
                })), r = {
                  id: e.id,
                  type: e.type,
                  state: "sent"
                }), r && n.push(r);
              }
            }, o = r[Symbol.iterator](); !(i = (c = o.next()).done); i = !0) s();
          } catch (d) {
            u = !0, a = d;
          } finally {
            try {
              i || null == o.return || o.return();
            } finally {
              if (u) throw a;
            }
          }

          this.setState({
            requestedResources: n
          }), clearInterval(this.reRequestResourcesInterval), this.reRequestResourcesInterval = setInterval(this.reRequestResources, 3e3);
        }
      }, {
        key: "render",
        value: function () {
          return null;
        }
      }]), t;
    }(s.Component),
        g = Object(d.b)(function (e) {
      return {
        mD: e.mD
      };
    }, function (e) {
      return {
        logout: function () {
          return e(p.v());
        },
        addResource: function (t) {
          return e(p.b(t));
        },
        updateUser: function (t, r) {
          return e(p.T(t, r));
        },
        updateWebsite: function (t, r) {
          return e(p.U(t, r));
        },
        updateResource: function (t, r) {
          return e(p.S(t, r));
        },
        deleteResource: function (t) {
          return e(p.q(t));
        },
        revertResource: function (t) {
          return e(p.D(t));
        },
        chooseWebsite: function (t) {
          return e(p.m(t));
        },
        confirmSaved: function (t) {
          return e(p.C(t));
        }
      };
    })(m);

    t.a = Object(d.b)(function (e) {
      return {
        userId: e.userId,
        resourcesObjects: e.resourcesObjects,
        tryWebsiter: e.tryWebsiter
      };
    }, function (e) {
      return {
        saveMainData: function (t) {
          return e(p.H(t));
        }
      };
    })(function (e) {
      var t = function (e, t, r) {
        var n,
            i,
            u,
            a,
            c,
            s,
            o,
            d,
            l,
            f,
            p,
            b,
            h,
            m,
            g,
            v,
            O,
            _,
            y,
            S,
            I,
            j,
            E,
            w,
            C,
            R,
            T,
            D,
            x,
            A,
            N = t[e],
            M = [],
            P = [],
            k = [],
            W = [],
            F = "",
            V = "",
            U = "",
            L = "",
            B = "",
            H = "",
            z = "",
            J = "",
            G = "",
            q = 0;

        if (N && (n = N.websites) && n.length > 0 && N.settings && (A = N.settings.tooltipsOff, N.settings.currentWebsite && (i = n.find(function (e) {
          return e.id === N.settings.currentWebsite;
        })), i && (a = t[u = i.id]))) {
          M = a.pagesStructure, P = a.templatesStructure, k = a.pluginsStructure, W = a.filesStructure, q = a.nextFileId || 0;
          var K = N.settings.websites[u];

          if (K) {
            F = K.currentPageId, V = K.currentPageFSBId, U = K.currentTemplateId, L = K.currentPluginId, B = K.currentFileId, c = M.find(function (e) {
              return e.id === F;
            }), s = M.find(function (e) {
              return e.id === V;
            }), o = P.find(function (e) {
              return e.id === U;
            }), d = k.find(function (e) {
              return e.id === L;
            }), l = W.find(function (e) {
              return e.id === B;
            }), c && ((f = t[F]) && (g = f.present.structure ? f.present : f.draft), (H = c.template || "") && (w = P.find(function (e) {
              return e.name === H;
            })) && (C = t[z = w.id]) && (R = C.present.structure ? C.present : C.draft)), s && ((p = t[V]) && (v = p.present.structure ? p.present : p.draft), (J = s.template || "") && (T = P.find(function (e) {
              return e.name === J;
            })) && (D = t[G = T.id]) && (x = D.present.structure ? D.present : D.draft)), o && (b = t[U]) && (O = b.present.structure ? b.present : b.draft), d && (h = t[L]) && (_ = h.present.structure ? h.present : h.draft), l && (m = t[B]);
            var Z = M.find(function (e) {
              return e.generalSettings;
            });
            Z && (S = t[y = Z.id]) && (I = S.present.structure ? S.present : S.draft);
            var X = P.find(function (e) {
              return e.generalSettings;
            });

            if (X) {
              var $ = t[j = X.id];
              $ && (E = $.present.structure ? $.present : $.draft);
            }
          }
        }

        return {
          userObject: N,
          websites: n,
          currentWebsiteItem: i,
          currentWebsiteId: u,
          currentWebsiteObject: a,
          pagesStructure: M,
          templatesStructure: P,
          pluginsStructure: k,
          filesStructure: W,
          currentPageId: F,
          currentPageFSBId: V,
          currentTemplateId: U,
          currentPluginId: L,
          currentFileId: B,
          currentPageItem: c,
          currentPageFSBItem: s,
          currentTemplateItem: o,
          currentPluginItem: d,
          currentFileItem: l,
          currentPageObject: f,
          currentPageFSBObject: p,
          currentTemplateObject: b,
          currentPluginObject: h,
          currentFileObject: m,
          currentPageDraft: g,
          currentPageFSBDraft: v,
          currentTemplateDraft: O,
          currentPluginDraft: _,
          globalSettingsPageId: y,
          globalSettingsPageObject: S,
          globalSettingsPageDraft: I,
          globalSettingsTemplateId: j,
          globalSettingsTemplateDraft: E,
          pageTemplateName: H,
          pageTemplateId: z,
          pageTemplateItem: w,
          pageTemplateObject: C,
          pageTemplateDraft: R,
          pageTemplateFSBName: J,
          pageTemplateFSBId: G,
          pageTemplateFSBItem: T,
          pageTemplateFSBObject: D,
          pageTemplateFSBDraft: x,
          resourcesObjects: t,
          userId: e,
          tryWebsiter: r,
          tooltipsOff: A,
          nextFileId: q
        };
      }(e.userId, e.resourcesObjects, e.tryWebsiter);

      return e.saveMainData(t), o.a.createElement(g, null);
    });
  },
  82: function (e, t, r) {
    e.exports = {
      Loader: "Spinner_Loader__2Sex0",
      load3: "Spinner_load3__jNmcI",
      Cover: "Spinner_Cover__3iRbu"
    };
  },
  89: function (e, t, r) {
    "use strict";

    r.d(t, "c", function () {
      return f;
    }), r.d(t, "d", function () {
      return p;
    }), r.d(t, "b", function () {
      return h;
    }), r.d(t, "a", function () {
      return g;
    });

    var n = r(2),
        i = r(1),
        u = r(8),
        a = r.n(u),
        c = r(7),
        s = r(50),
        o = function (e) {
      return {
        type: "ACTION_FAIL_IMAGE_UPLOAD",
        error: e
      };
    },
        d = function (e, t, r) {
      return function (n, u) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var c = e.file,
            s = e.thumbnail,
            d = e.resolution || {
          width: "unknown",
          height: "unknown"
        },
            f = u().mD;

        if (f.currentWebsiteId) {
          var p = f.currentWebsiteId + "/" + c.name.replace(/([^a-zA-Z0-9\\.\\-])/g, "_"),
              b = "",
              h = 0;
          if (!t) for (; f.filesStructure.findIndex(function (e) {
            return p + b === e.serverName;
          }) >= 0;) b = "_" + ++h;
          var m = {
            size: c.size,
            name: t ? t.name : c.name,
            serverName: t ? t.serverName : p + b,
            type: c.type,
            editorMode: r,
            file: c,
            v: t ? t.v + 1 : 1,
            resolution: d
          },
              g = s ? {
            size: s.size,
            name: m.name + s.name,
            serverName: m.serverName + s.name,
            type: s.type,
            editorMode: r,
            file: s
          } : {};
          return a.a.post("/api/sign-s3", Object(i.a)({}, {
            fileName: m.serverName,
            fileType: c.type,
            fileSize: m.size,
            websiteId: f.currentWebsiteId
          }, s ? {
            thumbnailName: g.serverName,
            thumbnailType: s.type,
            thumbnailSize: g.size
          } : {})).then(function (e) {
            n(l(m, g, e.data, f.currentWebsiteId, t));
          }).catch(function (e) {
            n(o(e.message)), 400 === e.response.status && alert(e.response.data);
          });
        }
      };
    },
        l = function (e, t, r, u, d) {
      return function (l, f) {
        return sessionStorage.getItem("tryWebsiter") ? alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login") : (r.signedRequestThumbnail && t.file && a.a.put(r.signedRequestThumbnail, t.file, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(function (e) {}).catch(function (e) {
          l(o(e.message));
        }), a.a.put(r.signedRequest, e.file, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(function (a) {
          if (c.b) {
            var o,
                p = f().mD,
                b = {
              id: d ? d.id : "file_" + p.nextFileId,
              path: d ? d.path : [],
              size: e.size + t.size,
              name: e.name,
              serverName: e.serverName,
              type: e.type,
              editorMode: e.editorMode,
              url: r.url,
              v: e.v,
              resolution: e.resolution,
              modifiedDate: Date.now()
            };
            o = p.currentFileItem && p.currentFileId ? d ? [].concat(Object(n.a)(p.filesStructure.slice(0, p.filesStructure.findIndex(function (e) {
              return e.id === d.id;
            }))), [b], Object(n.a)(p.filesStructure.slice(p.filesStructure.findIndex(function (e) {
              return e.id === d.id;
            }) + 1))) : [].concat(Object(n.a)(p.filesStructure.slice(0, p.filesStructure.findIndex(function (e) {
              return e.id === p.currentFileId;
            }) + 1)), [Object(i.a)({}, b, {
              path: p.currentFileItem.path,
              createdDate: Date.now()
            })], Object(n.a)(p.filesStructure.slice(p.filesStructure.findIndex(function (e) {
              return e.id === p.currentFileId;
            }) + 1))) : [].concat(Object(n.a)(p.filesStructure), [b]), l(s.k("website", {
              nextFileId: d ? p.nextFileId : p.nextFileId + 1,
              filesStructure: o,
              storage: r.newStorage
            }, u));
          }

          l({
            type: "ACTION_SUCCESS_IMAGE_UPLOAD"
          });
        }).catch(function (e) {
          l(o(e.message));
        }));
      };
    },
        f = function (e, t, r) {
      return function (n) {
        var i = e[0];
        if (null == i) return alert("No file selected.");
        n({
          type: "ACTION_START_IMAGE_UPLOAD"
        }), i.type.indexOf("image") >= 0 ? b(i, {
          width: 220,
          height: 220
        }, function (e) {
          p(e, "/120").then(function (e) {
            m(i, function (u) {
              n(d({
                file: i,
                thumbnail: e,
                resolution: u
              }, t, r));
            });
          });
        }) : n(d({
          file: i
        }, t, r));
      };
    },
        p = function (e, t, r) {
      return r = r || (e.match(/^data:([^;]+);/) || "")[1], fetch(e).then(function (e) {
        return e.arrayBuffer();
      }).then(function (e) {
        return new File([e], t, {
          type: r
        });
      });
    },
        b = function (e, t, r) {
      if (e) {
        var n = new FileReader();
        n.onload = function (e) {
          h(e.target.result, t, r);
        }, n.readAsDataURL(e);
      }
    },
        h = function (e, t, r) {
      var n,
          i = new Image();
      i.onload = function () {
        var e = i.width / t.width,
            u = i.height / t.height;

        if (e > 1 || u > 1) {
          var a = document.createElement("canvas"),
              c = a.getContext("2d");
          a.width = i.width, a.height = i.height, c.drawImage(i, 0, 0), i.width > i.height ? (a.height = i.height / i.width * t.width, a.width = t.width) : (a.width = i.width / i.height * t.width, a.height = t.width), c.drawImage(a, 0, 0, a.width, a.height), c.drawImage(i, 0, 0, a.width, a.height), n = a.toDataURL();
        } else n = a.toDataURL();

        r(n);
      }, i.src = e;
    },
        m = function (e, t) {
      var r,
          n = window.URL || window.webkitURL;

      if (e) {
        r = new Image();
        var i = n.createObjectURL(e);
        r.onload = function () {
          alert(this.width + " " + this.height), t({
            width: this.width,
            height: this.height
          }), n.revokeObjectURL(i);
        }, r.src = i;
      }
    },
        g = function (e) {
      return function (t, r) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        var n = r().mD;
        window.confirm("Are you sure you want to delete this file? The file will be unavailable after the deletion and will not be visible in all elements and on all pages of your websites.") && c.b.send(JSON.stringify({
          messageCode: "deleteImage",
          fileId: e,
          _id: n.currentWebsiteId
        }));
      };
    };
  },
  9: function (e, t, r) {
    "use strict";

    var n = r(17),
        i = r(2),
        u = r(1),
        a = r(50),
        c = r(23),
        s = r.n(c),
        o = r(28),
        d = r.n(o),
        l = r(29),
        f = r.n(l),
        p = r(5),
        b = r(121),
        h = r(340),
        m = function (e) {
      return e.currentBox ? e.currentBox.length < 1 ? -1 : e.structure.findIndex(function (t) {
        return t.id === e.currentBox;
      }) : -1;
    },
        g = function (e, t) {
      var r = [];
      "plugin" === t ? r.push(0) : "template" === t && e.structure.forEach(function (e, t) {
        (0 === e.path.length || s()(e.path, ["element_01"])) && r.push(t);
      });
      var n = e.structure.findIndex(function (e) {
        return "trash" === e.id;
      });
      return n >= 0 && r.push(n), r;
    },
        v = function (e, t) {
      return function (r, n) {
        var i = n().mD,
            a = i[p.b[e]];

        if (i && e && a && t) {
          var c = t.map(function (e) {
            var t = a.structure.find(function (t) {
              return t.id === e.id;
            });
            return t ? Object(u.a)({}, e, t, {
              expanded: e.expanded,
              path: e.path
            }) : e;
          }),
              o = Object(u.a)({}, a, {
            structure: c
          }),
              l = s()(a.structure.map(function (e) {
            return d()(e, ["expanded", "children", "itemPath"]);
          }), c.map(function (e) {
            return d()(e, ["expanded", "children", "itemPath"]);
          }));
          r(pe(i, e, o, {}, l));
        }
      };
    },
        O = function (e, t, r) {
      return function (n, i) {
        var u = i().mD;
        n(pe(u, e, t, {}, !1, r));
      };
    },
        _ = function (e, t) {
      return function (r, n) {
        var i = n().mD,
            a = i[p.b[e]];

        if (i && e && t && a) {
          var c = Object(u.a)({}, a, {
            currentBox: t
          });
          r(pe(i, e, c, {}, !0)), r(w());
        }
      };
    },
        y = function (e, t, r, n, a) {
      return function (c, s) {
        var o,
            d = s().mD,
            l = d[p.b[e]];

        if (d && e && t && l && !((o = a ? l.structure.findIndex(function (e) {
          return e.id === a;
        }) : m(l)) < 0)) {
          "tag" === t && c(j(d[p.a[e]], [l.structure[o].id]));
          var b = {};
          f()(t) && !("string" === typeof t || t instanceof String) ? b = t : b[t.toString()] = r;
          var h = Object(u.a)({}, l, {
            structure: [].concat(Object(i.a)(l.structure.slice(0, o)), [Object(u.a)({}, l.structure[o], b)], Object(i.a)(l.structure.slice(o + 1)))
          });
          c(pe(d, e, h, {
            throttle: 100
          }, n));
        }
      };
    },
        S = function (e, t, r, i, a) {
      return function (c, s) {
        var o,
            d = s().mD,
            l = d[p.b[e]];

        if (d && e && t && l && !((o = a ? l.structure.findIndex(function (e) {
          return e.id === a;
        }) : m(l)) < 0)) {
          "tag" === t && c(j(d[p.a[e]], [l.structure[o].id]));
          var b = {};
          f()(t) && !("string" === typeof t || t instanceof String) ? b = t : b[t.toString()] = r;
          var h = Object(u.a)({}, l, {
            values: Object(u.a)({}, l.values, Object(n.a)({}, l.structure[o].id, Object(u.a)({}, l.values[l.structure[o].id], b)))
          });
          c(pe(d, e, h, {
            throttle: "string" === typeof t && ["currentFileId", "defaultFileUrl", "fileUrl"].includes(t) ? 100 : 1e3
          }, i));
        }
      };
    },
        I = function (e, t) {
      return {
        type: "SAVE_HOVERED_ELEMENT_RECT",
        path: e,
        size: t
      };
    },
        j = function (e, t) {
      return {
        type: "REMOVE_FROM_HOVERED_SIZES",
        currentResource: e,
        removedElements: t
      };
    },
        E = function (e, t, r) {
      return {
        type: "HOVER_ELEMENT",
        id: e,
        mode: t,
        fromFrame: r
      };
    },
        w = function () {
      return {
        type: "UNHOVER_ELEMENT"
      };
    },
        C = function (e) {
      return {
        type: "TOGGLE_FIND_MODE",
        value: e
      };
    },
        R = function (e, t) {
      return function (r, a) {
        var c = a().mD,
            o = c[p.b[e]];

        if (o) {
          g(o, e);
          var d,
              l = m(o);
          "plugin" === e ? l <= 0 && (l = 0, d = !0) : "template" === e && (l < 0 && (l = o.structure.findIndex(function (e) {
            return "element_1" === e.id;
          })), "element_01" === o.structure[l].id && (l = o.structure.findIndex(function (e) {
            return "element_1" === e.id;
          })), o.structure[l].path.length < 2 && !s()(o.structure[l].path, ["element_02"]) && (d = !0));
          var f = o.structure[l],
              b = o.values[f.id];
          if (f.isChildren ? d = !1 : f.childrenTo ? d = !0 : "inside" === t && (d = !0), ("inside" === t || "text" === t && !f.text) && (d = !0), "page" === t) if (b.CMSVariableType && b.CMSVariableType.indexOf("propagating_") >= 0) d = !0;else {
            if (!f.isPropagatingItem) return;
            d = !1;
          }

          var h = "page" === e ? "elementCMS_".concat(o.currentId) : "element_".concat(o.currentId),
              v = o.currentId + 1,
              O = "element_02" === o.structure[l].id || s()(o.structure[l].path, ["element_02"]),
              _ = Object(u.a)({}, o, {
            structure: [].concat(Object(i.a)(o.structure.slice(0, l + 1)), [{
              id: h,
              path: d ? [].concat(Object(i.a)(o.structure[l].path), [o.structure[l].id]) : Object(i.a)(o.structure[l].path),
              tag: "page" === e ? "Item" : "text" === t ? "text" : "children" === t ? "New children" : O ? "New CMS variable" : "div",
              isPropagatingItem: "page" === e,
              textMode: "text",
              text: "text" === t,
              isChildren: "children" === t,
              isCMSVariable: O,
              isElementFromCMSVariable: "cmsVariable" === t
            }], Object(i.a)(o.structure.slice(l + 1))),
            values: Object(u.a)({}, o.values, Object(n.a)({}, h, {
              textContent: "",
              properties: {},
              propertiesString: "",
              CMSVariableType: "text",
              CMSVariableSystemName: "newCmsVariable",
              CMSVariableDescription: "New CMS variable description",
              CMSVariableDefaultValue: "New CMS variable default value"
            })),
            currentId: v,
            currentBox: h
          });

          r(pe(c, e, _));
        }
      };
    },
        T = function (e, t) {
      return function (r, n) {
        var a = n().mD,
            c = a[p.b[e]];

        if (c) {
          var s = g(c, e),
              o = m(c);

          if (!(o < 0 || s.includes(o))) {
            var d = c.structure[o];

            if (d) {
              var l = d.id;

              if ("page" !== t || d.isPropagatingItem) {
                var f = {},
                    b = [l];

                if ("trash" === d.path[0]) {
                  if (t) f = Object(u.a)({}, c, {
                    structure: c.structure.filter(function (e) {
                      var t = l !== e.id && !e.path.includes(l);
                      return t || b.push(e.id), t;
                    })
                  });else {
                    var h = c.structure.map(function (e) {
                      return Object(u.a)({}, e, {
                        path: e.path.filter(function (e) {
                          return e !== l;
                        })
                      });
                    });
                    f = Object(u.a)({}, c, {
                      structure: [].concat(Object(i.a)(h.slice(0, o)), Object(i.a)(h.slice(o + 1)))
                    });
                  }

                  for (var v = 0, O = b; v < O.length; v++) {
                    var _ = O[v];
                    delete f.values[_.id];
                  }
                } else {
                  var y = c.structure.find(function (e) {
                    return "trash" === e.id;
                  });

                  if (t) {
                    var S = c.structure.filter(function (e) {
                      var t = l !== e.id && !e.path.includes(l);
                      return t || b.push(e.id), t;
                    });
                    f = Object(u.a)({}, c, {
                      structure: [].concat(Object(i.a)(S), Object(i.a)(y ? [] : [{
                        id: "trash",
                        path: [],
                        tag: "Trash"
                      }]), Object(i.a)(c.structure.filter(function (e) {
                        return b.includes(e.id);
                      }).map(function (e) {
                        return Object(u.a)({}, e, {
                          path: ["trash"].concat(Object(i.a)(e.id !== l ? e.path.slice(e.path.indexOf(l)) : []))
                        });
                      }))),
                      values: Object(u.a)({}, c.values, {
                        trash: {
                          properties: {},
                          style: ""
                        }
                      })
                    });
                  } else {
                    var I = c.structure.map(function (e) {
                      return Object(u.a)({}, e, {
                        path: e.path.filter(function (e) {
                          return e !== l;
                        })
                      });
                    });
                    f = Object(u.a)({}, c, {
                      structure: [].concat(Object(i.a)(I.slice(0, o)), Object(i.a)(I.slice(o + 1)), Object(i.a)(y ? [] : [{
                        id: "trash",
                        path: [],
                        tag: "Trash"
                      }]), [Object(u.a)({}, d, {
                        path: ["trash"]
                      })]),
                      values: Object(u.a)({}, c.values, {
                        trash: {
                          properties: {},
                          style: ""
                        }
                      })
                    });
                  }
                }

                r(pe(a, e, f)), r(j(a[p.a[e]], b));
              }
            }
          }
        }
      };
    },
        D = function (e, t) {
      return function (r, a) {
        var c = a().mD,
            s = c[p.b[e]];

        if (s) {
          var o = g(s, e),
              d = m(s);

          if (!(d < 0 || o.includes(d))) {
            var l = s.structure[d].id,
                f = "page" === t ? "elementCMS_" : "element_";

            if ("page" !== t || s.structure[d].isPropagatingItem) {
              var b = s.structure.filter(function (e) {
                return e.path.includes(l);
              }),
                  h = f + s.currentId,
                  v = {
                currentId: s.currentId + 1
              };

              if (t) {
                var O = Object(n.a)({}, l, h),
                    _ = Object(n.a)({}, h, s.values[l]),
                    y = b.map(function (e) {
                  var t = f + v.currentId;
                  return v.currentId += 1, O[e.id] = t, _[t] = s.values[e.id], Object(u.a)({}, e, {
                    id: t
                  });
                }).map(function (e) {
                  return Object(u.a)({}, e, {
                    path: e.path.map(function (e) {
                      return O[e] ? O[e] : e;
                    })
                  });
                });

                v = Object(u.a)({}, s, v, {
                  structure: [].concat(Object(i.a)(s.structure.slice(0, d + b.length)), [Object(u.a)({}, s.structure[d], {
                    id: h
                  })], Object(i.a)(y), Object(i.a)(s.structure.slice(d + b.length))),
                  values: Object(u.a)({}, s.values, _)
                });
              } else v = Object(u.a)({}, s, v, {
                structure: [].concat(Object(i.a)(s.structure.slice(0, d + b.length)), [Object(u.a)({}, s.structure[d], {
                  id: h
                })], Object(i.a)(s.structure.slice(d + b.length))),
                values: Object(u.a)({}, s.values, Object(n.a)({}, h, s.values[l]))
              });

              r(pe(c, e, v));
            }
          }
        }
      };
    },
        x = function (e, t, r) {
      return function (a, c) {
        var s = c().mD,
            o = s[p.b[e]];

        if (o) {
          var d = m(o);

          if (!(d < 0)) {
            var l,
                f = {
              currentId: o.currentId
            },
                b = o.structure[d].textContent;

            if (b) {
              var h = b.substr(0, t),
                  g = b.substr(t, r - t),
                  v = b.substr(r),
                  O = [Object(u.a)({}, o.structure[d])],
                  _ = Object(n.a)({}, d, Object(u.a)({}, o.values[o.structure[d].id], {
                textContent: h
              }));

              g.length > 0 && (l = "element_".concat(f.currentId), f.currentId = f.currentId + 1, O.push(Object(u.a)({}, o.structure[d], {
                id: l
              })), _[l] = Object(u.a)({}, o.values[o.structure[d].id], {
                textContent: g
              })), (v.length > 0 || 0 === g.length) && (l = "element_".concat(f.currentId), f.currentId = f.currentId + 1, O.push(Object(u.a)({}, o.structure[d], {
                id: l
              })), _[l] = Object(u.a)({}, o.values[o.structure[d].id], {
                textContent: v
              })), f = Object(u.a)({}, o, f, {
                structure: [].concat(Object(i.a)(o.structure.slice(0, d)), O, Object(i.a)(o.structure.slice(d + 1))),
                values: Object(u.a)({}, o.values, _)
              }), a(pe(s, e, f));
            }
          }
        }
      };
    },
        A = function (e, t, r) {
      return function (a, c) {
        var s = c().mD,
            o = s[p.b[e]];

        if (o) {
          var d = m(o);

          if (!(d < 0)) {
            var l,
                f = {
              currentId: o.currentId
            },
                b = o.structure[d].textContent;

            if (b) {
              var h = b.substr(0, t),
                  g = b.substr(t, r - t),
                  v = b.substr(r),
                  O = [Object(u.a)({}, o.structure[d])],
                  _ = Object(n.a)({}, d, Object(u.a)({}, o.values[o.structure[d].id], {
                textContent: h
              })),
                  y = "element_".concat(f.currentId);

              f.currentId = f.currentId + 1, O.push({
                id: y,
                path: Object(i.a)(o.structure[d].path),
                tag: "span",
                text: !1
              }), _[y] = {
                textContent: "",
                style: "",
                properties: {}
              }, l = "element_".concat(f.currentId), f.currentId = f.currentId + 1, O.push(Object(u.a)({}, o.structure[d], {
                path: [].concat(Object(i.a)(o.structure[d].path), [y]),
                textContent: g,
                id: l
              })), _[l] = Object(u.a)({}, o.values[o.structure[d].id], {
                textContent: g
              }), v.length > 0 && (l = "element_".concat(f.currentId), f.currentId = f.currentId + 1, O.push(Object(u.a)({}, o.structure[d], {
                textContent: v,
                id: l
              })), _[l] = Object(u.a)({}, o.values[o.structure[d].id], {
                textContent: v
              })), f = Object(u.a)({}, o, f, {
                structure: [].concat(Object(i.a)(o.structure.slice(0, d)), O, Object(i.a)(o.structure.slice(d + 1))),
                values: Object(u.a)({}, o.values, _)
              }), a(pe(s, e, f));
            }
          }
        }
      };
    },
        N = function (e, t, r, i) {
      return function (a, c) {
        var o = c().mD[p.b[e]];

        if (o) {
          var d = m(o);

          if (!(d < 0)) {
            var l = o.structure[d].id;

            if (o.values[l].menuItems) {
              var f = o.values[l].menuItems.map(function (e) {
                return e.id === (i || o.values[l].currentMenuItem) ? Object(u.a)({}, e, Object(n.a)({}, t, r)) : e;
              });
              s()(f, o.values[l].menuItems) || a(S(e, "menuItems", f));
            }
          }
        }
      };
    },
        M = function (e) {
      return {
        type: "MARK_REFRESHING",
        refreshing: e
      };
    },
        P = function (e) {
      return {
        type: "MARK_SHOULD_REFRESHING",
        value: e
      };
    },
        k = function (e, t) {
      return function (r, c) {
        var s = c().mD,
            o = s[p.b[e]];

        if (o) {
          var d = g(o, e),
              l = m(o);

          if (!(l <= 0 || !t && d.includes(l))) {
            var f = o.structure[l].id,
                b = 1,
                h = ["element_0"],
                v = ["element_0"],
                O = {},
                _ = o.structure.filter(function (e) {
              return !t && e.id === f || e.path.includes(f);
            }).map(function (e) {
              v.push(e.id);
              var r = Object(u.a)({}, e, {
                id: "element_".concat(b)
              });
              return O[r.id] = Object(u.a)({}, o.values[e.id]), e.id === f ? r.path = ["element_0"] : r.path = ["element_0"].concat(Object(i.a)(r.path.slice(r.path.indexOf(f) + (t ? 1 : 0)))), h.push(r.id), b++, r;
            }).map(function (e) {
              return Object(u.a)({}, e, {
                path: e.path.map(function (e) {
                  return h[v.indexOf(e)];
                })
              });
            });

            if (0 !== _.length) {
              var y = {
                structure: [{
                  id: "element_0",
                  path: [],
                  tag: "Main element",
                  textMode: ""
                }].concat(Object(i.a)(_)),
                values: Object(u.a)({}, O, {
                  element_0: {
                    properties: {},
                    propertiesString: "",
                    textContent: ""
                  }
                }),
                currentId: b
              },
                  S = prompt("Name the new plugin", "New plugin") || "New plugin";
              r(a.a("plugin", !1, S, y));

              for (var I = Object(u.a)({}, o, {
                structure: [].concat(Object(i.a)(o.structure.slice(0, l + (t ? 1 : 0))), [Object(u.a)({}, o.structure[l], {
                  path: [].concat(Object(i.a)(o.structure[l].path), Object(i.a)(t ? [o.structure[l].id] : [])),
                  tag: S,
                  text: !1,
                  id: v[1]
                })], Object(i.a)(o.structure.slice(l + (t ? 1 : 0) + _.length))),
                values: Object(u.a)({}, o.values, Object(n.a)({}, v[1], {
                  textContent: "",
                  propertiesString: "",
                  properties: {}
                }))
              }), j = 2; j < v.length; j++) delete I.values[v[j]];

              r(pe(s, e, I, {
                throttle: 1e3
              }));
            }
          }
        }
      };
    },
        W = function (e) {
      return function (t, r) {
        var n = r().mD,
            a = n[p.b[e]];

        if (a) {
          var c = m(a);

          if (!(c < 0)) {
            var s = n.pluginsStructure.find(function (e) {
              return e.name === a.structure[c].tag;
            });

            if (s && n.resourcesObjects[s.id]) {
              var o = n.resourcesObjects[s.id].present.structure ? n.resourcesObjects[s.id].present : n.resourcesObjects[s.id].draft,
                  d = a.currentId,
                  l = [],
                  f = [],
                  b = {},
                  h = o.structure.filter(function (e) {
                return e.path.length > 0;
              }).map(function (e) {
                f.push(e.id);
                var t = Object(u.a)({}, e, {
                  id: "element_".concat(d),
                  path: Object(i.a)(e.path.slice(1))
                });
                return b[t.id] = a.values[e.id], l.push(t.id), d++, t;
              }).map(function (e) {
                return Object(u.a)({}, e, {
                  path: [].concat(Object(i.a)(a.structure[c].path), Object(i.a)(e.path.map(function (e) {
                    return l[f.indexOf(e)];
                  })))
                });
              }),
                  g = Object(u.a)({}, a, {
                currentId: d,
                structure: [].concat(Object(i.a)(a.structure.slice(0, c)), Object(i.a)(h), Object(i.a)(a.structure.slice(c + 1))),
                values: Object(u.a)({}, a.values, b)
              });
              t(pe(n, e, g));
            }
          }
        }
      };
    },
        F = function (e, t) {
      return function (r, n) {
        var a = n().mD,
            c = a[p.b[e]];

        if (c) {
          var s = m(c);

          if (!(s < 0)) {
            var o = {
              currentId: c.currentId
            },
                l = h.parseDOM(t),
                f = [],
                b = {};
            !function e(t, r) {
              t.forEach(function (t) {
                if (("text" !== t.type || "" !== t.data.trim()) && ("text" === t.type || "tag" === t.type)) {
                  var n = "element_".concat(o.currentId);
                  o.currentId = o.currentId + 1;
                  var u = t.attribs ? d()(t.attribs, "style") : {},
                      a = {
                    id: n,
                    path: r,
                    tag: t.name || "div",
                    text: !1
                  },
                      c = {
                    textContent: "",
                    style: t.attribs && t.attribs.style || "",
                    properties: u,
                    propertiesString: JSON.stringify(u)
                  };
                  "text" === t.type && (a.tag = "text", a.text = !0, c.textMode = "text", c.textContent = t.data), f.push(a), b[n] = c, t.children && e(t.children, [].concat(Object(i.a)(r), [n]));
                }
              });
            }(l, c.structure[s].path), o = Object(u.a)({}, c, o, {
              structure: [].concat(Object(i.a)(c.structure.slice(0, s)), f, Object(i.a)(c.structure.slice(s + 1))),
              values: Object(u.a)({}, c.values, b)
            }), r(pe(a, e, o));
          }
        }
      };
    },
        V = function (e, t, r) {
      return function (n, a) {
        var c = a().mD,
            s = c[p.b[e]];

        if (s) {
          var o = g(s, e),
              d = m(s);

          if (!(d < 0 || o.includes(d))) {
            var l = s.structure[d].id,
                f = s.structure.find(function (e) {
              return e.id === l;
            });

            if (f) {
              if ("page" === e) {
                if (!f.isPropagatingItem) return;
                r = !0;
              }

              var b = {},
                  h = [l],
                  v = s.structure.find(function (e) {
                return "trash" === e.id;
              }),
                  O = [],
                  _ = function (e) {
                return e.map(function (t, r) {
                  return 0 === r ? Object(u.a)({}, t, {
                    path: []
                  }) : Object(u.a)({}, t, {
                    path: t.path.slice(t.path.indexOf(e[0].id))
                  });
                });
              };

              if (r) {
                var y = s.structure.filter(function (e) {
                  var t = l !== e.id && !e.path.includes(l);
                  return t || (h.push(e.id), O.push(e)), t;
                }),
                    S = {};
                (O = _(O)).forEach(function (e) {
                  return S[e.id] = s.values[e.id];
                }), t && "trash" !== f.path[0] && (b = Object(u.a)({}, s, {
                  structure: [].concat(Object(i.a)(y), Object(i.a)(v ? [] : [{
                    id: "trash",
                    path: [],
                    tag: "Trash"
                  }]), Object(i.a)(s.structure.filter(function (e) {
                    return h.includes(e.id);
                  }).map(function (e) {
                    return Object(u.a)({}, e, {
                      path: ["trash"].concat(Object(i.a)(e.id !== l ? e.path.slice(e.path.indexOf(l)) : []))
                    });
                  }))),
                  values: Object(u.a)({}, s.values, {
                    trash: {
                      properties: {},
                      style: ""
                    }
                  })
                }));
              } else if (O = _([f]), t && "trash" !== f.path[0]) {
                var I = s.structure.map(function (e) {
                  return Object(u.a)({}, e, {
                    path: e.path.filter(function (e) {
                      return e !== l;
                    })
                  });
                });
                b = Object(u.a)({}, s, {
                  structure: [].concat(Object(i.a)(I.slice(0, d)), Object(i.a)(I.slice(d + 1)), Object(i.a)(v ? [] : [{
                    id: "trash",
                    path: [],
                    tag: "Trash"
                  }]), [Object(u.a)({}, f, {
                    path: ["trash"]
                  })]),
                  values: Object(u.a)({}, s.values, {
                    trash: {
                      properties: {},
                      style: ""
                    }
                  })
                });
              }

              t && "trash" !== f.path[0] && (n(pe(c, e, b)), n(j(c[p.a[e]], h)));
              var E = {};
              O.forEach(function (e) {
                return E[e.id] = s.values[e.id];
              }), n(U({
                structure: O,
                values: E,
                type: "websiterElements"
              }));
            }
          }
        }
      };
    },
        U = function (e) {
      return {
        type: "SAVE_TO_CLIPBOARD",
        data: e
      };
    },
        L = function (e, t) {
      return function (r, n) {
        var a = n(),
            c = a.mD;

        if ("websiterElements" === a.clipboard.type && !(a.clipboard.structure.length < 1)) {
          var o = c[p.b[e]];

          if (o) {
            var d = m(o),
                l = o.structure[d],
                f = a.clipboard.structure,
                h = function (e, t, r) {
              if ("page" === r) {
                if (t) {
                  if (t.isPropagatingItem) return "notInside";
                  if (t.CMSVariableType && t.CMSVariableType.indexOf("propagating_") >= 0) return "inside";
                }

                return !1;
              }

              var n = Object(b.a)(!1, e, r, !0),
                  i = Object(b.a)(!1, t, r);
              if (["html", "headBody", "trash", "CMSRoute", "children", "childrenTo"].includes(n)) return !1;
              if ("isCMSVariable" === n) return "CMSRoute" === i ? "inside" : t.path.length > 0 && "element_02" === t.path[0];

              if (["element", "plugin", "text", "isElementFromCMSVariable"].includes(n)) {
                if (["html", "headbody", "childrenTo"].includes(i)) return "inside";
                if ("element" === i) return !0;
                if (["plugin", "text", "isElementFromCMSVariable"].includes(i)) return "notInside";
              }

              return !1;
            }(f[0], l, e);

            if (h) {
              var g;
              "plugin" === e ? d <= 0 && (d = 0, g = !0) : "template" === e ? (d < 0 && (d = o.structure.findIndex(function (e) {
                return "element_1" === e.id;
              })), "element_01" === o.structure[d].id && (d = o.structure.findIndex(function (e) {
                return "element_1" === e.id;
              })), o.structure[d].path.length < 2 && !s()(o.structure[d].path, ["element_02"]) && (g = !0)) : "page" === e && (g = h);
              var v = o.structure[d];
              v.isChildren ? g = !1 : v.childrenTo ? g = !0 : t && (g = !0), (t || "text" === e || "inside" === h) && (g = !0), "notInside" === h && (g = !1);
              var O = {
                currentId: o.currentId
              },
                  _ = {},
                  y = {},
                  S = f.map(function (t) {
                var r = "element".concat("page" === e ? "CMS" : "", "_").concat(O.currentId);
                return O.currentId += 1, _[t.id] = r, y[r] = a.clipboard.values[t.id], Object(u.a)({}, t, {
                  id: r
                });
              }).map(function (e) {
                return Object(u.a)({}, e, {
                  path: [].concat(Object(i.a)(v.path), Object(i.a)(g ? [v.id] : []), Object(i.a)(e.path.map(function (e) {
                    return _[e] ? _[e] : e;
                  })))
                });
              });
              O = Object(u.a)({}, o, O, {
                structure: [].concat(Object(i.a)(o.structure.slice(0, d + 1)), Object(i.a)(S), Object(i.a)(o.structure.slice(d + 1))),
                values: Object(u.a)({}, o.values, y)
              }), r(pe(c, e, O));
            }
          }
        }
      };
    },
        B = r(8),
        H = r.n(B),
        z = r(81),
        J = r(209),
        G = r.n(J),
        q = r(13),
        K = r.n(q),
        Z = r(7),
        X = new z.a(),
        $ = function (e) {
      return {
        type: "AUTH_SUCCESS",
        data: e
      };
    },
        Q = function () {
      return function (e) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        window.confirm("Are you sure you would like to delete your account?") && window.confirm("This action cannot be reverted. All your websites will be deleted.") && Z.b.send(JSON.stringify({
          messageCode: "deleteUser"
        }));
      };
    },
        Y = function (e) {
      return function (t) {
        if (sessionStorage.getItem("tryWebsiter")) return alert("This function is not available in test mode. Please create your free account at https://my.websiter.dev/login");
        e ? Z.b && Z.b.send(JSON.stringify({
          messageCode: "logoutAll"
        })) : (X.remove("auth_token"), H.a.defaults.headers.common["x-auth-token"] = null, t(ee()));
      };
    },
        ee = function () {
      return {
        type: "AUTH_LOGOUT"
      };
    },
        te = function () {
      return function (e) {
        if (sessionStorage.setItem("systemRefresh", "0"), X.get("try_websiter")) return X.remove("try_websiter", {
          path: "/"
        }), sessionStorage.setItem("tryWebsiter", "1"), void e($({
          _id: "try"
        }));
        var t = X.get("auth_token"),
            r = X.get("rememberme");
        r && (X.remove("rememberme", {
          path: "/"
        }), "false" === r && X.remove("auth_token", {
          path: "/"
        }));
        var n = G.a.decode(t);
        if (H.a.defaults.headers.post["Content-Type"] = "application/json", H.a.defaults.headers.put["Content-Type"] = "application/json", H.a.defaults.headers.delete["Content-Type"] = "application/json", H.a.defaults.headers.common.Accept = "application/json", t && n) return H.a.defaults.headers.common["x-auth-token"] = t, H.a.defaults.headers.post["x-auth-token"] = t, H.a.defaults.headers.get["x-auth-token"] = t, H.a.defaults.headers.delete["x-auth-token"] = t, H.a.defaults.headers.put["x-auth-token"] = t, e({
          type: "AUTH_START"
        }), H.a.get("/api/users").then(function (t) {
          sessionStorage.removeItem("tryWebsiter"), e($({
            _id: n._id
          }));
        }).catch(function (t) {
          X.remove("auth_token", {
            path: "/"
          }), e({
            type: "AUTH_FAIL",
            error: t.message
          });
        });
        e(Y());
      };
    },
        re = function (e, t) {
      return {
        type: "CHANGE_BAR_SIZE",
        key: e,
        value: t
      };
    },
        ne = function () {
      return function (e, t) {
        if (!sessionStorage.getItem("tryWebsiter")) {
          var r = t(),
              n = r.mD,
              i = r.barSizes;
          Z.b.send(JSON.stringify({
            messageCode: "saveSettings",
            settings: Object(u.a)({}, n.userObject.settings, {
              barSizes: i
            })
          }));
        }
      };
    },
        ie = function (e) {
      return function (t, r) {
        var n,
            i,
            u,
            a,
            c,
            s = r().barSizes,
            o = Math.max(window.innerWidth, 700),
            d = window.innerHeight;
        if (e) switch (e.key) {
          case "height":
            (n = e.value) < 50 && (n = 50), n > d - 50 && (n = d - 50), t(re("height", n));
            break;

          case "width":
            (n = e.value) < 50 && (n = 50), i = n - s.width, a = s.width2 - i, c = s.width3, a < 50 && (u = a - 50, a = 50, (c = s.width3 + u) < 50 && (c = 50)), n + a + c + 50 > o && (n = o - 150, a = 50, c = 50), t(re("width", n)), t(re("width2", a)), t(re("width3", c));
            break;

          case "width2":
            a = e.value, n = s.width, (i = a - 50) < 0 && ((n += i) < 50 && (n = 50), u = n - s.width, c = s.width3 - u, a = 50), i = n + a - s.width - s.width2, (c = s.width3 - i) < 50 && (c = 50), n + a + c + 50 > o && (a = o - n - 100), t(re("width", n)), t(re("width2", a)), t(re("width3", c));
            break;

          case "width3":
            c = e.value, n = s.width, a = s.width2, (i = c - 50) < 0 && ((u = (a += i) - 50) < 0 && ((n += u) < 50 && (n = 50), a = 50), c = 50), n + a + c + 50 > o && (c = o - n - a - 50), t(re("width", n)), t(re("width2", a)), t(re("width3", c));
        } else s.height > d - 50 && t(re("height", d - 50)), s.width > o - 100 && t(re("width", o - 100)), s.width + s.width2 > o - 50 && t(re("width2", o - s.width - 50));
      };
    },
        ue = function () {
      return function (e, t) {
        var r = t().mD,
            n = K()(r.userObject);
        n.settings.tooltipsOff = !n.settings.tooltipsOff, e(ce(n));
      };
    },
        ae = function (e) {
      return function (t, r) {
        var n = r().mD,
            i = K()(n.userObject);
        i.settings.currentWebsite = e, t(ce(i));
      };
    },
        ce = function (e) {
      return {
        type: "SAVE_OBJECT",
        data: e
      };
    },
        se = function (e) {
      return {
        type: "CHOOSE_USER_IN_WEBSITE_SHARING",
        id: e
      };
    },
        oe = function (e) {
      return {
        type: "SIZE_IS_CHANGING",
        isChanging: e
      };
    },
        de = function (e) {
      return {
        type: "SAVE_MAIN_DATA",
        mD: e
      };
    },
        le = r(89),
        fe = function (e, t) {
      return function (r, n) {
        var i = n().mD,
            u = K()(i.userObject);
        u.settings.websites[u.settings.currentWebsite] || (u.settings.websites[u.settings.currentWebsite] = {}), i.globalSettingsPageId !== e && "page" === t && (u.settings.websites[u.settings.currentWebsite].currentPageFSBId = e), u.settings.websites[u.settings.currentWebsite][p.a[t]] = e, r(ce(u));
      };
    },
        pe = function (e, t, r, n, i, u) {
      return {
        type: "ADD_RESOURCE_VERSION",
        mD: e,
        resourceType: t,
        draft: r,
        meta: n,
        isNotForHistory: i,
        globalSettings: u
      };
    },
        be = function (e) {
      return {
        type: "SET_ACTIVE_CONTAINER",
        container: e
      };
    },
        he = function (e) {
      return {
        type: "UNSET_ACTIVE_CONTAINER",
        container: e
      };
    },
        me = function (e) {
      return {
        type: "REMOVE_RESOURCE_FROM_UNSAVED",
        _id: e._id
      };
    },
        ge = function (e) {
      return {
        type: "REMOVE_RESOURCE_FROM_NEW_VERSIONS",
        _id: e._id
      };
    },
        ve = r(76),
        Oe = r.n(ve),
        _e = r(96).create({
      objectHash: function (e) {
        return e.id;
      },
      propertyFilter: function (e, t) {
        return "__patch__" !== e;
      }
    }),
        ye = function (e) {
      return function (t, r) {
        t(Se(e));
      };
    },
        Se = function (e) {
      return {
        type: "ADD_RESOURCE",
        data: e
      };
    },
        Ie = function (e) {
      return {
        type: "DELETE_RESOURCE",
        data: e
      };
    },
        je = function (e) {
      return {
        type: "REVERT_RESOURCE",
        data: e
      };
    },
        Ee = function (e, t) {
      return function (r, n) {
        if (e) {
          var i = n().mD,
              u = d()(K()(i.resourcesObjects[e.resourceId]), ["settings"]);
          if (u && u.__v === e.resource.__v - 1) return u.websites = _e.patch(u.websites, e.resource.__patch__), u.__v = e.resource.__v, void r(ye(u));
          Re(e.resource._id, e.type, t);
        }
      };
    },
        we = function (e, t) {
      return function (r, n) {
        if (e) {
          var i = n().mD,
              u = K()(i.resourcesObjects[e.resourceId]);

          if (u && u.__v === e.resource.__v - 1) {
            var a = _e.patch(u, e.resource.__patch__);

            return a.__v = e.resource.__v, void r(ye(a));
          }

          Re(e.resource._id, e.type, t);
        }
      };
    },
        Ce = function (e, t) {
      return function (r, n) {
        if (e) {
          var i = n().mD,
              u = K()(i.resourcesObjects[e.resourceId]);
          if (u && u.__v === e.resource.__v - 1) return Oe()(e.resource.__patch__) || (u.draft = _e.patch(u.draft, e.resource.__patch__)), u.__v = e.resource.__v, void r(ye(u));
          Re(e.resource._id, e.type, t);
        }
      };
    },
        Re = function (e, t, r) {
      r && 3 !== r.readyState && r.send(JSON.stringify({
        messageCode: "requestResource",
        id: e,
        type: t
      }));
    };

    r.d(t, "j", function () {
      return _;
    }), r.d(t, "a", function () {
      return R;
    }), r.d(t, "o", function () {
      return T;
    }), r.d(t, "t", function () {
      return D;
    }), r.d(t, "E", function () {
      return v;
    }), r.d(t, "F", function () {
      return O;
    }), r.d(t, "g", function () {
      return y;
    }), r.d(t, "h", function () {
      return S;
    }), r.d(t, "u", function () {
      return E;
    }), r.d(t, "Q", function () {
      return w;
    }), r.d(t, "G", function () {
      return I;
    }), r.d(t, "M", function () {
      return x;
    }), r.d(t, "O", function () {
      return A;
    }), r.d(t, "i", function () {
      return N;
    }), r.d(t, "w", function () {
      return M;
    }), r.d(t, "y", function () {
      return k;
    }), r.d(t, "s", function () {
      return W;
    }), r.d(t, "P", function () {
      return C;
    }), r.d(t, "x", function () {
      return P;
    }), r.d(t, "z", function () {
      return F;
    }), r.d(t, "n", function () {
      return V;
    }), r.d(t, "A", function () {
      return L;
    }), r.d(t, "v", function () {
      return Y;
    }), r.d(t, "d", function () {
      return te;
    }), r.d(t, "r", function () {
      return Q;
    }), r.d(t, "e", function () {
      return ie;
    }), r.d(t, "f", function () {
      return re;
    }), r.d(t, "J", function () {
      return ne;
    }), r.d(t, "N", function () {
      return ue;
    }), r.d(t, "L", function () {
      return oe;
    }), r.d(t, "m", function () {
      return ae;
    }), r.d(t, "l", function () {
      return se;
    }), r.d(t, "I", function () {
      return ce;
    }), r.d(t, "H", function () {
      return de;
    }), r.d(t, "V", function () {
      return le.c;
    }), r.d(t, "p", function () {
      return le.a;
    }), r.d(t, "k", function () {
      return fe;
    }), r.d(t, "c", function () {
      return pe;
    }), r.d(t, "C", function () {
      return me;
    }), r.d(t, "B", function () {
      return ge;
    }), r.d(t, "K", function () {
      return be;
    }), r.d(t, "R", function () {
      return he;
    }), r.d(t, "b", function () {
      return ye;
    }), r.d(t, "T", function () {
      return Ee;
    }), r.d(t, "U", function () {
      return we;
    }), r.d(t, "S", function () {
      return Ce;
    }), r.d(t, "q", function () {
      return Ie;
    }), r.d(t, "D", function () {
      return je;
    });
  }
}, [[229, 1, 3]]]);