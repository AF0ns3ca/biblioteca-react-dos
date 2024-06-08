import{W as g,r as d,j as e,Y as j,a as v}from"./app-BYI2I_UO.js";import{G as h}from"./GuestLayout-K3LQpX0A.js";import{I as o}from"./InputError-DWXDBxOw.js";import{I as i}from"./InputLabel-DVD3EDPZ.js";import{P as b}from"./PrimaryButton-BGc-SQ8a.js";import{T as m}from"./TextInput-DewXL0rc.js";function k(){const{data:s,setData:t,post:u,processing:p,errors:n,reset:f}=g({name:"",email:"",password:"",password_confirmation:""}),[c,l]=d.useState("");d.useEffect(()=>()=>{f("password","password_confirmation")},[]);const w=a=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(a),x=a=>{a.preventDefault(),l("");let r={};if(s.name||(r.name="El nombre es obligatorio."),s.email||(r.email="El correo es obligatorio."),s.password||(r.password="La contraseña es obligatoria."),s.password_confirmation||(r.password_confirmation="La confirmación de contraseña es obligatoria."),Object.keys(r).length>0){setErrors(r);return}if(!w(s.password)){l("La Contraseña debe tener una mayúscula, una minúscula, un número y un caracter especial.");return}if(s.password!==s.password_confirmation){l("Las contraseñas no coinciden.");return}u(route("register"))};return e.jsxs(h,{children:[e.jsx(j,{title:"Register"}),e.jsxs("form",{onSubmit:x,children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"name",value:"Nombre"}),e.jsx(m,{id:"name",name:"name",value:s.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,onChange:a=>t("name",a.target.value),required:!0}),e.jsx(o,{message:n.name,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"email",value:"Correo Electrónico"}),e.jsx(m,{id:"email",type:"email",name:"email",value:s.email,className:"mt-1 block w-full",autoComplete:"username",onChange:a=>t("email",a.target.value),required:!0}),e.jsx(o,{message:n.email,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"password",value:"Contraseña"}),e.jsx(m,{id:"password",type:"password",name:"password",value:s.password,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>t("password",a.target.value),required:!0}),c&&e.jsx(o,{message:c,className:"mt-2"}),e.jsx(o,{message:n.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(i,{htmlFor:"password_confirmation",value:"Confirma tu contraseña"}),e.jsx(m,{id:"password_confirmation",type:"password",name:"password_confirmation",value:s.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",onChange:a=>t("password_confirmation",a.target.value),required:!0}),e.jsx(o,{message:n.password_confirmation,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-end mt-4",children:[e.jsx(v,{href:route("login"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-metal",children:"¿Ya tienes una cuenta? Inicia Sesión"}),e.jsx(b,{className:"ms-4",disabled:p,children:"Regístrate"})]})]})]})}export{k as default};
