import { imagePreview } from './slider-effects.js';

const MAX_SCALE = 1;
const MIN_SCALE = 0.25;
const STEP = 0.25;
const SCALE_DEFAULT_VALUE = '100%';
const SCALE_A_PERCENT = 100;
let scale = 1;

const scaleBlock = document.querySelector('.img-upload__scale');
const buttonSmaller = scaleBlock.querySelector('.scale__control--smaller');
const buttonBigger = scaleBlock.querySelector('.scale__control--bigger');
const scaleInput = scaleBlock.querySelector('.scale__control--value');

const scaleSmaller = () => {
  if (scale > MIN_SCALE) {
    scale -= STEP;
    imagePreview.style.transform = `scale(${ scale})`;
    scaleInput.value = `${scale * SCALE_A_PERCENT }%`;
  }
};

const scaleBigger = () => {
  if (scale < MAX_SCALE) {
    scale += STEP;
    imagePreview.style.transform = `scale(${ scale})`;
    scaleInput.value = `${scale * SCALE_A_PERCENT }%`;
  }
};

const scaleToImage = () => {
  imagePreview.style.transform = `scale(${ scale})`;
  buttonSmaller.addEventListener('click', scaleSmaller);
  buttonBigger.addEventListener('click', scaleBigger);
};

const resetScale = () => {
  scale = 1;
  imagePreview.style.transform = null;
  buttonSmaller.removeEventListener('click', scaleSmaller);
  buttonBigger.removeEventListener('click', scaleBigger);
  scaleInput.value = SCALE_DEFAULT_VALUE;
};

export { scaleToImage, resetScale };
