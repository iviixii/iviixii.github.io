import{l as u,o as g,ɵ as x,a as v,c as h,p as r,d as m,q as i,A as y,r as b,N as A,D as C,f as c,g as l,h as o,b as k,j as s,k as p,s as w}from"./index-DVFtmrdB.js";function _(e){return u().find(t=>(console.log({contentFile:t}),t.filename===`/src/content/${e.params.slug}.md`||t.slug===e.params.slug)).attributes}const I=e=>_(e).title,M=e=>{const n=_(e);return[{name:"description",content:n.teaser},{name:"author",content:"Analog Team"},{property:"og:title",content:n.title},{property:"og:description",content:n.teaser}]};function j(e,n){if(e&1&&(c(0,"div")(1,"h1",1),l(2),o(),c(3,"time",2),r(4,"date"),l(5),r(6,"date"),o(),k(7,"analog-markdown",3),o()),e&2){const t=n.ngIf;s(2),p(" ",t.attributes.title," "),s(),w("datetime",i(4,4,t.attributes.date)),s(2),p(" ",i(6,6,t.attributes.date),""),s(2),m("content",t.content)}}const $={title:I,meta:M},a=class a{constructor(){this.post$=g(),console.log(this.post$)}};a.ɵfac=function(t){return new(t||a)},a.ɵcmp=x({type:a,selectors:[["ng-component"]],hostAttrs:[1,"max-w-screen-md","relative","py-6","lg:gap-10","lg:py-8"],standalone:!0,features:[v],decls:2,vars:3,consts:[[4,"ngIf"],[1,"mt-6","text-4xl","font-bold","tracking-tight","sm:text-5xl"],[1,"order-first","flex","items-center","text-base","text-rose-500"],[1,"pt-8","!max-w-screen-lg","sm:pt-12","prose","dark:prose-invert",3,"content"]],template:function(t,f){t&1&&(h(0,j,8,8,"div",0),r(1,"async")),t&2&&m("ngIf",i(1,1,f.post$))},dependencies:[y,b,A,C],encapsulation:2});let d=a;export{d as default,$ as routeMeta};
