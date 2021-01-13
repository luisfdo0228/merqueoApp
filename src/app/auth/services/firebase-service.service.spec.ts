import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FirebaseServiceService } from './firebase-service.service';

describe('FirebaseServiceService', () => {
  let component: FirebaseServiceService;
  let fixture: ComponentFixture<FirebaseServiceService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FirebaseServiceService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
