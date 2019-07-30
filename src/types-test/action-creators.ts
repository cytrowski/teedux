import { makeReduxDuck } from '..';

interface ITask {
    title: string;
}

interface IState {
    data: ITask[];
}

const initialState: IState = {
    data: []
};

const duck = makeReduxDuck('tasks', initialState);

const addTask = duck.defineAction<{ title: string }>(
    'ADD_TASK',
    ({ data }, { title }) => ({
        data: data.concat({ title })
    })
);

// $ExpectType { type: string; payload: { title: string; }; }
type TAddTask = ReturnType<typeof addTask>;
