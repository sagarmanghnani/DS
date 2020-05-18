class SegmentTree{
    
  constructor(operator, iterable){
      this.sentinal = new Object();
      this.arrToProcess = [];
      this.segTreeArr = [];
      for(let iter of iterable){
          this.arrToProcess.push(iter);
      }
      
      this.operate = ((a, b) => {
         if(a == this.sentinal){
             return b;
         }else if(b == this.sentinal){
             return a;
         }else{
             return operator(a, b);
         } 
      });
      
      this.createSegTree(0, this.arrToProcess.length - 1, 0);
  }
  
  createSegTree(low, high, pos){
      if(low == high){
          this.segTreeArr[pos] = this.arrToProcess[low];
          return this.segTreeArr[pos];
      }else{
          var mid = (low + high) >>> 1;
          var left_val = this.createSegTree(low, mid, 2*pos + 1);
          var right_val = this.createSegTree(mid + 1, high, 2*pos + 2);
          
          this.segTreeArr[pos] = this.operate(left_val, right_val);
          return this.segTreeArr[pos];
      }
  }
  
  _searchQuery(r1, r2, q1, q2, pos){
      
      if(r1 > q2 || r2 < q1){
          return this.sentinal;
      }else if(q1 <= r1 && q2 >= r2){
          return this.segTreeArr[pos]
      }else{
          
          var mid = (r1 + r2) >>> 1;
          
          var left_val = this._searchQuery(r1, mid, q1, q2, 2*pos + 1);
          var right_val = this._searchQuery(mid + 1, r2, q1, q2, 2*pos + 2);
          
          
          
          
          return this.operate(left_val, right_val);
      }
  }
  
  searchQueryForUser(q1, q2){
      var result =  this._searchQuery(0, this.arrToProcess.length - 1, q1, q2, 0);
      
      return result;
  }
  
  _updateSegTree(index, updateValue, low, high, pos){
      if(low == high){
          if(low == index){
              this.segTreeArr[pos] = updateValue;
          }
          return this.segTreeArr[pos];
      }else if(low > index || index > high){
          //this means it is out of place
          return this.segTreeArr[pos];
      }else{
          
          var mid = (low + high) >>> 1;
          var left_val= this._updateSegTree(index, updateValue, low, mid, 2*pos + 1);
          var right_val = this._updateSegTree(index, updateValue, mid + 1, high, 2*pos + 2);
          this.segTreeArr[pos] = this.operate(left_val, right_val);
          return this.segTreeArr[pos];
      }
  }
  
  updateSegTree(index, updateValue){
      this._updateSegTree(index, updateValue, 0, this.arrToProcess.length - 1, 0);
  }
  
  
}