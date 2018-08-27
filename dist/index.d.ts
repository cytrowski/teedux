declare type THandler<S, T> = (state: S, action: T) => Partial<S>;
declare type TActionCreator<T> = (payload: T) => ({
    type: string;
    payload: T;
});
interface IReduxStandardAction {
    type: string;
    payload?: object;
}
interface IReduxDuck<S> {
    getReducer: () => (state: S | undefined, action: IReduxStandardAction) => S;
    defineAction: <T extends object | void>(actionType: string, handler: THandler<S, T>) => TActionCreator<T>;
}
export declare const makeReduxDuck: <S>(prefix: string, initialState: S) => IReduxDuck<S>;
export {};
