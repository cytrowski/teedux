import { makeReduxDuck } from './index'

test('makes duck', () => {
  const initialState: {
    counterValue: number
  } = {
    counterValue: 10
  }
  const duck = makeReduxDuck('counter', initialState)

  const increment = duck.defineAction<{ diff: number }>(
    'INCREMENT',
    ({ counterValue }, { diff }) => ({
      counterValue: counterValue + diff
    })
  )

  expect(increment({ diff: 5 })).toEqual({
    type: 'counter/INCREMENT',
    payload: {
      diff: 5
    }
  })

  expect(duck.getReducer()({ counterValue: 1 }, increment({ diff: 5 }))).toEqual({
    counterValue: 6
  })

  expect(duck.getReducer()(undefined, { type: '@@INIT' })).toEqual(initialState)

  // TODO make it true 
  // expect(duck.getReducer()(undefined, { type: '@@INIT' })).toBe(initialState)

  expect(() => {
    duck.defineAction<{ title: string }>(
      'INCREMENT',
      () => ({})
    )
  }).toThrowError(`Duplicate action type: counter/INCREMENT`)
})