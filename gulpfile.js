const gulp			= require('gulp'),  				//gulp基础库
	  cleancss		= require('gulp-clean-css'),		//css压缩
      concat		= require('gulp-concat'),   		//合并文件
      uglify		= require('gulp-uglify'),   		//js压缩
	  rename		= require('gulp-rename'),   		//文件重命名
      jshint		= require('gulp-jshint'),   		//js检查
	  del			= require('del'),					//文件删除
      notify		= require('gulp-notify'),   		//提示
	  strip 		= require('gulp-strip-comments');	// 删除js注释

gulp.task('clean', function() {
	// 清除指定文件
	return del([
		'./dist/js/myApi*.js'
		, './dist/css/myApi*.css'
		, './dist/image/*.*'
	]);
});

// 复制image
gulp.task('copy-image', function(){
   return gulp.src('./src/image/*.*')
       .pipe(gulp.dest('dist/image'))           			//输出
});

// 处理css
gulp.task('minify-css', function(){
   return gulp.src('./src/css/*.css')
		.pipe(concat('myApi.css'))      					//合并css
		.pipe(cleancss({									//删除注释
			format: { // 格式参数
				breaks: { // 什么时候换行
					afterAtRule: true, 
					afterBlockBegins: true, 
					afterBlockEnds: true, 
					afterComment: true, 
					afterProperty: true, 
					afterRuleBegins: true, 
					afterRuleEnds: true, 
					beforeBlockEnds: true, 
					betweenSelectors: true
				},
				breakWith: '\n',
				/*以下设置用一个tab进行缩进显示*/
				indentBy: 1, 
				indentWith: 'tab',
				spaces: { // 什么时候插入空格
					aroundSelectorRelation: true,
					beforeBlockBegins: true,
					beforeValue: true
				},
				wrapAt: false // controls maximum line length; defaults to `false`				
			}
		}))									
		.pipe(gulp.dest('dist/css'))           			//输出
});

// 处理js
gulp.task('minify-js', function() {
	return gulp.src([ 									//被合并的js 
				'./src/index.js'
				, './src/common/array.js' 
				, './src/common/browser.js' 
				, './src/common/common.js' 
				, './src/common/cookie.js' 
				, './src/common/file.js' 
				, './src/common/number.js' 
				, './src/common/request.js' 
				, './src/common/storage.js' 
				, './src/common/string.js' 
				, './src/common/time.js' 
				, './src/common/wx.js' 
				, './src/display/calendar.js' 
				, './src/display/loading.js' 
				, './src/display/placeholder.js' 
				, './src/display/toast.js' 
			]) 
			.pipe(concat('myApi.js'))   				//合并js
			.pipe(strip())								//删除注释
			.pipe(gulp.dest('dist/js'))        			//输出
});

//在命令行gulp auto启动此任务
gulp.task('auto', function(){    
    gulp.watch('src/**', gulp.series('clean', 'copy-image', 'minify-css', 'minify-js')) //监听文件修改，当文件修改则执行less任务
})

gulp.task('default', gulp.series('clean', 'copy-image', 'minify-css', 'minify-js', 'auto',  function(done) {
	done(); // 标志任务结束
}));

