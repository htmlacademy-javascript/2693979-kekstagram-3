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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    // Проверка на уникальность
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomIdFromRangeGenerator(1, MAX_PHOTOS * MAX_COMMENTS);

const createCommentBlock = (id) => {
  const name = getRandomArrayElement(NAMES);
  const message = getRandomArrayElement(COMMENTS);
  const avatar = `img/avatar-${ getRandomInteger(1, MAX_AVATARS) }.svg`;

  return {
    id: id,
    avatar: avatar,
    message: message,
    name: name
  };
};

const createCommentsArray = () => {
  const numberComments = getRandomInteger(0, MAX_COMMENTS);
  const arrayResult = Array.from({length: numberComments},
    () => createCommentBlock(generateCommentId()));
  return arrayResult;
};

const createGalleryBlock = (id) => {
  const url = `photos/${ id }.jpg`;
  const description = PHOTO_DESCRIPTIONS[id];
  const likes = getRandomInteger(MIN_LIKES, MAX_LIKES);
  const comments = createCommentsArray();

  return {
    id: id,
    url: url,
    description: description,
    likes: likes,
    comments: comments
  };
};

const generatePhotoId = createRandomIdFromRangeGenerator(1, MAX_PHOTOS);

const createGalleryArray = () => {
  const arrayResult = Array.from({length: MAX_PHOTOS},
    () => createGalleryBlock(generatePhotoId()));
  return arrayResult;
};

createGalleryArray();
