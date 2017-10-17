export default class Rest{
    static async post(url,body){
        try {
            await console.log('sending DATA: '+body);
            let response = await fetch(url,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: body
              });
            let responseJson = await response.json();
            return responseJson;
          } catch(error) {
            await console.log('rest call error: '+error);
            return null;
        }
    };
}

