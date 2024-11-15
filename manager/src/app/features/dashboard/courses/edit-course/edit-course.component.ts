import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoursesService } from '../../../../core/services/courses.service';
import { IComission, ICourse } from '../../../../shared/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import {Store} from '@ngrx/store'
import { CoursesActions } from '../store/course.actions';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnDestroy{
  categorys: string[] = ['Programación','Diseño','Base de datos']
  comissions: IComission[] = []
  creating: boolean = true
  course: ICourse | undefined = undefined
  
  formulario: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    id: new FormControl(''),
    category: new FormControl('',[Validators.required]),
    professor: new FormControl('',[Validators.required,Validators.minLength(6)]),
    description: new FormControl('',[Validators.required, Validators.minLength(40),Validators.maxLength(220)]),
    classes: new FormControl([]),
    comissions: new FormControl([],[Validators.required]),

  })

  private destroy$ = new Subject<void>(); //esto va a manejar las desuscripciones
  
  constructor(private _coursesService:CoursesService,
    private route: ActivatedRoute,
    public router:Router,
    private _api:ApiService,
    private store:Store,
    private _authService:AuthService
  ){
    this._authService.updateComponentName("edit-course")
  }
  // agarramos el id y buscamos el curso (getObservable()) que concida con el id y lo asignamos a course
  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map(params => params.get('id')),
      switchMap(id => this._coursesService.getObservable().pipe(
          map(courses => courses.find(course => course.id === id))
        )
      )
    ).subscribe({
      next: data => {
        this.course = data;
        if (this.course) {
          this.formulario.patchValue(this.course);
          this.formulario.value.category = this.course.category;
          this.creating = false;
        }
      },
      error: err => console.log("Error en la búsqueda del curso a editar", err)
    });
    this.setComissions();
  }
  send():void{
    if(this.creating){
      this.addNewCourse()
    }else{
      if(this.course){
        this.updateCourse()
      }
    }
    this.close()
  }
  close():void{
    if(this.creating){
      this.router.navigate(['/dashboard/courses'])

    }else{
      this.router.navigate([`/dashboard/courses/details/${this.course?.id}`])

    } 
  }
  // ABM
  addNewCourse():void{
    const courseName = this.formulario.get('name')?.value
    this.formulario.patchValue({
      classes: [`Introducción a ${courseName}`] 
    });
    this.store.dispatch(CoursesActions.loadAddCourse({course: this.formulario.value}))

  }
  updateCourse():void{
    this.store.dispatch(CoursesActions.loadUpdateCourse({course: this.formulario.value}))
  }
  setComissions(){
    this._api.getAllComissions().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => this.comissions = data
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
