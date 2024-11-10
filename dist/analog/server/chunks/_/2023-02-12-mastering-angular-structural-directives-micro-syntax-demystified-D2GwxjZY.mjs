const _20230212MasteringAngularStructuralDirectivesMicroSyntaxDemystified = `---
title: Mastering Angular Structural Directives - Micro-syntax demystified
date: 2023-02-12
teaser: After looking under the hood of structural directives, this article reintroduces the asterisk and tries to help you understand how Angular interprets this shorthand syntax.
slug: 2023-02-12-mastering-angular-structural-directives-micro-syntax-demystified
---

<p>In the <a href="/blog/2023-02-06-mastering-angular-structural-directives-its-all-about-the-context">previous article</a> of this series, we took a closer look at the <code>context</code> object and how we can use it to expose all kinds of data and even functions to our template. Combined with <code>@Input()</code>s and dependency injection, we got a first glimpse of how powerful structural directives are once they can interact with the rest of our application or even the outside world (using Angular&#39;s <code>HttpClient</code>.)</p>
<p>While I quickly &quot;introduced&quot; the structural directive micro-syntax in the <a href="/blog/2023-01-20-mastering-angular-structural-directives-the-basics">first article</a>, we have applied all our custom directives directly to <code>ng-template</code>s. Now it is time to reintroduce the asterisk and take the time to understand how Angular interprets this shorthand syntax.</p>
<h2 id="one-structural-directive-per-element">One structural directive per element</h2>
<p>Before we begin exploring the ins and outs of Angular&#39;s micro-syntax, I should note that we can only ever apply one structural directive per host element. As the official documentation states: <em>The reason is simplicity. Structural directives can do complex things with the host element and its descendants. When two directives lay claim to the same host element, which one should take precedence?</em> 
Therefore, if we add multiple structural directives to the same element the Angular compiler will throw an error.</p>
<h2 id="understanding-the-syntax-reference">Understanding the syntax reference</h2>
<p>I spent a lot of time trying to figure out the best way to introduce Angular&#39;s micro syntax. 
Should I do it the same way I picked up structural directives. I got gradually introduced to more and more bits, pieces, and gotcha&#39;s as I used structural directives. However, I always lacked a deeper, more complete understanding of the underlying mechanisms that make them work. 
Or should I start with the official syntax reference, which is intimidating to say the least. I always found that part of the Angular documentation to be one of the most confusing. However, once I truly wrapped my head around it, it was like an epiphany and absolutely changed the way I look at and understand structural directives.</p>
<p>Therefore, I decided to start with that: The official syntax reference. I will do my best to break things down and explain every piece of it. Together, we will tackle it and take our Angular skills to the next level. </p>
<p>We got this!</p>
<h3 id="without-further-ado-the-structural-directive-syntax-reference">Without further ado: the structural directive syntax reference</h3>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tl6jvqyrpmwzp51xqnzf.png" alt="*:prefix=&quot;( :expression | :let  ) (&#39;;&#39; | &#39;,&#39;)? ( :let | :as | :keyExp )*&quot;">
When I first saw this expression in the documentation, I had no idea any of this meant. I was overwhelmed to be completely honest. But equipped with the knowledge from our previous articles, some clever coloring, and breaking this monstrosity down into smaller pieces, we will demystify this syntax and understand what is going on.</p>
<p>Adding colors makes the distinct parts more obvious.
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s33e3jsb09s9oq9p24i4.png" alt="Angular Structural Directive Syntax Reference with Colors">
Much better! I also want to flip the first :let and :expression. The reason will become clear a little later.</p>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7eabg3rwv3bszir5vhss.png" alt="Angular Structural Directive Syntax Reference with Colors and Reordered">
Awesome! This already looks a lot less intimidating. </p>
<h2 id="components-of-the-structural-directive-syntax-reference">Components of the structural directive syntax reference</h2>
<p>Let&#39;s dive in and start breaking the syntax down into its sub-components.
The equal sign divides the expression into two sides:</p>
<h3 id="1-prefix">1. *:prefix</h3>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k19tbkerdq57si6nz7m8.png" alt="*prefix">
The asterisk <strong>*</strong> and the <strong>:prefix</strong> make up the left side. 
The asterisk instructs Angular to encapsulate this directive in a <code>ng-template</code>. 
<strong>:prefix</strong> is always the directive&#39;s selector. If the directive has an input with the same name as our :prefix AND the right side starts with an <strong>:expression</strong>, it can also serve as the first input of our directive.
I will explain this in detail in the section below.</p>
<h3 id="2-expression--let----let--as--keyexp">2. (:expression | :let) (&#39;;&#39; | &#39;,&#39;)? (:let | :as | :keyExp)*</h3>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9a5rzduzsifgwt13voir.png" alt="(:expression | :let) (&#39;;&#39; | &#39;,&#39;)? (:let | :as | :keyExp)*">
The right side is made up of several subgroups. A logical group is denoted by a pair of blue parentheses. The blue vertical line <strong>|</strong> indicates a logical <strong>OR</strong> within a group. If the group is followed by a blue question mark <strong>?</strong>, it is optional. If it is followed by a blue asterisk *****, the group can be repeated multiple times. (This includes 0 times.)</p>
<p>Again, we can divide the right side into 3 smaller parts:</p>
<h4 id="1-expression--let">1. (:expression | :let)</h4>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fstwgnocrhlobn0k5llt.png" alt="(:expression | :let)">
This first part is either an <strong>:expression</strong> or a <strong>:let</strong> declaration. </p>
<h5 id="11-expression">1.1 :expression</h5>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gc31arn7t85j5cemcdjs.png" alt=":prefix=&quot;:expression&quot;">
If we have an input parameter with the same name as the selector in our directive, this part must always be a <strong>:expression</strong> or Angular will throw an error.
Any valid Angular expression is regarded an\xA0<strong>:expression</strong>. This includes boolean (true/false) values, function calls, and component variables.</p>
<p>The following example demonstrates how the micro-syntax binds the <strong>:expression</strong> to the <strong>:prefix</strong> input of the component:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// our directives selector, which becomes the :prefix</span>
  selector<span class="token operator">:</span> <span class="token string">'[myNgIf]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyNgIfDirective</span> <span class="token punctuation">{</span>
  <span class="token comment">// dependencies needed to render</span>
  <span class="token keyword">private</span> _vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">private</span> _isRendered <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// an input with the same name as the selector</span>
  <span class="token comment">// binding the :expression to the :prefix (myNgIf)</span>
  <span class="token keyword">set</span> <span class="token function">myNgIf</span><span class="token punctuation">(</span>expression<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_isRendered <span class="token operator">=</span> expression<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_isRendered<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_template<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_vcr<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>CommonModule<span class="token punctuation">,</span> MyNgIfDirective<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;button (click)="isRendering = !isRendering">Toggle&lt;/button>
  &lt;p>We can now bind an Angular expression like our component variable isRendering ({{isRendering}}) to our myNgIf input.
  If isRendering is true we will see our component rendered below:

  &lt;div *myNgIf="isRendering">Rendered.&lt;/div>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> isRendering <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p><a href="https://stackblitz.com/edit/angular-8aqkv3?file=src/main.ts">Link to Stackblitz.</a></p>
<p>If no <code>@Input()</code> property matches the selector of the directive, this first part must be a <strong>:let</strong> declaration.</p>
<h5 id="12-let-declaration">1.2 :let declaration</h5>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zj6g2f5ah7cmb44wfcpp.png" alt=":let">
In the previous article, we saw let declarations applied directly to the <code>ng-template</code>. We learned how they extract the variables from our <code>context</code> and make them available for use in our template.</p>
<p>The micro-syntax :let declarations accomplish the same thing.
Their structures are very similar and look like this:</p>
<p>let <em>local</em>=\u201C<strong>export</strong> &#39;;&#39;?\u201D</p>
<ul>
<li><em>local</em> is the local variable name used in the template.</li>
<li><strong>export</strong> refers to the value exported by the directive under a specific name, which is one of the keys in our <code>context</code> object! Except when the key is <code>$implicit</code>. This key is unique and is assigned to &#39;let local&#39; by default. If we don&#39;t include =&quot;<strong>export</strong>&quot; in our let declaration, the value of <code>$implicit</code> is automatically assigned to our local variable.</li>
<li>&#39;;&#39;? is an optional semi-colon that indicates the end of the let declaration.</li>
</ul>
<p>An example of the micro-syntax :let declaration:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  selector<span class="token operator">:</span> <span class="token string">'[myLet]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyLetDirective</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
  <span class="token comment">// dependencies needed to render</span>
  <span class="token keyword">private</span> _vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_template<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      $implicit<span class="token operator">:</span> <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">'World from implicit'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      second<span class="token operator">:</span> <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">'World from second'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>CommonModule<span class="token punctuation">,</span> MyLetDirective<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div *myLet="let ctx;">
  &lt;p>{{ctx | json}}&lt;/p>
  &lt;/div>

  &lt;div *myLet="let secondCtx = second">
  &lt;p>{{secondCtx | json}}&lt;/p>
  &lt;/div>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre><p><a href="https://stackblitz.com/edit/angular-bkq621?file=src/main.ts">Link to Stackblitz.</a></p>
<p>As you can see we can extract both the <code>$implicit</code> into the <code>ctx</code> template variable and the <code>second</code> key into the <code>secondCtx</code> variable using our :let declaration. Take note that we added a semi-colon at the end of the first declaration. This is not required. The second declaration without it also works.</p>
<h4 id="2---">2. (; | ,)?</h4>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/96i80xfxezyad3srmqm8.png" alt="(; | ,)?">
We can add an optional semi-colon or comma after our initial :expression or :let declaration to separate it from the following component. This can be used to make your code more readable. It is not necessary.</p>
<p>Let us update our simple directive from the:let declaration example to demonstrate that we can, but are not required to, use semi-colons and commas to separate our :let declarations.</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  selector<span class="token operator">:</span> <span class="token string">'[myLet]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyLetDirective</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span> <span class="token punctuation">{</span>
  <span class="token comment">// dependencies needed to render</span>
  <span class="token keyword">private</span> _vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_template<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      $implicit<span class="token operator">:</span> <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">'World from implicit'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      second<span class="token operator">:</span> <span class="token punctuation">{</span> hello<span class="token operator">:</span> <span class="token string">'World from second'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>CommonModule<span class="token punctuation">,</span> MyLetDirective<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div *myLet="let context; let secondCtx = second">
  semi-colon
  &lt;p>{{context | json}}&lt;/p>
  &lt;p>{{secondCtx | json}}&lt;/p>
  &lt;/div>

  &lt;div *myLet="let context, let secondCtx = second">
  colon
  &lt;p>{{secondCtx | json}}&lt;/p>
  &lt;p>{{secondCtx | json}}&lt;/p>
  &lt;/div>

  &lt;div *myLet="let context let secondCtx = second">
  nothing
  &lt;p>{{context | json}}&lt;/p>
  &lt;p>{{secondCtx | json}}&lt;/p>
  &lt;/div>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre><p><a href="https://stackblitz.com/edit/angular-aysump?file=src/main.ts">Link to Stackblitz.</a></p>
<p>To make our code clearer, we can add a semicolon or even a comma between our :let statements. If we exclude these, our code still functions as intended.</p>
<h4 id="3-let-as--keyexp">3. (:let |:as | :keyExp)*</h4>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r5hd9mdvpfb8g8rqwtma.png" alt="(:let |:as | :keyExp)*"></p>
<h5 id="31-let-declaration">3.1 :let declaration</h5>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k7trtdox3uuw3ogf1x02.png" alt=":let declaration">
This third section may be repeated as many times as needed\xA0following the initial :expression, :let declaration, or the optional semicolon or comma. It can either be a :let, :as, or :keyExp declaration. The :let declaration is the same as the one we used above. We move on to the :as declaration.</p>
<h5 id="32-as-declaration">3.2 :as declaration</h5>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e0j7u52iq2o82urh06u7.png" alt=":as declaration">
Similar to the :let declaration, the :as declaration extracts <code>context</code> variables and binds them to the template.
It&#39;s syntax is very similar to our :let declaration.
It looks like this:</p>
<p><strong>export</strong> as <em>local</em> &#39;;&#39;?</p>
<ul>
<li><strong>export</strong> is the value exported by the directive under a given name, aka one of the keys in our <code>context</code> object!</li>
<li><em>local</em> is the local variable name used in the template.</li>
<li>&#39;;&#39;? is an optional semi-colon that indicates the end of the let declaration.</li>
</ul>
<p>One could say, that :as is pretty much :let in reverse order. Angular actually translates both expression to the same &quot;simple&quot; let declaration: let-<em>local</em>=&quot;<strong>export</strong>&quot; on the <code>ng-template</code>.
We can see this in action rewriting our AppComponent to use an :as declaration instead of the second :let declaration:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>CommonModule<span class="token punctuation">,</span> MyLetDirective<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div *myLet="let context; second as secondCtx">
  nothing
  &lt;p>{{context | json}}&lt;/p>
  &lt;p>{{secondCtx | json}}&lt;/p>
  &lt;/div>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre><p><a href="https://stackblitz.com/edit/angular-jtz5sq?file=src/main.ts">Link to Stackblitz.</a></p>
<p>With the: as an d:let declarations, we now have two tools to extract <code>context</code> data for usage in our template. If a property of our directive has the same name as our selector, we also know how to assign a <code>@Input()</code> value to it. We frequently need to give our directive multiple\xA0inputs. See how :keyExp declarations do this.</p>
<h5 id="33-keyexp-declaration">3.3 :keyExp declaration</h5>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uuiu08fol8gxxji3opu7.png" alt=":keyExp declaration"></p>
<p>It&#39;s syntax is very similar to our :let declaration.
It looks like this:</p>
<p><strong>key &quot;:&quot;?</strong> <u>:expression</u> (as <em>local</em>)? &#39;;&#39;?</p>
<ul>
<li><strong>key &quot;:&quot;?</strong> indicates an assignment to a special <code>@Input()</code> variable of our directive. 
Why special? The literal <strong>key</strong> value and the directive&#39;s selector, or the :prefix, are combined to form the variable&#39;s name. The <strong>key</strong> is appended to the end of the :prefix in camelCase.\xA0:prefix and <strong>key</strong> become :prefixKey, ngIf and else become ngIfElse.\xA0You can see this in the Angular <a href="https://github.com/angular/angular/blob/a7597dd08026a4071758323d54ccbfb382e0c780/packages/common/src/directives/ng_if.ts#L190">source code.</a> Also, you can see that the colon to indicate an assignment (similar to assigning a value to a key in a JavaScript object) is optional. <code>*ngIf=&quot;loaded; else loadingTemplate&quot;</code> and <code>*ngIf=&quot;loaded; else: loadingTemplate&quot;</code> are the same thing.</li>
<li><u>:expression</u> is the Angular expression bound to your :prefixKey <code>@Input()</code></li>
<li>(as <em>local</em>)? is an optional way to directly use the <u>:expression</u>, which was passed in as an <code>@Input()</code>, in the template with the <em>local</em> variable name.
<strong>Very important:</strong> For this to work, the directive&#39;s <code>context</code> object must have a camelCase-fused-key. A directive like this: <code>&lt;div *calculateAvg=&quot;let avg; data: (data$ | async) as testData&quot;&gt;...&lt;/div&gt;</code> Would need to have a <code>calculateAvgTestData</code> key in its <code>context</code> object for <code>testData</code> to expose the correct value.</li>
<li>&#39;;&#39;? is an optional semi-colon that indicates the end of the let declaration.</li>
</ul>
<p>Let&#39;s look at the full source code of the <code>*calculateAvg</code> example from above:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// directive to calculate the average</span>
  selector<span class="token operator">:</span> <span class="token string">'[calculateAvg]'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CalculateAvgDirective</span> <span class="token punctuation">{</span>
  <span class="token comment">// dependencies needed to render the template</span>
  <span class="token keyword">private</span> _vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// our average that we calculate whenever</span>
  <span class="token comment">// new data is provided</span>
  <span class="token keyword">private</span> _avg <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token comment">// private reference to our data so we can calculate the</span>
  <span class="token comment">//  average in the set function</span>
  <span class="token keyword">private</span> _data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// we want to be able to use the key data in our key expression</span>
  <span class="token comment">// we know that we need to camelCase-fuse our key with the directive name</span>
  <span class="token comment">// calculateAvg (:prefix) + data (key) => calculateAvgData (:prefixKey)</span>
  <span class="token keyword">set</span> <span class="token function">calculateAvgData</span><span class="token punctuation">(</span>values<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// store data passed in</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_data <span class="token operator">=</span> values<span class="token punctuation">;</span>
    <span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// calculate the average</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_avg <span class="token operator">=</span> sum <span class="token operator">/</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> values<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// render template</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_template<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token comment">// make avg available through $implicit</span>
      $implicit<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_avg<span class="token punctuation">,</span>
      <span class="token comment">// make data available for as expression</span>
      calculateAvgData<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_data<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>CommonModule<span class="token punctuation">,</span> CalculateAvgDirective<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;div *calculateAvg="let avg; data: (data$ | async) as testData">
  micro-syntax: {{avg}} is the average of {{testData}}
  &lt;/div>

  &lt;ng-template 
    calculateAvg
    [calculateAvgData]="(data$ | async)"
    let-testData="calculateAvgData"
    let-avg
    >
    ng-template: {{avg}} is the average of {{testData}}
    &lt;/ng-template>

  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token punctuation">{</span>
  data$ <span class="token operator">=</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p><a href="https://stackblitz.com/edit/angular-4vwtaw?file=src/main.ts">I highly recommend to examine working code is here.</a></p>
<p>Don&#39;t worry if a lot of information sounds confusing or still a bit\xA0unclear. :keyExp declarations are definitely the hardest part to understand about structural directives and their micro-syntax. </p>
<h2 id="whats-next">What&#39;s next</h2>
<p>Today, we&#39;ve covered every aspect of micro-syntax. We dissected and thoroughly examined the official syntax reference. I hope this has helped you understand what Angular does when structural directives are used in your applications. However, I believe that in order to cement today&#39;s knowledge, we should look at how the syntax is used in Angular&#39;s built-in directives. In <a href="/blog/2023-02-12-mastering-angular-structural-directives-micro-syntax-in-the-wild">the following article,</a> we will apply what we&#39;ve learned today and dissect the NgIf and NgFor directives.</p>
`;

export { _20230212MasteringAngularStructuralDirectivesMicroSyntaxDemystified as default };
//# sourceMappingURL=2023-02-12-mastering-angular-structural-directives-micro-syntax-demystified-D2GwxjZY.mjs.map
