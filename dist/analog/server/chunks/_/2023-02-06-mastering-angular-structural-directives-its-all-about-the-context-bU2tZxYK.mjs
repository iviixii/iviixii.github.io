const _20230206MasteringAngularStructuralDirectivesItsAllAboutTheContext = `---
title: Mastering Angular Structural Directives - It's all about the context
date: 2023-02-06
teaser: To unleash the power of structural directives one needs to understand how they interact with the rest of the application and outside world. This article examines how this is done with the context object.
slug: 2023-02-06-mastering-angular-structural-directives-its-all-about-the-context
---

<p>In the <a href="/blog/2023-01-20-mastering-angular-structural-directives-the-basics">first article of this series,</a> we learned how to render our first template to the DOM using structural directives. We saw that the asterisk micro syntax is actually optional and expanded to an <code>ng-template</code> by Angular. Then, we leveraged dependency injection to obtain references to our template and view container and used them to create new DOM elements.</p>
<p>So far we have only rendered static HTML to the DOM. There was no outside interaction between our template and the rest of the application. Let&#39;s change that and introduce structural directive&#39;s <code>context</code>.</p>
<p>Note: We will only use the <code>ng-template</code> notation in this post and dedicate the next post solely to understanding the asterisk micro syntax.</p>
<h2 id="structural-directives-context---definition--structure">Structural Directive&#39;s Context - Definition &amp; Structure</h2>
<p>We already know how to use the ViewContainerRef&#39;s <code>createEmbeddedView</code> method to render our template. This function takes a second optional parameter called <code>context</code>. The ViewContainerRef&#39;s documentation defines it as such:
<em>The data-binding context of the embedded view, as declared in the <code>&lt;ng-template&gt;</code> usage. Optional. Default is undefined.</em></p>
<p>It seems like we can use this <code>context</code> object to bind data to our template. Unfortunately, this is all the information we get directly from the ViewContainerRef documentation. We are left in the dark on how to use it or if there is a specific structure to this context object.</p>
<p>More about the structure is provided by the documentation of another built-in structural directive we have not mentioned yet: <strong>NgTemplateOutlet</strong></p>
<p>This directive <em>inserts an embedded view from a prepared TemplateRef</em> and takes in a template reference and (amongst others) an additional input: <code>context</code>. Let\u2019s see how <code>context</code> is described in this part of the documentation:</p>
<p><em>A context object to attach to the EmbeddedViewRef. This should be an object, the object&#39;s keys will be available for binding by the local template let declarations. Using the key $implicit in the context object will set its value as default</em></p>
<p>We combine the information from both docs and recap:</p>
<ol>
<li>We can pass a <code>context</code> object to the ViewContainerRef&#39;s <code>createEmbeddedView</code> method.</li>
<li>This object will be used to bind data to the embedded view, which is rendered based on our <code>ng-template</code>.</li>
<li>The keys of the <code>context</code> object will be available for the <code>ng-template</code> through <strong>let declarations</strong>.</li>
<li>There is a special key <code>$implicit</code> that is used as the default value of those let declarations.</li>
</ol>
<p>Already, things are much clearer. But what exactly are those <strong>let declarations</strong>? And how can we use them to connect our <code>context</code> object to our <code>ng-template</code>?</p>
<h2 id="let-declarations---binding-context-to-the-template">Let declarations - binding context to the template</h2>
<p>Let declarations can be used on <code>ng-template</code> tags to give us access to the <code>context</code> provided by the applied structural directive.</p>
<p>Their structure looks like this:</p>
<p>let-<em>local</em>=\u201C<strong>export</strong>\u201D</p>
<ul>
<li><em>local</em> is the local variable name used in the template.</li>
<li><strong>export</strong> is the value exported by the directive under a given name, aka one of the keys in our context object! Unless the key is <code>$implicit</code>. This key is special and is assigned to let-<em>local</em> by default. If =\u201C<strong>export</strong>\u201D is omitted in a let declaration, the value of <code>$implicit</code> is automatically assigned to our <em>local</em> variable.</li>
</ul>
<p>Let&#39;s look at an example to better understand how this data binding works:</p>
<pre class="language-ts"><code class="language-ts">  <span class="token comment">// We create a directive that allows us to provide</span>
  <span class="token comment">// the template with information on how long a</span>
  <span class="token comment">// specific unit of measurement is in meters.</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    selector<span class="token operator">:</span> <span class="token string">'[unitsInMeters]'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UnitsInMetersDirective</span> <span class="token punctuation">{</span>
  <span class="token comment">// The context passed to the ng-template</span>
  <span class="token comment">// it holds information about how long a unit is in meters</span>
  <span class="token keyword">private</span> unitsInMetersContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// the default is meter</span>
    $implicit<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// a mile is 1609.34 meters long</span>
    mile<span class="token operator">:</span> <span class="token number">1609.34</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// To render our template to the DOM we:</span>
  <span class="token comment">// get the template ref from the ng-template host</span>
  <span class="token keyword">private</span> template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// get the viewcontainerref from the host: &lt;!--comment--></span>
  <span class="token keyword">private</span> vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// on initialization of our directive we</span>
  <span class="token comment">// render our template to the DOM passing</span>
  <span class="token comment">// our unitsInMetersContext</span>
  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>template<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>unitsInMetersContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><p>Awesome! We can finally bind data to our templates! For now, we only used constant values, but we are in no way limited to only that.</p>
<h2 id="dynamic-context---unleashing-the-full-power-of-structural-directives">Dynamic context - Unleashing the full power of structural directives</h2>
<p>As we build more complex directives we will need to pass more than just constant values to our template. Angular does not limit the type of values of our context&#39;s keys. We can pass pretty much any type of value to our template.</p>
<p>Examples are:</p>
<ul>
<li><strong>Static values</strong> such as constant numbers, strings, or other objects.</li>
<li><strong>Dynamic values</strong>, which are references to properties of our directive. Of course, can include <code>@Input()</code> properties.</li>
<li><strong>Observables</strong>, which are references to observables within our directive. I realize that those are also &quot;just&quot; properties of our directive, but they are really powerful and can avoid excessive re-rendering of our template.</li>
<li><strong>Functions</strong>, which are references to our directive&#39;s functions. It should be noted, that the <code>this</code> keyword used in those functions needs to be bound to the directive&#39;s <strong>execution context</strong> (a different context than the one this article is focused on). To achieve that you can either wrap the function passed in the context with an arrow function or use <code>.bind(this)</code> on the function.</li>
</ul>
<p>Let&#39;s see the true power of <code>context</code> in practice and create a structural directive exposing information about currency exchange rates - the <strong>exchangeRate</strong> directive.</p>
<p>Our requirements are:</p>
<ul>
<li>The directive should allow the user to input the <strong>from</strong> currency and the <strong>to</strong> currency. These inputs are <a href="https://knowledgecenter.zuora.com/Quick_References/Country%2C_State%2C_and_Province_Codes/D_Currencies_and_Their_3-Letter_Codes">ISO 3-Letter Currency Codes</a>.</li>
<li>By default, we convert from USD to EUR</li>
<li>We call an API to return the current rate between the currencies</li>
<li>Once we get the value we render our template and expose:<ol>
<li>the <strong>from</strong> currency code</li>
<li>the <strong>to</strong> currency code</li>
<li>the <strong>rate</strong></li>
<li>the <strong>reverseFn</strong> function, which can be called to switch the <strong>from</strong> and <strong>to</strong> variables. Reversing the current <strong>rate</strong></li>
</ol>
</li>
</ul>
<p>Using it in a component should be as easy as this:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;label>From &lt;input [(ngModel)]="fromInput"> &lt;/label>
  &lt;label>To &lt;input [(ngModel)]="toInput"> &lt;/label>
  
  &lt;ng-template exchangeRate [from]="fromInput" [to]="toInput" let-from="from" let-to="to" let-rate="rate" let-reverse="reverseFn">
  &lt;p>Converting from {{from}} to {{to}} the exchange rate is: {{rate}}&lt;/p>
  &lt;button (click)="reverse()">Reverse&lt;/button>
  &lt;/ng-template>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> fromInput <span class="token operator">=</span> <span class="token string">'USD'</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> toInput <span class="token operator">=</span> <span class="token string">'EUR'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>Let&#39;s look at the overall structure of how our directive might implement this functionality:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Directive</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'[exchangeRate]'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ExchangeRateDirective</span> <span class="token keyword">implements</span> <span class="token class-name">OnInit</span><span class="token punctuation">,</span> OnChanges <span class="token punctuation">{</span>
  <span class="token comment">// from input which defaults to USD if none is provided</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token string">'from'</span><span class="token punctuation">)</span>
  <span class="token keyword">public</span> from <span class="token operator">=</span> <span class="token string">'USD'</span><span class="token punctuation">;</span>
  <span class="token comment">// to input which defaults to EUR if none is provided</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token string">'to'</span><span class="token punctuation">)</span>
  <span class="token keyword">public</span> to <span class="token operator">=</span> <span class="token string">'EUR'</span><span class="token punctuation">;</span>

  <span class="token comment">// TemplateRef and ViewContainerRef to render to DOM</span>
  <span class="token keyword">private</span> template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// HttpClient to query API</span>
  <span class="token keyword">private</span> http <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>HttpClient<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// initally we render our template with the default values</span>
  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// whenever an input value changes we query our</span>
  <span class="token comment">// api for the new rate and re-render the template</span>
  <span class="token comment">// given the new input is a 3 letter currency code</span>
  <span class="token keyword">public</span> <span class="token function">ngOnChanges</span><span class="token punctuation">(</span>changes<span class="token operator">:</span> SimpleChanges<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// get the new from value or keep old</span>
    <span class="token keyword">const</span> newFrom <span class="token operator">=</span> changes<span class="token punctuation">.</span>from <span class="token operator">?</span> changes<span class="token punctuation">.</span>from<span class="token punctuation">.</span>currentValue <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>from<span class="token punctuation">;</span>
    <span class="token comment">// get the new to value or keep old</span>
    <span class="token keyword">const</span> newTo <span class="token operator">=</span> changes<span class="token punctuation">.</span>to <span class="token operator">?</span> changes<span class="token punctuation">.</span>to<span class="token punctuation">.</span>currentValue <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">;</span>
    <span class="token comment">// over simplified check if inputs are currency code</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newFrom<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">3</span> <span class="token operator">||</span> newTo<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// stop processing changes as definitely not a valid currency code</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// get new rate and render template to DOM</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">reverseRate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this is for demonstration purposes only</span>
    <span class="token comment">// since from and to are inputs reassigning those inputs</span>
    <span class="token comment">// might be confusing to the consumer of the directive</span>
    <span class="token keyword">const</span> oldFrom <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>from<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>from <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>to <span class="token operator">=</span> oldFrom<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre><p>First, we take in our <strong>from</strong> and <strong>to</strong> inputs with the defaults from the requirements. Then, we inject our dependencies which we need to render our template to the DOM and make API calls to get the newest exchange rate.</p>
<pre class="language-ts"><code class="language-ts">  <span class="token comment">// from input which defaults to USD if none is provided</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token string">'from'</span><span class="token punctuation">)</span>
  <span class="token keyword">public</span> from <span class="token operator">=</span> <span class="token string">'USD'</span><span class="token punctuation">;</span>
  <span class="token comment">// to input which defaults to EUR if none is provided</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token string">'to'</span><span class="token punctuation">)</span>
  <span class="token keyword">public</span> to <span class="token operator">=</span> <span class="token string">'EUR'</span><span class="token punctuation">;</span>

  <span class="token comment">// TemplateRef and ViewContainerRef to render to DOM</span>
  <span class="token keyword">private</span> template <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TemplateRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> vcr <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>ViewContainerRef<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// HttpClient to query API</span>
  <span class="token keyword">private</span> http <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>HttpClient<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre><p>On initialization, we get the exchange rate from the API, create the <code>context</code> and render the template.</p>
<pre class="language-ts"><code class="language-ts">  <span class="token comment">// initally we render our template with the default values</span>
  <span class="token keyword">public</span> <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span></code></pre><p>On every subsequent change, we determine if the inputs changed and if they are a currency code. If they did not, we do nothing. If they did, we again get the exchange rate from the API, create the <code>context</code> and render the template.</p>
<pre class="language-ts"><code class="language-ts">  <span class="token comment">// whenever an input value changes we query our</span>
  <span class="token comment">// api for the new rate and re-render the template</span>
  <span class="token comment">// given the new input is a 3 letter currency code</span>
  <span class="token keyword">public</span> <span class="token function">ngOnChanges</span><span class="token punctuation">(</span>changes<span class="token operator">:</span> SimpleChanges<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// get the new from value or keep old</span>
    <span class="token keyword">const</span> newFrom <span class="token operator">=</span> changes<span class="token punctuation">.</span>from <span class="token operator">?</span> changes<span class="token punctuation">.</span>from<span class="token punctuation">.</span>currentValue <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>from<span class="token punctuation">;</span>
    <span class="token comment">// get the new to value or keep old</span>
    <span class="token keyword">const</span> newTo <span class="token operator">=</span> changes<span class="token punctuation">.</span>to <span class="token operator">?</span> changes<span class="token punctuation">.</span>to<span class="token punctuation">.</span>currentValue <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">;</span>
    <span class="token comment">// over simplified check if inputs are currency code</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newFrom<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">3</span> <span class="token operator">||</span> newTo<span class="token punctuation">.</span>length <span class="token operator">!==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// stop processing changes as definitely not a valid currency code</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// get new rate and render template to DOM</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span></code></pre><p>Finally, we define a reverse function that reverses the <strong>from</strong> and <strong>to</strong> variable, then gets the reversed rate from the API, creates the context, and renders the template.</p>
<pre class="language-ts"><code class="language-ts">  <span class="token keyword">public</span> <span class="token function">reverseRate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// this is for demonstration purposes only</span>
    <span class="token comment">// since from and to are inputs reassigning those inputs</span>
    <span class="token comment">// might be confusing to the consumer of the directive</span>
    <span class="token keyword">const</span> oldFrom <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>from<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>from <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>to <span class="token operator">=</span> oldFrom<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span></code></pre><p>Let&#39;s take a closer look at the <code>getExchangeRateFromApiCreateContextRenderTemplate</code> method and see how it ties everything together.</p>
<pre class="language-ts"><code class="language-ts">  <span class="token keyword">private</span> <span class="token function">getExchangeRateFromApiCreateContextRenderTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. we get the new rate based on the from and to currencies and re-render our template</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>http
      <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">https://open.er-api.com/v6/latest/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>from<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
        <span class="token comment">// 2. we only care about the immediate response</span>
        <span class="token function">take</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token comment">// 3. we extract the rate for the currency</span>
        <span class="token comment">// we convert to</span>
        <span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>response<span class="token operator">:</span> ExchangeRateResponse<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> response<span class="token operator">?.</span>rates<span class="token operator">?.</span><span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">]</span> <span class="token operator">??</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span>rate<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 4. once the rate arrives, we build the</span>
        <span class="token comment">// context which will be exposed to our template.</span>
        <span class="token keyword">const</span> exchangeRateContext <span class="token operator">=</span> <span class="token punctuation">{</span>
          <span class="token comment">// 4.1 current value of our from property</span>
          from<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>from<span class="token punctuation">,</span>
          <span class="token comment">// 4.2 current value of our to property</span>
          to<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>to<span class="token punctuation">,</span>
          <span class="token comment">// 4.3 rate returned by api</span>
          rate<span class="token punctuation">,</span>
          <span class="token comment">// 4.4 function reference to refresh</span>
          <span class="token function-variable function">reverseFn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reverseRate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vcr<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 5. we render the template with the new context</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vcr<span class="token punctuation">.</span><span class="token function">createEmbeddedView</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>template<span class="token punctuation">,</span> exchangeRateContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span></code></pre><ol>
<li>The method uses the HttpClient&#39;s <em>get</em> method to request a new rate from the API for our <strong>from</strong> currency code and
returns an observable of the response.</li>
<li>We ensure we only react to the first value emitted using the <code>take(1)</code> RxJs operator.</li>
<li>With the <code>map</code> operator, the API response inside of the observable is mapped to the rate for our <em>to</em> currency code. If we cannot find the code, we return a symbolic value of -1. This indicates to users of our directive that something is off so they can display an appropriate message. Of course, this is oversimplified, but I hope you get the idea.</li>
<li>We subscribe to our observable and obtain the rate.
Once the rate is received, we build our <code>context</code> with the following keys:</li>
<li><strong>from</strong>: the current currency code of our directives <em>from</em> property.</li>
<li><strong>to</strong>: the current currency code of our directives <em>to</em> property</li>
<li><strong>rate</strong>: the exchange rate returned from the API</li>
<li><strong>reverseFn</strong>: a reference to our directives reverseRate function bound to the current execution context with an arrow function.</li>
<li>We render our template to the DOM and pass the new <code>context</code>.</li>
</ol>
<p>Now, we can use our directive in the AppComponent as described above:</p>
<pre class="language-ts"><code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  selector<span class="token operator">:</span> <span class="token string">'my-app'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;label>From &lt;input [(ngModel)]="fromInput"> &lt;/label>
  &lt;label>To &lt;input [(ngModel)]="toInput"> &lt;/label>
  
  &lt;ng-template exchangeRate [from]="fromInput" [to]="toInput" let-from="from" let-to="to" let-rate="rate" let-reverse="reverseFn">
  &lt;p>Converting from {{from}} to {{to}} the exchange rate is: {{rate}}&lt;/p>
  &lt;button (click)="reverse()">Reverse&lt;/button>
  &lt;/ng-template>
  </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> fromInput <span class="token operator">=</span> <span class="token string">'USD'</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> toInput <span class="token operator">=</span> <span class="token string">'EUR'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre><p>Awesome! We have now interacted with the rest of the app through inputs and outputs, even the world outside our application by injecting the HttpClient and making API calls to remote servers! Everything from within our structural directive.</p>
<p><a href="https://stackblitz.com/edit/angular-ivy-phkd8x?file=src/app/app.component.ts">Check out the working directive here</a></p>
<h2 id="one-step-at-a-time">One step at a time</h2>
<p>There are a lot of ways to improve our directive such as improving performance by avoiding re-renders using observables for our exposed variables and strict type checking for our context in the <code>ng-template</code>.</p>
<p>However, these are topics for another post. If you are interested in how to strictly type your context exposed to templates Thomas Laforge wrote this great <a href="https://dev.to/this-is-angular/directive-type-checking-45oe">article</a> covering everything you need to know. I highly recommend you read it!</p>
<p>Let&#39;s be proud of ourselves today. We took another step to master structural directives in Angular by understanding the key concept of the <code>context</code>. Let&#39;s take some time to digest all this new information and get ready to learn everything about the structural directive micro syntax. The magic that brings us back our asterisk.</p>
`;

export { _20230206MasteringAngularStructuralDirectivesItsAllAboutTheContext as default };
//# sourceMappingURL=2023-02-06-mastering-angular-structural-directives-its-all-about-the-context-bU2tZxYK.mjs.map
