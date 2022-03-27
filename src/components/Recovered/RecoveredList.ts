import { Country } from '../../types';
import { $, sortedData } from '../../lib/utils';
import { createRecoveredListItem } from '../../lib/template';

export class RecoveredList {
  private readonly CONTAINER_SELECTOR = '.recovered-list';

  readonly $container: HTMLElement;

  constructor() {
    this.$container = $(this.CONTAINER_SELECTOR);
  }

  setItems(data?: Country[]): void {
    if (!data) return;

    sortedData(data).forEach(value => this.addItem(value));
  }

  addItem(value: Country): void {
    this.$container.appendChild(createRecoveredListItem(value));
  }

  clear(): void {
    this.$container.innerHTML = '';
  }
}
