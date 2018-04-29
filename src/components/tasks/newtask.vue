<template>
  <div>
    <v-layout class="title column align-center justify-center">
      <h1 class="main-text animated fadeIn">Administrador de tareas</h1>
      <v-btn color="primary" dark slot="activator" @click.native="dialog = true">Crear tarea </v-btn>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Nueva tarea</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nombre de la tarea" v-model="taskName" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Descripcion de la tarea" v-model="taskDescription" required multi-line></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select label="Urgencia" required v-model="taskUrgency" :items="['Poca', 'Mediana', 'Urgente']"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>* Campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" flat v-on:click="newTask" @click.native="dialog = false">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import firebase from 'firebase'
import db from '../api/firebaseInit'

export default {
  data () {
    return {
      dialog: false,
      taskName: '',
      taskDescription: '',
      taskUrgency: '',
      userId: ''
    }
  },
  methods: {
    newTask: function () {
      db.collection('tasks').add({
        taskDescription: this.taskDescription,
        taskName: this.taskName,
        taskUrgency: this.taskUrgency,
        task_id: this.generateUUID(),
        userId: this.userId
      }).then(this.$emit('refresh-data'))
    },
    generateUUID: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    getCurrentUserId: function () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.userId = user.uid
        }
      })
    }
  },
  created () {
    this.getCurrentUserId()
  }
}
</script>

<style>

</style>
