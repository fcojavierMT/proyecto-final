<template>
  <div>
    <v-layout row wrap class="ma-0">
      <v-flex xs12>
        <v-parallax src="/static/taks-images/task-wallpaper.jpg" height="1000">
          <v-layout column align-center justify-center>
            <h1 class="main-text animated fadeIn">Administrador de tareas</h1>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <v-btn color="primary" dark slot="activator">Crear tarea {{getUserId}} </v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">Nueva tarea</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          label="Nombre de la tarea"
                          v-model="taskName"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Descripcion de la tarea"
                                      v-model="taskDescription"
                                      required multi-line></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          label="Urgencia"
                          required
                          v-model="taskUrgency"
                          :items="['Poca', 'Mediana', 'Urgente']"
                        ></v-select>
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
          </v-layout>
        </v-parallax>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      dialog: false,
      userId: 'none',
      taskName: '',
      taskDescription: '',
      taskUrgency: ''
    }
  },
  methods: {
    newTask: function () {
      const task = [{
        id: this.userId,
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskUrgency: this.taskUrgency
      }]
      if (this.taskname === '' || this.taskDescription === '' || this.taskUrgency === '') {
        console.log('Datos nulos')
      } else {
        firebase.database().ref('tasks').push(task)
        console.log(task)
      }
    }
  },
  computed: {
    getUserId: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userId = user.uid
        } else {
          console.log('Has cerrado sesión')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~styles/index.scss';

.task-manager {
  height: 1000px;
}
.main-text {
  font-size: 35px;
}

</style>
