import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CreditCard, CardTypes } from '../models/credit-card';


@Component({
  selector: 'edit-card-info',
  templateUrl: './edit-card-info.component.html',
  styleUrls: ['./edit-card-info.component.css']
})
export class EditCardInfoComponent implements OnInit {
  private openCard: number = -1;
  private selectedCardType: string;
  private preferredCard: number = 0;
  private CardTypes = CardTypes;

  @Input() form: FormGroup;
  @Input() cards: FormArray;
  @Input() preferred: FormControl;
  @Output() add = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() set = new EventEmitter<any>();

  ngOnInit() {
    this.cards.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });
  }
  getType(card) {
    return card.get('cardType').value === '' ? 'New' : CardTypes[card.get('cardType').value].viewValue;
  }

  setPreferred(index: number) {
    this.set.emit(index);
    this.preferredCard = index;
  }

  lastCardSaved(): boolean {
    if (!this.cards) { return false; }
    const cardArray = this.cards.getRawValue();
    if (cardArray.length === 0) { return true; }

    return (cardArray[cardArray.length - 1].hasOwnProperty('_id'));
  }

  addCard() {
    this.add.emit();
    this.openCard = this.cards.length - 1;
  }

  onSubmit(index: number) {
    //only can save if valid card.
    this.save.emit(index);
  }

  removeCard(index: number) {
    this.remove.emit(index);
    this.openCard = this.cards.length - 1;
  }

  toggleCard(index: number) {
    if (this.openCard === index) {
      this.openCard = -1;
      return;
    }
    this.openCard = index;
  }


  onValueChanged(data?: any) {
    if (!this.cards || this.openCard === -1) { return; }
    const form = this.cards.controls[this.openCard];

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'firstName': '',
    'lastName': '',
    'cardType': '',
    'cardNumber': '',
    'expiration': '',
    'csc': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First name is required.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'lastName': {
      'required': 'Last name is required.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'cardType': {
      'required': 'Card type is required.',
      'invalidNumber': 'Must select card type.'
    },
    'cardNumber': {
      'required': 'Card number is required.',
      'invalidNumber': 'Card length must be 16 digits long.'
    },
    'expiration': {
      'required': 'expiration is required.',
      'invalidNumber': 'Must match MM/YYYY, M/YY, or MM/YY '
    },
    'csc': {
      'required': 'csc is required.',
      'invalidNumber': 'CSC must be three digits'
    },
  };



}
