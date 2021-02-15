function GetContacts(object) {
    GetContactsAsync(object);
}
async function GetContactsAsync(obj) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const myJson = await response.json();
        var tmpDatas = [];
        for (var i = 0; i < myJson.length; i++) {
            var tmpData = {};
            tmpData["name"] = myJson[i]["name"];
            tmpData["email"] = myJson[i]["email"];
            tmpData["phone"] = myJson[i]["phone"];
            tmpDatas.push(tmpData);
        }
        obj.setState({ data: tmpDatas, showSpinner: false});
    }
    catch (ee) {
        console.log(ee);
    }
}
