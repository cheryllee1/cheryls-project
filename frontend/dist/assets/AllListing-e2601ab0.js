import{_ as x}from"./books-d2b68110.js";import{d as h,p as g,o as r,c as d,a as t,b as w,w as m,f as _,u as a,H as b,F as y,h as v,r as k,m as A,i as L,t as o,L as B}from"./index-555c8711.js";import{m as C}from"./mapCondition-89b39abc.js";const D={class:"w-screen"},I={class:"mb-12 h-80 w-screen bg-cyan-700 text-center"},N={class:"text-left"},E=t("p",{class:"mb-5 pt-12 font-serif text-8xl"},"TradeMate",-1),R=t("p",{class:"font-serif text-4xl"},"A Barter Way of Life",-1),S=t("p",{class:"mb-3 ml-12 font-serif text-3xl"},"All listings",-1),T=t("p",{class:"mb-8 ml-12 font-sans text-base italic"}," Reach out to trademates via email to initiate a trade request. All listings will be automatically removed after two weeks. ",-1),V={class:"m-8 mx-auto grid w-2/3 grid-cols-3 gap-4"},q={class:"font-arial text-base"},F={class:"font-arial mb-3 text-sm text-gray-500"},H=t("img",{src:x,class:"aspect-square w-72 object-cover"},null,-1),j={class:"font-arial mt-3 text-base font-bold"},$=h({__name:"AllListing",props:{categoryId:null},async setup(p){let s,i;const f=p,{res:n,err:c}=([s,i]=g(()=>A.useDefault().GET(`/listing?categoryId=${f.categoryId}`).runJSON()),s=await s,i(),s);if(c)throw c;if(!n.ok)throw console.log(n),new Error("did not get listings");const u=n.data;return(G,J)=>{const l=k("router-link");return r(),d("div",D,[t("div",I,[t("div",N,[w(l,{to:{name:a(b).name},class:"ml-4 mt-4 text-4xl"},{default:m(()=>[_(" < ")]),_:1},8,["to"])]),E,R]),S,T,t("div",V,[(r(!0),d(y,null,v(a(u),e=>(r(),L(l,{to:{name:a(B).name,params:{listingId:e.id}},class:""},{default:m(()=>[t("p",q,o(e.username),1),t("p",F,o(new Date(e.createdAt).toLocaleDateString()),1),H,_(" "+o(e.title)+" ",1),t("p",j,o(a(C)[e.condition]),1)]),_:2},1032,["to"]))),256))])])}}});export{$ as default};
