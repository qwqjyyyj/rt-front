import{g as p,p as ee,bD as te,u as ae,bE as ne,c as y,r as v,s as le,e as oe,o as ue,w as x,b as ie,h as re,ax as se,bF as E,bG as ce,i as l,M as k,bH as de,bI as fe,j as R,a2 as G,a3 as ve,bJ as xe,a_ as me,bK as ge,bL as he,af as S,E as we,a as Ve,bM as ye}from"./index-7WHT3BMN.js";const be=ee({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...he(),...ge()},"VTextarea"),Ce=p()({name:"VTextarea",directives:{Intersect:te},inheritAttrs:!1,props:be(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,T){let{attrs:b,emit:M,slots:i}=T;const o=ae(e,"modelValue"),{isFocused:f,focus:D,blur:U}=ne(e),O=y(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value||"").toString().length),j=y(()=>{if(b.maxlength)return b.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function $(t,n){var a,u;!e.autofocus||!t||(u=(a=n[0].target)==null?void 0:a.focus)==null||u.call(a)}const H=v(),m=v(),B=le(""),g=v(),J=y(()=>e.persistentPlaceholder||f.value||e.active);function F(){var t;g.value!==document.activeElement&&((t=g.value)==null||t.focus()),f.value||D()}function K(t){F(),M("click:control",t)}function L(t){M("mousedown:control",t)}function q(t){t.stopPropagation(),F(),S(()=>{o.value="",ye(e["onClick:clear"],t)})}function Q(t){var a;const n=t.target;if(o.value=n.value,(a=e.modelModifiers)!=null&&a.trim){const u=[n.selectionStart,n.selectionEnd];S(()=>{n.selectionStart=u[0],n.selectionEnd=u[1]})}}const c=v(),h=v(+e.rows),C=y(()=>["plain","underlined"].includes(e.variant));oe(()=>{e.autoGrow||(h.value=+e.rows)});function d(){e.autoGrow&&S(()=>{if(!c.value||!m.value)return;const t=getComputedStyle(c.value),n=getComputedStyle(m.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),u=c.value.scrollHeight,w=parseFloat(t.lineHeight),P=Math.max(parseFloat(e.rows)*w+a,parseFloat(n.getPropertyValue("--v-input-control-height"))),I=parseFloat(e.maxRows)*w+a||1/0,s=Ve(u??0,P,I);h.value=Math.floor((s-a)/w),B.value=we(s)})}ue(d),x(o,d),x(()=>e.rows,d),x(()=>e.maxRows,d),x(()=>e.density,d);let r;return x(c,t=>{t?(r=new ResizeObserver(d),r.observe(c.value)):r==null||r.disconnect()}),ie(()=>{r==null||r.disconnect()}),re(()=>{const t=!!(i.counter||e.counter||e.counterValue),n=!!(t||i.details),[a,u]=se(b),{modelValue:w,...P}=E.filterProps(e),I=ce(e);return l(E,R({ref:H,modelValue:o.value,"onUpdate:modelValue":s=>o.value=s,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":C.value},e.class],style:e.style},a,P,{centerAffix:h.value===1&&!C.value,focused:f.value}),{...i,default:s=>{let{id:V,isDisabled:N,isDirty:_,isReadonly:W,isValid:X}=s;return l(fe,R({ref:m,style:{"--v-textarea-control-height":B.value},onClick:K,onMousedown:L,"onClick:clear":q,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},I,{id:V.value,active:J.value||_.value,centerAffix:h.value===1&&!C.value,dirty:_.value||e.dirty,disabled:N.value,focused:f.value,error:X.value===!1}),{...i,default:Y=>{let{props:{class:z,...A}}=Y;return l(k,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),G(l("textarea",R({ref:g,class:z,value:o.value,onInput:Q,autofocus:e.autofocus,readonly:W.value,disabled:N.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:F,onBlur:U},A,u),null),[[ve("intersect"),{handler:$},null,{once:!0}]]),e.autoGrow&&G(l("textarea",{class:[z,"v-textarea__sizer"],id:`${A.id}-sizer`,"onUpdate:modelValue":Z=>o.value=Z,ref:c,readonly:!0,"aria-hidden":"true"},null),[[xe,o.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:n?s=>{var V;return l(k,null,[(V=i.details)==null?void 0:V.call(i,s),t&&l(k,null,[l("span",null,null),l(de,{active:e.persistentCounter||f.value,value:O.value,max:j.value,disabled:e.disabled},i.counter)])])}:void 0})}),me({},H,m,g)}});export{Ce as V};
