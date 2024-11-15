import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { IStudent } from '../../../shared/interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  adminName: string = 'admin'
  adminEmail: string = 'admin@admin'
  user$: Observable<IStudent>
  userId: string = '5ac3'

  constructor( private _api:ApiService){
    this.user$ = this._api.findStudentById(this.userId)
  }
  
}
