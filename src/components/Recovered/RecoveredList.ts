import { Country } from 'covid';
import { sortedData } from '@/lib/utils';
import { createRecoveredListItem } from '@/lib/template';
import { BaseComponent } from '@/lib/BaseComponent';

export class RecoveredList extends BaseComponent {
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
