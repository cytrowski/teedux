type THandler<S, T> = (state: S, action: T) => Partial<S>
type TActionCreator<T> = (payload: T) => ({
  type: string,
  payload: T
})
interface IReduxStandardAction {
  type: string
  payload?: object
}
type TIdentity = <T>(x: T) => T
interface IActionTypeIndex {
  [key: string]: boolean
}
interface IReduxDuck <S>{
  getReducer: () => (state: S | undefined, action: IReduxStandardAction) => S,
  defineAction: <T extends object | void>(
    actionType: string,
    handler: THandler<S, T>
  ) => TActionCreator<T>
}

const identity: TIdentity = x => x
const actionTypeIndex: IActionTypeIndex = {}

export const makeReduxDuck = <S>(
  prefix: string,
  initialState: S
): IReduxDuck<S> => {
  const actionHandlers: {[key: string]: THandler<S, any>} = {}

  return {
    getReducer: () => (state = initialState, action) => Object.assign(
      {},
      state,
      (actionHandlers[action.type] || identity)(state, action.payload)
    ),
    defineAction: (actionType, handler) => { 
      const type = `${prefix}/${actionType}`

      if (actionTypeIndex[type] === true) {
        throw new Error(`Duplicate action type: ${type}`)
      }

      actionTypeIndex[type] = true
      actionHandlers[type] = handler

      return (payload) => ({
        type,
        payload
      })
    }
  }
}
