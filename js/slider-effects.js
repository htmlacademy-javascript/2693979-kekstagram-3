import { GalleryParameters, FormParameters } from './parameters.js';
import { toggleDisplayElement, checkHiddenElement } from './class-list-helpers.js';
import { debounce } from './util.js';

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

let effectFlag = 'None';

const EFFECT_CONFIGS = {
  None: { range: [0, 10], start: 10, step: 1, filter: () => null },
  Chrome: { range: [0, 1], start: 1, step: 0.1, filter: (v) => `grayscale(${v})` },
  Sepia: { range: [0, 1], start: 1, step: 0.1, filter: (v) => `sepia(${v})` },
  Marvin: { range: [0, 100], start: 100, step: 1, filter: (v) => `invert(${v}%)` },
  Phobos: { range: [0, 3], start: 3, step: 0.1, filter: (v) => `blur(${v}px)` },
  Heat: { range: [1, 3], start: 3, step: 0.1, filter: (v) => `brightness(${v})` },
};

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

// const changeSettingsEffect = (evt, flag) => {
//   if (checkHiddenElement(effectLevel)) {
//     toggleDisplayElement(effectLevel);
//   }

//   const config = EFFECT_CONFIGS[flag];
//   if (!config) {
//     return;
//   }

//   if (evt.target.checked) {
//     sliderElement.noUiSlider.updateOptions({
//       range: { min: config.range[0], max: config.range[1] },
//       start: config.start,
//       step: config.step,
//     });
//   }

//   effectFlag = flag;
//   addImageEffect(effectFlag, valueElement.value);
// };

const changeSettingsEffect = (evt, flag) => {
  const config = EFFECT_CONFIGS[flag];
  if (!config) {
    return;
  }

  // Для None — скрываем панель, для остальных — показываем
  if (flag === 'None') {
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

const handlerNone = (evt) => changeSettingsEffect(evt, 'None');
const handlerChrome = (evt) => changeSettingsEffect(evt, 'Chrome');
const handlerSepia = (evt) => changeSettingsEffect(evt, 'Sepia');
const handlerMarvin = (evt) => changeSettingsEffect(evt, 'Marvin');
const handlerPhobos = (evt) => changeSettingsEffect(evt, 'Phobos');
const handlerHeat = (evt) => changeSettingsEffect(evt, 'Heat');

const removeEffectsEvents = () => {
  effectNone.removeEventListener('change', handlerNone);
  effectChrome.removeEventListener('change', handlerChrome);
  effectSepia.removeEventListener('change', handlerSepia);
  effectMarvin.removeEventListener('change', handlerMarvin);
  effectPhobos.removeEventListener('change', handlerPhobos);
  effectHeat.removeEventListener('change', handlerHeat);
};

const sliderInit = () => {
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
  } else {
    effectFlag = 'None';
  }

  effectNone.addEventListener('change', handlerNone);
  effectChrome.addEventListener('change', handlerChrome);
  effectSepia.addEventListener('change', handlerSepia);
  effectMarvin.addEventListener('change', handlerMarvin);
  effectPhobos.addEventListener('change', handlerPhobos);
  effectHeat.addEventListener('change', handlerHeat);

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    addImageEffect(effectFlag, valueElement.value);
  });
};

export { sliderInit, removeEffectsEvents, uploadBlock, imagePreview, effectNone };
