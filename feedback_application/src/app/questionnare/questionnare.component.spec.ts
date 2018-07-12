import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnareComponent } from './questionnare.component';

describe('QuestionnareComponent', () => {
  let component: QuestionnareComponent;
  let fixture: ComponentFixture<QuestionnareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
