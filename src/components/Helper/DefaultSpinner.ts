import { Spinner } from 'covid';

export class DefaultSpinner implements Spinner {
  private readonly $container: HTMLElement;

  private readonly $spinner: HTMLElement;

  constructor($container: HTMLElement, spinnerId: string) {
    this.$container = $container;
    this.$spinner = this.create(spinnerId);
  }

  public async spin(callback: () => void) {
    await this.show();

    await callback();

    await this.hide();
  }

  private create(id: string): HTMLElement {
    function createWrapper() {
      const wrapperDiv = document.createElement('div');
      wrapperDiv.setAttribute('id', id);
      wrapperDiv.setAttribute(
        'class',
        'spinner-wrapper flex justify-center align-center',
      );
      return wrapperDiv;
    }

    function createSpinner() {
      const spinnerDiv = document.createElement('div');
      spinnerDiv.setAttribute('class', 'ripple-spinner');
      spinnerDiv.appendChild(document.createElement('div'));
      spinnerDiv.appendChild(document.createElement('div'));

      return spinnerDiv;
    }

    const wrapperDiv = createWrapper();
    const spinnerDiv = createSpinner();

    wrapperDiv.appendChild(spinnerDiv);

    return wrapperDiv;
  }

  private show(): void {
    this.$container.appendChild(this.$spinner);
  }

  private hide(): void {
    this.$container.removeChild(this.$spinner);
  }
}
