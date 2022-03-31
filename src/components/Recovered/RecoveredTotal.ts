import { Country, SummaryInfo } from 'covid';
import { $ } from '@/lib/utils';

export class RecoveredTotal {
  private readonly $container: HTMLElement;

  constructor(container: string) {
    this.$container = $(container);
  }

  public loadData(data: SummaryInfo): void {
    this.setHtml(String(data.TotalRecovered));
  }

  public setHtml(count: string): void {
    this.$container.innerText = count;
  }

  public setHtmlByFirstCountry(data?: Country[]): void {
    if (!data) return;

    this.setHtml(data[0].Cases);
  }
}
