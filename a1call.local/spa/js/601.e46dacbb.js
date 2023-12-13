"use strict";(globalThis["webpackChunkquasar_project"]=globalThis["webpackChunkquasar_project"]||[]).push([[601],{2409:(e,t,a)=>{a.d(t,{f:()=>n});var l=a(7363);const n=(0,l.Q_)("loader",{state:()=>({counter:0}),getters:{isLoading:e=>e.counter>0},actions:{on(){this.counter++},off(){this.counter>0&&this.counter--}}})},7297:(e,t,a)=>{a.d(t,{_:()=>d});a(4110);var l=a(7363),n=a(1947),r=a(1569),o=a(499),i=a(9835);let s=(0,o.iH)(!1);const d=(0,l.Q_)("profile",{state:()=>({name:"anonymous",email:"",avatar:"https://cdn.quasar.dev/img/boy-avatar.png",orders:[],status:{NEW:"Новый",NOT_PAID:"Не оплачен",PAID:"Оплачен",WARNING:"Срок действия подходит к концу",EXPIRED:"Истек срок действия",PENDING_PAID:"Ожидает оплаты",PENDING_CONTINUE_PAID:"Ожидает оплаты для продления тарифа",PARTIAL_PAID:"Часитчно оплачен"}}),getters:{tariffDays:e=>t=>{const a=e.orders.find((e=>e.id===t));if(null===a||void 0===a||!a.start||null===a||void 0===a||!a.expires)return 0;const l=new Date(a.expires),n=new Date(a.start),r=l-n;return Math.round(r/864e5)},tariffExpired(e){return!1},tariffStartDate:e=>t=>{const a=e.orders.find((e=>e.id===t));try{return new Intl.DateTimeFormat(n.Z.lang.getLocale(),{dateStyle:"medium"}).format(new Date(a.start))||a.start}catch(l){return console.log("tariffStartDate format err: ",a.start),a.start}},tariffExpiredDate:e=>t=>{const a=e.orders.find((e=>e.id===t));try{return new Intl.DateTimeFormat(n.Z.lang.getLocale(),{dateStyle:"medium"}).format(new Date(a.expires))||a.expires}catch(l){return console.log("tariffExpiredDate format err: ",a.expires),a.expires}},tariffDayLeft:e=>t=>{const a=e.orders.find((e=>e.id===t));if(null===a||void 0===a||!a.expires||null===a||void 0===a||!a.start)return 0;const l=new Date(a.expires),n=new Date(a.start),r=l-n;return Math.round(r/864e5)},tariffDayLeftPrecent:function(e){return e=>100*this.tariffDayLeft(e)/this.tariffDays(e)},tariff(e){return t=>{var a;const l=e.orders.find((e=>e.id===t));let n=null;try{const e=(null===l||void 0===l?void 0:l.tariff)||null;n=JSON.parse(e)}catch(i){return null}if(null==n)return null;const r={...n};r["daysLeftPrecent"]=this.tariffDayLeftPrecent(t),r["daysLeft"]=this.tariffDayLeft(t),r["days"]=this.tariffDays(t),r["count"]=l.connect_amount,r["raw_status"]=l.status,r["status"]=e.status[l.status],r["ext_data"]=l.tariff_extdata?JSON.parse(l.tariff_extdata):{};const o=null===(a=r["ext_data"])||void 0===a?void 0:a.static;if("undefined"!==typeof o&&null!==o){const e=r["options"].find((e=>{if("IP-адрес"==e.title)return!0}));!0===o?e.value="статический":!1===o&&(e.value="динамический")}return r}},orderItem:e=>t=>e.orders.find((e=>e.id===t))},actions:{async fetch(){return s.value||(s.value=!0,r.api.get("/profile.php").then((e=>{const t=(null===e||void 0===e?void 0:e.data)||null;t&&(this.name=(null===t||void 0===t?void 0:t.fullname)||(null===t||void 0===t?void 0:t.username)||"",this.avatar=(null===t||void 0===t?void 0:t.photo)||"/assets/photouser/default.jpg",this.email=t.email||"",this.logout=t.logout||"/authentication/?service=logout",this.edit=t.edit||"/profile",Array.isArray(t.orders)&&t.orders.length>0?this.orders=t.orders:this.orders=[])})).catch((e=>{console.log(e)})).finally((()=>{s.value=!1}))),new Promise((e=>{const t=(0,i.YP)((()=>1==s.value),(()=>{s.value||(t(),e())}),{immediate:!0})}))},removeOrderById(e){const t=this.orders.findIndex((t=>t.id===e));this.orders.splice(t,1)},update({country:e,monthAmount:t,tariff:a,options:l,count:n,payment_system:o}){const i={action:"new",country:e,monthAmount:t,tariff:a,tariff_extdata:l,count:n,payment_system:o};return r.api.post("/buy.php",i).then((e=>(console.log("profile update: ",e),e))).catch((e=>(console.log("profile update err: ",e),Promise.reject(e))))}}})},5138:(e,t,a)=>{a.d(t,{Z:()=>I});var l=a(9835),n=a(6970);const r={key:0,class:"q-pa-md"},o={class:"text-subtitle1"};function i(e,t,a,i,s,d){const u=(0,l.up)("q-toolbar-title"),m=(0,l.up)("q-toolbar"),c=(0,l.up)("q-item-label"),f=(0,l.up)("q-item-section"),p=(0,l.up)("q-item"),w=(0,l.up)("q-skeleton"),y=(0,l.up)("q-img"),_=(0,l.up)("q-avatar"),v=(0,l.up)("q-badge"),g=(0,l.up)("q-list"),W=(0,l.Q2)("ripple");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",null,[(0,l.Wm)(m,{class:"bg-primary text-white shadow-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(u,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("paymentSelect")),1)])),_:1})])),_:1})]),(0,l.Wm)(g,{bordered:""},{default:(0,l.w5)((()=>[(0,l.Wm)(p,null,{default:(0,l.w5)((()=>[(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,{header:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("paymentDisclaymer")),1)])),_:1})])),_:1})])),_:1}),e.paymentSystems.list.length<=0?((0,l.wg)(),(0,l.iD)("div",r,[(0,l.Wm)(p,{style:{"max-width":"300px"}},{default:(0,l.w5)((()=>[(0,l.Wm)(f,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"QAvatar"})])),_:1}),(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text"})])),_:1}),(0,l.Wm)(c,{caption:""},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text",width:"65%"})])),_:1})])),_:1})])),_:1}),(0,l.Wm)(p,{style:{"max-width":"300px"}},{default:(0,l.w5)((()=>[(0,l.Wm)(f,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"QAvatar"})])),_:1}),(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text"})])),_:1}),(0,l.Wm)(c,{caption:""},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text",width:"90%"})])),_:1})])),_:1})])),_:1}),(0,l.Wm)(p,{style:{"max-width":"300px"}},{default:(0,l.w5)((()=>[(0,l.Wm)(f,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"QAvatar"})])),_:1}),(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text",width:"35%"})])),_:1}),(0,l.Wm)(c,{caption:""},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text"})])),_:1})])),_:1})])),_:1})])):(0,l.kq)("",!0),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.paymentSystems.list,(t=>(0,l.wy)(((0,l.wg)(),(0,l.j4)(p,{clickable:"",key:t.name,onClick:a=>e.paymentType=t.name,class:(0,n.C_)({"bg-accent text-white":e.paymentType===t.name})},{default:(0,l.w5)((()=>[(0,l.Wm)(f,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(_,{class:(0,n.C_)(e.paymentType===t.name?"bg-accent":e.isDark?"bg-dark":"bg-white")},{default:(0,l.w5)((()=>[(0,l.Wm)(y,{src:t.logoUrl,"no-spinner":""},{error:(0,l.w5)((()=>[(0,l._)("div",{class:(0,n.C_)(["fit flex flex-center text-info",e.paymentType===t.name?"bg-accent":e.isDark?"bg-dark":"bg-white"])},null,2)])),_:2},1032,["src"])])),_:2},1032,["class"])])),_:2},1024),(0,l.Wm)(f,null,{default:(0,l.w5)((()=>[(0,l._)("div",o,[(0,l.Uk)((0,n.zw)(t.title)+" ",1),(0,l.Wm)(v,{align:"middle"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(t.currency),1)])),_:2},1024)])])),_:2},1024)])),_:2},1032,["onClick","class"])),[[W]]))),128))])),_:1})],64)}a(4110);var s=a(7363),d=a(1569);const u=(0,s.Q_)("paymentStore",{state:()=>({list:[]}),getters:{selectList:e=>[]},actions:{async fetch(){return console.log("paymentStore fetch"),d.api.get("/buy.php").then((e=>{const t=e.data;this.list=t})).catch((e=>{console.log(e)})).finally((()=>{}))}}}),m=(0,l.aZ)({name:"SelectPaymentSystem",props:{modelValue:String},setup(e,{emit:t}){const a=u();a.fetch().then((()=>{}));const n=(0,l.Fl)({get:()=>e.modelValue,set:e=>t("update:modelValue",e)});return{paymentType:n,paymentSystems:a}}});var c=a(1639),f=a(1663),p=a(1973),w=a(3246),y=a(490),_=a(1233),v=a(3115),g=a(7133),W=a(1357),h=a(1487),k=a(990),x=a(1136),D=a(9984),q=a.n(D);const b=(0,c.Z)(m,[["render",i]]),I=b;q()(m,"components",{QToolbar:f.Z,QToolbarTitle:p.Z,QList:w.Z,QItem:y.Z,QItemSection:_.Z,QItemLabel:v.Z,QSkeleton:g.ZP,QAvatar:W.Z,QImg:h.Z,QBadge:k.Z}),q()(m,"directives",{Ripple:x.Z})},8601:(e,t,a)=>{a.r(t),a.d(t,{default:()=>K});var l=a(9835),n=a(6970);const r={class:"text-h4"};function o(e,t,a,o,i,s){const d=(0,l.up)("q-skeleton"),u=(0,l.up)("q-card-section"),m=(0,l.up)("q-item-section"),c=(0,l.up)("q-item-label"),f=(0,l.up)("q-item"),p=(0,l.up)("q-card-actions"),w=(0,l.up)("q-card"),y=(0,l.up)("q-separator"),_=(0,l.up)("q-btn"),v=(0,l.up)("current-tariff"),g=(0,l.up)("q-page");return(0,l.wg)(),(0,l.j4)(g,{padding:"",class:"flex flex-center"},{default:(0,l.w5)((()=>[e.isLoading?((0,l.wg)(),(0,l.j4)(w,{key:0,class:"kw-tariff--card"},{default:(0,l.w5)((()=>[(0,l.Wm)(u,null,{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:"text",square:"",width:"30%",animation:"fade"}),(0,l.Wm)(d,{type:"text",square:"",height:"12px",animation:"fade"}),(0,l.Wm)(d,{type:"text",square:"",height:"12px",width:"75%",animation:"fade"})])),_:1}),(0,l.Wm)(u,null,{default:(0,l.w5)((()=>[((0,l.wg)(),(0,l.iD)(l.HY,null,(0,l.Ko)(5,(e=>(0,l.Wm)(f,{key:e},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:"QAvatar"})])),_:1}),(0,l.Wm)(m,null,{default:(0,l.w5)((()=>[(0,l.Wm)(c,null,{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:"text"})])),_:1}),(0,l.Wm)(c,{caption:""},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:"text"})])),_:1})])),_:1})])),_:2},1024))),64))])),_:1}),(0,l.Wm)(p,{align:"right",class:"q-gutter-md"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{type:"QBtn"}),(0,l.Wm)(d,{type:"QBtn"})])),_:1})])),_:1})):e.isLoading||e.isOrders?((0,l.wg)(!0),(0,l.iD)(l.HY,{key:2},(0,l.Ko)(e.orders,(e=>((0,l.wg)(),(0,l.j4)(v,{key:e.id,orderId:e.id},null,8,["orderId"])))),128)):((0,l.wg)(),(0,l.j4)(w,{key:1,class:"kw-tariff--card",bordered:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{class:"bg-negative text-white"},{default:(0,l.w5)((()=>[(0,l._)("div",r,(0,n.zw)(e.$t("tariffNotSelect")),1)])),_:1}),(0,l.Wm)(y,{inset:""}),(0,l.Wm)(p,{vertical:""},{default:(0,l.w5)((()=>[(0,l.Wm)(_,{class:"q-px-md",color:"primary",icon:"more_time",label:e.$t("selectPlanBtn"),onClick:t[0]||(t[0]=t=>e.$router.push("/new-tariff"))},null,8,["label"])])),_:1})])),_:1}))])),_:1})}a(4110),a(8964);var i=a(8339),s=a(9302),d=(a(6827),a(7297)),u=a(2409);const m={class:"text-h6"},c={key:0,class:"text-subtitle2"},f={key:0};function p(e,t,a,r,o,i){const s=(0,l.up)("q-card-section"),d=(0,l.up)("q-separator"),u=(0,l.up)("q-icon"),p=(0,l.up)("q-circular-progress"),w=(0,l.up)("q-item-section"),y=(0,l.up)("q-item-label"),_=(0,l.up)("q-item"),v=(0,l.up)("q-expansion-item"),g=(0,l.up)("q-btn"),W=(0,l.up)("q-card-actions"),h=(0,l.up)("q-card");return e.tariff?((0,l.wg)(),(0,l.j4)(h,{key:0,class:"kw-tariff--card",bordered:""},{default:(0,l.w5)((()=>[(0,l.Wm)(s,{class:(0,n.C_)(["bg-"+e.tariff.color,"text-white"])},{default:(0,l.w5)((()=>[(0,l._)("div",m,(0,n.zw)(e.tariff.name),1),e.KWDEBUG?((0,l.wg)(),(0,l.iD)("div",c,(0,n.zw)(e.orderId),1)):(0,l.kq)("",!0)])),_:1},8,["class"]),(0,l.Wm)(d,{inset:""}),(0,l.Wm)(s,null,{default:(0,l.w5)((()=>[(0,l.Wm)(p,{"show-value":"",class:"text-white absolute kw-float",value:e.tariff.daysLeftPrecent,size:"80px",thickness:.3,color:e.progressColor,"center-color":"grey-8","track-color":"transparent"},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{name:"date_range"})])),_:1},8,["value","thickness","color"]),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"accent",name:"credit_score"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.tariff.status)+" ",1),e.partialPay?((0,l.wg)(),(0,l.iD)("span",f,"("+(0,n.zw)(e.partialPay)+")",1)):(0,l.kq)("",!0)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("orderStatus")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"primary",name:"date_range"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.tariff.daysLeft),1)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("tariffDaysLeft")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"primary",name:"calendar_month"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.tariff.days),1)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("tariffDaysTotal")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"primary",name:"place"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.tariff.country.label),1)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("country")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"primary",name:"event_repeat"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.tariff.monthAmount.label),1)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("tariffMonthAmount")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"primary",name:"devices_other"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.tariff.count),1)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("tariffConnection")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"secondary",name:"edit_calendar"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.profile.tariffStartDate(e.orderId)),1)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("tariffStartDate")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(_,null,{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"negative",name:"free_cancellation"})])),_:1}),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.profile.tariffExpiredDate(e.orderId)),1)])),_:1}),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.$t("tariffEndDate")),1)])),_:1})])),_:1})])),_:1}),(0,l.Wm)(v,{"expand-separator":"","header-class":"text-info",icon:"read_more",label:e.$t("expandTariff")},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.tariff.options,(e=>((0,l.wg)(),(0,l.j4)(_,{key:e.title},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{avatar:""},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{color:"info",name:e.icon},null,8,["name"])])),_:2},1024),(0,l.Wm)(w,null,{default:(0,l.w5)((()=>[(0,l.Wm)(y,null,{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.value),1)])),_:2},1024),(0,l.Wm)(y,{caption:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.title),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1},8,["label"])])),_:1}),(0,l.Wm)(d,{inset:""}),(0,l.Wm)(W,{vertical:""},{default:(0,l.w5)((()=>["PAID"==e.tariff.raw_status&&e.isDownload?((0,l.wg)(),(0,l.j4)(g,{key:0,class:"q-px-md",color:"accent",icon:"download",label:e.$t("downloadConfig"),onClick:e.download},null,8,["label","onClick"])):(0,l.kq)("",!0),"PENDING_PAID"==e.tariff.raw_status||"PENDING_CONTINUE_PAID"==e.tariff.raw_status?((0,l.wg)(),(0,l.j4)(g,{key:1,class:"q-px-md",color:"primary",icon:"payment",label:e.$t("payPlanBtn"),onClick:e.moretime},null,8,["label","onClick"])):"PAID"!=e.tariff.raw_status?((0,l.wg)(),(0,l.j4)(g,{key:2,class:"q-px-md",color:"primary",icon:"payment",label:e.$t("payPlanBtn"),onClick:e.dialogPaymentSystem},null,8,["label","onClick"])):(0,l.kq)("",!0),"PAID"!=e.tariff.raw_status?((0,l.wg)(),(0,l.j4)(g,{key:3,class:"q-px-md",color:"negative",icon:"delete_forever",label:e.$t("removePlayBtn"),onClick:e.removePlan},null,8,["label","onClick"])):(0,l.kq)("",!0),"PAID"==e.tariff.raw_status?((0,l.wg)(),(0,l.j4)(g,{key:4,class:"q-px-md",color:"deep-orange",icon:"more_time",label:e.$t("extendPlanBtn"),onClick:e.dialogPaymentSystem},null,8,["label","onClick"])):(0,l.kq)("",!0)])),_:1})])),_:1})):(0,l.kq)("",!0)}a(6822),a(702),a(4641),a(3269);var w=a(1569);const y={class:"text-h6"};function _(e,t,a,r,o,i){const s=(0,l.up)("q-card-section"),d=(0,l.up)("select-payment-system"),u=(0,l.up)("q-separator"),m=(0,l.up)("q-btn"),c=(0,l.up)("q-card-actions"),f=(0,l.up)("q-card"),p=(0,l.up)("q-dialog");return(0,l.wg)(),(0,l.j4)(p,{ref:"dialogRef",onHide:e.onDialogHide},{default:(0,l.w5)((()=>[(0,l.Wm)(f,{style:{width:"400px","max-width":"80vw"}},{default:(0,l.w5)((()=>[(0,l.Wm)(s,null,{default:(0,l.w5)((()=>[(0,l._)("div",y,(0,n.zw)(e.$t("extendPlanBtn")),1)])),_:1}),(0,l.Wm)(s,null,{default:(0,l.w5)((()=>[(0,l.Wm)(d,{modelValue:e.paymentType,"onUpdate:modelValue":t[0]||(t[0]=t=>e.paymentType=t)},null,8,["modelValue"])])),_:1}),(0,l.Wm)(u),(0,l.Wm)(c,{align:"right"},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{class:"q-px-md",color:"deep-orange",icon:"credit_score",disable:e.paymentType,label:e.$t("pay"),onClick:t[1]||(t[1]=t=>e.onOKClick(e.paymentType))},null,8,["disable","label"])])),_:1})])),_:1})])),_:1},8,["onHide"])}var v=a(499),g=a(4182),W=a(5138);const h=(0,l.aZ)({name:"DialogPaymentSystem",components:{SelectPaymentSystem:W.Z},props:{},emits:[...g.Z.emits],setup(e){const{dialogRef:t,onDialogHide:a,onDialogOK:l,onDialogCancel:n}=(0,g.Z)(),r=(0,v.iH)("");return{paymentType:r,dialogRef:t,onDialogHide:a,onOKClick(e){l(e)},onCancelClick:n}}});var k=a(1639),x=a(2074),D=a(4458),q=a(3190),b=a(926),I=a(1821),P=a(4455),Z=a(9984),Q=a.n(Z);const C=(0,k.Z)(h,[["render",_]]),A=C;Q()(h,"components",{QDialog:x.Z,QCard:D.Z,QCardSection:q.Z,QSeparator:b.Z,QCardActions:I.Z,QBtn:P.Z});a(7286);var S=a(9120);const U=(0,l.aZ)({name:"CurrentTariff",components:{},props:{orderId:{type:Number,required:!0}},setup(e){const t=(0,s.Z)(),a=(0,i.tv)(),n=(0,u.f)(),r=(0,l.Fl)((()=>n.isLoading));let o="";const m=!0,c=(0,d._)(),f=(0,l.Fl)((()=>c.tariff(e.orderId)));console.log("tariff ",f.value);const p=(0,l.Fl)((()=>c.orderItem(e.orderId))),y=(0,l.Fl)((()=>{let e="red";return f.value.daysLeftPrecent>50&&"PAID"==f.value.raw_status?e="positive":(f.value.daysLeftPrecent>30||"WARNING"==f.value.raw_status)&&(e="warning"),"EXPIRED"!=f.value.raw_status&&"NOT_PAID"!=f.value.raw_status||(e="red"),e})),_=(0,l.Fl)((()=>!0));let v=()=>{};const g=()=>{v=t.notify({spinner:S.Z,message:"Пожалуйста подождите..",timeout:0})},W=()=>{t.dialog({title:"Стоимость тарифа не определена.",message:"Вы оставили контактные данные — менеджер свяжется с Вами для согласования условий и выставления счета."}).onOk((()=>{})).onCancel((()=>{})).onDismiss((()=>{}))},h=()=>{0==f.value.price.month&&"PAID"!=f.value.raw_status?W():0==f.value.price.month?(o="not pay",k()):t.dialog({component:A,componentProps:{}}).onOk((e=>{o=e,k()})).onCancel((()=>{o=""})).onDismiss((()=>{}))},k=()=>{var l,r;g(),n.on(),w.api.post("/buy.php",{action:"moretime",orderId:e.orderId,monthAmount:null===(l=f.value)||void 0===l?void 0:l.monthAmount,count:null===(r=f.value)||void 0===r?void 0:r.count,payment_system:o}).then((e=>{var t,l,n,r,o,i;console.log(e);let s=null===(t=e.data)||void 0===t?void 0:t.status;if("payment_system"==s)return h(),Promise.resolve();let d=null===(l=e.data)||void 0===l?void 0:l.res;var u;("string"===typeof(null===(n=e.data)||void 0===n?void 0:n.res)||(null===(r=e.data)||void 0===r?void 0:r.res)instanceof String)&&(d=JSON.parse(null===(u=e.data)||void 0===u?void 0:u.res));if(1==(null===(o=d)||void 0===o?void 0:o.success))return void a.go({path:"/",query:{notrequirepay:!0}});let m=null===(i=d)||void 0===i?void 0:i.url;var c;if(!m)return console.log("get payment url error: ",e.data),Promise.reject(new Error(null!==(c=d)&&void 0!==c&&c.msg?"Сообщение от ситсемы оплаты: ".resData.msg:"Ошибка ситсемы оплаты, попробуйте еще раз или позже. При повторном возникновении ошибки - свяжитесь с тех.поддержкой. Спасибо."));location.href=m})).catch((e=>{var a;console.log(e),t.notify({type:"negative",message:(null===e||void 0===e||null===(a=e.response)||void 0===a?void 0:a.data)||"Простите произошла Ошибка! Мы уже работаем над этим.",timeout:4e3})})).finally((()=>{v(),n.off()}))},x=()=>{g(),w.api.post("/download.php",{action:"getconfig",orderId:e.orderId},{responseType:"blob"}).then((e=>{const t=window.URL.createObjectURL(new Blob([e.data])),a=document.createElement("a");a.href=t,a.setAttribute("download",`wgconfig для ${c.name} ${f.value.name}-тариф от ${p.value.start} до ${p.value.expires} подключений_${f.value.count}.zip`),document.body.appendChild(a),a.click()})).catch((e=>{var a;console.log(e.response),t.notify({type:"negative",message:(null===e||void 0===e||null===(a=e.response)||void 0===a?void 0:a.data)||"Произошла Ошибка! Попрбуйте еще раз.",timeout:4e3})})).finally((()=>{v()}))},D=()=>{g(),n.on(),w.api.post("/buy.php",{action:"remove",orderId:e.orderId}).then((t=>{c.removeOrderById(e.orderId)})).catch((e=>{var a;console.log(e),t.notify({type:"negative",message:(null===e||void 0===e||null===(a=e.response)||void 0===a?void 0:a.data)||"Произошла Ошибка! Попробуйте еще раз.",timeout:4e3})})).finally((()=>{v(),n.off()}))};let q="";const b=+p.value.payment_request_amount,I=+p.value.payment_paid_amount;return I!=b&&(q="NOT_PAID"==p.value.status?`${b.toFixed(2)}`:`${I.toFixed(2)}/${b.toFixed(2)}`),{removePlan:D,dialogPaymentSystem:h,partialPay:q,KWDEBUG:m,progressColor:y,isDownload:_,isLoading:r,tariff:f,profile:c,moretime:k,download:x,showProcess:g,hideProcess:v}}});var z=a(2857),L=a(3302),$=a(490),T=a(1233),N=a(3115),E=a(651);const j=(0,k.Z)(U,[["render",p]]),O=j;Q()(U,"components",{QCard:D.Z,QCardSection:q.Z,QSeparator:b.Z,QIcon:z.Z,QCircularProgress:L.Z,QItem:$.Z,QItemSection:T.Z,QItemLabel:N.Z,QExpansionItem:E.Z,QCardActions:I.Z,QBtn:P.Z});const B=(0,l.aZ)({name:"IndexPage",components:{CurrentTariff:O},setup(){const e=(0,s.Z)(),t=(0,i.yj)(),a=(0,i.tv)(),n=(0,u.f)(),r=(0,l.Fl)((()=>n.isLoading));n.on();const o=(0,d._)();o.fetch().finally(n.off);const m=(0,l.Fl)((()=>o.orders)),c=(0,l.Fl)((()=>Array.isArray(m.value)&&m.value.length>0));return t.query.payfail?(e.notify({type:"negative",progress:!0,message:"Произошла ошибка во время оплаты!",timeout:5e3}),a.replace({query:{}})):t.query.notrequirepay&&(e.notify({type:"warning",progress:!0,message:"Счет на оплату будет выставлен после соглосования условий.",timeout:1e4}),a.replace({query:{}})),{isOrders:c,isLoading:r,orders:m}}});var F=a(9885),H=a(7133);const R=(0,k.Z)(B,[["render",o]]),K=R;Q()(B,"components",{QPage:F.Z,QCard:D.Z,QCardSection:q.Z,QSkeleton:H.ZP,QItem:$.Z,QItemSection:T.Z,QItemLabel:N.Z,QCardActions:I.Z,QSeparator:b.Z,QBtn:P.Z})}}]);