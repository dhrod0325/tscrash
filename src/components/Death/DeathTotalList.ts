import { DeathList } from './DeathList';
import { DeathTotal } from './DeathTotal';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '../Helper/DefaultSpinner';
import { AsyncComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/@model/SummaryWrapper';

export class DeathTotalList extends AsyncComponent {
  private readonly SPINNER_ID = 'deaths-spinner';

  private readonly $total: DeathTotal;
  private readonly $list: DeathList;

  constructor() {
    super();

    this.$total = new DeathTotal('.deaths');
    this.$list = new DeathList('.deaths-list');
  }

  public setup(data: SummaryWrapper): void {
    this.$total.loadData(data);
  }

  public loadAsyncPrepare(): void {
    this.$list.clear();
  }

  public async loadAsyncData(selectedId: string) {
    const spinner = new DefaultSpinner(this.$list.$container, this.SPINNER_ID);
    await spinner.spin(async () => {
      const data = await api().getDeaths(selectedId);
      await this.$list.loadData(data);

      data && this.$total.setHtmlByFirstCountry(data);
    });
  }
}
