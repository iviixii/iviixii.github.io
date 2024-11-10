const _20230824GettingStartedWithSpartanuiShadcnLikeUiComponentsForAngular = `---
title: Getting Started with spartan/ui - Shadcn-like UI Components for Angular
date: 2023-08-24
teaser: Shadcn & RadixUI are taking the react ecosystem by storm. Let's bring the same experience to Angular with spartan/ui.
slug: 2023-08-24-getting-started-with-spartanui-shadcn-like-ui-components-for-angular
---

<p>We&#39;re all familiar with this: We are starting a new project and are looking for some beautiful UI components. While we could technically build these from scratch, we want to start building instead of reinventing the wheel. We need a solution to hit the ground running without sacrificing quality or accessibility (a11y).</p>
<p>So we venture into the world of Angular component libraries.
While they all provide incredible variety and most of them come with solid accessibility features, it seems that most Angular UI libraries come with a strong corporate branding that often doesn&#39;t quite align with the project&#39;s needs. More importantly, they mostly lack an easy way to customize or extend components and do not allow us to let them make them our own.</p>
<p>Then we look at the React ecosystem and all the incredible projects built on <a href="https://www.radix-ui.com/">RadixUI</a> and <a href="https://ui.shadcn.com/">shadcn.</a> I don&#39;t know about you, but when I do that I always get a little jealous.</p>
<h2 id="shadcn---a-game-changing-ui-library-for-react">shadcn - A game-changing UI library (for React)</h2>
<p>Why? <a href="https://ui.shadcn.com/">shadcn/ui</a> comes with all the components you could ever need for a project, and all of them come in beautiful styles by default. However, it still allows you to adjust and customize every single UI primitive as you please.</p>
<p>How does it do that?</p>
<ol>
<li>It builds on <strong>RadixUI</strong>, a UI library that is completely <strong>un-styled</strong> by default, and comes with an intuitive and extensible API, as well as great.</li>
<li>It is styled using <strong>TailwindCSS</strong> classes and <strong>CSS variables</strong> that give you the perfect amount of flexibility while pushing you towards using solid design principles.</li>
<li>Instead of making you install the styles through a npm package, it allows you to copy its beautifully crafted primitives directly into your code base, which means you <strong>own the code</strong> and can adjust everything to fit your needs.</li>
</ol>
<p>The problem with shadcn for Angular developer&#39;s is that it is built on top of React...</p>
<p>Now imagine an accessible, open-source Angular UI library that doesn&#39;t come pre-styled, allowing you to have full creative control over its appearance. Angular&#39; shadcn implementation so to say.</p>
<h2 id="spartanui---shadcn-for-angular">spartan/ui - shadcn for Angular</h2>
<p>Enter <a href="https://spartan.ng">spartan/ui</a> \u2013 an innovative collection of Angular UI primitives that are un-styled and accessible by default.</p>
<h3 id="brain--helm---the-building-blocks-of-spartanui">brain &amp; helm - The building blocks of spartan/ui</h3>
<p>To achieve our goal of a shadcn-like development experience, spartan/ui comes in two parts:</p>
<ol>
<li>Through <strong>spartan/ui/brain</strong>, our goal is to make this process more straightforward and efficient. We offer a versatile collection of <strong>un-styled</strong> UI building blocks that can be easily tailored to match your project&#39;s distinct visual and functional preferences.</li>
<li>With <strong>spartan/ui/helm</strong>, we provide pre-designed styles built on <strong>TailwindCSS</strong> and <strong>CSS variables</strong>. Just like with shadcn, you can copy them into your project so you retain full control over their code, appearance, and overall experience.</li>
</ol>
<h3 id="spartan-ngnx---one-command-to-rule-them-all">@spartan-ng/nx - one command to rule them all</h3>
<p>To make this as easy as possible, <strong>spartan/ui</strong> comes equipped with an Nx plugin that allows you to effortlessly integrate our components into your Nx workspace. With a single command, you can add any of its 30 spartan/ui primitives to your projects.</p>
<p>But that&#39;s not all \u2013 the Nx plugin&#39;s capabilities extend beyond just adding components. You can also leverage it to incorporate one of 12 custom themes into your Nx applications, letting you truly own the visual appearance of your projects.</p>
<h2 id="your-first-spartan-app">Your first spartan app</h2>
<p>So let&#39;s see what getting up and running with <strong>spartan/ui</strong> looks like.</p>
<p><strong>If you would rather follow along to a video version of this article, check it out on <a href="https://www.youtube.com/watch?v=lfmR6U-P8t4&ab_channel=RobinGoetz">YouTube.</a></strong></p>
<h3 id="setting-up-an-nx-angular-workspace">Setting up an Nx&#39; Angular workspace</h3>
<p>As mentioned above, <strong>spartan/ui</strong> follows the same paradigm as <strong>shadcn</strong>, that you should own the code that allows you to style, extend, and compose your UI components.</p>
<p>While we are working on a standalone API, Nx provides incredible tooling for exactly this use case. Therefore, the initial version of <strong>spartan/ui</strong>&#39;s CLI is an Nx plugin.</p>
<p>Hence, for this tutorial, we will create a new Angular project inside an Nx workspace.</p>
<h4 id="running-create-nx-workspace">Running create-nx-workspace</h4>
<p>Again, Nx makes this incredibly easy. Simply run the command below.</p>
<pre class="language-sh"><code class="language-sh">npx create-nx-workspace@latest</code></pre><p>When prompted:</p>
<ol>
<li>Choose a meaningful name, I chose</li>
<li>Select Angular as your stack.</li>
<li>Opt for a standalone project.</li>
<li><strong>Important:</strong> Pick CSS for your styles.</li>
<li>Add an (optional) end-to-end test runner of your choice.</li>
<li>Select standalone components.</li>
<li>Only add routing if you want to.</li>
</ol>
<p>Finally, wait for Nx to work its magic, install all necessary dependencies, and set up your Angular workspace.</p>
<h4 id="removing-boilerplate">Removing boilerplate</h4>
<p>I am a big proponent of having your template and styles in the same file as your Component class. Therefore, I deleted the <code>src/app/app.component.html</code> and <code>src/app/app.component.css</code> files created by the workspace generator. I also got rid of the <code>src/app/nx-welcome.component.ts</code> and changed the contents of my <code>src/app/app.component.ts</code> to the following:</p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;button>Hello from {{title}}&lt;/button></span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>
  title <span class="token operator">=</span> <span class="token string">'sparta'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>One more thing before we are ready to start adding <strong>spartan/ui.</strong></p>
<h4 id="adding-tailwindcss">Adding TailwindCSS</h4>
<p>As <strong>spartan/ui</strong> is built on top of TailwindCSS, we need a working setup of it for our project.</p>
<p>Thankfully, Nx again makes this incredibly easy for us. Simply run the following command and select your application when prompted:</p>
<pre class="language-sh"><code class="language-sh">npx nx g @nx/angular:setup-tailwind</code></pre><p>This will create a <code>tailwind.config.ts</code> file and install all the necessary dependencies. Let&#39;s continue.</p>
<h3 id="installing-spartan-ngnx">Installing @spartan-ng/nx</h3>
<p>We are now ready to add <strong>spartan/ui</strong> to our project. To make our lives much easier, we will use the Nx plugin, which we install like so:</p>
<pre class="language-sh"><code class="language-sh"><span class="token function">npm</span> i @spartan-ng/nx</code></pre><h3 id="installing-spartan-ngui-core">Installing @spartan-ng/ui-core</h3>
<p>Then we add the <code>@spartan-ng/ui-core</code> library.</p>
<pre class="language-sh"><code class="language-sh"><span class="token function">npm</span> i @spartan-ng/ui-core</code></pre><p>It contains a bunch of helpers, like the <code>hlm</code> function, which powers our tailwind class merging, and most importantly the <code>@spartan-ng/ui-core/hlm-tailwind-preset</code>, which contains all the necessary extensions to tailwind, which make our <strong>spartan/ui/helm</strong> directives and components work.</p>
<h3 id="setting-up-tailwindconfigjs">Setting up tailwind.config.js</h3>
<p>We now have to add this spartan-specific configuration to your TailwindCSS setup. Simply add <code>@spartan-ng/ui-core/hlm-tailwind-preset</code> to the presets array of your config file:</p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> <span class="token punctuation">{</span> createGlobPatternsForDependencies <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'@nx/angular/tailwind'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> join <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/** @type {import('tailwindcss').Config} */</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  presets<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">'@spartan-ng/ui-core/hlm-tailwind-preset'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  content<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'src/**/!(*.stories|*.spec).{ts,html}'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token operator">...</span><span class="token function">createGlobPatternsForDependencies</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  theme<span class="token operator">:</span> <span class="token punctuation">{</span>
    extend<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre><h3 id="adding-css-variables">Adding CSS variables</h3>
<p>To complete your TailwindCSS setup, we need to add our spartan-specific CSS variables to your style entry point. This is most likely a <code>styles.css</code> in the <code>src</code> folder of your application.</p>
<p>Again, we are using Nx, so our plugin will take care of the heavy lifting:</p>
<pre class="language-sh"><code class="language-sh">npx nx g @spartan-ng/nx:ui-theme</code></pre><p>When prompted:</p>
<ol>
<li>Select the only application in the project</li>
<li>Choose a theme you want to try</li>
<li>Select a border-radius you like</li>
<li>Leave the path empty (the plugin should be smart enough to figure out the correct one for most setups)</li>
<li>Leave the prefix empty as we add a default theme</li>
</ol>
<p>Then, check out your <code>styles.css</code> and see the following <strong>spartan/ui</strong>-specific variables being added:</p>
<pre class="language-css"><code class="language-css"><span class="token selector">:root</span> <span class="token punctuation">{</span>
<span class="token property">--font-sans</span><span class="token punctuation">:</span> <span class="token string">''</span>
<span class="token punctuation">}</span>

<span class="token selector">:root</span> <span class="token punctuation">{</span>
<span class="token property">--background</span><span class="token punctuation">:</span> 0 0% 100%<span class="token punctuation">;</span>
<span class="token property">--foreground</span><span class="token punctuation">:</span> 240 10% 3.9%<span class="token punctuation">;</span>
<span class="token property">--card</span><span class="token punctuation">:</span> 0 0% 100%<span class="token punctuation">;</span>
<span class="token property">--card-foreground</span><span class="token punctuation">:</span> 240 10% 3.9%<span class="token punctuation">;</span>
<span class="token property">--popover</span><span class="token punctuation">:</span> 0 0% 100%<span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token property">--popover-foreground</span><span class="token punctuation">:</span> 240 10% 3.9%<span class="token punctuation">;</span>
<span class="token property">--primary</span><span class="token punctuation">:</span> 240 5.9% 10%<span class="token punctuation">;</span>
<span class="token property">--primary-foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--secondary</span><span class="token punctuation">:</span> 240 4.8% 95.9%<span class="token punctuation">;</span>
<span class="token property">--secondary-foreground</span><span class="token punctuation">:</span> 240 5.9% 10%<span class="token punctuation">;</span>
<span class="token property">--muted</span><span class="token punctuation">:</span> 240 4.8% 95.9%<span class="token punctuation">;</span>
<span class="token property">--muted-foreground</span><span class="token punctuation">:</span> 240 3.8% 46.1%<span class="token punctuation">;</span>
<span class="token property">--accent</span><span class="token punctuation">:</span> 240 4.8% 95.9%<span class="token punctuation">;</span>
<span class="token property">--accent-foreground</span><span class="token punctuation">:</span> 240 5.9% 10%<span class="token punctuation">;</span>
<span class="token property">--destructive</span><span class="token punctuation">:</span> 0 84.2% 60.2%<span class="token punctuation">;</span>
<span class="token property">--destructive-foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--border</span><span class="token punctuation">:</span> 240 5.9% 90%<span class="token punctuation">;</span>
<span class="token property">--input</span><span class="token punctuation">:</span> 240 5.9% 90%<span class="token punctuation">;</span>
<span class="token property">--ring</span><span class="token punctuation">:</span> 240 5.9% 10%<span class="token punctuation">;</span>
<span class="token property">--radius</span><span class="token punctuation">:</span> 0.5rem<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.dark</span> <span class="token punctuation">{</span>
<span class="token property">--background</span><span class="token punctuation">:</span> 240 10% 3.9%<span class="token punctuation">;</span>
<span class="token property">--foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--card</span><span class="token punctuation">:</span> 240 10% 3.9%<span class="token punctuation">;</span>
<span class="token property">--card-foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--popover</span><span class="token punctuation">:</span> 240 10% 3.9%<span class="token punctuation">;</span>
<span class="token property">--popover-foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--primary</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--primary-foreground</span><span class="token punctuation">:</span> 240 5.9% 10%<span class="token punctuation">;</span>
<span class="token property">--secondary</span><span class="token punctuation">:</span> 240 3.7% 15.9%<span class="token punctuation">;</span>
<span class="token property">--secondary-foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--muted</span><span class="token punctuation">:</span> 240 3.7% 15.9%<span class="token punctuation">;</span>
<span class="token property">--muted-foreground</span><span class="token punctuation">:</span> 240 5% 64.9%<span class="token punctuation">;</span>
<span class="token property">--accent</span><span class="token punctuation">:</span> 240 3.7% 15.9%<span class="token punctuation">;</span>
<span class="token property">--accent-foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--destructive</span><span class="token punctuation">:</span> 0 62.8% 30.6%<span class="token punctuation">;</span>
<span class="token property">--destructive-foreground</span><span class="token punctuation">:</span> 0 0% 98%<span class="token punctuation">;</span>
<span class="token property">--border</span><span class="token punctuation">:</span> 240 3.7% 15.9%<span class="token punctuation">;</span>
<span class="token property">--input</span><span class="token punctuation">:</span> 240 3.7% 15.9%<span class="token punctuation">;</span>
<span class="token property">--ring</span><span class="token punctuation">:</span> 240 4.9% 83.9%<span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><h3 id="adding-our-first-primitive">Adding our first primitive</h3>
<p>Awesome! We are now all set up to use <strong>spartan/ui</strong> in our project. Let&#39;s leverage our Nx plugin one more time and add the button primitive to our project:</p>
<pre class="language-sh"><code class="language-sh">npx nx g @spartan-ng/nx:ui button</code></pre><p>When prompted:</p>
<ol>
<li>Select an appropriate directory to put your components, e.g. libs/spartan</li>
<li>Choose the default false, when prompted if you want to skip installing the necessary dependencies</li>
</ol>
<p>Once the plugin finishes, you will see that a new buildable library was added in your <code>libs/spartan/button-helm</code> folder.</p>
<p>It contains the source code of the <code>HlmButtonDirective</code>, which comes with a bunch of different styles that are applied through a <code>HostBinding</code> based on the different inputs of the directive.</p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> Directive<span class="token punctuation">,</span> HostBinding<span class="token punctuation">,</span> Input <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> cva<span class="token punctuation">,</span> VariantProps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'class-variance-authority'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> hlm <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@spartan-ng/ui-core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ClassValue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'clsx'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> buttonVariants <span class="token operator">=</span> <span class="token function">cva</span><span class="token punctuation">(</span>
  <span class="token string">'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    variants<span class="token operator">:</span> <span class="token punctuation">{</span>
      variant<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">'bg-primary text-primary-foreground hover:bg-primary/90'</span><span class="token punctuation">,</span>
        destructive<span class="token operator">:</span> <span class="token string">'bg-destructive text-destructive-foreground hover:bg-destructive/90'</span><span class="token punctuation">,</span>
        outline<span class="token operator">:</span> <span class="token string">'border border-input hover:bg-accent hover:text-accent-foreground'</span><span class="token punctuation">,</span>
        secondary<span class="token operator">:</span> <span class="token string">'bg-secondary text-secondary-foreground hover:bg-secondary/80'</span><span class="token punctuation">,</span>
        ghost<span class="token operator">:</span> <span class="token string">'hover:bg-accent hover:text-accent-foreground'</span><span class="token punctuation">,</span>
        link<span class="token operator">:</span> <span class="token string">'underline-offset-4 hover:underline text-primary'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      size<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">'h-10 py-2 px-4'</span><span class="token punctuation">,</span>
        sm<span class="token operator">:</span> <span class="token string">'h-9 px-3 rounded-md'</span><span class="token punctuation">,</span>
        lg<span class="token operator">:</span> <span class="token string">'h-11 px-8 rounded-md'</span><span class="token punctuation">,</span>
        icon<span class="token operator">:</span> <span class="token string">'h-10 w-10'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    defaultVariants<span class="token operator">:</span> <span class="token punctuation">{</span>
      variant<span class="token operator">:</span> <span class="token string">'default'</span><span class="token punctuation">,</span>
      size<span class="token operator">:</span> <span class="token string">'default'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">ButtonVariants</span> <span class="token operator">=</span> VariantProps<span class="token operator">&lt;</span><span class="token keyword">typeof</span> buttonVariants<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'[hlmBtn]'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HlmButtonDirective</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> _variant<span class="token operator">:</span> ButtonVariants<span class="token punctuation">[</span><span class="token string">'variant'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'default'</span><span class="token punctuation">;</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">get</span> <span class="token function">variant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ButtonVariants<span class="token punctuation">[</span><span class="token string">'variant'</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_variant<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">variant</span><span class="token punctuation">(</span>value<span class="token operator">:</span> ButtonVariants<span class="token punctuation">[</span><span class="token string">'variant'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_variant <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_class <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">generateClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> _size<span class="token operator">:</span> ButtonVariants<span class="token punctuation">[</span><span class="token string">'size'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'default'</span><span class="token punctuation">;</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ButtonVariants<span class="token punctuation">[</span><span class="token string">'size'</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">set</span> <span class="token function">size</span><span class="token punctuation">(</span>value<span class="token operator">:</span> ButtonVariants<span class="token punctuation">[</span><span class="token string">'size'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_class <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">generateClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> _inputs<span class="token operator">:</span> ClassValue <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">set</span> <span class="token keyword">class</span><span class="token punctuation">(</span>inputs<span class="token operator">:</span> ClassValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_inputs <span class="token operator">=</span> inputs<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_class <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">generateClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token decorator"><span class="token at operator">@</span><span class="token function">HostBinding</span></span><span class="token punctuation">(</span><span class="token string">'class'</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> _class <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">generateClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token function">generateClasses</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">hlm</span><span class="token punctuation">(</span><span class="token function">buttonVariants</span><span class="token punctuation">(</span><span class="token punctuation">{</span> variant<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_variant<span class="token punctuation">,</span> size<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_size <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_inputs<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p><em><strong>Note</strong>: Currently the plugin adds dependencies correctly, but their peer dependencies are not installed by Nx
Simply run <code>npm i</code> after the <code>@spartan-ng/nx:ui</code> call to make sure everything is installed correctly.</em></p>
<h3 id="using-our-first-primitive">Using our first primitive</h3>
<p>To use our new directive we simply add the directive to our <code>button</code> in our <code>src/app/app.component/ts</code>:</p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> HlmButtonDirective <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@spartan-ng/button-helm'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>HlmButtonDirective<span class="token punctuation">]</span><span class="token punctuation">,</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;button hlmBtn variant="outline">Hello from {{title}}&lt;/button></span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>
  title <span class="token operator">=</span> <span class="token string">'sparta'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>Then we start our development server with:</p>
<pre class="language-sh"><code class="language-sh"><span class="token function">npm</span> start</code></pre><p>and see our beautifully styled <strong>spartan/ui</strong> button:</p>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ylbypwya9nq2rqb1p24o.png" alt="Spartan Button in dark gray with rounded corners and white text saying Hello from sparta"></p>
<p>To change the appearance to another variant we simply add a <code>variant</code> input to our <code>&lt;button hlmBtn&gt;</code>:</p>
<pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> HlmButtonDirective <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@spartan-ng/button-helm'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>HlmButtonDirective<span class="token punctuation">]</span><span class="token punctuation">,</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;button hlmBtn variant="outline">Hello from {{title}}&lt;/button></span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>
  title <span class="token operator">=</span> <span class="token string">'sparta'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>Our styles will be updated accordingly and we see our outlined button:</p>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yna58he36f0fvziamb36.png" alt="Spartan Button in light gray with rounded corners and dark text and dark border saying Hello from sparta"></p>
<h2 id="other-available-components">Other available components</h2>
<p>With the release of the initial alpha version, there are 30 components available:</p>
<ul>
<li>Accordion</li>
<li>Alert</li>
<li>Alert Dialog</li>
<li>Aspect Ratio</li>
<li>Avatar</li>
<li>Badge</li>
<li>Button</li>
<li>Card</li>
<li>Collapsible</li>
<li>Combobox</li>
<li>Command</li>
<li>Context Menu</li>
<li>Dialog</li>
<li>Dropdown Menu</li>
<li>Input</li>
<li>Icon</li>
<li>Label</li>
<li>Menubar</li>
<li>Popover</li>
<li>Progress</li>
<li>Radio Group</li>
<li>Scroll Area</li>
<li>Separator</li>
<li>Sheet</li>
<li>Skeleton</li>
<li>Switch</li>
<li>Tabs</li>
<li>Textarea (covered by hlmInput directive)</li>
<li>Toggle</li>
<li>Typography</li>
</ul>
<p>You can add new components the same way as we did for the <code>button.</code> I also plan to create more blog posts and videos, which show how to use <strong>spartan/ui</strong> to build your user interface.</p>
<h2 id="whats-next-1">What&#39;s next?</h2>
<p><strong>spartan/ui</strong> is still in alpha, so there is a long way (a marathon some history nerds might suggest) ahead of us. However, I am super excited that this project is finally getting off the ground and you get to try it out and provide the 300 with incredibly valuable feedback. I hope spartan/ui becomes the shadcn of the Angular ecosystem and together with incredible projects like <a href="https://analogjs.org/">AnalogJs</a> can bring a similar innovation explosion to all of us.</p>
`;

export { _20230824GettingStartedWithSpartanuiShadcnLikeUiComponentsForAngular as default };
//# sourceMappingURL=2023-08-24-getting-started-with-spartanui-shadcn-like-ui-components-for-angular-CxNx1ND5.mjs.map
