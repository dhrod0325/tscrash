import { $ } from '../lib/utils';
import { Summary } from '../types';
import { Component } from '../interfaces';

export class LastUpdateTime implements Component {
  private $lastUpdatedTime;

  constructor() {
    this.$lastUpdatedTime = $('.last-updated-time');
  }

  setup(data: Summary): void {
    this.setLastUpdatedTimestamp(data);
  }

  setLastUpdatedTimestamp(data: Summary) {
    this.$lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
  }
}
