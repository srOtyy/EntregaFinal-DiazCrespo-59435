import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';
import { ICourse } from '../../../../shared/interface';
import { SnackbarServiceService } from '../../../../shared/snackbar-service.service';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrl: './course-container.component.scss'
})
export class CourseContainerComponent implements OnInit{
  @Input() list: string[] = [] // la lista (list) que recibe son ID's, por lo que en getCourses() buscamos los cursos x id 
  coursesList: ICourse[] = []
  constructor(
    private _courseService: CoursesService,
     private _snackbar: SnackbarServiceService){}
  ngOnInit(): void {
    this.getCourses()
  }
  getCourses(){
    this.list.forEach( id =>{
      this._courseService.findCourseById(id).subscribe({
        next: course => {
          if(course){
            this.coursesList.push(course)
          }else{
            console.log("No se encontró el curso")
          }
        }
      })
    })
  }
  
}
