<template>
  <div id="tasks" class="background-task ma-0">
    <newTask-component v-on:sendTask="sendNewTask"></newTask-component>
    <v-layout class="task-list">
      <v-flex class="task-manager" xs12 sm6 offset-sm3>
        <task-card v-bind:tasks="myTasks" v-on:delete-task="removeTask" v-on:modify-task="eventDialog"></task-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <modify-task v-on:event-modified="modifyTask" v-bind:taskModifed="taskModifed" v-on:close-dialog="closeModal">></modify-task>
    </v-dialog>
  </div>
</template>

<script>
import { db } from '../api/firebaseInit'
import nativeToast from 'native-toast'
import firebase from 'firebase'

const taskReference = db.ref('tasks')

export default {
  name: 'tasks',
  data () {
    return {
      myTasks: [],
      currentId: '',
      dialog: false,
      idTask: '',
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
      nativeToast({
        message: 'Tarea Añadida!',
        position: 'bottom',
        timeout: 3000,
        type: 'success'
      })
    },
    removeTask: function (taskId) {
      taskReference.child(taskId).remove()
      nativeToast({
        message: 'Tarea eliminada!',
        position: 'bottom',
        timeout: 3000,
        type: 'error'
      })
    },
    modifyTask: function () {
      if (this.isEmpty()) {
        nativeToast({
          message: 'Rellena los campos!',
          position: 'bottom',
          timeout: 3000,
          type: 'warning'
        })
      } else {
        taskReference.child(this.idTask).update(this.taskModifed)
        nativeToast({
          message: 'Tarea modificada!',
          position: 'bottom',
          timeout: 3000,
          type: 'warning'
        })
      }
    },
    eventDialog: function (taskId) {
      this.idTask = taskId
      this.dialog = true
      this.getDataToModify(this.idTask)
    },
    closeModal: function () {
      this.dialog = false
    },
    getDataToModify: function (taskId) {
      let objectReturned = this.myTasks.find(task => task.id === taskId)
      this.taskModifed.taskName = objectReturned.taskName
      this.taskModifed.taskDescription = objectReturned.taskDescription
      this.taskModifed.taskUrgency = objectReturned.taskUrgency
    },
    getCurrentUserId: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.currentId = user.uid
        } else {
          this.$router.replace('home')
        }
      })
    },
    isEmpty: function () {
      return this.taskModifed.taskUrgency === '' ||
             this.taskModifed.taskName === '' ||
             this.taskModifed.taskDescription === ''
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
      taskReference.on('child_changed', snapshot => {
        const updatedTask = this.myTasks.find(task => task.id === snapshot.key)
        const index = this.myTasks.indexOf(updatedTask)
        this.myTasks.splice(index, 1)
        this.myTasks.push({...snapshot.val(), id: snapshot.key})
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
