<script setup>
import { ref, watch, computed } from 'vue'
import { uid } from 'uid'
import TodoCreator from '../components/TodoCreator.vue'
import TodoItem from '../components/TodoItem.vue'

import { Icon } from '@iconify/vue'

const fetchLocalStorage = () => {
  if (localStorage.getItem('todoList')) {
    return JSON.parse(localStorage.getItem('todoList'))
  }
  return []
}
const updateLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList.value))
}

const todoList = ref(fetchLocalStorage())
const todoComplete = computed(() => {
  //every 作用 就是对每一个item进行判断，只有全部为true时，才会返回true
  return todoList.value.every((todo) => todo.isCompleted)
})
// 采用watch监听，只要变化就会触发参数二传入的回调，该回调接收 newValue和oldValue两个参数——类似react的reducer ; 第三个参数options为对象配置项——类似react的action，当deep为true时，会递归（深：包括数组/对象等更深层的变化）监听
watch(
  todoList,
  () => {
    updateLocalStorage()
  },
  {
    deep: true //数组或对象类需要！！！！
  }
)
const updateTodoList = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: null,
    isEditing: null
  })
}
const updateTodoComplete = (index) => {
  todoList.value[index].isCompleted = !todoList.value[index].isCompleted
}
const updateTodoEditing = (index) => {
  todoList.value[index].isEditing = !todoList.value[index].isEditing
}
const updateTodoItem = (value, index) => {
  todoList.value[index].todo = value
}
const deleteTodoItem = (index) => {
  todoList.value.splice(index, 1)
}
</script>

<template>
  <main>
    <h1>待办清单</h1>
    <TodoCreator @create-todo="updateTodoList" />
    <ul class="todo-list" v-if="todoList.length > 0">
      <!-- v-for 循环 -->
      <TodoItem
        v-for="(todo, index) in todoList"
        :key="todo.id"
        :todo="todo"
        :index="index"
        @toggle-complete="updateTodoComplete"
        @trigger-editing="updateTodoEditing"
        @update-todo="updateTodoItem"
        @delete-todo="deleteTodoItem"
      />
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="emojione:sad-but-relieved-face" width="32" />
      <span>暂无代办！👆添加一个</span>
    </p>
    <p class="todos-msg" v-if="todoComplete && todoList.length > 0">
      <Icon icon="emojione:party-popper" width="32" /> <span>恭喜完成所有待办</span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>
