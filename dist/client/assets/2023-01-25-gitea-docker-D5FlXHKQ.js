const a=`---
title: Using Gitea as Your Docker Hub
date: 2023-01-25
teaser: Forget the bloated whale we are adding docker containers to gitea
slug: 2023-01-25-gitea-docker
---

<p>I have a bit of an unconventional way to deploy docker containers - I saw that Docker Hub wanted to charge montly fees when I am simply pushing and pulling images infrequently, so I decided to do this via my Gitea instance.</p>
<p>Create your Dockerfile in your project to properly deploy the app.</p>
<pre><code>docker build <span class="token operator">-</span>t app<span class="token operator">-</span>name <span class="token punctuation">.</span></code></pre><p>login to Docker and push the image:</p>
<pre><code>docker login git<span class="token punctuation">.</span>yoursite<span class="token punctuation">.</span>com
docker tag app<span class="token operator">-</span>name<span class="token operator">:</span>latest git<span class="token punctuation">.</span>yoursite<span class="token punctuation">.</span>com<span class="token operator">/</span>username<span class="token operator">/</span>app<span class="token operator">-</span>name<span class="token operator">:</span>latest
docker push git<span class="token punctuation">.</span>yoursite<span class="token punctuation">.</span>com<span class="token operator">/</span>username<span class="token operator">/</span>app<span class="token operator">-</span>name<span class="token operator">:</span>latest</code></pre><p>On your server:</p>
<pre><code>docker pull git<span class="token punctuation">.</span>yoursite<span class="token punctuation">.</span>com<span class="token operator">/</span>username<span class="token operator">/</span>app<span class="token operator">-</span>name<span class="token operator">:</span>latest
docker run <span class="token operator">-</span>d <span class="token operator">--</span>name app<span class="token operator">-</span>name <span class="token operator">-</span>p <span class="token number">42069</span><span class="token operator">:</span><span class="token number">42069</span> git<span class="token punctuation">.</span>yoursite<span class="token punctuation">.</span>com<span class="token operator">/</span>username<span class="token operator">/</span>app<span class="token operator">-</span>name<span class="token operator">:</span>latest</code></pre><p>From there, you can configure nginx as a reverse proxy to the port you chose to run the app, set up a domain and your ssl certs, and you are off to the races.</p>
`;export{a as default};
