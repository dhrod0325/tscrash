import { Country, Summary, TotalCounterProp } from '../../types';
import { $, calcTotalCountData } from '../../lib/utils';

export class RecoveredTotal {
  private readonly CONTAINER_SELECTOR = '.recovered';

  private readonly PROP_KEY: TotalCounterProp = 'TotalRecovered';

  private readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  loadData(data: Summary): void {
    const TotalRecovered = calcTotalCountData(data, this.PROP_KEY);

    this.setHtml(String(TotalRecovered));
  }

  public setHtml(count: number | string): void {
    this.$container.innerText = String(count);
  }

  public setHtmlByFirstCountry(data?: Country[]): void {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
