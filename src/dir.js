import fs from 'fs'
if(!fs.existsSync('dir')){
	fs.mkdir('dir', function(err){
		if(err){
			console.log(err);
		}else{
			fs.writeFile('dir/message.txt', 'Hello Node', function (err) {
			  if (err){
			  	console.log(err)
			  }else{
			  	console.log('文件写入成功');
			  }
			});
		}
	});
}else{
	console.log('当前目录已存在名为dir的文件夹');
}

