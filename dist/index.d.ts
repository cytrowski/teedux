declare type THandler<S, T> = (state: S, action: T) => Partial<S>;
declare type TActionCreator<T> = (payload: T) => ({
    type: string;
    payload: T;
});
declare type TPayloadlessActionCreator = () => ({
    type: string;
});
interface IReduxStandardAction {
    type: string;
    payload?: object;
}
interface IReduxDuck<S> {
    getReducer: () => (state: S | undefined, action: IReduxStandardAction) => S;
    defineAction: <T extends (object | undefined)>(actionType: string, handler: THandler<S, T>) => TActionCreator<T>;
    definePayloadlessAction: (actionType: string, handler: THandler<S, undefined>) => TPayloadlessActionCreator;
}
export declare const makeReduxDuck: <S>(prefix: string, initialState: S) => IReduxDuck<S>;
export {};
