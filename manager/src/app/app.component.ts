import { Component, OnInit} from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  componentName: string = 'home'
  constructor(private _authService:AuthService ){}

  ngOnInit(): void {
    this._authService.componentName$.subscribe(
      data => this.componentName = data
    )
  }

}
