import { Country, TotalCounterProp, Summary } from '../../types';
import { $, calcTotalCountData } from '../../lib/utils';

export class DeathTotal {
  private PROP_KEY: TotalCounterProp = 'TotalDeaths';

  private $container: HTMLElement;

  constructor() {
    this.$container = $('.deaths');
  }

  public loadData(data: Summary) {
    const count = calcTotalCountData(data, this.PROP_KEY);
    this.setHtml(String(count));
  }

  public setHtml(count: string) {
    this.$container.innerText = count;
  }

  public setHtmlByFirstCountry(data?: Country[]) {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
