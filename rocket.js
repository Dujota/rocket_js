class Rocket {
  constructor(options = {}) {
    this.name = options.name || this.randomName();
    this.colour = options.colour || this.randomColour();
    this.flying = options.flying || false;
  }

  liftOff() {
    if (this.flying) {
      return false;
    }
    this.flying = true;
    return true;
  }

  land() {
    if (!this.flying) {
      return false;
    }
    this.flying = false;
    return true;
  }

  status() {
    if (this.flying) {
      return `Rocket ${this.name} is flying through the sky!`;
    }
    return `Rocket ${this.name} is ready for liftoff!`;
  }

  /*
   * messageCode is the code for a message.
   * If passed, it is expected to be a number.
   * Numbers less than 10 indicate good statuses.
   * Numbers 10 or greater represent various problems with the rocket.
   */
  sendCodedSignal(messageCode) {
    let signalInfo = [];
    if (messageCode === undefined) {
      signalInfo.push('boop'); // ready for a messageCode
    } else if (messageCode < 10 && parseFloat(messageCode) !== 0.0) {
      signalInfo.push('beep');
      if (this.flying) {
        signalInfo.push('beep');
      }
    } else if (this.flying) {
      signalInfo = signalInfo.concat(['boop', 'boop', 'boop']);
    } else {
      signalInfo = signalInfo.concat(['boop', 'beep', 'beep']);
    }

    return signalInfo.join(' ');
  }

  // helper methods - don't need to test these!

  randomName() {
    const prefixes = [
      'aries',
      'taurus',
      'gemini',
      'cancer',
      'leo',
      'virgo',
      'libra',
      'scorpio',
      'sagittarius',
      'capricorn',
      'aquarius',
      'pisces',
    ];
    const suffixes = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
    const randomPrefix = this.getRandom(prefixes);
    const randomSuffix = this.getRandom(suffixes);
    const capitalizedPrefix = randomPrefix.charAt(0).toUpperCase() + randomPrefix.slice(1);

    return `${capitalizedPrefix} ${randomSuffix.toUpperCase()}`;
  }

  randomColour() {
    const colour_list = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'];
    return this.getRandom(colour_list);
  }

  getRandom(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
  }
}

module.exports = Rocket;
