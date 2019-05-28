const basePaths = {
  src: './web/themes/custom/instride/',
  dest: './',
  node: 'node_modules',
  config: './web/themes/custom/instride/config'
};


const paths = {
  images: {
    src: `${basePaths.src}images/`
  },
  scripts: {
    src: `${basePaths.src}javascript/`
  },
  styles: {
    src: `${basePaths.src}scss/`,
    dest: `${basePaths.src}css/`,
    maps: `${basePaths.src}css/`
  },
  config: {
    src: `${basePaths.src}hint/`
  }
};

const scssPaths = [
  `${paths.styles.src}*/*.s+(a|c)ss`,
  `${paths.styles.src}*.s+(a|c)ss`
];

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 0%']
};

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const minify = require('gulp-minify');
const removeFiles = require('gulp-remove-files');

/**
 * Available gulp tasks
 */
gulp.task('build',      ['lint-sass', 'compile-sass', 'lint-js', 'clear-js', 'compile-js']);
gulp.task('build:prod', ['compile-sass', 'minify-css', 'clear-js', 'compile-js', 'minify-js']);
gulp.task('lint',       ['lint-sass', 'lint-js']);


/**
 * Compile less files
 */
gulp.task('compile-sass', () => {
  gutil.log(gutil.colors.blue('Compiling SASS --> CSS'));

  return gulp.src(`${paths.styles.src}*.scss`)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(sourcemaps.write(basePaths.dest))
      .pipe(gulp.dest(paths.styles.dest))
      .on('error', gutil.log);
});

/**
 * Remove JS compiled files
 */
gulp.task('clear-js', () => {
  return gulp.src([
    `${paths.scripts.src}/*.compiled.js`,
    `${paths.scripts.src}/*.js.map`,
    `${paths.scripts.src}/*.min.js`
  ]).pipe(removeFiles());
});

/**
 * Convert JS from ES6 to ES5
 */
gulp.task('compile-js', () => {
  const regexSubstring = '\.es6';
  const replString = '\.compiled';

  return gulp.src([
    `${paths.scripts.src}/*es6.js`
  ])
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(rename((path) => {
        path.basename = path.basename.replace(regexSubstring, replString);
      }))
      .pipe(sourcemaps.write(basePaths.dest))
      .pipe(gulp.dest(paths.scripts.src));
});

/**
 * Lint Sass files
 */
gulp.task('lint-sass', () => {
  gutil.log(gutil.colors.blue('Linting Sass files'));
  return gulp.src(scssPaths)
      .pipe(sassLint({
        configFile: '.sass-lint.yml'
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
});

/**
 * JavaScript Lint
 */
gulp.task('lint-js', () => gulp.src([
  `${paths.scripts.src}/*.js`,
  `!${paths.scripts.src}/*es6*.js`,
  `!${paths.scripts.src}/*.min.js`
])
    .pipe(eslint())
    .pipe(eslint.format()));

/**
 * Minify CSS
 */
gulp.task('minify-css', () => gulp.src([
  `${paths.styles.dest}/*.css`,
  `!${paths.styles.dest}/*.min.css`])
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest)));

/**
 * Minify JS
 */
gulp.task('minify-js', ['compile-js'], () => {
  gulp.src([
    `${paths.scripts.src}/*.js`,
    `!${paths.scripts.src}/*.es6.js`,
    `!${paths.scripts.src}/*.min.js`])
      .pipe(minify({
        ext: {
          src: '.js',
          min: '.min.js'
        },
        ignoreFiles: ['.min.js']
      }))
      .pipe(gulp.dest(paths.scripts.src));
});

/**
 * Watch for changes and recompile
 */
gulp.task('watch', () => {
  gutil.log(gutil.colors.blue('Watching for changes...'));

  // Watch JS
  gulp.watch(`${paths.scripts.src}*.es6.js`, ['compile-js']);

  // Watch Less
  gulp.watch(scssPaths, ['compile-sass']);
});
