(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=(t(19),t(2)),l=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.add},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.name,onChange:e.nameChange}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:e.number,onChange:e.numberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},i=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"filter by name"),r.a.createElement("form",{onSubmit:e.results},r.a.createElement("input",{value:e.term,onChange:e.search})))},m=function(e){return r.a.createElement("p",null,e.person.name," ",e.person.number," ",r.a.createElement("button",{onClick:e.remove,title:e.person.id}," Delete "))},f=function(e){return r.a.createElement("div",null,e.people.map((function(n){return r.a.createElement(m,{person:n,remove:e.remove})})))},s=function(e){var n={color:"green",fontSize:20,textAlign:"center"};return""!==e.message&&null!==e.message&&(n.border="solid"),r.a.createElement("div",{style:n},r.a.createElement("p",null,e.message))},d=t(3),b=t.n(d),p="/api/persons",h=function(){return b.a.get(p).then((function(e){return e.data}))},v=function(e){return b.a.post(p,e).then((function(e){return e.data}))},E=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return b.a.delete("".concat(p,"/").concat(e))},j=function(){Object(a.useEffect)((function(){h().then((function(e){u(e),J(e)}))}),[]);var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),m=Object(c.a)(o,2),d=m[0],b=m[1],p=Object(a.useState)(""),j=Object(c.a)(p,2),O=j[0],w=j[1],C=Object(a.useState)(""),S=Object(c.a)(C,2),k=S[0],y=S[1],D=Object(a.useState)(t),T=Object(c.a)(D,2),x=T[0],J=T[1],z=Object(a.useState)(""),A=Object(c.a)(z,2),B=A[0],I=A[1];return r.a.createElement("div",null,r.a.createElement(s,{message:B}),r.a.createElement(i,{results:function(e){e.preventDefault();var n=t.filter((function(e){return e.name.toLowerCase().includes(k)}));J(n)},search:function(e){y(e.target.value)},term:k}),r.a.createElement("h2",null,"Phonebook"),r.a.createElement(l,{add:function(e){e.preventDefault();var n=t.find((function(e){return e.name==d}));if(void 0!==n){if(""==O)alert("".concat(d," is already in the notebook"));else if(window.confirm("want to update phone number")){var a={name:d,number:O},r=n.id;console.log(a),E(r,a).then((function(e){u(t.map((function(n){return n.id!==r?n:e}))),J(x.map((function(n){return n.id!==r?n:e}))),console.log(x),I("updated ".concat(e.name)),setTimeout((function(){I(null)}),5e3)}))}b(""),w("")}else if(""!==O){v({name:d,number:O}).then((function(e){u(t.concat(e)),J(t.concat(e)),I("created ".concat(e.name)),setTimeout((function(){I(null)}),5e3),b(""),w("")}))}else alert("enter a phone number")},nameChange:function(e){b(e.target.value)},numberChange:function(e){w(e.target.value)},name:d,number:O}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{people:x,remove:function(e){var n=e.target.title;window.confirm("you really want to delete this?")&&g(n).then((function(){var e=t.find((function(e){return e.id==n})).name;I("removed ".concat(e)),setTimeout((function(){I(null)}),5e3),J(x.filter((function(e){return e.id!=n}))),u(t.filter((function(e){return e.id!=n})))}))}}))};o.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.65b069af.chunk.js.map