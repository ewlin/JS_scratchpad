function generateBC(url, separator) {
    var breadcrumb = ""; 
    var urlTrack = ""; 

    var splitUrl = url.replace(/https?\:\/\//, "").split('/').map(function(e) {
            e = e.split(/\.|\#|\?/)[0];
            return e.match(/index/i) ? undefined : e; 
          }).filter(function(e) { return !!e }); 
    
        
    if (splitUrl.length > 1) {    
        for (var i=0; i<splitUrl.length; i++) {
            var item = splitUrl[i]; 
            var display = (item.length > 30) ? acronym(item).toUpperCase() : replaceHyphen(item).toUpperCase(); 
            if (i == 0) {
                breadcrumb = breadcrumb + '<a href="/">HOME</a>' + separator; 
            } else if (i == splitUrl.length-1) {
                breadcrumb = breadcrumb + '<span class="active">' + display + '</span>'; 
            } else {
                urlTrack = urlTrack + item + "/"; 
                breadcrumb = breadcrumb + '<a href="/' + urlTrack + '">' + display + '</a>' + separator; 
            }
        }
        
    } else {
        breadcrumb = breadcrumb + '<span class="active">HOME</span>'; 
    }
    
    return breadcrumb; 
    
    function acronym (string) {
        var dict = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]; 
        return string.split('-').reduce(function(s,e){
            return (dict.indexOf(e) !== -1) ? s : s + e[0]; 
        },""); 
    }

    function replaceHyphen (string) {
        return string.split('-').join(' '); 
    }
}


