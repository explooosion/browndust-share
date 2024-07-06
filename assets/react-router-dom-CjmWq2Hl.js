import{r,a as T}from"./react-CWupyEIp.js";import"./react-dom-VCwjLMmb.js";import{R as p}from"./react-router-D0a0eGYo.js";import{c as w}from"./@remix-run-ByPv_JRW.js";/**
 * React Router DOM v6.24.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const F="6";try{window.__reactRouterVersion=F}catch{}const U="startTransition",l=T[U];function _(t){let{basename:S,children:R,future:n,window:f}=t,s=r.useRef();s.current==null&&(s.current=w({window:f,v5Compat:!0}));let e=s.current,[o,i]=r.useState({action:e.action,location:e.location}),{v7_startTransition:a}=n||{},c=r.useCallback(u=>{a&&l?l(()=>i(u)):i(u)},[i,a]);return r.useLayoutEffect(()=>e.listen(c),[e,c]),r.createElement(p,{basename:S,children:R,location:o.location,navigationType:o.action,navigator:e,future:n})}var m;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(m||(m={}));var h;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(h||(h={}));export{_ as H};
