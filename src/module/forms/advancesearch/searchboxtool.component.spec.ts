import { SearchboxtoolComponent } from './searchboxtool.component';
import { IconLoaderService } from '../../../index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { AmexioButtonComponent } from './../buttons/button.component';
import { AmexioFormIconComponent } from './../icon/icon.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('searchboxtool ', () => {
  let comp: SearchboxtoolComponent;
  let fixture: ComponentFixture<SearchboxtoolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchboxtoolComponent, AmexioFormIconComponent, AmexioButtonComponent],
      providers: [IconLoaderService, CommonDataService, HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(SearchboxtoolComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  });

  it('true is true', () =>
    expect(true).toBe(true));

    it('onSelectClick()', () => {
      comp.advanceSearchFlag = false;
    });

  it('set data', () => {
    let value = '';
    comp._data = value;
    expect(comp._data).toEqual(value);

    comp['componentLoaded'] = true;
    expect(comp['componentLoaded']).toEqual(true);
    comp.updateComponent();
  });

  //
  it('selectedValueOnFocus()', () => {
    comp.selectedValueOnFocus();
    expect(comp.selectedValue).not.toBeNull
    comp.viewData = [];
   });

   it('navigateKeys()', () => {
     let event1 = {keyCode: 40}
     comp.viewData = [{selected: 'Mumbai'},{ selected: 'Pune'}]
     let len = comp.viewData.length;
    comp.navigateKeys(event1);
   comp.selectedindex = 44
 
   // //put1
   expect(comp.selectedindex).toBeGreaterThan(comp.viewData.length);  

     comp.selectedindex = 0;
     
     expect(event1.keyCode).toEqual(40);
     comp.selectedindex = 1;
 
     //put2
     expect(comp.selectedindex).toBeLessThan(comp.viewData.length)
     comp.navigateKeysCondition(event1);
     
     event1.keyCode = 13;
     comp.viewData[comp.selectedindex] = {selected: 'Delhi'}
     expect(event1.keyCode).toEqual(13);
     expect(comp.viewData[comp.selectedindex]).not.toBeNull;
     comp.onItemSelect(comp.viewData[comp.selectedindex]);
  });
});
