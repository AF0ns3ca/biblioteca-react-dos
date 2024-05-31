import{j as e,Y as a}from"./app-ALmxwxBw.js";import{A as o}from"./AdminLayout-D6YLOh7B.js";import{d as n}from"./index-XXHw3VyS.js";import{d as c}from"./Delete-CbJ2o18d.js";import"./Footer-Dj3jyeoG.js";import"./transition-DnJTfxhI.js";const d=({user:s})=>{const l=async()=>{confirm(`Are you sure you want to delete ${s.name}?`)&&await n.Inertia.delete(route("admin.userDestroy",s.id),{onSuccess:()=>{alert("User deleted successfully.")}})},r=t=>{switch(t){case"admin":return"bg-black";case"user":return"bg-metal";case"premium_user":return"bg-premium";default:return"bg-white"}};return e.jsx("div",{className:`w-full flex flex-col md:flex-row justify-between items-center gap-5 ${r(s.role)} shadow-lg rounded-lg p-6 text-white`,children:e.jsxs("div",{className:"flex flex-col md:flex-row w-full justify-between items-center gap-3",children:[e.jsxs("div",{className:"flex flex-col md:flex-row gap-5 w-full",children:[e.jsx("h2",{className:"text-2xl font-semibold",children:s.name}),e.jsx("p",{className:"mt-1",children:s.email}),e.jsxs("p",{className:"mt-1",children:["Tipo de Usuario: ",s.role]}),s.role!=="admin"&&e.jsx("p",{className:"mt-1",children:s.libraries_count>0?`Tiene ${s.libraries_count} bibliotecas`:"No tiene bibliotecas"})]}),s.role!=="admin"?e.jsx("button",{onClick:l,className:"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0",children:e.jsx(c,{})}):e.jsx("div",{className:"flex justify-center items-center",children:"Administrador"})]})})},j=({auth:s,users:l})=>{const r=[...l].sort((t,i)=>t.role<i.role?-1:t.role>i.role?1:0);return e.jsxs(o,{user:s.user,children:[e.jsx(a,{title:"Usuarios"}),e.jsxs("div",{className:"mt-20 flex flex-col justify-center items-center gap-10 p-5",children:[e.jsx("h1",{className:"text-3xl text-center",children:"Lista de Usuarios"}),e.jsx("div",{className:"w-full md:w-3/4 lg:w-1/2 flex flex-col items-center gap-5",children:r.map(t=>e.jsx(d,{user:t},t.id))})]})]})};export{j as default};
