import { Component } from '@angular/core';
import { Route } from '@core/enums/route.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  Route = Route;
}
