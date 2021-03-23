

const GetTodayTime = function (millisecond = 0){
    
    d = new Date(); 
    d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
    d.setTime( d.getTime() + millisecond );
    return d;
}

module.exports = 
{
    GetTodayTime
};