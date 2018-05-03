<template>
  <div id="tasks" class="background-task ma-0">
    <newTask-component></newTask-component>
    <v-layout class="task-list">
      <v-flex class="task-manager" xs12 sm6 offset-sm3>
        <task-card v-bind:tasks="myTasks"></task-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebaseConnection from '../api/firebaseInit'

export default {
  name: 'tasks',
  data () {
    return {
      myTasks: []
    }
  },
  created () {
    firebaseConnection.ref('tasks').on('child_added', (snapshot) => {
      console.log(snapshot.val())
      this.myTasks.push(snapshot.val())
    })
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
