# Teedux

## Disclaimer

- This is a training project of mine - I scratched my own itch.
- It's best consumed with TypeScript
- It's not a silver bullet for all `redux` projects - just for the small ones ;)
- It's very opinionated - I assume you use `redux-thunk` for side effects but there is a way of making it work with sagas too
- I assume you know [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux)
- I assume you use `combineReducers`

## Motivation

Programmers using `redux` are often confused about how to structure their projects - where to put reducers, action creators and action types so that the navigation in the directory tree will not become a nightmare. 

When I started I found [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux) and I still believe it is the simplest and most scalable solution out there (for the beginners).

Since I'm a TypeScript fan for a while I decided to take a shot at making it even more affordable with typing.

The problems I believe I solved are:

- `action types`, `action creators` and `reducer` for any given aspect of the app are always separated somehow (even if they are in the same file you have to scroll a lot because of huge `switch` in the reducer)
- writing sychronous `action creators` is a dumb job anyway
- `switch` is not really the most bulletproof construct programmers know
- you never know if the `action types` you defined are handled in reducer until you try to trigger them and see that it breaks
- you never know if the `action types` are unique until you observe mutation of state in different branches of your state (where you do not expect them to be)
- trying to make all that mess fully typed is a pain and it's very error prone

How those problems are solved:

- you make a duck creator by passing initial state and prefix for all its action types to `makeReduxDuck`, 
- duck creator has only 2 methods: `defineAction` and `getReducer`
- you do not have to write `action creators` - the only thing you need is to type the action payload, write action handler next to action type and give it some name (type) for easier debugging in Redux Dev Tools (all that using `defineAction`)
- reducer is made automaticcaly out of handlers defined in `defineAction` calls and you get it using `getReducer`
- when action arrives to given reducer it is directly passed to proper handler - no `switch` statement there (and we have type hints while writing that handler)

## Installation

```bash
$ npm install teedux
```
or
```bash
$ yarn add teedux
```

## Usage

```typescript
import { makeReduxDuck } from 'teedux'

interface ITask {
  id: number
  title: string
  isDone: boolean
  createdAt: number
}

export interface IState {
  entities: ITask[]
}

const initialState: IState = {
  entities: []
}

// We make duck creator - every action type it handles
// will get `tasks` prefix since now.
const duck = makeReduxDuck('tasks', initialState)

export const addTask = duck.defineAction<{ title: string }>(
  // This is the suffix of action type 
  // (if not unique then you get an error on start of the app)
  'ADD_TASK', 
  // This is the action handler - first param: state, 
  // second param: action payload (action type is stripped so you do not have 
  // to think about it)
  ({ entities }, { title }) => ({
    entities: entities.concat({
      id: Date.now(),
      title,
      isDone: false,
      createdAt: Date.now()
    })
  })
)

export const setTasks = duck.defineAction<{ tasks: ITask[] }>(
  'SET_TASKS',
  (_, { tasks }) => ({
    entities: tasks
  })
)

export const toggleTaskDone = duck.defineAction<{ taskId: number }>(
  'TOGGLE_TASK_DONE',
  ({ entities }, { taskId }) => ({
    entities: entities.map(task => task.id !== taskId ? task : {
      ...task,
      isDone: !task.isDone
    })
  })
)

export const deleteTask = duck.defineAction<{ taskId: number }>(
  'DELETE_TASK',
  ({ entities }, { taskId }) => ({
    entities: entities.filter(task => task.id !== taskId)
  })
)

// That's how the reducer is made :)
export default duck.getReducer()
```

## Contribution

I'm open for pull requests and feedback :) 

You can find me on twitter: @cytrowski
