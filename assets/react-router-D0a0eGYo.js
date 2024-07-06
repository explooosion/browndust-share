import{r as e}from"./react-CWupyEIp.js";import{A as b,i as d,p as y,s as O}from"./@remix-run-ByPv_JRW.js";/**
 * React Router v6.24.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function l(){return l=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(r[t]=a[t])}return r},l.apply(this,arguments)}const j=e.createContext(null),P=e.createContext(null);function E(){return e.useContext(P)!=null}function A(r){let{basename:n="/",children:a=null,location:t,navigationType:i=b.Pop,navigator:s,static:u=!1,future:c}=r;E()&&d(!1);let o=n.replace(/^\/*/,"/"),C=e.useMemo(()=>({basename:o,navigator:s,static:u,future:l({v7_relativeSplatPath:!1},c)}),[o,c,s,u]);typeof t=="string"&&(t=y(t));let{pathname:p="/",search:f="",hash:m="",state:v=null,key:h="default"}=t,g=e.useMemo(()=>{let x=O(p,o);return x==null?null:{location:{pathname:x,search:f,hash:m,state:v,key:h},navigationType:i}},[o,p,f,m,v,h,i]);return g==null?null:e.createElement(j.Provider,{value:C},e.createElement(P.Provider,{children:a,value:g}))}new Promise(()=>{});export{A as R};
