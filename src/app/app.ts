// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('workshop5');
// }
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation-component/navigation-component';

@Component({
selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HttpClientModule,
    NavigationComponent 
  ],
  templateUrl: './app.html',
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class App {
  protected readonly title = signal('workshop5');
}
