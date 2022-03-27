import { Component } from '../../interfaces';
import { Summary } from '../../types';
import { $, getDateString } from '../../lib/utils';

export class LastUpdateTime implements Component {
  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $('.last-updated-time');
  }

  public setup(data: Summary): void {
    this.update(data);
  }

  public setHtml(html: string): void {
    this.$container.innerText = html;
  }

  private update(data: Summary) {
    this.setHtml(getDateString(data.Date));
  }
}
