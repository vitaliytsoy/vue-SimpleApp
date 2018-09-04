<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="scss">
  @import '../node_modules/normalize.css/normalize.css';

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    background: #F9F9F9;
    font-family: 'Open Sans', sans-serif;
  }
  .container {
    width: 90%;
    margin: auto;
    padding: 50px 50px;
  }
  h2 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 1.5em;
    /*margin: 1.5em 0;*/
  }

</style>
