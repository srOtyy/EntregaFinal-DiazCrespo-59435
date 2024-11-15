import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { StudentService } from '../../../../core/services/student.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { ICourse, IStudent } from '../../../../shared/interface';
import { map } from 'rxjs';
import {Store} from '@ngrx/store'
import { StudentActions } from '../store/student.actions';
@Component({
  selector: 'app-courses-list-modal',
  templateUrl: './courses-list-modal.component.html',
  styleUrl: './courses-list-modal.component.scss'
})
export class CoursesListModalComponent implements OnInit{
  courses: ICourse[] = []
  ids: string[] = []
  @ViewChild('course') course: MatSelectionList | null = null

  constructor(
    private dialogRef: MatDialogRef<CoursesListModalComponent>,
    private _coursesService: CoursesService,
    private store:Store,
    @Inject(MAT_DIALOG_DATA) public data: IStudent

  ){}
  ngOnInit(): void {
    this.ids = []
    this._coursesService.getObservable().pipe(
      map( courses => courses.filter( course => !this.data.courses.includes(course.id) ))
    ).subscribe(
      data => this.courses = data
    )
  }
  getSelectedCourses() {
    const selectedOptions = this.course?.selectedOptions.selected.map(option => option.value)
    selectedOptions?.forEach(id => this.ids.push(id))
  }
  addCourses(){
    this.getSelectedCourses()
    this.data.courses = [...this.data.courses, ...this.ids]
    this.store.dispatch(StudentActions.loadUpdateStudent({id: this.data.id, student: this.data}))
  
    this.close()
  }
  close():void{
    this.dialogRef.close()
  }
}
