import { GalleryParameters, FormParameters } from './parameters.js';
import { toggleDisplayElement, checkHiddenElement } from './class-list-helpers.js';
import { debounce } from './util.js';

const EFFECT_CONFIGS = {
  none: { range: [0, 10], start: 10, step: 1, filter: () => null },
  chrome: { range: [0, 1], start: 1, step: 0.1, filter: (value) => `grayscale(${value})` },
  sepia: { range: [0, 1], start: 1, step: 0.1, filter: (value) => `sepia(${value})` },
  marvin: { range: [0, 100], start: 100, step: 1, filter: (value) => `invert(${value}%)` },
  phobos: { range: [0, 3], start: 3, step: 0.1, filter: (value) => `blur(${value}px)` },
  heat: { range: [1, 3], start: 3, step: 0.1, filter: (value) => `brightness(${value})` },
};

const uploadBlock = document.querySelector(FormParameters.UPLOAD_BLOCK);
const imagePreviewContainer = uploadBlock.querySelector(FormParameters.UPLOAD_IMAGE_PREVIEW);
const imagePreview = imagePreviewContainer.querySelector('img');
const effectLevel = uploadBlock.querySelector(FormParameters.EFFECT_LEVEL);
const sliderElement = uploadBlock.querySelector(FormParameters.SLIDER_ELEMENT);
const valueElement = uploadBlock.querySelector(FormParameters.VALUE_ELEMENT);
const effectNone = uploadBlock.querySelector(FormParameters.EFFECT_NONE);
const effectChrome = uploadBlock.querySelector(FormParameters.EFFECT_CHROME);
const effectSepia = uploadBlock.querySelector(FormParameters.EFFECT_SEPIA);
const effectMarvin = uploadBlock.querySelector(FormParameters.EFFECT_MARVIN);
const effectPhobos = uploadBlock.querySelector(FormParameters.EFFECT_PHOBOS);
const effectHeat = uploadBlock.querySelector(FormParameters.EFFECT_HEAT);

let effectFlag = 'none';

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
}, GalleryParameters.DEBOUNCE_TIME);

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

const onEffectNoneChange = (evt) => changeSettingsEffect(evt, 'none');
const onEffectChromeChange = (evt) => changeSettingsEffect(evt, 'chrome');
const onEffectSepiaChange = (evt) => changeSettingsEffect(evt, 'sepia');
const onEffectMarvinChange = (evt) => changeSettingsEffect(evt, 'marvin');
const onEffectPhobosChange = (evt) => changeSettingsEffect(evt, 'phobos');
const onEffectHeatChange = (evt) => changeSettingsEffect(evt, 'heat');

const removeEffectsEvents = () => {
  effectNone.removeEventListener('change', onEffectNoneChange);
  effectChrome.removeEventListener('change', onEffectChromeChange);
  effectSepia.removeEventListener('change', onEffectSepiaChange);
  effectMarvin.removeEventListener('change', onEffectMarvinChange);
  effectPhobos.removeEventListener('change', onEffectPhobosChange);
  effectHeat.removeEventListener('change', onEffectHeatChange);
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

  effectNone.addEventListener('change', onEffectNoneChange);
  effectChrome.addEventListener('change', onEffectChromeChange);
  effectSepia.addEventListener('change', onEffectSepiaChange);
  effectMarvin.addEventListener('change', onEffectMarvinChange);
  effectPhobos.addEventListener('change', onEffectPhobosChange);
  effectHeat.addEventListener('change', onEffectHeatChange);
};

export { initSlider, removeEffectsEvents, uploadBlock, imagePreview, effectNone };
