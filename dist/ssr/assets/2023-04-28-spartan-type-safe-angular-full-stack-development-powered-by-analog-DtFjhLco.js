const _20230428SpartanTypeSafeAngularFullStackDevelopmentPoweredByAnalog = `---
title: SPARTAN. Type-safe Angular full-stack development powered by Analog.
date: 2023-04-28
teaser: It is time that Angular gets its own T3-stack for end-to-end typesafe applications! We explore how we can do this today with spartan and AnalogJs.
slug: 2023-04-28-spartan-type-safe-angular-full-stack-development-powered-by-analog
---

<p>In 2023, Server-Side Rendering (SSR) is an essential part of modern web applications. In the React ecosystem NextJs has become so incredibly popular that the official React documentation now recommends to use it when creating a new project. The Vue docs point to Nuxt as the recommended way to take a Vue application &quot;from the example to a production-ready SSR app.&quot;</p>
<p>So what about Angular? We all know Angular as a popular single page application framework (SPA) by Google. It&#39;s strength has always been in enterprise applications, who require developers to build and manage complex systems. But indeed Angular has had support for server side rendering (SSR) through Angular Universal for years. However, in developer surveys Angular&#39;s SSR capabilities has been the top area Angular users want to see improvements in. To put it short, SSR is currently one of the weaknesses of this amazing framework. The good news, the team is working hard to bring improvements to Universal and the core framework that will soon allow us to leverage the full power of Angular combined with modern SSR solutions. I invite you to read <a href="https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67">this exciting article</a> by Jessica Janiuk from the Angular team to learn more.</p>
<p>The even better news is that SSR with Angular today might be a lot further than you think already. @brandontroberts has created an amazing community project called Analog. A metaframework a la NextJs or Nuxt built on top of Angular, Vite, and Nitro. There will be a whole article dedicated to getting started with Analog that will go into much more detail. I also recommend to check out the official documentation at <a href="https://analogjs.org/">analogjs.org</a> to learn more.</p>
<p>In this article, we will go a step further and augment Analog with some other tools to create a complete, incredibly powerful application stack that is typesafe from the database to the DOM rendering template. Thankfully, Angular&#39;s TypeScript support is unrivaled as the framework has been developed entirely in TypeScript since its initial release became available more than ten years ago. To maintain this high focus on typesafety throughout the entire application is only natural. With both client and server written in TypeScript, Analog puts us in an exceptional position to fully capitalize on this, especially as more and more fantastic server side capabilities become available in the Typescript ecosystem.</p>
<p>Once we augment these two fundamental pillars with other amazing (mostly) typesafe technologies we end up with the following stack: <a href="https://supabase.com/">Supabase</a>, <a href="https://www.prisma.io/">Prisma</a>, <a href="https://analogjs.org/">Analog</a>, <a href="https://trpc.io/">tRPC</a>, <a href="https://tailwindcss.com/">Tailwind</a>, <a href="https://angular.io/">Angular</a>, and <a href="https://nx.dev/">Nx</a>. Or short: SPARTAN.</p>
<p>Of course, all the source code is available to you and if you are already excited about this and cannot wait to get your hands dirty I invite you to check out the repository <a href="https://github.com/goetzrobin/spartan">here.</a></p>
<p>I will do my best to present compelling arguments for each of the underlying technologies. Continue reading to learn why I think they deserve to power your upcoming full-stack application.</p>
<h2 id="the-spartan-stack">The SPARTAN Stack</h2>
<p>Let’s get our hands dirty and see the different components that make up the SPARTAN stack:</p>
<h3 id="nx">Nx</h3>
<p>Let&#39;s start with the workspace. The location where your code will reside and the features that meet the needs of your users will be implemented. It reminds me of a craftsman&#39;s workshop, if you will. There is only a workbench at first, and as you move along and continue working on your projects, you gradually fill it with all the tools you need. Our beloved uncle Nx has been doing woodworking for years and arrives on the first day with a toolbox filled with every tool one could ever need. But let’s get back to software:</p>
<p>Nx is a next-generation build system that offers  first-class monorepo support and strong integrations for all well-known javascript frameworks. It enables you to use  frontend frameworks like Angular or backend frameworks like NestJs to architect, test, and build your project at any size.</p>
<p>It comes with a fantastic collection of tools that make managing monorepos much easier. A monorepo is a multi-project and multi-library version-controlled code repository. By enabling us to reuse components and types not just between multiple front-end libraries but also between the frontend and the backend, monorepos make it simple to increase the DRYness of our code. The ability to share code across the client and server in a s∂ingle repository is a game-changer for us. There are many more advantages to monorepos, and far better papers have been written about them.</p>
<p>To get started with Nx you can run the following command and select the following options:</p>
<pre class="language-shell"><code class="language-shell">npx create-nx-workspace@latest

✔ Choose your style                     · integrated
✔ What to create <span class="token keyword">in</span> the new workspace   · angular
✔ Repository name                       · spartan
✔ Application name                      · app
✔ Default stylesheet <span class="token function">format</span>             · css
✔ Enable distributed caching to <span class="token function">make</span> your CI faster · No</code></pre><p>Please note that all the commands are supposed to illustrate a basic setup. There’s a lot of fine tuning necessary to get the application up and running. Cloning the GitHub repository is the fastest way to get started.</p>
<h3 id="angular">Angular</h3>
<p>The aforementioned command will create for you a Nx workspace that is already set up to be used with Angular. Well done! Your SPARTAN project&#39;s foundation has just been established!
Let me briefly explain why Angular is my preferred framework before we go on:</p>
<p>Angular has opinionated routing solutions, a strong HttpClient for making asynchronous web queries, and, my personal favorite, an outstanding dependency injection system. Angular provides programmers with all the resources they need to create outstanding applications right out of the box. It is more than simply a library; it is a full-fledged framework.</p>
<p>Also, Angular is written in TypeScript. Static type checking is now possible with our IDE, helping in identifying mistakes early on. When both the frontend and the backend are created using TypeScript, this is extremely powerful. This enables us to be typesafe from the database all the way through to the template that renders our data to the DOM!</p>
<p>When creating something from scratch, it&#39;s easy to overlook that applications on the internet are utilized by individuals of all abilities. It&#39;s possible that some users will need assistive technology to use our applications. Good accessibility (a11y) features have been baked into the Angular framework. By default, the Angular development team prioritizes accessibility. Look at the Angular Component Development Kit, for example. Its accessibility features are fantastic. It offers all the tools necessary to build your own extendable, aesthetically pleasing, and easily accessible components and is maintained by the framework&#39;s creators. Built with Angular, for everyone.</p>
<p>Building with Angular, also means building with everyone. The incredible community surrounding Angular is perhaps its best feature. They are an amazing group of folks from all different backgrounds. The amazing Angular core team, which cares about users, developers, and ensures that everyone has a say when they plan and build new features, is the community&#39;s spearhead (pardon the pun). Angular truly supports excellent community projects, and the community takes full advantage by providing tremendous tools and features on top of an amazing framework.</p>
<h3 id="analog">Analog</h3>
<p>We are off to a strong start and have a full-fledged, complete framework as the essential component of our stack. So let&#39;s add Analog to Angular and give it some superpowers. Adding Analog to your workspace is quite simple with the brand-new Nx plugin:</p>
<p>Install the <code>@analogjs/platform</code>:</p>
<pre class="language-shell"><code class="language-shell"><span class="token function">npm</span> i @analogjs/platform</code></pre><p>And add a preconfigured Analog application:</p>
<pre class="language-shell"><code class="language-shell">nx g @analogjs/platform:app analog-trpc</code></pre><p>Analog is a metaframework for Angular. It provides you with all the benefits of Angular, but extends its capabilities with even more:</p>
<p>Analog uses Vite for serving and building as well as Vitest for testing. Vite is  a next generation JavaScript  bundler that is super fast. It also gives us access to the Vite ecosystem  with hundreds of very powerful plugins. A mature frontend framework like Angular combined with access to all the benefits of Vite is truly incredible. It seems like the Angular team shares this opinion as it is also working to move the built in dev server for <a href="https://twitter.com/mgechev/status/1644018247748943872">Angular to Vite.</a></p>
<p>{% twitter 1644018247748943872 %}</p>
<p>Another incredible advantage of Analog is that it comes equipped to handle both Server-Side Rendering (SSR) and Static Site Generation (SSG) for Angular applications. With Analog, Angular can easily power marketing websites, blog pages, and more! As Analog is SSR by default, no further configuration is necessary.
Analog comes with SSG support. It makes it simple for you to export your website as basic static assets that you can host on GitHub Pages, S3, or any other static file server! Whether you choose to go fully static or leverage the benefits of server side rendering, Analog offers all of the SSR benefits for SEO and performance today. Still, there is even more. With Angular 16, we already get non-destructive hydration and significantly improved web vitals enhancements. You can expect even greater performance once zoneless applications powered by signals are released in version 17. Building on Analog puts you in a great position to take full advantage of those features.</p>
<p>Last but not least, Analog supports API (server) routes and file-based routing for Angular apps. In an analog application, the folder hierarchy and filenames determine the routing. You won&#39;t ever need to declare a route array again. Don&#39;t worry, you can still use the full power of the Angular router with its route guards and resolvers by defining route metadata within your files.</p>
<h3 id="tailwindcss">TailwindCSS</h3>
<p>Every good application needs a great UI. Although it&#39;s easier said than done, there are tools that help us do our best work. Tailwind is one of those essential tools for me.
Tailwind is &quot;a utility-first CSS framework packed with classes like <code>flex</code>, <code>pt-4</code>, <code>text-center</code> and <code>rotate-90</code>.&quot;
These utility classes let you to modify the layout, color, spacing, font, shadows, and more to create a distinctive component design without leaving your HTML or adding any additional CSS code. To me, there are several key factors that earn Tailwind it’s place in the SPARTAN stack:</p>
<ul>
<li>Its set of utility classes have good design principles built in.</li>
<li>Building your reusable UI components with tailwind gives you consistency and flexibility out of the box.</li>
<li>Tailwind plays together perfectly with Angular. The framework is built around components which encapsulate part of the UI and can be assembled to achieve the user experience you desire.</li>
<li>I would even claim that Angular makes working with tailwind especially fun: Angular’s directives are perfect to hide the often complained about ugly markup. My Angular brother Robin Goetz <a href="https://dev.to/goetzrobin/reusable-buttons-with-angular-tailwind-ki9">whole a article</a> about this directive and tailwind love affair.  Also, if you dare you can something like this to extract your tw classes and keep your Angular templates clean:</li>
</ul>
<p>{% twitter 1644820404861583361 %}</p>
<p><strong>Warning</strong>: This seems to be highly controversial so use at your own risk...</p>
<p>Since we are using Vite and Nx adding tailwind will also be super straightforward. We install the necessary dependencies</p>
<pre class="language-shell"><code class="language-shell"><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> tailwindcss postcss autoprefixer</code></pre><p>Then, we add a tailwind config to the root of our application:</p>
<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token punctuation">{</span> createGlobPatternsForDependencies <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"@nrwl/angular/tailwind"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> join <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"path"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/** @type {import("tailwindcss").Config} */</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">darkMode</span><span class="token operator">:</span> <span class="token string">'class'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"./index.html"</span><span class="token punctuation">,</span>
    <span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">"src/**/!(*.stories|*.spec).{ts,html}"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token operator">...</span><span class="token function">createGlobPatternsForDependencies</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">extend</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><p>Finally, we tell Vite to run PostCSS and create the tailwind classes by adding a postcss.config.js file to our application:</p>
<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token punctuation">{</span> join <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">tailwindcss</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'tailwind.config.js'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">autoprefixer</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre><h3 id="trpc">tRPC</h3>
<p>At this point our frontend is ready to go! However, it turns out that Analog sneakily turned us into a full stack developer. Code that we put inside the server folder is actually executed on the server 🤯 It’s that easy! Well let’s take full advantage of our API being built in the same language and the same repository. Let’s make our server client interaction super smooth and super typesafe with tRPC.</p>
<p>tRPC stands for TypeScript Remote Procedure Call, and is a lightweight library for remotely calling backend functions on the client side. It makes communication between the backend and frontend incredibly easy taking advantage of TypeScript inference to automatically warn you of errors on your client before you even save the change on your server file! Using tRPC will feel like using an SDK for your API&#39;s server code, giving you confidence in your endpoints.</p>
<p>On the server, you create a tRPC API by defining your procedures. Procedures are the composable functions used to build your backend. They&#39;re composable and can be queries, mutations, or subscriptions. Routers contain multiple procedures. Often, we use a the popular <a href="https://github.com/colinhacks/zod">Zod</a> validator library to ensure the input from the client has exactly the shape that our procedure expects. Finally, we always export the type of our API&#39;s tRPC router so we can use it in our frontend code.</p>
<p>In the SPARTAN repository I have already implemented tRPC adapters for both the client inside our Angular application and the Nitro server, which Analog provides to us by default. This makes using tRPC and Analog super easy! If you are interested in the underlying source code feel free to check out the <code>@spartan/trpc</code> package, which is located in the <code>libs/trpc</code> folder. For more information on tRPC I recommend checking out their amazing documentation site <a href="https://trpc.io">trpc.io</a></p>
<h3 id="prisma">Prisma</h3>
<p>Now, our front-end code is typesafe, as is our server code, and our front-end and server interaction is both very smooth and typesafe. We&#39;re just a few steps away from having complete typesafety from our database to the template generating the DOM. Prisma is the tool that will bring us there.</p>
<p>Prisma is a Node.js and TypeScript ORM. An ORM is an Object Relational Mapper, which is a piece of code that wraps the code required to manipulate the data, allowing you to avoid using SQL and instead interact directly with an object in the same language you&#39;re using. Hibernate is a popular ORM for Java and the Spring framework, .NET has the entity framework, and Typescript has Prisma. Prisma, however, goes beyond just a simple ORM. It has an intuitive data model, automated migrations (I can&#39;t emphasize how valuable this is), typesafety, and auto-completion!</p>
<p>With Prisma, you include a definition of your database schema within your code repository.
Prisma then creates a properly typed Client using this information. The Prisma client is query builder that is specific to your database schema and is aware of every one of your tables, their fields, and their relationships! With Prisma, we are literally typesafe from the database to the template.</p>
<p>Additionally, it creates SQL migrations automatically using the Prisma schema, monitors the execution of migrations, and offers tools for identifying and resolving conflicts and drifts between migrations and the database schema. This completely changes the game as it enables your database and all of its types to evolve alongside your application code.</p>
<p>We can add Prisma to our stack like this:</p>
<pre class="language-shell"><code class="language-shell"><span class="token function">npm</span> <span class="token function">install</span> prisma --save-dev</code></pre><p>Then, we initialize the client with:</p>
<pre class="language-shell"><code class="language-shell">npx prisma init</code></pre><p>This will create a <code>prisma</code> folder in our Nx workspace&#39;s root directory. Inside there is a file called <code>schema.prisma</code>. I added the following contents:</p>
<pre><code>generator client <span class="token punctuation">{</span>
  provider <span class="token operator">=</span> <span class="token string">"prisma-client-js"</span>
<span class="token punctuation">}</span>

datasource db <span class="token punctuation">{</span>
  provider <span class="token operator">=</span> <span class="token string">"postgresql"</span>
  url      <span class="token operator">=</span> <span class="token function">env</span><span class="token punctuation">(</span><span class="token string">"DATABASE_URL"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

model note <span class="token punctuation">{</span>
  id         BigInt    <span class="token decorator"><span class="token at operator">@</span><span class="token function">id</span></span><span class="token punctuation">(</span>map<span class="token operator">:</span> <span class="token string">"notes_pkey"</span><span class="token punctuation">)</span> @<span class="token keyword">default</span><span class="token punctuation">(</span><span class="token function">autoincrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  created_at DateTime<span class="token operator">?</span> @<span class="token keyword">default</span><span class="token punctuation">(</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token decorator"><span class="token at operator">@</span><span class="token function">db</span></span><span class="token punctuation">.</span><span class="token function">Timestamptz</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
  note       String<span class="token operator">?</span>
<span class="token punctuation">}</span></code></pre><p>This will tell Prisma to create a JavaScript/TypeScript client, connect to a Postgres SQL database using the <code>DATABASE_URL</code> connection url with a schema that has a simple table called <code>note</code> for our example. Of course, you will adjust the schema to fit your project.</p>
<p>At this point our typesafe stack is ready for development. The only thing that is missing is persistent data storage, our PostgresSQL database.</p>
<h3 id="supabase">Supabase</h3>
<p>PostgreSQL is one of the worlds most scalable databases. It is a sophisticated object-relational system applying SQL. Postgres allows you to securely store vast quantities of complex data. It enables developers to build the most sophisticated programs, carry out administrative operations, and establish integral environments. It is an open source technology trusted by millions of developers.</p>
<p>It turns out that every Supabase project is powered by a dedicated PostgreSQL database. Supabase is a fantastic open source Firebase replacement that is powered by the aforementioned Postgres database. It also provides a lot more features as your project expands and becomes more involved. Supabase provides solutions for common needs like as authentication, instant APIs, edge functions, real-time subscriptions, and storage, making it a robust platform on which to develop your application.</p>
<p>Even better, Supabase is open source at heart. You can look through the <a href="https://github.com/supabase/supabase">source code.</a> You may self-host it, utilize their free plan to get started, or commit to one of their premium subscriptions to receive a fully managed production quality environment that scales with your needs.</p>
<p>Supabase just wrapped up their <a href="https://supabase.com/launch-week">Launch Week 7</a> with a ton of incredible features. This includes an AI assistant that was added to their premium platform. It is aware of your database design and can help you when creating more complex SQL queries. I&#39;m even more thrilled by their most recent releases of outstanding open source projects, such as the PostgreSQL package manager <a href="https://database.dev">database.dev.</a> dbdev serves the same purpose for PostgreSQL that npm does for JavaScript. It gives your PostgresSQL database incredibly easy access to packages that give your DB superpowers like full-text search or one-time-only-read data access à la Snapchat.  The best thing is that dbdev can load any PostgreSQL instance that has the required fundamental extensions, independent of the Supabase platform. Again, the code is <a href="https://github.com/supabase/dbdev">open source.</a> I can&#39;t wait to see where this project goes in the future, and I have no doubt that we will soon be able to utilize a lot more fantastic libraries. Like Brandon Roberts puts it:</p>
<p>{% twitter 1645436665677193217 %}</p>
<p>Let&#39;s complete this last step and finish our typesafe, fullstack SPARTAN stack:</p>
<p>We will set up our persistent data storage and then use Prisma to sync our database schema to the Postgres database that our project will run on. There are two ways to get up and running with Supabase:</p>
<ol>
<li>Connecting directly to your managed instance on <a href="https://supabase.com/">supabase.com</a></li>
<li>Locally using <a href="https://www.docker.com/">Docker</a></li>
</ol>
<h4 id="option-1-connecting-to-supabasecom-instance">Option 1: Connecting to supabase.com instance</h4>
<p>This way is super easy! Simply by creating your account, you will also have set up your first project.
This means that you are ready to connect to your projects database already!</p>
<p>Let&#39;s connect our application to our Supabase Postgres instance:</p>
<p>Add a  <code>.env</code> file at the root of your Nx workspace and add the following code snippet</p>
<pre><code># Environment variables declared <span class="token keyword">in</span> <span class="token keyword">this</span> file are automatically made available to Prisma<span class="token punctuation">.</span>
# See the documentation <span class="token keyword">for</span> more detail<span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>pris<span class="token punctuation">.</span>ly<span class="token operator">/</span>d<span class="token operator">/</span>prisma<span class="token operator">-</span>schema#accessing<span class="token operator">-</span>environment<span class="token operator">-</span>variables<span class="token operator">-</span>from<span class="token operator">-</span>the<span class="token operator">-</span>schema

# Prisma supports the native connection <span class="token builtin">string</span> format <span class="token keyword">for</span> PostgreSQL<span class="token punctuation">,</span> MySQL<span class="token punctuation">,</span> SQLite<span class="token punctuation">,</span> <span class="token constant">SQL</span> Server<span class="token punctuation">,</span> MongoDB and CockroachDB<span class="token punctuation">.</span>
# See the documentation <span class="token keyword">for</span> all the connection <span class="token builtin">string</span> options<span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>pris<span class="token punctuation">.</span>ly<span class="token operator">/</span>d<span class="token operator">/</span>connection<span class="token operator">-</span>strings

<span class="token constant">DATABASE_URL</span><span class="token operator">=</span><span class="token string">"postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-REFERENCE-ID].supabase.co:5432/postgres?schema=public"</span>
</code></pre><p>It&#39;s really this easy!! Prisma can now take over the DB management and make sure that our schema is migrated to our Supabase instance.</p>
<h4 id="option-2-connecting-to-local-supabase-instance">Option 2: Connecting to local supabase instance</h4>
<p>Supabase also allows you to run a version of their system locally!</p>
<p>To get up and running you can follow <a href="https://supabase.com/docs/guides/cli/local-development">this guide</a>! They do a great job explaining how to get started and there is plenty of resources to help you if you get stuck.</p>
<p>If you want the quick and dirty way and are on a Mac. Here is what I did to get up and running:</p>
<h5 id="install-supabase-cli">Install supabase CLI</h5>
<pre class="language-shell"><code class="language-shell">brew <span class="token function">install</span> supabase/tap/supabase</code></pre><h5 id="log-into-cli">Log into CLI</h5>
<pre class="language-shell"><code class="language-shell">supabase login</code></pre><p>Create your access token from <a href="https://app.supabase.com/account/tokens">https://app.supabase.com/account/tokens</a> and paste it into your terminal window.</p>
<h5 id="create-supabase-project">Create Supabase project</h5>
<pre class="language-shell"><code class="language-shell"><span class="token comment"># if you are in the spartan directory move UP!!!</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token comment"># create your project folder</span>
<span class="token function">mkdir</span> spartan-supabase

<span class="token comment"># move into the new folder</span>
<span class="token builtin class-name">cd</span> spartan-supabase

<span class="token comment"># start a new git repository — important, don't skip this step</span>
<span class="token function">git</span> init</code></pre><h5 id="start-supabase-services">Start Supabase services</h5>
<pre class="language-shell"><code class="language-shell">supabase init</code></pre><p>and</p>
<pre class="language-shell"><code class="language-shell">supabase start</code></pre><h6 id="important-make-sure-docker-is-running-and-configured-correctly">Important: Make sure Docker is running and configured correctly!</h6>
<p>I had Docker already installed and running. However, my setup is not compatible with the config Supabase expects by
default.
I ran the following command to get it to work for now:</p>
<pre class="language-shell"><code class="language-shell"><span class="token assign-left variable">DOCKER_HOST</span><span class="token operator">=</span>unix:///Users/<span class="token punctuation">[</span>YOUR_USER_ACCOUNT_NAME<span class="token punctuation">]</span>/.docker/run/docker.sock supabase start</code></pre><p>For more info see <a href="https://github.com/supabase/cli/issues/167">this issue on GitHub.</a></p>
<h5 id="connect-to-local-db">Connect to local DB</h5>
<p>The previous step can take a while as all the docker images have to be downloaded first.
However, once everything completes you will see a console output that looks like this:</p>
<pre><code>Started supabase local development setup<span class="token punctuation">.</span>

         <span class="token constant">API</span> <span class="token constant">URL</span><span class="token operator">:</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">54321</span>
          <span class="token constant">DB</span> <span class="token constant">URL</span><span class="token operator">:</span> postgresql<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>postgres<span class="token operator">:</span>postgres<span class="token decorator"><span class="token at operator">@</span><span class="token function">localhost</span></span><span class="token operator">:</span><span class="token number">54322</span><span class="token operator">/</span>postgres
      Studio <span class="token constant">URL</span><span class="token operator">:</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">54323</span>
    Inbucket <span class="token constant">URL</span><span class="token operator">:</span> http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">54324</span>
        anon key<span class="token operator">:</span> eyJh<span class="token operator">...</span><span class="token operator">...</span>
service_role key<span class="token operator">:</span> eyJh<span class="token operator">...</span><span class="token operator">...</span></code></pre><p>Take your cyber-security hat off for a minute (we are working locally after all) and copy the connection string:</p>
<pre><code>postgresql<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>postgres<span class="token operator">:</span>postgres<span class="token decorator"><span class="token at operator">@</span><span class="token function">localhost</span></span><span class="token operator">:</span><span class="token number">54322</span><span class="token operator">/</span>postgres</code></pre><p>Add a <code>.env</code> file at the root of your Nx workspace and add the connection string like so:</p>
<pre><code># Environment variables declared <span class="token keyword">in</span> <span class="token keyword">this</span> file are automatically made available to Prisma<span class="token punctuation">.</span>
# See the documentation <span class="token keyword">for</span> more detail<span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>pris<span class="token punctuation">.</span>ly<span class="token operator">/</span>d<span class="token operator">/</span>prisma<span class="token operator">-</span>schema#accessing<span class="token operator">-</span>environment<span class="token operator">-</span>variables<span class="token operator">-</span>from<span class="token operator">-</span>the<span class="token operator">-</span>schema

# Prisma supports the native connection <span class="token builtin">string</span> format <span class="token keyword">for</span> PostgreSQL<span class="token punctuation">,</span> MySQL<span class="token punctuation">,</span> SQLite<span class="token punctuation">,</span> <span class="token constant">SQL</span> Server<span class="token punctuation">,</span> MongoDB and CockroachDB<span class="token punctuation">.</span>
# See the documentation <span class="token keyword">for</span> all the connection <span class="token builtin">string</span> options<span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>pris<span class="token punctuation">.</span>ly<span class="token operator">/</span>d<span class="token operator">/</span>connection<span class="token operator">-</span>strings

<span class="token constant">DATABASE_URL</span><span class="token operator">=</span><span class="token string">"postgresql://postgres:postgres@localhost:54322/postgres?schema=public"</span></code></pre><p>Perfect! You should be able to connect to your local Supabase Postgres instance now!</p>
<h4 id="initializing-the-db">Initializing the DB</h4>
<p>Now that we have successfully set up our DB we need to set up our database schema.
Primsa makes this super easy!!</p>
<ul>
<li>We can push the schema defined in our <code>schema.prisma</code> file to our DB running</li>
</ul>
<pre class="language-shell"><code class="language-shell"><span class="token function">yarn</span> prisma db push</code></pre><ul>
<li>Finally, we create our prisma client by running</li>
</ul>
<pre class="language-shell"><code class="language-shell"><span class="token function">yarn</span> prisma generate</code></pre><p>That&#39;s it! Now our DB should be all set up and ready to go!</p>
<h2 id="bringing-it-all-together">Bringing it all together</h2>
<p>While the instructions should get you pretty close to running your own SPARTAN application, the easiest way to get started with the full stack is to clone/fork the repository. It has all the little tweaks needed to get things running done already. You can start making changes right away:</p>
<pre class="language-shell"><code class="language-shell"><span class="token function">git</span> clone https://github.com/goetzrobin/spartan.git</code></pre><p>The files that will be most interesting to you are:
<code>index.page.ts</code> inside the analog-trpc application:</p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> Component<span class="token punctuation">,</span> OnInit <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> injectTRPCClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../../trpc-client'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> AsyncPipe<span class="token punctuation">,</span> DatePipe<span class="token punctuation">,</span> JsonPipe<span class="token punctuation">,</span> NgFor<span class="token punctuation">,</span> NgIf <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/common'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> FormsModule<span class="token punctuation">,</span> NgForm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/forms'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> note <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@prisma/client'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> waitFor <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../../wait-for'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> inputTw <span class="token operator">=</span> <span class="token string">'focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-0 block w-full appearance-none rounded-lg px-3 py-2 transition-colors text-base leading-tight md:text-sm bg-black/[.05] dark:bg-zinc-50/10 focus:bg-white dark:focus:bg-dark placeholder:text-zinc-500 dark:placeholder:text-zinc-400 contrast-more:border contrast-more:border-current'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> btnTw <span class="token operator">=</span> <span class="token string">'focus-visible:ring-2 focus-visible:ring-zinc-50 focus-visible:outline-0 flex items-center justify-center rounded-lg px-2 py-1.5 text-sm font-bold tracking-tight shadow-xl shadow-red-500/20 bg-[#DD0031] hover:bg-opacity-70 text-zinc-800 hover:text-primary-darker'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'analog-trpc-home'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>AsyncPipe<span class="token punctuation">,</span> FormsModule<span class="token punctuation">,</span> NgFor<span class="token punctuation">,</span> DatePipe<span class="token punctuation">,</span> NgIf<span class="token punctuation">,</span> JsonPipe<span class="token punctuation">]</span><span class="token punctuation">,</span>
  host<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">'block h-full p-4'</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div class='justify-center flex mt-20 mb-8 items-center'>
      &lt;h1 class='font-medium italic text-6xl text-[#DD0031] font-bold'>SPARTAN&lt;/h1>
      &lt;img class='ml-2 block w-32' alt='Spartan Logo' src='/assets/spartan.svg' />
    &lt;/div>
    &lt;form class='py-2 flex items-center' #f='ngForm' (ngSubmit)='addPost(f)'>
      &lt;input required autocomplete='off' class='</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>inputTw<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">' name='newTitle' [(ngModel)]='newTitle' />
      &lt;button class='ml-2 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>btnTw<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">'>+
      &lt;/button>
    &lt;/form>
    &lt;div class='mt-4'>
      &lt;div class='mb-4 p-4 font-normal border border-zinc-500/40 rounded-md'
           *ngFor='let note of notes ?? []; trackBy: noteTrackBy'>
        &lt;div class='flex items-center justify-between'>
          &lt;p class='text-sm text-zinc-400'>{{note.created_at | date}}&lt;/p>
          &lt;button class='!text-xs h-6 !bg-opacity-10 hover:!bg-opacity-50 !text-zinc-50 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>btnTw<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">'
                  (click)='removePost(note.id)'>x
          &lt;/button>
        &lt;/div>
        &lt;p class='mb-4'>{{ note.note }}&lt;/p>
      &lt;/div>

      &lt;div class='text-center rounded-xl p-20 bg-zinc-950/40' *ngIf='!loadingPosts &amp;&amp; notes.length === 0'>
        &lt;h3 class='text-xl font-medium'>No notes yet!&lt;/h3>
        &lt;p class='text-zinc-400'>Add a new one and see them appear here...&lt;/p>
      &lt;/div>
    &lt;/div>
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">HomeComponent</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> _trpc <span class="token operator">=</span> <span class="token function">injectTRPCClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> loadingPosts <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> notes<span class="token operator">:</span> note<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> newTitle <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">waitFor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_trpc<span class="token punctuation">.</span>note<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>notes <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>notes <span class="token operator">=</span> notes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function-variable function">noteTrackBy</span> <span class="token operator">=</span> <span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> note<span class="token operator">:</span> note<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> note<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">addPost</span><span class="token punctuation">(</span>form<span class="token operator">:</span> NgForm<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>form<span class="token punctuation">.</span>valid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      form<span class="token punctuation">.</span>form<span class="token punctuation">.</span><span class="token function">markAllAsTouched</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_trpc<span class="token punctuation">.</span>note<span class="token punctuation">.</span>create<span class="token punctuation">.</span><span class="token function">mutate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>newTitle <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>newTitle <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    form<span class="token punctuation">.</span>form<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">removePost</span><span class="token punctuation">(</span>id<span class="token operator">:</span> bigint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_trpc<span class="token punctuation">.</span>note<span class="token punctuation">.</span>remove<span class="token punctuation">.</span><span class="token function">mutate</span><span class="token punctuation">(</span><span class="token punctuation">{</span> id <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token function">fetchPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loadingPosts <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_trpc<span class="token punctuation">.</span>note<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>notes <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>loadingPosts <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>notes <span class="token operator">=</span> notes<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>It shows you how to query, update and delete records in our DB using the tRPC client.</p>
<p>The client interacts with a trpc endpoint defined in the <code>[trpc].ts</code> file inside the <code>server/routes/trpc</code> folder of the same <code>analog-trpc</code> application:</p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> appRouter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../../trpc/routers'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../../trpc/context'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createTrpcNitroHandler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@spartan/trpc'</span><span class="token punctuation">;</span>
<span class="token comment">// export API handler</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">createTrpcNitroHandler</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  router<span class="token operator">:</span> appRouter<span class="token punctuation">,</span>
  createContext
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>The appRouter comes from <code>server/trpc/routers/index.ts</code> and consolidates all other routers of your application. In our case that is the <code>notesRouter</code> that is in the notes file of the same folder. I suggest you should make changes to the source code of that file, e.g. remove the list procedure, and see how typescript immediately notifies you of the breaking change in the <code>index.page.ts</code></p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> z <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'zod'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> router<span class="token punctuation">,</span> publicProcedure <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../trpc'</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> PrismaClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@prisma/client'</span>
<span class="token keyword">const</span> prisma <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrismaClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> noteRouter <span class="token operator">=</span> <span class="token function">router</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  create<span class="token operator">:</span> publicProcedure
    <span class="token punctuation">.</span><span class="token function">input</span><span class="token punctuation">(</span>
      z<span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        title<span class="token operator">:</span> z<span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mutation</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span> input <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> prisma<span class="token punctuation">.</span>note<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>data<span class="token operator">:</span> <span class="token punctuation">{</span>
      note<span class="token operator">:</span> input<span class="token punctuation">.</span>title
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  list<span class="token operator">:</span> publicProcedure<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>   prisma<span class="token punctuation">.</span>note<span class="token punctuation">.</span><span class="token function">findMany</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">,</span>
  remove<span class="token operator">:</span> publicProcedure
  <span class="token punctuation">.</span><span class="token function">input</span><span class="token punctuation">(</span>z<span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    id<span class="token operator">:</span> z<span class="token punctuation">.</span><span class="token function">bigint</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mutation</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">{</span>input<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> prisma<span class="token punctuation">.</span>note<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      where<span class="token operator">:</span> <span class="token punctuation">{</span>
        id<span class="token operator">:</span> input<span class="token punctuation">.</span>id
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>This is it! You now have the full power of fullstack typesafety right at your finger tips! This is SPARTAN!</p>
<img alt="Spartan yelling this is SPARTAN" src="https://media.giphy.com/media/2BG086WOP2Xfi/giphy.gif"/>

<h2 id="whats-next">What&#39;s next</h2>
<p>Allowing NestJs as a backend provider is one of the most frequently requested features for Analog. Nest is a powerful framework for building efficient, scalable Node.js server-side applications. It provides an application architecture which allows us to create highly testable, scalable, loosely coupled, and easily maintainable applications. The architecture is heavily inspired by Angular, which in theory makes it a perfect fit for Analog and SPARTAN.</p>
<p>{% embed <a href="https://github.com/analogjs/analog/issues/317">https://github.com/analogjs/analog/issues/317</a> %}</p>
<p>Unfortunately, tRPC and NestJs do not play well together by default, and the tRPC team does not intend to integrate the two through an official plugin <a href="https://github.com/trpc/trpc/discussions/1504">for the time being.</a></p>
<p>However, there is other tools out there that offer a similar type-safe experience built for REST-API&#39;s, which is where NestJs shines. Specifically, I am talking about <a href="https://ts-rest.com/">ts-rest,</a> which has an official NestJs integration. I am excited to explore those other options and see how SPARTAN can be the best possible starter for your enterprise full stack Angular projects.</p>
<p>With signals landing in Angular 16, I also plan to make them an integral part of the SPARTAN stack. @timdeschryver has created an amazing form library called <a href="https://github.com/timdeschryver/ng-signal-forms">ng-signal-forms</a> that is completely driven by signals and already provides an absolutely amazing developer experience dealing with even the more complex scenarios we need to tackle in our real world applications. My goal is to integrate it into the current application to show how signals will transform Angular development in the future.</p>
<p>Finally, there is an amazing repository called <a href="https://github.com/shadcn/taxonomy">Taxonomy,</a> which serves as a great resource to the NextJs community showing off how a real world application can be built with version 13 of the framework. In an ideal world, the SPARTAN repository could become such a beautifully crafted resource for the Angular community. That is the ambitious goal I have for SPARTAN and if this article got you excited about what is possible, I invite you to reach out with your ideas and even consider contributing yourself!</p>
<h2 id="the-future-is-bright">The future is bright</h2>
<p>With Analog, Angular finally has it&#39;s own meta-framework that enables us to built on top of all the amazing features that Angular provides, which gives us access to an amazing Vite ecosystem, and will enable all of us to build better, faster, and more amazing full stack Angular applications.</p>
<p>Together with a powerful tools like TailwindCSS, tRPC, databases like Postgres, and infrastructure providers like Supabase, who are open source at heart, I couldn&#39;t be more excited for more and more people and companies to go all in on Analog (and maybe even the SPARTAN stack) in the future.</p>
`;
export {
  _20230428SpartanTypeSafeAngularFullStackDevelopmentPoweredByAnalog as default
};
