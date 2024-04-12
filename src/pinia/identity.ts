import { defineStore } from 'pinia'

type Identity = {
  username?: string
  name?: string
  role?: string
  token?: string
}
export const useIdentityStore = defineStore(
  'identity',
  () => {
    const identity = ref<Identity>({})
    const setIdentity = (o: Identity) => {
      identity.value = o
    }
    const removeIdentity = () => {
      identity.value = {}
    }
    return {
      identity,
      setIdentity,
      removeIdentity
    }
  },
  {
    persist: true
  }
)
