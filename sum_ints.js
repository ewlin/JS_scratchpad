function sumIntervals(intervals) {
    intervals = intervals.slice(); 
    intervals.sort(function(x,y) {
        return x[0] == y[0] ? x[1] > y[1] : x[0] > y[0]; 
    }); 
    
    
    var combinedIntervals = intervals.reduce(function(s,e) {
        if (s.length) {
            var combined = doIntervalsOverlap(s[s.length-1],e); 
            if (combined) {
                s[s.length-1] = combined; 
                return s; 
            } else {
                s.push(e); 
                return s; 
            }
        } else {
            return [[e[0],e[1]]]; 
        }
    }, []); 
    
    return combinedIntervals.reduce(function(s,e) {
        return s + (e[1]-e[0])
    }, 0); 
}


//Incomplete 
//Currently assumes that interval A start is less than or equal than interval B start: so [[1,2],[3,4]] works but [[3,4],[1,2]] doesn't
function doIntervalsOverlap(intervalA,intervalB) {

    if (intervalA[1] > intervalB[0]) {
        if (intervalA[1] < intervalB[1]) {
            return [intervalA[0], intervalB[1]]; 
        } else {
            return [intervalA[0], intervalA[1]]; 
        }
    } 
    else {
        return false; 
    }
}

