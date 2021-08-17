/* eslint-disable no-throw-literal */
import { firestoreAction } from 'vuexfire'

export default {
  async nuxtServerInit ({ dispatch, commit }, ctx) {
    if (this.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
    }

    if (ctx.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
    }

    if (ctx.app.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
    }

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      commit('SET_TOKEN', ctx.res.locals.user.idToken)

      await dispatch('onAuthStateChanged', {
        authUser,
        claims
      })
    }
  },

  onAuthStateChanged ({ commit }, { authUser, claims }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    commit('SET_AUTH_USER', authUser)
  },

  getUser: firestoreAction(async function ({ state, bindFirestoreRef }, ctx) {
    const { uid } = ctx
    const res = this.$fire.firestore
      .collection('users')
      .doc(uid)

    await bindFirestoreRef('user', res, { wait: true })
  }),

  getDataSourceByUser: firestoreAction(async function ({ state, bindFirestoreRef }) {
    const { uid } = state.authUser
    const res = this.$fire.firestore
      .collection('dataSources')
      .doc(uid)

    await bindFirestoreRef('dataSource', res, { wait: true })
  })

}
