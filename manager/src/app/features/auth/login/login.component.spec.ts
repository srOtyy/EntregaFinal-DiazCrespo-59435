import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '../../../core/services/auth.service';

describe('Componente login', () => {
    let component: LoginComponent; 
    let fixture: ComponentFixture<LoginComponent>; 

    beforeEach(async () => { 
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientTestingModule, SharedModule,BrowserAnimationsModule],    
            providers: [
                provideHttpClientTesting(),
                provideMockStore({}), 
                AuthService
            ]
        }).compileComponents();
    });

    beforeEach(() => { 
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); 
    });

    

    it('Deberia crearse el componente', () => {
        expect(component).withContext('El componente no se creó correctamente').toBeTruthy();
    });

    it('Registering y accesDenied deberian empezar en false', () => {
        expect(component.registering).toBeFalse()
        expect(component.accesDenied).toBeFalse()
    });

    it('Deberia cambiar el estado de la variable "registering"', () => {
        expect(component.registering).toBeFalse()
        component.changeForm()
        expect(component.registering).toBeTrue()

    });
    it('Loginform: Deberia denegar acceso si el formulario es invalido',()=>{
        component.loginForm.setValue({
          email: '',
          name: ''  
        })

        component.sendForm()
        expect(component.accesDenied).toBeTrue()
    })
    it('Loginform: Deberia resetear y marcar los inputs si el formulario es invalido',()=>{
        component.loginForm.setValue({
          email: '',
          name: ''  
        })
        const spyReset = spyOn(component.loginForm, 'reset')
        const spyMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched')

        component.sendForm()
        expect(spyReset).toHaveBeenCalled()
        expect(spyMarkAllAsTouched).toHaveBeenCalled()
    })
    it('RegisterForm: Deberia cambiar de formulario cuando se termina de crear un usuario', ()=>{
        component.registerForm.setValue({
            email: 'email@email',
            name: 'hola',
            token:'1234545',
            courses: []
        })
        const spyChangeForm = spyOn(component, 'changeForm')
        
        component.createNewUser()
        expect(spyChangeForm).toHaveBeenCalled()

    })
    it('Deberia renderizarse el LoginForm', ()=>{
        // component.registering = false
        // fixture.detectChanges()

        const loginFormDiv = fixture.debugElement.query(By.css(".div-login"))
        const registerFormDiv = fixture.debugElement.query(By.css(".div-registro"))

        expect(loginFormDiv).toBeTruthy()
        expect(registerFormDiv).toBeFalsy()
    })
    it('Deberia renderizarse el RegisterForm', ()=>{
        component.registering = true
        fixture.detectChanges()

        const loginFormDiv = fixture.debugElement.query(By.css(".div-login"))
        const registerFormDiv = fixture.debugElement.query(By.css(".div-registro"))

        expect(loginFormDiv).toBeFalsy()
        expect(registerFormDiv).toBeTruthy()
    })

    
});