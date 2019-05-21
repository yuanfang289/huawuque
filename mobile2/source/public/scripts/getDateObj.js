UR.getDateObj = function(timestamp) {
    var dateInst = timestamp ? new Date(timestamp) : new Date();

    return {
        year: dateInst.getFullYear(),
        month: dateInst.getMonth() + 1,
        date: dateInst.getDate(),
        hours: dateInst.getHours(),
        minutes: dateInst.getMinutes(),
        inst: dateInst
    }
};
