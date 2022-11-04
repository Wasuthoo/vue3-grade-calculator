import { defineStore } from "pinia";

export const store_pinia = defineStore({
  id: "pinia",
  state: () => ({
    grade: 0,
  }),

  getters: {
    getCustomers(){
      console.log(this.customer);
      return this.customer
    },

    getResult(){
      const data = {
        cost : this.result,
        items : this.items,
      }
      console.log(data)
      return data
    }

  },
  actions: {
    calculate(){
      this.item = [];
      const n = this.val.length;
      this.printknapSack(this.W, this.wt, this.val, n)
    },

    setResult(res){
      this.result.push(res);
    },

    setSelectItem(item){
      this.items.push(item)
    },

    setCustomers(payload){
      this.val.push(payload.cost);
      this.wt.push(payload.demand);
      console.log(this.val);
      console.log(this.wt);

    },

    max(a, b) {
      return (a > b) ? a : b;
    },


    // Prints the items which are put
    // in a knapsack of capacity W
    printknapSack(W, wt, val, n) {
      let i, w;
      let K = new Array(n + 1);
      for (i = 0; i < K.length; i++) {
        K[i] = new Array(W + 1);
        for (let j = 0; j < W + 1; j++) {
          K[i][j] = 0;
        }
      }

      // Build table K[][] in bottom up manner
      for (i = 0; i <= n; i++) {
        for (w = 0; w <= W; w++) {
          if (i == 0 || w == 0)
            K[i][w] = 0;
          else if (wt[i - 1] <= w)
            K[i][w] = Math.max(val[i - 1] +
              K[i - 1][w - wt[i - 1]],
              K[i - 1][w]);
          else
            K[i][w] = K[i - 1][w];
        }
      }

      // stores the result of Knapsack
      let res = K[n][W];
      // document.write(res + "<br>");
      this.setResult(res);
      console.log(res);

      w = W;
      
      for (i = n; i > 0 && res > 0; i--) {

        // either the result comes from the top
        // (K[i-1][w]) or from (val[i-1] + K[i-1]
        // [w-wt[i-1]]) as in Knapsack table. If
        // it comes from the latter one/ it means
        // the item is included.
        if (res == K[i - 1][w])
          continue;
        else {

          // This item is included.\
          this.setSelectItem(wt[i - 1])
          console.log(wt[i - 1]);

          // document.write( + " ");

          // Since this weight is included its
          // value is deducted
          res = res - val[i - 1];
          w = w - wt[i - 1];
        }
      }
    },
   

  
  },
 
});

