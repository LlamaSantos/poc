import store from './store'


describe('store', () => {
  const expected = ['one', 'two', 'three']
  beforeEach(() => store.clear())

  test('should hydrate data', () => {
    store.init({ list: expected });
    expect(store.get('list')).toEqual(expected);
  })

  test('should get a key when its set', () => {
    store.set('list', expected);
    expect(store.get('list')).toEqual(expected);
  })

  test('should return undefined when a key is missing', () => {
    expect(store.get('list')).toBeUndefined();
  })

  test('should merge array values', () => {
    const more = ['four'];
    store.set('list', expected);
    store.merge('list', more);
    expect(store.get('list')).toEqual(
      expect.arrayContaining(expected.concat(more))
    );
  })

  test('should merge object values', () => {
    store.set('obj', { hello: 'world'})
    store.merge('obj', { taco: 'amigo'})
    expect(store.get('obj')).toEqual({
      hello: 'world',
      taco: 'amigo'
    })
  })

  test('should receive an event when set is called on a key', () => {
    expect.hasAssertions();
    const func = jest.fn();
    store.subscribe('list', (event) => {
      func();
      expect(func).toBeCalled();
      expect(event).toBe('set');
    });
    store.set('list', 'value');
  });

  test('should receive an event when merge is called on a key', () => {
    expect.hasAssertions();
    store.set('list', ['one']);

    store.subscribe('list', (event, value) => {
      expect(event).toBe('set');
      expect(value).toEqual(expect.arrayContaining(['two', 'one']))
    })

    store.merge('list', ['two']);
  })

  test.only('should unsubscribe when told to.', () => {
    let k = 0;
    const handler = (event, value) => {
      ++k;
      expect(value).toEqual('value');
    }

    store.subscribe('list', handler);
    store.set('list', 'value');
    store.unsubscribe('list', handler);
    store.set('list', 'novalue');

    expect(k).toEqual(1);
  })

})