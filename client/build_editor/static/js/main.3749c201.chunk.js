(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{134:function(t,e,n){"use strict";n.r(e);var r=n(0),u=n.n(r),c=n(74),i=n.n(c),a=n(277),o=n(25),s=n(10),f=n(35),l=n(5),d=n.n(l),p=(n(162),n(30)),h=n(31),O=n(34),E=n(32),g=n(33),_=n(279),b=n(276),m=n(274),S=n(278),v=n(84),I=function(t){return function(e){function n(){var t,e;Object(p.a)(this,n);for(var r=arguments.length,u=new Array(r),c=0;c<r;c++)u[c]=arguments[c];return(e=Object(O.a)(this,(t=Object(E.a)(n)).call.apply(t,[this].concat(u)))).state={component:null},e}return Object(g.a)(n,e),Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=this;t().then(function(t){e.setState({component:t.default})})}},{key:"render",value:function(){var t=this.state.component;return t?u.a.createElement(t,this.props):null}}]),n}(r.Component)},R=n(26),j=function(t){return u.a.createElement("div",null,u.a.createElement("a",{href:"https://my.websiter.dev/api/auth/google/start"},"GOOGLE"),u.a.createElement("a",{href:"https://api.websiter.dev/api/auth/facebook/start"},"FACEBOOK"),u.a.createElement("a",{href:"https://api.websiter.dev/api/auth/twitter/start"},"TWITTER"))},A=n(55),y=n.n(A),T=function(t){return u.a.createElement(u.a.Fragment,null,t.cover?u.a.createElement("div",{className:y.a.Cover,"data-testid":t.datatestid||"cover"},u.a.createElement("div",{className:y.a.Loader},"Loading...")):u.a.createElement("div",{className:y.a.Loader},"Loading..."))},C=I(function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,605))}),w=function(t){function e(){return Object(p.a)(this,e),Object(O.a)(this,Object(E.a)(e).apply(this,arguments))}return Object(g.a)(e,t),Object(h.a)(e,[{key:"componentDidMount",value:function(){this.props.onTryAutoSignup()}},{key:"render",value:function(){var t=u.a.createElement(_.a,null,u.a.createElement(b.a,{path:"/login",component:j}),u.a.createElement(b.a,{path:"/signup",component:j}),u.a.createElement(m.a,{to:"/login"}));return this.props.isAuthenticated&&(t=u.a.createElement("div",{style:{height:"100%"}},u.a.createElement(_.a,null,u.a.createElement(b.a,{path:"/editor",component:C}),u.a.createElement(b.a,{path:"/logout",component:v.a}),u.a.createElement(m.a,{to:"/editor"})))),u.a.createElement(u.a.Fragment,null,t," ",this.props.loading?u.a.createElement(T,{cover:!0}):null)}}]),e}(r.Component),N=Object(S.a)(Object(o.b)(function(t){return{isAuthenticated:null!==t.userId,loading:t.loading}},function(t){return{onTryAutoSignup:function(){return t(R.e())}}})(w)),U=n(1),L=n(6),D=n(15),P=n(7),M=function(t){return t.currentPlugin.length<1?-1:t.resourcesObjects[t.currentPlugin].value.structure.findIndex(function(e){return e.id===t.currentBoxInPlugin})},x=n(21),G=n(76),V=(n(272),n(127).create({objectHash:function(t){return t.id}})),H=function(t,e){return V.patch(t[x.structure[e.resourceType]],e.structurePatch)},F=n(133),k={websites:[],resourcesObjects:{},pagesStructure:[],filesStructure:[],pluginsStructure:[],loadedWebsite:"",error:null,loading:!1,currentPage:"",currentFile:"",currentPlugin:"",domainNotOk:!1,customDomainNotOk:!1,storage:0,images:[],uploadingImage:!1,currentBoxInPlugin:"",currentImage:"",sizeIsChanging:!1,currentWebsite:"",notSavedResources:[],pageZoom:100,hoveredElementId:null,hoveredElementSize:{},isRefreshing:!1,userId:null,barSizes:{height:200,width:500,width2:200},currentTopTab:"page",findMode:null,hoverMode:"",fromFrame:!1},z=Object(F.a)(k,{SAVE_ALL_WEBSITES_DATA_FROM_SERVER:function(t,e){return function(t,e){return Object(U.a)({},t,e.data,{domainNotOk:!1,customDomainNotOk:!1,currentPage:e.data.currentPage||(t.resourcesObjects[t.currentPage]?t.currentPage:""),barSizes:Object(U.a)({},t.barSizes,e.data.barSizes),currentWebsite:e.data.loadedWebsite})}(t,e)},CHOOSE_WEBSITE:function(t,e){t.currentWebsite=e.id},ACTION_START_IMAGE_UPLOAD:function(t,e){return function(t){return Object(U.a)({},t,{error:null,loading:!0})}(t)},ACTION_FAIL_IMAGE_UPLOAD:function(t,e){return function(t,e){return Object(U.a)({},t,{error:e.error,loadng:!1})}(t,e)},ACTION_SUCCESS_IMAGE_UPLOAD:function(t,e){return function(t){return Object(U.a)({},t,{error:null,loading:!1})}(t)},CHOOSE_IMAGE:function(t,e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,e=arguments.length>1?arguments[1]:void 0;t.currentImage=e.image}(t,e)},SAVE_IMAGE_AND_SIZE_IN_REDUX:function(t,e){t.images=e.images||t.images,t.storage=e.storage||t.storage},SIZE_IS_CHANGING:function(t,e){t.sizeIsChanging=e.isChanging},ACTION_START:function(t,e){t.error=null,t.pagesLoading=!0},ACTION_FAIL:function(t,e){t.error=e.error,t.pagesLoading=!1},ACTION_SUCCESS:function(t,e){t.error=null,t.pagesLoading=!1},ADD_RESOURCE_SUCCESS:function(t,e){return function(t,e){t[x.structure[e.resourceType]]=H(t,e),t.resourcesObjects[e._id]=e.resource}(t,e)},DELETE_RESOURCE_SUCCESS:function(t,e){return function(t,e){e.deletedResources.forEach(function(e){return delete t.resourcesObjects[e]}),t[x.structure[e.resourceType]]=H(t,e),t[x.current[e.resourceType]]=e.current||""}(t,e)},SAVE_RESOURCES_STRUCTURE_SUCCESS:function(t,e){return function(t,e){t[x.structure[e.resourceType]]=e.structure}(t,e)},SET_CURRENT_RESOURCE:function(t,e){return function(t,e){t[x.current[e.resourceType]]=e._id}(t,e)},SAVE_RESOURCE_IN_STATE:function(t,e){return function(t,e){t.resourcesObjects[e.currentResource].draft=e.draft,t.resourcesObjects[e.currentResource].present=e.draft,t.notSavedResources=t.notSavedResources.filter(function(t){return t!==e.currentResource})}(t,e)},REMOVE_RESOURCE_FROM_UNSAVED:function(t,e){return function(t,e){t.notSavedResources=t.notSavedResources.filter(function(t){return t!==e.currentResource})}(t,e)},SAVE_RESOURCE_DRAFT_IN_STATE:function(t,e){return function(t,e){t.resourcesObjects[e.currentResource].draft=e.draft}(t,e)},ADD_RESOURCE_VERSION:function(t,e){return function(t,e){var n=t.resourcesObjects[e.currentResource];if(!Object(P.isEqual)(n.present,e.draft))if(e.isNotForHistory)n.present=e.draft;else{if(e.draft.structure){var r=[];e.draft.structure.forEach(function(t){t.tag.length>0&&(Object(G.b)(t.tag.charAt(0))?r.push({name:t.tag,type:"plugin"}):"style"===t.tag&&r.push({name:t.properties.name,type:"file"}))});var u=t.pagesStructure.find(function(t){return t.id===e.currentResource})||t.pluginsStructure.find(function(t){return t.id===e.currentResource});u&&(u.connectedResources=r)}t.notSavedResources.includes(e.currentResource)||t.notSavedResources.push(e.currentResource),n.past.length>100&&n.past.shift(),n.past.push(V.diff(n.present,e.draft)),n.present=e.draft,n.future=[]}}(t,e)},UNDO_RESOURCE_VERSION:function(t,e){return function(t,e){var n=t[x.current[t.currentTopTab]],r=t.resourcesObjects[n];if(r&&r.past.length>0){Object(P.isEqual)(r.present,r.past[r.past.length-1])?t.notSavedResources=t.notSavedResources.filter(function(t){return t!==e.currentResource}):t.notSavedResources.includes(e.currentResource)||t.notSavedResources.push(e.currentResource);var u=r.past.pop();r.future.unshift(u),r.present=V.unpatch(r.present,u)}}(t,e)},REDO_RESOURCE_VERSION:function(t,e){return function(t,e){var n=t[x.current[t.currentTopTab]],r=t.resourcesObjects[n];if(r&&r.future.length>0){Object(P.isEqual)(r.present,r.future[0])?t.notSavedResources=t.notSavedResources.filter(function(t){return t!==e.currentResource}):t.notSavedResources.includes(e.currentResource)||t.notSavedResources.push(e.currentResource);var u=r.future.shift();r.past.push(u),r.present=V.patch(r.present,u)}}(t,e)},CHOOSE_BOX_IN_PLUGIN:function(t,e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,e=arguments.length>1?arguments[1]:void 0;t.currentBoxInPlugin=e.item}(t,e)},ADD_BOX_IN_PLUGIN:function(t,e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,e=arguments.length>1?arguments[1]:void 0,n=M(t),r=t.resourcesObjects[t.currentPlugin].value,u="plugin_element_".concat(r.currentId);r.currentId+=1;var c={id:u,path:n<=0?[r.structure[0].id]:Object(L.a)(r.structure[n].path),tag:e.text?"text":"div",text:e.text,textContent:"",style:[],styles:[]};r.structure.splice(n+1,0,c)}(t,e)},DELETE_BOX_IN_PLUGIN:function(t,e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,e=arguments.length>1?arguments[1]:void 0,n=M(t);if(!(n<0)){var r=t.resourcesObjects[t.currentPlugin].value,u=r.structure[n].id;e.withChildren?r.structure=r.structure.filter(function(t){return u!==t.id&&!t.path.includes(u)}):(r.structure=r.structure.map(function(t){return Object(U.a)({},t,{path:t.path.filter(function(t){return t!==u})})}),r.structure.splice(n,1))}}(t,e)},DUPLICATE_BOX_IN_PLUGIN:function(t,e){return function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,n=arguments.length>1?arguments[1]:void 0,r=M(e);if(r<0)return Object(U.a)({},e);var u=e.resourcesObjects[e.currentPlugin].value,c=u.structure[r].id,i=u.structure.filter(function(t){return t.path.includes(c)}),a="plugin_element_".concat(u.currentId);u.currentId+=1;var o=[];if(n.withChildren){var s=Object(D.a)({},c,a);o=i.map(function(t){var e="plugin_element_".concat(u.currentId);return u.currentId+=1,s[t.id]=e,Object(U.a)({},t,{id:e})}).map(function(t){return Object(U.a)({},t,{path:t.path.map(function(t){return s[t]?s[t]:t})})})}(t=u.structure).splice.apply(t,[r+i.length+1,0,Object(U.a)({},u.structure[r],{id:a})].concat(Object(L.a)(o)))}(t,e)},CHANGE_BOX_PROPERTY_IN_PLUGIN:function(t,e){return function(t,e){var n=M(t);n<0||(t.resourcesObjects[t.currentPlugin].value.structure[n][e.key]=e.value)}(t,e)},SAVE_STRUCTURE_IN_PLUGIN:function(t,e){return function(t,e){t.resourcesObjects[t.currentPlugin]&&(t.resourcesObjects[t.currentPlugin].value.structure=e.structure)}(t,e)},AUTH_START:function(t,e){return function(t){t.loading=!0,t.error=null}(t)},AUTH_SUCCESS:function(t,e){return function(t,e){t.userId=e.data._id,t.error=null,t.loading=!1,t.storage=e.data.storage,t.images=e.data.images,t.barSizes=Object(U.a)({},t.barSizes,e.data.barSizes)}(t,e)},AUTH_FAIL:function(t,e){return function(t,e){t.loading=!1,t.error=e.error,t.userId=null}(t,e)},AUTH_LOGOUT:function(t,e){return function(t){t.userId=null}(t)},CHANGE_BAR_SIZE:function(t,e){return function(t,e){t.barSizes[e.key]=e.value}(t,e)},SET_CURRENT_TOP_TAB:function(t,e){t.currentTopTab=e.currentTopTab},SAVE_HOVERED_ELEMENT_RECT:function(t,e){return function(t,e){e.path.length>0&&function t(n,r,u){r<n.length-1?(u[n[r].id]||(u[n[r].id]={plugin:n[r].plugin,children:{}}),t(e.path,r+1,u[n[r].id].children)):u[n[r].id]=Object(U.a)({plugin:n[r].plugin,children:{}},e.size)}(e.path,0,t.hoveredElementSize)}(t,e)},REMOVE_FROM_HOVERED_SIZES:function(t,e){return function(t,e){!function t(n){for(var r in n)if(n[r].plugin===e.currentResource)for(var u in n[r].children)e.removedElements.includes(u)&&delete n[r].children[u];else t(n.children)}(t.hoveredElementSize)}(t,e)},HOVER_ELEMENT:function(t,e){t.hoveredElementId=e.id,t.hoverMode=e.mode,t.fromFrame=e.fromFrame},UNHOVER_ELEMENT:function(t,e){t.hoveredElementId=null,t.fromFrame=!1},TOGGLE_FIND_MODE:function(t,e){return function(t,e){e.value?t.findMode===e.value?t.findMode=null:t.findMode=e.value:t.findMode=null}(t,e)},MARK_REFRESHING:function(t,e){t.isRefreshing=e.refreshing}});n(273);n.d(e,"store",function(){return J});var B=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;d.a.defaults.baseURL="https://api.websiter.dev";var J=Object(s.createStore)(z,B?B(Object(s.applyMiddleware)(f.a)):Object(s.applyMiddleware)(f.a));d.a.interceptors.request.use(function(t){return localStorage.getItem("currentAction")&&(t.headers.currentAction=localStorage.getItem("currentAction"),localStorage.setItem("currentAction",(parseInt(localStorage.getItem("currentAction"))+1).toString())),t}),d.a.interceptors.response.use(function(t){return t.headers["x-auth-token"]&&(d.a.defaults.headers.common["x-auth-token"]=t.headers["x-auth-token"]),t},function(t){return t.response&&412===parseInt(t.response.status)&&J.dispatch(Object(R.z)()),Promise.reject(t)});var W=u.a.createElement(o.a,{store:J},u.a.createElement(a.a,null,u.a.createElement(N,null))),Z=document.getElementById("root");null!==Z&&i.a.render(W,Z)},135:function(t,e,n){t.exports=n(134)},162:function(t,e,n){},168:function(t,e){},170:function(t,e){},207:function(t,e){},208:function(t,e){},21:function(t,e){t.exports.structure={page:"pagesStructure",file:"filesStructure",plugin:"pluginsStructure"},t.exports.current={page:"currentPage",file:"currentFile",plugin:"currentPlugin"}},26:function(t,e,n){"use strict";var r=n(6),u=n(15),c=n(1),i=n(7),a=function(t){return t.currentBox.length<1?-1:t.structure.findIndex(function(e){return e.id===t.currentBox})},o=function(t,e){var n=[];return"plugin"===e?n.push(0):"page"===e&&t.structure.forEach(function(t,e){t.path.length<2&&n.push(e)}),n},s=function(t,e,n){return function(r){if(e&&n&&t){var u=Object(c.a)({},n,{structure:t}),a=Object(i.isEqual)(n.structure.map(function(t){return Object(i.omit)(t,["expanded"])}),t.map(function(t){return Object(i.omit)(t,["expanded"])}));r(_t(e,u,a))}}},f=function(t,e,n){return function(r){if(e&&t&&n){var u=Object(c.a)({},n,{currentBox:t});r(_t(e,u,!0)),r(h())}}},l=function(t,e,n,o,s){return function(f){if(n&&t&&o){var l=a(o);if(!(l<0)){var d=Object(i.isObject)(t)?t:Object(u.a)({},t,e),p=Object(c.a)({},o,{structure:[].concat(Object(r.a)(o.structure.slice(0,l)),[Object(c.a)({},o.structure[l],d)],Object(r.a)(o.structure.slice(l+1)))});f(_t(n,p,s))}}}},d=function(t,e){return{type:"SAVE_HOVERED_ELEMENT_RECT",path:t,size:e}},p=function(t,e,n){return{type:"HOVER_ELEMENT",id:t,mode:e,fromFrame:n}},h=function(){return{type:"UNHOVER_ELEMENT"}},O=function(t){return{type:"TOGGLE_FIND_MODE",value:t}},E=function(t,e,n,u){return function(i){if(t&&e){var s=o(e,n),f=a(e);"plugin"===n?f<0&&(f=0):"page"===n&&f<1&&(f=s[s.length-1]);var l="element_".concat(e.currentId),d=e.currentId+1,p=Object(c.a)({},e,{structure:[].concat(Object(r.a)(e.structure.slice(0,f+1)),[{id:l,path:0===e.structure[f].path.length?[e.structure[f].id]:Object(r.a)(e.structure[f].path),tag:u?"text":"div",text:u,textContent:"",properties:{}}],Object(r.a)(e.structure.slice(f+1))),currentId:d,currentBox:l});i(_t(t,p))}}},g=function(t,e,n,u){return function(i){if(t&&e){var s=o(e,n),f=a(e);if(!(f<0||s.includes(f))){var l=e.structure[f].id,d={},p=[l];if(u)d=Object(c.a)({},e,{structure:e.structure.filter(function(t){var e=l!==t.id&&!t.path.includes(l);return e||p.push(t.id),e})});else{var h=e.structure.map(function(t){return Object(c.a)({},t,{path:t.path.filter(function(t){return t!==l})})});d=Object(c.a)({},e,{structure:[].concat(Object(r.a)(h.slice(0,f)),Object(r.a)(h.slice(f+1)))})}i(_t(t,d)),i(function(t,e){return{type:"REMOVE_FROM_HOVERED_SIZES",currentResource:t,removedElements:e}}(t,p))}}}},_=function(t,e,n,i){return function(s){if(t&&e){var f=o(e,n),l=a(e);if(!(l<0||f.includes(l))){var d=e.structure[l].id,p=e.structure.filter(function(t){return t.path.includes(d)}),h="element_".concat(e.currentId),O={currentId:e.currentId+1};if(i){var E=Object(u.a)({},d,h),g=p.map(function(t){var e="element_".concat(O.currentId);return O.currentId+=1,E[t.id]=e,Object(c.a)({},t,{id:e})}).map(function(t){return Object(c.a)({},t,{path:t.path.map(function(t){return E[t]?E[t]:t})})});O=Object(c.a)({},e,O,{structure:[].concat(Object(r.a)(e.structure.slice(0,l+p.length)),[Object(c.a)({},e.structure[l],{id:h})],Object(r.a)(g),Object(r.a)(e.structure.slice(l+p.length)))})}else O=Object(c.a)({},e,O,{structure:[].concat(Object(r.a)(e.structure.slice(0,l+p.length)),[Object(c.a)({},e.structure[l],{id:h})],Object(r.a)(e.structure.slice(l+p.length)))});s(_t(t,O))}}}},b=function(t,e,n,u){return function(i){var o=a(u);if(!(o<0)){var s,f={currentId:u.currentId},l=u.structure[o].textContent,d=l.substr(0,t),p=l.substr(t,e-t),h=l.substr(e),O=[Object(c.a)({},u.structure[o],{textContent:d})];p.length>0&&(s="element_".concat(f.currentId),f.currentId=f.currentId+1,O.push(Object(c.a)({},u.structure[o],{textContent:p,id:s}))),(h.length>0||0===p.length)&&(s="element_".concat(f.currentId),f.currentId=f.currentId+1,O.push(Object(c.a)({},u.structure[o],{textContent:h,id:s}))),f=Object(c.a)({},u,f,{structure:[].concat(Object(r.a)(u.structure.slice(0,o)),O,Object(r.a)(u.structure.slice(o+1)))}),i(_t(n,f))}}},m=function(t,e,n,u){return function(i){var o=a(u);if(!(o<0)){var s,f={currentId:u.currentId},l=u.structure[o].textContent,d=l.substr(0,t),p=l.substr(t,e-t),h=l.substr(e),O=[Object(c.a)({},u.structure[o],{textContent:d})],E="element_".concat(f.currentId);f.currentId=f.currentId+1,O.push({id:E,path:Object(r.a)(u.structure[o].path),tag:"span",text:!1,textContent:"",style:[],styles:[]}),s="element_".concat(f.currentId),f.currentId=f.currentId+1,O.push(Object(c.a)({},u.structure[o],{path:[].concat(Object(r.a)(u.structure[o].path),[E]),textContent:p,id:s})),h.length>0&&(s="element_".concat(f.currentId),f.currentId=f.currentId+1,O.push(Object(c.a)({},u.structure[o],{textContent:h,id:s}))),f=Object(c.a)({},u,f,{structure:[].concat(Object(r.a)(u.structure.slice(0,o)),O,Object(r.a)(u.structure.slice(o+1)))}),i(_t(n,f))}}},S=function(t,e,n){return function(r){var u=e&&n[e]?Object(i.isEmpty)(n[e].present)?n[e].draft:n[e].present:null;u&&r(l("currentMenuItem",t,e,u,!0))}},v=function(t,e,n,r){return function(o){var s=n&&r[n]?Object(i.isEmpty)(r[n].present)?r[n].draft:r[n].present:null;if(s){var f=a(s);if(!(f<0)&&s.structure[f].menuItems){var d=s.structure[f].menuItems.map(function(n){return n.id===s.structure[f].currentMenuItem?Object(c.a)({},n,Object(u.a)({},t,e)):n});Object(i.isEqual)(d,s.structure[f].menuItems)||o(l("menuItems",d,n,s))}}}},I=function(t){return{type:"MARK_REFRESHING",refreshing:t}},R=function(t,e,n,u){return function(i){if(t&&e){var s=o(e,u),f=a(e);if(!(f<0||s.includes(f))){var l=e.structure[f].id,d=1,p=["element_0"],h=["element_0"],O=e.structure.filter(function(t){return t.id===l||t.path.includes(l)}).map(function(t){h.push(t.id);var e=Object(c.a)({},t,{id:"element_".concat(d)});return t.id===l?e.path=["element_0"]:e.path=["element_0"].concat(Object(r.a)(e.path.slice(e.path.indexOf(l)))),p.push(e.id),d++,e}).map(function(t){return Object(c.a)({},t,{path:t.path.map(function(t){return p[h.indexOf(t)]})})}),E={structure:[{id:"element_0",path:[],tag:"Main element",properties:{}}].concat(Object(r.a)(O)),currentId:d};i(it(n,"","plugin",!1,E,function(n){if(n.newResourceName){var u=Object(c.a)({},e,{structure:[].concat(Object(r.a)(e.structure.slice(0,f)),[Object(c.a)({},e.structure[f],{tag:n.newResourceName,text:!1,textContent:"",properties:{}})],Object(r.a)(e.structure.slice(f+1)))});i(_t(t,u))}}))}}}},j=function(t,e,n,u){return function(o){if(t&&e){var s=a(e);if(!(s<0)){e.structure[s].id;var f=n.find(function(t){return t.name===e.structure[s].tag});if(f){var l=Object(i.isEmpty)(u[f.id].present)?u[f.id].draft:u[f.id].present,d=e.currentId,p=[],h=[],O=l.structure.filter(function(t){return t.path.length>0}).map(function(t){h.push(t.id);var e=Object(c.a)({},t,{id:"element_".concat(d),path:Object(r.a)(t.path.slice(1))});return p.push(e.id),d++,e}).map(function(t){return Object(c.a)({},t,{path:[].concat(Object(r.a)(e.structure[s].path),Object(r.a)(t.path.map(function(t){return p[h.indexOf(t)]})))})}),E=Object(c.a)({},e,{currentId:d,structure:[].concat(Object(r.a)(e.structure.slice(0,s)),Object(r.a)(O),Object(r.a)(e.structure.slice(s+1)))});o(_t(t,E))}}}}},A=n(5),y=n.n(A),T=n(132),C=n(129),w=n.n(C),N=new T.a,U=function(t){return{type:"AUTH_SUCCESS",data:t}},L=function(t){return{type:"AUTH_FAIL",error:t}},D=function(){return function(t){return t({type:"ACTION_START"}),y.a.delete("/api/users").then(function(e){t(P()),t({type:"ACTION_SUCCESS"})}).catch(function(e){t({type:"ACTION_FAIL",error:e.message})})}},P=function(t){return t?y.a.post("/api/auth/logoutall").then(function(t){return N.remove("auth_token"),y.a.defaults.headers.common["x-auth-token"]=null,{type:"AUTH_LOGOUT"}}).catch(function(t){}):(N.remove("auth_token"),y.a.defaults.headers.common["x-auth-token"]=null,{type:"AUTH_LOGOUT"})},M=function(){return function(t){var e=N.get("auth_token"),n=w.a.decode(e);if(y.a.defaults.headers.post["Content-Type"]="application/json",y.a.defaults.headers.put["Content-Type"]="application/json",y.a.defaults.headers.delete["Content-Type"]="application/json",y.a.defaults.headers.common.Accept="application/json",console.log(n),console.log(e),e&&n)return y.a.defaults.headers.common["x-auth-token"]=e,console.log("try to login"),t({type:"AUTH_START"}),y.a.get("/api/users").then(function(e){localStorage.setItem("currentAction",e.data.currentAction),console.log("success"),t(U(Object(c.a)({},e.data,{_id:n._id}))),t(H(e.data))}).catch(function(e){console.log("fail"),t(L(e.message))});t(P())}},x=function(t,e){return{type:"CHANGE_BAR_SIZE",key:t,value:e}},G=function(t){return function(e){return y.a.put("/api/users",{barSizes:t}).then(function(t){}).catch(function(t){})}},V=function(t,e){return function(n){var r,u,c,i,a,o=window.innerWidth,s=window.innerHeight;if(e)switch(e.key){case"height":(r=e.value)<50&&(r=50),r>s-50&&(r=s-50),n(x("height",r));break;case"width":(r=e.value)<50&&(r=50),u=r-t.width,i=t.width2-u,a=t.width3,i<50&&(c=i-50,i=50,(a=t.width3+c)<50&&(a=50)),r+i+a+50>o&&(r=o-150,i=50,a=50),n(x("width",r)),n(x("width2",i)),n(x("width3",a));break;case"width2":i=e.value,r=t.width,(u=i-50)<0&&((r+=u)<50&&(r=50),c=r-t.width,a=t.width3-c,i=50),u=r+i-t.width-t.width2,(a=t.width3-u)<50&&(a=50),r+i+a+50>o&&(i=o-r-100),n(x("width",r)),n(x("width2",i)),n(x("width3",a));break;case"width3":a=e.value,r=t.width,i=t.width2,(u=a-50)<0&&((c=(i+=u)-50)<0&&((r+=c)<50&&(r=50),i=50),a=50),r+i+a+50>o&&(a=o-r-i-50),n(x("width",r)),n(x("width2",i)),n(x("width3",a))}else t.height>s-50&&n(x("height",s-50)),t.width>o-100&&n(x("width",o-100)),t.width+t.width2>o-50&&n(x("width2",o-t.width-50))}},H=function(t){return{type:"SAVE_ALL_WEBSITES_DATA_FROM_SERVER",data:t}},F=function(t,e){return function(n){return n(Z()),y.a.post("/api/websites",JSON.stringify(t&&e?{duplicate:t,currentWebsite:e}:{})).then(function(t){n(H(Object(c.a)({},t.data))),n(q())}).catch(function(t){n(X(t.message))})}},k=function(t){return function(e){if(t)return e(Z()),y.a.get("/api/websites/".concat(t)).then(function(t){e(H(Object(c.a)({},t.data))),e(q())}).catch(function(t){e(X(t.message))})}},z=function(t){return{type:"CHOOSE_WEBSITE",id:t}},B=function(t,e,n){return function(r){if(n)return r(Z()),y.a.put("/api/websites/".concat(n),JSON.stringify(Object(u.a)({},t,e))).then(function(t){r(H(t.data)),r(q())}).catch(function(t){r(X(t.message))})}},J=function(t){return function(e){if(t){if(!window.confirm("Are you sure you want to delete this website? All data in this website will be deleted including pages, files and plugins. However, your media files will not be removed."))return;return e(Z()),y.a.delete("/api/websites/".concat(t)).then(function(t){e(H(Object(c.a)({},t.data))),e(q())}).catch(function(t){e(X(t.message))})}}},W=function(t){return{type:"SIZE_IS_CHANGING",isChanging:t}},Z=function(){return{type:"ACTION_START"}},q=function(){return{type:"ACTION_SUCCESS"}},X=function(t){return{type:"ACTION_FAIL",error:t}},K=function(t){return{type:"SET_CURRENT_TOP_TAB",currentTopTab:t}},Q=function(t){return{type:"ACTION_FAIL_IMAGE_UPLOAD",error:t}},Y=function(t,e,n){return function(r){return y.a.put(e,t.file,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){r($(t,n))}).catch(function(t){r(Q(t.message))})}},$=function(t,e){return function(n){var u=parseFloat(t.file.size),c=t.storage+u,i=[{url:e,name:t.name,size:u,label:t.label}].concat(Object(r.a)(t.images));return y.a.put("/api/users",{storage:c,images:i}).then(function(t){n(tt(c,i)),n({type:"ACTION_SUCCESS_IMAGE_UPLOAD"})}).catch(function(t){n(Q(t.message))})}},tt=function(t,e){return{type:"SAVE_IMAGE_AND_SIZE_IN_REDUX",storage:t,images:e}},et=function(t){return function(e){return window.confirm("Are you sure you want to delete this image? The image will be unavailable after the deletion and will not be visible in all elements and on all pages of your websites.")?(e({type:"ACTION_START_IMAGE_UPLOAD"}),y.a.post("/api/awsImage/deleteimage",JSON.stringify({url:t})).then(function(t){e(tt(t.data.storage,t.data.images)),e({type:"ACTION_SUCCESS_IMAGE_UPLOAD"})}).catch(function(t){e(Q(t.message))})):void 0}},nt=function(t){return function(e){var n=window.prompt("Type a new name for the image.");return null!==n?(e({type:"ACTION_START_IMAGE_UPLOAD"}),y.a.post("/api/awsImage/renameimage",JSON.stringify({url:t,label:n})).then(function(t){e(tt(!1,t.data.images)),e({type:"ACTION_SUCCESS_IMAGE_UPLOAD"})}).catch(function(t){e(Q(t.message))})):void 0}},rt=function(t){return{type:"CHOOSE_IMAGE",image:t}},ut=function(t,e,n,r){return function(u){var c=t[0];return null==c?alert("No file selected."):"image"!==c.type.split("/")[0]?alert("File is not an image."):(u({type:"ACTION_START_IMAGE_UPLOAD"}),void u(function(t,e,n,r){return function(u){for(var c=r+"/"+t.name.replace(/([^a-zA-Z0-9\\.\\-])/g,"_"),i="",a=0;e.findIndex(function(t){return c+i===t.name})>=0;)i="_"+ ++a;var o={file:t,name:c+i,label:t.name+i,storage:n,images:e};return y.a.get("/api/sign-s3?file-name=".concat(c).concat(i,"&file-type=").concat(t.type,"&file-size=").concat(t.size)).then(function(t){u(Y(o,t.data.signedRequest,t.data.url))}).catch(function(t){u(Q(t.message)),400===t.response.status&&alert(t.response.data)})}}(c,e,n,r)))}},ct=n(127).create({objectHash:function(t){return t.id}}),it=function(t,e,n,r,u,c){return function(i){return i(Z()),y.a.post("/api/resources",JSON.stringify({websiteId:t,currentResourceId:e,duplicate:r,type:n,resourceData:u})).then(function(t){i(at(t.data,n)),c&&c(t.data),i(q())}).catch(function(t){i(X(t.message))})}},at=function(t,e){return Object(c.a)({type:"ADD_RESOURCE_SUCCESS"},t,{resourceType:e})},ot=function(t,e){return function(n){if(t&&window.confirm("Are you sure you want to delete this ".concat(e,"?")))return n(Z()),y.a.delete("/api/resources/".concat(t),{params:{type:e}}).then(function(t){n(st(t.data,e)),n(q())}).catch(function(t){n(X(t.message))})}},st=function(t,e){return Object(c.a)({type:"DELETE_RESOURCE_SUCCESS"},t,{resourceType:e})},ft=function(t,e,n,r){return function(u){u(Z());var c=ct.diff(n,e);if(c)return y.a.put("/api/websites/structure/".concat(t),JSON.stringify({structurePatch:c,type:r})).then(function(t){u(lt(e,r)),u(q())}).catch(function(t){u(X(t.message))});u(q())}},lt=function(t,e){return{type:"SAVE_RESOURCES_STRUCTURE_SUCCESS",structure:t,resourceType:e}},dt=function(t,e){return{type:"SET_CURRENT_RESOURCE",_id:t,resourceType:e}},pt=function(t,e,n,r){return function(u){var c=e[t].present,a=e[t].draft;if(!Object(i.isEqual)(c,{})){u(Z());var o=ct.diff(a,c);return y.a.put("/api/resources/".concat(t),JSON.stringify({resourcePatch:o,structure:n,type:r})).then(function(e){u(ht(t,c)),u(lt(n,r)),u(q())}).catch(function(t){u(X(t.message))})}}},ht=function(t,e){return{type:"SAVE_RESOURCE_IN_STATE",currentResource:t,draft:e}},Ot=function(t,e,n,r,u){return function(u){return u(Z()),y.a.put("/api/resources/publish/".concat(t),JSON.stringify({structure:e,type:n,revert:r})).then(function(r){u(lt(e,n)),r.data.draft&&(u(function(t,e){return{type:"SAVE_RESOURCE_DRAFT_IN_STATE",currentResource:t,draft:e}}(t,r.data.draft)),u(_t(t,r.data.draft)),u(gt(t))),u(q())}).catch(function(t){u(X(t.message))})}},Et=function(t,e){return function(n){n(_t(t,e[t].draft)),n(gt(t))}},gt=function(t){return{type:"REMOVE_RESOURCE_FROM_UNSAVED",currentResource:t}},_t=function(t,e,n){return{type:"ADD_RESOURCE_VERSION",currentResource:t,draft:e,isNotForHistory:n}},bt=function(){return{type:"UNDO_RESOURCE_VERSION"}},mt=function(){return{type:"REDO_RESOURCE_VERSION"}};n.d(e,"k",function(){return f}),n.d(e,"a",function(){return E}),n.d(e,"p",function(){return g}),n.d(e,"v",function(){return _}),n.d(e,"I",function(){return s}),n.d(e,"h",function(){return l}),n.d(e,"w",function(){return p}),n.d(e,"S",function(){return h}),n.d(e,"J",function(){return d}),n.d(e,"O",function(){return b}),n.d(e,"P",function(){return m}),n.d(e,"m",function(){return S}),n.d(e,"i",function(){return v}),n.d(e,"A",function(){return I}),n.d(e,"B",function(){return R}),n.d(e,"u",function(){return j}),n.d(e,"Q",function(){return O}),n.d(e,"z",function(){return P}),n.d(e,"e",function(){return M}),n.d(e,"s",function(){return D}),n.d(e,"f",function(){return V}),n.d(e,"g",function(){return x}),n.d(e,"H",function(){return G}),n.d(e,"d",function(){return F}),n.d(e,"y",function(){return k}),n.d(e,"t",function(){return J}),n.d(e,"N",function(){return W}),n.d(e,"o",function(){return z}),n.d(e,"j",function(){return B}),n.d(e,"G",function(){return H}),n.d(e,"M",function(){return K}),n.d(e,"x",function(){return ut}),n.d(e,"q",function(){return et}),n.d(e,"E",function(){return nt}),n.d(e,"l",function(){return rt}),n.d(e,"L",function(){return ft}),n.d(e,"b",function(){return it}),n.d(e,"r",function(){return ot}),n.d(e,"n",function(){return dt}),n.d(e,"K",function(){return pt}),n.d(e,"C",function(){return Ot}),n.d(e,"F",function(){return Et}),n.d(e,"c",function(){return _t}),n.d(e,"R",function(){return bt}),n.d(e,"D",function(){return mt})},55:function(t,e,n){t.exports={Loader:"Spinner_Loader__1JLaC",load3:"Spinner_load3__3S5yS",Cover:"Spinner_Cover__3GZfV"}},76:function(t,e,n){"use strict";n.d(e,"b",function(){return u}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return o});var r=n(7),u=function(t){if(t===t.toUpperCase()&&t!==t.toLowerCase())return!0},c=function(t,e){return e[t]?Object(r.isEmpty)(e[t].present)?e[t].draft:e[t].present:null};function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){if(null==t)return{};var n,r,u=function(t,e){if(null==t)return{};var n,r,u={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(u[n]=t[n]);return u}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(u[n]=t[n])}return u}function o(t){var e=function e(n){n.path;return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){i(t,e,n[e])})}return t}({},a(n,["path"]),{children:t.filter(function(t){return t.path[t.path.length-1]===n.id}).map(function(t){return e(t)})})};return t.filter(function(t){return 0===t.path.length}).map(function(t){return e(t)})}},84:function(t,e,n){"use strict";var r=n(30),u=n(31),c=n(34),i=n(32),a=n(33),o=n(0),s=n.n(o),f=n(274),l=n(25),d=n(26),p=function(t){function e(){return Object(r.a)(this,e),Object(c.a)(this,Object(i.a)(e).apply(this,arguments))}return Object(a.a)(e,t),Object(u.a)(e,[{key:"componentDidMount",value:function(){this.props.onLogout()}},{key:"render",value:function(){return s.a.createElement(f.a,{to:"/login"})}}]),e}(o.Component);e.a=Object(l.b)(null,function(t){return{onLogout:function(){return t(d.z())}}})(p)}},[[135,1,3]]]);
//# sourceMappingURL=main.3749c201.chunk.js.map