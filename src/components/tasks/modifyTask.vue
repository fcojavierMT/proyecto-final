<template>
  <div>
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
        <v-btn color="blue darken-1" flat @click.native="closeDialog">Cerrar</v-btn>
        <v-btn color="blue darken-1" flat v-on:click="modifyTask" @click.native="closeDialog">Modificar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['taskModifed'],
  data () {
    return {

    }
  },
  methods: {
    modifyTask: function () {
      this.$emit('event-modified')
    },
    closeDialog: function () {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style>

</style>
