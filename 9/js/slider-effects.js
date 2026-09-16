import { formParameters } from './parameters.js';
import { toggleDisplayElement, checkHiddenElement } from './class-list-helpers.js';

const uploadBlock = document.querySelector(formParameters.UPLOAD_BLOCK);
const imagePreviewContainer = uploadBlock.querySelector(formParameters.UPLOAD_IMAGE_PREVIEW);
const imagePreview = imagePreviewContainer.querySelector('img');
const effectLevel = uploadBlock.querySelector(formParameters.EFFECT_LEVEL);
const sliderElement = uploadBlock.querySelector(formParameters.SLIDER_ELEMENT);
const valueElement = uploadBlock.querySelector(formParameters.VALUE_ELEMENT);
const effectNone = uploadBlock.querySelector(formParameters.EFFECT_NONE);
const effectChrome = uploadBlock.querySelector(formParameters.EFFECT_CHROME);
const effectSepia = uploadBlock.querySelector(formParameters.EFFECT_SEPIA);
const effectMarvin = uploadBlock.querySelector(formParameters.EFFECT_MARVIN);
const effectPhobos = uploadBlock.querySelector(formParameters.EFFECT_PHOBOS);
const effectHeat = uploadBlock.querySelector(formParameters.EFFECT_HEAT);
let effectFlag = 'None';

const addImageEffect = (flag, value) => {
  if (flag === 'None') {
    imagePreview.style.filter = null;
  }

  if (flag === 'Chrome') {
    imagePreview.style.filter = `grayscale(${ value})`;
  }

  if (flag === 'Sepia') {
    imagePreview.style.filter = `sepia(${ value})`;
  }

  if (flag === 'Marvin') {
    imagePreview.style.filter = `invert(${ value}%)`;
  }

  if (flag === 'Phobos') {
    imagePreview.style.filter = `blur(${ value}px)`;
  }

  if (flag === 'Heat') {
    imagePreview.style.filter = `brightness(${ value})`;
  }
};

const changeSettingsEffectNone = (evt) => {
  if (!checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 10,
      },
      start: 10,
      step: 1,
    });
  }
  effectFlag = 'None';
  addImageEffect(effectFlag, valueElement.value);
};

const changeSettingsEffectChrome = (evt) => {
  if (checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  effectFlag = 'Chrome';
  addImageEffect(effectFlag, valueElement.value);
};

const changeSettingsEffectSepia = (evt) => {
  if (checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  effectFlag = 'Sepia';
  addImageEffect(effectFlag, valueElement.value);
};

const changeSettingsEffectMarvin = (evt) => {
  if (checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  effectFlag = 'Marvin';
  addImageEffect(effectFlag, valueElement.value);
};

const changeSettingsEffectPhobos = (evt) => {
  if (checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  effectFlag = 'Phobos';
  addImageEffect(effectFlag, valueElement.value);
};

const changeSettingsEffectHeat = (evt) => {
  if (checkHiddenElement(effectLevel)) {
    toggleDisplayElement(effectLevel);
  }
  if (evt.target.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  effectFlag = 'Heat';
  addImageEffect(effectFlag, valueElement.value);
};

const removeEffectsEvents = () => {
  effectNone.removeEventListener('change', changeSettingsEffectNone);
  effectChrome.removeEventListener('change', changeSettingsEffectChrome);
  effectSepia.removeEventListener('change', changeSettingsEffectSepia);
  effectMarvin.removeEventListener('change', changeSettingsEffectMarvin);
  effectPhobos.removeEventListener('change', changeSettingsEffectPhobos);
  effectHeat.removeEventListener('change', changeSettingsEffectHeat);
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

  effectNone.addEventListener('change', changeSettingsEffectNone);
  effectChrome.addEventListener('change', changeSettingsEffectChrome);
  effectSepia.addEventListener('change', changeSettingsEffectSepia);
  effectMarvin.addEventListener('change', changeSettingsEffectMarvin);
  effectPhobos.addEventListener('change', changeSettingsEffectPhobos);
  effectHeat.addEventListener('change', changeSettingsEffectHeat);

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    addImageEffect(effectFlag, valueElement.value);
  });
};

export { sliderInit, removeEffectsEvents, uploadBlock, imagePreview };
