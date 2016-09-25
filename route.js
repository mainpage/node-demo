module.exports = {
	'/panda': {
		name: 'panda',
    component: {
    	path: 'module/panda'
    },
    //子路由
    subRoutes: {
      '/head': {
      	name: 'head',
        // 当匹配到/panda/head时，会在panda的<router-view>内渲染
        // 一个head组件
        component: {
        	path: 'component/head'
        }
      },
      '/foot': {
      	name: 'foot',
        component: {
        	path: 'component/foot'
        }
      }
    }
  },
  '/sofia': {
  	name: 'sofia',
    component: {
    	path: 'module/sofia'
    }
  }
}