import{J as k,ao as y,I as S,Y as B,P as F,O as j,L as o,i as s,aj as m,ap as A,X as t,ak as c,V as C,R as M}from"./index-7WHT3BMN.js";import{c as N,a as d,u as P,b as p}from"./index.esm-CVQi07rc.js";import{v as R}from"./index-Cy8drpsq.js";import{b as f}from"./route-block-B_A1xBdJ.js";import{V as g,a as V}from"./VRow-DT9y_4HD.js";import{V as U}from"./VDivider-HDWTKmgr.js";import{V as q}from"./VForm-Bp0R4WvH.js";import{V as T}from"./VContainer-7ZedbbTK.js";const $={class:"text-center"},D={__name:"login",setup(E){const{api:b}=B(),u=k(),v=y(),x=S(),h=N({account:d().required("必填").min(4,"最少4個字").max(20,"最多20個字").test("isAlphanumeric","使用者帳號格式不正確",r=>R.isAlphanumeric(r)),password:d().required("必填").min(4,"密碼太短").max(20,"密碼太長")}),{handleSubmit:w,isSubmitting:i}=P({validationSchema:h}),l=p("account"),n=p("password"),_=w(async r=>{var e;try{const{data:a}=await b.post("/user/login",{account:r.account,password:r.password});x.login(a.result),u({text:"登入成功",snackbarProps:{color:"green"}}),v.push("/")}catch(a){console.log(a),u({text:((e=a==null?void 0:a.response)==null?void 0:e.data.message)||"unknownError",snackbarProps:{color:"red"}})}});return(r,e)=>(j(),F(T,null,{default:o(()=>[s(g,{justify:"center"},{default:o(()=>[s(V,{cols:"12"},{default:o(()=>e[2]||(e[2]=[m("h1",{class:"text-center"},"登入",-1)])),_:1}),s(U)]),_:1}),s(g,{justify:"center",style:{height:"500px"}},{default:o(()=>[s(V,{cols:"6","align-self":"center"},{default:o(()=>[s(q,{disabled:t(i),onSubmit:A(t(_),["prevent"])},{default:o(()=>[s(c,{modelValue:t(l).value.value,"onUpdate:modelValue":e[0]||(e[0]=a=>t(l).value.value=a),"error-messages":t(l).errorMessage.value,label:"帳號",minlength:"4",maxlength:"20",counter:"",class:"mb-2"},null,8,["modelValue","error-messages"]),s(c,{modelValue:t(n).value.value,"onUpdate:modelValue":e[1]||(e[1]=a=>t(n).value.value=a),type:"password","error-messages":t(n).errorMessage.value,label:"密碼",minlength:"4",maxlength:"20",counter:"",class:"mb-5"},null,8,["modelValue","error-messages"]),m("div",$,[s(C,{loading:t(i),type:"submit",color:"white",height:"40"},{default:o(()=>e[3]||(e[3]=[M("登入")])),_:1},8,["loading"])])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};typeof f=="function"&&f(D);export{D as default};
