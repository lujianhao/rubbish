<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-icon class="avatar" type="user" />
      <span class="name">用户</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
<!--      <a-menu-item>-->
<!--        <a-icon type="user" />-->
<!--        <span>个人中心</span>-->
<!--      </a-menu-item>-->
      <a-menu-item>
        <a-icon type="rollback" style="font-size: 16px;" />
        <span style="font-size: 16px;">返回一期</span>
      </a-menu-item>
<!--      <a-menu-divider />-->
<!--      <a-menu-item @click="logout">-->
<!--        <a-icon style="margin-right: 8px;" type="poweroff" />-->
<!--        <span>退出登录</span>-->
<!--      </a-menu-item>-->
    </a-menu>
  </a-dropdown>
</template>

<script>

export default {
  name: 'HeaderAvatar',
  methods: {
    logout() {
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    font-size: 20px;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
