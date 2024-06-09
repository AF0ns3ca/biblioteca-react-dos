import{j as e,r as a,Y as K}from"./app-BYI2I_UO.js";import{A as U}from"./AuthenticatedLayout-P3NpfO_Y.js";import{B as X}from"./BasicRating-B00cIGjv.js";import{d as u}from"./index-hyhaw26K.js";import{B as Z,C as H}from"./BookStatusSelector-Chl4SEfJ.js";import{d as W,A as k}from"./AddToLibraryModal-M64ANqA3.js";import{a as I,i as q}from"./Footer-DreYb8S2.js";import{B as ee}from"./Box-BVceQuu4.js";import{T as se,a as w}from"./Tab-CDI_gCos.js";import{d as te}from"./DeleteForever-CRR_YOws.js";import{d as le}from"./Edit-CBtAiCrG.js";import"./index-9F5InN-F.js";import"./LocalLibraryOutlined-DYXu8ZS4.js";import"./transition-3J2Rs5Gu.js";import"./ButtonBase-l3n3O5r4.js";var b={},ae=q;Object.defineProperty(b,"__esModule",{value:!0});var N=b.default=void 0,re=ae(I()),ie=e;N=b.default=(0,re.default)((0,ie.jsx)("path",{d:"M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 18H4V8h16z"}),"CalendarToday");var y={},de=q;Object.defineProperty(y,"__esModule",{value:!0});var z=y.default=void 0,ne=de(I()),ce=e;z=y.default=(0,ne.default)((0,ce.jsx)("path",{d:"M9 1h6v2H9zm10.03 6.39 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V8h2z"}),"Timer");function oe({value:l,onChange:t,role:S,booksAuthorCount:f,booksSerieCount:x}){const d=(m,p)=>{t(p)},r="#3f51b5",n="#000",i=r,h=r;return e.jsx("div",{className:"w-full items-center mb-5",children:e.jsx(ee,{sx:{width:"100%",bgcolor:"background.paper"},children:e.jsxs(se,{value:l,onChange:d,variant:"scrollable",scrollButtons:"auto",sx:{"& .MuiTabs-indicator":{backgroundColor:r},"& .MuiTab-root":{color:n,"&:hover":{color:h}},"& .Mui-selected":{color:i}},children:[e.jsx(w,{label:"Información de lectura"}),e.jsx(w,{label:`Libros del mismo autor/a (${f-1})`}),e.jsx(w,{label:`Libros de la misma serie (${x-1})`})]})})})}function Me({auth:l,book:t,booksAuthor:S,booksSerie:f,booksAuthorCount:x,booksSerieCount:d,librariesWithBookCount:r,dates:n,datesCount:i}){const h=l.user.role==="user"?"#2C3E50":"#512E5F",m=l.user.role==="user"?"bg-metal":"bg-premium";t.serie==null&&(d=1);const[p,_]=a.useState(!1),[j,D]=a.useState(!1),[xe,v]=a.useState(""),[me,g]=a.useState(""),[C,B]=a.useState(0),[M,E]=a.useState(""),[T,$]=a.useState(""),L=(s,c,o)=>{B(s),E(c),$(o)},V=()=>{_(!0)},A=t.portada?t.portada.startsWith("http")?t.portada:t.portada.replace(/^public\//,"/storage/"):null,[R,P]=a.useState(0),G=s=>{P(s)},O=s=>{console.log(s),confirm("¿Estás seguro de que quieres eliminar esta lectura?")&&u.Inertia.delete(route("readings.deleteReading",s),{id:s})},Q=()=>{u.Inertia.put(route("readings.updateDates",C),{id:C,start_date:M,end_date:T})};a.useEffect(()=>{if(j&&n.length>0){const s=n[0];v(s.start_date),g(s.end_date)}},[j]);const Y=()=>{switch(R){case 0:return e.jsx("div",{className:"w-full",children:i>0?e.jsxs("div",{className:"w-full flex flex-col items-center space-y-6",children:[e.jsx("p",{className:"text-2xl font-semibold",children:i>1?`Has leído este libro ${i} veces`:`Has leído este libro ${i} vez`}),n.map(s=>{const c=new Date(s.start_date),o=new Date(s.end_date),J=Math.abs(o-c),F=Math.ceil(J/(1e3*60*60*24));return e.jsxs("div",{className:"w-full md:w-[50%] p-4 border border-gray-300 rounded-lg shadow-md bg-white flex flex-col md:flex-row justify-between items-center",children:[e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"text-lg mb-2 flex flex-row items-center",children:[e.jsx(N,{className:"mr-2 text-metal"}),e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx("span",{className:"font-bold",children:"Empezaste el libro el:"}),e.jsx("span",{children:c.toLocaleDateString("es-ES")})]})]}),e.jsxs("div",{className:"text-lg mb-2 flex flex-row items-center",children:[e.jsx(N,{className:"mr-2 text-green-500"}),e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx("span",{className:"font-bold",children:"Terminaste el libro el:"}),e.jsx("span",{children:o.toLocaleDateString("es-ES")})]})]}),e.jsxs("div",{className:"text-lg flex flex-row items-center",children:[e.jsx(z,{className:"mr-2 text-red-500"}),e.jsx("div",{className:"flex flex-row gap-2",children:F>0?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"font-bold",children:"Has tardado:"}),e.jsxs("span",{children:[F," ","días en leerlo"]})]}):e.jsx("span",{className:"font-bold",children:"¡Lo has leído en menos de un día!"})})]})]}),e.jsxs("div",{className:"w-full md:w-[20%] flex flex-col gap-5 mt-4 md:mt-0",children:[e.jsx("button",{onClick:()=>{v(c),g(o),D(!0),L(s.id,s.start_date,s.end_date)},title:"Editar fechas de lectura",className:`${m} text-white px-4 py-2 rounded-md w-full`,children:e.jsx(le,{})}),e.jsx("button",{onClick:()=>{O(s.id)},title:"Eliminar lectura",className:"bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full",children:e.jsx(te,{})})]})]},s.id)})]}):e.jsx("div",{className:"w-full flex items-center justify-center text-2xl",children:t.status==="quiero_leer"?e.jsxs("p",{children:["Este libro está en tu"," ",e.jsx("span",{className:"text-metal cursor-pointer underline italic",onClick:()=>u.Inertia.visit("/reading"),children:'lista de "Quiero leer"'})]}):t.status==="leyendo"?e.jsx("p",{children:"Estás leyendo este libro"}):t.status==="leido"?e.jsx("p",{children:"Has terminado de leer este libro."}):e.jsx("p",{children:"Aún no has leído este libro. ¿A qué esperas?"})})});case 1:return e.jsx("div",{className:"w-full",children:x>1?e.jsx("div",{className:"w-full flex flex-row overflow-x-auto m-5",children:S.map(s=>e.jsx(H,{book:s,librariesWithBookCount:r,auth:l},s.id))}):e.jsx("div",{className:"w-full flex items-center justify-center text-2xl",children:e.jsx("p",{children:"No hay más libros de este autor/a"})})});case 2:return e.jsx("div",{className:"w-full",children:d>1&&t.serie!=null?e.jsx("div",{className:"w-full flex flex-row overflow-x-auto m-5",children:f.map(s=>e.jsx(H,{book:s,librariesWithBookCount:r,auth:l},s.id))}):e.jsx("div",{className:"w-full flex items-center justify-center text-2xl",children:e.jsx("p",{children:"No hay más libros de esta serie"})})});default:return null}};return e.jsxs(U,{user:l.user,children:[e.jsx(K,{title:t.titulo}),e.jsx("div",{className:"w-full flex flex-1 items-center justify-center px-4 md:px-0",children:e.jsxs("div",{className:"w-full flex flex-col items-center justify-center",children:[e.jsxs("div",{className:"w-full md:w-[80%] flex flex-col md:flex-row items-center justify-center gap-8 mt-20 mb-5 md:mb-10",children:[e.jsxs("div",{className:"w-full md:w-[30%] flex flex-col items-center justify-center gap-5 cover-container",children:[e.jsx("div",{children:t.portada?e.jsx("img",{src:A,alt:t.titulo,className:"rounded w-full h-auto md:w-[360px] md:h-[550px]"}):e.jsx("div",{className:"rounded w-full h-[300px] md:w-[360px] md:h-[550px] bg-gray-300 flex items-center justify-center text-center",children:e.jsx("span",{className:"text-2xl font-bold text-gray-600",children:t.titulo})})}),e.jsxs("div",{className:"w-full max-w-[360px] flex flex-row items-center justify-between",children:[e.jsx(Z,{initialStatus:t.status,book:t,auth:l,dropdownClass:"right-0",showPage:!0}),e.jsx("button",{className:"text-center py-2 transition duration-300 ease-in-out",onClick:V,children:e.jsx(W,{sx:{fill:h,fontSize:"35px"}})})]})]}),e.jsxs("div",{className:"w-full md:w-[70%] flex flex-col items-start justify-between info-container",children:[e.jsxs("div",{className:"w-full flex flex-col justify-start gap-2",children:[e.jsx("h1",{className:"text-3xl md:text-4xl font-serif",children:t.titulo}),e.jsxs("p",{className:"text-lg",children:["by"," ",e.jsx("span",{className:"text-metal cursor-pointer underline italic",onClick:()=>u.Inertia.visit(`/books?autor=${t.autor}`),children:t.autor})]}),t.serie?e.jsxs("p",{className:"text-lg",children:[t.serie," #",t.num_serie]}):e.jsx("p",{className:"text-lg",children:"Libro único"}),e.jsxs("p",{children:[t.paginas," páginas"]}),e.jsx("div",{children:e.jsx(X,{book:t,initialRating:t.rate,size:"large",readonly:!0})})]}),e.jsx("div",{className:"w-full text-justify pb-6 md:pb-20",children:e.jsx("p",{className:"text-lg whitespace-pre-wrap",children:t.descripcion})}),e.jsx("div",{className:"w-full flex items-end justify-end",children:e.jsx("button",{onClick:()=>window.history.back(),className:`btn btn-primary p-3 text-white rounded-lg ${m}`,children:"Volver"})})]})]}),e.jsxs("div",{className:"w-full max-w-6xl mt-6 md:mt-0",children:[e.jsx("div",{className:"flex",children:e.jsx(oe,{value:R,onChange:G,role:l.user.role,booksAuthorCount:x,booksSerieCount:d})}),Y()]})]})}),p&&e.jsx(k,{book:t,librariesWithBookCount:r,setShowModal:_,auth:l}),j&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75",children:e.jsxs("div",{className:"w-[90%] md:w-[50%] bg-white p-4 md:p-8 flex flex-col rounded-lg items-center justify-center",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Editar fechas de lectura"}),e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:`flex flex-col
                            gap-2`,children:[e.jsx("label",{htmlFor:"start_date",className:"text-lg font-semibold",children:"Fecha de inicio:"}),e.jsx("input",{type:"date",id:"start_date",className:"border rounded-md px-2 py-1",value:M,onChange:s=>{v(s.target.value),E(s.target.value),console.log("Nueva Fecha Inicio:",s.target.value)}})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{htmlFor:"end_date",className:"text-lg font-semibold",children:"Fecha de fin:"}),e.jsx("input",{type:"date",id:"end_date",className:"border rounded-md px-2 py-1",value:T,onChange:s=>{g(s.target.value),$(s.target.value),console.log("Nueva Fecha Fin:",s.target.value)}})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mt-4",children:[e.jsx("button",{onClick:Q,className:`${m} text-white px-4 py-2 rounded-md`,children:"Guardar"}),e.jsx("button",{onClick:()=>D(!1),className:"bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400",children:"Cancelar"})]})]})})]})}export{Me as default};