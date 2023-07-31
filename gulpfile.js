const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const del = require('del');   // [название]@[версия] - откатить версию
const browserSync = require('browser-sync').create();

/* Dev */
const isDev = function () {
  return !argv.prod;
}

/* Build */
const isProd = function () {
  return !!argv.prod;
}

const clean = () => {
  return del('dist')
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

//const styles = () => {
//  return src('src/styles/**/*.css')
//    .pipe(sourcemaps.init())
//    .pipe(autoprefixes({
//      cascade: false
//    }))
//    .pipe(gulpif(isProd(), cleanCSS({
//      level: 2
//    })))
//    .pipe(gulpif(isDev(), sourcemaps.write()))
//    .pipe(dest('dist/styles'))
//    .pipe(browserSync.stream())
//}

const styles = () => {
	return src([
    'src/styles/**/*.scss',
    'src/styles/**/*.css'
  ])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixes({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest( 'dist/styles'))
		.pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(isProd(), htmlMin({
      collapseWhitespace: true,
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(gulpif(isProd(), uglify({
      toplevel: true
    })).on('error', notify.onError()))
    .pipe(gulpif(isDev(), sourcemaps.write()))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.png',
    'src/images/*.svg',
    'src/images/**/*.jpeg',
    'src/images/**/*.webp'
  ])
    .pipe(image())
    .pipe(dest('dist/images'))
}

const font = () => {
  return src([
    'src/fonts/**/*.woff',
    'src/fonts/**/*.woff2'
  ])

    .pipe(dest('dist/fonts'))
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, font, watchFiles)
