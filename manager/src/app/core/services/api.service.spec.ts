import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service'; 
import { environment } from '../../../environments/environment';

describe('Api service', () => {
    let service: ApiService
    let httpMock: HttpTestingController
    const baseURL = environment.apiBaseURL

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ApiService]
        })

        service = TestBed.inject(ApiService)
        httpMock = TestBed.inject(HttpTestingController)
    })
    // students
    it("getStudents: Deberia devolver (en Observable) un array con estudiantes", () => {
        const mockData = [
            {
            "id": "93c8",
            "name": "Octavio Nahuel Diaz Crespo",
            "email": "oty@outlook.com",
            "courses": [
                "1f2s"
            ],
            "token": "123456"
            }
        ]

        service.getStudents().subscribe(data => {
            expect(data).toEqual(mockData)
        })

        const req = httpMock.expectOne({
            url: `${baseURL}/students`,
            method: 'GET'
        }) 
        req.flush(mockData)
    })
    it("addStudent: Deberia devolver (en Observable) el estudiante creado", ()=>{
        const mockStudentData = {
            name: "mockName",
            email:"mock@mail.com",
            token: "123456asdsadda",
            courses: []

        }
        const mockData = {
            name: "mockName",
            email:"mock@mail.com",
            token: "123456asdsadda",
            id:"1234",
            courses: []
        }
        service.addStudent(mockStudentData).subscribe( data => {
            expect(data).toEqual(mockData)
        })
        const req = httpMock.expectOne({
            url: `${baseURL}/students`,
            method: 'POST',

        })
        expect(req.request.body).withContext("El contenido del body no es el correcto").toEqual({
            name: "mockName",
            email: "mock@mail.com",
            token: "123456asdsadda",
            courses: []
          });
        
        req.flush(mockData)
    }) 
    it("deleteStudent: Deberia devolver (en Observable) el estudiante eliminado", ()=>{
        const mockDeleteStudent = {
            name: "mockName",
            email:"mock@mail.com",
            token: "123456asdsadda",
            id:"1234",
            courses: []
        }
        const idStudent = "1234"

        service.deleteStudent(idStudent).subscribe( data => {
            expect(data).toEqual(mockDeleteStudent)
        })
        const req = httpMock.expectOne({
            url: `${baseURL}/students/${idStudent}`,
            method: 'DELETE',
        })
        req.flush(mockDeleteStudent)
    })
    it("updateStudent: Deberia devolver (en Observable) el estudiante actualizado", ()=> {
        const newName = "mockNewName"
        const mockStudent = {
            name: "mockName",
            email:"mock@mail.com",
            token: "123456asdsadda",
            id:"1234",
            courses: []
        }
        const mockNewStudent = {
            name: newName,
            email:"mock@mail.com",
            token: "123456asdsadda",
            id:"1234",
            courses: []
        }
        //primero creamos el estudiante para poder actualizarlo mas adelante
        service.addStudent(mockStudent).subscribe( data => {
            expect(data).toEqual(mockStudent)
        })
        
        const req1 = httpMock.expectOne({
            url: `${baseURL}/students`,
            method: 'POST',

        })
        req1.flush(mockStudent)


        mockStudent.name = newName
        service.updateStudent(mockStudent.id, mockStudent).subscribe(data => {
            expect(data).withContext("No devolveo el usuario actualizado").toEqual(mockNewStudent)
        })
        const req2 = httpMock.expectOne({
            url: `${baseURL}/students/${mockStudent.id}`,
            method: 'PATCH',

        })
        expect(req2.request.body).withContext("El body de la req es erroneo").toEqual({
            name: newName,
            email: "mock@mail.com",
            token: "123456asdsadda",
            courses: [],
            id: "1234"
          });
        req2.flush(mockNewStudent)

    })
    //courses
    it("getCourses: Deberia devolver (en Observable) un array de cursos", ()=>{
        const mockData = [
            {            
                name:"nomobre",
                id:"1234",
                category: "categoria",
                professor: "profesor",
                classes: [],
                description: "descripcion",
                comissions: []
            }
        ]

        service.getCourses().subscribe(data => {
            expect(data).toEqual(mockData)
        })

        const req = httpMock.expectOne({
            url: `${baseURL}/courses`,
            method: 'GET'
        }) 
        req.flush(mockData)
    })
    it("addCourses: Deberia devolver (en Observable) el curso creado", ()=> {
        const mockCourse = {            
            name:"nomobre",
            category: "categoria",
            professor: "profesor",
            classes: [],
            description: "descripcion",
            comissions: []
        }
        const mockCourseCreated = {
            name:"nomobre",
            category: "categoria",
            professor: "profesor",
            classes: [],
            description: "descripcion",
            comissions: [],
            id: "1234"
        }
        service.addCourses(mockCourse).subscribe( data => {
            expect(data).toEqual(mockCourseCreated)
        })
        const req = httpMock.expectOne({
            url: `${baseURL}/courses`,
            method: 'POST',

        })
        expect(req.request.body).withContext("El contenido del body no es el correcto").toEqual({            
            name:"nomobre",
            category: "categoria",
            professor: "profesor",
            classes: [],
            description: "descripcion",
            comissions: []
        });
        
        req.flush(mockCourseCreated)
    })
    it("deleteCourse: Deberia devolver (en Observable) el curso eliminado", ()=>{
        const mockDeleteCourse = {
           name:"nomobre",
            category: "categoria",
            professor: "profesor",
            classes: [],
            description: "descripcion",
            comissions: [],
            id: "1234"
        }
        const idCourse = "1234"

        service.deleteCourses(idCourse).subscribe( data => {
            expect(data).toEqual(mockDeleteCourse)
        })
        const req = httpMock.expectOne({
            url: `${baseURL}/courses/${idCourse}`,
            method: 'DELETE',
        })
        req.flush(mockDeleteCourse)
    })
    it("updateStudent: Deberia devolver (en Observable) el estudiante actualizado", ()=> {
        const newName = "mockNewName"
        const mockCourse = {
            name:"nomobre",
            category: "categoria",
            professor: "profesor",
            classes: [],
            description: "descripcion",
            comissions: [],
            id: "1234"
        }
        const mockNewCourse = {
            name: newName,
            category: "categoria",
            professor: "profesor",
            classes: [],
            description: "descripcion",
            comissions: [],
            id: "1234"
        }

        //primero creamos el curso para poder actualizarlo mas adelante
        service.addCourses(mockCourse).subscribe( data => {
            expect(data).toEqual(mockCourse)
        })
        
        const req1 = httpMock.expectOne({
            url: `${baseURL}/courses`,
            method: 'POST',

        })
        req1.flush(mockCourse)


        mockCourse.name = newName
        service.updateCourses(mockCourse.id, mockCourse).subscribe(data => {
            expect(data).withContext("No devolvió el curso actualizado").toEqual(mockNewCourse)
        })
        const req2 = httpMock.expectOne({
            url: `${baseURL}/courses/${mockCourse.id}`,
            method: 'PATCH',

        })
        expect(req2.request.body).withContext("El body de la req es erroneo").toEqual({
            name: newName,
            category: "categoria",
            professor: "profesor",
            classes: [],
            description: "descripcion",
            comissions: [],
            id: "1234"
          });
        req2.flush(mockNewCourse)

    })
});
