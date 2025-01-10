import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import destr from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import { getRequestHeader, splitCookiesString, setResponseHeader, setResponseStatus, send, eventHandler, appendResponseHeader, removeResponseHeader, createError, getResponseHeader, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, setHeaders, sendRedirect, proxyRequest, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/h3@1.13.0/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/unenv@1.10.0/node_modules/unenv/runtime/fetch/index.mjs';
import { decodePath, withLeadingSlash, withoutTrailingSlash, parseURL, joinURL, withoutBase, getQuery, withQuery } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/pathe@1.1.2/node_modules/pathe/dist/index.mjs';
import { klona } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/unstorage@1.13.1_ioredis@5.4.1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/unstorage@1.13.1_ioredis@5.4.1/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47fs_45lite from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/unstorage@1.13.1_ioredis@5.4.1/node_modules/unstorage/drivers/fs-lite.mjs';
import { toRouteMatcher, createRouter } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { getContext } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/unctx@2.3.1_webpack-sources@3.2.3/node_modules/unctx/dist/index.mjs';
import { hash } from 'file:///home/aron/Repos/iviixii/iviixii.github.io/node_modules/.pnpm/ohash@1.1.4/node_modules/ohash/dist/index.mjs';

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}
const errorHandler = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const { stack, statusCode, statusMessage, message } = normalizeError(
      error);
    const errorObject = {
      url: event.path || "",
      statusCode,
      statusMessage,
      message,
      stack: void 0
    };
    if (error.unhandled || error.fatal) {
      const tags = [
        "[nitro]",
        "[request error]",
        error.unhandled && "[unhandled]",
        error.fatal && "[fatal]"
      ].filter(Boolean).join(" ");
      console.error(
        tags,
        error.message + "\n" + stack.map((l) => "  " + l.text).join("  \n")
      );
    }
    if (statusCode === 404) {
      setResponseHeader(event, "Cache-Control", "no-cache");
    }
    setResponseStatus(event, statusCode, statusMessage);
    if (isJsonRequest(event)) {
      setResponseHeader(event, "Content-Type", "application/json");
      return send(event, JSON.stringify(errorObject));
    }
    setResponseHeader(event, "Content-Type", "text/html");
    return send(event, renderHTMLError(errorObject));
  }
);
function renderHTMLError(error) {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Request Error";
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${statusCode} ${statusMessage}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico/css/pico.min.css">
  </head>
  <body>
    <main class="container">
      <dialog open>
        <article>
          <header>
            <h2>${statusCode} ${statusMessage}</h2>
          </header>
          <code>
            ${error.message}<br><br>
            ${"\n" + (error.stack || []).map((i) => `&nbsp;&nbsp;${i}`).join("<br>")}
          </code>
          <footer>
            <a href="/" onclick="event.preventDefault();history.back();">Go Back</a>
          </footer>
        </article>
      </dialog>
    </main>
  </body>
</html>
`;
}

const plugins = [
  
];

const assets$1 = {
  "/.gitkeep": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-01-10T02:14:14.739Z",
    "size": 0,
    "path": "../../analog/public/.gitkeep"
  },
  "/analog.svg": {
    "type": "image/svg+xml",
    "etag": "\"2f59-onYRgu96DadF9OF8r3hf4CPH2vk\"",
    "mtime": "2025-01-10T02:14:14.739Z",
    "size": 12121,
    "path": "../../analog/public/analog.svg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3b4-Ivako7yq+vsCVODy+kzrieUF6LI\"",
    "mtime": "2025-01-10T02:14:14.739Z",
    "size": 948,
    "path": "../../analog/public/favicon.ico"
  },
  "/index.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"62f-epSEiLoF3xKcneO3J8YZT7wgH+g\"",
    "mtime": "2025-01-10T02:14:14.739Z",
    "size": 1583,
    "path": "../../analog/public/index.html"
  },
  "/vite.svg": {
    "type": "image/svg+xml",
    "etag": "\"5d9-9/Odcje3kalF1Spc16j7Nl8xM2Y\"",
    "mtime": "2025-01-10T02:14:14.739Z",
    "size": 1497,
    "path": "../../analog/public/vite.svg"
  },
  "/assets/2023-01-20-mastering-angular-structural-directives-the-basics-DWljsDVv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6e09-VFXG1guzqISFN0KzS9JU3N2OMV8\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 28169,
    "path": "../../analog/public/assets/2023-01-20-mastering-angular-structural-directives-the-basics-DWljsDVv.js"
  },
  "/assets/2023-01-25-gitea-docker-D5FlXHKQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9dd-UdJbqVDt/0ELHeMlsrUPCFFRy+4\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 2525,
    "path": "../../analog/public/assets/2023-01-25-gitea-docker-D5FlXHKQ.js"
  },
  "/assets/2023-02-06-mastering-angular-structural-directives-its-all-about-the-context-Bm6VgU_y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"995a-OjIS5l2DBTeK8XO5WVFh2+IoKco\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 39258,
    "path": "../../analog/public/assets/2023-02-06-mastering-angular-structural-directives-its-all-about-the-context-Bm6VgU_y.js"
  },
  "/assets/2023-02-12-mastering-angular-structural-directives-micro-syntax-demystified-DGT6m1WI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"98f6-ouv0a4oJA/rrrjdMErOr2voLFho\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 39158,
    "path": "../../analog/public/assets/2023-02-12-mastering-angular-structural-directives-micro-syntax-demystified-DGT6m1WI.js"
  },
  "/assets/2023-02-13-mastering-angular-structural-directives-micro-syntax-in-the-wild-B1mQ0TYP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6667-JSQMbkp63jYS7proHjElAnbTLPI\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 26215,
    "path": "../../analog/public/assets/2023-02-13-mastering-angular-structural-directives-micro-syntax-in-the-wild-B1mQ0TYP.js"
  },
  "/assets/2023-02-15-mirror-C2aTfSQn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17e6-QB4+e+ZCu1AHZJ/ZMxgePwCUpcM\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 6118,
    "path": "../../analog/public/assets/2023-02-15-mirror-C2aTfSQn.js"
  },
  "/assets/2023-02-17-dark-mode-with-analog-tailwind-D4NCO6em.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d9e8-4YUv8E75W8SpNFlCBvYx36Cje7Q\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 55784,
    "path": "../../analog/public/assets/2023-02-17-dark-mode-with-analog-tailwind-D4NCO6em.js"
  },
  "/assets/2023-04-28-spartan-type-safe-angular-full-stack-development-powered-by-analog-B8qFz2MG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fa46-zteWAekQIjv0arWMPDpLOczt8LA\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 64070,
    "path": "../../analog/public/assets/2023-04-28-spartan-type-safe-angular-full-stack-development-powered-by-analog-B8qFz2MG.js"
  },
  "/assets/2023-06-12-future-friend-LNfohaNP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e6-IkNcJxlPg+HLI6kBsM2NmmDKiAw\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 1510,
    "path": "../../analog/public/assets/2023-06-12-future-friend-LNfohaNP.js"
  },
  "/assets/2023-08-24-getting-started-with-spartanui-shadcn-like-ui-components-for-angular-CN2Rzuzo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9e71-1+hioJ24WXpvavWIxgeVFDMw1C4\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 40561,
    "path": "../../analog/public/assets/2023-08-24-getting-started-with-spartanui-shadcn-like-ui-components-for-angular-CN2Rzuzo.js"
  },
  "/assets/2024-01-15-the-baseline-CVDVNyQh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"51d-wXjH9smjVfTSgHT7Fj21b5+tw4o\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 1309,
    "path": "../../analog/public/assets/2024-01-15-the-baseline-CVDVNyQh.js"
  },
  "/assets/2024-04-10-inputs-DmICvLYD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a68-HK8dJnsixvPrkvF0pjrSUT3AK4Y\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 2664,
    "path": "../../analog/public/assets/2024-04-10-inputs-DmICvLYD.js"
  },
  "/assets/2024-06-05-programmer-death-W7w34BhK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cc0-4cp6Kmm4SzRkwrXyF7FPB9WK+HI\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 3264,
    "path": "../../analog/public/assets/2024-06-05-programmer-death-W7w34BhK.js"
  },
  "/assets/2024-10-22-simple-cicd-DrZmRjLZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2fd6-7l94PtMEdjgLTv0npcmvlsRBU3g\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 12246,
    "path": "../../analog/public/assets/2024-10-22-simple-cicd-DrZmRjLZ.js"
  },
  "/assets/_slug_.page-DQf9CNh9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5f5-Q0Fq9VFKJXMORPg81hJk7jLNe9E\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 1525,
    "path": "../../analog/public/assets/_slug_.page-DQf9CNh9.js"
  },
  "/assets/blog.page-B-3-mg32.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13e-2Sx/2u7hB5KM+EFLq8x+mhsH2+A\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 318,
    "path": "../../analog/public/assets/blog.page-B-3-mg32.js"
  },
  "/assets/favicon-CfaKENfs.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"4183e-qSZW/MJUZJgc+g9yjoFP+DuU1lI\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 268350,
    "path": "../../analog/public/assets/favicon-CfaKENfs.ico"
  },
  "/assets/index-BFB6YhDI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a742-vjUCueWbat+qfmZy4vfRwDba3Qw\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 42818,
    "path": "../../analog/public/assets/index-BFB6YhDI.css"
  },
  "/assets/index-fax6OGEo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a2214-iNwcrJ6UgIRFrQ9h9PkokilsuJQ\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 664084,
    "path": "../../analog/public/assets/index-fax6OGEo.js"
  },
  "/assets/index.page-BtRVwS6m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"51e-9hxZqED6R8KTmvelkcfZorR8JVU\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 1310,
    "path": "../../analog/public/assets/index.page-BtRVwS6m.js"
  },
  "/assets/index.page-CKZtmA7g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d08-zNOYvjtyd7ooDwmvI5l13OE5wQ8\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 3336,
    "path": "../../analog/public/assets/index.page-CKZtmA7g.js"
  },
  "/assets/index.page-DEZpJ-Nu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ec-pX3UwYkQGxp2ESoSWc1OxceOYes\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 2284,
    "path": "../../analog/public/assets/index.page-DEZpJ-Nu.js"
  },
  "/assets/page-header.component-CITkVSUq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"271-QOhlhaaWuVXmlt1/Ccm0vmu37mM\"",
    "mtime": "2025-01-10T02:14:14.736Z",
    "size": 625,
    "path": "../../analog/public/assets/page-header.component-CITkVSUq.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets$1[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _iHpGux = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  },
  "apiPrefix": "api"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const serverAssets = [{"baseName":"public","dir":"/home/aron/Repos/iviixii/iviixii.github.io/dist/client"},{"baseName":"server","dir":"/home/aron/Repos/iviixii/iviixii.github.io/src/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/home/aron/Repos/iviixii/iviixii.github.io/.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/aron/Repos/iviixii/iviixii.github.io","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/aron/Repos/iviixii/iviixii.github.io/src/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/aron/Repos/iviixii/iviixii.github.io/dist/.nitro","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/aron/Repos/iviixii/iviixii.github.io/dist/.nitro/cache","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

getContext("nitro-app", {
  asyncContext: undefined,
  AsyncLocalStorage: void 0
});

const _CrftxF = eventHandler(async (event) => {
          const apiPrefix = `/${useRuntimeConfig().apiPrefix}`;

          if (event.node.req.url?.startsWith(apiPrefix)) {
            const reqUrl = event.node.req.url?.replace(apiPrefix, '');

            if (
              event.node.req.method === 'GET' &&
              // in the case of XML routes, we want to proxy the request so that nitro gets the correct headers
              // and can render the XML correctly as a static asset
              !event.node.req.url?.endsWith('.xml')
            ) {
              return $fetch(reqUrl, { headers: event.node.req.headers });
            }

            return proxyRequest(event, reqUrl, {
              // @ts-ignore
              fetch: $fetch.native,
            });
          }
        });

const _lazy_oT4TYz = () => import('./chunks/routes/v1/hello.mjs');
const _lazy_1RREki = () => import('./chunks/_/renderer.mjs');

const handlers = [
  { route: '', handler: _iHpGux, lazy: false, middleware: true, method: undefined },
  { route: '/v1/hello', handler: _lazy_oT4TYz, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _CrftxF, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_1RREki, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const nitroApp = useNitroApp();
const localFetch = nitroApp.localFetch;
const closePrerenderer = () => nitroApp.hooks.callHook("close");
trapUnhandledNodeErrors();

export { closePrerenderer, localFetch };
//# sourceMappingURL=index.mjs.map
