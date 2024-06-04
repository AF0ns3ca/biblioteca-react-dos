import{j as e,r as c,Y as N}from"./app-4-9hqyk0.js";import{A as w}from"./AuthenticatedLayout-Dy4UWgix.js";import{d as g}from"./index-BoQJvmTQ.js";import{B as v,a as y}from"./Box-DadvyvCF.js";import{T as k,a as b}from"./Tab-Dv4FvHO6.js";import{d as S}from"./DeleteForever-CveUn7tR.js";import{d as C}from"./Edit-CXbZVBO5.js";import{B}from"./BasicRating-um-t9R4z.js";import{r as I}from"./Footer-Bk8_I_xS.js";import{C as R}from"./Loading-DRzxtN1P.js";import"./ButtonBase-BvMl_hVz.js";import"./transition-ClowOTfh.js";function E({value:s,onChange:a,role:d,want:r,reading:p,read:h}){const m=(f,i)=>{a(i)},o="#3f51b5",n="#000",l=o,x=o;return e.jsx("div",{className:"w-full items-center mb-5",children:e.jsx(v,{sx:{width:"100%",bgcolor:"background.paper"},children:e.jsxs(k,{value:s,onChange:m,centered:!0,sx:{"& .MuiTabs-indicator":{backgroundColor:o},"& .MuiTab-root":{color:n,"&:hover":{color:x}},"& .Mui-selected":{color:l}},children:[e.jsx(b,{label:"Inicio"}),e.jsx(b,{label:"Reseñas"})]})})})}const T=({review:s,auth:a})=>{const[d,r]=c.useState(!1),p={review:s.review},{data:h,setData:m,patch:o,delete:n}=y(p),l=t=>{const u=new Date(t);return new Intl.DateTimeFormat("es-ES",{year:"numeric",month:"long",day:"numeric"}).format(u)},x=async t=>{t.preventDefault(),o(`/reviews/update/${s.id}`,{preserveScroll:!0,preserveState:!0,onSuccess:()=>{const u=window.location.href;history.replaceState(null,null,u)}}),r(!1)},f=()=>{window.confirm("¿Estás seguro de que deseas eliminar esta reseña? Esta acción no se puede deshacer.")&&n(`/reviews/${s.id}`,{preserveScroll:!0,onSuccess:()=>{console.log("Review deleted successfully")}})},i=a.role==="user"?"metal":"premium",j=a.role==="user"?"#34495E":"#602F6B";return e.jsxs("div",{className:"w-full flex flex-col gap-4 border-b-2 pb-5",children:[e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx("div",{className:"w-[52px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center text-gray-500",children:e.jsx("span",{className:"text-xl",children:s.user.name.charAt(0)})}),e.jsxs("div",{className:"w-full flex flex-col",children:[e.jsx("p",{className:"text-lg font-semibold",children:s.user.name}),e.jsx("p",{className:"text-sm text-gray-500",children:l(s.created_at)}),e.jsx("div",{className:"pt-3",children:e.jsx(B,{book:s.book,initialRating:s.book.rate,readonly:!0})})]}),a.id===s.user.id&&e.jsxs("div",{className:"flex flex-row gap-5",children:[e.jsx("button",{className:`text-${i} text-sm font-semibold`,onClick:()=>r(!0),title:"Editar reseña",children:e.jsx(C,{sx:{color:j}})}),e.jsx("button",{className:"text-red-500 text-sm font-semibold",onClick:f,title:"Eliminar reseña",children:e.jsx(S,{sx:{color:I[500]}})})]})]}),e.jsxs("div",{className:"w-full flex flex-col gap-3",children:[e.jsx("div",{className:"w-full md:p-5",children:e.jsx("p",{className:"text-lg text-justify whitespace-pre-wrap",children:s.review})}),e.jsxs("div",{className:"w-full flex flex-row gap-3 items-center pl-10",children:[e.jsx("a",{href:route("books.show",s.book.id),className:"cursor-pointer",children:e.jsx("div",{children:s.book.portada?e.jsx("img",{src:s.book.portada,alt:s.book.titulo,className:"min-w-[70px] h-[110px] rounded"}):e.jsx("div",{className:"w-[70px] h-[110px] bg-gray-300 flex items-center justify-center text-center rounded-lg",children:e.jsx("span",{className:"text-sm font-bold text-gray-600",children:s.book.titulo})})})},s.book.id),e.jsxs("div",{className:"w-full font-serif",children:[e.jsx("p",{className:"text-sm md:text-2xl",children:s.book.titulo}),e.jsxs("p",{className:"text-sm md:text-2xl text-gray-500",children:["by ",s.book.autor]})]})]})]})]}),d&&e.jsx("div",{className:"fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center",children:e.jsx("div",{className:"w-[90%] md:w-[40%] relative bg-white p-8 max-w-md mx-auto rounded shadow-lg flex flex-col gap-4",children:e.jsxs("form",{onSubmit:x,className:"flex flex-col gap-3",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Escribe una reseña"}),e.jsx("div",{className:"grid gap-4",children:e.jsx("textarea",{name:"review",id:"review",cols:"30",rows:"10",className:"w-full p-2 border border-gray-300 rounded",placeholder:"Escribe tu reseña aquí...",value:h.review,onChange:t=>m("review",t.target.value)})})]}),e.jsxs("div",{className:"w-full flex flex-row items-center gap-3",children:[e.jsx("button",{type:"submit",className:`w-[50%] py-2 px-4 bg-${i} text-white rounded`,children:"Guardar Cambios"}),e.jsx("button",{type:"button",className:"w-[50%] py-2 px-4 bg-red-500 text-white rounded",onClick:()=>r(!1),children:"Cerrar"})]})]})})})]})};function G({auth:s,reviews:a}){console.log(a);const[d,r]=c.useState(0),[p,h]=c.useState(!0);c.useEffect(()=>{const t=localStorage.getItem("selectedSection");t&&r(parseInt(t,10))},[]),c.useEffect(()=>{setTimeout(()=>{h(!1)},2e3)},[]);const m=t=>{r(t),localStorage.setItem("selectedSection",t)},[o,n]=c.useState(0),l=["/images/banner.jpg","/images/hero.jpg","/images/bookstore.jpg"],x=()=>{n(t=>(t+1)%l.length)},f=()=>{n(t=>(t-1+l.length)%l.length)},i=t=>{const u=t.target.clientWidth/2;t.clientX-t.target.getBoundingClientRect().left<u?f():x()},j=()=>{switch(d){case 0:return e.jsx("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8",children:e.jsx("div",{children:e.jsxs("div",{className:"p-6 text-gray-900",children:[e.jsx("div",{children:e.jsx("img",{src:l[o],alt:"Book Image",className:"w-full h-96 object-cover rounded-lg cursor-pointer",onClick:i})}),e.jsxs("div",{className:"w-full p-10 my-10 text-xl rounded-lg bg-yellow-600 text-white font-serif flex flex-col sm:flex-row justify-between",children:[e.jsxs("div",{className:"flex flex-col justify-center p-2 sm:w-2/3",children:[e.jsxs("h1",{className:"text-4xl mb-5",children:["Bienvenido a Book",e.jsx("span",{className:"font-bold text-blue-200",children:"Nest"}),","," ",e.jsx("span",{className:"capitalize inline-block",children:s.user.name}),"!"]}),e.jsxs("p",{className:"mb-5",children:["Book",e.jsx("span",{className:"font-bold text-blue-200",children:"Nest"})," ","es la red social independiente para los amantes de los libros."]}),e.jsxs("ul",{className:"px-5 list-disc mb-5",children:[e.jsx("li",{children:"Descubre libros de todas las épocas"}),e.jsx("li",{children:"Crea tus propias bibliotecas"}),e.jsx("li",{children:"Conecta con lectores de todas las partes del mundo"})]})]}),e.jsx("div",{className:"pl-4 sm:w-1/3",children:e.jsx("img",{src:"/images/libraries.jpg",alt:"",className:"rounded"})})]}),e.jsxs("div",{className:"w-full",children:[e.jsx("h1",{className:"text-5xl text-center font-serif pb-5",children:"Autores del momento"}),e.jsxs("div",{className:"w-full flex flex-col sm:flex-row items-center justify-center gap-3 text-center",children:[e.jsxs("div",{className:"w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4",children:[e.jsx("img",{src:"/images/authors/sanderson.jpg",alt:"",className:"w-[263px] h-[385px] rounded cursor-pointer",onClick:()=>g.Inertia.visit("/books?autor=Brandon Sanderson")}),e.jsx("p",{className:"mt-2 text-2xl font-serif",children:"Brandon Sanderson"})]}),e.jsxs("div",{className:"w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4",children:[e.jsx("img",{src:"/images/authors/rebecca.jpg",alt:"",className:"w-[263px] h-[385px] rounded cursor-pointer",onClick:()=>g.Inertia.visit("/books?autor=Rebecca Yarros")}),e.jsx("p",{className:"mt-2 text-2xl font-serif",children:"Rebecca Yarros"})]}),e.jsxs("div",{className:"w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4",children:[e.jsx("img",{src:"/images/authors/sally.jpg",alt:"",className:"w-[263px] h-[385px] rounded cursor-pointer",onClick:()=>g.Inertia.visit("/books?autor=Sally Rooney")}),e.jsx("p",{className:"mt-2 text-2xl font-serif",children:"Sally Rooney"})]}),e.jsxs("div",{className:"w-[280px] h-[450px] bg-metaldark rounded p-2.5 text-white hover:bg-metal mb-5 sm:w-1/4",children:[e.jsx("img",{src:"/images/authors/king.jpg",alt:"",className:"w-[263px] h-[385px] rounded cursor-pointer",onClick:()=>g.Inertia.visit("/books?autor=Stephen King")}),e.jsx("p",{className:"mt-2 text-2xl font-serif",children:"Stephen King"})]})]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-10 text-2xl font-serif p-10 mb-10 mt-24",children:[e.jsx("p",{className:"text-justify sm:w-3/4",children:'"Los libros son puertas a mundos inexplorados, puertas que nos ofrecen escapar a otros mundos, son conocimiento y aventura al alcance de nuestras manos. Cada página que pasamos alimenta nuestro espíritu, amplía nuestros horizontes y fortalece nuestra comprensión del mundo y de nosotros mismos. Son herramientas poderosas que moldean mentes, construyen puentes entre culturas y generaciones, y despiertan nuestra creatividad más profunda. Abre un libro y descubre no solo historias, sino también partes de ti mismo en cada personaje y trama. ¡Explora, aprende y crece con cada lectura!"'}),e.jsx("img",{src:"/images/magic.png",alt:"Book Image",className:"min-w-[250px] h-96 rounded-lg"})]})]})})});case 1:return e.jsx("div",{className:"opacity-100 transition-opacity ease-in-out w-[80%] items-center justify-center flex flex-col gap-10",children:p?e.jsx("div",{className:"w-full h-screen flex items-center justify-center",children:e.jsx(R,{})}):a.length>0?a.map(t=>e.jsx(T,{review:t,auth:s.user},t.id)):e.jsx("div",{className:"text-center",children:e.jsx("p",{className:"text-lg text-gray-600",children:"No hay reseñas."})})},1);default:return null}};return e.jsxs(w,{user:s.user,children:[e.jsx(N,{title:"Inicio"}),e.jsx("div",{className:"py-20",children:e.jsxs("div",{className:"max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-center",children:[e.jsx("div",{className:"flex",children:e.jsx(E,{value:d,onChange:m,role:s.user.role})}),j()]})})]})}export{G as default};