import { ɵ as __defineComponent, a as __StandaloneFeature, b as __element, h as __elementStart, i as __text, j as __elementEnd } from './renderer.mjs';
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

const _HomeComponent = class _HomeComponent2 {
};
_HomeComponent.\u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HomeComponent)();
};
_HomeComponent.\u0275cmp = /* @__PURE__ */ __defineComponent({ type: _HomeComponent, selectors: [["contact"]], standalone: true, features: [__StandaloneFeature], decls: 16, vars: 0, consts: [["title", "Contact", "intro", "Feel free to reach out if you'd like to discuss consulting opportunities or collaborate on projects."], ["href", "mailto:aaronmadved@gmail.com", 1, "text-rose-500", "hover:text-rose-400", "hover:underline", "focus:underline"], [1, "mt-12", "text-2xl", "tracking-tight", "sm:text-3xl"], [1, "mt-6", "w-full", "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-4"], ["href", "https://www.linkedin.com/in/aaron-madved", 1, "text-rose-500", "hover:text-rose-400", "focus:text-red-600", "focus:underline"], [1, "mt-5"], ["href", "https://github.com/iviixii", 1, "text-rose-500", "hover:text-rose-400", "hover:underline", "focus:underline"]], template: function HomeComponent_Template(rf, ctx) {
  if (rf & 1) {
    __element(0, "app-page-header", 0);
    __elementStart(1, "p");
    __text(2, " You can contact me through my ");
    __elementStart(3, "a", 1);
    __text(4, " email ");
    __elementEnd();
    __text(5, " or socials down below: ");
    __elementEnd();
    __elementStart(6, "h2", 2);
    __text(7, "Other contacts");
    __elementEnd();
    __elementStart(8, "div", 3)(9, "ol")(10, "li")(11, "a", 4);
    __text(12, " LinkedIn ");
    __elementEnd()();
    __elementStart(13, "li", 5)(14, "a", 6);
    __text(15, " GitHub ");
    __elementEnd()()()();
  }
}, dependencies: [PageHeaderComponent], encapsulation: 2 });
let HomeComponent = _HomeComponent;

export { HomeComponent as default };
//# sourceMappingURL=index.page-gf7HpFAI.mjs.map
