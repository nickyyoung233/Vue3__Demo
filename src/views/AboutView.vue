<template>
  <div class="about">
    <h1>关于Vue Todos</h1>
    <p>这是一个具备<strong>增删改</strong>功能的待办清单</p>
    <p>采用了vue3的<strong>Composition API</strong>特性</p>
    <p>
      开发者负担不起数据库成本，利用本地缓存方式记录待办，不用担心刷新丢失，但也很容易丢失，使用时不要轻易关闭自己的浏览器😊
    </p>
    <p>点击待办即刻尝试</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
