<template>
  <div>
    <h1>App</h1>
    <div>
      <button class="btn btn-secondary" @click="signOut">
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    async signOut () {
      await this.$fire.auth.signOut()
      await this.$router.push('/')
    }
  }
}
</script>
