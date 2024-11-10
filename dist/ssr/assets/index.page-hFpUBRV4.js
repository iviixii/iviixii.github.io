import { ɵ as __defineComponent, a as __StandaloneFeature, b as __element, h as __elementStart, i as __text, j as __elementEnd } from "../main.server.js";
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
const _HomeComponent = class _HomeComponent {
};
_HomeComponent.ɵfac = function HomeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HomeComponent)();
};
_HomeComponent.ɵcmp = /* @__PURE__ */ __defineComponent({ type: _HomeComponent, selectors: [["contact"]], standalone: true, features: [__StandaloneFeature], decls: 15, vars: 0, consts: [["title", "Contact", "intro", "Please reach out if have things you would like to discuss me"], ["href", "aaronmadved@gmail.com"], [1, "mt-12", "text-2xl", "tracking-tight", "sm:text-3xl"], [1, "mt-6", "w-full", "grid", "grid-cols-1", "sm:grid-cols-2", "md:grid-cols-3", "gap-4"], ["href", "https://www.linkedin.com/in/aaron-madved"], ["href", "https://github.com/iviixii"]], template: function HomeComponent_Template(rf, ctx) {
  if (rf & 1) {
    __element(0, "app-page-header", 0);
    __elementStart(1, "p");
    __text(2, "You can contact me through my ");
    __elementStart(3, "a", 1);
    __text(4, "email");
    __elementEnd();
    __text(5, " or socials down below:");
    __elementEnd();
    __elementStart(6, "h2", 2);
    __text(7, "Other contacts");
    __elementEnd();
    __elementStart(8, "div", 3)(9, "p")(10, "a", 4);
    __text(11, "Linkden");
    __elementEnd()();
    __elementStart(12, "p")(13, "a", 5);
    __text(14, "Github");
    __elementEnd()()();
  }
}, dependencies: [PageHeaderComponent], encapsulation: 2 });
let HomeComponent = _HomeComponent;
export {
  HomeComponent as default
};
