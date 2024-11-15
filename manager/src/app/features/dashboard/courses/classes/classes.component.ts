import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../../../shared/interface';
import { CoursesService } from '../../../../core/services/courses.service';
import { map, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { SnackbarServiceService } from '../../../../shared/snackbar-service.service';
import {Store} from '@ngrx/store'
import { CoursesActions } from '../store/course.actions';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit{
  courseId: string = ''
  course: ICourse | undefined = undefined
  
  readonly dialog = inject(MatDialog);
  private suscription: Subscription | null = null; 

  constructor(
    private route: ActivatedRoute,
    private _coursesService: CoursesService,
    private store:Store,
    private _authService:AuthService
  ) {
    this._authService.updateComponentName("classes")
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      id ? this.courseId = id : this.courseId = ''
      this.suscribe()
    })
    
  }
  
  ngOnDestroy(): void {
    this.unsuscribe()
  }
  suscribe():void{
    this.suscription = this._coursesService.getObservable().pipe(
      map(courses => courses.find( course =>  course.id === this.courseId))
    ).subscribe({
      next: data => {
        this.course = data
      },
      error: error=> console.log("error en la suscripcion",error)
    })
  }
  unsuscribe():void{
    if(this.suscription){
      this.suscription.unsubscribe()
      this.suscription = null
    }
  }
  deleteClass(index: number){
    if(this.course){
      this.course.classes.splice(index,1)
      this.store.dispatch(CoursesActions.loadDeleteClasssCourse({course: this.course}))

    }
  }
  openModal(id: string, topic?: string): void {
    if(topic){//editando
      const dialogRef = this.dialog.open(ModalFormComponent,{
        data: {id, topic}
      });
      dialogRef.afterClosed().subscribe();
     
    }else{//creando
      const dialogRef = this.dialog.open(ModalFormComponent,{
        data: {id}
      });
      dialogRef.afterClosed().subscribe();

    }
  }
}
