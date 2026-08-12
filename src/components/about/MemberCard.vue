<template>
    <div class="member-card">
      <img :src="`/assets/${image}`" alt="Profile image" class="member-image" />
      <h3 :style="{ color: color }">{{ name }}</h3>
      <h4 class="title">{{ title }}</h4>
      <p class="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: String,
      title: String,
      image: String,
      message: String,
    },
  };
  </script>
  
  <style scoped>
  .member-card {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    max-width: 300px;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
  }
  
  .member-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 15px;
    /* position: absolute;
    border: solid 5px white;
    bottom: 90%;
    right: 7rem; */
  }
  
  .title {
    font-size: 14px;
    color: white
  }
  
  .message {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }
  </style>
  