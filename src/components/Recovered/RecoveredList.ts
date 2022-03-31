import { Country } from 'covid';
import { $, sortedData } from '@/lib/utils';
import { createRecoveredListItem } from '@/lib/template';

export class RecoveredList {
  private readonly $container: HTMLElement;

  constructor(container: string) {
    this.$container = $(container);
  }

  public container() {
    return this.$container;
  }

  public setItems(data?: Country[]): void {
    if (!data) return;

    sortedData(data).forEach(value => this.addItem(value));
  }

  public clear(): void {
    this.$container.innerHTML = '';
  }

  public addItem(value: Country): void {
    const child = createRecoveredListItem(value);

    this.$container.appendChild(child);
  }
}
