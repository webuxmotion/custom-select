export class Select {
  constructor(selector, options) {
    this.element = document.querySelector(selector);
    this.options = options;
    this.openClassName = 'is-open';
    this.selectedId = this.options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data, selectedId } = this.options;
    this.element.classList.add('select');
    this.element.innerHTML = getTemplate({ placeholder, data, selectedId });
  }

  open() {
    this.element.classList.add(this.openClassName);
  }

  close() {
    this.element.classList.remove(this.openClassName);
  }

  clickHandler(event) {
    
    const { type } = event.target.dataset;

    if (type == "input") {
      this.toggle();
    } else if (type == "item") {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type == "backdrop") {
      this.close();
    }
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  get isOpen() {
    return this.element.classList.contains(this.openClassName);
  }

  select(id) {
    this.selectedId = id;
    this.inputElement.textContent = this.current.value;
    this.element.querySelectorAll('[data-type="item"]').forEach(
      el => el.classList.remove('is-selected')
    );
    this.element.querySelector(`[data-id="${id}"]`).classList.add('is-selected');
    (this.options.onSelect && typeof this.options.onSelect == "function") ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.element.addEventListener('click', this.clickHandler);
    this.inputElement = this.element.querySelector('[data-type="inputValue"]');
  }

  destroy() {
    this.element.removeEventListener('click', this.clickHandler);
    this.element.innerHTML = '';
  }
}

export function getTemplate({ 
  placeholder = "Default placeholder", 
  data = [],
  selectedId
}) {
  let text = placeholder;

  const items = data.map(item => {
    let selectedClass = "";

    if (item.id === selectedId) {
      text = item.value;
      selectedClass = "is-selected";
    }

    return `<li 
      class="select__item ${selectedClass}" 
      data-type="item"
      data-id="${item.id}"
    >${item.value}</li>`;
  }).join('');

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="inputValue">${text}</span>
      <i class="fa fa-chevron-down select__arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items}
      </ul>
    </div>
  `;
}