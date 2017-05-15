// 配置 Mock 路径
require.config({
    paths: {
        mock: 'mock'
    }
});

// 加载 Mock
require(['mock'], function (Mock) {
    console.log("Mock() begin");
    /*第一部分*/
    // Mock.mock( template )
    //数据模板
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    });
    //打印到body上
    $('<pre>').text(JSON.stringify(data, null, 4)).appendTo($("#test1"));

    /*第二部分*/
    // Mock.mock(rurl, template)
    Mock.mock(/\.json/, { //匹配.json文件
        'list|1-10': [{ //数据模板
            'id|+1': 1,
            'email': '@EMAIL',
            'regexp3': /\d{5,10}/
        }]
    });
    $.ajax({
        url: 'hello.json', //请求访问json文件，拦截hello.json的请求，返回mock数据模板中的数据
        dataType: 'json'
    }).done(function (data, status, jqXHR) {
        //获得mock数据模板中的数据，打印到body上
        $('<pre>').text(JSON.stringify(data, null, 4)).appendTo($("#test2"));
    })

    /*第三部分 ajax*/
    Mock.mock('/v1/wifidog/validate_login', 'post', {
        'data': {
            'staff_id': '0027000229',
            'staff_code': '清华大学 ',
            'staff_name': '李天一 ',
            'staff_org': 'AAAA',
            'staff_email': 'AAAA',
            'staff_phone': 'AAAA',
            'staff_remark': 'AAAA',
            'staff_last_login': 'AAAA',
            'staff_login_count': 'AAAA'
        }
    });


    $.ajax({
        type: 'POST',
        url: '/v1/wifidog/validate_login',
        dataType: 'json',
        data: {
            user_name: "John",
            pass_word: "Boston"
        }
    }).done(function (data, status, xhr) {
        $('<pre>').text(JSON.stringify(data, null, 4)).appendTo($("#test3"));

    })

    /*第四部分 ajax*/
    var template = {
        'people|1-4': [{
            'name': '@name',
            'age': '@integer(10,80)'
        }]
    }
    Mock.mock('/get_cross_input', 'get', template);

    Mock.mock('http://10.45.17.160:9080/v1/wifidog/test_cross', 'get', template);
    
    console.log("Mock() end");
});