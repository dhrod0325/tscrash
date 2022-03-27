import { $, getDateString } from '../lib/utils';
import { Summary } from '../types';
import { Component } from '../interfaces';

export class LastUpdateTime implements Component {
  private readonly $lastUpdatedTime: HTMLElement;

  constructor() {
    this.$lastUpdatedTime = $('.last-updated-time');
  }

  public setup(data: Summary): void {
    this.update(data);
  }

  private update(data: Summary) {
    this.$lastUpdatedTime.innerText = getDateString(data.Date);
  }
}
