import{s as Z,q as y,e as v,a as C,c as b,b as S,h as N,f as _,j as p,l as P,m as g,y as x,z as $,A as ee,t as E,d as w,n as F,H as R,D as q,x as V}from"./scheduler.vwrL6P9E.js";import{S as le,i as te,a as se,t as ne}from"./index.kO2rGTCX.js";import{e as D}from"./each.ug4NFR6d.js";import{m as ae,r as Y}from"./utils.IImh6JCv.js";function z(o,e,s){const i=o.slice();return i[9]=e[s],i}function H(o,e,s){const i=o.slice();return i[9]=e[s],i}function J(o,e,s){const i=o.slice();return i[9]=e[s],i}function W(o){let e,s,i;return{c(){e=v("span"),s=E(o[0]),i=E(" mins"),this.h()},l(a){e=b(a,"SPAN",{class:!0});var f=S(e);s=w(f,o[0]),i=w(f," mins"),f.forEach(_),this.h()},h(){p(e,"class","svelte-3l8f9b")},m(a,f){P(a,e,f),g(e,s),g(e,i)},p(a,f){f&1&&F(s,a[0])},d(a){a&&_(e)}}}function B(o){let e,s=new Date(o[2]).getFullYear()+"",i;return{c(){e=v("span"),i=E(s),this.h()},l(a){e=b(a,"SPAN",{class:!0});var f=S(e);i=w(f,s),f.forEach(_),this.h()},h(){p(e,"class","svelte-3l8f9b")},m(a,f){P(a,e,f),g(e,i)},p(a,f){f&4&&s!==(s=new Date(a[2]).getFullYear()+"")&&F(i,s)},d(a){a&&_(e)}}}function G(o){let e,s=D(o[3].split(",")),i=[];for(let a=0;a<s.length;a+=1)i[a]=I(J(o,s,a));return{c(){e=v("span");for(let a=0;a<i.length;a+=1)i[a].c();this.h()},l(a){e=b(a,"SPAN",{class:!0});var f=S(e);for(let l=0;l<i.length;l+=1)i[l].l(f);f.forEach(_),this.h()},h(){p(e,"class","svelte-3l8f9b")},m(a,f){P(a,e,f);for(let l=0;l<i.length;l+=1)i[l]&&i[l].m(e,null)},p(a,f){if(f&8){s=D(a[3].split(","));let l;for(l=0;l<s.length;l+=1){const t=J(a,s,l);i[l]?i[l].p(t,f):(i[l]=I(t),i[l].c(),i[l].m(e,null))}for(;l<i.length;l+=1)i[l].d(1);i.length=s.length}},d(a){a&&_(e),R(i,a)}}}function I(o){let e,s=o[9]+"",i;return{c(){e=v("span"),i=E(s)},l(a){e=b(a,"SPAN",{});var f=S(e);i=w(f,s),f.forEach(_)},m(a,f){P(a,e,f),g(e,i)},p(a,f){f&8&&s!==(s=a[9]+"")&&F(i,s)},d(a){a&&_(e)}}}function K(o){let e,s,i,a,f="Data from JustWatch",l=o[6].length&&L(o),t=o[5].length&&O(o);return{c(){e=v("p"),l&&l.c(),s=C(),t&&t.c(),i=C(),a=v("span"),a.textContent=f,this.h()},l(r){e=b(r,"P",{class:!0});var n=S(e);l&&l.l(n),s=N(n),t&&t.l(n),i=N(n),a=b(n,"SPAN",{class:!0,"data-svelte-h":!0}),q(a)!=="svelte-1uluiw5"&&(a.textContent=f),n.forEach(_),this.h()},h(){p(a,"class","small svelte-3l8f9b"),p(e,"class","svelte-3l8f9b")},m(r,n){P(r,e,n),l&&l.m(e,null),g(e,s),t&&t.m(e,null),g(e,i),g(e,a)},p(r,n){r[6].length?l?l.p(r,n):(l=L(r),l.c(),l.m(e,s)):l&&(l.d(1),l=null),r[5].length?t?t.p(r,n):(t=O(r),t.c(),t.m(e,i)):t&&(t.d(1),t=null)},d(r){r&&_(e),l&&l.d(),t&&t.d()}}}function L(o){let e,s,i="Stream",a,f=D(o[6]),l=[];for(let t=0;t<f.length;t+=1)l[t]=M(H(o,f,t));return{c(){e=v("span"),s=v("span"),s.textContent=i,a=C();for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=b(t,"SPAN",{class:!0});var r=S(e);s=b(r,"SPAN",{class:!0,"data-svelte-h":!0}),q(s)!=="svelte-yv5yjp"&&(s.textContent=i),a=N(r);for(let n=0;n<l.length;n+=1)l[n].l(r);r.forEach(_),this.h()},h(){p(s,"class","light"),p(e,"class","svelte-3l8f9b")},m(t,r){P(t,e,r),g(e,s),g(e,a);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null)},p(t,r){if(r&80){f=D(t[6]);let n;for(n=0;n<f.length;n+=1){const c=H(t,f,n);l[n]?l[n].p(c,r):(l[n]=M(c),l[n].c(),l[n].m(e,null))}for(;n<l.length;n+=1)l[n].d(1);l.length=f.length}},d(t){t&&_(e),R(l,t)}}}function M(o){let e,s=o[9]+"",i,a,f,l;return{c(){e=v("a"),i=E(s),this.h()},l(t){e=b(t,"A",{class:!0,href:!0,target:!0});var r=S(e);i=w(r,s),r.forEach(_),this.h()},h(){p(e,"class","std svelte-3l8f9b"),p(e,"href",a=o[4].link),p(e,"target","_blank")},m(t,r){P(t,e,r),g(e,i),f||(l=V(e,"click",X),f=!0)},p(t,r){r&64&&s!==(s=t[9]+"")&&F(i,s),r&16&&a!==(a=t[4].link)&&p(e,"href",a)},d(t){t&&_(e),f=!1,l()}}}function O(o){let e,s,i="Purchase",a,f=D(o[5]),l=[];for(let t=0;t<f.length;t+=1)l[t]=Q(z(o,f,t));return{c(){e=v("span"),s=v("span"),s.textContent=i,a=C();for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){e=b(t,"SPAN",{class:!0});var r=S(e);s=b(r,"SPAN",{class:!0,"data-svelte-h":!0}),q(s)!=="svelte-1mud0eq"&&(s.textContent=i),a=N(r);for(let n=0;n<l.length;n+=1)l[n].l(r);r.forEach(_),this.h()},h(){p(s,"class","light"),p(e,"class","svelte-3l8f9b")},m(t,r){P(t,e,r),g(e,s),g(e,a);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null)},p(t,r){if(r&48){f=D(t[5]);let n;for(n=0;n<f.length;n+=1){const c=z(t,f,n);l[n]?l[n].p(c,r):(l[n]=Q(c),l[n].c(),l[n].m(e,null))}for(;n<l.length;n+=1)l[n].d(1);l.length=f.length}},d(t){t&&_(e),R(l,t)}}}function Q(o){let e,s=o[9]+"",i,a,f,l;return{c(){e=v("a"),i=E(s),this.h()},l(t){e=b(t,"A",{class:!0,href:!0,target:!0});var r=S(e);i=w(r,s),r.forEach(_),this.h()},h(){p(e,"class","std svelte-3l8f9b"),p(e,"href",a=o[4].link),p(e,"target","_blank")},m(t,r){P(t,e,r),g(e,i),f||(l=V(e,"click",X),f=!0)},p(t,r){r&32&&s!==(s=t[9]+"")&&F(i,s),r&16&&a!==(a=t[4].link)&&p(e,"href",a)},d(t){t&&_(e),f=!1,l()}}}function T(o){let e,s,i,a="Rating",f,l=Y(o[1])+"",t;return{c(){e=v("p"),s=v("span"),i=v("span"),i.textContent=a,f=C(),t=E(l),this.h()},l(r){e=b(r,"P",{class:!0});var n=S(e);s=b(n,"SPAN",{class:!0});var c=S(s);i=b(c,"SPAN",{class:!0,"data-svelte-h":!0}),q(i)!=="svelte-1cie9mo"&&(i.textContent=a),f=N(c),t=w(c,l),c.forEach(_),n.forEach(_),this.h()},h(){p(i,"class","light"),p(s,"class","svelte-3l8f9b"),p(e,"class","svelte-3l8f9b")},m(r,n){P(r,e,n),g(e,s),g(s,i),g(s,f),g(s,t)},p(r,n){n&2&&l!==(l=Y(r[1])+"")&&F(t,l)},d(r){r&&_(e)}}}function ie(o){let e,s,i,a,f,l,t,r,n=o[0]&&W(o),c=o[2]&&B(o),d=o[3]&&G(o),u=o[4]&&(o[6].length||o[5].length)&&K(o),k=o[1]&&o[1]>5&&T(o);const j=o[8].default,A=y(j,o,o[7],null);return{c(){e=v("p"),n&&n.c(),s=C(),c&&c.c(),i=C(),d&&d.c(),a=C(),u&&u.c(),f=C(),k&&k.c(),l=C(),t=v("span"),A&&A.c(),this.h()},l(h){e=b(h,"P",{class:!0});var m=S(e);n&&n.l(m),s=N(m),c&&c.l(m),i=N(m),d&&d.l(m),m.forEach(_),a=N(h),u&&u.l(h),f=N(h),k&&k.l(h),l=N(h),t=b(h,"SPAN",{class:!0});var U=S(t);A&&A.l(U),U.forEach(_),this.h()},h(){p(e,"class","svelte-3l8f9b"),p(t,"class","slot svelte-3l8f9b")},m(h,m){P(h,e,m),n&&n.m(e,null),g(e,s),c&&c.m(e,null),g(e,i),d&&d.m(e,null),P(h,a,m),u&&u.m(h,m),P(h,f,m),k&&k.m(h,m),P(h,l,m),P(h,t,m),A&&A.m(t,null),r=!0},p(h,[m]){h[0]?n?n.p(h,m):(n=W(h),n.c(),n.m(e,s)):n&&(n.d(1),n=null),h[2]?c?c.p(h,m):(c=B(h),c.c(),c.m(e,i)):c&&(c.d(1),c=null),h[3]?d?d.p(h,m):(d=G(h),d.c(),d.m(e,null)):d&&(d.d(1),d=null),h[4]&&(h[6].length||h[5].length)?u?u.p(h,m):(u=K(h),u.c(),u.m(f.parentNode,f)):u&&(u.d(1),u=null),h[1]&&h[1]>5?k?k.p(h,m):(k=T(h),k.c(),k.m(l.parentNode,l)):k&&(k.d(1),k=null),A&&A.p&&(!r||m&128)&&x(A,j,h,h[7],r?ee(j,h[7],m,null):$(h[7]),null)},i(h){r||(se(A,h),r=!0)},o(h){ne(A,h),r=!1},d(h){h&&(_(e),_(a),_(f),_(l),_(t)),n&&n.d(),c&&c.d(),d&&d.d(),u&&u.d(h),k&&k.d(h),A&&A.d(h)}}}function X(){window.plausible("User",{props:{action:"Used providers"}})}function fe(o,e,s){let i,a,{$$slots:f={},$$scope:l}=e,{runtime:t=null}=e,{rating:r=null}=e,{release_date:n=null}=e,{genre:c=null}=e,{providers:d}=e;return o.$$set=u=>{"runtime"in u&&s(0,t=u.runtime),"rating"in u&&s(1,r=u.rating),"release_date"in u&&s(2,n=u.release_date),"genre"in u&&s(3,c=u.genre),"providers"in u&&s(4,d=u.providers),"$$scope"in u&&s(7,l=u.$$scope)},o.$$.update=()=>{o.$$.dirty&16&&s(6,{stream:i,purchase:a}=ae(d),i,(s(5,a),s(4,d)))},[t,r,n,c,d,a,i,l,f]}class ue extends le{constructor(e){super(),te(this,e,fe,ie,Z,{runtime:0,rating:1,release_date:2,genre:3,providers:4})}}export{ue as F};
