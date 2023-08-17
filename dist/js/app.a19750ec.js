(function(){"use strict";var e={9632:function(e,t,o){var n=o(9242),l=o(3396),r=o(7139);const u={id:"app",class:"todoapp"},i={class:"header"},a=(0,l._)("h1",null,"todos",-1),c={class:"main"},d=(0,l._)("label",{for:"toggle-all"},"Mark all as complete",-1),s={class:"todo-list"},p={class:"view"},f=["onUpdate:modelValue"],v=["onDblclick"],m=["onClick"],h=["onUpdate:modelValue","onKeyup","onBlur"],g={class:"footer"},w={class:"todo-count"},_=(0,l._)("ul",{class:"filters"},[(0,l._)("li",null,[(0,l._)("a",{href:"#/all"},"All")]),(0,l._)("li",null,[(0,l._)("a",{href:"#/active"},"Active")]),(0,l._)("li",null,[(0,l._)("a",{href:"#/completed"},"Completed")])],-1),y=(0,l._)("footer",{class:"info"},[(0,l._)("p",null,"keyup 'Enter' to create a ToDo"),(0,l._)("p",null,"Double-click to edit a ToDo"),(0,l._)("p",null,"Created by Romy")],-1);function b(e,t,o,b,x,C){const k=(0,l.Q2)("editing-focus");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("section",u,[(0,l._)("header",i,[a,(0,l.wy)((0,l._)("input",{class:"new-todo",placeholder:"What needs to be done?",autocomplete:"off",autofocus:"","onUpdate:modelValue":t[0]||(t[0]=t=>e.input=t),onKeyup:t[1]||(t[1]=(0,n.D2)(((...t)=>e.addTodo&&e.addTodo(...t)),["enter"]))},null,544),[[n.nr,e.input]])]),(0,l.wy)((0,l._)("section",c,[(0,l.wy)((0,l._)("input",{id:"toggle-all",class:"toggle-all",type:"checkbox","onUpdate:modelValue":t[2]||(t[2]=t=>e.alldone=t)},null,512),[[n.e8,e.alldone]]),d,(0,l._)("ul",s,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.filteredTodos,(t=>((0,l.wg)(),(0,l.iD)("li",{key:t,class:(0,r.C_)({editing:t===e.editingTodo,completed:t.completed})},[(0,l._)("div",p,[(0,l.wy)((0,l._)("input",{class:"toggle",type:"checkbox","onUpdate:modelValue":e=>t.completed=e},null,8,f),[[n.e8,t.completed]]),(0,l._)("label",{onDblclick:o=>e.editTodo(t)},(0,r.zw)(t.text),41,v),(0,l._)("button",{class:"destroy",onClick:e=>b.remove(t)},null,8,m)]),(0,l.wy)((0,l._)("input",{class:"edit",type:"text","onUpdate:modelValue":e=>t.text=e,onKeyup:[(0,n.D2)((o=>e.doneEdit(t)),["enter"]),(0,n.D2)((o=>e.cancelEdit(t)),["esc"])],onBlur:o=>e.doneEdit(t)},null,40,h),[[k,t===e.editingTodo],[n.nr,t.text]])],2)))),128))])],512),[[n.F8,e.count]]),(0,l.wy)((0,l._)("footer",g,[(0,l._)("span",w,[(0,l._)("strong",null,(0,r.zw)(e.remainingCount),1),(0,l.Uk)(" "+(0,r.zw)(e.remainingCount>1?"items":"item")+" left ",1)]),_,(0,l.wy)((0,l._)("button",{class:"clear-completed",onClick:t[3]||(t[3]=(...e)=>b.removeCompleted&&b.removeCompleted(...e))}," Clear completed ",512),[[n.F8,e.count>e.remainingCount]])],512),[[n.F8,e.count]])]),y],64)}var x=o(4870);function C(e){let t;try{t=JSON.parse(e)}catch{t=null}return t}function k(e){let t;try{t=JSON.stringify(e)}catch{t=null}return t}function O(){function e(e,t){t=k(t),window.localStorage.setItem(e,t)}function t(e){let t=window.localStorage.getItem(e);return t&&(t=C(t)),t}return{setItem:e,getItem:t}}const T=O(),D=e=>{const t=(0,x.iH)(""),o=()=>{const o=t.value&&t.value.trim();0!==o.length&&(e.value.unshift({text:o,completed:!1}),t.value="")};return{input:t,addTodo:o}},E=e=>{const t=t=>{const o=e.value.indexOf(t);e.value.splice(o,1)},o=()=>{e.value=e.value.filter((e=>!e.completed))};return{remove:t,removeCompleted:o}},F=e=>{let t="";const o=(0,x.iH)(null),n=e=>{t=e.text,o.value=e},l=t=>{o.value&&(t.text=t.text.trim(),t.text||e(t),o.value=null)},r=e=>{o.value=null,e.text=t};return{editingTodo:o,editTodo:n,doneEdit:l,cancelEdit:r}},U=e=>{const t=(0,l.Fl)({get(){return!e.value.filter((e=>!e.completed)).length},set(t){e.value.forEach((e=>{e.completed=t}))}}),o={all:e=>e,active:e=>e.filter((e=>!e.completed)),completed:e=>e.filter((e=>e.completed))},n=(0,x.iH)("all"),r=(0,l.Fl)((()=>o[n.value](e.value))),u=(0,l.Fl)((()=>o.active(e.value).length)),i=(0,l.Fl)((()=>e.value.length)),a=()=>{const e=window.location.hash.replace("#/","");o[e]?n.value=e:(n.value="all",window.location.hash="")};return(0,l.bv)((()=>{window.addEventListener("hashchange",a),a()})),(0,l.Ah)((()=>{window.removeEventListener("hashchange",a)})),{alldone:t,filteredTodos:r,remainingCount:u,count:i}},j=()=>{const e="TODOKEY",t=(0,x.iH)(T.getItem(e)||[]);return(0,l.m0)((()=>{T.setItem(e,t.value)})),t};var H={name:"App",setup(){const e=j(),{remove:t,removeCompleted:o}=E(e);return{todos:e,remove:t,removeCompleted:o,...D(e),...F(t),...U(e)}},directives:{editingFocus:(e,t)=>{t.value&&e.focus()}}},I=o(89);const V=(0,I.Z)(H,[["render",b]]);var K=V;(0,n.ri)(K).mount("#app")}},t={};function o(n){var l=t[n];if(void 0!==l)return l.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,n,l,r){if(!n){var u=1/0;for(d=0;d<e.length;d++){n=e[d][0],l=e[d][1],r=e[d][2];for(var i=!0,a=0;a<n.length;a++)(!1&r||u>=r)&&Object.keys(o.O).every((function(e){return o.O[e](n[a])}))?n.splice(a--,1):(i=!1,r<u&&(u=r));if(i){e.splice(d--,1);var c=l();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[n,l,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,r,u=n[0],i=n[1],a=n[2],c=0;if(u.some((function(t){return 0!==e[t]}))){for(l in i)o.o(i,l)&&(o.m[l]=i[l]);if(a)var d=a(o)}for(t&&t(n);c<u.length;c++)r=u[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},n=self["webpackChunkvue3_todolist"]=self["webpackChunkvue3_todolist"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(9632)}));n=o.O(n)})();
//# sourceMappingURL=app.a19750ec.js.map