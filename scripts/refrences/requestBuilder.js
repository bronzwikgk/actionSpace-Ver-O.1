
var request = {
    resource: {
        serviceName: 'SpreadsheetApp',
        entity: {
            method: 'get',
            entityIdentifier: 'ActiveSpreadsheet()',
            entity: {
                method: 'get',
                entity: 'Sheet',
                entityIdentifier: 'ByName'
            }
        }
    },
    entityName: 'cleanDataSet'
}

options = {
    d:0
}
var request2 = {
    service: {
        serviceName: 'SpreadsheetApp',
        entity: {
            method: 'get',
            entityIdentifier: 'ActiveSpreadsheet()',
        }
    } 
}

function test() {
    var builtrequest = buildRequest(request.resource, "")
    console.log("test",builtrequest,request.entityName);

}


function buildRequest(input, output) {
   // console.log(operate.is(input))
    return operate.isEqualStrict(operate.is(input), 'Object') ? iterate(input,output,options) : false;
    
}


function iterate(input, output, options) {
//console.log(input,output,options)
    for (var key in input) { 
       // console.log("found value", input[key])
        if (operate.isEqualStrict(operate.is(input[key]), "Object")) {
            var buffer = '';
            var buffer = iterate(input[key], buffer);
            
            console.log("output",output,"buffer", buffer);
            
            output = output + '.' + buffer;
           // console.log("found object", input[key], "output is", output)
        } else if (operate.isEqualStrict(operate.is(input[key]), "String")) { 
            output = output + input[key];
            //console.log("found value", input[key], "output is", output)
        }

    }
    console.log("iterate reposne", output);
    return output;

}

class process{
    static iterate(input, output,options,d) {
        if (!d) { d = 0 };
        if (!Object.keys(input).length) return;// if there's no keys, then the call returns undefined
        switch (input?.constructor) {
            case Object:
                process.iterateObj(input, output,options,d);
            case Array:
                process.iterateArr(input, output,options,d);
            case String:
            default:
            // return
        }
        return output;
    }

    static iterateObj(input, output, options,d) { 

        for (var key in input) { 
          //  console.log("begin", key, operate.is(key), input[key], operate.is(input[key]));
            if (operate.isEqualStrict(operate.is(input[key]), "String")) {
                
                output = output + input[key];
                console.log("output Now", output)
            } else if (operate.isEqualStrict(operate.is(input[key]), "Object")) { 
              
              var currentNode = '.';
                process.iterate(input[key], currentNode, key, input[key]);
                process.append(currentNode, output);
                console.log("otuput in obect",output)
            }
        }
        console.log("output",output);
        return output;
    }
    static create(input,output) { 


    }

    static append(input, output) { 
        output = output + input;
console.log("apended",input,output)
        return output;
    }
    static iterateArr(input, output, options) {
        


    }
    

}


test();

