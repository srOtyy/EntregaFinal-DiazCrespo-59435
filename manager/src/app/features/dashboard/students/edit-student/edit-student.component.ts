import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from '../../../../core/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, map, switchMap, Subject, Observable } from 'rxjs';
import { SnackbarServiceService } from '../../../../shared/snackbar-service.service';
import { ICourse, IStudent } from '../../../../shared/interface';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesListModalComponent } from '../courses-list-modal/courses-list-modal.component';
import {Store} from '@ngrx/store'
import { StudentActions } from '../store/student.actions';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.scss'
})
export class EditStudentComponent implements OnInit, OnDestroy {
  currentStudent: IStudent | null = null;
  currentStudent$: Observable<IStudent | null>

  studentCoursesList: ICourse[] = [];
  private destroy$ = new Subject<void>();
  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _snackbar: SnackbarServiceService,
    private _studentsService: StudentService,
    private _authService:AuthService,
    private store:Store
  ){
    this.currentStudent$ =this._authService.authStudent$
    this._authService.updateComponentName("edit-student")
  }

  ngOnInit(): void {
    this.loadStudent()
    this.loadStudentCourses()

  }

  private loadStudent(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map(params => params.get('id')),
      switchMap(id => this._studentsService.getObservable().pipe(
          map(students => students.find(student => student.id === id))
        )
      )
    ).subscribe({
      next: student => {
        if (student) {
          this.currentStudent = student
          this._studentsService.setCourses(this.currentStudent.courses)
        } else {
          this.handleStudentNotFound()
        }
      },
      error: err => {
        console.error("Error buscando al estudiante:", err)
        this._snackbar.openSnackBar("Error al cargar el estudiante", "Cerrar")
      }
    })
  }

  private loadStudentCourses(): void {
      this._studentsService.getArrayObservable().pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        data => this.studentCoursesList = data
      )
  }

  private handleStudentNotFound(): void {
    this._snackbar.openSnackBar("No se encontró al usuario", "Cerrar");
  }

  openModal(student: IStudent): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: student
    })
    dialogRef.afterClosed().subscribe()
  }
  openCoursesModal(): void {
    const dialogRef = this.dialog.open(CoursesListModalComponent, {
      data: this.currentStudent
    })
    dialogRef.afterClosed().subscribe()
  }
  leaveCourse(id: string){
    if(this.currentStudent){
      const newCoursesList = this.currentStudent.courses.filter(course => course != id)
      this.currentStudent.courses = newCoursesList
      this.store.dispatch(StudentActions.loadUpdateStudent({id: this.currentStudent.id, student: this.currentStudent}))
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
