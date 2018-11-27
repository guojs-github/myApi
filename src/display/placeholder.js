/**
    源码名称：placeholder.js
	引入myApi
	2018.11.26 GuoJS
 */
 
(function() {
    //仅在不支持 placeholder 的时候执行
    if (!('placeholder' in document.createElement('input'))) {
 
        var listenerName = 'attachEvent';
        var listenerPrefix = 'on';
        if ('addEventListener' in window) {
            listenerName = 'addEventListener';
            listenerPrefix = '';
        }
 
        window[listenerName](listenerPrefix + 'load', function() {
            var placeholderListener = {
                //添加输入项
                add: function(tagName) {
					if (!Array.isArray(window.placeholderList))
						window.placeholderList = [];
					
                    var list = document.getElementsByTagName(tagName);
                    for (var i = 0; i < list.length; i++) {
                        this.render(list[i]);
                    }
                    return this;
                },

                //渲染
                render: function(dom) {
                    var text = dom.getAttribute('placeholder');
                    if (!!text) {
						var div = this.getDiv(dom, text);
                        this.attachEvent(dom, div);
						window.placeholderList[window.placeholderList.length] = { 
							dom: dom
							, div: div
						};
                    }
                },

                //设置样式
                getDiv: function(dom, text) {
                    var div = document.createElement('div');
 
                    div.style.position = 'absolute';
					this.position(dom, div);
                    div.style.color = '#757575';
                    div.style.textIndent = '5px';
                    div.style.zIndex = 999;
                    div.style.background = dom.style.background;
                    div.style.border = dom.style.border;
                    div.style.cursor = 'text';
                    div.innerHTML = text;
 
                    if ('TEXTAREA' == dom.tagName.toUpperCase()) {
                        div.style.lineHeight = '35px';
                    } else {
                        div.style.lineHeight = div.style.height;
                    }
                    document.getElementsByTagName('body')[0].appendChild(div);
                    return div;
                },
				
				// 定位
				position: function(dom, div) {
                    div.style.width = this.getPosition(dom, 'Width') + 'px';
                    div.style.height = this.getPosition(dom, 'Height') + 'px';
                    div.style.left = this.getPosition(dom, 'Left') + 'px';
                    div.style.top = this.getPosition(dom, 'Top') + 'px';
				},
				
                //计算当前输入项目的位置
                getPosition: function(dom, name, parentDepth) {
                    var offsetName = 'offset' + name;
                    var offsetVal = dom[offsetName];
                    var parentDepth = parentDepth || 0;
                    if (!offsetVal && parentDepth < 3) {
                        offsetVal = this.getPosition(dom.parentNode, name, ++parentDepth);
                    }
                    return offsetVal;
                },

                //添加事件
                attachEvent: function(dom, div) {
 
                    //激活时，隐藏 placeholder
                    dom[listenerName](listenerPrefix + 'focus', function() {
                        div.style.display = 'none';
                    });
 
                    //失去焦点时，隐藏 placeholder
                    dom[listenerName](listenerPrefix + 'blur', function(e) {
                        if (e.srcElement.value == '') {
                            div.style.display = '';
                        }
                    });
 
                    //placeholder 点击时，对应的输入框激活
                    div[listenerName](listenerPrefix + 'click', function(e) {
                        e.srcElement.style.display = 'none';
                        dom.focus();
                    });
                }
 
            };
 
            //防止在 respond.min.js和html5shiv.min.js之前执行
            setTimeout(function() {
                placeholderListener.add('input').add('textarea');
            }, 50);
			
			$(window).resize(function () {
				console.log('On window resize');
				
				console.log('placeholderList length:' + window.placeholderList.length);
				for (var i = 0; i < window.placeholderList.length; i ++) {
					placeholderListener.position(
						window.placeholderList[i].dom
						, window.placeholderList[i].div
					);
				} // for
			});
        });
    }
})();