const Rocket = require('./rocket');

describe('Rocket', () => {
  describe('constructor', () => {
    it(' sets default attributes if nothing is passed', () => {
      const rocket = new Rocket();

      expect(rocket.name).toBeTruthy();
      expect(rocket.colour).toBeTruthy();
      expect(rocket.flying).toEqual(false);
    });

    it(" sets the rocket's name, colour, flying status if provided", () => {
      const rocket = new Rocket({ name: 'BigOne', colour: 'red', flying: true });

      expect(rocket.name).toEqual('BigOne');
      expect(rocket.colour).toEqual('red');
      expect(rocket.flying).toEqual(true);
    });
  });

  describe('liftOff', () => {
    it('sets flying to true when initilaized with default values ', () => {
      const rocket = new Rocket();

      // flying = false. call liftOff
      rocket.liftOff();
      expect(rocket.flying).toEqual(true);

      // try to call it again
      rocket.liftOff();
      expect(rocket.flying).toEqual(true);
    });

    it('returns false if the rocket is already flying', () => {
      const rocket = new Rocket({ flying: true });
      expect(rocket.liftOff()).toBe(false);
      expect(rocket.flying).toEqual(true);
    });
  });

  describe('Land', () => {
    it('sets flying to true when initilaized with default values ', () => {
      const rocket = new Rocket();

      // flying = false. call liftOff
      rocket.liftOff();
      expect(rocket.flying).toEqual(true);

      // then call land
      rocket.land();
      expect(rocket.flying).toEqual(false);

      // if we call land when not flying
      rocket.land();
      expect(rocket.flying).toEqual(false);
    });

    it('returns false if the rocket is already flying', () => {
      const rocket = new Rocket({ flying: true });
      expect(rocket.land()).toBe(true);
      expect(rocket.flying).toEqual(false);
    });
  });

  describe('sendCodedSignal', () => {
    it("send 'boop' when nothing is passed in ", () => {
      const rocket = new Rocket();

      // call the method on our default instance
      expect(rocket.sendCodedSignal()).toEqual('boop');
    });

    it('sends "beep" when messageCode < 10 ', () => {
      const rocket = new Rocket();
      expect(rocket.sendCodedSignal(9)).toEqual('beep');
      expect(rocket.sendCodedSignal(Math.floor(Math.random() * 10))).toEqual('beep');

      // console.log(rocket.sendCodedSignal(19));
      expect(rocket.sendCodedSignal(19)).not.toBe('beep');
    });

    it('sends "beep" when messageCode < 10 AND flying = true', () => {
      const flyingRocket = new Rocket({ flying: true });

      expect(flyingRocket.sendCodedSignal(9)).toBe('beep beep');
    });

    it('sends "boop boop boop" when flying AND sendCodedSignal >= 10', () => {
      const rocket = new Rocket();
      rocket.liftOff();

      expect(rocket.sendCodedSignal(10)).toBe('boop boop boop');
    });

    it('send "boop beep beep" when sendCodedSignal >= 10 AND landed ', () => {
      const landedRocket = new Rocket();

      expect(landedRocket.sendCodedSignal(10)).toBe('boop beep beep');
    });

    it('when sendCodeSignal is not a number BUT defined', () => {
      const rocket = new Rocket();

      expect(rocket.sendCodedSignal('hello')).toBe('boop beep beep');

      expect(rocket.sendCodedSignal('0')).toBe('boop beep beep');
    });
  });
});
