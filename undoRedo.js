function undoRedo(object) {
    
    var _undos = [];
    var _redos = []; 
    var allowUndo = true; 
    
	return {
      
		set: function(key, value) {
            if (!allowUndo) {
                allowUndo = true, _undos = [], _redos = []; 
            }
            if (object[key]) {
                _undos.push({key: key, oldValue: object[key], newValue: value, op: 'updated'});  
            } else {
                _undos.push({key: key, value: value, op: 'added'});  
            }
            object[key] = value;   
        },
        
		get: function(key) {
            return object[key];
        },
        
		del: function(key) { 
            if (!allowUndo) {
                allowUndo = true, _undos = [], _redos = []; 
            }
            _undos.push({key: key, value: object[key], op: 'deleted'});  
            delete object[key]; 
        },
        
		undo: function() {
            var undoNums = _undos.length; 
            
            if (allowUndo) allowUndo = false; 
            if (undoNums) {
                if (_undos[undoNums-1]['op'] === 'added') {
                    delete object[_undos[undoNums-1]['key']];
                } else if (_undos[undoNums-1]['op'] === 'deleted') {
                    object[_undos[undoNums-1]['key']] = _undos[undoNums-1]['value']; 
                } else if (_undos[undoNums-1]['op'] === 'updated') {
                    object[_undos[undoNums-1]['key']] = _undos[undoNums-1]['oldValue']; 
                }
                _redos.push(_undos.pop()); 
                
            } else {
                throw new Error('nothing to undo'); 
            }
        },
                             
        redo: function() {
            var redoNums = _redos.length; 

            if (redoNums) {
                if (_redos[redoNums-1]['op'] === 'added') {
                    object[_redos[redoNums-1]['key']] = _redos[redoNums-1]['value'];
                } else if (_redos[redoNums-1]['op'] === 'deleted') {
                    delete object[_redos[redoNums-1]['key']]; 
                } else if (_redos[redoNums-1]['op'] === 'updated') {
                    object[_redos[redoNums-1]['key']] = _redos[redoNums-1]['newValue']; 
                }
                _undos.push(_redos.pop()); 

            } else {
                throw new Error('nothing to redo'); 
            }
        }               
    }	
}

