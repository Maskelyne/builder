import gulp from "gulp";
import pug from "gulp-pug";
import sass from "gulp-dart-sass";
import sourcemaps from "gulp-sourcemaps";
import rename from 'gulp-rename';
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import uglify from "gulp-uglify";
import plumber from "gulp-plumber";
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
import avif from "gulp-avif";
import browserSync from "browser-sync";
import gulpif from "gulp-if";
import * as del from "del";

const bs = browserSync.create();
const isProd = process.env.NODE_ENV === "production";

// --- Clear ---
export const clear = () => {
  return del.deleteAsync('./dist');
}

// --- Pug ---
export const html = () =>
  gulp.src("src/pug/*.pug")
  .pipe(plumber())
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest("dist"))
  .pipe(!isProd ? bs.stream() : gulp.dest("dist"));

// --- SCSS ---
export const styles = () =>
  gulp.src("src/scss/style.{sass,scss}")
  .pipe(gulpif(!isProd, sourcemaps.init()))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulpif(!isProd, sourcemaps.write()))
  .pipe(gulp.dest('dist/css'))
  .pipe(!isProd ? bs.stream() : gulp.dest("dist"));

// --- JS ---
export const scripts = () =>
  gulp.src("src/js/**/main.js")
  .pipe(plumber())
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest("dist/js"))
  .pipe(!isProd ? bs.stream() : gulp.dest("dist"));

// --- Images ---
export const imagesOriginal = () =>
  gulp.src('src/images/**/*.{jpg,jpeg,png}')
  .pipe(gulpif(!isProd, imagemin()))
  .pipe(gulp.dest('dist/images'))

export const imagesWebp = () =>
  gulp.src('src/images/**/*.{jpg,jpeg,png}')
  .pipe(webp())
  .pipe(gulp.dest('dist/images'))

export const imagesAvif = () =>
  gulp.src('src/images/**/*.{jpg,jpeg,png}')
  .pipe(avif())
  .pipe(gulp.dest('dist/images'))

export const images = gulp.parallel(imagesOriginal, imagesWebp, imagesAvif)

// --- Server ---
export const serve = () => {
  bs.init({ server: "dist" });
  gulp.watch("src/pug/**/*.pug", html);
  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch("src/js/**/*.js", scripts);
  gulp.watch("src/images/**/*.{jpg,jpeg,png}", images);
};
// Dev сборка с сервером
export const dev = gulp.series(
  gulp.parallel(html, styles, scripts, images),
  serve
);

// Prod сборка
export const setProdEnv = (cb) => {
  process.env.NODE_ENV = "production";
  cb();
};

export const build = gulp.series(
  setProdEnv,       // сначала выставляем NODE_ENV=production
  clear,            // очищаем dist
  gulp.parallel(html, styles, scripts, images) // собираем проект
);
