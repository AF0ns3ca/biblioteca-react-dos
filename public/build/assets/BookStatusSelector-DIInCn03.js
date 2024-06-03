import{j as e,r as m}from"./app-4-9hqyk0.js";import{d as S}from"./index-BoQJvmTQ.js";import{d as p,a as L}from"./LocalLibraryOutlined-DqWFJDyc.js";import{a as h,i as j}from"./Footer-Bk8_I_xS.js";const E=({book:t,librariesWithBookCount:x,auth:a})=>e.jsx("div",{className:"card flex flex-col gap-3 items-center justify-center p-3 ",children:e.jsxs("div",{className:"flex flex-col items-start justify-start min-w-[120px]",children:[e.jsx("a",{href:route("books.show",t.id),className:"cursor-pointer",children:e.jsx("div",{children:t.portada?e.jsx("img",{src:t.portada,alt:t.titulo,className:"w-[120px] h-[190px] rounded"}):e.jsx("div",{className:"w-[120px] h-[190px] bg-gray-300 flex items-center justify-center text-center rounded-lg",children:e.jsx("span",{className:"text-sm font-bold text-gray-600",children:t.titulo})})})},t.id),e.jsxs("div",{className:"hidden",children:[e.jsx("h2",{className:"titulo",children:t.titulo}),e.jsx("p",{className:"autor",children:t.autor}),e.jsxs("p",{className:"serie",children:[t.serie?t.serie:"Standalone"," ",t.numero?`#${t.num_serie}`:""]})]})]})});var u={},$=j;Object.defineProperty(u,"__esModule",{value:!0});var g=u.default=void 0,D=$(h()),q=e;g=u.default=(0,D.default)((0,q.jsx)("path",{d:"m18 7-1.41-1.41-6.34 6.34 1.41 1.41zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12zM.41 13.41 6 19l1.41-1.41L1.83 12z"}),"DoneAllOutlined");var c={},O=j;Object.defineProperty(c,"__esModule",{value:!0});var y=c.default=void 0,R=O(h()),M=e;y=c.default=(0,R.default)((0,M.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"}),"KeyboardArrowDownOutlined");const k=({initialStatus:t,book:x,auth:a,showPage:f})=>{const[s,v]=m.useState(t),[w,l]=m.useState(!1),n=async r=>{v(r),l(!1),r==="quiero_leer"?await i("quiero_leer",!0,null,null):r==="leyendo"?await i("leyendo",!1,new Date,null):r==="leido"&&await i("leido",!1,null,new Date)},i=async(r,d,N,C)=>{await S.Inertia.post("/update-reading-status",{book_id:x.id,status:r,want_to_read:d,start_date:N,end_date:C})},o=r=>{switch(r){case"quiero_leer":return{icon:e.jsx(p,{}),text:"Quiero Leer"};case"leyendo":return{icon:e.jsx(L,{}),text:"Leyendo"};case"leido":return{icon:e.jsx(g,{}),text:"Leído"};default:return{icon:e.jsx(p,{}),text:"Quiero Leer"}}},b=a.user.role==="user"?"bg-metal":"bg-premium",_=a.user.role==="user"?"bg-metaldark":"bg-premiumdark";return e.jsxs("div",{children:[e.jsxs("button",{type:"button",onClick:()=>l(!0),className:`inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 ${b} font-medium text-white hover:${_} focus:outline-none`,"aria-expanded":"true","aria-haspopup":"true",children:[e.jsx("span",{className:`w-full flex flex-row gap-1 ${f?"px-2":""}`,children:f?e.jsxs(e.Fragment,{children:[o(s).text,o(s).icon]}):o(s).icon}),e.jsx(y,{})]}),w&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75",children:e.jsxs("div",{className:"w-full md:w-[20%] bg-white p-4 md:p-8 flex flex-col rounded-lg items-center justify-center",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Seleccionar estado"}),e.jsxs("div",{className:"py-1",children:[e.jsx("button",{onClick:()=>n("quiero_leer"),className:"block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left",children:"Quiero Leer"}),e.jsx("button",{onClick:()=>n("leyendo"),className:"block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left",children:"Leyendo"}),e.jsx("button",{onClick:()=>n("leido"),className:"block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 w-full text-left",children:"Leído"})]}),e.jsx("button",{onClick:()=>l(!1),className:"bg-red-700 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-500 text-center",children:"Cerrar"})]})})]})},Q=k;export{Q as B,E as C};
