import{r as N,j as o}from"./app-UY-xmw4i.js";import{B as z}from"./Box-DExSmgpt.js";import{p as B,t as E,B as D,x as v,A as l,c as i,C as _,z as I,_ as U,n as w,o as F}from"./Footer-DUCruhVE.js";function K(r){return B("MuiCircularProgress",r)}E("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const W=["className","color","disableShrink","size","style","thickness","value","variant"];let d=r=>r,P,S,b,$;const t=44,A=D(P||(P=d`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),G=D(S||(S=d`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),L=r=>{const{classes:e,variant:s,color:a,disableShrink:u}=r,m={root:["root",s,`color${l(a)}`],svg:["svg"],circle:["circle",`circle${l(s)}`,u&&"circleDisableShrink"]};return F(m,K,e)},T=v("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${l(s.color)}`]]}})(({ownerState:r,theme:e})=>i({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&_(b||(b=d`
      animation: ${0} 1.4s linear infinite;
    `),A)),V=v("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),Z=v("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,e[`circle${l(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>i({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&_($||($=d`
      animation: ${0} 1.4s ease-in-out infinite;
    `),G)),q=N.forwardRef(function(e,s){const a=I({props:e,name:"MuiCircularProgress"}),{className:u,color:m="primary",disableShrink:j=!1,size:p=40,style:M,thickness:n=3.6,value:f=0,variant:g="indeterminate"}=a,R=U(a,W),c=i({},a,{color:m,disableShrink:j,size:p,thickness:n,value:f,variant:g}),h=L(c),x={},k={},C={};if(g==="determinate"){const y=2*Math.PI*((t-n)/2);x.strokeDasharray=y.toFixed(3),C["aria-valuenow"]=Math.round(f),x.strokeDashoffset=`${((100-f)/100*y).toFixed(3)}px`,k.transform="rotate(-90deg)"}return o.jsx(T,i({className:w(h.root,u),style:i({width:p,height:p},k,M),ownerState:c,ref:s,role:"progressbar"},C,R,{children:o.jsx(V,{className:h.svg,ownerState:c,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:o.jsx(Z,{className:h.circle,style:x,ownerState:c,cx:t,cy:t,r:(t-n)/2,fill:"none",strokeWidth:n})})}))});function Q(){return o.jsx(z,{sx:{display:"flex"},children:o.jsx(q,{sx:{color:"#34495E"}})})}export{Q as C};
