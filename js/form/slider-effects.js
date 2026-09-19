import { toggleDisplayElement, checkHiddenElement } from '../helpers/class-list-helpers.js';
import { debounce } from '../util.js';

const DEBOUNCE_TIME = 500;
const EFFECTS_RADIO = '.effects__radio';

const EFFECT_CONFIGS = {
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
const sliderElement = uploadBlock.querySelector('.effect-level__slider');
const valueElement = uploadBlock.querySelector('.effect-level__value');
const effectsContainer = uploadBlock.querySelector('.img-upload__effects');
const effectNone = uploadBlock.querySelector('#effect-none');

let effectFlag = 'none';
let activeFilterButton = effectNone;
let currentFilter = 'none';

const addImageEffect = debounce((flag, rawValue) => {
  const value = Number(rawValue);
  if (Number.isNaN(value)) {
    return;
  }

  const config = EFFECT_CONFIGS[flag];
  if (!config || !config.filter) {
    imagePreview.style.filter = null;
    return;
  }

  imagePreview.style.filter = config.filter(value);
}, DEBOUNCE_TIME);

const changeSettingsEffect = (evt, flag) => {
  const config = EFFECT_CONFIGS[flag];
  if (!config) {
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
    sliderElement.noUiSlider.updateOptions({
      range: { min: config.range[0], max: config.range[1] },
      start: config.start,
      step: config.step,
    });
  }

  effectFlag = flag;
  addImageEffect(effectFlag, valueElement.value);
};

const switchFilter = (evt) => {
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
  effectsContainer.removeEventListener('change', switchFilter);
};

const initSlider = () => {
  if (!checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }

  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {
      range: {
        min: 0,
        max: 10,
      },
      start: 10,
      step: 1,
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
    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      addImageEffect(effectFlag, valueElement.value);
    });
  } else {
    effectFlag = 'none';
  }

  effectsContainer.addEventListener('change', switchFilter);
};

export { initSlider, removeEffectsEvents, uploadBlock, imagePreview, effectNone };
