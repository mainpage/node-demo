import fs from 'fs'
import path from 'path'
import router from '../route.js'

/**
 * 根据路径创建多层文件夹
 * @param  {string} dirpath --文件夹路径
 * @return {void}
 */
function mkdirsSync(dirpath) {
    var currentPath;
    dirpath.split('/').forEach(function(dirname) {
        if (currentPath) {
            currentPath = path.join(currentPath, dirname);
        }
        else {
            currentPath = dirname;
        }
        if (!fs.existsSync(currentPath)) {
			fs.mkdirSync(currentPath);
	    }
    });
}
/**
 * 构建工程目录结构
 * @param  {object} router --路由配置
 * @param  {string} root   --根路径
 * @return {boolean}       --是否构建成功 
 */
function buildProject(router, root){
	function buildCyc(router){
		if(!router) return;
		for(var key in router){
			let route = router[key];
			mkdirsSync(root + '/' + route.component.path);
			buildCyc(route.subRoutes);
		}
	}
	root = root || 'panda';
	if (fs.existsSync(root)){
		console.log('root exists');
		return;
	}else{
		//建立一些必须的文件夹
		mkdirsSync(root + '/res');
		//根据route建立文件夹
		buildCyc(router, root);
	}
}

function creatFiles(router, root) {
	root = root || 'panda';
	//创建route-config文件
	let routerStr = JSON.stringify(router);
	let content = `
		module.exports = function (router) {
			router.map(${routerStr})
		}
	`;
	fs.writeFileSync(root + '/route.config.js', content);
	//创建app.html
	let links = '';
	for(let key in router){
		links += '<a v-link="{path: '+ "'" + key + "'" + '}">' + router[key].name + '</a>\n'; 
	}
	content = `
		<div>
			<h1>Router</h1>
			${links}
			<router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
		</div>
	`;
	fs.writeFileSync(root + '/app.html', content);
	//创建app.js
	content = `
		var SFVue = require('sailfish-uibase');
		var Router = require('vue-router');
		var configRouter = require('./route-config');

		SFVue.use(Router);

		// 路由基本配置项
		var router = new Router({
			histroy : true,
			saveScrollPosition : true,

		});

		configRouter(router);

		var App = SFVue.extend({
			template : require('./app.html')
		});

		router.start(App, '#app');
	`;
	fs.writeFileSync(root + '/app.js', content);
}

try{
	buildProject(router);
	creatFiles(router);
}catch(err){
	console.log(err);
}