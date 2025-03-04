import{g as C,p as m,c as S,bV as k,z as N,C as V,bW as i,ba as u}from"./index-7WHT3BMN.js";const j=i.reduce((e,a)=>(e[a]={type:[Boolean,String,Number],default:!1},e),{}),v=i.reduce((e,a)=>{const t="offset"+u(a);return e[t]={type:[String,Number],default:null},e},{}),L=i.reduce((e,a)=>{const t="order"+u(a);return e[t]={type:[String,Number],default:null},e},{}),y={col:Object.keys(j),offset:Object.keys(v),order:Object.keys(L)};function G(e,a,t){let s=e;if(!(t==null||t===!1)){if(a){const n=a.replace(e,"");s+=`-${n}`}return e==="col"&&(s="v-"+s),e==="col"&&(t===""||t===!0)||(s+=`-${t}`),s.toLowerCase()}}const _=["auto","start","end","center","baseline","stretch"],I=m({cols:{type:[Boolean,String,Number],default:!1},...j,offset:{type:[String,Number],default:null},...v,order:{type:[String,Number],default:null},...L,alignSelf:{type:String,default:null,validator:e=>_.includes(e)},...V(),...N()},"VCol"),x=C()({name:"VCol",props:I(),setup(e,a){let{slots:t}=a;const s=S(()=>{const n=[];let l;for(l in y)y[l].forEach(o=>{const c=e[o],g=G(l,o,c);g&&n.push(g)});const r=n.some(o=>o.startsWith("v-col-"));return n.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),n});return()=>{var n;return k(e.tag,{class:[s.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}}),f=["start","end","center"],$=["space-between","space-around","space-evenly"];function d(e,a){return i.reduce((t,s)=>{const n=e+u(s);return t[n]=a(),t},{})}const R=[...f,"baseline","stretch"],h=e=>R.includes(e),w=d("align",()=>({type:String,default:null,validator:h})),T=[...f,...$],P=e=>T.includes(e),E=d("justify",()=>({type:String,default:null,validator:P})),U=[...f,...$,"stretch"],A=e=>U.includes(e),O=d("alignContent",()=>({type:String,default:null,validator:A})),b={align:Object.keys(w),justify:Object.keys(E),alignContent:Object.keys(O)},B={align:"align",justify:"justify",alignContent:"align-content"};function M(e,a,t){let s=B[e];if(t!=null){if(a){const n=a.replace(e,"");s+=`-${n}`}return s+=`-${t}`,s.toLowerCase()}}const F=m({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h},...w,justify:{type:String,default:null,validator:P},...E,alignContent:{type:String,default:null,validator:A},...O,...V(),...N()},"VRow"),z=C()({name:"VRow",props:F(),setup(e,a){let{slots:t}=a;const s=S(()=>{const n=[];let l;for(l in b)b[l].forEach(r=>{const o=e[r],c=M(l,r,o);c&&n.push(c)});return n.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),n});return()=>{var n;return k(e.tag,{class:["v-row",s.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}});export{z as V,x as a};
