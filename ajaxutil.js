/**
 * Created by lixin65535@126.com on 2015/10/26.
 * @info 不支持低版本浏览器，特别是低版本ie
 */
function ajaxutil(){
    this.init();
} ;

ajaxutil.prototype = {
    httpdata: '',

    init: function()
    {
        // constructor function
        console.log('welcome to use ajax util!');
    } ,

    /**
     * 将json格式数据解析为post正文
     * @param _data json 对象
     */
    parsedata: function (_data)
    {
        var okdatas = new Array() ;

        for(_key in _data)
        {
            if(typeof(_data[_key]) == 'object')
            {
                var _data2 = _data[_key];
                for(_key2 in _data2)
                {
                    //这条语句针对一个对象有多个值得情况，如checkbox控件，仅针对php后端有效，其他编程语言请自行修改
                    okdatas.push( encodeURIComponent( _key ) + '=' + encodeURIComponent( _data2[_key2] ) ) ;
                }
            }
            else
            {
                okdatas.push( encodeURIComponent( _key ) + '=' + encodeURIComponent( _data[_key] ) ) ;
            }
        }

        if(okdatas.length <= 0)
            return false;

        this.httpdata = okdatas.join('&') ;

        return true;
    } ,

    /**
     * 提交一个post请求
     * @param url       目标地址
     * @param data      json格式的数据
     * @param callback  执行完成用户回调函数
     */
    ajaxPost : function (url, data, callback)
    {
        if(typeof(data) != 'object'){
            throw 'invalid param, data ,expect json object' ;
        }

        if( !this.parsedata(data) ){
            throw 'parse http data failed' ;
        }

        try{
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){

                switch (xhr.readyState)
                {
                    case 0:
                        //未初始化
                        break;
                    case 1:
                        //启动 open方法被调用
                        break;
                    case 2:
                        //发送 send方法被调用
                        break;
                    case 3:
                        //接收 已经收到部分响应数据
                        break;
                    case 4:
                        //完成
                        if ( (xhr.status>=200 && xhr.status<300) || xhr.status==304)
                        {
                            callback(xhr.responseText);
                        }
                        else
                        {
                            console.log("http error : " + xhr.statusText);
                        }
                        break;
                    default:
                        //不存在
                        break;
                }

            } ;

            xhr.open("post", url, true); // 参数3设为true，使 ajax 异步执行
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");// The object's state must be OPENED.
            xhr.send(this.httpdata);

        }catch( except ) {
            console.log(except.toString());
        }
    }
} ;

