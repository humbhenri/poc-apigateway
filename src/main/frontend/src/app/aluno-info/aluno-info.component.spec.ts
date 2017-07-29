import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoInfoComponent } from './aluno-info.component';

describe('AlunoInfoComponent', () => {
  let component: AlunoInfoComponent;
  let fixture: ComponentFixture<AlunoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
