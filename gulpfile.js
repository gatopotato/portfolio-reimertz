"use strict";

const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const babel = require("gulp-babel");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const del = require("del");
const rename = require("gulp-rename");
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

const paths = {
  styles: {
    src: "src/stylesheets/builder.scss",
    dest: ".build/stylesheets",
  },
  scripts: {
    src: "src/scripts/main-**.js",
    dest: ".build/scripts",
  },
  templates: {
    src: "src/templates/*.jade",
    dest: ".build/",
  },
  assets: {
    src: "src/assets/**/*",
    dest: ".build/assets",
  },
  extras: {
    src: "src/extras/**",
    dest: ".build/extras",
  },
};

function clean() {
  return del([".build"]);
}

function stylesheets() {
  return src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename("styles.css"))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  const b = browserify({
    entries: ["src/scripts/main-home.js"],
    debug: true,
  }).transform("babelify", {
    presets: ["@babel/preset-env"],
  });

  return b
    .bundle()
    .pipe(source("main-home.js"))
    .pipe(buffer())
    .pipe(rename({ extname: ".bundle.js" }))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function templates() {
  return src(paths.templates.src)
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.templates.dest))
    .pipe(browserSync.stream());
}

function assets() {
  return src(paths.assets.src).pipe(dest(paths.assets.dest));
}

function extras() {
  return src(paths.extras.src).pipe(dest(paths.extras.dest));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: ".build",
    },
    port: 3000,
  });

  watch("src/stylesheets/**/*.scss", stylesheets);
  watch("src/scripts/**/*.js", scripts);
  watch("src/templates/*.jade", templates);
}

const build = series(
  clean,
  parallel(stylesheets, scripts, templates, assets, extras)
);

exports.clean = clean;
exports.build = build;
exports.default = series(build, serve);
