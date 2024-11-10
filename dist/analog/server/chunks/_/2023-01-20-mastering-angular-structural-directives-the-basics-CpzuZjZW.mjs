const _20230120MasteringAngularStructuralDirectivesTheBasics = `---
title: Mastering Angular Structural Directives - The basics
date: 2023-01-20
teaser: Structural directives are one of the Angular\u2019s most powerful tools. Their inner workings are often a mystery. This article will delve deeper into how structural directives really work.
slug: 2023-01-20-mastering-angular-structural-directives-the-basics
---

<p>Structural directives in Angular are one of the framework\u2019s most powerful tools. We encounter them early in our Angular journeys. They are integral to developing even the most basic Angular applications.</p>
<p>Whether it is rendering a list of todos or toggling some icon once a todo is completed, *ngFor and *ngIf become familiar faces in the earliest days as Angular developers. From then on, they stay our trusted partners on which we frequently rely in day-to-day development tasks. However, the inner workings of these directives are often a mystery to both new and experienced developers.</p>
<p>In this series, we will delve deeper into the internal workings of structural directives, providing a comprehensive understanding of what is going on under the asterisk. In this article, we will examine what needs to happen for a structural directive to render to the DOM.</p>
<h2 id="easytospot---a-minimal-introduction-to-structural-directives-micro-syntax">*easyToSpot - A minimal introduction to structural directive\u2019s micro-syntax</h2>
<p>You probably spotted two of the built-in structural directives: NgIf and NgFor. They were easy to identify, as I followed the convention laid out directly in the Angular docs: <em>When structural directives are applied they generally are prefixed by an asterisk, *.</em> More interestingly, the docs also state that Angular uses this convention to wrap the element the directive is applied to, also known as the host element, with an <code>ng-template</code>:</p>
<pre class="language-ts"><code class="language-ts"><span class="token operator">&lt;</span>div <span class="token operator">*</span>ngIf<span class="token operator">=</span><span class="token string">"hero"</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>hero<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></code></pre><p>becomes</p>
<pre class="language-ts"><code class="language-ts"><span class="token operator">&lt;</span>ng<span class="token operator">-</span>template <span class="token punctuation">[</span>ngIf<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"hero"</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>div<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>hero<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>ng<span class="token operator">-</span>template<span class="token operator">></span></code></pre><p>Looking at this longhand version, we can identify two ways of defining structural directives:</p>
<ol>
<li>By <strong>what they do</strong> (as the official documentation does): <em>Structural directives are directives that change the DOM layout by adding and removing DOM elements.</em></li>
<li>By <strong>what they are</strong>: Directives that are applied to <code>ng-template</code>s and come with an optional micro syntax that makes our HTML nicer to read.</li>
</ol>
<h2 id="directive-superpowers---rendering-to-the-dom-with-the-help-of-dependency-injection">Directive superpowers - Rendering to the DOM with the help of dependency injection</h2>
<p>Knowing that we are dealing with a directive we can take full advantage of Angular&#39;s dependency injection (DI). This allows us to access the directive&#39;s host by simply injecting it into our directive. Given that we know the host&#39;s type. The following example demonstrates this:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// in our app</span>
  selector<span class="token operator">:</span> <span class="token string">'app'</span><span class="token punctuation">,</span>
  <span class="token comment">// ourDirective is applied to the host component</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;host ourDirective >&lt;/host></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'host'</span><span class="token punctuation">,</span>
  <span class="token comment">// the host simply renders the currentName</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">{{ currentName }}</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HostComponent</span> <span class="token punctuation">{</span>
  <span class="token comment">// by default the currentName is setByTheHost</span>
  currentName <span class="token operator">=</span> <span class="token string">'setByTheHost'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'[ourDirective]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">OurDirective</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
  <span class="token comment">// ourDirective uses DI to get access to the HostComponent</span>
  <span class="token keyword">public</span> hostComponent <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>HostComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// after 3 seconds OurDirective sets the hostComponent's currentName as changedByDirective</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>hostComponent<span class="token punctuation">.</span>currentName <span class="token operator">=</span> <span class="token string">'changedByDirective'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>If you want to see the code in action you can check out this <a href="https://stackblitz.com/edit/angular-ivy-n5jbb9?file=src/app/app.component.ts">Stackblitz.</a></p>
<h3 id="injecting-the-template">Injecting the template</h3>
<p>From earlier, we know that structural directives are always applied to <code>ng-template</code>s. Therefore, we can inject Angular&#39;s TemplateRef, which provides us with the necessary information to render the template to the DOM. Let&#39;s look at the code below to see the internal workings of the TemplateRef:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;ng-template [ourDirective]>I am in the template&lt;/ng-template></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'[ourDirective]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">OurDirective</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>template <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>_declarationTContainer<span class="token punctuation">.</span>tViews<span class="token punctuation">.</span>template <span class="token operator">+</span> <span class="token string">''</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>This will log the TemplateRef&#39;s instructions, which tell Angular how to generate our DOM element to the console:</p>
<pre><code><span class="token keyword">function</span> <span class="token function">AppComponent_ng_template_0_Template</span><span class="token punctuation">(</span>rf<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>rf <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
i0<span class="token punctuation">.</span><span class="token function">\u0275\u0275text</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"I am in the template"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">}</span></code></pre><p><a href="https://stackblitz.com/edit/angular-ivy-brjapu?file=src/app/app.component.ts">Link to Stackblitz</a></p>
<p>Now that we have the information on how to render our template, we need somewhere to render it. Again, Angular&#39;s dependency injection system gives us access to what we need. The <strong>ViewContainerRef</strong>.</p>
<h3 id="injecting-the-view-container">Injecting the view container</h3>
<p>Every Angular component or directive has access to something called the ViewContainerRef. The official documentation defines it as <em>a container where one or more views can be attached to a component.</em></p>
<p>We can think of it as a reference to a virtual container around an anchor element. The anchor element indicates the place in the DOM where we can dynamically create new elements. The container can instantiate new elements dynamically. It will render those new elements as siblings of the anchor element.</p>
<p>Our anchor element can be a custom element, an element node, or even a comment element. Let&#39;s take a look at the example below:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;our-component>&lt;/our-component>
  &lt;div ourDirective>On div&lt;/div>
  &lt;ng-template ourDirective>On ng-template&lt;/ng-template>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'[ourDirective]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">OurDirective</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vcr<span class="token punctuation">.</span>element<span class="token punctuation">.</span>nativeElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'our-component'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div>Our Component&lt;/div></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">OurComponent</span> <span class="token punctuation">{</span>
  <span class="token keyword">private</span> vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>vcr<span class="token punctuation">.</span>element<span class="token punctuation">.</span>nativeElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>This produces the following results in the Stackblitz and Chrome consoles:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8drjm2q3q8zdccav3bv3.png" alt="screenshot from Stackblitz, showing the custom HTMLElement, HTMLDivElement, Comment logged by our directive">
We see that our ViewContainerRef&#39;s native elements are our custom element, a regular HTML <code>div</code> element, and in the case of the <code>ng-template</code>, a <code>&lt;!--container--&gt;</code> comment that Angular inserts into the HTML for any (potential) view it manages. Each time we get the DOM anchor which the ViewContainerRef can use to create new (sibling) elements.</p>
<p>Again, I encourage you to check out the working code in the <a href="https://stackblitz.com/edit/angular-ivy-krvagm?file=src/app/app.component.ts">Stackblitz.</a></p>
<h3 id="putting-the-two-together">Putting the two together</h3>
<p>Finally, we have everything we need to live up to the official definition of structural directives:</p>
<p><em>Change the DOM layout by adding and removing DOM elements.</em></p>
<p>Let&#39;s create a custom structural directive that renders our template to the DOM not once, but <strong>TWO</strong> times! Super exciting!</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'[twoTimes]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TwoTimesDirective</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
  <span class="token comment">// get the template ref from the ng-template host</span>
  <span class="token keyword">private</span> template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// get the viewcontainerref from the host: &lt;!--comment--></span>
  <span class="token keyword">private</span> vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// on initialization of our directive, render our template to the DOM twice</span>
  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>template<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>template<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>We inject both TemplateRef and ViewContainerRef into our directive. In our <code>ngOnInit</code> lifecycle hook, we create two sibling elements based on the template obtained from the directive&#39;s host.</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;p *twoTimes>Two times from asterisk&lt;/p>
  &lt;ng-template twoTimes>&lt;p>Two times from ng-template&lt;/p>&lt;/ng-template>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre><p>To illustrate that our micro-syntax is correctly transpiled we use both alternatives in our AppComponent. The result is a total of four elements rendered to the DOM. Each component created two siblings to the <code>&lt;!--comment--&gt;</code> from the respective ViewContainerRef:</p>
<pre class="language-html"><code class="language-html">
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-app</span> <span class="token attr-name">ng-version</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>15.0.2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Two times from asterisk<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Two times from asterisk<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--container--></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Two times from ng-template<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Two times from ng-template<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--container--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-app</span><span class="token punctuation">></span></span></code></pre><p><a href="https://stackblitz.com/edit/angular-ivy-ezyipj?file=src/app/app.component.ts">Link to Stackblitz</a></p>
<h2 id="just-getting-started">Just getting started</h2>
<p>In this article, we took the first steps to truly understanding how structural directives work. However, we have just scratched the surface. We barely even peeked under the asterisk. To be able to truly leverage the power of structural components we will need to understand how we can pass data to our template using a <strong>context</strong> object, how we can ensure <strong>strict template type checking</strong> for said context, and how the <strong>structural directive syntax</strong> is parsed.</p>
<p>So let&#39;s pat ourselves on the back, take a quick <a href="https://www.youtube.com/watch?v=AKGrmY8OSHM">NSDR (Non Sleep Deep Rest)</a> break to let the information settle, and get excited about the next part of our journey to structural directive mastery. </p>
`;

export { _20230120MasteringAngularStructuralDirectivesTheBasics as default };
//# sourceMappingURL=2023-01-20-mastering-angular-structural-directives-the-basics-CpzuZjZW.mjs.map
