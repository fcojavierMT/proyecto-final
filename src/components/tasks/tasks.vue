<template>
  <div id="tasks" class="background-task ma-0">
    <newTask-component v-on:sendTask="sendNewTask"></newTask-component>
    <v-layout class="task-list">
      <v-flex class="task-manager" xs12 sm6 offset-sm3>
        <task-card v-bind:tasks="myTasks" v-on:delete-task="removeTask" v-on:modify-task="eventDialog"></task-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Modificar tarea</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Nombre de la tarea" v-model="taskModifed.taskName" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Descripcion de la tarea" v-model="taskModifed.taskDescription" required multi-line></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select label="Urgencia" required v-model="taskModifed.taskUrgency" :items="['Poca', 'Mediana', 'Urgente']"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>* Campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
          <v-btn color="blue darken-1" flat v-on:click="modifyTask" @click.native="dialog = false">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from '../api/firebaseInit'
import firebase from 'firebase'

const taskReference = db.ref('tasks')

export default {
  name: 'tasks',
  data () {
    return {
      myTasks: [],
      currentId: '',
      dialog: false,
      taskModifed: {
        taskName: '',
        taskDescription: '',
        taskUrgency: ''
      }
    }
  },
  methods: {
    sendNewTask: function (value) {
      console.log(value)
      taskReference.push(value)
    },
    removeTask: function (taskId) {
      taskReference.child(taskId).remove()
    },
    modifyTask: function () {

    },
    eventDialog: function (taskId) {
      console.log(taskId)
      this.dialog = true
    },
    getCurrentUserId: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.currentId = user.uid
        }
      })
    },
    getCurrentTasksFromUser: function () {
      taskReference.on('child_added', (snapshot) => {
        if (this.currentId === snapshot.val().userId) {
          this.myTasks.push({...snapshot.val(), id: snapshot.key})
        }
      })
      taskReference.on('child_removed', snapshot => {
        const deletedTask = this.myTasks.find(task => task.id === snapshot.key)
        const index = this.myTasks.indexOf(deletedTask)
        this.myTasks.splice(index, 1)
      })
    }
  },
  created () {
    this.getCurrentUserId()
    setTimeout((user) => {
      this.getCurrentTasksFromUser()
    }, 200)
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
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.task-manager {
  height: 550px;
  overflow-y: scroll;
}

</style>
