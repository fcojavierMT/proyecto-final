<template>
  <div class="background-task ma-0">
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
    <v-layout class="task-manager">
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="animated fadeIn ma-3" v-for="(task, index) in myTasks" :key="index">
          <v-card-media v-bind:class="getClasses(task.taskUrgency)" height="10px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{task.taskName}}</h3>
              <div>
                {{task.taskDescription}}
              </div>
            </div>
          </v-card-title>
        </v-card>
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
      userId: '',
      taskName: '',
      taskDescription: '',
      taskUrgency: '',
      myTasks: []
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
    },
    getClasses: function (status) {
      return {
        'danger-status': status === 'Urgente',
        'warning-status': status === 'Mediana',
        'ok-status': status === 'Poca'
      }
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid
      } else {
        console.log('Has cerrado sesión')
      }
    })
    firebase.database().ref('tasks').once('value').then(
      (data) => {
        const objectTask = data.val()
        for (let key in objectTask) {
          let object = objectTask[key]
          for (let value in object) {
            if (object[value].id === this.userId) {
              this.myTasks.push({
                id: value,
                userId: object[value].id,
                taskDescription: object[value].taskDescription,
                taskName: object[value].taskName,
                taskUrgency: object[value].taskUrgency
              })
            } else {
              console.log('No tienes tareas')
            }
          }
        }
      }
    )
    .catch(
      (error) => {
        console.log(error)
      }
    )
    console.log(this.myTasks)
  }
}
</script>

<style lang="scss">
@import '~styles/index.scss';

.title {
  height: 300px;
}
.main-text {
  font-size: 35px;
  font-weight: 400;
  color: $white;
  margin-bottom: 30px;
}
.task-title {
  text-align: center;
}
.background-task {
    background-image: url("/static/task-images/task-wallpaper.jpg");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.danger-status {
  background-color: red;
}
.warning-status {
  background-color: yellow;
}
.ok-status {
  background-color: green;
}
</style>
