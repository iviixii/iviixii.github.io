import { ɵ as __defineComponent, a as __StandaloneFeature, d as __template, e as __property, C as CommonModule, N as NgIf, f as RouterLink, h as __elementStart, i as __text, j as __elementEnd, k as __nextContext, l as __advance, m as __textInterpolate1, n as injectContentFiles, b as __element, o as __pureFunction0, p as NgForOf } from "../main.server.js";
import { P as PageHeaderComponent } from "./page-header.component-CTpK4NYn.js";
import "rxjs";
import "rxjs/operators";
import "class-variance-authority";
import "clsx";
import "front-matter";
import "marked-gfm-heading-id";
import "marked";
import "marked-mangle";
import "marked-highlight";
import "prismjs";
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
function FeaturedBlogPreviewComponent_a_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 1)(1, "div", 2)(2, "h4", 3);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 4);
    __text(5);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __property("routerLink", "/blog/" + ctx_r0.article.slug);
    __advance(3);
    __textInterpolate1(" ", ctx_r0.article.title, "");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.article.teaser, " ");
  }
}
const _FeaturedBlogPreviewComponent = class _FeaturedBlogPreviewComponent {
};
_FeaturedBlogPreviewComponent.ɵfac = function FeaturedBlogPreviewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FeaturedBlogPreviewComponent)();
};
_FeaturedBlogPreviewComponent.ɵcmp = /* @__PURE__ */ __defineComponent({ type: _FeaturedBlogPreviewComponent, selectors: [["app-featured-blog-preview"]], hostAttrs: [1, "flex", "flex-1"], inputs: { article: "article" }, standalone: true, features: [__StandaloneFeature], decls: 1, vars: 1, consts: [["class", "transform hover:scale-[1.01] transition-all rounded-xl w-full bg-gradient-to-r p-1 from-[#f43f5e] to-[#e11d48] hover:from-[#e11d48] hover:to-[#9f1239]", 3, "routerLink", 4, "ngIf"], [1, "transform", "hover:scale-[1.01]", "transition-all", "rounded-xl", "w-full", "bg-gradient-to-r", "p-1", "from-[#f43f5e]", "to-[#e11d48]", "hover:from-[#e11d48]", "hover:to-[#9f1239]", 3, "routerLink"], [1, "flex", "flex-col", "h-full", "bg-popover", "rounded-lg", "p-4"], [1, "text-base", "font-semibold", "tracking-tight", "text-foreground"], [1, "mt-2", "mb-6", "text-sm", "text-muted-foreground"]], template: function FeaturedBlogPreviewComponent_Template(rf, ctx) {
  if (rf & 1) {
    __template(0, FeaturedBlogPreviewComponent_a_0_Template, 6, 3, "a", 0);
  }
  if (rf & 2) {
    __property("ngIf", ctx.article);
  }
}, dependencies: [CommonModule, NgIf, RouterLink], encapsulation: 2 });
let FeaturedBlogPreviewComponent = _FeaturedBlogPreviewComponent;
const _c0 = () => [];
function HomeComponent_app_featured_blog_preview_4_Template(rf, ctx) {
  if (rf & 1) {
    __element(0, "app-featured-blog-preview", 4);
  }
  if (rf & 2) {
    const article_r1 = ctx.$implicit;
    __property("article", article_r1.attributes);
  }
}
const _HomeComponent = class _HomeComponent {
  constructor() {
    this.blogArticles = injectContentFiles().reverse().filter((_, i) => i < 3);
  }
};
_HomeComponent.ɵfac = function HomeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HomeComponent)();
};
_HomeComponent.ɵcmp = /* @__PURE__ */ __defineComponent({ type: _HomeComponent, selectors: [["home"]], standalone: true, features: [__StandaloneFeature], decls: 5, vars: 2, consts: [["title", "Hi, I'm Aaron", "intro", "Fullstack Developer // Angular & Java work // Analogjs & AI for fun // Life tangents for sanity"], [1, "mt-12", "text-2xl", "tracking-tight", "sm:text-3xl"], [1, "mt-6", "w-full", "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-4"], [3, "article", 4, "ngFor", "ngForOf"], [3, "article"]], template: function HomeComponent_Template(rf, ctx) {
  if (rf & 1) {
    __element(0, "app-page-header", 0);
    __elementStart(1, "h2", 1);
    __text(2, " Featured Posts");
    __elementEnd();
    __elementStart(3, "div", 2);
    __template(4, HomeComponent_app_featured_blog_preview_4_Template, 1, 1, "app-featured-blog-preview", 3);
    __elementEnd();
  }
  if (rf & 2) {
    let tmp_0_0;
    __advance(4);
    __property("ngForOf", (tmp_0_0 = ctx.blogArticles) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : __pureFunction0(1, _c0));
  }
}, dependencies: [FeaturedBlogPreviewComponent, NgForOf, PageHeaderComponent], encapsulation: 2 });
let HomeComponent = _HomeComponent;
export {
  HomeComponent as default
};
