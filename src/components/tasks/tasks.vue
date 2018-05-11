<template>
  <div id="tasks" class="background-task ma-0">
    <newTask-component v-on:sendTask="sendNewTask"></newTask-component>
    <v-layout class="task-list">
      <v-flex class="task-manager" xs12 sm6 offset-sm3>
        <task-card v-bind:tasks="myTasks" v-on:delete-task="removeTask"></task-card>
      </v-flex>
    </v-layout>
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
      currentId: ''
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
