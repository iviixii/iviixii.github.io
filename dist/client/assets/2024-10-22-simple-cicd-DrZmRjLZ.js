const n=`---
title:  How I Deploy my apps with one command
date: 2024-10-22
teaser:  Simple shell script do automate ci cd
slug: 2024-10-22-simple-cicd
---

<p>Instead of using actions or some other way of CI/CD’ing my apps, I simply work with a deploy script that will build a Docker Container, push it to my registry, SSH into the remote, pull the container, make sure it runs, then apply NGINX configurations and SSL certificates so that the app is live on the internet for all to see.</p>
<p>This means I don’t need any CI/CD additions generally, and I can create Dockefiles or Docker-composes for the purpose of each apps deployment. Easy.</p>
<p>It’s how I publish blog posts, deploy my apps, and get things out there as fast as possible.</p>
<p>Steal the script and go from there:</p>
<pre><code><span class="token hashbang comment">#!/bin/bash</span>

# Check the <span class="token builtin">number</span> <span class="token keyword">of</span> arguments
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"$#"</span> <span class="token operator">-</span>ne <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> then
echo <span class="token string">"Usage: $0 &lt;image_name> &lt;port_mapping> &lt;domain>"</span>
exit <span class="token number">1</span>
fi

# Assign arguments to variables
<span class="token constant">IMAGE_NAME</span><span class="token operator">=</span>$1
<span class="token constant">PORT_MAPPING</span><span class="token operator">=</span>$2
<span class="token constant">DOMAIN</span><span class="token operator">=</span>$3
<span class="token constant">EMAIL</span><span class="token operator">=</span><span class="token string">""</span>
<span class="token constant">TAG</span><span class="token operator">=</span><span class="token string">"latest"</span>  # Adjust tagging strategy <span class="token keyword">as</span> needed
<span class="token constant">DOCKER_REGISTRY</span><span class="token operator">=</span><span class="token string">""</span>  # Docker registry <span class="token constant">URL</span>
<span class="token constant">SERVER_HOST</span><span class="token operator">=</span><span class="token string">""</span>
<span class="token constant">SSH_USER</span><span class="token operator">=</span><span class="token string">""</span>  # <span class="token constant">SSH</span> user on the remote server
<span class="token constant">SSH_KEY_PATH</span><span class="token operator">=</span><span class="token string">""</span>  # <span class="token constant">SSH</span> <span class="token keyword">private</span> key path

# Extract host port <span class="token keyword">from</span> <span class="token constant">PORT_MAPPING</span>
<span class="token constant">HOST_PORT</span><span class="token operator">=</span><span class="token function">$</span><span class="token punctuation">(</span>echo $<span class="token constant">PORT_MAPPING</span> <span class="token operator">|</span> cut <span class="token operator">-</span>d<span class="token string">':'</span> <span class="token operator">-</span>f1<span class="token punctuation">)</span>

# Build the Docker image <span class="token keyword">with</span> Buildx
docker buildx build <span class="token operator">--</span>platform linux<span class="token operator">/</span>amd64 <span class="token operator">-</span>t $<span class="token constant">DOCKER_REGISTRY</span><span class="token operator">/</span><span class="token string">"$IMAGE_NAME"</span><span class="token operator">:</span>$<span class="token constant">TAG</span> <span class="token operator">--</span>load <span class="token punctuation">.</span>

# Push the Docker image
docker push $<span class="token constant">DOCKER_REGISTRY</span><span class="token operator">/</span>$<span class="token constant">IMAGE_NAME</span><span class="token operator">:</span>$<span class="token constant">TAG</span>

# <span class="token constant">SSH</span> into server to pull the image<span class="token punctuation">,</span> restart the container<span class="token punctuation">,</span> and configure <span class="token constant">NGINX</span> and Certbot
ssh <span class="token operator">-</span>i $<span class="token constant">SSH_KEY_PATH</span> $<span class="token constant">SSH_USER</span><span class="token decorator"><span class="token at operator">@</span><span class="token function">$</span></span><span class="token constant">SERVER_HOST</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">EOF</span>
# Pull the latest Docker image
docker pull $<span class="token constant">DOCKER_REGISTRY</span><span class="token operator">/</span>$<span class="token constant">IMAGE_NAME</span><span class="token operator">:</span>$<span class="token constant">TAG</span>

# Stop and remove the existing container <span class="token keyword">if</span> it exists
docker stop $<span class="token constant">IMAGE_NAME</span> <span class="token operator">||</span> <span class="token boolean">true</span>
docker rm $<span class="token constant">IMAGE_NAME</span> <span class="token operator">||</span> <span class="token boolean">true</span>

# Run the <span class="token keyword">new</span> <span class="token class-name">container</span> <span class="token keyword">in</span> the background <span class="token keyword">with</span> the specified port mapping
docker run <span class="token operator">-</span>d <span class="token operator">--</span>name $<span class="token constant">IMAGE_NAME</span> <span class="token operator">-</span>p $<span class="token constant">PORT_MAPPING</span> $<span class="token constant">DOCKER_REGISTRY</span><span class="token operator">/</span>$<span class="token constant">IMAGE_NAME</span><span class="token operator">:</span>$<span class="token constant">TAG</span>

# Check <span class="token keyword">if</span> <span class="token constant">NGINX</span> config exists<span class="token punctuation">,</span> <span class="token keyword">if</span> not<span class="token punctuation">,</span> create it
<span class="token constant">NGINX_CONFIG</span><span class="token operator">=</span><span class="token string">"/etc/nginx/sites-available/$DOMAIN.conf"</span>
<span class="token constant">NGINX_ENABLED</span><span class="token operator">=</span><span class="token string">"/etc/nginx/sites-enabled/$DOMAIN.conf"</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token operator">-</span>f <span class="token string">"\\$NGINX_CONFIG"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> then
    sudo bash <span class="token operator">-</span>c <span class="token string">"cat > \\$NGINX_CONFIG"</span> <span class="token operator">&lt;&lt;</span> <span class="token string">'ENDOFFILE'</span>
server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name $<span class="token constant">DOMAIN</span><span class="token punctuation">;</span>

    location <span class="token operator">/</span><span class="token punctuation">.</span>well<span class="token operator">-</span>known<span class="token operator">/</span>acme<span class="token operator">-</span>challenge<span class="token operator">/</span> <span class="token punctuation">{</span>
        root <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>www<span class="token operator">/</span>certbot<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    location <span class="token operator">/</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">301</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>\\$host\\$request_uri<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

server <span class="token punctuation">{</span>
    listen <span class="token number">443</span> ssl<span class="token punctuation">;</span>
    server_name $<span class="token constant">DOMAIN</span><span class="token punctuation">;</span>

    ssl_certificate <span class="token operator">/</span>etc<span class="token operator">/</span>letsencrypt<span class="token operator">/</span>live<span class="token operator">/</span>$<span class="token constant">DOMAIN</span><span class="token operator">/</span>fullchain<span class="token punctuation">.</span>pem<span class="token punctuation">;</span>
    ssl_certificate_key <span class="token operator">/</span>etc<span class="token operator">/</span>letsencrypt<span class="token operator">/</span>live<span class="token operator">/</span>$<span class="token constant">DOMAIN</span><span class="token operator">/</span>privkey<span class="token punctuation">.</span>pem<span class="token punctuation">;</span>

    location <span class="token operator">/</span> <span class="token punctuation">{</span>
        proxy_pass http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span>$<span class="token constant">HOST_PORT</span><span class="token punctuation">;</span>
        proxy_set_header Host \\$host<span class="token punctuation">;</span>
        proxy_set_header <span class="token constant">X</span><span class="token operator">-</span>Real<span class="token operator">-</span><span class="token constant">IP</span> \\$remote_addr<span class="token punctuation">;</span>
        proxy_set_header <span class="token constant">X</span><span class="token operator">-</span>Forwarded<span class="token operator">-</span>For \\$proxy_add_x_forwarded_for<span class="token punctuation">;</span>
        proxy_set_header <span class="token constant">X</span><span class="token operator">-</span>Forwarded<span class="token operator">-</span>Proto \\$scheme<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token constant">ENDOFFILE</span>

    sudo ln <span class="token operator">-</span>s <span class="token string">"\\$NGINX_CONFIG"</span> <span class="token string">"\\$NGINX_ENABLED"</span>
fi

# Reload <span class="token constant">NGINX</span> to apply configuration
sudo nginx <span class="token operator">-</span>t <span class="token operator">&amp;&amp;</span> sudo systemctl reload nginx

# After <span class="token constant">NGINX</span> <span class="token keyword">is</span> reloaded<span class="token operator">:</span>
sudo certbot certonly <span class="token operator">--</span>webroot <span class="token operator">-</span>w <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>www<span class="token operator">/</span>certbot <span class="token operator">-</span>d $<span class="token constant">DOMAIN</span> <span class="token operator">--</span>email $<span class="token constant">EMAIL</span> <span class="token operator">--</span>agree<span class="token operator">-</span>tos <span class="token operator">--</span>non<span class="token operator">-</span>interactive <span class="token operator">--</span>deploy<span class="token operator">-</span>hook <span class="token string">"sudo systemctl reload nginx"</span>

# Reload <span class="token constant">NGINX</span> to use <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">SSL</span></span> certificate
sudo systemctl reload nginx
<span class="token constant">EOF</span>

echo <span class="token string">"Deployment complete."</span></code></pre><p>You can then use</p>
<p><code>deploy app-name &quot;port:port&quot; appdomain.com</code></p>
<p>and the docker container will build, push to your registry, pull down to your server, and deploy itself to a domain of your choosing.</p>
<p>Nice.</p>
`;export{n as default};
