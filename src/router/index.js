import Vue from 'vue';
import Router from 'vue-router';
// 引入路由插件
Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/index',
                    component: () => import('../components/page/Index.vue'),
                    meta: { title: '系统首页'  }
                },
                {
                    path: 'dashboard',
                    component: () => import('../components/page/Dashboard.vue'),
                    meta: { title: '个人首页' }
                },
                {
                    path: 'table',
                    component: () => import('../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: 'notice',
                    component: () => import('../components/page/Notice.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    // 富文本编辑器组件
                    path: 'editor',
                    component: () => import('../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: 'markdown',
                    component: () => import('../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: 'upload',
                    component: () => import('../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: 'charts',
                    component: () => import('../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: 'drag',
                    component: () => import('../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: 'dialog',
                    component: () => import('../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: 'i18n',
                    component: () => import('../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: 'permission',
                    component: () => import('../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '403',
                    component: () => import('../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/dataframeinfo',
                    component: () => import('../components/page/DataFrameInfo.vue'),
                    meta: { title: '数据集' }
                },
                {
                    path: '/adddataframe',
                    component: () => import('../components/page/AddDataFrame.vue'),
                    meta: { title: '添加数据集' }
                },
                {
                    path: 'listdataframe',
                    component: () => import('../components/page/ListDataFrame.vue'),
                    meta: { title: '浏览数据集' }
                },
                {
                    path: '/editprofile',
                    component: () => import('../components/page/EditProfile.vue'),
                    meta: { title: '头像' }
                },
                {
                    path: '/editdataframe',
                    component: () => import('../components/page/EditDataFrame.vue'),
                    meta: { title: '修改数据集' }
                },
                {
                    path: '/admin',
                    component: () => import('../components/page/Admin.vue'),
                    meta: { title: '系统管理', permission: true  }
                }
                
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: 'Login' }
        },
        {
            path: '/register',
            component: () => import('../components/page/Register.vue'),
            meta: { title: 'Register' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
