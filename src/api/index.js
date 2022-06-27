export default async function callApi(endpoint, method = 'GET', data, json=false) {
    if(method!="GET"){
        if(json){
            data = JSON.stringify(data);
        }
        const requestOptions = {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: data
        };
        const result = await fetch(endpoint,requestOptions)
        return result;
    }else{
        return fetch(endpoint)
    }

}

