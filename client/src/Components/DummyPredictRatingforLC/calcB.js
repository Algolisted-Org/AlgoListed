export function calculateValue(count) {
    if (count >= 0 && count < 200) {
      return 1800;
    } else if (count >= 200 && count < 500) {
      return 1700;
    } else if (count >= 500 && count < 800) {
      return 1600;
    } else if (count >= 800 && count < 1100) {
      return 1500;
    } else if (count >= 1100 && count < 1400) {
      return 1400;
    } else if (count >= 1400 && count < 1700) {
      return 1300;
    } else if (count >= 1700 && count < 2000) {
      return 1200;
    } else if (count >= 2000 && count < 2300) {
      return 1100;
    } else {
      return 1000;
    }
  }