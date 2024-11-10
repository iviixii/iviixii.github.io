import { ɵ as __defineComponent, a as __StandaloneFeature, b as __element, R as RouterOutlet } from "../main.server.js";
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
const _BlogComponent = class _BlogComponent {
};
_BlogComponent.ɵfac = function BlogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BlogComponent)();
};
_BlogComponent.ɵcmp = /* @__PURE__ */ __defineComponent({ type: _BlogComponent, selectors: [["app-blog"]], standalone: true, features: [__StandaloneFeature], decls: 1, vars: 0, template: function BlogComponent_Template(rf, ctx) {
  if (rf & 1) {
    __element(0, "router-outlet");
  }
}, dependencies: [RouterOutlet], encapsulation: 2 });
let BlogComponent = _BlogComponent;
export {
  BlogComponent as default
};
