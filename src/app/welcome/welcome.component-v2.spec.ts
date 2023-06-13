import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { WelcomeComponent } from './welcome.component';

describe('Welcome component', () => {
  let fixture: ComponentFixture<WelcomeComponent>;
  let userService: UserService;
  let userServiceStub: Partial<UserService>;
  let el: HTMLElement;

  beforeEach(() => {
    userServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User' },
    };

    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [{ provide: UserService, useValue: userServiceStub }],
    });

    fixture = TestBed.createComponent(WelcomeComponent);

    // UserService from the root injector
    userService = TestBed.inject(UserService);

    //  get the "welcome" element by CSS selector (e.g., by class name)
    el = fixture.nativeElement.querySelector('.welcome');
  });

  it('should welcome the user', () => {
    // Act
    fixture.detectChanges();

    // Assert
    const content = el.textContent;

    expect(content).toContain('Welcome');
    expect(content).toContain('Test User');
  });

  it('should welcome "Bubba"', () => {
    // Arrange
    userService.user.name = 'Bubba';

    // Act
    fixture.detectChanges();

    // Assert
    expect(el.textContent).toContain('Bubba');
  });

  it('should request login if not logged in', () => {
    // Arrange
    userService.isLoggedIn = false;

    // Act
    fixture.detectChanges();

    // Assert
    const content = el.textContent;

    expect(content).not.toContain('Welcome');
    expect(content).toMatch(/log in/i);
  });
});
