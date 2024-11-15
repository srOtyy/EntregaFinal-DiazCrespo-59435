import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses.service';
import { ICourse,IStudent } from '../../../../shared/interface';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { map,Observable } from 'rxjs';
import { SnackbarServiceService } from '../../../../shared/snackbar-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  course: ICourse | null = null
  registration: boolean = true //esto va a habilitar/deshabilitar el formulario de inscripcion 
  currentStudent$: Observable<IStudent | null>
  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private _coursesSservice: CoursesService,
    private _auth:AuthService,
    private _snackbar: SnackbarServiceService
  ){
    this.currentStudent$ =this._auth.authStudent$
    this._auth.updateComponentName("details")
  }

  ngOnInit(): void {
    const idParam: string | null = this.route.snapshot.paramMap.get('id')
    if(idParam){
      this._coursesSservice.getObservable().pipe(
        map( courses => courses.find(course => course.id === idParam))
      ).subscribe(
        data => {
          if(data){
            this.course = data
          }else{
            this._snackbar.openSnackBar("No se encontro el curso","Ok")
          }
        }
      )
      this.registrationQuery(idParam)
    }else{
      this._snackbar.openSnackBar("No se encontro el curso","Ok")
    }
  }
  //Si el usuario está inscripto al curso, se inhaiblita el componente inscription
  registrationQuery(id: string){
    this._auth.authStudent$.subscribe(data => {
      data?.courses.forEach(courseId => {
        if(courseId === id){
          this.registration = false
        }
      })
    })
  }
  

}
