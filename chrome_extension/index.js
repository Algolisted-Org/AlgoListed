const contestContainer=document.querySelector('.coding-competition');
const container=document.querySelector('.container');
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

window.addEventListener('load',(event)=>{
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=sHQrBJZaUQIawhYExjPUV6YPqdXeQx41lOToqiRs5rs5r6JLOTXr1Y-IEdAmFW4L_XVMYlfhR-Mvirj6jg-tb35RiQleyhJem5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKHEc-aLaltP9O2ASeUMZJtNW8cSVOyBKfY-TYR-eBoFpxgG6pQf-WNCoQiDIy2FPoojkiKnZSLlVfrVGTwpv_T6zC8ya0Mestz9Jw9Md8uu&lib=M_adtjhtYqTY4x3CHvLkZEzxNTvjCbw04',{
        method:'GET',
    }).then((result)=>{
        return result.json();
    }).then((data)=>{
        let latestContest=[];
        let todayDate=new Date(); // current today in unix format
        for(const contest of data){
            let compDate=contest.competition_date; // date of competition
            let compDateArr=compDate.split(' '); // array of year month and date of day of comp
            let timeInMin=contest.time_start_mins;
            let hour=Math.floor(timeInMin/60); // time-hour
            let minute=timeInMin%60; // time-minutes
            let day=compDateArr[1];
            let year=compDateArr[2];
            let month=monthNames.indexOf(compDateArr[0]);
            let date=new Date(year,month,day,hour,minute); // proper date of day of comp
            const differDate=Math.floor((date-todayDate)/(3600*1000)); // its unix format
            if(differDate<=24*7 && differDate>=0){ // no of hours pls mention
                // if difference is less than or equal to 24 hours
                latestContest.push(contest);
            }
        }
        if(latestContest.length==0){
            const div=document.createElement('div');
            div.innerHTML=`
            <h3 style="text-align:center">No Contest today</h3>
            `
            contestContainer.appendChild(div);
        }
        else{
            let count=1;
            for(const contest of latestContest){
                const platform=contest.platform;
                const time=contest.time_start_mins;
                let hour=Math.floor(time/60);
                let min=time%60;
                if(hour>=0 && hour<=9){
                    hour=`0${hour}`
                }
                if(min>=0 && min<=9){
                    min=`0${min}`
                }
                const date=contest.competition_date;
                const name=contest.competition_name;
                const link=contest.competition_link;
                const div=document.createElement('div');
                div.className="coding-list";div.id=link;
                div.addEventListener('click',(er)=>{
                    window.location.href=link;
                })
                div.innerHTML=`
                <div class="serial-no">
                ${count}.
                </div>
                <div class="details">
                <span class="comp-name">${name}</span><br>
                <span class="comp-details">${platform}, ${date} ${hour}:${min}</span>
                </div>
                `;
                contestContainer.appendChild(div);
                count++;
            }
        }
    }).catch(er=>{
        console.log(er);
    })
})