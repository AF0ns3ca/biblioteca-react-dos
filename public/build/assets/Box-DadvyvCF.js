import{l as oe,r as U,j as ae}from"./app-4-9hqyk0.js";import{d as se}from"./index-BoQJvmTQ.js";import{s as ue,e as ce,E as ie,l as le,_ as fe,c as de,n as pe,t as ve,X as me,T as ge,Y as he}from"./Footer-Bk8_I_xS.js";var ye,Ce;function ee(e){return e&&typeof e=="object"&&"default"in e?e.default:e}var Se=ee(oe),o=U;ee(o);var T=se;function S(){return(S=Object.assign||function(e){for(var s=1;s<arguments.length;s++){var l=arguments[s];for(var f in l)Object.prototype.hasOwnProperty.call(l,f)&&(e[f]=l[f])}return e}).apply(this,arguments)}function $(e,s){var l=o.useState(function(){var y=T.Inertia.restore(s);return y!==void 0?y:e}),f=l[0],i=l[1];return o.useEffect(function(){T.Inertia.remember(f,s)},[f,s]),[f,i]}var Q=o.createContext();Q.displayName="InertiaPageContext";var z=o.createContext();function xe(e){var s=e.children,l=e.initialPage,f=e.resolveComponent,i=e.titleCallback,y=e.onHeadUpdate,g=o.useState({component:e.initialComponent||null,page:l,key:null}),c=g[0],k=g[1],u=o.useMemo(function(){return T.createHeadManager(typeof window>"u",i||function(d){return d},y||function(){})},[]);if(o.useEffect(function(){T.Inertia.init({initialPage:l,resolveComponent:f,swapComponent:function(d){var m=d.component,p=d.page,h=d.preserveState;try{return k(function(x){return{component:m,page:p,key:h?x.key:Date.now()}}),Promise.resolve()}catch(x){return Promise.reject(x)}}})},[]),!c.component)return o.createElement(z.Provider,{value:u},o.createElement(Q.Provider,{value:c.page},null));var C=s||function(d){var m=d.Component,p=d.props,h=o.createElement(m,S({key:d.key},p));return typeof m.layout=="function"?m.layout(h):Array.isArray(m.layout)?m.layout.concat(h).reverse().reduce(function(x,E){return o.createElement(E,S({children:x},p))}):h};return o.createElement(z.Provider,{value:u},o.createElement(Q.Provider,{value:c.page},C({Component:c.component,key:c.key,props:c.page.props})))}z.displayName="InertiaHeadContext",xe.displayName="Inertia";var ke=["children","as","data","href","method","preserveScroll","preserveState","replace","only","headers","queryStringArrayFormat","onClick","onCancelToken","onBefore","onStart","onProgress","onFinish","onCancel","onSuccess","onError"],b=function(){},Ee=o.forwardRef(function(e,s){var l=e.children,f=e.as,i=f===void 0?"a":f,y=e.data,g=y===void 0?{}:y,c=e.href,k=e.method,u=k===void 0?"get":k,C=e.preserveScroll,d=C!==void 0&&C,m=e.preserveState,p=m===void 0?null:m,h=e.replace,x=h!==void 0&&h,E=e.only,N=E===void 0?[]:E,A=e.headers,w=A===void 0?{}:A,O=e.queryStringArrayFormat,W=O===void 0?"brackets":O,B=e.onClick,L=B===void 0?b:B,H=e.onCancelToken,R=H===void 0?b:H,D=e.onBefore,M=D===void 0?b:D,j=e.onStart,F=j===void 0?b:j,P=e.onProgress,n=P===void 0?b:P,r=e.onFinish,t=r===void 0?b:r,v=e.onCancel,a=v===void 0?b:v,_=e.onSuccess,J=_===void 0?b:_,X=e.onError,Y=X===void 0?b:X,ne=function(I,re){if(I==null)return{};var G,q,V={},Z=Object.keys(I);for(q=0;q<Z.length;q++)re.indexOf(G=Z[q])>=0||(V[G]=I[G]);return V}(e,ke),te=o.useCallback(function(I){L(I),T.shouldIntercept(I)&&(I.preventDefault(),T.Inertia.visit(c,{data:g,method:u,preserveScroll:d,preserveState:p??u!=="get",replace:x,only:N,headers:w,onCancelToken:R,onBefore:M,onStart:F,onProgress:n,onFinish:t,onCancel:a,onSuccess:J,onError:Y}))},[g,c,u,d,p,x,N,w,L,R,M,F,n,t,a,J,Y]);i=i.toLowerCase(),u=u.toLowerCase();var K=T.mergeDataIntoQueryString(u,c||"",g,W);return c=K[0],g=K[1],i==="a"&&u!=="get"&&console.warn(`Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.

Please specify a more appropriate element using the "as" attribute. For example:

<Link href="`+c+'" method="'+u+'" as="button">...</Link>'),o.createElement(i,S({},ne,i==="a"?{href:c}:{},{ref:s,onClick:te}),l)});Ce=Ee,ye=function(){var e=[].slice.call(arguments),s=o.useRef(null),l=typeof e[0]=="string"?e[0]:null,f=o.useState((typeof e[0]=="string"?e[1]:e[0])||{}),i=f[0],y=f[1],g=o.useRef(null),c=o.useRef(null),k=l?$(i,l+":data"):o.useState(i),u=k[0],C=k[1],d=l?$({},l+":errors"):o.useState({}),m=d[0],p=d[1],h=o.useState(!1),x=h[0],E=h[1],N=o.useState(!1),A=N[0],w=N[1],O=o.useState(null),W=O[0],B=O[1],L=o.useState(!1),H=L[0],R=L[1],D=o.useState(!1),M=D[0],j=D[1],F=function(n){return n};o.useEffect(function(){return s.current=!0,function(){s.current=!1}},[]);var P=o.useCallback(function(n,r,t){t===void 0&&(t={});var v=S({},t,{onCancelToken:function(a){if(g.current=a,t.onCancelToken)return t.onCancelToken(a)},onBefore:function(a){if(R(!1),j(!1),clearTimeout(c.current),t.onBefore)return t.onBefore(a)},onStart:function(a){if(w(!0),t.onStart)return t.onStart(a)},onProgress:function(a){if(B(a),t.onProgress)return t.onProgress(a)},onSuccess:function(a){if(s.current&&(w(!1),B(null),p({}),E(!1),R(!0),j(!0),c.current=setTimeout(function(){s.current&&j(!1)},2e3)),t.onSuccess)return t.onSuccess(a)},onError:function(a){if(s.current&&(w(!1),B(null),p(a),E(!0)),t.onError)return t.onError(a)},onCancel:function(){if(s.current&&(w(!1),B(null)),t.onCancel)return t.onCancel()},onFinish:function(){if(s.current&&(w(!1),B(null)),g.current=null,t.onFinish)return t.onFinish()}});n==="delete"?T.Inertia.delete(r,S({},v,{data:F(u)})):T.Inertia[n](r,F(u),v)},[u,p]);return{data:u,setData:function(n,r){var t;C(typeof n=="string"?S({},u,((t={})[n]=r,t)):typeof n=="function"?function(v){return n(v)}:n)},isDirty:!Se(u,i),errors:m,hasErrors:x,processing:A,progress:W,wasSuccessful:H,recentlySuccessful:M,transform:function(n){F=n},setDefaults:function(n,r){y(n===void 0?function(){return u}:function(t){var v;return S({},t,r?((v={})[n]=r,v):n)})},reset:function(){var n=[].slice.call(arguments);C(n.length===0?i:Object.keys(i).filter(function(r){return n.includes(r)}).reduce(function(r,t){return r[t]=i[t],r},S({},u)))},setError:function(n,r){p(function(t){var v,a=S({},t,r?((v={})[n]=r,v):n);return E(Object.keys(a).length>0),a})},clearErrors:function(){var n=[].slice.call(arguments);p(function(r){var t=Object.keys(r).reduce(function(v,a){var _;return S({},v,n.length>0&&!n.includes(a)?((_={})[a]=r[a],_):{})},{});return E(Object.keys(t).length>0),t})},submit:P,get:function(n,r){P("get",n,r)},post:function(n,r){P("post",n,r)},put:function(n,r){P("put",n,r)},patch:function(n,r){P("patch",n,r)},delete:function(n,r){P("delete",n,r)},cancel:function(){g.current&&g.current.cancel()}}};const Pe=["className","component"];function be(e={}){const{themeId:s,defaultTheme:l,defaultClassName:f="MuiBox-root",generateClassName:i}=e,y=ue("div",{shouldForwardProp:c=>c!=="theme"&&c!=="sx"&&c!=="as"})(ce);return U.forwardRef(function(k,u){const C=ie(l),d=le(k),{className:m,component:p="div"}=d,h=fe(d,Pe);return ae.jsx(y,de({as:p,ref:u,className:pe(m,i?i(f):f),theme:s&&C[s]||C},h))})}const Te=U.createContext(),Ne=()=>{const e=U.useContext(Te);return e??!1},we=ve("MuiBox",["root"]),Be=me(),Oe=be({themeId:ge,defaultTheme:Be,defaultClassName:we.root,generateClassName:he.generate});export{Oe as B,Ce as L,ye as a,Ne as u};
