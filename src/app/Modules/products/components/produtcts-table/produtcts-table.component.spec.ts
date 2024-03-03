import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutctsTableComponent } from './produtcts-table.component';

describe('ProdutctsTableComponent', () => {
  let component: ProdutctsTableComponent;
  let fixture: ComponentFixture<ProdutctsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutctsTableComponent]
    });
    fixture = TestBed.createComponent(ProdutctsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
