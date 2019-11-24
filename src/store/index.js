import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    setTodos: (state, payload) => {
      state.todos = payload
    },
    addTodo: (state, payload) => {
      state.todos.push(payload);


    },
    setTodo(state, payload) {
      state.todos[payload.index].work = payload.work
    },
    removetodo(state, payload) {
      state.todos.splice(payload.index, 1);
    }
  },
  actions: {
    getTodos: ({
      commit
    }) => {
      firebase.database().ref('todos').once('value', snapshot => {
        const data = snapshot.val()
        const todos = []
        for (var key in data) {
          todos.push({
            ...data[key],
            key
          });
        }
        if (todos.length > 0) {
          commit('setTodos', todos)
        }
      })
    },
    editTodo: ({
      commit,
      state
    }, payload) => {
      const todokey = state.todos[payload.index].key
      firebase.database().ref('todos/' + todokey).update({
        work: payload.work
      }).then(() => {
        commit('setTodo', payload)
      })
    },
    deleteTodo: ({
      commit,
      state
    }, payload) => {
      const todokey = state.todos[payload.index].key
      firebase.database().ref('todos/' + todokey).remove().then(() => {
        commit('removetodo', payload)
      })
    },
    addTodo: ({
      commit
    }, todo) => {
      const todokey = firebase.database().ref('todos').push().key
      firebase.database().ref(`todos/${todokey}`).update(todo)
        .then(() => {
          commit("addTodo", { ...todo,
            key: todokey
          });
        })
    }
  }
})
