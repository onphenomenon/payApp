import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardInfoComponent } from './edit-card-info.component';

describe('EditCardInfoComponent', () => {
  let component: EditCardInfoComponent;
  let fixture: ComponentFixture<EditCardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCardInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
