import {RouterLink, RouterOutlet} from '@angular/router';
import {Component} from "@angular/core";
import {
  FeaturedBlogPreviewComponent
} from "../../components/blog/featured-blog-preview/featured-blog-preview.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {PageHeaderComponent} from "../../components/layout/page-header/page-header.component";
import {injectContentFiles} from "@analogjs/content";
import {ContentMetadata} from "../../lib/content-metadata/content-metadata";

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FeaturedBlogPreviewComponent, AsyncPipe, NgForOf, PageHeaderComponent],
  template: `
      <app-page-header
              title="Hi, I'm Aaron"
              intro="Fullstack Developer // Angular & Java work // Minimal software for fun // Life tangents for sanity"
     />

      <h2 class="mt-12 text-2xl tracking-tight sm:text-3xl">
          Featured Posts</h2>

      <div class="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <app-featured-blog-preview [article]="article.attributes"
                                     *ngFor="let article of blogArticles ?? []"/>
      </div>
  `,
})
export default class HomeComponent {
  public blogArticles = injectContentFiles<ContentMetadata>().reverse().filter((_, i) => i < 3)
}
