import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasComponent } from './linhas.component';

describe('LinhasComponent', () => {
  let component: LinhasComponent;
  let fixture: ComponentFixture<LinhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinhasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
