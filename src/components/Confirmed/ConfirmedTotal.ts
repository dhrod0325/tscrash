import { Component } from '../../interfaces';
import { Summary, TotalCounterProp } from '../../types';
import { $, calcTotalCountData } from '../../lib/utils';

export class ConfirmedTotal implements Component {
  private readonly CONTAINER_SELECTOR = '.confirmed-total';

  private readonly PROP_KEY: TotalCounterProp = 'TotalConfirmed';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  public setup(data: Summary): void {
    const count = calcTotalCountData(data, this.PROP_KEY);
    this.setHtml(String(count));
  }

  private setHtml(count: string): void {
    this.$container.innerText = count;
  }
}
