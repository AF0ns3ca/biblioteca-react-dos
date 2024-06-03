import{c as X,_ as te,n as E,t as be,B as ne,x as oe,z as ge,M as Ie,p as Oe,G as ce,O as Ue,K as H,o as ze}from"./Footer-Bk8_I_xS.js";import{R as A,r as l,j as F}from"./app-4-9hqyk0.js";function Z(e,n){return Z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(s,a){return s.__proto__=a,s},Z(e,n)}function Ke(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,Z(e,n)}const pe=A.createContext(null);function Ae(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ie(e,n){var s=function(t){return n&&l.isValidElement(t)?n(t):t},a=Object.create(null);return e&&l.Children.map(e,function(o){return o}).forEach(function(o){a[o.key]=s(o)}),a}function Xe(e,n){e=e||{},n=n||{};function s(f){return f in n?n[f]:e[f]}var a=Object.create(null),o=[];for(var t in e)t in n?o.length&&(a[t]=o,o=[]):o.push(t);var i,c={};for(var u in n){if(a[u])for(i=0;i<a[u].length;i++){var p=a[u][i];c[a[u][i]]=s(p)}c[u]=s(u)}for(i=0;i<o.length;i++)c[o[i]]=s(o[i]);return c}function j(e,n,s){return s[n]!=null?s[n]:e.props[n]}function Ye(e,n){return ie(e.children,function(s){return l.cloneElement(s,{onExited:n.bind(null,s),in:!0,appear:j(s,"appear",e),enter:j(s,"enter",e),exit:j(s,"exit",e)})})}function We(e,n,s){var a=ie(e.children),o=Xe(n,a);return Object.keys(o).forEach(function(t){var i=o[t];if(l.isValidElement(i)){var c=t in n,u=t in a,p=n[t],f=l.isValidElement(p)&&!p.props.in;u&&(!c||f)?o[t]=l.cloneElement(i,{onExited:s.bind(null,i),in:!0,exit:j(i,"exit",e),enter:j(i,"enter",e)}):!u&&c&&!f?o[t]=l.cloneElement(i,{in:!1}):u&&c&&l.isValidElement(p)&&(o[t]=l.cloneElement(i,{onExited:s.bind(null,i),in:p.props.in,exit:j(i,"exit",e),enter:j(i,"enter",e)}))}}),o}var He=Object.values||function(e){return Object.keys(e).map(function(n){return e[n]})},Ge={component:"div",childFactory:function(n){return n}},re=function(e){Ke(n,e);function n(a,o){var t;t=e.call(this,a,o)||this;var i=t.handleExited.bind(Ae(t));return t.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},t}var s=n.prototype;return s.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},s.componentWillUnmount=function(){this.mounted=!1},n.getDerivedStateFromProps=function(o,t){var i=t.children,c=t.handleExited,u=t.firstRender;return{children:u?Ye(o,c):We(o,i,c),firstRender:!1}},s.handleExited=function(o,t){var i=ie(this.props.children);o.key in i||(o.props.onExited&&o.props.onExited(t),this.mounted&&this.setState(function(c){var u=X({},c.children);return delete u[o.key],{children:u}}))},s.render=function(){var o=this.props,t=o.component,i=o.childFactory,c=te(o,["component","childFactory"]),u=this.state.contextValue,p=He(this.state.children).map(i);return delete c.appear,delete c.enter,delete c.exit,t===null?A.createElement(pe.Provider,{value:u},p):A.createElement(pe.Provider,{value:u},A.createElement(t,c,p))},n}(A.Component);re.propTypes={};re.defaultProps=Ge;function qe(e){const{className:n,classes:s,pulsate:a=!1,rippleX:o,rippleY:t,rippleSize:i,in:c,onExited:u,timeout:p}=e,[f,g]=l.useState(!1),b=E(n,s.ripple,s.rippleVisible,a&&s.ripplePulsate),T={width:i,height:i,top:-(i/2)+t,left:-(i/2)+o},h=E(s.child,f&&s.childLeaving,a&&s.childPulsate);return!c&&!f&&g(!0),l.useEffect(()=>{if(!c&&u!=null){const R=setTimeout(u,p);return()=>{clearTimeout(R)}}},[u,c,p]),F.jsx("span",{className:b,style:T,children:F.jsx("span",{className:h})})}const m=be("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Je=["center","classes","className"];let G=e=>e,de,fe,he,me;const ee=550,Qe=80,Ze=ne(de||(de=G`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),et=ne(fe||(fe=G`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),tt=ne(he||(he=G`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),nt=oe("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),ot=oe(qe,{name:"MuiTouchRipple",slot:"Ripple"})(me||(me=G`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),m.rippleVisible,Ze,ee,({theme:e})=>e.transitions.easing.easeInOut,m.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,m.child,m.childLeaving,et,ee,({theme:e})=>e.transitions.easing.easeInOut,m.childPulsate,tt,({theme:e})=>e.transitions.easing.easeInOut),it=l.forwardRef(function(n,s){const a=ge({props:n,name:"MuiTouchRipple"}),{center:o=!1,classes:t={},className:i}=a,c=te(a,Je),[u,p]=l.useState([]),f=l.useRef(0),g=l.useRef(null);l.useEffect(()=>{g.current&&(g.current(),g.current=null)},[u]);const b=l.useRef(!1),T=Ie(),h=l.useRef(null),R=l.useRef(null),I=l.useCallback(d=>{const{pulsate:M,rippleX:y,rippleY:L,rippleSize:$,cb:U}=d;p(x=>[...x,F.jsx(ot,{classes:{ripple:E(t.ripple,m.ripple),rippleVisible:E(t.rippleVisible,m.rippleVisible),ripplePulsate:E(t.ripplePulsate,m.ripplePulsate),child:E(t.child,m.child),childLeaving:E(t.childLeaving,m.childLeaving),childPulsate:E(t.childPulsate,m.childPulsate)},timeout:ee,pulsate:M,rippleX:y,rippleY:L,rippleSize:$},f.current)]),f.current+=1,g.current=U},[t]),N=l.useCallback((d={},M={},y=()=>{})=>{const{pulsate:L=!1,center:$=o||M.pulsate,fakeElement:U=!1}=M;if((d==null?void 0:d.type)==="mousedown"&&b.current){b.current=!1;return}(d==null?void 0:d.type)==="touchstart"&&(b.current=!0);const x=U?null:R.current,B=x?x.getBoundingClientRect():{width:0,height:0,left:0,top:0};let v,D,w;if($||d===void 0||d.clientX===0&&d.clientY===0||!d.clientX&&!d.touches)v=Math.round(B.width/2),D=Math.round(B.height/2);else{const{clientX:S,clientY:P}=d.touches&&d.touches.length>0?d.touches[0]:d;v=Math.round(S-B.left),D=Math.round(P-B.top)}if($)w=Math.sqrt((2*B.width**2+B.height**2)/3),w%2===0&&(w+=1);else{const S=Math.max(Math.abs((x?x.clientWidth:0)-v),v)*2+2,P=Math.max(Math.abs((x?x.clientHeight:0)-D),D)*2+2;w=Math.sqrt(S**2+P**2)}d!=null&&d.touches?h.current===null&&(h.current=()=>{I({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:y})},T.start(Qe,()=>{h.current&&(h.current(),h.current=null)})):I({pulsate:L,rippleX:v,rippleY:D,rippleSize:w,cb:y})},[o,I,T]),O=l.useCallback(()=>{N({},{pulsate:!0})},[N]),_=l.useCallback((d,M)=>{if(T.clear(),(d==null?void 0:d.type)==="touchend"&&h.current){h.current(),h.current=null,T.start(0,()=>{_(d,M)});return}h.current=null,p(y=>y.length>0?y.slice(1):y),g.current=M},[T]);return l.useImperativeHandle(s,()=>({pulsate:O,start:N,stop:_}),[O,N,_]),F.jsx(nt,X({className:E(m.root,t.root,i),ref:R},c,{children:F.jsx(re,{component:null,exit:!0,children:u})}))});function rt(e){return Oe("MuiButtonBase",e)}const st=be("MuiButtonBase",["root","disabled","focusVisible"]),at=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],lt=e=>{const{disabled:n,focusVisible:s,focusVisibleClassName:a,classes:o}=e,i=ze({root:["root",n&&"disabled",s&&"focusVisible"]},rt,o);return s&&a&&(i.root+=` ${a}`),i},ut=oe("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,n)=>n.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${st.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),ft=l.forwardRef(function(n,s){const a=ge({props:n,name:"MuiButtonBase"}),{action:o,centerRipple:t=!1,children:i,className:c,component:u="button",disabled:p=!1,disableRipple:f=!1,disableTouchRipple:g=!1,focusRipple:b=!1,LinkComponent:T="a",onBlur:h,onClick:R,onContextMenu:I,onDragLeave:N,onFocus:O,onFocusVisible:_,onKeyDown:d,onKeyUp:M,onMouseDown:y,onMouseLeave:L,onMouseUp:$,onTouchEnd:U,onTouchMove:x,onTouchStart:B,tabIndex:v=0,TouchRippleProps:D,touchRippleRef:w,type:S}=a,P=te(a,at),z=l.useRef(null),C=l.useRef(null),Re=ce(C,w),{isFocusVisibleRef:se,onFocus:Me,onBlur:ye,ref:xe}=Ue(),[k,Y]=l.useState(!1);p&&k&&Y(!1),l.useImperativeHandle(o,()=>({focusVisible:()=>{Y(!0),z.current.focus()}}),[]);const[q,Ce]=l.useState(!1);l.useEffect(()=>{Ce(!0)},[]);const Ee=q&&!f&&!p;l.useEffect(()=>{k&&b&&!f&&q&&C.current.pulsate()},[f,b,k,q]);function V(r,le,$e=g){return H(ue=>(le&&le(ue),!$e&&C.current&&C.current[r](ue),!0))}const Te=V("start",y),ve=V("stop",I),Pe=V("stop",N),Ve=V("stop",$),Be=V("stop",r=>{k&&r.preventDefault(),L&&L(r)}),De=V("start",B),we=V("stop",U),Le=V("stop",x),Se=V("stop",r=>{ye(r),se.current===!1&&Y(!1),h&&h(r)},!1),ke=H(r=>{z.current||(z.current=r.currentTarget),Me(r),se.current===!0&&(Y(!0),_&&_(r)),O&&O(r)}),J=()=>{const r=z.current;return u&&u!=="button"&&!(r.tagName==="A"&&r.href)},Q=l.useRef(!1),je=H(r=>{b&&!Q.current&&k&&C.current&&r.key===" "&&(Q.current=!0,C.current.stop(r,()=>{C.current.start(r)})),r.target===r.currentTarget&&J()&&r.key===" "&&r.preventDefault(),d&&d(r),r.target===r.currentTarget&&J()&&r.key==="Enter"&&!p&&(r.preventDefault(),R&&R(r))}),Fe=H(r=>{b&&r.key===" "&&C.current&&k&&!r.defaultPrevented&&(Q.current=!1,C.current.stop(r,()=>{C.current.pulsate(r)})),M&&M(r),R&&r.target===r.currentTarget&&J()&&r.key===" "&&!r.defaultPrevented&&R(r)});let W=u;W==="button"&&(P.href||P.to)&&(W=T);const K={};W==="button"?(K.type=S===void 0?"button":S,K.disabled=p):(!P.href&&!P.to&&(K.role="button"),p&&(K["aria-disabled"]=p));const Ne=ce(s,xe,z),ae=X({},a,{centerRipple:t,component:u,disabled:p,disableRipple:f,disableTouchRipple:g,focusRipple:b,tabIndex:v,focusVisible:k}),_e=lt(ae);return F.jsxs(ut,X({as:W,className:E(_e.root,c),ownerState:ae,onBlur:Se,onClick:R,onContextMenu:ve,onFocus:ke,onKeyDown:je,onKeyUp:Fe,onMouseDown:Te,onMouseLeave:Be,onMouseUp:Ve,onDragLeave:Pe,onTouchEnd:we,onTouchMove:Le,onTouchStart:De,ref:Ne,tabIndex:p?-1:v,type:S},K,P,{children:[i,Ee?F.jsx(it,X({ref:Re,center:t},D)):null]}))});export{ft as B};
