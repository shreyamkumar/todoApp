<template>
  <div id="app">
    <v-app dark>
      <v-toolbar dark>
        <v-toolbar-title>CRUD App</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat>
          <v-icon left>supervisor_account</v-icon>
        </v-btn>
      </v-toolbar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
</style>
