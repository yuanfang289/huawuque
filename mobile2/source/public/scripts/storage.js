UR.storage = function (nameSpace,data) {
    if(data){
        localStorage.setItem(nameSpace,JSON.stringify(data));
        return;
    }
    return (nameSpace && JSON.parse(localStorage.getItem(nameSpace))) || null;
};
