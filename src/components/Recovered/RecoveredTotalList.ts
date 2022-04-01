import { RecoveredList } from './RecoveredList';
import { RecoveredTotal } from './RecoveredTotal';
import { api } from '@/lib/Api';
import { DefaultSpinner } from '@/components/Helper/DefaultSpinner';
import { AsyncComponent } from '@/lib/Component';
import { SummaryWrapper } from '@/@model/SummaryWrapper';

export class RecoveredTotalList extends AsyncComponent {
  private readonly SPINNER_ID = 'recovered-spinner';

  private readonly $total: RecoveredTotal;
  private readonly $list: RecoveredList;

  constructor() {
    super();

    this.$total = new RecoveredTotal('.recovered');
    this.$list = new RecoveredList('.recovered-list');
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
      const data = await api().getRecovered(selectedId);

      this.$list.setItems(data);
      this.$total.setHtmlByFirstCountry(data);
    });
  }
}
