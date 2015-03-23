angular.module('express')
.filter('timeFilter',function(){
    return function(input){
        var time = new Date(input)
        var now = new Date()
        var timeDate,timeHour,timeMinute
        if((time.getFullYear() == now.getFullYear()) && (time.getDate() == now.getDate() &&(time.getMonth() == now.getMonth()))){
            timeDate = '今天'
        }else{
            timeDate = (time.getMonth()+1)+'月'+time.getDate()+'日'
        }
        timeHour = time.getHours()<10?'0'+time.getHours():time.getHours()
        timeMinute = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes()
        return timeDate+' '+timeHour+':'+timeMinute
    }
})