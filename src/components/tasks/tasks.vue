<template>
  <div class="background-task ma-0">
    <newTask-component v-on:refresh-data="retrieveDataFromFirebase()"></newTask-component>
    <v-layout class="task-list">
      <v-flex class="task-manager" xs12 sm6 offset-sm3>
        <v-card class="animated fadeInRight ma-3" v-for="task in myTasks" v-bind:key="task.taskId">
          <v-card-media v-bind:class="getClasses(task.taskUrgency)" height="10px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{task.taskName}} <v-chip>{{task.taskUrgency}}</v-chip></h3>
              <div>
                {{task.taskDescription}}
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Modificar</v-btn>
            <v-btn flat color="red">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
        <task-card v-bind:myTasks="myTasks"></task-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import FirebaseTaskService from '../api/firebaseTaskService'

const taskService = new FirebaseTaskService()

export default {
  data () {
    return {
      dialog: false,
      userId: '',
      myTasks: [],
      taskService: ''
    }
  },
  methods: {
    getClasses: function (status) {
      return {
        'danger-status': status === 'Urgente',
        'warning-status': status === 'Mediana',
        'ok-status': status === 'Poca'
      }
    },
    retrieveDataFromFirebase: function () {
      this.myTasks = this.taskService.getTasksFromUser()
    }
  },
  created () {
    this.taskService = taskService
    this.retrieveDataFromFirebase()
    console.log(this.taskService.getTasksFromUser())
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
    overflow: hidden;
    background-image: url("/static/task-images/task-wallpaper.jpg");
    height: 100%;
    width: 100%;
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
.task-list {
  height: 550px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  display: none;
}
</style>
