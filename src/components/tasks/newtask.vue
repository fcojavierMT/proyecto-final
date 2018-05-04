<template>
  <div>
    <v-layout class="new-task-title title column align-center justify-center">
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
                <v-text-field label="Nombre de la tarea" v-model="task.taskName" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Descripcion de la tarea" v-model="task.taskDescription" required multi-line></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select label="Urgencia" required v-model="task.taskUrgency" :items="['Poca', 'Mediana', 'Urgente']"></v-select>
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

export default {
  data () {
    return {
      dialog: false,
      taskService: '',
      task: {
        taskName: '',
        taskDescription: '',
        taskUrgency: '',
        userId: '',
        task_id: ''
      }
    }
  },
  methods: {
    newTask: function () {
      this.task.task_id = this.generateUUID()
      this.task.userId = this.getCurrentUserId()
      this.$emit('sendTask', this.task)
    },
    generateUUID: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },
    getCurrentUserId: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return user.uid
        }
      })
    },
    cleanFormFields: function () {
      this.task.taskName = ''
      this.task.taskDescription = ''
      this.task.taskUrgency = ''
    }
  },
  created () {

  }
}
</script>

<style lang="scss">

.new-task-title {
  height: 200px;
}
.main-text {
  text-align: center;
}
</style>
