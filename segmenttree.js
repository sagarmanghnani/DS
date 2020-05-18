class SegmentTree {
  
    constructor(operator){
      this.storeSegmentTree = [];
      this.sentinal = new Object();
      this.operate = ((arg1,arg2) => {
        if(arg1 == this.sentinal){
          return arg2;
        }
        
        else if(arg2 == this.sentinal){
          return arg1;
        }
        else{
          return operator(arg1, arg2);
        }
        
      });
    }
    
    set segmentDataToAssign(data){
      this.segDataToProcess = [];
      for(let element of data){
        this.segDataToProcess.push(element);
      }
    }
  
    get segmentDataToAssign(){
      
      return this.storeSegmentTree;
    }
    
    
    buildSegTree(left , right, pos){
      
      if(left == right){
        this.storeSegmentTree[pos] = this.segDataToProcess[left];
        return this.storeSegmentTree[pos];
      }else{
        var mid = Math.floor((left + right) / 2);
        var left_segtree = this.buildSegTree(left, mid, 2*pos + 1);
        var right_segtree = this.buildSegTree(mid + 1, right, 2*pos + 2);
        
        this.storeSegmentTree[pos] = this.operate(left_segtree, right_segtree);
        return this.storeSegmentTree[pos];
      }
      
    }
    
    _searchRange(q1, q2, r1, r2, pos){
      if(q2 < r1 || r2 < q1){
        return this.sentinal;
      }else if(r1 >= q1 && r2 <= q2){
       
        return this.storeSegmentTree[pos];
      }else{
        
        var mid = Math.floor((r1+r2)/2);
        
        var left_sum = this._searchRange(q1, q2, r1, mid, 2*pos + 1);
        var right_sum = this._searchRange(q1, q2, mid + 1, r2 , 2*pos + 2);
        
        return this.operate(left_sum, right_sum);
      }
    }
    
    updateSegtree(index, r1, r2, diff, pos){
      
      if(r1 == r2 && r1 == index){
       
        this.storeSegmentTree[pos] = this.operate(this.storeSegmentTree[pos], diff);
        return;
      }else{
        var mid = Math.floor((r1 + r2) / 2);
        if(mid >= index){
          this.updateSegtree(index, r1, mid, diff, 2*pos + 1);
          
          this.storeSegmentTree[pos] = this.operate(this.storeSegmentTree[pos], diff);
        }else{
          this.updateSegtree(index, mid + 1, r2, diff, 2*pos + 2);
          this.storeSegmentTree[pos] = this.operate(this.storeSegmentTree[pos], diff);
        }
      }
    }
    
    updateQueryByUser(index, updateValue){
      var diff = updateValue - this.segDataToProcess[index];
      this.updateSegtree(index, 0, this.segDataToProcess.length, diff,0);
    }
    
    
    searchQueryByUser(q1, q2){
      if(q2 > this.segDataToProcess.length - 1 || q1 < 0){
        return -1;
      }else{
        return this._searchRange(q1,q2, 0, this.segDataToProcess.length - 1, 0)
      }
    }
    
  }
  
  function add(num1, num2){
    return num1 + num2;
  }
  var temp = [1,2,3,4,5,6,7];
  var segTree = new SegmentTree(add);
  segTree.segmentDataToAssign = temp;
  segTree.buildSegTree(0, temp.length - 1, 0);
  
  var result = segTree.searchQueryByUser(2, 2);
  segTree.updateQueryByUser(4, 8);
  
  var data = segTree.segmentDataToAssign;
  
  
  
  