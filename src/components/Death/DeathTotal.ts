import { Country } from 'covid';
import { BaseComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/@model/SummaryWrapper';

export class DeathTotal extends BaseComponent {
  public loadData(summaryWrapper: SummaryWrapper) {
    this.setHtml(`${summaryWrapper.getTotalDeaths()}`);
  }

  public setHtml(count: string) {
    this.$container.innerText = count;
  }

  public setHtmlByFirstCountry(data: Country[]) {
    if (data.length === 0) return;

    this.setHtml(data[0].Cases);
  }
}
