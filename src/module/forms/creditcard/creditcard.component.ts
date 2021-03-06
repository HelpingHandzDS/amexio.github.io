/*
**
Created By:Ankita
*/
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AmexioCreditCardModel } from './../creditcard/creditcardmodel.component';
const noop = () => {
};
@Component({
  selector: 'amexio-creditcard',
  templateUrl: './creditcard.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AmexioCreditcardComponent), multi: true,
  }],
  styleUrls: ['./creditcard.component.css'],
})
export class AmexioCreditcardComponent implements ControlValueAccessor, OnInit {
  /*
  Properties
  name : yearcount
  datatype : string
  version : 5.2.3onwards
  default :
  description : the minexp will set the dropdown to user defined dropdown.
  */
  @Input('year-count') yearcount = 12;
  creditCardModel: AmexioCreditCardModel;
  inp: string;
  cardName: any;
  cardPattern: any;
  isNameValid = false;
  isCvvValid = false;
  cardRegexMap: Map<any, string>;
  cardPatternMap: Map<any, string>;
  visaEagerReg: any = /^4/;
  visaReg: any = /^4\d{12}(\d{3}|\d{6})?$/;
  mastropattern: any = /^(?:5[06789]\d\d|(?!6011[0234])(?!60117[4789])(?!60118[6789])(?!60119)(?!64[456789])(?!65)6\d{3})\d{8,15}$/;
  masttroeagerPattern: any = /^(5(018|0[23]|[68])|6[37]|60111|60115|60117([56]|7[56])|60118[0-5]|64[0-3]|66)/;
  dankorteagerPattern: any = /^5019/;
  dankortpattern: any = /^5019\d{12}$/;
  masterpattern: any = /^5[1-5]\d{14}$/;
  mastereagerPattern: any = /^5[1-5]/;
  validEagerCardFromMap: any;
  validPatternCardFromMap: any;
  isFullCardValid = false;
  cvvRegex: any = /^[0-9]{3,4}$/;
  dateData: any;
  year: Date = new Date();
  currentYear: any;
  yearList: any[] = [];
  eagarflag: boolean;
  eagarValue = '';
  fullPatternValue = '';
  fullPatternflag: boolean;
  isValidFullString: boolean;
  // The internal dataviews model
  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // From ControlValueAccessor Interface
  writeValue(modelValue: any) {
    // let eagarflag: boolean;
    // let eagarValue = '';
    // let fullPatternValue = '';
    // let fullPatternflag: boolean;
    // Condition For Null Check
    if (modelValue) {
      this.creditCardModel = modelValue;
      this.isNameValid = true;
      this.isCvvValid = this.cvvRegex.test(this.creditCardModel.cvv);
      this.cardRegexMap.forEach((value: any, key: string) => {
        const isEagarValid = value.test(this.creditCardModel.cardnumber);
        if (isEagarValid) {
          this.eagarflag = isEagarValid;
          this.eagarValue = key;
        }
      });
      this.validEagerCardFromMap = this.eagarValue;
      this.switchCaseMethod();
      this.cardPatternMap.forEach((value: any, key: string) => {
        // Condition for Full String Regex
        this.isValidFullString = value.test(this.creditCardModel.cardnumber);
        if (this.isValidFullString) {
          this.fullPatternflag = this.isValidFullString;
          this.fullPatternValue = key;
        }

      });
      this.validPatternCardFromMap = this.fullPatternValue;
    }
  }
  // From ControlValueAccessor Interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor Interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // method to check owners length
  onNameClick(inp: any) {
    if (inp.length > 0) {
      this.isNameValid = true;
    } else {
      this.isNameValid = false;
    }
  }
  // method to check Cvv Number
  onClick(inpcvv: any) {
    this.isCvvValid = this.cvvRegex.test(inpcvv.model);
  }
  // method to check Card Number
  onInput(inp: any) {
    // Condition for null check
    if (inp.model !== '') {
      let fullPatternFlag: boolean;
      let fullPatternValue = '';
      this.cardPatternMap.forEach((value: any, key: string) => {
        // Condition for Full String Regex
       const isValidFullString = value.test(inp.model);
       if (isValidFullString) {
          fullPatternFlag = isValidFullString;
          fullPatternValue = key;
          }
      });
      this.validPatternCardFromMap = fullPatternValue;
      let eagarflag: boolean;
      let eagarValue = '';
      this.cardRegexMap.forEach((value: any, key: string) => {
        const isEagarValid = value.test(inp.model);
        if (isEagarValid) {
          eagarflag = isEagarValid;
          eagarValue = key;
        }
      });
      this.validEagerCardFromMap = eagarValue;
    } else {
      this.validEagerCardFromMap = '';
    }
    this.switchCaseMethod();
  }
  // Map Implementation for key value pair
  ngOnInit() {
    this.cardRegexMap = new Map();
    this.cardPatternMap = new Map();
    this.cardRegexMap.set('eagerflagvisa', this.visaEagerReg);
    this.cardRegexMap.set('mastereagerPattern', this.mastereagerPattern);
    this.cardRegexMap.set('masttroeagerPattern', this.masttroeagerPattern);
    this.cardPatternMap.set('visaReg', this.visaReg);
    this.cardPatternMap.set('masterpattern', this.masterpattern);
    this.cardPatternMap.set('mastropattern', this.mastropattern);
    this.cardName = '';
    this.currentYear = this.year.getFullYear();
    for (let i = 0; i < this.yearcount; i++) {
      this.yearList.push(this.currentYear + i);
    }
  }
  switchCaseMethod() {
    switch (this.validEagerCardFromMap) {
      case 'eagerflagvisa':
        this.cardName = 'fa fa-cc-visa';
        break;
      case 'mastereagerPattern':
        this.cardName = 'fa fa-cc-mastercard';
        break;
      case 'masttroeagerPattern':
        this.cardName = 'fa fa-credit-card';
        break;
      case '':
        this.cardName = '';
        break;
      default:
        this.cardName = '';
        break;
    }
  }
  constructor() {
    this.creditCardModel = new AmexioCreditCardModel();
    this.dateData = [
      {
        month: 'January',
      },
      {
        month: 'Feburary',
      },
      {
        month: 'March',
      },
      {
        month: 'April',
      },
      {
        month: 'May',
      },
      {
        month: 'June',
      },
      {
        month: 'July',
      },
      {
        month: 'August',
      },
      {
        month: 'September',
      },
      {
        month: 'October',
      },
      {
        month: 'November',
      },
      {
        month: 'December',
      },
    ];
  }
}
