##一、预备知识		
redux [中文文档](http://cn.redux.js.org/) / [英文文档](http://redux.js.org/)  
配套视频 [前30集](https://egghead.io/courses/getting-started-with-redux) / [后30集](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)  

##二、设计思想
1. Web应用是一个状态机，视图与状态是一一对应的。
2. 所有的状态，保存在一个对象里面。

##三、基本概念和API
###3.1 Store
Store就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个Store。  
Redux提供**createStore**这个函数，用来生成Store。  

```
import { createStore } from 'redux';
const store = createStore(fn);
```

上面代码中，**createStore**函数接受另一个函数作为参数，返回新生成的 Store 对象。

###3.2 State
**Store**对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
当前时刻的 State，可以通过**store.getState()**拿到。

```
import { createStore } from 'redux'; 
const store = createStore(fn);
const state = store.getState();
```  
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

###3.3 Action
State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
Action 是一个对象。其中的**type**属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个[规范](https://github.com/acdlite/flux-standard-action)可以参考。

```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

上面代码中，Action 的名称是**ADD_TODO**，它携带的信息是字符串**Learn Redux**。
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。  

###3.4 Action Creator
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

```
const ADD_TODO = '添加 TODO';
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
const action = addTodo('Learn Redux');
```

上面代码中，**addTodo**函数就是一个 Action Creator。

###3.5 store.dispatch()
**store.dispatch()**是 View 发出 Action 的唯一方法。

```
import { createStore } from 'redux';
const store = createStore(fn);
store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```

上面代码中，**store.dispatch**接受一个 Action 对象作为参数，将它发送出去。
结合 Action Creator，这段代码可以改写如下。

```
store.dispatch(addTodo('Learn Redux'));
```

###3.6 Reducer
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子。

```
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};
const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```

上面代码中，**reducer**函数收到名为**ADD**的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。  
实际应用中，Reducer 函数不用像上面这样手动调用，**store.dispatch**方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入**createStore**方法。

```
import { createStore } from 'redux';
const store = createStore(reducer);
```

上面代码中，**createStore**接受 Reducer 作为参数，生成一个新的 Store。以后每当**store.dispatch**发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
为什么这个函数叫做 Reducer 呢？因为它可以作为数组的[**reduce**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce_clone)方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。

```
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];
const total = actions.reduce(reducer, 0); // 3
```

上面代码中，数组**actions**表示依次有三个 Action，分别是加0、加1和加2。数组的**reduce**方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3。

