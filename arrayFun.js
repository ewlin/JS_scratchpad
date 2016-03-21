//function largestGap(array) {
//    return array.reduce(function(s,e,i) {
//        if (i<array.length-1) {
//            var gap = array[i+1][0]-e[1]; 
//            if (gap > s) s = gap; 
//        }
//        return s; 
//    }, 0); 
//}
//
//function firstMatchingGap(array, searchGap) {
//    var i = 0, gapStart; 
//    
//    while (i<array.length-1) {
//        var gap = array[i+1][0]-array[i][1]; 
//        if (gap >= searchGap) {
//            gapStart = array[i][1]; 
//            return gapStart; 
//        }
//        i++; 
//    }
//    return null; 
//}
//
//var array1 = [[1,2],[4,6],[11,23],[27,34]]
//var array2 = [[1,3],[4,5],[7,14]]
//
////[1,2] [1,3] --> [1,3]
//
//function getStartTime(schedules, duration) {
//     
//    var meetings = schedules.slice();
//    meetings.forEach(function(e) {
//        e.unshift(["09:00", "09:00"]);
//        e.push(["19:00","19:00"]); 
//    }); 
//    
//    var gaps = meetings.map(function(e) {
//        return findAllGaps(e); 
//    })
//    
//    return gaps.map(function(person) {
//        return filterSmallGaps(person, duration); 
//    })
//    //return filterSmallGaps(gaps, duration); 
//    
//}
//
//function findAllGaps(schedule) {
//    return schedule.reduce(function(s,e,i) {
//        if (i<schedule.length-1) {
//            var gap = parseTime(schedule[i+1][0])-parseTime(e[1]); 
//            var startTime = parseTime(e[1]); 
//            if (gap > 0) s.push({startTime: startTime, duration: gap}); 
//        }
//        return s; 
//    }, []); 
//}
//
//function parseTime(time) {
//    var time = time.split(":"); 
//    var minutes = Number(time[0]*60) + Number(time[1]); 
//    return minutes; 
//}
//
//
//function filterSmallGaps(gaps, duration) {
//    return gaps.filter(function(e) {
//        return e["duration"] >= duration; 
//    }); 
//}




function nextVersion(version) {
    var version = version.split('.'); 
    var carried = true; 
    
    for (var i=version.length-1; i>-1; i--) {
        if (carried == true) {
            if (version[i] == 9) {
                version[i] = i==0 ? 10 : 0; 
            } else {
                version[i] = Number(version[i])+1; 
                carried = false; 
            }
        }
        
    }  
    return version.join('.'); 
    
}


//function sortedInsert(head, data) {
//    var nextNode = head; 
//    var previousNode; 
//    
//    if (!nextNode) {
//        var head = new Node(data); 
//        return head; 
//    } else if (data < nextNode.data) {
//        var head = new Node(data); 
//        head.next = nextNode; 
//        return head; 
//    } else {
//        while (nextNode && (data > nextNode.data)) {
//            previousNode = nextNode; 
//            nextNode = nextNode.next;
//        }
//    }
//    
//    previousNode.next = new Node(data); 
//    previousNode.next.next = nextNode; 
//    return head; 
//    
//}

//LINKED LISTS

function Node(data) {
    this.data = data;
    this.next = null;
}


function buildOneTwoThree() {
    var chained = null; 
    
    chained = push(chained, 3); 
    chained = push(chained, 2);
    chained = push(chained, 1); 
    return chained; 
}

// 1->2->3->null -----> 3->2->1->null

function reverse(list) {
    var prev = null; 
    
    if (list) {
        while (list.next != null) {
            var temp = list.next; 
            list.next = prev; 
            prev = list; 
            list = temp; 
        }
        
        list.next = prev; 
    }
    
    
    return list; 
}

 

function getNth(node, index) {
    var ret = node; 
    for (var i=0; i<index; i++) {
        if (ret.next) {
            ret = ret.next; 
        } else {
            throw new Error ('Invalid index');
        }
    } 
    return ret; 
}



//Refactored for clarity 
function sortedInsert(head, data) {
    var nextNode = head; 
    var previousNode; 
    
    var newNode = new Node(data); 
    
    if (!nextNode) {
        head = newNode;  
    } else if (data < nextNode.data) {
        head = newNode;  
        head.next = nextNode; 
    } else {
        while (nextNode && (data > nextNode.data)) {
            previousNode = nextNode; 
            nextNode = nextNode.next;
        }
        previousNode.next = newNode; 
        newNode.next = nextNode; 
    }
    return head; 
}



function Context(first, second) {
  this.first = first;
  this.second = second;
}

function alternatingSplit(head) {
    var currentNode = head; 
    var _second = currentNode.next; 
    var nextNode = currentNode.next; 
    while (nextNode && nextNode.next) {
        currentNode.next = nextNode.next; 
        currentNode = nextNode; 
        nextNode = nextNode.next; 
    } 
    
    //reached next to last node before null; set .next for next to last node to null
    if (!nextNode.next) {
        currentNode.next = null;
    }
    
    return new Context(head, _second); 
} 


