import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.signIn when loginUser is called', () => {
    spyOn(authService, 'signIn');
    component.email = 'test@example.com';
    component.password = 'testpassword';
    component.loginUser();
    expect(authService.signIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'testpassword',
    });
  });
});
