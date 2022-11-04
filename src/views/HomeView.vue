<template>
  <v-container fluid class="bg-pink-lighten-2 ma-0 fill-height">

  </v-container>
</template>

<script>

import { store_pinia } from "../stores/store";

export default {
  name: "HomeView",

  data: () => ({
    modelStore: store_pinia(),
    customer: [
    { name: "A", demand: "3", cost: "100" }, 
    { name: "B", demand: "4", cost: "50" },
    { name: "C", demand: "2", cost: "200" }],
    serv :[],
    dialogAdd: false,
    dialogRes: false,
    name: "",
    demand: "",
    cost: "",
    result:""
  }),

  computed: {

  },

  methods: {
    getCustomers() {
      this.customer = this.modelStore.getCustomers
    },
    addCustomer() {
      if (this.name == "" || this.demand == "" || this.cost == "") {
        alert("Please enter Every field")
        
      }
      else if(this.demand > 8 || this.demand < 1){
        alert("Please enter number between 1-8")
      }
      else if (this.cost < 0){
        alert("Please enter number more than 0")
      }
      else{
        const input = {
        name: this.name,
        demand: this.demand,
        cost: this.cost,
      }
      this.customer.push(input);
      this.modelStore.setCustomers(input);
      this.dialog = false;
      this.name = "";
      this.demand = "";
      this.cost = "";
      this.dialogAdd = false;
      }
    },
     getResult(){
      this.result = this.modelStore.getResult
      this.modelStore.calculate();
      this.serveCustomer();
      this.dialogRes = true;

      console.log(this.result);
     },

     serveCustomer(){
      for (let i = 0; i < this.customer.length; i++){
        for (let j = 0; j < this.result.items.length; j++) {
        if (this.customer[i].demand == this.result.items[j]) {
          this.serv.push(this.customer[i]);
        }
      }
      }
    }
  },
};
</script>