var audio = document.getElementById('audio');//获取播放器
var anniu = document.getElementById("cover");//获取播放暂停的按钮
var allLI = document.getElementById("ul").getElementsByTagName("li");//获取播放列表
var allAA = document.getElementById("ul").getElementsByTagName("a");//获取播放列表外a
var wenzi = document.getElementById("song_name").getElementsByTagName("span")[0];//获取歌曲名称的位置
var goSinger = document.getElementById("goSinger").getElementsByTagName("span")[0];//获取演唱者的位置
var shagnyiqu=document.getElementById("play_left");//上一曲按钮
var xiayiqu=document.getElementById("play_right");//下一曲按钮
var this_jis = 0;

audio.src=allLI[0].getAttribute("data-name");//第一首音乐
wenzi.innerHTML=allLI[0].getElementsByTagName("b")[0].innerHTML;//第一首歌曲名称
goSinger.innerHTML=allLI[0].getElementsByTagName("span")[0].innerHTML;//第一首演唱者
allAA[0].className="danqian";

anniu.onclick=function(){//单机控制按钮时
    if(anniu.className=="btn_play"){//判断是否在播放
        anniu.className="btn_pause";//没有播放，点击实现播放
            audio.play();//执行播放
            var zanting=setInterval(timing,1)
    }else{
        anniu.className="btn_play";//正在播放，点击暂停
        audio.pause();//执行暂停
    }
}//所有的实现播放和暂停
//播放器播放专用
//window.onload=function(){//视频加载完后执行
//}


function timing(){
    var zs=audio.duration;//音频总时长
    var present=document.getElementById("currentTime");//当前时长位置
    var jpProgress=document.getElementById("play_loading");//缓冲条
    var barState=document.getElementById("play_on");//进度条
    var dq=audio.currentTime;//当前播放时间
    
    
    var always=document.getElementById("totalTime");//总时长位置
    m=parseInt(zs/60);
    s=Math.floor(zs%60);
    always.innerHTML=m+":"+s;
    
    dm=parseInt(dq/60);
    ds=Math.floor(dq%60);
    present.innerHTML=dm+":"+ds;//但前播放时间显示
    
    jd=(dq/zs)*100;
    barState.style.WebkitTransform="translateX("+jd+"%)";//进度条
    
    var buffer = audio.buffered.end(0);//缓冲帧
    hc=(buffer/zs)*100;
    jpProgress.style.WebkitTransform="translateX("+hc+"%)";//缓冲条
}

var zanting=setInterval(timing,1)
var allTiao=document.getElementById("progress");//
var barState=document.getElementById("play_on");//进度条
allTiao.onclick=function(){//点击滚动条事件
    function getX(obj){//点击获取长度
        //获取div剧左侧的距离
        var parObj=obj;  
        var left=obj.offsetLeft;  
        while(parObj=parObj.offsetParent){  
            left+=parObj.offsetLeft;  
        }  
        return left;  
    }

    function DisplayCoord(event){  
        var top,left,oDiv;  
        oDiv=document.getElementById("progress");  
        left=getX(oDiv);
        dianji=event.clientX-left+document.body.scrollLeft;//点击时的位置像素
    }

    var zsc=audio.duration//总时长
    sw=allTiao.scrollWidth//获取滚动条的宽度
    allTiao.onmousemove=DisplayCoord(event);//单机时候的位置
    djwz=(dianji/sw)*100;
    barState.style.WebkitTransform="translateX("+djwz+"%)";//改变滚动条的宽度

    djdsj=djwz*(zsc/100);
    //当前点击的位置换算
    audio.currentTime=djdsj;//跳到点击位置
}

// allTiao.onmousedown=function(){//拖拽事件
//     function getX(obj){//点击获取长度
//         //获取div剧左侧的距离
//         var parObj=obj;  
//         var left=obj.offsetLeft;  
//         while(parObj=parObj.offsetParent){  
//             left+=parObj.offsetLeft;  
//         }  
//         return left;  
//     }

//     function DisplayCoord(event){  
//         var top,left,oDiv;  
//         oDiv=document.getElementById("progress");  
//         left=getX(oDiv);
//         dianji=event.clientX-left+document.body.scrollLeft;//点击时的位置像素
//     }

//     var zsc=audio.duration//总时长
//     sw=allTiao.scrollWidth//获取滚动条的宽度
//     allTiao.onmousemove=DisplayCoord(event);//单机时候的位置
//     djwz=(dianji/sw)*100;
//     barState.style.WebkitTransform="translateX("+djwz+"%)";//改变滚动条的宽度

//     djdsj=djwz*(zsc/100);
//     //当前点击的位置换算
//     audio.currentTime=djdsj;//跳到点击位置
// }

//单机切歌
for(lc=0;lc<allAA.length;lc++){
    allAA[lc].onclick=function(){
        for(lca=0;lca<allAA.length;lca++){
            allAA[lca].className="";//列表样式全没
        }//end for
        this.className="danqian";//当前样式为播放
        liebigewq=this.getElementsByTagName("li")[0].getAttribute("data-name");//找到单机列表歌曲
        audio.src=liebigewq;//换歌曲
        show_musice_lrc(this.getElementsByTagName("li")[0].getAttribute("data-lrc"));//切换歌词
        
        wenzi.innerHTML=this.getElementsByTagName("b")[0].innerHTML;//换的歌名
        goSinger.innerHTML=this.getElementsByTagName("span")[0].innerHTML;//换演唱
        
        anniu.className="btn_pause";//实现播放
        audio.play();//播放
    }
}//end for

// //播放完自动下一曲
// window.onload=function(){//视频加载完后执行
//     shuzu=[];
//     for(d=0;d<allLI.length;d++){
//         data=allLI[d].getAttribute("data-name");
//         shuzu.push(data);
//     }//获取所有的url歌曲
// }

function xiayishou(){
    if(audio.ended){//播放完切下一首zs==dc
        clearInterval(dd);
        var srca=audio.src;//获取当前的src

        if(this_jis!=(allLI.length)-1){
            zidong=allLI[this_jis+1].getAttribute("data-name");//换下一首
            audio.src=zidong;//切换音乐
            show_musice_lrc(allLI[this_jis+1].getAttribute("data-lrc"));//切换歌词
            
            for(lca=0;lca<allAA.length;lca++){
            allAA[lca].className="";//列表样式全没
            }//end for
            allAA[this_jis+1].className="danqian";//当前样式为播放
            wenzi.innerHTML=allAA[this_jis+1].getElementsByTagName("b")[0].innerHTML;//换的歌名
            goSinger.innerHTML=allAA[this_jis+1].getElementsByTagName("span")[0].innerHTML;//换演唱
            audio.play();//执行播放
            dd=setInterval(xiayishou,1);
            this_jis+=1;
        }else{
            zidong=allLI[0].getAttribute("data-name");//换下一首
            audio.src=zidong;//切换音乐
            show_musice_lrc(allLI[0].getAttribute("data-lrc"));//切换歌词
            
            for(lcae=0;lcae<allAA.length;lcae++){
            allAA[lcae].className="";//列表样式全没
            }//end for
            allAA[0].className="danqian";//当前样式为播
            wenzi.innerHTML=allAA[0].getElementsByTagName("b")[0].innerHTML;//换的歌名
            goSinger.innerHTML=allAA[0].getElementsByTagName("span")[0].innerHTML;//换演唱
            audio.play();//执行播放
            dd=setInterval(xiayishou,1);
            this_jis = 0;
        }
    }
}

dd=setInterval(xiayishou,1);

//单机上一曲下一曲
//上
shagnyiqu.onclick=function(){
    var srca=audio.src;//获取当前的src
    if(this_jis!=0){
        zidong=allLI[this_jis-1].getAttribute("data-name");//换上一首
        audio.src=zidong;//切换音乐
        show_musice_lrc(allLI[this_jis-1].getAttribute("data-lrc"));//切换歌词
        
        for(lca=0;lca<allAA.length;lca++){
        allAA[lca].className="";//列表样式全没
        }//end for
        allAA[this_jis-1].className="danqian";//当前样式为播放
        wenzi.innerHTML=allAA[this_jis-1].getElementsByTagName("b")[0].innerHTML;//换的歌名
        goSinger.innerHTML=allAA[this_jis-1].getElementsByTagName("span")[0].innerHTML;//换演唱
        anniu.className="btn_pause";//没有播放，点击实现播放
        audio.play();//执行播放
        this_jis -= 1;
    }else{
        zidong=allLI[allLI.length-1].getAttribute("data-name");//换上一首
        audio.src=zidong;//切换音乐
        show_musice_lrc(allLI[allLI.length-1].getAttribute("data-lrc"));//切换歌词
        
        for(lcae=0;lcae<allAA.length;lcae++){
        allAA[lcae].className="";//列表样式全没
        }//end for
        allAA[allLI.length-1].className="danqian";//当前样式为播
        wenzi.innerHTML=allAA[allLI.length-1].getElementsByTagName("b")[0].innerHTML;//换的歌名
        goSinger.innerHTML=allAA[allLI.length-1].getElementsByTagName("span")[0].innerHTML;//换演唱
        anniu.className="btn_pause";//没有播放，点击实现播放
        audio.play();//执行播放
        this_jis = allLI.length-1;
    }
}

//下
xiayiqu.onclick=function(){
    var srca=audio.src;//获取当前的src
    if(this_jis!=(allLI.length)-1){
            zidong=allLI[this_jis+1].getAttribute("data-name");//换下一首
            audio.src=zidong;//切换音乐
            show_musice_lrc(allLI[this_jis+1].getAttribute("data-lrc"));//切换歌词
            
            for(lca=0;lca<allAA.length;lca++){
            allAA[lca].className="";//列表样式全没
            }//end for
            allAA[this_jis+1].className="danqian";//当前样式为播放
            wenzi.innerHTML=allAA[this_jis+1].getElementsByTagName("b")[0].innerHTML;//换的歌名
            goSinger.innerHTML=allAA[this_jis+1].getElementsByTagName("span")[0].innerHTML;//换演唱
            anniu.className="btn_pause";//没有播放，点击实现播放
            audio.play();//执行播放
            this_jis += 1;
        }else{
            zidong=allLI[0].getAttribute("data-name");//换下一首
            audio.src=zidong;//切换音乐
            show_musice_lrc(allLI[0].getAttribute("data-lrc"));//切换歌词
            
            for(lcae=0;lcae<allAA.length;lcae++){
            allAA[lcae].className="";//列表样式全没
            }//end for
            allAA[0].className="danqian";//当前样式为播
            wenzi.innerHTML=allAA[0].getElementsByTagName("b")[0].innerHTML;//换的歌名
            goSinger.innerHTML=allAA[0].getElementsByTagName("span")[0].innerHTML;//换演唱
            anniu.className="btn_pause";//没有播放，点击实现播放
            audio.play();//执行播放
            this_jis = 0;
        }
}
//上下结束

//歌词同步

//这个，存储调节的时间值
//localStorage是HTML5的新东西
//localStorage代表着实际歌词时间和lrc歌词时间差
if(!localStorage.time)
{
    localStorage.time=0;
}
// var musice_lrc="[ti:天下][ar:张杰][al:明天过后][00:01.77]天下[00:06.77]作词：周毅 作曲：刘吉宁[00:11.77]演唱：张杰[00:16.77][00:27.77]烽烟起 寻爱似浪淘沙[00:34.38]遇见她 如春水映梨花[00:41.18]挥剑断天涯 相思轻放下[00:48.00]梦中我 痴痴牵挂[00:53.74][00:55.04]顾不顾将相王侯[00:56.49]管不管万世千秋[00:58.15]求只求爱化解[00:59.94]这万丈红尘纷乱永无休[01:02.35]爱更爱天长地久[01:04.03]要更要似水温柔[01:05.67]谁在乎谁主春秋[01:07.23][01:08.00]一生有爱 何惧风飞沙[01:11.15]悲白发留不住芳华[01:14.90]去江山如画 换她笑面如花[01:18.17]抵过这一生空牵挂[01:21.23]心若无怨 爱恨也随她[01:24.52]天地大 情路永无涯[01:28.02]只为她 袖手天下[01:33.97][02:01.14]顾不顾将[02:03.26]管不管万世千秋[02:04.82]求只求爱化解[02:06.43]这万丈红尘纷乱永无休[02:08.99]爱更爱天长地久[02:10.60]要更要似水温柔[02:12.33]谁在乎谁主春秋[02:14.01][02:14.67]一生有爱 何惧风飞沙[02:17.81]悲白发留不住芳华[02:21.50]抛去江山如画 换她笑面如花[02:24.84]抵过这一生空牵挂[02:27.85]心若无怨 爱恨也随她[02:31.09]天地大 情路永无涯[02:34.58]只为她 袖手天下[02:40.23][02:41.14]一生有爱 何惧风飞沙[02:44.47]悲白发留不住芳华[02:48.14]抛去江山如画 换她笑面如花[02:51.44]抵过这一生空牵挂[02:54.45]心若无怨 爱恨也随她[02:57.77]天地大 情路永无涯[03:01.28]只为她 袖手天下[03:06.75][03:07.68]烽烟起 寻爱似浪淘沙[03:14.37]遇见她 如春水映梨花[03:21.14]挥剑断天涯 相思轻放下[03:27.93]梦中我 痴痴牵挂[03:35.18]美";
var shijianshuzu=new Array();
var gecishuzu=new Array();
var show_lrc_interval = null;
var shijianshuzu = []; //歌词时间
var gecishuzu = [];    //歌词内容
//解析歌词，将时间和歌词分开
//时间放到shijianshuzu中
//歌词放到gecishuzu中
//shijianshuzu[i]就是对应的时间值
//gecishuzu[i]就是对应的歌词
//lrc歌词在代码中直接用变量a存储了，可以改
//这两个数组的长度就是lrc歌词中有多少个类似"[xx:xx.xx]歌词"这样的
function parse(lrc){
    //如果lrc的内容是"[xx:xx.xx]歌词1[yy:yy.yy]歌词二"
    //那str这个数组长度是3
    //str[0]=""
    //str[1]="xx:xx.xx]歌词一"
    //str[2]="yy:yy.yy]歌词二"
    shijianshuzu = []; //歌词时间
    gecishuzu = [];    //歌词内容
    str=lrc.split("[");
    //因为str[0]="",所以跳过它
    for(var i=1;i<str.length;i++){
        //str[i]格式是00:11.22]我
        //shijian格式是00:11.22
        var shijian=str[i].split(']')[0];
        //geci格式是"我"
        var geci=str[i].split(']')[1];
        var fen=shijian.split(":")[0];
        var miao=shijian.split(":")[1];
        //xx:xx.xx 时间转换成总的秒数
        var sec=parseInt(fen)*60+parseInt(miao);
        //存时间
        shijianshuzu[i-1]=sec-localStorage.time;
        //存歌词
        gecishuzu[i-1]=geci;
    }
    //这段代码本来是用来显示所有歌词的，这里注释掉了，可以掠过不看
    var quanbugeci=document.getElementById("lyricDiv");
    quanbugeci.innerHTML = '';
    for(var i=0;i<shijianshuzu.length;i++){
        gcp=document.createElement("p");//创建p
        idname="line_"+i;
        //console.log(gecishuzu[i])//输出测试
        gcp.innerHTML=gecishuzu[i];//加歌词
        gcp.setAttribute("id",idname);//加id名
        quanbugeci.appendChild(gcp);//插入到后面
    }
    //上面是用来显示所有歌词的，不用看
    //定时器，隔1s更新下歌词的显示
    if (show_lrc_interval) clearInterval(show_lrc_interval);
    show_lrc_interval = setInterval(updategeci,1000);
}

function updategeci()
{
    var quanbugeci=document.getElementById("lyricDiv");
    var allp=quanbugeci.getElementsByTagName("p");//所有的歌词p
    var i=getcurrent();//从get函数中传过来的
    let lyricDiv = $("#lyricDiv");
    
    if (allp.length < 2) {//不存在歌词
        lyricDiv.css("-webkit-transform","translate3d(0px ,0px,0px)");
        return;
    }
    shijia=-(i-1)*24;
    for(qt=0;qt<allp.length;qt++){
        allp[qt].className="";
    }
    allp[i-1].className="current";
    
    lyricDiv.css("-webkit-transform","translate3d(0px ,"+shijia+"px,0px)");
    //-webkit-transform: translate3d(0px, 24px, 0px);
    
}
//将歌曲实际播放的时间，和我们自己的歌词的时间，进行比较，算出现在应该显示的歌词
function getcurrent()
{
    var a=document.getElementById("audio");
    var i=0;
    //152,154存歌词和时间的时候
    //时间是由小到大的
    //当然实际的歌词不一定都是由小到大，还可能是两个时间重复的歌词就合并到一起，其他的情况都没做处理
    for(i=0;i<shijianshuzu.length;i++)
    {
        //数和undefined比较，undefined要大些。
        if(shijianshuzu[i]>=a.currentTime)
        {
            return i;
        }
    }
    return i-1;
}

function show_musice_lrc($fill){
    if($fill){
        $.ajax({
            url: $fill,//json文件位置，文件名
            type: "GET",//请求方式为get
            dataType: "text", //返回数据格式为json
            success: function(data) {//请求成功完成后要执行的方法 
                console.log(data);
                parse(data);
            },
            error: function(data){
                console.log(data);
            }
        });
    }else{
        parse('[00:01:01]该歌曲暂无歌词');
    }
}

//函数写成这种形式是为了加载页面的时候自动执行
//(function 函数名{})()
(function ok(){
    show_musice_lrc(allLI[0].getAttribute('data-lrc'));
})()
            
//左右滑动
//全局变量，触摸开始位置
var startX = 0, startY = 0;
//touchstart事件
function touchSatrtFunc(evt) {
    try
    {
        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        var touch = evt.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        //记录触点初始位置
        startX = x;
        startY = y;

        //var text = 'TouchStart事件触发：（' + x + ', ' + y + '）';
        //document.getElementById("result").innerHTML = text;
    }
    catch (e) {
        //alert('touchSatrtFunc：' + e.message);
    }
}
//touchmove事件，这个事件无法获取坐标
function touchMoveFunc(evt) {
    try
    {
        var touch = evt.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标

        //var text = 'TouchMove事件触发：（' + x + ', ' + y + '）';
        //判断滑动方向
        if(y - startY <12 && y - startY >-12  ){//上划不阻止滚动条
             evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        }
       
        if (x - startX > 35) {//左划
            $(".zuobian").css("-webkit-transform","translate3d(0, 0px, 0px)");//移动
            $(".youbian").css("-webkit-transform","translate3d(100%, 0px, 0px)");//移动
            $(".diyige a").removeClass("kongzhi_2");//清除的a的白
            $(".diyige a:eq(0)").addClass("kongzhi_2");//给当前的加
            $(".zuobian").css("z-index","1")//w8使用
            $(".youbian").css("z-index","0")//w8使用
        }else if(x - startX < -35){
            $(".zuobian").css("-webkit-transform","translate3d(-100%, 0px, 0px)");//移动
            $(".youbian").css("-webkit-transform","translate3d(0, 0px, 0px)");//移动
            $(".diyige a").removeClass("kongzhi_2");//清除的a的白
            $(".diyige a:eq(1)").addClass("kongzhi_2");//给当前的加
            $(".zuobian").css("z-index","0")//w8使用
            $(".youbian").css("z-index","1")//w8使用
        }
        //document.getElementById("result").innerHTML = text;
    }
    catch (e) {
        //alert('touchMoveFunc：' + e.message);
    }
}
//touchend事件
function touchEndFunc(evt) {
    try {
       // evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等   
    }
    catch (e) {
        //alert('touchEndFunc：' + e.message);
    }
}

//绑定事件
    document.addEventListener('touchstart', touchSatrtFunc, false);
    document.addEventListener('touchmove', touchMoveFunc, false);
    document.addEventListener('touchend', touchEndFunc, false);


$(document).ready(function(){});