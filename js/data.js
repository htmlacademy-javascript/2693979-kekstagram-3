import { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator } from './util.js';

const NAMES = [
  'Иван', 'Андрей', 'Максим', 'Денис', 'Виктор', 'Николай', 'Бенедикт',
  'Аристофан', 'Христофор', 'Велимудр', 'Наталья', 'Мария', 'Валькирия',
  'Антонина', 'Берегиня', 'Анна', 'Юля', 'Светлана', 'Ирина', 'Яна'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_DESCRIPTIONS = [
  'Пляж с высоты птичьего полёта',
  'Указатель рядом с тропой',
  'Берег моря',
  'Девушка в купальнике с фотоаппаратом',
  'Весёлый завтрак',
  'Премиальный автомобиль',
  'Разрезанная клубника в деревянной чашке',
  'Освежающий напиток',
  'Самолёт над купающимися людьми',
  'Подставка для обуви',
  'Забор вокруг растений',
  'Автомобиль на дороге',
  'Вкусное блюдо',
  'Роллокот',
  'Ноги, отдыхающие на диване',
  'Небо из иллюминатора самолёта',
  'Оркестр песни и пляски',
  'Раритетный автомобиль',
  'Ноги в тапочках ночью',
  'Пальмы рядом со зданиями',
  'Салат и вилка',
  'Закат на море',
  'Краб следит за тобой',
  'Выступление музыкальной группы',
  'Бегемот приветствует автомобиль',
];

const MAX_PHOTOS = 25;
const MAX_AVATARS = 6;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_PHOTOS * MAX_COMMENTS);

const createCommentBlock = (id) => {
  const name = getRandomArrayElement(NAMES);
  const message = getRandomArrayElement(COMMENTS);
  const avatar = `img/avatar-${ getRandomInteger(1, MAX_AVATARS) }.svg`;

  return {
    id,
    avatar,
    message,
    name
  };
};

const createCommentsArray = () => {
  const numberComments = getRandomInteger(0, MAX_COMMENTS);
  return Array.from(
    {length: numberComments},
    () => createCommentBlock(generateCommentId())
  );
};

const createGalleryBlock = (id) => {
  const url = `photos/${ id }.jpg`;
  const description = PHOTO_DESCRIPTIONS[id - 1];
  const likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  const comments = createCommentsArray();

  return {
    id,
    url,
    description,
    likes,
    comments
  };
};

const generatePhotoId = createRandomIdFromRangeGenerator(1, MAX_PHOTOS);

const createGalleryArray = () => Array.from(
  {length: MAX_PHOTOS},
  () => createGalleryBlock(generatePhotoId())
);

export { createGalleryArray };
