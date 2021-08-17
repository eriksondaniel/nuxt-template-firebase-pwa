<template>
  <div>
    <h1>
      Iniciar sesión
    </h1>
    <div>
      <button class="btn btn-primary" @click="signInWithGoogle">
        signInWithGoogle
      </button>
    </div>
  </div>
</template>

<script>
export default {
  async mounted () {
    const { authUser } = this.$store.state

    if (authUser) {
      await this.$router.push('/app')
    }
  },

  methods: {
    async signInWithGoogle () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      provider.addScope(
        'https://www.googleapis.com/auth/fitness.activity.read'
      )
      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // You can add or remove more scopes here provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const authData = await this.$fire.auth.signInWithPopup(provider)

      this.$store.commit('SET_CREDENTIAL', authData.credential)

      if (authData.additionalUserInfo.isNewUser) {
        await this.createUser(authData)
      }

      await this.$router.push('/')
    },

    async createUser (data) {
      const { credential, additionalUserInfo, user } = data
      const date = new Date().getTime()
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(user.uid)
          .set({
            createDate: date,
            uid: user.uid,
            ...credential,
            ...additionalUserInfo.profile,
            role: 'user'
          })
      } catch (error) {
        return 'error'
      }
    }
  }
}
</script>
