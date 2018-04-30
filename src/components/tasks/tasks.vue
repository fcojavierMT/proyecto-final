<template>
  <div class="background-task ma-0">
    <newTask-component v-on:refresh-data="retrieveDataFromFirebase()"></newTask-component>
    <v-layout class="task-list">
      <v-flex class="task-manager" xs12 sm6 offset-sm3>
        <task-card v-bind:tasks="myTasks"></task-card>
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
    retrieveDataFromFirebase: function () {
      this.myTasks = this.taskService.getTasksFromUser()
    }
  },
  created () {
    this.taskService = taskService
    this.retrieveDataFromFirebase()
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
.task-list {
  height: 550px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  display: none;
}
</style>
