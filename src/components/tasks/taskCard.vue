<template>
  <div>
    <v-card class="animated fadeInRight ma-3" v-for="task in tasks" v-bind:key="task.task_id">
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
        <v-btn flat color="orange" @click="modifyTask(task.id)">Modificar</v-btn>
        <v-btn flat color="red" @click="deleteTask(task.id)">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['tasks'],
  data () {
    return {
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
    deleteTask: function (taskId) {
      this.$emit('delete-task', taskId)
    },
    modifyTask: function (taskId) {
      this.$emit('modify-task', taskId)
    }
  }
}
</script>

<style lang="scss">
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
