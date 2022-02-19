var gulpversion    = '4'; // Gulp version: 3 or 4

// Подключаем Gulp и все необходимые библиотеки
var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass')(require('sass')),
		browserSync    = require('browser-sync'),
		cleanCSS       = require('gulp-clean-css'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		ftp            = require('vinyl-ftp');

// Обновление страниц сайта на локальном сервере
gulp.task('browser-sync', function() {
	browserSync({
		proxy: "index.html",
		notify: false
	});
});

// Компиляция stylesheet.css
gulp.task('sass', function() {
	return gulp.src('css/style.sass')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function() {
	return gulp.src(['tz/**/*.html'])
	.pipe(browserSync.reload({ stream: true }))
});

// Наблюдение за файлами

if (gulpversion == 3) {
	gulp.task('watch', ['sass', 'browser-sync'], function() {
		gulp.watch('css/style.sass', ['sass']);
		gulp.watch('tz/*.html', browserSync.reload);
	});
	gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('css/style.sass', gulp.parallel('sass'));
		gulp.watch('tz/*.html', gulp.parallel('code'));
	});
	gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
}
