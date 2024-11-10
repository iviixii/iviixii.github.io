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
      intro="Please reach out if have things you would like to discuss me"
    />
    <p>You can contact me through my <a href="aaronmadved@gmail.com">email</a> or socials down below:</p>

    <h2 class="mt-12 text-2xl tracking-tight sm:text-3xl">Other contacts</h2>

    <div class="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <p><a href="https://www.linkedin.com/in/aaron-madved">Linkden</a></p>
      <p><a href="https://github.com/iviixii">Github</a></p>
    </div>
  `,
})
export default class HomeComponent {}
