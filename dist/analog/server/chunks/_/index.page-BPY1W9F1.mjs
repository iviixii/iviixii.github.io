import { ɵ as __defineComponent, v as __ProvidersFeature, a as __StandaloneFeature, d as __template, e as __property, C as CommonModule, N as NgIf, D as DatePipe, f as RouterLink, H as HlmIconComponent, w as HlmButtonDirective, b as __element, h as __elementStart, j as __elementEnd, k as __advance, m as NgForOf, x as provideIcons, n as injectContentFiles, i as __text, q as __pipe, o as __nextContext, y as __textInterpolate, u as __attribute, r as __pipeBind1, p as __textInterpolate1, z as lucideChevronRight } from './renderer.mjs';
import { P as PageHeaderComponent } from './page-header.component-CTpK4NYn.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import 'rxjs';
import 'rxjs/operators';
import 'class-variance-authority';
import 'clsx';
import 'front-matter';
import 'marked-gfm-heading-id';
import 'marked';
import 'marked-mangle';
import '../raw/index.mjs';

function BlogPreviewComponent_article_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "article", 1)(1, "div", 2)(2, "h2", 3);
    __element(3, "div", 4);
    __elementStart(4, "a", 5);
    __element(5, "span", 6);
    __elementStart(6, "span", 7);
    __text(7);
    __elementEnd()()();
    __elementStart(8, "time", 8);
    __pipe(9, "date");
    __elementStart(10, "span", 9);
    __element(11, "span", 10);
    __elementEnd();
    __text(12);
    __pipe(13, "date");
    __elementEnd();
    __elementStart(14, "p", 11);
    __text(15);
    __elementEnd();
    __elementStart(16, "div", 12);
    __text(17, "Read article ");
    __element(18, "hlm-icon", 13);
    __elementEnd()();
    __elementStart(19, "time", 14);
    __pipe(20, "date");
    __text(21);
    __pipe(22, "date");
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(4);
    __property("routerLink", "/blog/" + ctx_r0.article.slug);
    __advance(3);
    __textInterpolate(ctx_r0.article.title);
    __advance();
    __attribute("datetime", __pipeBind1(9, 7, ctx_r0.article.date));
    __advance(4);
    __textInterpolate1(" ", __pipeBind1(13, 9, ctx_r0.article.date), " ");
    __advance(3);
    __textInterpolate1(" ", ctx_r0.article.teaser, " ");
    __advance(4);
    __attribute("datetime", __pipeBind1(20, 11, ctx_r0.article.date));
    __advance(2);
    __textInterpolate1(" ", __pipeBind1(22, 13, ctx_r0.article.date), " ");
  }
}
const _BlogPreviewComponent = class _BlogPreviewComponent2 {
};
_BlogPreviewComponent.\u0275fac = function BlogPreviewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BlogPreviewComponent)();
};
_BlogPreviewComponent.\u0275cmp = /* @__PURE__ */ __defineComponent({ type: _BlogPreviewComponent, selectors: [["app-blog-preview"]], hostAttrs: [1, "block"], inputs: { article: "article" }, standalone: true, features: [__ProvidersFeature([provideIcons({ lucideChevronRight })]), __StandaloneFeature], decls: 1, vars: 1, consts: [["class", "md:grid md:grid-cols-4 md:items-baseline", 4, "ngIf"], [1, "md:grid", "md:grid-cols-4", "md:items-baseline"], [1, "md:col-span-3", "group", "relative", "flex", "flex-col", "items-start"], [1, "text-base", "font-semibold", "tracking-tight", "text-foreground"], [1, "absolute", "-inset-y-6", "-inset-x-4", "z-0", "scale-95", "bg-muted", "opacity-0", "transition", "group-hover:scale-100", "group-hover:opacity-100", "sm:-inset-x-6", "sm:rounded-2xl"], [3, "routerLink"], [1, "absolute", "-inset-y-6", "-inset-x-4", "z-20", "sm:-inset-x-6", "sm:rounded-2xl"], [1, "relative", "z-10"], [1, "md:hidden", "relative", "z-10", "order-first", "mb-3", "flex", "items-center", "text-sm", "text-muted-foreground", "pl-3.5"], ["aria-hidden", "true", 1, "absolute", "inset-y-0", "left-0", "flex", "items-center"], [1, "h-4", "w-0.5", "rounded-full", "bg-muted"], [1, "relative", "z-10", "mt-2", "text-sm", "text-muted-foreground"], ["aria-hidden", "true", "hlmBtn", "", "variant", "link", 1, "relative", "text-rose-500", "px-1", "z-10", "mt-4"], ["name", "lucideChevronRight", "size", "sm", 1, "ml-2"], [1, "mt-1", "hidden", "md:block", "relative", "z-10", "order-first", "mb-3", "flex", "items-center", "text-sm"]], template: function BlogPreviewComponent_Template(rf, ctx) {
  if (rf & 1) {
    __template(0, BlogPreviewComponent_article_0_Template, 23, 15, "article", 0);
  }
  if (rf & 2) {
    __property("ngIf", ctx.article);
  }
}, dependencies: [CommonModule, NgIf, DatePipe, RouterLink, HlmIconComponent, HlmButtonDirective], encapsulation: 2 });
let BlogPreviewComponent = _BlogPreviewComponent;
function BlogComponent_app_blog_preview_2_Template(rf, ctx) {
  if (rf & 1) {
    __element(0, "app-blog-preview", 3);
  }
  if (rf & 2) {
    const article_r1 = ctx.$implicit;
    __property("article", article_r1.attributes);
  }
}
const _BlogComponent = class _BlogComponent2 {
  constructor() {
    this.blogArticles = injectContentFiles();
    console.log(this.blogArticles);
  }
  ngOnInit() {
    this.sortArticlesByDate();
  }
  sortArticlesByDate() {
    console.log(this.blogArticles);
    this.blogArticles.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
  }
};
_BlogComponent.\u0275fac = function BlogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BlogComponent)();
};
_BlogComponent.\u0275cmp = /* @__PURE__ */ __defineComponent({ type: _BlogComponent, selectors: [["blog"]], standalone: true, features: [__StandaloneFeature], decls: 3, vars: 1, consts: [["title", "Blog", "intro", "I write about web dev full-stack solutions mixed with my own brevity of life and various tangents.."], [1, "mt-12", "flex", "max-w-3xl", "flex-col", "space-y-16"], [3, "article", 4, "ngFor", "ngForOf"], [3, "article"]], template: function BlogComponent_Template(rf, ctx) {
  if (rf & 1) {
    __element(0, "app-page-header", 0);
    __elementStart(1, "div", 1);
    __template(2, BlogComponent_app_blog_preview_2_Template, 1, 1, "app-blog-preview", 2);
    __elementEnd();
  }
  if (rf & 2) {
    __advance(2);
    __property("ngForOf", ctx.blogArticles);
  }
}, dependencies: [BlogPreviewComponent, NgForOf, PageHeaderComponent], encapsulation: 2 });
let BlogComponent = _BlogComponent;

export { BlogComponent as default };
//# sourceMappingURL=index.page-BPY1W9F1.mjs.map
