import{r as y}from"./react-CWupyEIp.js";var E={exports:{}},m={};/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c=y;function V(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var h=typeof Object.is=="function"?Object.is:V,w=c.useSyncExternalStore,g=c.useRef,j=c.useEffect,O=c.useMemo,W=c.useDebugValue;m.useSyncExternalStoreWithSelector=function(e,t,v,a,i){var n=g(null);if(n.current===null){var u={hasValue:!1,value:null};n.current=u}else u=n.current;n=O(function(){function p(r){if(!S){if(S=!0,f=r,r=a(r),i!==void 0&&u.hasValue){var o=u.value;if(i(o,r))return s=o}return s=r}if(o=s,h(f,r))return o;var d=a(r);return i!==void 0&&i(o,d)?o:(f=r,s=d)}var S=!1,f,s,x=v===void 0?null:v;return[function(){return p(t())},x===null?void 0:function(){return p(x())}]},[t,v,a,i]);var l=w(e,n[0],n[1]);return j(function(){u.hasValue=!0,u.value=l},[l]),W(l),l};E.exports=m;var k=E.exports;export{k as w};
