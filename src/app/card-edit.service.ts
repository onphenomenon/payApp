import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { CreditCard } from './models/credit-card';

@Injectable()
export class CardEditService {
  private cardUrl = '/api/cards';
  private getUrl = '/cards';

  constructor(private http: Http) {}

  getCards(): Observable<CreditCard[]> {
    return this.http.get(this.getUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(card: CreditCard): Observable<CreditCard> {
    return this.http.post(this.cardUrl, card)
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(card: CreditCard): Observable<CreditCard> {
    return this.http.delete(`${this.cardUrl}/${card._id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
