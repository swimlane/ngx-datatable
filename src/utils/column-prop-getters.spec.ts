import { deepValueGetter } from './column-prop-getters';

describe('deepValueGetter', () => {

  it('should get values one level deep', () => {
    let data = {
      a: {
        value: 123
      }
    };
    expect(deepValueGetter(data, 'a.value')).toEqual(123);
  });

  it('should get values two levels deep', () => {
    let data = {
      a: {
        b: {
          value: 'foo'
        }
      }
    };
    expect(deepValueGetter(data, 'a.b.value')).toEqual('foo');
  });

  it('should return empty string on missing nested field', () => {
    let data = {
      a: {}
    };
    expect(deepValueGetter(data, 'a.x.value')).toEqual('');
  });

  it('should return empty string on missing final field', () => {
    let data = {
      a: {}
    };
    expect(deepValueGetter(data, 'a.value')).toEqual('');
  });

  it('should return empty string on missing root field', () => {
    let data = {
      a: {}
    };
    expect(deepValueGetter(data, 'x.value')).toEqual('');
  });

  it('should check for root-level fields with dots in name', () => {
    let data = {
      "a.b.value": 5
    };
    expect(deepValueGetter(data, 'a.b.value')).toEqual(5);
  });

  it('should get array-element two-level deep', () => {
    let data = {
      a: {
        b: [
          123
        ]
      }
    };
    expect(deepValueGetter(data, 'a.b.0')).toEqual(123);

  });

  it('should get value of object inside an array-element', () => {
    let data = {
      a: {
        b: [
          {c: 123}
        ]
      }
    };
    expect(deepValueGetter(data, 'a.b.0.c')).toEqual(123);
  });
   it('should get value of object inside a double array-element', () => {
    let data = {
      a: {
        b: [
          [
            123
          ]
        ]
      }
    };
    expect(deepValueGetter(data, 'a.b.0.0')).toEqual(123);
  });
  

  it('should check for root-level fields with square brackets in name', () => {
    let data = {
      'a.b.1.value': 5
    };
    expect(deepValueGetter(data, 'a.b.1.value')).toEqual(5);
  });


});
