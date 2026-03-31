module.exports=[18622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},93695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},23862,e=>e.a(async(t,a)=>{try{let t=await e.y("pg-587764f78a6c7a9c");e.n(t),a()}catch(e){a(e)}},!0),62294,e=>e.a(async(t,a)=>{try{var s=e.i(23862),r=t([s]);[s]=r.then?(await r)():r;let E=new s.Pool({connectionString:process.env.POSTGRES_URL});async function n(e,t){let a=await E.connect();try{return await a.query(e,t)}finally{a.release()}}async function o(){try{await n(`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip VARCHAR(45),
        user_agent TEXT,
        referrer TEXT,
        utm_source VARCHAR(255),
        utm_medium VARCHAR(255),
        utm_campaign VARCHAR(255),
        has_contacts BOOLEAN DEFAULT FALSE,
        contact_name VARCHAR(255),
        contact_phone VARCHAR(50),
        contact_email VARCHAR(255)
      )
    `),await n(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sentiment VARCHAR(20)
      )
    `),await n(`
      CREATE TABLE IF NOT EXISTS briefs (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        business_type VARCHAR(100),
        channels JSONB,
        daily_requests VARCHAR(50),
        bot_tasks JSONB,
        has_examples VARCHAR(20),
        budget VARCHAR(100),
        score INTEGER,
        category VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `),await n("CREATE INDEX IF NOT EXISTS idx_sessions_created ON chat_sessions(created_at)"),await n("CREATE INDEX IF NOT EXISTS idx_messages_session ON chat_messages(session_id)"),await n("CREATE INDEX IF NOT EXISTS idx_briefs_session ON briefs(session_id)"),console.log("Database initialized successfully")}catch(e){console.error("Database initialization error:",e)}}async function i(e,t){await n(`INSERT INTO chat_sessions (id, ip, user_agent, referrer, utm_source, utm_medium, utm_campaign)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (id) DO NOTHING`,[e,t.ip||null,t.userAgent||null,t.referrer||null,t.utmSource||null,t.utmMedium||null,t.utmCampaign||null])}async function l(e,t,a,s){await n(`INSERT INTO chat_messages (session_id, role, content, sentiment)
     VALUES ($1, $2, $3, $4)`,[e,t,a,s||null]),await n("UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = $1",[e])}async function c(e,t){await n(`UPDATE chat_sessions 
     SET has_contacts = TRUE, 
         contact_name = $1, 
         contact_phone = $2, 
         contact_email = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4`,[t.name,t.phone,t.email||null,e])}async function d(e,t){await n(`INSERT INTO briefs (session_id, business_type, channels, daily_requests, bot_tasks, has_examples, budget, score, category)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (session_id) DO UPDATE SET
       business_type = EXCLUDED.business_type,
       channels = EXCLUDED.channels,
       daily_requests = EXCLUDED.daily_requests,
       bot_tasks = EXCLUDED.bot_tasks,
       has_examples = EXCLUDED.has_examples,
       budget = EXCLUDED.budget,
       score = EXCLUDED.score,
       category = EXCLUDED.category`,[e,t.businessType,JSON.stringify(t.channels),t.dailyRequests,JSON.stringify(t.botTasks),t.hasExamples,t.budget,t.score,t.category])}async function u(e){let t="",a=[];e&&(t="WHERE created_at >= NOW() - INTERVAL '$1 days'",a.push(e));let s=await n(`SELECT COUNT(*) as total FROM chat_sessions ${t}`,a),r=await n(`SELECT COUNT(*) as total FROM chat_messages ${t}`,a),o=await n(`SELECT COUNT(*) as total FROM briefs ${t}`,a),i="SELECT COUNT(*) as total FROM chat_sessions WHERE has_contacts = TRUE";e&&(i+=" AND created_at >= NOW() - INTERVAL '$1 days'");let l=await n(i,e?a:[]);return{totalSessions:parseInt(s.rows[0].total),totalMessages:parseInt(r.rows[0].total),totalBriefs:parseInt(o.rows[0].total),totalContacts:parseInt(l.rows[0].total)}}async function p(e){let t=await n("SELECT * FROM chat_sessions WHERE id = $1",[e]),a=await n("SELECT * FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC",[e]),s=await n("SELECT * FROM briefs WHERE session_id = $1",[e]),r=s.rows[0]?{...s.rows[0],channels:s.rows[0].channels?s.rows[0].channels:null,bot_tasks:s.rows[0].bot_tasks?s.rows[0].bot_tasks:null}:null;return{session:t.rows[0]||null,messages:a.rows,brief:r}}E.on("error",e=>{console.error("Unexpected error on idle client",e)}),e.s(["createSession",0,i,"getSessionHistory",0,p,"getStats",0,u,"initDatabase",0,o,"saveBrief",0,d,"saveMessage",0,l,"updateContacts",0,c]),a()}catch(e){a(e)}},!1),24337,e=>{"use strict";function t(){let e=process.env.TELEGRAM_BOT_TOKEN,t=process.env.TELEGRAM_CHAT_ID;return e&&t?{botToken:e,chatId:t}:(console.warn("Telegram config not found"),null)}async function a(e){let a=t();if(!a)return!1;try{let t=`https://api.telegram.org/bot${a.botToken}/sendMessage`,s=e.content.length>500?e.content.substring(0,500)+"...":e.content,r=`💬 <b>Новое сообщение в чате</b>

🆔 Сессия: <code>${e.sessionId.slice(-8)}</code>
👤 Роль: ${"user"===e.role?"Клиент":"Бот"}

📝 Сообщение:
<blockquote>${s.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</blockquote>`;return await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a.chatId,text:r,parse_mode:"HTML"})}),!0}catch(e){return console.error("Telegram chat send error:",e),!1}}async function s(e){let a=t();if(!a)return!1;try{let t=`https://api.telegram.org/bot${a.botToken}/sendMessage`,s="HOT"===e.category?"🔥":"WARM"===e.category?"⚡":"❄️",r=`${s} <b>Новый бриф заполнен!</b>

`;return(e.contactName||e.contactPhone)&&(r+=`👤 <b>Контакты:</b>
`,e.contactName&&(r+=`   Имя: ${e.contactName}
`),e.contactPhone&&(r+=`   Телефон: ${e.contactPhone}
`),e.contactEmail&&(r+=`   Email: ${e.contactEmail}
`),r+=`
`),r+=`📋 <b>Данные брифа:</b>
`,e.businessType&&(r+=`   Сфера: ${e.businessType}
`),e.channels?.length&&(r+=`   Каналы: ${e.channels.join(", ")}
`),e.dailyRequests&&(r+=`   Заявок/день: ${e.dailyRequests}
`),e.botTasks?.length&&(r+=`   Задачи: ${e.botTasks.join(", ")}
`),e.hasExamples&&(r+=`   Примеры: ${e.hasExamples}
`),e.budget&&(r+=`   Бюджет: ${e.budget}
`),r+=`
📊 <b>Оценка:</b> ${e.category} (${e.score||0} баллов)
🆔 Сессия: <code>${e.sessionId.slice(-8)}</code>`,await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a.chatId,text:r,parse_mode:"HTML"})}),!0}catch(e){return console.error("Telegram brief send error:",e),!1}}async function r(e){let a=t();if(!a)return!1;try{let t=`https://api.telegram.org/bot${a.botToken}/sendMessage`,s=`<b>${{guide:"📚 Заявка на гайд",consultation:"💬 Консультация",callback:"📞 Обратный звонок"}[e.type]||"Новая заявка"}</b>

`;return e.name&&(s+=`<b>Имя:</b> ${e.name}
`),e.email&&(s+=`<b>Email:</b> ${e.email}
`),e.telegram&&(s+=`<b>Telegram:</b> @${e.telegram.replace("@","")}
`),e.phone&&(s+=`<b>Телефон:</b> ${e.phone}
`),e.message&&(s+=`<b>Сообщение:</b> ${e.message}
`),s+=`
<i>${new Date().toLocaleString("ru-RU")}</i>`,await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:a.chatId,text:s,parse_mode:"HTML"})}),!0}catch(e){return console.error("Telegram lead send error:",e),!1}}e.s(["sendBriefToTelegram",0,s,"sendChatToTelegram",0,a,"sendLeadToTelegram",0,r])},17542,e=>e.a(async(t,a)=>{try{var s=e.i(89171),r=e.i(62294),n=e.i(24337),o=t([r]);async function i(e){try{let{sessionId:t,role:a,content:o,sentiment:i}=await e.json();if(!t||!a||!o)return s.NextResponse.json({error:"sessionId, role, content are required"},{status:400});return await (0,r.saveMessage)(t,a,o,i),"user"===a&&await (0,n.sendChatToTelegram)({sessionId:t,role:a,content:o}),s.NextResponse.json({success:!0})}catch(e){return console.error("Save message error:",e),s.NextResponse.json({success:!0})}}[r]=o.then?(await o)():o,e.s(["POST",0,i]),a()}catch(e){a(e)}},!1),79998,e=>e.a(async(t,a)=>{try{var s=e.i(47909),r=e.i(74017),n=e.i(96250),o=e.i(59756),i=e.i(61916),l=e.i(74677),c=e.i(69741),d=e.i(16795),u=e.i(87718),p=e.i(95169),E=e.i(47587),R=e.i(66012),T=e.i(70101),h=e.i(26937),g=e.i(10372),m=e.i(93695);e.i(52474);var A=e.i(220),_=e.i(17542),C=t([_]);[_]=C.then?(await C)():C;let b=new s.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/chat/message/route",pathname:"/api/chat/message",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/chat/message/route.ts",nextConfigOutput:"standalone",userland:_}),{workAsyncStorage:S,workUnitAsyncStorage:w,serverHooks:N}=b;async function y(e,t,a){a.requestMeta&&(0,o.setRequestMeta)(e,a.requestMeta),b.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let s="/api/chat/message/route";s=s.replace(/\/index$/,"")||"/";let n=await b.prepare(e,t,{srcPage:s,multiZoneDraftMode:!1});if(!n)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:_,params:C,nextConfig:y,parsedUrl:S,isDraftMode:w,prerenderManifest:N,routerServerContext:f,isOnDemandRevalidate:x,revalidateOnlyGenerated:O,resolvedPathname:I,clientReferenceManifest:$,serverActionsManifest:v}=n,M=(0,c.normalizeAppPath)(s),D=!!(N.dynamicRoutes[M]||N.routes[I]),L=async()=>((null==f?void 0:f.render404)?await f.render404(e,t,S,!1):t.end("This page could not be found"),null);if(D&&!w){let e=!!N.routes[I],t=N.dynamicRoutes[M];if(t&&!1===t.fallback&&!e){if(y.adapterPath)return await L();throw new m.NoFallbackError}}let U=null;!D||b.isDev||w||(U=I,U="/index"===U?"/":U);let P=!0===b.isDev||!D,H=D&&!P;v&&$&&(0,l.setManifestsSingleton)({page:s,clientReferenceManifest:$,serverActionsManifest:v});let k=e.method||"GET",q=(0,i.getTracer)(),F=q.getActiveScopeSpan(),j=!!(null==f?void 0:f.isWrappedByNextServer),V=!!(0,o.getRequestMeta)(e,"minimalMode"),X=(0,o.getRequestMeta)(e,"incrementalCache")||await b.getIncrementalCache(e,y,N,V);null==X||X.resetRequestCache(),globalThis.__incrementalCache=X;let B={params:C,previewProps:N.preview,renderOpts:{experimental:{authInterrupts:!!y.experimental.authInterrupts},cacheComponents:!!y.cacheComponents,supportsDynamicResponse:P,incrementalCache:X,cacheLifeProfiles:y.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,s,r)=>b.onRequestError(e,t,s,r,f)},sharedContext:{buildId:_}},W=new d.NodeNextRequest(e),K=new d.NodeNextResponse(t),G=u.NextRequestAdapter.fromNodeNextRequest(W,(0,u.signalFromNodeResponse)(t));try{let n,o=async e=>b.handle(G,B).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=q.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${k} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t),n&&n!==e&&(n.setAttribute("http.route",r),n.updateName(t))}else e.updateName(`${k} ${s}`)}),l=async n=>{var i,l;let c=async({previousCacheEntry:r})=>{try{if(!V&&x&&O&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await o(n);e.fetchMetrics=B.renderOpts.fetchMetrics;let i=B.renderOpts.pendingWaitUntil;i&&a.waitUntil&&(a.waitUntil(i),i=void 0);let l=B.renderOpts.collectedTags;if(!D)return await (0,R.sendResponse)(W,K,s,B.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,T.toNodeOutgoingHttpHeaders)(s.headers);l&&(t[g.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==B.renderOpts.collectedRevalidate&&!(B.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&B.renderOpts.collectedRevalidate,r=void 0===B.renderOpts.collectedExpire||B.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:B.renderOpts.collectedExpire;return{value:{kind:A.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==r?void 0:r.isStale)&&await b.onRequestError(e,t,{routerKind:"App Router",routePath:s,routeType:"route",revalidateReason:(0,E.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:x})},!1,f),t}},d=await b.handleResponse({req:e,nextConfig:y,cacheKey:U,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:N,isRoutePPREnabled:!1,isOnDemandRevalidate:x,revalidateOnlyGenerated:O,responseGenerator:c,waitUntil:a.waitUntil,isMinimalMode:V});if(!D)return null;if((null==d||null==(i=d.value)?void 0:i.kind)!==A.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});V||t.setHeader("x-nextjs-cache",x?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),w&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,T.fromNodeOutgoingHttpHeaders)(d.value.headers);return V&&D||u.delete(g.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,h.getCacheControlHeader)(d.cacheControl)),await (0,R.sendResponse)(W,K,new Response(d.value.body,{headers:u,status:d.value.status||200})),null};j&&F?await l(F):(n=q.getActiveScopeSpan(),await q.withPropagatedContext(e.headers,()=>q.trace(p.BaseServerSpan.handleRequest,{spanName:`${k} ${s}`,kind:i.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},l),void 0,!j))}catch(t){if(t instanceof m.NoFallbackError||await b.onRequestError(e,t,{routerKind:"App Router",routePath:M,routeType:"route",revalidateReason:(0,E.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:x})},!1,f),D)throw t;return await (0,R.sendResponse)(W,K,new Response(null,{status:500})),null}}e.s(["handler",0,y,"patchFetch",0,function(){return(0,n.patchFetch)({workAsyncStorage:S,workUnitAsyncStorage:w})},"routeModule",0,b,"serverHooks",0,N,"workAsyncStorage",0,S,"workUnitAsyncStorage",0,w]),a()}catch(e){a(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_-than._.js.map