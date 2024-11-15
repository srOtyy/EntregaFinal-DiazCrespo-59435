import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,OnDestroy{
  studentId: string | undefined

  constructor(
    private _authService:AuthService,
    private _router:Router,
  ){}
  
  private destroy$ = new Subject<void>(); //esto va a manejar las desuscripciones


  ngOnInit(): void {
    this.getStudentId()
    

  }
  getStudentId(){
    this._authService.authStudent$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      data => {
        this.studentId = data?.id
      }

    )
  }
  logout(){
    localStorage.removeItem('token')
    this._authService.logout()
    this._router.navigate(['auth'])
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
