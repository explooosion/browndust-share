import{r as n}from"./react-CWupyEIp.js";import{c as y}from"./clsx-CH7BE6MN.js";import{m as C}from"./react-merge-refs-BIBY5Z5W.js";import{n as L}from"./nanoid-Cpg-fJ3N.js";const D={pointerEvents:"none"},g=({locked:e,style:t})=>e?{...D,...t}:t,I=e=>n.useMemo(()=>{if(e){let t="icon";e.type==="img"?t="image":e.type==="svg"&&(t="svg");const s=new RegExp(`\\b${t}\\b`);return{iconType:e.props["data-type"]||t,icon:e.props.className&&!s.test(e.props.className)?n.cloneElement(e,{...e.props,className:y(e.props.className,t)}):e}}return{}},[e]),F=(e,t)=>t?!1:!e||e==="smooth"||e==="pulse",R=(e,t)=>{const{animation:s,bigger:c,locked:r,plain:a,shape:o,variant:d,iconType:l,hasFocus:i}=e;return{"p-default":!t&&F(s,l),"p-bigger":c,"p-locked":r,"p-plain":a,"p-has-focus":i,[`p-${s}`]:s,[`p-${o}`]:o,[`p-${d}`]:d,[`p-${l}`]:l}},S=e=>typeof e=="boolean",b=e=>e==null,U=e=>e==="indeterminate",x=e=>{let{checked:t,state:s,setState:c,value:r,defaultValue:a,...o}=e;return c&&((S(s)||U(s))&&!S(t)&&b(t)?t=!!s:Array.isArray(s)?t=s.includes(r):b(t)&&(t=Object.is(s,r)),b(r)&&(r=a||"")),{checked:t,value:r,state:s,...o}},j="pcr_",B=()=>n.useRef(j+L(8)).current,T=e=>{const t=B(),{locked:s,color:c,variant:r,animation:a,children:o,style:d,id:l=t,className:i,bigger:u,hasFocus:p,...m}=e;return{locked:s,color:c,variant:r,animation:a,children:o,id:l,className:i,bigger:u,style:d,hasFocus:p,htmlProps:m}},$=e=>{const{shape:t,plain:s,icon:c,indeterminate:r,hasFocus:a,...o}=e;return{shape:t,plain:s,icon:c,indeterminate:r,...T(o)}},k=({color:e,icon:t,id:s,children:c,...r})=>n.createElement("div",{className:y("state",e&&`p-${e}`),...r},t,n.createElement("label",{htmlFor:s},c));k.displayName="State";const M=({checked:e,state:t,indeterminate:s})=>{const[c,r]=n.useState(!1),a=n.useRef(null);return n.useEffect(()=>{t!==void 0&&a.current&&r(t==="indeterminate")},[t]),n.useEffect(()=>{t!=="indeterminate"&&a.current&&typeof s<"u"&&(a.current.checked=s,r(s))},[s,t]),{ref:a,"aria-checked":c?"mixed":e}},O=n.forwardRef((e,t)=>{const{checked:s,value:c,state:r,...a}=x(e),{children:o,locked:d,color:l,id:i,className:u,style:p,indeterminate:m,icon:f,htmlProps:h}=$(a),{ref:E,...v}=M({state:r,checked:s,indeterminate:m}),N=g({locked:d,style:p}),{icon:A,iconType:P}=I(f);return n.createElement("div",{style:N,className:y("pretty",R({...e,iconType:P}),u)},n.createElement("input",{ref:C([t,E]),value:c,type:"checkbox",id:i,checked:s,...v,...h}),n.createElement(k,{id:i,icon:A,color:l},o))});O.displayName="Checkbox";const V=n.forwardRef((e,t)=>{const{checked:s,value:c,state:r,...a}=x(e),{shape:o="round",children:d,locked:l,color:i,id:u,className:p,style:m,icon:f,htmlProps:h}=$(a),E=g({locked:l,style:m}),{icon:v,iconType:N}=I(f);return n.createElement("div",{style:E,className:y("pretty",R({...e,shape:o,iconType:N}),p)},n.createElement("input",{ref:t,value:c,type:"radio",id:u,checked:s,...h}),n.createElement(k,{id:u,icon:v,color:i},d))});V.displayName="Radio";const w=e=>{e.currentTarget.setAttribute("aria-checked",e.currentTarget.checked+"")},X=({setState:e,checked:t})=>{const s=n.useRef(null);return n.useEffect(()=>{const c=s.current;let r=!1;return!e&&!t&&c&&(c.setAttribute("aria-checked",c.checked+""),c.addEventListener("change",w),r=!0),()=>{r&&c&&c.removeEventListener("change",w)}},[e,t]),s},_=n.forwardRef((e,t)=>{const{checked:s,value:c,state:r,...a}=x(e),{children:o,locked:d,color:l,id:i,className:u,style:p,htmlProps:m}=T(a),f=g({locked:d,style:p}),h=X({setState:e.setState,checked:s});return n.createElement("div",{style:f,className:y("pretty","p-switch",R(e,!0),u)},n.createElement("input",{ref:C([t,h]),type:"checkbox",role:"switch",value:c,id:i,"aria-checked":s,checked:s,...m}),n.createElement(k,{id:i,color:l},o))});_.displayName="Switch";export{O as C,V as R};
