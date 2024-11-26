import {RouterLink, RouterOutlet} from '@angular/router';
import {Component} from "@angular/core";
import {AsyncPipe, NgForOf} from "@angular/common";
import {PageHeaderComponent} from "../../../components/layout/page-header/page-header.component";

@Component({
  selector: 'contact',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, NgForOf, PageHeaderComponent],
  template: `
    <app-page-header
      title="Contact"
      intro="Feel free to reach out if you'd like to discuss consulting opportunities or collaborate on projects."
    />
    <p>
      You can contact me through my
      <a 
        href="mailto:aaronmadved@gmail.com" 
        class="text-rose-500 hover:text-rose-400 hover:underline focus:underline"
      >
        email
      </a>
      or socials down below:
    </p>

    <h2 class="mt-12 text-2xl tracking-tight sm:text-3xl">Other contacts</h2>

    <div class="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <ol>
      <li>
        <a 
          href="https://www.linkedin.com/in/aaron-madved" 
          class="text-rose-500 hover:text-rose-400 focus:text-red-600 focus:underline"
        >
          LinkedIn
        </a>
      </li>
      <li class="mt-5">
        <a 
          href="https://github.com/iviixii" 
          class="text-rose-500 hover:text-rose-400 hover:underline focus:underline"
        >
          GitHub
        </a>
      </li>
    </ol>
    </div>
  `,
})
export default class HomeComponent {}
