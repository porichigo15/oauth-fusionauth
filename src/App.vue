<template>
  <div id='app'>
    <header>
      <h1>FusionAuth Example Vue</h1>
    </header>
    <div id='container'>
      <Greeting v-bind:email="email"/>
      <Login v-bind:email="email"/>
    </div>
  </div>
</template>
<script>
import Greeting from './components/Greeting.vue';
import Login from './components/Login.vue';

export default {
  name: 'app',
  components: {
    Greeting,
    Login
  },
  data() {
    return {
      email: null,
      body: null
    }
  },
  mounted() {
    fetch(`http://localhost:9000/user`, {
      credentials: "include" // fetch won't send cookies unless you set credentials
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      this.email = data.introspectResponse.email;
      this.body = data.body;
    });
  },
};
</script>
<style>
h1 {
  text-align: center;
  font-size: 40px;
  font-family: Arial, Helvetica, sans-serif;
}

#container {
  box-sizing: border-box;
  border: 5px solid gray;
  border-radius: 15%;
  width: 400px;
  height: 400px;
  margin: auto;
}
</style>