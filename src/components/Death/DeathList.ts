import { Country } from 'covid';

import { $, sortedData } from '@/lib/utils';
import { DeathListItem } from '@/components/Death/DeathListItem';

export class DeathList extends Array<HTMLElement> {
  private readonly CONTAINER_SELECTOR = '.deaths-list';

  public container() {
    return $(this.CONTAINER_SELECTOR);
  }

  public clear() {
    this.container().innerHTML = '';
    this.splice(0, this.length);
  }

  public async loadData(data?: Country[]) {
    if (!data) return;

    sortedData(data).forEach(country => {
      const deathListItem = new DeathListItem(country);
      const elem = deathListItem.getElement();

      this.container().appendChild(elem);
      this.push(elem);
    });
  }
}
