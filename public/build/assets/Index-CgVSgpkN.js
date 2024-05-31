import{j as e,r as o,Y as y}from"./app-ALmxwxBw.js";import{A as C,d as f}from"./AuthenticatedLayout-MhkT7CTv.js";import{d as h}from"./index-XXHw3VyS.js";import"./CardLibrary-Cr2uJ1FD.js";import{A as k}from"./AddButton-fk42Nd0E.js";import{d as S}from"./Delete-CbJ2o18d.js";import"./Footer-Dj3jyeoG.js";import"./transition-DnJTfxhI.js";import"./DigitalLibraryIcon-Cx63c-UM.js";const F=({library:s})=>{const i=async r=>{confirm(`¿Estás seguro de que deseas eliminar la biblioteca ${s.nombre}?`)&&await h.Inertia.delete(route("libraries.destroy",{id:r}),{onSuccess:()=>{window.location.reload()}})};return e.jsxs("div",{className:"w-full sm:min-w-[304px] flex flex-col items-center justify-between bg-white shadow border min-w-[320px] hover:bg-slate-300 rounded-lg",children:[e.jsx("div",{className:"w-full flex flex-col items-start justify-center gap-1",children:s.tipo==="Fisica"?e.jsx("img",{src:"/images/fisica2.jpg",alt:"",className:"rounded-t"}):e.jsx("img",{src:"/images/digital2.png",alt:"",className:"rounded-t"})}),e.jsxs("div",{className:"w-full flex-1 flex flex-row items-start justify-center p-3",children:[e.jsx("div",{className:"w-full flex-1 flex flex-col items-start justify-center p-2",children:s.books_count>0?e.jsxs("a",{href:route("libraries.show",s.id),className:"w-full cursor-pointer flex flex-col items-start",children:[e.jsx("h1",{className:"text-xl font-bold",children:s.nombre}),e.jsxs("p",{className:"text-gray-600",children:[s.books_count," libros"]})]}):e.jsxs(e.Fragment,{children:[e.jsx("h1",{className:"text-xl font-bold",children:s.nombre}),e.jsx("p",{className:"text-gray-600",children:"Vacía"})]})}),e.jsx("div",{className:"p-2",children:e.jsx("button",{onClick:()=>i(s.id),className:"bg-red-500 text-white rounded p-2",children:e.jsx(S,{})})})]})]})},A=F;function B({auth:s,librariesWithBookCount:i,role:r}){const[p,t]=o.useState(!1),[b,n]=o.useState(!1),[c,d]=o.useState(""),[m,u]=o.useState("Fisica"),g=l=>{l.preventDefault(),h.Inertia.post("/libraries",{nombre:c,tipo:m},{preserveScroll:!0,onSuccess:a=>{console.log("Respuesta del servidor:",a),d(""),u("Fisica")},onError:a=>{a.error==="No puedes tener más de 5 bibliotecas."?alert(a.error):alert(Object.values(a).flat().join(`
`))}}),t(!1)},j=l=>{l.target.id==="modal-background"&&t(!1)},w=()=>{n(!0)},N=()=>{n(!1)},v=l=>{l.target.id==="modal-alert"&&n(!1)},x=s.user.role==="user"?"bg-metal":"bg-premium";return s.user.role,e.jsxs(C,{user:s.user,role:r,children:[e.jsx(y,{title:"Bibliotecas"}),e.jsxs("div",{className:"w-full mt-20 h-full flex flex-col justify-center items-center",children:[e.jsxs("h1",{className:"p-5 text-5xl font-serif",children:["Tus bibliotecas, ",s.user.name]}),e.jsx("div",{className:"w-full px-5 sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[70%] flex items-center justify-center py-4 ",children:e.jsx("div",{className:"w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-content-center gap-10",children:i.map(l=>e.jsx(A,{library:l},l.id))})}),i.length<5&&s.user.role==="user"||s.user.role!=="user"?e.jsx("div",{className:"fixed bottom-10 right-10 rounded-full",children:e.jsx(k,{color:x,onClick:()=>t(!0)})}):e.jsxs("div",{children:[e.jsx("div",{className:`fixed bottom-10 right-10 rounded-full ${x} p-4 text-white`,onClick:w,children:e.jsx(f,{})}),b&&e.jsx("div",{id:"modal-alert",className:"fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center",onClick:v,children:e.jsxs("div",{className:"relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg flex flex-col gap-5 font-serif text-lg",children:[e.jsx("p",{children:"Has llegado al límite de bibliotecas. Para crear más bibliotecas, actualiza a una cuenta premium."}),e.jsx("button",{children:e.jsx(f,{sx:{fill:"#602F6B",fontSize:"35px"},onClick:N,className:"text-center rounded-ful m-3"})})]})})]})]}),p&&e.jsx("div",{id:"modal-background",className:"fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center",onClick:j,children:e.jsxs("div",{className:"relative p-8 bg-white w-full max-w-md m-6 rounded shadow-lg",children:[e.jsxs("form",{onSubmit:g,className:"w-full",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"nombre",className:"block text-gray-700 text-sm font-bold mb-2",children:"Nombre"}),e.jsx("input",{id:"nombre",type:"text",className:"shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-metallight leading-tight focus:outline-none focus:shadow-outline",value:c,onChange:l=>d(l.target.value)})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"tipo",className:"block text-gray-700 text-sm font-bold mb-2",children:"Tipo"}),e.jsxs("select",{id:"tipo",value:m,onChange:l=>u(l.target.value),className:"shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",children:[e.jsx("option",{value:"Fisica",children:"Física"}),e.jsx("option",{value:"Digital",children:"Digital"})]})]}),e.jsxs("div",{className:"w-full flex items-center justify-center gap-5",children:[e.jsx("button",{type:"submit",className:"w-full bg-metal text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",children:"Crear"}),e.jsx("button",{onClick:()=>t(!1),className:"w-full bg-red-500 text-white rounded px-4 py-2",children:"Cancelar"})]})]}),e.jsx("button",{onClick:()=>t(!1),className:"absolute top-0 right-0 p-4",children:"X"})]})})]})}export{B as default};
