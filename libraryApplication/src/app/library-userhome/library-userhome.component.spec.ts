import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryUserhomeComponent } from './library-userhome.component';

describe('LibraryUserhomeComponent', () => {
  let component: LibraryUserhomeComponent;
  let fixture: ComponentFixture<LibraryUserhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryUserhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryUserhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
