exports.getDate = function (){
var date = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }
    var today = date.toLocaleDateString("en-US", options);
    return today;
}

exports.helloWorld = () =>{
    return "About me!";
}
