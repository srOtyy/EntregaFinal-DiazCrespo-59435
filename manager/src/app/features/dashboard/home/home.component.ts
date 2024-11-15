import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { IStudent } from '../../../shared/interface';
import { Store} from '@ngrx/store'
import { LogActions } from '../../auth/store/log.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  student: IStudent | null = null
  
  constructor(
    private store: Store,
    private _authService:AuthService){}

  ngOnInit(): void {
    this._authService.updateComponentName("home")
    this._authService.authStudent$.subscribe({
      next: (data) => {
        this.student = data;
        if (this.student) {
  
          this.store.dispatch(LogActions.loadCurrentUser({ id: this.student.id }));
        }
      },
      error: (err) => console.log("Error en la suscripción", err),
    });
  }
}
