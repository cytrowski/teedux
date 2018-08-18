import { Action, Reducer } from 'redux';

type THandler<S, T> = (state: S, action: T) => Partial<S>
type TActionCreator<T> = (payload: T) => ({
  type: string,
  payload: T
})
interface IReduxStandardAction extends Action {
  type: string
  payload: object
}

const identity = <T>(x: T): T => x

type TMakeReduxDuck = <S>(
  prefix: string,
  initialState: S
) => {
  getReducer: () => (state = initialState, action: IReduxStandardAction) => S,
  defineAction: <T extends object>(
    actionType: string,
    handler: THandler<S, T>
  ) => TActionCreator<T>
}

export const makeReduxDuck: TMakeReduxDuck
