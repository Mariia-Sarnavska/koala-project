const { src, dest, watch, parallel, series } = require("gulp");

const scss         = require('gulp-sass')(require('sass')),
      autoprefixer = require("gulp-autoprefixer"), 
      imagemin     = require("gulp-imagemin"),
      concat       = require("gulp-concat"),
      uglify       = require("gulp-uglify"),
      sourcemaps   = require("gulp-sourcemaps"),
      browserSync  = require("browser-sync").create(),
      del          = require("del"),
      fileinclude  = require("gulp-file-include"),
      imgCompress  = require("imagemin-jpeg-recompress");

function html() {
    return src(["src/*.html", "!src/_*.html"])
        .pipe(fileinclude())
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
}

function styles() {
    return src([
        "src/scss/index.scss"
    ])
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: "compressed"}))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            grid: true,
            cascade: true
         }))
        .pipe(concat("styles.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
};

function scripts() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        "src/js/_*.js",
        "src/js/*.js"
    ])
        .pipe(concat("main.min.js")) 
        .pipe(uglify())
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
};

function imgs() {
    return src("src/images/**/*.png")
        .pipe(imagemin([
          imgCompress({
            loops: 4,
            min: 70,
            max: 80,
            quality: "high"
          }),
          imagemin.gifsicle(),
          imagemin.optipng(),
          imagemin.svgo()
        ]))
        .pipe(dest("./dist/images"))
        .pipe(browserSync.stream());
};

function svg() {
    return src("src/images/*.svg")
        .pipe(dest("./dist/images"))
        .pipe(browserSync.stream());
};

function sync() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        port: 3000
    });
};

function fonts() {
    return src("src/fonts/**/*")
        .pipe(dest("./dist/fonts"))
        .pipe(browserSync.stream());
};

function cleanDist() {
    return del("dist");
}

function watching() {
    watch(["src/*.html", "src/.htaccess"], html);
    watch(["src/js/**/*.js"], scripts);
    watch(["src/scss/**/*.scss"], styles);
    watch(["src/fonts/**/*"], fonts);
    watch(["src/images/**/*.{jpg,png,gif,ico,webp}"], imgs);
    watch(["src/images/*.svg"], svg);
};

exports.styles = styles;
exports.watching = watching;
exports.browserSync = sync;
exports.scripts = scripts;
exports.imgs = imgs;
exports.svg = svg;
exports.fonts = fonts;
exports.cleanDist = cleanDist;

const build = series(cleanDist, parallel(html, styles, imgs, fonts, scripts, svg));
exports.default = parallel(build, sync, watching);