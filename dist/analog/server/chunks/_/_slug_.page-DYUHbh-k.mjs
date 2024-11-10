import { ɵ as __defineComponent, a as __StandaloneFeature, d as __template, q as __pipe, e as __property, r as __pipeBind1, A as AnalogMarkdownComponent, s as AsyncPipe, N as NgIf, D as DatePipe, t as injectContent, n as injectContentFiles, h as __elementStart, i as __text, j as __elementEnd, b as __element, k as __advance, p as __textInterpolate1, u as __attribute } from './renderer.mjs';
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

function injectActiveContentMetadata(route) {
  const file = injectContentFiles().find((contentFile) => {
    console.log({ contentFile });
    return contentFile.filename === `/src/content/${route.params["slug"]}.md` || contentFile.slug === route.params["slug"];
  });
  return file.attributes;
}
const postTitleResolver = (route) => injectActiveContentMetadata(route).title;
const postMetaResolver = (route) => {
  const ContentMetadata = injectActiveContentMetadata(route);
  return [
    {
      name: "description",
      content: ContentMetadata.teaser
    },
    {
      name: "author",
      content: "Analog Team"
    },
    {
      property: "og:title",
      content: ContentMetadata.title
    },
    {
      property: "og:description",
      content: ContentMetadata.teaser
    }
  ];
};
function BlogPostComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div")(1, "h1", 1);
    __text(2);
    __elementEnd();
    __elementStart(3, "time", 2);
    __pipe(4, "date");
    __text(5);
    __pipe(6, "date");
    __elementEnd();
    __element(7, "analog-markdown", 3);
    __elementEnd();
  }
  if (rf & 2) {
    const post_r1 = ctx.ngIf;
    __advance(2);
    __textInterpolate1(" ", post_r1.attributes.title, " ");
    __advance();
    __attribute("datetime", __pipeBind1(4, 4, post_r1.attributes.date));
    __advance(2);
    __textInterpolate1(" ", __pipeBind1(6, 6, post_r1.attributes.date), "");
    __advance(2);
    __property("content", post_r1.content);
  }
}
const routeMeta = {
  title: postTitleResolver,
  meta: postMetaResolver
};
const _BlogPostComponent = class _BlogPostComponent2 {
  constructor() {
    this.post$ = injectContent();
    console.log(this.post$);
  }
};
_BlogPostComponent.\u0275fac = function BlogPostComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BlogPostComponent)();
};
_BlogPostComponent.\u0275cmp = /* @__PURE__ */ __defineComponent({ type: _BlogPostComponent, selectors: [["ng-component"]], hostAttrs: [1, "max-w-screen-md", "relative", "py-6", "lg:gap-10", "lg:py-8"], standalone: true, features: [__StandaloneFeature], decls: 2, vars: 3, consts: [[4, "ngIf"], [1, "mt-6", "text-4xl", "font-bold", "tracking-tight", "sm:text-5xl"], [1, "order-first", "flex", "items-center", "text-base", "text-rose-500"], [1, "pt-8", "!max-w-screen-lg", "sm:pt-12", "prose", "dark:prose-invert", 3, "content"]], template: function BlogPostComponent_Template(rf, ctx) {
  if (rf & 1) {
    __template(0, BlogPostComponent_div_0_Template, 8, 8, "div", 0);
    __pipe(1, "async");
  }
  if (rf & 2) {
    __property("ngIf", __pipeBind1(1, 1, ctx.post$));
  }
}, dependencies: [
  AnalogMarkdownComponent,
  AsyncPipe,
  NgIf,
  DatePipe
], encapsulation: 2 });
let BlogPostComponent = _BlogPostComponent;

export { BlogPostComponent as default, routeMeta };
//# sourceMappingURL=_slug_.page-DYUHbh-k.mjs.map
