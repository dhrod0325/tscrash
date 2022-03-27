import { $ } from '../lib/utils';

export class RecoveredTotal {
  private $recoveredTotal: HTMLElement;

  constructor() {
    this.$recoveredTotal = $('.recovered');
  }

  public setTotalHtml(count: number | string) {
    this.$recoveredTotal.innerText = String(count);
  }
}
