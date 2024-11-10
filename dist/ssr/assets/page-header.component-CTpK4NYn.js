import { ɵ as __defineComponent, a as __StandaloneFeature, h as __elementStart, i as __text, j as __elementEnd, l as __advance, m as __textInterpolate1, C as CommonModule } from "../main.server.js";
const _PageHeaderComponent = class _PageHeaderComponent {
  constructor() {
    this.title = "";
    this.intro = "";
  }
};
_PageHeaderComponent.ɵfac = function PageHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PageHeaderComponent)();
};
_PageHeaderComponent.ɵcmp = /* @__PURE__ */ __defineComponent({ type: _PageHeaderComponent, selectors: [["app-page-header"]], hostAttrs: [1, "block"], inputs: { title: "title", intro: "intro" }, standalone: true, features: [__StandaloneFeature], decls: 4, vars: 2, consts: [[1, "text-4xl", "tracking-tight", "sm:text-5xl"], [1, "mt-6", "text-base", "text-muted-foreground"]], template: function PageHeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "h1", 0);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 1);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __textInterpolate1(" ", ctx.title, "");
    __advance(2);
    __textInterpolate1(" ", ctx.intro, " ");
  }
}, dependencies: [CommonModule], encapsulation: 2 });
let PageHeaderComponent = _PageHeaderComponent;
export {
  PageHeaderComponent as P
};
