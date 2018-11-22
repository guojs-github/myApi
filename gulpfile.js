var gulp		=require('gulp'),  				//gulp基础库
    minifycss	=require('gulp-minify-css'),	//css压缩
    concat		=require('gulp-concat'),   		//合并文件
    uglify		=require('gulp-uglify'),   		//js压缩
    rename		=require('gulp-rename'),   		//文件重命名
    jshint		=require('gulp-jshint'),   		//js检查
	del			=require('del'),				//文件删除
    notify		=require('gulp-notify');   		//提示

gulp.task('default', ['clean'], function() {
	// 将你的默认的任务代码放在这
	gulp.start('minify-js'); 
});

gulp.task('clean', function() {
	// 清除指定文件
	del([
		'./dist/js/myApi*.js'
		, './dist/css/myApi*.css'
		, './dist/image/*.*'
	]);
});

// 处理js
gulp.task('minify-js', ['minify-css'], function() {
	return gulp.src([ 									//被合并的js 
				'./src/index.js'
				, './src/common/browser.js' 
				, './src/common/common.js' 
				, './src/common/cookie.js' 
				, './src/common/number.js' 
				, './src/common/request.js' 
				, './src/common/storage.js' 
				, './src/common/string.js' 
				, './src/common/time.js' 
				, './src/common/wx.js' 
				, './src/display/loading.js' 
			]) 
			.pipe(concat('myApi.js'))   				//合并js
			.pipe(gulp.dest('dist/js'))        			//输出
			.pipe(rename({suffix:'.min'}))     			//重命名
			.pipe(uglify())                    			//压缩
			.pipe(gulp.dest('dist/js'))            		//输出 
			.pipe(notify({message:"myApi压缩完成"}));   //提示,windows下出的是气泡提示	
});

// 处理css
gulp.task('minify-css', ['copy-image'], function(){
   return gulp.src('./src/css/*.css')
       .pipe(concat('myApi.css'))      					//合并css
       .pipe(gulp.dest('dist/css'))           			//输出
       .pipe(rename({suffix:'.min'}))         			//重命名
       .pipe(minifycss())                    			//压缩
       .pipe(gulp.dest('dist/css'))            			//输出
});

// 复制image
gulp.task('copy-image',function(){
   return gulp.src('./src/image/*.*')
       .pipe(gulp.dest('dist/image'))           			//输出
});
