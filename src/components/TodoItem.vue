<script setup>
import { Icon } from '@iconify/vue'
// 对象定义方式的prop可以在vue调试时，console中获取到类型校验信息
defineProps({
  todo: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

defineEmits(['toggle-complete', 'trigger-editing', 'update-todo', 'delete-todo'])
</script>
<template>
  <li>
    <input type="checkbox" :checked="todo.isCompleted" @input="$emit('toggle-complete', index)" />
    <div class="todo">
      <!-- 所有元素并非都要编辑，因此编辑input采用v-if，减少dom渲染 -->
      <input
        v-if="todo.isEditing"
        type="text"
        :value="todo.todo"
        @input="$emit('update-todo', $event.target.value, index)"
        @keyup.enter="$emit('trigger-editing', index)"
      />
      <!-- 所有元素必然存在todo展示，因此采用v-show，便于toggle性能 -->
      <!-- <span v-show="!todo.isEditing">{{ todo.todo }}</span> -->
      <!-- 方案2:采用 v-else，dom会移除，但是toggle情况少可以使用 -->
      <span v-else :class="{ 'todo-delete': todo.isCompleted }">{{ todo.todo }}</span>
    </div>
    <div class="todo-actions">
      <Icon
        v-if="todo.isEditing"
        class="icon"
        icon="ph:check-circle"
        color="#41b080"
        width="22"
        @click="$emit('trigger-editing', index)"
      />
      <Icon
        v-else
        class="icon"
        icon="ph:pencil-fill"
        color="#41b080"
        width="22"
        @click="$emit('trigger-editing', index)"
      />
      <Icon
        class="icon"
        icon="ph:trash"
        color="#f95e5e"
        width="22"
        @click="$emit('delete-todo', index)"
      />
    </div>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 10px;
  background-color: #f1f1f1;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  &:hover {
    .todo-actions {
      opacity: 1;
    }
  }
  /* 选中input的样式 */
  input[type='checkbox'] {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);

    &:checked {
      background-color: #41b080;
    }
  }

  .todo {
    flex: 1;

    input[type='text'] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
    .todo-delete {
      text-decoration: line-through;
    }
  }

  .todo-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }
}
</style>
