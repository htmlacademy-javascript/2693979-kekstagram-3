const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength('проверяемая строка', 20);

const checkPalindrome = (string) => {
  const cleaned = string.replaceAll(' ', '').toLowerCase();
  const reversed = cleaned.split('').reverse().join('');

  return cleaned === reversed;
};
checkPalindrome('топот');

const getNumberFromString = (value) => {
  const stringValue = value.toString();
  let result = '';

  for (let i = 0; i < stringValue.length; i++) {
    const currentChar = parseInt(stringValue[i], 10);
    if (!Number.isNaN(currentChar)) {
      result += stringValue[i];
    }
  }
  return parseInt(result, 10);
};
getNumberFromString('2023 год');

// Задание 5.16

const convertStringToMinutes = (string) => {
  const substrings = string.split(':');
  return (+substrings[0] * 60) + +substrings[1];
};

const checkTimeMeeting = (startWork, stopWork, startMeeting, duration) => {
  const startWorkInMinutes = convertStringToMinutes(startWork);
  const startMeetingInMinutes = convertStringToMinutes(startMeeting);

  if (startMeetingInMinutes < startWorkInMinutes) {
    return false;
  }

  const stopWorkInMinutes = convertStringToMinutes(stopWork);
  const stopMeetingInMinutes = startMeetingInMinutes + duration;

  if (stopMeetingInMinutes > stopWorkInMinutes) {
    return false;
  }

  return true;
};

checkTimeMeeting('08:00', '17:30', '14:00', 90);
checkTimeMeeting('8:0', '10:0', '8:0', 120);
checkTimeMeeting('08:00', '14:30', '14:00', 90);
checkTimeMeeting('14:00', '17:30', '08:0', 90);
checkTimeMeeting('8:00', '17:30', '08:00', 900);
