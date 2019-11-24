<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm4 offset-sm4>
        <v-text-field
          :rules="[rules.required]"
          v-model="newtodo"
          label="Enter a Task"
          append-icon="add"
          box
          @keyup.enter="addtolist"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-3>
      <v-flex xs12 sm4 offset-sm4>
        <v-card class="my-2" v-for="(todo, i) in todos" :key="i">
          <v-card-title primary-title class="blue darken-4">
            <h1>Task {{todo.todoid}}</h1>
            <v-spacer/>
            <v-btn fab small color="#9575CD" @click="removetodo(i)">
              <v-icon dark>remove</v-icon>
            </v-btn>
            <v-btn fab small color="#9575CD" @click="editlist(i)">
              <v-icon dark>edit</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="headline mb-0">{{todo.work}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="nayatodo" max-width="400px">
        <v-card>
          <v-card-title primary-title>
            <h1>Task</h1>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  :rules="[rules.required]"
                  label="Text"
                  v-model="editedtext"
                  @keyup.enter="saveNew"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      nayatodo: false,
      editedtext: "",
      newtodo: "",
      todoid: 0,
      index: 0,
      rules: {
        required: value => !!value || "Required !"
      }
    };
  },
  methods: {
    addtolist() {
      this.$store.dispatch("addTodo", {
        id: this.todoid,
        work: this.newtodo
      });
      this.todoid++;
    },
    editlist(index) {
      this.nayatodo = true;
      this.index = index;
      this.editedtext = this.todos[index].work;
    },
    saveNew(e) {
      this.nayatodo = false;
      this.$store.dispatch("editTodo", {
        index: this.index,
        work: e.target.value
      });
    },

    removetodo(index) {
      this.$store.dispatch("deleteTodo", {
        index
      });
    }
  },
  computed: {
    todos() {
      const todos = this.$store.state.todos;
      this.todoid = todos.length + 1;
      return todos;
    }
  },
  created() {
    this.$store.dispatch("getTodos");
  }
};
</script>



