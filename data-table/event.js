function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";  
    if (r != null)  
            context = r[2];  
    reg = null;  
    r = null;  
    return context == null || context == "" || context == "undefined" ? "" : context;  
}

/**
* @author zhangxinxu(.com)
* @licence MIT
* @description http://www.zhangxinxu.com/wordpress/?p=7362
*/
CanvasRenderingContext2D.prototype.fillTextVertical = function (text, x, y) {
    var context = this;
    var canvas = context.canvas;
    
    var arrText = text.split('');
    var arrWidth = arrText.map(function (letter) {
        return context.measureText(letter).width;
    });
    
    var align = context.textAlign;
    var baseline = context.textBaseline;
    
    if (align == 'left') {
        x = x + Math.max.apply(null, arrWidth) / 2;
    } else if (align == 'right') {
        x = x - Math.max.apply(null, arrWidth) / 2;
    }
    if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
        y = y - arrWidth[0] / 2;
    } else if (baseline == 'top' || baseline == 'hanging') {
        y = y + arrWidth[0] / 2;
    }
    
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // 开始逐字绘制
    arrText.forEach(function (letter, index) {
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        // 是否需要旋转判断
        var code = letter.charCodeAt(0);
        if (code <= 256) {
            context.translate(x, y);
            // 英文字符，旋转90°
            context.rotate(90 * Math.PI / 180);
            context.translate(-x, -y);
        } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
            // y修正
            y = y + arrWidth[index - 1] / 2;
        }
        context.fillText(letter, x, y);
        // 旋转坐标系还原成初始态
        context.setTransform(1, 0, 0, 1, 0, 0);
        // 确定下一个字符的纵坐标位置
        var letterWidth = arrWidth[index];
        y = y + letterWidth;
    });
    // 水平垂直对齐方式还原
    context.textAlign = align;
    context.textBaseline = baseline;
};


{/* <div class="layui-form-item">
                      <label class="layui-form-label">长输入框</label>
                      <div class="layui-input-block">
                        <input type="text" name="title" autocomplete="off" placeholder="请输入标题" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">短输入框</label>
                      <div class="layui-input-inline">
                        <input type="text" name="username" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
                      </div>
                    </div>
                    
                    <div class="layui-form-item">
                      <div class="layui-inline">
                        <label class="layui-form-label">日期选择</label>
                        <div class="layui-input-block">
                          <input type="text" name="date" id="date1" autocomplete="off" class="layui-input">
                        </div>
                      </div>
                      <div class="layui-inline">
                        <label class="layui-form-label">行内表单</label>
                        <div class="layui-input-inline">
                          <input type="text" name="number" autocomplete="off" class="layui-input">
                        </div>
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">密码</label>
                      <div class="layui-input-inline">
                        <input type="password" name="password" placeholder="请输入密码" autocomplete="off" class="layui-input">
                      </div>
                      <div class="layui-form-mid layui-word-aux">请务必填写用户名</div>
                    </div>
                    
                    <div class="layui-form-item">
                      <div class="layui-inline">
                        <label class="layui-form-label">范围</label>
                        <div class="layui-input-inline" style="width: 100px;">
                          <input type="text" name="price_min" placeholder="￥" autocomplete="off" class="layui-input">
                        </div>
                        <div class="layui-form-mid">-</div>
                        <div class="layui-input-inline" style="width: 100px;">
                          <input type="text" name="price_max" placeholder="￥" autocomplete="off" class="layui-input">
                        </div>
                      </div>
                    </div>
                    
                    <div class="layui-form-item">
                      <label class="layui-form-label">单行选择框</label>
                      <div class="layui-input-block">
                        <select name="interest" lay-filter="aihao">
                          <option value=""></option>
                          <option value="0">写作</option>
                          <option value="1" selected="">阅读</option>
                          <option value="2">游戏</option>
                          <option value="3">音乐</option>
                          <option value="4">旅行</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="layui-form-item">
                      <label class="layui-form-label">行内选择框</label>
                      <div class="layui-input-inline">
                        <select name="quiz1">
                          <option value="">请选择省</option>
                          <option value="浙江" selected="">浙江省</option>
                          <option value="你的工号">江西省</option>
                          <option value="你最喜欢的老师">福建省</option>
                        </select>
                      </div>
                      <div class="layui-input-inline">
                        <select name="quiz2">
                          <option value="">请选择市</option>
                          <option value="杭州">杭州</option>
                          <option value="宁波" disabled="">宁波</option>
                          <option value="温州">温州</option>
                          <option value="温州">台州</option>
                          <option value="温州">绍兴</option>
                        </select>
                      </div>
                      <div class="layui-input-inline">
                        <select name="quiz3">
                          <option value="">请选择县/区</option>
                          <option value="西湖区">西湖区</option>
                          <option value="余杭区">余杭区</option>
                          <option value="拱墅区">临安市</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="layui-form-item" pane="">
                      <label class="layui-form-label">单选框</label>
                      <div class="layui-input-block">
                        <input type="radio" name="sex" value="男" title="男" checked="">
                        <input type="radio" name="sex" value="女" title="女">
                        <input type="radio" name="sex" value="禁" title="禁用" disabled="">
                      </div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                      <label class="layui-form-label">文本域</label>
                      <div class="layui-input-block">
                        <textarea placeholder="请输入内容" class="layui-textarea"></textarea>
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <button class="layui-btn" lay-submit="" lay-filter="demo2">跳转式提交</button>
                    </div> */}