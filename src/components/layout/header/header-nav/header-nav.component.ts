import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {HeaderNavLinkComponent} from "./header-nav-link/header-nav-link.component";

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderNavLinkComponent],
  host: {
    class: 'relative z-10 flex items-center gap-16'
  },
  template: `
      <a aria-label="Home" routerLink="/">
      <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
       class="hover:delay-[0ms] delay-150 transition-colors hover:text-rose-400 text-rose-500 w-6 h-6">
        <!-- Top Circle -->
        <circle cx="60" cy="30" r="12" />
        <!-- Bottom Left Circle -->
        <circle cx="35" cy="80" r="12" />
        <!-- Bottom Right Circle -->
        <circle cx="85" cy="80" r="12" />
      </svg>

      </a>
      <div class="hidden lg:flex lg:gap-10">
        <app-header-nav-link href="/" title="Home"></app-header-nav-link>
        <app-header-nav-link href="/blog" title="Blog"></app-header-nav-link>
        <app-header-nav-link href="/contact" title="Contact"></app-header-nav-link>
      </div>
  `
})
export class HeaderNavComponent {

}
