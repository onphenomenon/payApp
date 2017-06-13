import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Http } from '@angular/http';
import { CardEditService } from './card-edit.service';
import { CreditCard, creditNumberValidator } from './models/credit-card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private form: FormGroup;
  cards;
  errorMessage;
  emptyCard: CreditCard = {
    firstName: '',
    lastName: '',
    cardType: '',
    cardNumber: '',
    expiration: '',
    csc: ''
  };

  constructor(private formBuilder: FormBuilder, private http: Http, private cardEditService: CardEditService) {
  }

  ngOnInit() {
    this.getCards();
    this.form = this.formBuilder.group({
      preferredCard: new FormControl('', [Validators.required]),
      cards: this.formBuilder.array([
      ]),
    });

    // (re)set validation messages now
  }

  setPreferred(index: number) {
    this.form.controls['preferredCard'].setValue(index);
  }
  getCards() {
    this.cardEditService.getCards().subscribe(
      (cards) => {
        if (cards.length === 0) {
          this.addCard();
        } else {
          const control = this.form.get('cards') as FormArray;
          cards.forEach((card) => {
            control.push(this.createCard(card));
          })
        }
      },
      error => this.errorMessage = <any>error
    )

  }

  resetCards(cards) {
    const control = this.form.get('cards') as FormArray;
    cards.forEach((card) => {
      control.push(this.createCard(card));
    })
  }
  createCard(cardObject: CreditCard = this.emptyCard) {
    const newGroup = this.formBuilder.group({
      firstName: new FormControl(cardObject.firstName || '', [
        Validators.required,
        Validators.maxLength(24)
      ]),
      lastName: new FormControl(cardObject.lastName || '', [
        Validators.required,
        Validators.maxLength(24)]),
      cardType: new FormControl(cardObject.cardType || '', [
        Validators.required,
        creditNumberValidator(/^[1-4]{1,1}$/)
      ]),
      cardNumber: new FormControl(cardObject.cardNumber || '', [Validators.required, creditNumberValidator(/^[0-9]{16,16}$/)]),
      expiration: new FormControl(cardObject.expiration || '', [
        Validators.required,
        creditNumberValidator(/^(1[0-2]|0[1-9]|\d)\/([2-9]\d[1-9]\d|[1-9]\d)$/)
      ]),
      csc: new FormControl(cardObject.csc || '', [
        Validators.required,
        Validators.maxLength(3),
        creditNumberValidator(/^[0-9]{3,3}$/)
      ])
    });
    if (cardObject._id) {
      newGroup.addControl('_id', new FormControl(cardObject._id))
    }
    return newGroup;
  }

  addCard() {
    const control = this.form.get('cards') as FormArray;
    const newCard = this.createCard();
    control.push(newCard);
  }
  saveCard(index: number) {
    const cardArray = this.form.get('cards') as FormArray;
    const arrayCard = cardArray.getRawValue();
    //when get cards back put new _.id on it
    this.cardEditService.create(arrayCard[index])
      .subscribe(
      (cards) => {
        this.cards = cards;
        cardArray.setControl(index, this.createCard(cards[index]))
      },
      error => this.errorMessage = <any>error);


  }

  removeCard(index: number) {
    const cardArray = this.form.get('cards') as FormArray;
    const arrayCard = cardArray.getRawValue();

    this.cardEditService.delete(arrayCard[index])
      .subscribe(
      (cards) => {
        this.cards = cards;
        cardArray.removeAt(index);
      },
      error => this.errorMessage = <any>error);
  }

}
