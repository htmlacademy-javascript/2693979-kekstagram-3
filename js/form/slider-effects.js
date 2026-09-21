import { toggleDisplayElement, checkHiddenElement } from '../helpers/class-list-helpers.js';

const EFFECTS_RADIO = '.effects__radio';

const EFFECT_OPTIONS = {
  none: { range: [0, 10], start: 10, step: 1, filter: () => null },
  chrome: { range: [0, 1], start: 1, step: 0.1, filter: (value) => `grayscale(${value})` },
  sepia: { range: [0, 1], start: 1, step: 0.1, filter: (value) => `sepia(${value})` },
  marvin: { range: [0, 100], start: 100, step: 1, filter: (value) => `invert(${value}%)` },
  phobos: { range: [0, 3], start: 3, step: 0.1, filter: (value) => `blur(${value}px)` },
  heat: { range: [1, 3], start: 3, step: 0.1, filter: (value) => `brightness(${value})` },
};

const uploadBlock = document.querySelector('.img-upload');
const imagePreviewContainer = uploadBlock.querySelector('.img-upload__preview');
const imagePreview = imagePreviewContainer.querySelector('img');
const effectLevel = uploadBlock.querySelector('.img-upload__effect-level');
const slider = uploadBlock.querySelector('.effect-level__slider');
const effectValue = uploadBlock.querySelector('.effect-level__value');
const effectsContainer = uploadBlock.querySelector('.img-upload__effects');
const effectNone = uploadBlock.querySelector('#effect-none');

let effectFlag = 'none';
let activeFilterButton = effectNone;
let currentFilter = 'none';

const addImageEffect = (flag, rawValue) => {
  const value = Number(rawValue);
  if (Number.isNaN(value)) {
    return;
  }

  const option = EFFECT_OPTIONS[flag];
  if (!option || !option.filter) {
    imagePreview.style.filter = null;
    return;
  }

  imagePreview.style.filter = option.filter(value);
};

const changeSettingsEffect = (evt, flag) => {
  const option = EFFECT_OPTIONS[flag];
  if (!option) {
    return;
  }

  if (flag === 'none') {
    if (!checkHiddenElement(effectLevel)) {
      toggleDisplayElement(effectLevel);
    }
  } else {
    if (checkHiddenElement(effectLevel)) {
      toggleDisplayElement(effectLevel);
    }
  }

  if (evt.target.checked) {
    slider.noUiSlider.updateOptions({
      range: { min: option.range[0], max: option.range[1] },
      start: option.start,
      step: option.step,
    });
  }

  effectFlag = flag;
  addImageEffect(effectFlag, effectValue.value);
};

const onSwitchFilterChange = (evt) => {
  const target = evt.target.closest(EFFECTS_RADIO);

  if (!target) {
    return;
  }

  if (target === activeFilterButton) {
    return;
  }

  target.checked = true;
  activeFilterButton = target;
  const id = target.id;
  currentFilter = id.replace('effect-', '');
  changeSettingsEffect(evt, currentFilter);
};

const removeEffectsEvents = () => {
  effectsContainer.removeEventListener('change', onSwitchFilterChange);
  effectFlag = 'none';
  activeFilterButton = effectNone;
  currentFilter = 'none';
};

const initSlider = () => {
  if (!checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }

  if (!slider.noUiSlider) {
    const option = EFFECT_OPTIONS['none'];
    noUiSlider.create(slider, {
      range: { min: option.range[0], max: option.range[1] },
      start: option.start,
      step: option.step,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed();
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    });
    slider.noUiSlider.on('update', () => {
      effectValue.value = slider.noUiSlider.get();
      addImageEffect(effectFlag, effectValue.value);
    });
  } else {
    effectFlag = 'none';
  }

  effectsContainer.addEventListener('change', onSwitchFilterChange);
};

export { initSlider, removeEffectsEvents, uploadBlock, imagePreview, effectNone };
