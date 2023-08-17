<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <!-- 输入添加待办 -->
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="count">
      <!-- 全选checkbox -->
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="alldone"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- 待办事项 -->
        <li v-for="todo in filteredTodos" :key="todo" :class="{editing: todo===editingTodo, completed:todo.completed}">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed"/>
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="remove(todo)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-editing-focus="todo === editingTodo"
            v-model="todo.text"
            @keyup.enter="doneEdit(todo)"
            @blur="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="count">
      <span class="todo-count">
        <strong>{{ remainingCount }}</strong>
        {{remainingCount>1?'items':'item'}} left
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-show="count>remainingCount"
      >
        Clear completed
      </button>
    </footer>
  </section>
  <footer class="info">
    <p>keyup 'Enter' to create a ToDo</p>
    <p>Double-click to edit a ToDo</p>
    <p>Created by Romy</p>
  </footer>
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import useLocalStorage from './utils/useLocalStorage'
import "./assets/index.css";

//创建 本地存储 变量
const storage = useLocalStorage()

//添加待办事项
const useAdd = todos => {
  //创建input响应式数据
  const input = ref('')
  //创建 添加事项 方法
  const addTodo = ()=>{
    const text = input.value && input.value.trim()
    if(text.length===0) return 
    todos.value.unshift({text,completed:false})
    input.value=""
  }
  return {
    input,addTodo
  }
}

//删除事项
const useRemove = (todos)=>{
  //定义删除点击事件
  const remove = todo =>{
    const index = todos.value.indexOf(todo)
    todos.value.splice(index,1)
  }

  const removeCompleted = ()=>{
    todos.value = todos.value.filter(todo=>!todo.completed)
  }
  return {remove,removeCompleted}
}

//编辑事项
const useEdit = (remove)=>{
  //创建 记录编辑前内容 变量
  let beforeEditingText = "";
  //创建 记录正在编辑项 变量
  const editingTodo = ref(null)
  //创建 编辑事件
  const editTodo = todo =>{
    beforeEditingText = todo.text
    editingTodo.value = todo
  }
  //创建 编辑完成事件
  const doneEdit = todo =>{
    if(!editingTodo.value) return 
    todo.text = todo.text.trim()
    todo.text || remove(todo)
    editingTodo.value=null
  }
  //创建 取消编辑事件
  const cancelEdit = todo => {
    editingTodo.value = null
    todo.text =beforeEditingText
  }
  return {
    editingTodo,
    editTodo,
    doneEdit,
    cancelEdit
  }
}

//切换事项完成状态
const useFilter = todos =>{
  //设置事项已完成状态
  const alldone = computed({
    get(){
      return !todos.value.filter(todo=>!todo.completed).length
    },
    set(value){
      todos.value.forEach(todo => {
        todo.completed=value
      });
    }
  })

  //过滤 全部 待办 已完成 事项列表
  const filter = {
    all:list=>list,
    active:list=>list.filter(todo=>!todo.completed),
    completed:list=>list.filter(todo=>todo.completed)
  }
  //创建 记录当前事项列表状态 变量
  const type = ref('all')
  //创建 记录已过滤的事项列表 变量
  const filteredTodos = computed(()=>filter[type.value](todos.value))
  //创建 待办事项数量 变量
  const remainingCount = computed(()=>filter.active(todos.value).length)
  //
  const count = computed(()=>todos.value.length)
  //创建 状态变化 事件
  const onHashChagne=()=>{
    const hash = window.location.hash.replace('#/','')
    if(filter[hash]){
      type.value=hash
    }else{
      type.value='all'
      window.location.hash=''
    }
  }

  //页面挂在执行 挂载监听事件
  onMounted (()=>{
    window.addEventListener('hashchange',onHashChagne)
    onHashChagne()
  })

  //卸载监听事件
  onUnmounted (()=>{
    window.removeEventListener('hashchange',onHashChagne)
  })

  return {alldone,filteredTodos,remainingCount,count}
}

//存储待办事项
const useStorage=()=>{
  const KEY ='TODOKEY'
  const todos = ref(storage.getItem(KEY)||[])
  watchEffect(()=>{
    storage.setItem(KEY,todos.value)
  })
  return todos
}

export default {
  name: "App",
  setup() {
    const todos = useStorage()
    const {remove,removeCompleted} = useRemove(todos)

    return{
      todos,
      remove,
      removeCompleted,
      ...useAdd(todos),
      ...useEdit(remove),
      ...useFilter(todos)
    }
  },
  //注册指令
  directives: {
   editingFocus:(el,binding)=>{
    binding.value&&el.focus()
   }
  },
};
</script>

<style></style>
