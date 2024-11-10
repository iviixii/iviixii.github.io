const _20230213MasteringAngularStructuralDirectivesMicroSyntaxInTheWild = `---
title: Mastering Angular Structural Directives - Micro-syntax in the wild
date: 2023-02-13
teaser: To reinforce our knowledge about structural directives from previous posts, this article will look closely at Angular's built-in NgIf and NgFor directives.
slug: 2023-02-13-mastering-angular-structural-directives-micro-syntax-in-the-wild
---

<p>We covered every aspect of micro-syntax in the <a href="/blog/2023-02-12-mastering-angular-structural-directives-micro-syntax-demystified">previous article</a>. We gained a much better understanding of what Angular does when we use structural directives by examining the various parts of the official syntax reference. To reinforce this knowledge, this article will look closely at Angular&#39;s built-in NgIf and NgFor directives.</p>
<h2 id="ngif---micro-syntax-to-ng-template">*ngIf - Micro-syntax to ng-template</h2>
<p>Let&#39;s start with a very common use case that most of you have probably seen in some form or another.</p>
<ul>
<li>In our template, we want to show some asynchronous data that we are fetching from an API.</li>
<li>We want to show a loading indicator while we wait for the data.</li>
</ul>
<p>Following best practices, we do not manually subscribe in our component, but instead move that logic into the template. Allowing Angular&#39;s AsyncPipe to handle the heavy lifting.</p>
<p>We will write something like this:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h7fprn9uph36uvbq8nch.png" alt="*ngIf">
Let&#39;s go through the same process of identifying the various parts of this statement and looking at how Angular will translate them.</p>
<p>We apply the same color code:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mbetjttqo1szgum8o8zm.png" alt="*ngIf color coded">
We have the asterisk <strong>*</strong> and the <code>ngIf</code> selector on the left side.
Then there&#39;s the right side. It is composed of three parts:</p>
<ol>
<li>an <u>:expression</u></li>
<li>an <strong>:as</strong> declaration</li>
<li>a <strong>:keyExp</strong> declaration</li>
</ol>
<p>Let&#39;s take a closer look at each one:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5dp0rkohitxlac36gwp1.png" alt="items">
Because the right side begins with an expression, we know that this expression will be assigned to a &#39;@Input()&#39; with the same name as the selector (ngIf).
When Angular translates our micro-syntax, it becomes:</p>
<pre><code><span class="token operator">&lt;</span>ng<span class="token operator">-</span>template <span class="token punctuation">[</span>ngIf<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"(items$ | async)"</span><span class="token operator">></span><span class="token operator">...</span></code></pre><p>Let&#39;s continue.
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1z6fq14hutjx8bhoyez8.png" alt="as items">
Next, we see that we export our expression into a <em>local</em> variable for use in our template. While this is not explicitly stated in the documentation, it is entirely possible. The mechanism enabling this is similar to the a :keyExp declaration mechanism.
To make &#39;items&#39; hold the correct value, we must add the <code>ngIf</code> key to our <code>context</code> with the value of our <code>@Input() ngIf</code>. The reason for this becomes clear when we translate our micro-syntax into the <code>ng-template</code> version:</p>
<pre><code><span class="token operator">&lt;</span>ng<span class="token operator">-</span>template
<span class="token punctuation">[</span>ngIf<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"(items$ | async)"</span>
<span class="token keyword">let</span><span class="token operator">-</span>items<span class="token operator">=</span><span class="token string">"ngIf"</span>
<span class="token operator">></span><span class="token operator">...</span></code></pre><p>For an:as declaration, Angular uses the name of the <code>@Input()</code> variable as the :export or <code>context</code>&#39; key assigned to the <em>local</em> variable that can be used in the template. Because the <code>@Input()</code> in our case is <code>ngIf</code>, <code>ngIf</code> must be a key in the <code>context</code>, and before rendering our template, we must assign our <code>@Input ngIf</code> to our <code>context</code>&#39; <code>ngIf</code> key.</p>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4y6d0nwm3fh4u66gnquv.png" alt="else">
Finally, we have a regular :keyExp declaration that assigns the <code>loading</code> TemplateRef to a <code>@Input()</code> of the NgIf directive. We use our camelCase-fusing logic to determine that our input must be named <code>ngIfElse</code>.
When we translate this part of our micro-syntax into the <code>ng-template</code> version, we get:</p>
<pre><code><span class="token operator">&lt;</span>ng<span class="token operator">-</span>template
<span class="token operator">...</span>
<span class="token punctuation">[</span>ngIfElse<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"loading"</span>
<span class="token operator">></span><span class="token operator">...</span></code></pre><p>Putting it all together we end up with the following:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xb18m3ablfgl0fgg0lb1.png" alt="micro-syntax to ng-template"></p>
<p>This allows us to infer a lot of information about how the NgIf directive. Let&#39;s make some predictions about the source code and see if they hold up.</p>
<p>We know that the NgIf directive has:</p>
<ol>
<li>an <code>@Input()</code> called ngIf</li>
<li>a context object with an <code>ngIf</code> key</li>
<li>another <code>@Input()</code> called ngIfElse</li>
</ol>
<p>Let&#39;s check out the official <a href="https://github.com/angular/angular/blob/main/packages/common/src/directives/ng_if.ts">NgIf source code</a> and see if we are correct:</p>
<pre class="language-ts"><code class="language-ts">  <span class="token comment">/**
   * The Boolean expression to evaluate as the condition for showing a template.
   */</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">set</span> <span class="token function">ngIf</span><span class="token punctuation">(</span>condition<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_context<span class="token punctuation">.</span>$implicit <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_context<span class="token punctuation">.</span>ngIf <span class="token operator">=</span> condition<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_updateView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token function">_updateView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_context<span class="token punctuation">.</span>$implicit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token operator">...</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_thenViewRef <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_viewContainer<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_thenTemplateRef <span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token operator">...</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_elseViewRef <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_viewContainer<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_elseTemplateRef<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span></code></pre><p>We see the <code>@Input() ngIf</code>. Whenever the condition passed is set, the NgIf <code>context</code>&#39;s <code>implicit</code> and <code>ngIf</code> keys are assigned our condition. Then the view is updated. When the condition passed in is truthy, the our template is rendered, else we render the <code>_elseTemplateRef</code>.</p>
<pre class="language-ts"><code class="language-ts">  <span class="token comment">/**
   * A template to show if the condition expression evaluates to false.
   */</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">set</span> <span class="token function">ngIfElse</span><span class="token punctuation">(</span>templateRef<span class="token operator">:</span> TemplateRef<span class="token operator">&lt;</span>NgIfContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span><span class="token operator">|</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">assertTemplate</span><span class="token punctuation">(</span><span class="token string">'ngIfElse'</span><span class="token punctuation">,</span> templateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_elseTemplateRef <span class="token operator">=</span> templateRef<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_elseViewRef <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>  <span class="token comment">// clear previous view if any.</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_updateView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span></code></pre><p>This template comes from our <code>@Input ngIfElse</code>, which makes sure it is a valid template and assigns it to our <code>_elseTemplateRef</code>.</p>
<pre class="language-ts"><code class="language-ts"><span class="token comment">/**
 * @publicApi
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">NgIfContext<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">unknown</span><span class="token operator">></span></span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> $implicit<span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> ngIf<span class="token operator">:</span> <span class="token constant">T</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>Finally, we can confirm that our context indeed has an <code>ngIf</code> key, next to the <code>$implicit</code>. Both are assigned to our truthy expression passed in through the <code>@Input() ngIf</code>. That&#39;s why we can extract our async items$ using a :let declaration using the micro syntax:</p>
<pre><code><span class="token operator">*</span>ngIf<span class="token operator">=</span><span class="token string">"(items$ | async); let items; else: template"</span></code></pre><p>Or using a let-declaration using the <code>ng-template</code> and our <code>$implicit</code> key:</p>
<pre><code><span class="token operator">&lt;</span>ng<span class="token operator">-</span>template
  <span class="token punctuation">[</span>ngIf<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"(items$ | async)"</span>
  <span class="token keyword">let</span><span class="token operator">-</span>items<span class="token operator">></span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span>items <span class="token operator">|</span> json<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>ng<span class="token operator">-</span>template<span class="token operator">></span></code></pre><p>We will get the exact same results! </p>
<p>To see examples of everything <a href="https://stackblitz.com/edit/angular-1kpdvn?file=src/main.ts">check out this Stackblitz!</a></p>
<h2 id="ngfor---micro-syntax-to-ng-template-reloaded">*ngFor - Micro-syntax to ng-template, reloaded.</h2>
<p>Let&#39;s move on to the NgFor directive. We assume another familiar scenario similar to the one for NgIf.</p>
<ul>
<li>We want to display a list of some asynchronous data that we are fetching from an API in our template.</li>
<li>Once we receive the list, we want to display every item of the list using a custom template.</li>
</ul>
<p>Our code will look like this: 
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t0j9sr66lk28aiu096gi.png" alt="*ngFor">
Again, we color, divide, and conquer:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e1g69zrfdg1ol8dbtvup.png" alt="*ngFor color coded">
The asterisk <strong>*</strong> and the <code>ngFor</code> selector make up the left side.
The right side is made up out of 3 parts: </p>
<ol>
<li>an <strong>:let</strong> declaration</li>
<li>a <strong>:keyExp</strong> declaration</li>
<li>an <strong>:as</strong> declaration</li>
</ol>
<p>Let&#39;s take a closer look at each one:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tbo6pgksdroyysxm3x5c.png" alt="let item"></p>
<p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wv6pkj5kuzfrpph90hw7.png" alt="of items">
While the colon is frequently left out for a cleaner reading of the NgFor micro-syntax, this is actually a classic :keyExp. We assign our <code>(items$ | async)</code> expression to our directive&#39;s camelCase-fused <code>@Input() ngForOf</code>. This input value is also assigned to the <code>context</code>&#39; <code>ngForOf</code> key, allowing us to use an :as expression to access it. We can then use our local <code>items</code> variable in the template directly.
When translated to the <code>ng-template</code> version, this section becomes:</p>
<pre><code><span class="token operator">&lt;</span>ng<span class="token operator">-</span>template
  <span class="token punctuation">[</span>ngForOf<span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"(items$ | async)"</span>
  <span class="token keyword">let</span><span class="token operator">-</span>items<span class="token operator">=</span><span class="token string">"ngForOf"</span>
<span class="token operator">></span><span class="token operator">...</span></code></pre><p><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nm0fdcduh91y375499d6.png" alt="as index">
Last but not least, we have a simple :as declaration extracting the <code>index</code> key of our <code>context</code> into the <code>i</code> variable:</p>
<pre><code><span class="token operator">&lt;</span>ng<span class="token operator">-</span>template
  <span class="token keyword">let</span><span class="token operator">-</span>i<span class="token operator">=</span><span class="token string">"index"</span>
<span class="token operator">></span><span class="token operator">...</span></code></pre><p>Putting everything together we end up with this:
<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/aog4uvpmofm7ahltqhsf.png" alt="micro-syntax to ng-template"></p>
<p>Again, we can use the info above to make some predictions about the source code and see if they hold up.</p>
<p>We know that the NgFor directive has:</p>
<ol>
<li>an <code>@Input()</code> called <code>ngForOf</code> taking in an iterable, for which each item one template gets rendered</li>
<li>a context object with an <code>$implicit</code> key making the current to-be-rendered item accessible. </li>
<li>a context object with an <code>ngForOf</code> key to expose the value above</li>
<li>a context object with an <code>index</code> key making the current to-be-rendered index accessible.</li>
</ol>
<p>Let&#39;s check out the official <a href="https://github.com/angular/angular/blob/main/packages/common/src/directives/ng_for_of.ts">NgIf source code</a> and see if we are correct:</p>
<pre class="language-ts"><code class="language-ts">  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">set</span> <span class="token function">ngForOf</span><span class="token punctuation">(</span>ngForOf<span class="token operator">:</span> <span class="token constant">U</span><span class="token operator">&amp;</span>NgIterable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token operator">|</span><span class="token keyword">undefined</span><span class="token operator">|</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_ngForOf <span class="token operator">=</span> ngForOf<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_ngForOfDirty <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span></code></pre><p>Again, we see in the source code the <code>@Input() ngForOf</code> taking in our iterable. In addition, a flag is used to indicate that this variable is dirty. This is done because NgFor does not simply render and re-render every item in our iterable every time. It actually performs some advanced calculations to determine whether a template needs to be re-rendered in order to ensure that the NgFor directive performs well even with larger lists and more complex templates.</p>
<p>If you want to learn more about NgFor, I recommend you look at its source code. We&#39;ll proceed to look at the <code>context</code> object.</p>
<pre class="language-ts"><code class="language-ts"><span class="token comment">/**
 * @publicApi
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">NgForOfContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span> <span class="token keyword">extends</span> NgIterable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token operator">=</span> NgIterable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">>></span></span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">public</span> $implicit<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> <span class="token keyword">public</span> ngForOf<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">,</span> <span class="token keyword">public</span> index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token keyword">public</span> count<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">even</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">odd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>even<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>Again, we find our <code>$implicit</code>, <code>ngForOf</code>, and <code>index</code> keys. You can also see that there is a bunch of other keys available for you to access in your template!
If you are interested in seeing NgFor and it&#39;s <code>context</code> in action. <a href="https://stackblitz.com/edit/angular-nw65s4?file=src/main.ts">Check out this StackBlitz!</a></p>
<h2 id="whats-next-1">What&#39;s next?</h2>
<p>I can&#39;t tell you how proud I am of you if you&#39;ve made it this far! I hope you now have a clearer understanding of how Angular works its magic on structural directive micro-syntax. Undoubtedly, this subject is among the most challenging aspects of the Angular framework. I hoped that by breaking things down into smaller, more manageable chunks, I would be able to provide you with the knowledge and tools you need to both better comprehend the built-in structural directives and make your own custom structural directives.</p>
<p>Let us pause for a moment (or two, or three) to digest all of this new information and celebrate that the asterisk has returned.</p>
<p>We will improve our custom &quot;*exchangeRate&quot; directive in the following (and possibly final?) article of this series so that it can work with the micro-syntax with ease. Additionally, instead of re-rendering the template after each successful API call, we will expose the response as an observable to our template.</p>
`;
export {
  _20230213MasteringAngularStructuralDirectivesMicroSyntaxInTheWild as default
};
