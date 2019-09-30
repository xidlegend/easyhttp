// ES5 - Prototypes used, updated in the FETCH API project

function easyHTTP(){
    this.http = new XMLHttpRequest();
}

// =============== Make an HTTP GET Request ================ //
easyHTTP.prototype.get = function(url,callback) {
    // Because scope is lost in the onload function
    // let self = this.http;
    // Open the XMLHTTP Request
    this.http.open('GET', url, true);

    this.http.onload = function(){
        if(this.status === 200){
            callback(null, this.responseText);
        } else {
            callback('Error: ' + this.status);
        }
    }
    this.http.send();
}


// =============== Make an HTTP POST Request ================ //
easyHTTP.prototype.post = function(url, data, callback){
    this.http.open('POST', url, true);
    // When sending a post request, need to set the content type header
    this.http.setRequestHeader('Content-type', 'application/json')

    this.http.onload = function(){
        // Http code 201 is 'Created successfully'
        if(this.status === 201){
            callback(null, this.responseText);
        } else {
            callback('Error: ' + this.status);
        }
    }

    // Data to be sent because this is POST request
    this.http.send(JSON.stringify(data))
}


// ============== Make an HTTP PUT Request ================== //
easyHTTP.prototype.put = function(url, data, callback){
    this.http.open('PUT', url, true);
    // When sending a post request, need to set the content type header
    this.http.setRequestHeader('Content-type', 'application/json')

    this.http.onload = function(){
        // Http code 202 is 'Accepted successfully'
        if(this.status === 202 || this.status === 200){
            callback(null, this.responseText);
        } else {
            callback('Error: ' + this.status);
        }
    }
    // Data to be sent because this is POST request
    this.http.send(JSON.stringify(data))
}

// ============== Make an HTTP DELETE Request ================== //
easyHTTP.prototype.delete = function(url,callback) {

    this.http.open('DELETE', url, true);

    this.http.onload = function(){
        if(this.status === 200){
            callback(null);
        } else {
            callback('Error: ' + this.status);
        }
    }
    this.http.send();
}