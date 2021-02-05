//clientNodeFetch class is to interact with ehh AppScript Server Node.

class clientNodeFetch { 


///it takes a inputobject and build's it into a encodedURI
static buildEncodedUri(request) {
    const response = [];
    for (let d in request) { response.push(encodeURIComponent(d) + '=' + encodeURIComponent(request[d])); }
    return response.join('&');
}

// unbuilds the URL parameters and returns an object
static unbuildEndodedUri(request) {
    var urifragment = request.split("&"), data = {}, i, parts;
    //process each parameter
    for (i = 0; i < urifragment.length; i++) {
        parts = urifragment[i].split("=");
        if (parts.length < 2) {
            parts.push("");
            console.log(parts);
        }
        data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }

    console.log("Returning from", arguments.callee.name, data);

    return data;
    }
    //This is a basic working version. 
    static fetchHttpRequest(url, request) {
    fetch(url, request)
        .then(response => {
            if (!response.ok) { throw new Error("Could not reach website."); }
            return response.text();
        })
        .then(json => console.log(json))
        .catch(err => console.error(err));

}
//Added Response mutation as per the headers in response.
    static fetchUrl(url, request) {
        fetch(url, request)
        .then(response => {
            const contentType = response.headers.get('content-type');
            console.log("headers", response.headers);
            console.log("response Type is ", contentType);
            if (contentType.includes('application/json')) {
                console.log(contentType, "Caught Json");
                return response.json();
            }
            if (contentType.includes('text/html')) {
                console.log(contentType, "Caught HTML");
                return response.text();
            }
            if (contentType.includes('image/jpeg')) {
                console.log(contentType, "Caught Image");
                response.blob()
                    .then(function (myBlob) {
                        var objectURL = URL.createObjectURL(myBlob);
                        let outputResponse = new Image();
                        outputResponse.src = objectURL;
                        document.getElementsByTagName('body')[0].appendChild(outputResponse)
                    });
            }
            if (contentType.includes('text/plain')) {
                console.log(contentType, "Caught Text");
                return response.text();
            }
        })
        .then(data => {
            console.log("data is ", typeof data, data); /* process your data further */
        })
            .catch(error => console.log(error));
        
        


}




}



