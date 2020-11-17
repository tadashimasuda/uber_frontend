<template>
    <div class="mt-5 container text-center">
        <p class="text-center err">error 404<br>このページは存在しません。</p>
        <p></p>
        <nuxt-link to="/" class="">トップページへ戻る</nuxt-link>
    </div>
</template>

<style>
p.err{
    color: green;
    font-size: 60px;
    font-weight: bold;
}
</style>