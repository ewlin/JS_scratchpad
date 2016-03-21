//start events 
//scratchpad for ideas

function eventsCreate () {
    this.events = {}; 
}

eventsCreate.prototype.add = function(event, fn) {
    var events = this.events[event]; 
    if (events) {
        events.push(fn); 
    } else {
        this.events[event] = []; 
        this.events[event].push(fn); 
    }
}

eventsCreate.prototype.sendEvent = function(event) {
    if (this.events[event]) {
        this.events[event].forEach(fn=>fn()); 
    }
}




function Event() {
  this.handlers = [];   
}

Event.prototype.subscribe = function(fn) {
  this.handlers.push(fn); 
}

Event.prototype.emit = function(...args) {
   this.handlers.forEach(function(fn) {
       if (fn) {
           fn.apply({}, args); 
       }
   }); 
}

Event.prototype.unsubscribe = function(fn) {
    var fnIndex = this.handlers.indexOf(fn); 
    
    if (fnIndex !== -1) {
        delete this.handlers[fnIndex]; 
    }
}