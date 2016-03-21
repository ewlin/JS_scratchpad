function spyOn(func) {
    var _func = func 
      , _count = _count || 0
      , _calledArgs = []
      , _returnedVals = []; 
  
    function spyFunc() {
        var v; 
        // store arguments in ledger; skip values that exist already 
        if (arguments.length) {
            for (var i=0; i<arguments.length; i++) {
                if (_calledArgs.indexOf(arguments[i])==-1) {
                    _calledArgs.push(arguments[i]); 
                }
            }; 
        }
        
        // apply function 
        v = _func.apply(null, arguments); 
        
        //check if returned value is already in ledger; if not, push value
        if (_returnedVals.indexOf(v)==-1) _returnedVals.push(v)
        
        //increment callCount 
        _count++; 
        
        //return returned value from supplied function 
        return v; 
    }
    
    spyFunc.callCount = function() {
        return _count; 
    }   
    
    spyFunc.wasCalledWith = function(val) {
        return _calledArgs.indexOf(val)==-1 ? false : true; 
    }
    
    spyFunc.returned = function(val) {
        return _returnedVals.indexOf(val)==-1 ? false : true; 
    }
  
    return spyFunc; 
        
}

