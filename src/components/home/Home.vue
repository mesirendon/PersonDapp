<template>
  <div>
    <h1>Nombre en cadena de bloques</h1>
    <form @submit.prevent>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="name">
      </div>
      <button type="button" @click="save" class="btn btn-primary">Enviar nombre</button>
    </form>
    <h3 v-if="tx">{{ tx }}</h3>
    <h3 v-if="error">{{ error }}</h3>
  </div>
</template>

<script>
import Person from '@/handler/person'

export default {
  data () {
    return {
      name: '',
      error: '',
      tx: ''
    }
  },
  methods: {
    save () {
      Person.setName(this.name)
        .then(tx => {
          this.tx = tx
        })
        .catch(error => {
          this.error = error
        })
    }
  },
  created () {
    Person.init()
      .then(console.info)
      .catch(console.error)
  },
  mounted () {
    Person.getName()
      .then(name => {
        this.name = name
      })
      .catch(error => {
        this.error = error
      })
  }
}
</script>
