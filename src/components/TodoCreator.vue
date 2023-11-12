<script setup>
import { reactive } from 'vue'
import TodoButton from './TodoButton.vue'
// const todoRef = ref('')
const todoState = reactive({
  todo: '',
  invalid: null,
  errMsg: ''
})
// console.log(todoReact)
const emit = defineEmits(['create-todo']) //类似react中的父组件获取子组件数据的方法
const creatTodo = (e) => {
  todoState.invalid = null
  e.preventDefault()
  if (todoState.todo !== '') {
    emit('create-todo', todoState.todo)
    todoState.todo = ''
    return
  }
  todoState.invalid = true
  todoState.errMsg = 'Please enter a todo'
}
</script>

<template>
  <form>
    <!-- 动态class -->
    <div class="input-wrap" :class="{ 'input-err': todoState.invalid }">
      <!-- 数据绑定 v-model -->
      <input type="text" v-model="todoState.todo" />
      <!-- slot using -->
      <TodoButton @click="creatTodo">
        <template #icon>
          <!-- <span>🕙</span> -->
        </template>
        <!-- default slot: no name setting -->
        添加
      </TodoButton>

      <!-- default button slot -->
      <!-- <TodoButton @click="creatTodo" /> -->
    </div>

    <!-- <div class="input-wrap">
      <input type="text" v-model="todoReact.todo" />
      <button>Create</button>
    </div> -->
    <!-- <input type="text" v-model="todoRef" />
    <input type="text" v-model="todoReact.todo" />
    <button>Create</button> -->

    <!-- 条件渲染 -->

    <!-- v-if dom是否渲染 toggle成本高 -->
    <!-- <p v-if="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p> -->

    <!-- v-show 默认渲染dom，调整display -->
    <p v-show="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p>
  </form>
</template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

  &.input-err {
    border-color: red;
  }

  &:focus-within {
    box-shadow:
      0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
