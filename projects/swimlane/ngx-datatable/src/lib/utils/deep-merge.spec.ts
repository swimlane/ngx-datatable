import { deepMerge } from './deep-merge';

describe('deepMerge', () => {
  it('should replace object with function', () => {
    const obj = {
      a: {
        b: 1
      }
    };

    const func = {
      a() {
        this.c = 2;
      }
    };
    const result = deepMerge(obj, func);
    expect(result.a.b).toBe(undefined);
    expect(Object.prototype.toString.call(result.a)).toBe('[object Function]');
  });

  it('should should replace function with object', () => {
    const obj = {
      a: {
        b: 1
      }
    };

    const func = {
      a() {
        this.c = 2;
      }
    };
    const result = deepMerge(func, obj);
    expect(result.a.b).toBe(1);
    expect(Object.prototype.toString.call(result.a)).toBe('[object Object]');
  });

  it('should replace deep values', () => {
    const a = {
      x: {
        y: 1
      },
      z: 2
    };
    const b = {
      x: {
        y: 3
      },
      z: 4
    };
    const result = deepMerge(a, b);
    expect(result.x.y).toBe(3);
    expect(result.z).toBe(4);
  });

  it('should merge values', () => {
    const a = {
      b: {
        c: 1
      },
      d: 2
    };
    const x = {
      y: {
        z: 3
      },
      v: 4
    };
    const result = deepMerge(a, x);
    expect(result.b).toBe(a.b);
    expect(result.b.c).toBe(a.b.c);
    expect(result.d).toBe(a.d);
    expect(result.y).toBe(x.y);
    expect(result.y.z).toBe(x.y.z);
    expect(result.v).toBe(x.v);
  });

  it('should not merge arrays', () => {
    const a = {
      b: [{ x: 1 }]
    };
    const b = {
      b: [{ y: 1 }, { z: 2 }]
    };
    const result = deepMerge(a, b);
    expect(result.b).toBe(b.b);
    expect(result.b.length).toBe(2);
    expect(result.b[0].x).toBe(undefined);
    expect(result.b[0].y).toBe(1);
    expect(result.b[1].z).toBe(2);
  });
});
