import Vue from 'vue';

// 使用Vue.directive()定义一个全局指令
// 1.参数一：指令的名称，定义时指令前面不需要写v-
// 2.参数二：是一个对象，该对象中有相关的操作函数
// 3.在调用的时候必须写v-
// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
    // 1.指令绑定到元素上回立刻执行bind函数，只执行一次
    // 2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
    // 3.第二个参数是一个对象：包含以下属性
        // name：指令名，不包括v-前缀
        // value：指令的绑定值
        // oldValue：指令绑定的前一个值，仅在 update 和 componentUpdate 钩子 中可用。
        // expression：绑定值的字符串形式
        // arg：传给指令的参数
        // modeifiers：一个包含修饰符的对象
    // 4.第三个参数：Vue 编译生成的虚拟节点
    // 5.第四个参数：上一个虚拟节点，仅在 update 和 componentUpdate 钩子中可用。
    bind(el, binding, vnode, oldVnode) {
        // 返回 el 中第一个匹配的元素
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');

        // 为元素添加 style 样式
        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = (() => {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr];
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr];
            }
        })()

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            const screenWidth = document.body.clientWidth; // body当前宽度
            const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 

            const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
            const dragDomheight = dragDom.offsetHeight; // 对话框高度

            const minDragDomLeft = dragDom.offsetLeft; // 离 document 的左边距离
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth; // 屏幕宽度 - 离document 的左边距离 - 对话框宽度

            const minDragDomTop = dragDom.offsetTop;
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;


            // 获取到的值带px 正则匹配替换
            let styL = sty(dragDom, 'left');
            let styT = sty(dragDom, 'top');

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
            } else {
                styL = +styL.replace(/\px/g, '');
                styT = +styT.replace(/\px/g, '');
            };

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -(minDragDomLeft);
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft;
                }

                if (-(top) > minDragDomTop) {
                    top = -(minDragDomTop);
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop;
                }

                // 移动当前元素  
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
})
