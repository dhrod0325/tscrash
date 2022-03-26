export function createSpinnerElement(id: string) {
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
