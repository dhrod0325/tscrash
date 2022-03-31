import { createRankListItem } from '@/lib/template';
import { Country, Summary } from 'covid';
import { BaseComponent } from '@/lib/BaseComponent';

export class RankList extends BaseComponent {
  public static readonly CLICK_EVENT = 'RankList.CLICK_EVENT';

  public setup(data: Summary): void {
    this.$container.addEventListener('click', e => {
      window.dispatchEvent(
        new CustomEvent(RankList.CLICK_EVENT, { detail: e }),
      );
    });

    this.setByTotalConfirmed(data);
  }

  private setByTotalConfirmed(data: Summary): void {
    this.sortedData(data).forEach(value => this.addItem(value));
  }

  private sortedData(data: Summary): Country[] {
    return data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
  }

  private addItem(value: Country): void {
    this.$container.appendChild(createRankListItem(value));
  }
}
