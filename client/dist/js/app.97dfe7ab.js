(function(e){function t(t){for(var r,o,u=t[0],i=t[1],s=t[2],l=0,f=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);p&&p(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function u(e){return i.p+"js/"+({about:"about",login:"login",map:"map"}[e]||e)+"."+{about:"0cfea394",login:"e83d4bde",map:"d1c12169"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={about:1,login:1,map:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({about:"about",login:"login",map:"map"}[e]||e)+"."+{about:"5158f596",login:"dc419426",map:"74b66662"}[e]+".css",a=i.p+r,c=document.getElementsByTagName("link"),u=0;u<c.length;u++){var s=c[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],p.parentNode.removeChild(p),n(c)},p.href=a;var m=document.getElementsByTagName("head")[0];m.appendChild(p)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=u(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/client/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var p=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2142:function(e,t,n){},"35b2":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o={id:"nav"},a=Object(r["f"])("Accueil"),c={key:0},u=Object(r["f"])("Carte"),i={key:1},s=Object(r["f"])("Profile"),l=Object(r["f"])("À propos"),f={key:2},p=Object(r["f"])("Se connecter"),m={key:3};function g(e,t){var n=Object(r["w"])("router-link"),g=Object(r["w"])("router-view");return Object(r["p"])(),Object(r["d"])(r["a"],null,[Object(r["g"])("div",o,[Object(r["g"])("div",null,[Object(r["g"])(n,{to:"/"},{default:Object(r["D"])((function(){return[a]})),_:1})]),e.authenticated?(Object(r["p"])(),Object(r["d"])("div",c,[Object(r["g"])(n,{to:"/map"},{default:Object(r["D"])((function(){return[u]})),_:1})])):Object(r["e"])("",!0),e.authenticated?(Object(r["p"])(),Object(r["d"])("div",i,[Object(r["g"])(n,{to:"/profile"},{default:Object(r["D"])((function(){return[s]})),_:1})])):Object(r["e"])("",!0),Object(r["g"])("div",null,[Object(r["g"])(n,{to:"/about"},{default:Object(r["D"])((function(){return[l]})),_:1})]),e.authenticated?e.authenticated?(Object(r["p"])(),Object(r["d"])("div",m,[Object(r["g"])("button",{onClick:t[1]||(t[1]=function(){return e.logout&&e.logout.apply(e,arguments)})},"Se déconnecter")])):Object(r["e"])("",!0):(Object(r["p"])(),Object(r["d"])("div",f,[Object(r["g"])(n,{to:"/login"},{default:Object(r["D"])((function(){return[p]})),_:1})]))]),Object(r["g"])(g)],64)}var b=n("5530"),d=n("5502"),O={name:"App",computed:Object(b["a"])({},Object(d["d"])({authenticated:"authenticated"})),methods:Object(b["a"])(Object(b["a"])({},Object(d["b"])({resetState:"RESET_STATE",setAuthenticated:"SET_AUTHENTICATED"})),{},{logout:function(){this.resetState(),localStorage.clear(),this.setAuthenticated(!1),this.$router.push("login")}})};n("64be");O.render=g;var h=O,j=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),T=n("cf05"),v=n.n(T),y=Object(r["F"])("data-v-ebbf97c4");Object(r["s"])("data-v-ebbf97c4");var S={class:"home"},E=Object(r["g"])("img",{id:"logo",alt:"logo",src:v.a},null,-1),R=Object(r["g"])("div",null,[Object(r["f"])("Bienvenue sur "),Object(r["g"])("strong",null,"Solid Rain"),Object(r["f"])(" !")],-1);Object(r["q"])();var _=y((function(e,t){return Object(r["p"])(),Object(r["d"])("div",S,[E,R])})),w={name:"Home"};n("f303");w.render=_,w.__scopeId="data-v-ebbf97c4";var P,A,x,L,I,N=w,k=n("ade3"),C="SET_AUTHENTICATED",M="SET_MYMAP",U="SET_CURRENT_LAT",Y="SET_CURRENT_LNG",J="SET_CURRENT_ZOOM",D="GET_MYMAP",G="GET_CURRENT_LAT",z="GET_CURRENT_LNG",Z="GET_CURRENT_ZOOM",H="SET_GAME_STATUS",B="SET_ZRR",q="SET_PLAYER_ID",F="SET_PLAYER_POSITION",K="SET_PLAYER_TTL",$="SET_TTL_CREATION",Q="SET_CURRENT_TTL",V="SET_PLAYER_ICON",W="SET_METEORITES",X="SET_PLAYERS",ee="SET_PLAYER_TROPHY",te="RESET_STATE",ne="GET_CURRENT_TTL",re={state:function(){return{mymap:{},currentLat:45.78207,currentLng:4.8656,currentZoom:19,roger:"test"}},getters:(P={},Object(k["a"])(P,D,(function(e){return e.mymap})),Object(k["a"])(P,G,(function(e){return e.currentLat})),Object(k["a"])(P,z,(function(e){return e.currentLng})),Object(k["a"])(P,Z,(function(e){return e.currentZoom})),P),mutations:(A={},Object(k["a"])(A,M,(function(e,t){return e.mymap=t})),Object(k["a"])(A,U,(function(e,t){return e.currentLat=t})),Object(k["a"])(A,Y,(function(e,t){return e.currentLng=t})),Object(k["a"])(A,J,(function(e,t){return e.currentZoom=t})),A),actions:(x={},Object(k["a"])(x,M,(function(e,t){var n=e.commit;return n(M,t)})),Object(k["a"])(x,U,(function(e,t){var n=e.commit;return n(U,t)})),Object(k["a"])(x,Y,(function(e,t){var n=e.commit;return n(Y,t)})),Object(k["a"])(x,J,(function(e,t){var n=e.commit;return n(J,t)})),x)},oe=Object(k["a"])({},ne,(function(e){var t=e.player.ttl,n=Math.round(e.player.ttl_creation_timestamp/1e3),r=Math.round(Date.now()/1e3),o=t-(r-n);return o>0?o:0})),ae=n("dd76"),ce=(L={},Object(k["a"])(L,C,(function(e,t){var n=e.commit;n(C,t)})),Object(k["a"])(L,H,(function(e){var t=e.commit;ae["a"].getGameStatus().then((function(e){t(H,e)})).catch((function(){console.log("ERROR SET_GAME_STATUS")}))})),Object(k["a"])(L,B,(function(e){var t=e.commit;ae["a"].getZrr().then((function(e){t(B,e)})).catch((function(){console.log("ERROR SET_ZRR")}))})),Object(k["a"])(L,q,(function(e,t){var n=e.commit;ae["a"].getOnePlayer(t).then((function(e){n(q,e.id)})).catch((function(){console.log("ERROR SET_PLAYER_ID")}))})),Object(k["a"])(L,F,(function(e,t){var n=e.commit;n(F,t)})),Object(k["a"])(L,K,(function(e,t){var n=e.commit;ae["a"].getPlayerTTL(t).then((function(e){n(K,e)})).catch((function(){console.log("ERROR SET_PLAYER_TTL")}))})),Object(k["a"])(L,$,(function(e,t){var n=e.commit;return n($,t)})),Object(k["a"])(L,Q,(function(e,t){var n=e.commit;return n(Q,t)})),Object(k["a"])(L,V,(function(e,t){var n=e.commit;ae["a"].getPlayerIcon(t).then((function(e){n(V,e)})).catch((function(){console.log("ERROR SET_PLAYER_ICON")}))})),Object(k["a"])(L,W,(function(e){var t=e.commit;ae["a"].getAllMeteorites().then((function(e){t(W,e)})).catch((function(){console.log("ERROR SET_METEORITES")}))})),Object(k["a"])(L,X,(function(e){var t=e.commit;ae["a"].getAllPlayers().then((function(e){t(X,e)})).catch((function(){console.log("ERROR SET_PLAYERS")}))})),Object(k["a"])(L,te,(function(e){var t=e.commit;t(te)})),Object(k["a"])(L,ee,(function(e,t){var n=e.commit;ae["a"].getPlayerTrophies(t).then((function(e){n(ee,e)})).catch((function(){console.log("ERROR SET_PLAYER_TROPHY")}))})),L),ue=(I={},Object(k["a"])(I,C,(function(e,t){return e.authenticated=t})),Object(k["a"])(I,H,(function(e,t){return e.gameStatus=t})),Object(k["a"])(I,B,(function(e,t){return e.zrr=t})),Object(k["a"])(I,q,(function(e,t){return e.player.id=t})),Object(k["a"])(I,F,(function(e,t){return e.player.position=t})),Object(k["a"])(I,K,(function(e,t){return e.player.ttl=t})),Object(k["a"])(I,$,(function(e,t){return e.player.ttl_creation_timestamp=t})),Object(k["a"])(I,Q,(function(e,t){return e.player.current_ttl=t})),Object(k["a"])(I,V,(function(e,t){return e.player.icon=t})),Object(k["a"])(I,W,(function(e,t){return e.meteorites=t})),Object(k["a"])(I,X,(function(e,t){return e.players=t})),Object(k["a"])(I,te,(function(e){return Object.assign(e,ie())})),Object(k["a"])(I,ee,(function(e,t){return e.player.trophies=t})),I),ie=function(){return{authenticated:null!==localStorage.getItem("token"),gameStatus:null!==JSON.parse(localStorage.getItem("gameStatus"))&&JSON.parse(localStorage.getItem("gameStatus")),zrr:null!==JSON.parse(localStorage.getItem("zrr"))?JSON.parse(localStorage.getItem("zrr")):[],player:{id:null!==localStorage.getItem("playerId")?localStorage.getItem("playerId"):null,icon:null!==localStorage.getItem("playerIcon")?localStorage.getItem("playerIcon"):null,position:null!==localStorage.getItem("playerPos")?JSON.parse(localStorage.getItem("playerPos")):[],ttl:null!==localStorage.getItem("currentTTL")?JSON.parse(localStorage.getItem("currentTTL")):null,ttl_creation_timestamp:null!==localStorage.getItem("timestampTTL")?JSON.parse(localStorage.getItem("timestampTTL")):null,current_ttl:null,trophies:[]},players:[],meteorites:[]}},se=Object(d["a"])({state:function(){return ie()},getters:oe,mutations:ue,actions:ce,modules:{map:re}}),le=[{path:"/",name:"Home",component:N},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/login",name:"Login",component:function(){return n.e("login").then(n.bind(null,"578a"))},beforeEnter:function(e,t,n){!1!==se.state.authenticated?n("/login"):n()}},{path:"/map",name:"Map",component:function(){return n.e("map").then(n.bind(null,"a0be"))},beforeEnter:function(e,t,n){!1===se.state.authenticated?n("/login"):n()}},{path:"/profile",name:"Profile",component:function(){return n.e("map").then(n.bind(null,"66aa"))}}],fe=Object(j["a"])({history:Object(j["b"])(),routes:le}),pe=fe,me=n("9483");Object(me["a"])("".concat("/client/","sw.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),Object(r["c"])(h).use(se).use(pe).mount("#app")},"64be":function(e,t,n){"use strict";n("35b2")},cf05:function(e,t,n){e.exports=n.p+"img/logo.280acacc.png"},dd76:function(e,t,n){"use strict";var r=n("1da1"),o=(n("96cf"),n("d3b7"),n("99af"),"https://192.168.75.123/game");t["a"]={getGameStatus:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(o+"/admin/game");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,r=n.start,e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})))()},getZrr:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,c,u,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(o+"/admin/game");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,r=n.zrr.point_a[0],a=n.zrr.point_a[1],c=n.zrr.point_b[0],u=n.zrr.point_b[1],i=[[r,a],[c,u]],e.abrupt("return",i);case 12:case"end":return e.stop()}}),e)})))()},getAllPlayers:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(o+"/admin/players");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))()},getOnePlayer:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(o+"/api/player/".concat(e));case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})))()},getPlayerById:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(o+"/api/player/".concat(e));case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})))()},getPlayerPos:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(o+"/admin/".concat(e,"/position"));case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})))()},setPlayerPos:function(e,t){var n={method:"PUT",headers:{"Content-Type":"application/json",Authorization:localStorage.getItem("token")},body:JSON.stringify(t)};fetch(o+"/api/resources/".concat(e,"/position"),n).then((function(e){console.log("Update player position : "+e.status)}),(function(e){console.warn(e)}))},addTrophy:function(e,t,n){return Object(r["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:a={method:"POST"},fetch(o+"/admin/user/".concat(e,"/meteorite/").concat(t,"/type/").concat(n),a).then((function(e){console.log("Trophy Add"+e.status)}),(function(e){console.warn(e)}));case 2:case"end":return r.stop()}}),r)})))()},getPlayerTrophies:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(o+"/admin/".concat(e,"/trophy"));case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})))()},getPlayerTTL:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(o+"/admin/".concat(e,"/ttl"));case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})))()},updateIcon:function(e,t){return Object(r["a"])(regeneratorRuntime.mark((function n(){var r,a,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r='{ "url" : "'+t+'" }',a=JSON.parse(r),c={method:"PUT",headers:{"Content-Type":"application/json",Authorization:localStorage.getItem("token")},body:JSON.stringify(a)},fetch(o+"/api/resources/".concat(e,"/image"),c).then((function(e){console.log(e.status)}),(function(e){console.warn(e)}));case 4:case"end":return n.stop()}}),n)})))()},setPlayerTTL:function(e,t){var n={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};fetch(o+"/admin/ttl/".concat(e),n).then((function(e){console.log("Update player TTL : "+e.status)}),(function(e){console.warn(e)}))},getPlayerIcon:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,fetch(o+"/api/player/".concat(e));case 2:return n=t.sent,t.next=5,n.json();case 5:return r=t.sent,t.abrupt("return",r.url);case 7:case"end":return t.stop()}}),t)})))()},getAllMeteorites:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(o+"/api/meteorites");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})))()}}},f303:function(e,t,n){"use strict";n("2142")}});
//# sourceMappingURL=app.97dfe7ab.js.map