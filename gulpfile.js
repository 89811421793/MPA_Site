const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const del = require("del");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const svgmin = require("gulp-svgmin");
const fontmin = require("gulp-fontmin");
const fileInclude = require("gulp-file-include"); 

// Пути исходных файлов src и пути к результирующим файлам dest (константа с путями)
const paths = {

  html: {
    src: "src/pages/*.html",
    dest: "dist/",
  },

  styles: {
    src: [
      "src/styles/**/*.sass",
      "src/styles/**/*.scss",
      "src/styles/**/*.css",
    ],
    dest: "dist/css/",
  },

  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },

  images: {
    src: "src/assets/img/**",
    dest: "dist/img/",
  },

  svg: {
    src: "src/assets/img/**/*.svg",
    dest: "dist/img/",
  },

  fonts: {
    src: "src/assets/fonts/**/*",
    dest: "dist/fonts/",
  },
};

// Очистка каталога dist (удалить все кроме изображений)
function clean() {
  return del(["dist/*", "!dist/img"]);
}

// Обработка HTML (с использованием gulp-file-include)
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Обработка препроцессоров стилей
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    ) // Обработка ошибок
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ basename: "style", suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Обработка скриптов (JS)
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    ) // Обработка ошибок
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Обработка изображений(сжатие)
function img() {
  return gulp
    .src(paths.images.src)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    ) // Обработка ошибок
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({ progressive: true }))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.images.dest));
}

// Обработка SVG
function svg() {
  return gulp
    .src(paths.svg.src)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    ) // Обработка ошибок
    .pipe(svgmin())
    .pipe(gulp.dest(paths.svg.dest));
}

// Обработка шрифтов
function fonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    ) // Обработка ошибок
    .pipe(newer(paths.fonts.dest))
    .pipe(fontmin())
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(size({ showFiles: true }));
}

// Отслеживание изменений в файлах и запуск лайв сервера (режим вотчера)
const watch = () => {
  browserSync.init({
    server: { baseDir: "./dist" },
  });
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, img);
  gulp.watch(paths.svg.src, svg);
  gulp.watch(paths.fonts.src, fonts);
};

// Экспорт требований (Таски для ручного запуска с помощью gulp clean, gulp html и т.д.)
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.svg = svg;
exports.fonts = fonts;
exports.watch = watch;

// Основной таск (который выполняется по команде gulp)
const build = gulp.series(
  clean,
  gulp.parallel(html, styles, scripts, img, svg, fonts),
  watch
);
exports.default = build;
