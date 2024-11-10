const _20230217DarkModeWithAnalogTailwind = `---
title: Dark mode with Analog & Tailwind
date: 2023-02-17
teaser: Let's build an AnalogJs application with TailwindCSS and add dark mode!
slug: 2023-02-17-dark-mode-with-analog-tailwind
---

<p>I entirely rebuilt my personal website with Analog and Tailwind a few weeks ago. I tweeted about it and received lot of positive feedback.</p>
<p>One of the questions I received was about how I implemented the\xA0dark mode experience. Specifically, how does the website recognize the user&#39;s preferred color scheme while also allowing her to manually adjust the theme and remember her selection for the next time you visit the page?</p>
<p>I decided to publish a brief post outlining the approach I used so that others may implement a comparable user experience. In this post, we will build the following dark mode mechanism:</p>
<ul>
<li>We identify the color scheme picked by the user and change our theme accordingly.</li>
<li>A button will allow the user to change the current theme and toggle between dark and light mode.</li>
<li>The current theme should be saved (I&#39;ll do this with localStorage), so that the right theme is used the next time the user accesses the page.</li>
</ul>
<h4 id="note">Note</h4>
<p>Analog, Vite, and Tailwind are used in this tutorial. When building dark mode for standard Angular projects that use Webpack, the same concepts apply. Tailwind makes enabling dark mode a breeze. Again, the same functionality may be implemented with normal CSS or style processors such as SCSS.</p>
<h2 id="what-is-analogjs">What is AnalogJS</h2>
<p><a href="https://analogjs.org">Analog</a> is a full-stack meta-framework for building applications and websites with Angular. It is similar to other meta-frameworks such as Next.JS, Nuxt, or SvelteKit but built on top of Angular. It&#39;s features include:</p>
<ul>
<li>Vite/Vitest/Playwright</li>
<li>File-based routing</li>
<li>Support for API/server routes</li>
<li>Hybrid SSR/SSG support</li>
<li>Supports Angular CLI/Nx workspaces</li>
</ul>
<p>and more.</p>
<h2 id="getting-started-with-analog">Getting started with Analog</h2>
<p>The easiest way to get started is to use the <a href="https://stackblitz.com/github/analogjs/analog/tree/main/packages/create-analog/template-angular-v15?file=vite.config.ts&preset=node">Open Stackblitz</a> button on the <a href="https://analogjs.org">analogjs.org</a> website.</p>
<p>If you want to develop locally you can use the following command:</p>
<pre class="language-sh"><code class="language-sh"><span class="token function">npm</span> create analog@latest</code></pre><p>This will scaffold a basic Analog application. Once all dependencies are installed you can start your development server with:</p>
<pre class="language-sh"><code class="language-sh"><span class="token function">npm</span> run start</code></pre><p>Now that we have a vanilla Analog project up and running we can start implementing the dark mode functionality.</p>
<h2 id="adding-tailwind-to-analog">Adding Tailwind to Analog</h2>
<p>The great news is that Analog &amp; Vite support PostCSS out of the box. So we can mostly just follow Tailwind&#39;s <a href="https://tailwindcss.com/docs/installation/using-postcss">Using PostCSS</a> installation guide.</p>
<p>Fist we install our dependencies</p>
<pre class="language-sh"><code class="language-sh"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> tailwindcss postcss autoprefixer</code></pre><p>Then in our root directory we create two files:</p>
<h4 id="1-postcssconfigjs">1. postcss.config.js</h4>
<pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">tailwindcss</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">autoprefixer</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre><p>This file tells Vite to enable PostCSS and run the tailwindcss and autoprefixer plugins.</p>
<h4 id="2-tailwindconfigjs">2. tailwind.config.js</h4>
<pre class="language-js"><code class="language-js"><span class="token comment">/** @type {import('tailwindcss').Config} */</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./src/**/*.{html,ts}'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">darkMode</span><span class="token operator">:</span> <span class="token string">'class'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extend</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre><p>This file ensures that all Tailwind classes in the source folder are picked up.
Two small changes to this file compared to the Tailwind guide:</p>
<ol>
<li>For the <code>content</code> property we change the file ending to <code>ts</code>.</li>
<li>We add the <code>darkMode</code> property and set its value to <code>class</code>.
These changes ensure that our Angular files are picked up and allow us to manually toggle Tailwind&#39;s dark mode classes by adding or removing the dark class from the <code>html</code> element.</li>
</ol>
<h4 id="3-add-default-styles-to-stylescss">3. Add default styles to styles.css</h4>
<p>Finally, we need to add the Tailwind directives to our main css file.</p>
<pre class="language-css"><code class="language-css"><span class="token comment">/*
  Allow percentage-based heights in the application
*/</span>
<span class="token selector">html,
body</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
  Remove built-in form typography styles
*/</span>
<span class="token selector">input,
button,
textarea,
select</span> <span class="token punctuation">{</span>
  <span class="token property">font</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
  Avoid text overflows
*/</span>
<span class="token selector">p,
h1,
h2,
h3,
h4,
h5,
h6</span> <span class="token punctuation">{</span>
  <span class="token property">overflow-wrap</span><span class="token punctuation">:</span> break-word<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*
  Create a root stacking context
*/</span>
<span class="token selector">app-root</span> <span class="token punctuation">{</span>
  <span class="token property">isolation</span><span class="token punctuation">:</span> isolate<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@tailwind</span> base<span class="token punctuation">;</span></span>
<span class="token atrule"><span class="token rule">@tailwind</span> components<span class="token punctuation">;</span></span>
<span class="token atrule"><span class="token rule">@tailwind</span> utilities<span class="token punctuation">;</span></span></code></pre><p>As you noticed, I also added some other awesome css resets inspired by a great Jon Comeau <a href="https://www.joshwcomeau.com/css/custom-css-reset/">blog post.</a></p>
<h2 id="adding-initialization-script-to-indexhtml">Adding initialization script to index.html</h2>
<p>After setting up Tailwind, we can move on to the initial stage of incorporating dark mode onto our page.</p>
<p>In order to get started, we first add a <code>&lt;script&gt;</code> element to our index.html file. This blocking script makes sure that the appropriate theme value is saved in localStorage and that the <code>dark</code> class is immediately applied to the <code>&lt;html&gt;</code> element as soon as the user loads the page.</p>
<p>All this occurs before our Angular application takes control and, more importantly, before any content is painted. This allows the browser to immediately apply the appropriate dark Tailwind classes when painting our user interface.</p>
<p>For more information, check out <a href="https://www.joshwcomeau.com/react/dark-mode/#a-workable-solution-5">this part</a> of another outstanding Jon Comeau blog post that describes this technique in detail.</p>
<pre class="language-html"><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>MyApp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>base</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/x-icon<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/src/favicon.ico<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/src/styles.css<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token comment">// check if user had saved dark as their </span>
        <span class="token comment">// theme when accessing page before</span>
        localStorage<span class="token punctuation">.</span>theme <span class="token operator">===</span> <span class="token string">'dark'</span> <span class="token operator">||</span>
        <span class="token comment">// or user's requesting dark color </span>
        <span class="token comment">// scheme through operating system</span>
        <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token string">'theme'</span> <span class="token keyword">in</span> localStorage<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">'(prefers-color-scheme: dark)'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>matches<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// then if we have access to the document and the element</span>
        <span class="token comment">// we add the dark class to the html element and</span>
        <span class="token comment">// store the dark value in the localStorage</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>document <span class="token operator">&amp;&amp;</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">,</span> <span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// else if we have access to the document and the element</span>
        <span class="token comment">// we remove the dark class to the html element and </span>
        <span class="token comment">// store the value light in the localStorage</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>document <span class="token operator">&amp;&amp;</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">,</span> <span class="token string">'light'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app-root</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>app-root</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/src/main.ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></code></pre><p>Let&#39;s take a closer look at what is happening inside our script tag:</p>
<pre class="language-js"><code class="language-js"><span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token comment">// check if user had saved dark as their </span>
        <span class="token comment">// theme when accessing page before</span>
        localStorage<span class="token punctuation">.</span>theme <span class="token operator">===</span> <span class="token string">'dark'</span> <span class="token operator">||</span>
        <span class="token comment">// or user's requesting dark color </span>
        <span class="token comment">// scheme through operating system</span>
        <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token string">'theme'</span> <span class="token keyword">in</span> localStorage<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">'(prefers-color-scheme: dark)'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>matches<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// then if we have access to the document and the element</span>
        <span class="token comment">// we add the dark class to the html element and</span>
        <span class="token comment">// store the dark value in the localStorage</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>document <span class="token operator">&amp;&amp;</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">,</span> <span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// else if we have access to the document and the element</span>
        <span class="token comment">// we remove the dark class to the html element and </span>
        <span class="token comment">// store the value light in the localStorage</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>document <span class="token operator">&amp;&amp;</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">,</span> <span class="token string">'light'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span></code></pre><ul>
<li>We check if there is already a <code>dark</code> value set to the <code>theme</code> property of the user&#39;s localStorage OR if the user is requesting a dark theme using the operating system.</li>
<li>If that is the case and we have access to the document and its <code>html</code> element, we <strong>add</strong> the <code>dark</code> class to that element and store the <code>dark</code> value for our <code>theme</code> in the localStorage.</li>
<li>If that is NOT the case we and we have access to the document and its <code>html</code> element, we <strong>remove</strong> the <code>dark</code> class from that element and store the <code>light</code> value for our <code>theme</code> in the localStorage.</li>
</ul>
<p>Check out the source code for this file <a href="https://stackblitz.com/edit/github-ojlugz?file=index.html">here.</a></p>
<p>At this point we have a page that supports Tailwind and initially renders the correct color scheme.</p>
<h2 id="creating-the-themeservice">Creating the ThemeService</h2>
<p>Let&#39;s move on and allow our visitors to manually toggle their preferred theme.
To do this we will create a singleton Angular service that will do 5 things:</p>
<ol>
<li>It will sync with localStorage when the application first loads.</li>
<li>It will keep track of theme changes in memory.</li>
<li>It will exposes a method to toggle the theme and write those theme changes back to localStorage.</li>
<li>It will add/remove the <code>dark</code> class from the <code>html</code> element as necessary.</li>
<li>It will expose the current theme as an Observable for other parts of the application.</li>
</ol>
<p>Let&#39;s create a new Angular service in the following location: <code>/src/libs/theme/theme.service.ts</code>. We add the following code:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  providedIn<span class="token operator">:</span> <span class="token string">'root'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ThemeService</span> <span class="token keyword">implements</span> <span class="token class-name">OnDestroy</span> <span class="token punctuation">{</span>
  <span class="token comment">// A. Setting up our dependencies</span>
  <span class="token comment">// A.1 since we will access localStorage with AnalogJS</span>
  <span class="token comment">// (which can be used for server side rendering)</span>
  <span class="token comment">// we will use the PLATFORM_ID to see if we are executing in the browser and</span>
  <span class="token comment">// it is available</span>
  <span class="token keyword">private</span> _platformId <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token constant">PLATFORM_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// A.2 we use Angular's renderer to add/remove the dark class from the html element</span>
  <span class="token keyword">private</span> _renderer <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>RendererFactory2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// A.3 we use Angular's DOCUMENT injection token to avoid directly accessing the document object</span>
  <span class="token keyword">private</span> _document <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token constant">DOCUMENT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// B. Initializing our in memory theme store</span>
  <span class="token comment">// B.1 we want to give every subscriber the current value of our theme</span>
  <span class="token comment">// even if they subscribe after the first value was emitted</span>
  <span class="token keyword">private</span> _theme$ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReplaySubject<span class="token operator">&lt;</span><span class="token string">'light'</span> <span class="token operator">|</span> <span class="token string">'dark'</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// B.2 we expose the current theme so our app can access it and e.g. show</span>
  <span class="token comment">// a different icon for the button to toggle it</span>
  <span class="token keyword">public</span> theme$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_theme$<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// B.3 this emits when the service is destroyed and used to clean up subscriptions</span>
  <span class="token keyword">private</span> _destroyed$ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subject<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// C. Sync and listen to theme changes on service creation</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// we check the current value in the localStorage to see what theme was set</span>
    <span class="token comment">// by the code in the index.html file and load that into our _theme$ replaysubject</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">syncThemeFromLocalStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// we also immediately subscribe to our theme$ variable and add/remove</span>
    <span class="token comment">// the dark class from the html element</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">toggleClassOnThemeChanges</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// C.1 sync with the theme set in the localStorage by our index.html script tag</span>
  <span class="token keyword">private</span> <span class="token function">syncThemeFromLocalStorage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// if we are in the browser we know we have access to localstorage</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPlatformBrowser</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_platformId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// we load the appropriate value from the localStorage into our _theme$ replaysubject</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_theme$<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>
        localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'dark'</span> <span class="token operator">?</span> <span class="token string">'dark'</span> <span class="token operator">:</span> <span class="token string">'light'</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// C.2 Subscribe to theme changes until the service is destroyed</span>
  <span class="token comment">// and add/remove class from html element</span>
  <span class="token keyword">private</span> <span class="token function">toggleClassOnThemeChanges</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// until our service is destroyed we subscribe to all changes in the theme$ variable</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>theme$<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span><span class="token function">takeUntil</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_destroyed$<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span>theme<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// if it is dark we add the dark class to the html element</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>theme <span class="token operator">===</span> <span class="token string">'dark'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_renderer<span class="token punctuation">.</span><span class="token function">addClass</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_document<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span> <span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// else if is added already, we remove it</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>className<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_renderer<span class="token punctuation">.</span><span class="token function">removeClass</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_document<span class="token punctuation">.</span>documentElement<span class="token punctuation">,</span> <span class="token string">'dark'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// D. Expose a public function that allows us to change the theme from anywhere in our application</span>
  <span class="token keyword">public</span> <span class="token function">toggleDarkMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> newTheme <span class="token operator">=</span>
      localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'dark'</span> <span class="token operator">?</span> <span class="token string">'light'</span> <span class="token operator">:</span> <span class="token string">'dark'</span><span class="token punctuation">;</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'theme'</span><span class="token punctuation">,</span> newTheme<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_theme$<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>newTheme<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// E. Clean up our subscriptions when the service gets destroyed</span>
  <span class="token keyword">public</span> <span class="token function">ngOnDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_destroyed$<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_destroyed$<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>Let&#39;s break down what is happening here:</p>
<p><strong>A.</strong> First we set up our dependencies
<strong>A.1</strong> We will need to access localStorage. Analog can be used for server side rendering. Therefore, we are not guaranteed that our code will only be run in the browser. Therefore, we inject the PLATFORM_ID so we can check if we are executing in the browser and localStorage is available.
<strong>A.2</strong> We inject Angular&#39;s RendererFactory and pass in null as the arguments when executing the <code>createRenderer</code> function. This will give us the default renderer. We will use this renderer to add/remove the <code>dark</code> class from our document&#39;s <code>html</code> element.
<strong>A.3</strong> We get access to the document using Angular&#39;s <code>DOCUMENT</code> injection token. Again, Analog can be used with Server Side Rendering. Therefore, we must avoid directly accessing the browser&#39;s document object.</p>
<p><strong>B.</strong> We continue with initializing our in memory theme store
<strong>B.1</strong> We use a ReplaySubject with buffer size 1 to share the theme value (which can be <code>light</code> or <code>dark</code>.) The ReplaySubject ensures that the last value is provided to any subscriber even if they subscribe after the latest value was emitted.
<strong>B.2</strong> Outside our service we expose the current theme as a simple Observable.
<strong>B.3</strong> Finally, we set up a <code>_destroyed$</code> Subject, which we use to unsubscribe from all our Observables when our service is destroyed.</p>
<p>Now that everything is set up let&#39;s see what happens when the service is created.</p>
<p><strong>C.</strong> When the service is constructed we sync our theme from the localStorage. Then, we subscribe to our <code>theme$</code> changes and add/remove the <code>dark</code> class from our <code>html</code> element accordingly.
<strong>C.1</strong> The appropriate theme has already been saved in the localStorage by the <code>&lt;script&gt;</code> in our <code>index.html</code> file has already stored the correct theme in the localStorage. We just pull that value from localStorage. To achieve that, we first determine whether we are in the browser and hence have access to localStorage. If we are, we load the stored value into our <code>_theme$</code> ReplaySubject.
<strong>C.2</strong> Still in the constructor we subscribe to <code>theme$</code> changes until our service is <code>_destroyed$</code>. If the theme is <code>dark</code> we add the <code>dark</code> class to the <code>_document</code>&#39;s <code>html</code> element using Angular&#39;s <code>_renderer</code>. If the theme is <code>light</code> and the <code>dark</code> class already exists on the <code>html</code> element, then we simply remove it.</p>
<p><strong>D.</strong> Then we expose a public function, which toggles our theme based on the current value in the localStorage. The new theme is subsequently pushed as the next value into of <code>_theme$</code> ReplaySubject. This ensures that our <code>_theme$</code> and localStorage are always in sync.</p>
<p><strong>E.</strong> Lastly, we configure the mechanism to terminate our subscriptions\xA0 when\xA0our service gets destroyed. Our service is a singleton provided in root. It would only be destroyed if\xA0the entire application was. Therefore, we should be fine even if we don&#39;t unsubscribe here, but it&#39;s always a good idea to clean up your subscriptions.</p>
<p>The live code for our service can be found <a href="https://stackblitz.com/edit/github-ojlugz?file=src/libs/theme/theme.service.ts">here.</a></p>
<p><strong>Important Note:</strong> All import paths must be the same for Angular to construct a singleton service. Therefore, we can not import our ThemeService using relative paths. We add the following to <a href="https://stackblitz.com/edit/github-ojlugz?file=vite.config.ts">vite.config.js</a> in order to support Vite&#39;s use of absolute import paths:</p>
<pre class="language-js"><code class="language-js"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> mode <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token operator">...</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">src</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'./src'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>As a result, we are able to import everything from the src directory. For instance, in our (home).ts route, we will now import the service with
<code>import { ThemeService } from &#39;src/libs/theme/theme.service&#39;;</code>
rather than
<code>import { ThemeService } from &#39;../../libs/theme/theme.service&#39;;</code>. This is because using relative paths can cause Angular to create multiple service instances, which can have very strange and unexpected effects.</p>
<p><em>Yes, I spent way too much time trying to figure out why my ThemeService was showing different themes in different components...</em></p>
<h2 id="using-our-themeservice-in-our-analog-app">Using our ThemeService in our Analog app</h2>
<p>Now that our service is set up, let&#39;s use it in our Analog application. We will add a button to the header that allows us to toggle the theme from anywhere in the app. We also display the theme in our HomeComponent to illustrate that the current theme can be accessed from anywhere in our application. We also add Tailwind classes that support both light and dark theme styling.</p>
<h3 id="adding-a-button-to-the-appcomponent">Adding a button to the AppComponent</h3>
<p>Let&#39;s add the following to our <code>/src/app/app.component.ts</code>:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>AsyncPipe<span class="token punctuation">,</span> RouterOutlet<span class="token punctuation">]</span><span class="token punctuation">,</span>
  host<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span><span class="token operator">:</span>
      <span class="token string">'block h-full bg-zinc-50 text-zinc-900 dark:text-zinc-50 dark:bg-zinc-900'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string"> 
  &lt;header class="p-4">
  &lt;button (click)="toggleTheme()">Toggle theme&lt;/button>
  &lt;/header>
  &lt;router-outlet>&lt;/router-outlet> </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> _themeService <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ThemeService<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">toggleTheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_themeService<span class="token punctuation">.</span><span class="token function">toggleDarkMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>The code for the component is <a href="https://stackblitz.com/edit/github-ojlugz?file=src/app/app.component.ts">here.</a></p>
<p>This will be the entry point to our Analog application.</p>
<p>The user can toggle the theme by clicking a button that is displayed in the template&#39;s header.</p>
<p>To make our application look super sleek, we also added Tailwind classes to the host. These include classes that start with the prefix <code>dark</code>, which are used when the <code>dark</code> class is added to the site&#39;s <code>html</code> element. The following classes instruct Tailwind to use a super-light zinc-gray background and a super-dark zinc-gray text-color by default and to invert them when <code>dark</code> is present:</p>
<p><code>bg-zinc-50 text-zinc-900 dark:text-zinc-50 dark:bg-zinc-900</code></p>
<p>Inside the component we hooked up its <code>toggleTheme</code> method with the ThemeService&#39;s <code>toggleDarkMode</code> method. The service is simply injected to the component using Angular&#39;s <code>inject</code> function.</p>
<h3 id="displaying-the-current-theme-on-analogs-homepage">Displaying the current theme on Analog&#39;s (home)page</h3>
<p>Finally, let&#39;s display the current theme on our homepage.</p>
<p>Using the Angular Router as a foundation, Analog offers filesystem-based routing. It provides us with a simple method for organizing our application&#39;s folders and filenames to create our route tree. To find out more about the supported types of routes, I strongly recommend checking out\xA0Analog&#39;s <a href="https://analogjs.org/docs/features/routing/overview">routing documentation.</a></p>
<p>We will keep it simple for our purposes and simply create an index route by creating the following component at <code>/src/app/routes/(home).ts</code>:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'app-home'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>AsyncPipe<span class="token punctuation">]</span><span class="token punctuation">,</span>
  host<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">'block'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div class="flex p-12 gap-8 items-center justify-center">
  &lt;img class="h-20 w-20" src="/analog.svg"/>
  &lt;div class='w-[1px] h-14 dark:bg-zinc-50 bg-zinc-900'>&lt;/div>
  &lt;img class="h-20 w-20" src="/tailwind.svg"/>
  &lt;/div>
  &lt;h2 class="text-2xl text-center">Analog + Tailwind: Darkmode&lt;/h2>
  &lt;p class="mt-2 text-center">Current theme: {{theme$ | async}}&lt;/p>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">HomeComponent</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> _themeService <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ThemeService<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> theme$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_themeService<span class="token punctuation">.</span>theme$<span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>The code for the HomeComponent is <a href="https://stackblitz.com/edit/github-ojlugz?file=src/app/routes/(home).ts">here.</a></p>
<p>Again, we add some Tailwind magic, including some <code>dark</code> classes. Additionally, we inject our ThemeService into the component and expose it&#39;s <code>theme$</code> observable, which we simply display in our template using Angular&#39;s <code>AsyncPipe</code>.</p>
<p>Since we set up our application to import our service via <code>import { ThemeService } from &#39;src/libs/theme/theme.service&#39;;</code> instead of a relative path, we will see that our <code>theme$</code> value will correctly display <code>light</code> if we are using our <code>light</code> theme and <code>dark</code> if we decide to toggle to our <code>dark</code> theme.</p>
<p><a href="https://stackblitz.com/edit/github-ojlugz">Check out the complete example here!</a></p>
<h2 id="wrapping-up">Wrapping Up</h2>
<p>Awesome! We have now implemented dark mode in our Analog app. Our implementation respects the user&#39;s preferred color scheme by default. It avoids flashing of the wrong theme, and allows us to access and toggle the theme from anywhere in our application!</p>
`;

export { _20230217DarkModeWithAnalogTailwind as default };
//# sourceMappingURL=2023-02-17-dark-mode-with-analog-tailwind-BNDZe4GL.mjs.map
