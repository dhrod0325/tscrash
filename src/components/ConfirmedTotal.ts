import { $, calcTotalCountData } from '../lib/utils';
import { Component } from '../interfaces';
import { Summary } from '../types';

export class ConfirmedTotal implements Component {
  private $confirmedTotal;

  constructor() {
    this.$confirmedTotal = $('.confirmed-total');
  }

  setup(data: Summary): void {
    const count = calcTotalCountData(data, 'TotalConfirmed');

    this.setTotalConfirmedNumber(String(count));
  }

  setTotalConfirmedNumber(count: string) {
    this.$confirmedTotal.innerText = count;
  }
}
