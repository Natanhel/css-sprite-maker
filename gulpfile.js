const svgSprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const gulp = require('gulp');

// Configuration
config = {
  mode: {
    symbol: {
      sprite: "../sprite.svg",
      render: {
        scss: {
          dest:'../../../css/svg_sprite.scss',
          template: "src/templates/_sprite_template.scss"
        }
      }
    }
  }
}

gulp.src('**/*.svg', { cwd: 'input/' })
  // minify svg
  .pipe(svgmin({
      js2svg: {
          pretty: true
      }
  }))
  // remove all fill, style and stroke declarations in out shapes
  .pipe(cheerio({
      run: ($) => {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
  }))
  // cheerio plugin create unnecessary string '&gt;', so replace it.
  .pipe(replace('&gt;', '>'))
  // build svg sprite
  .pipe(svgSprite(config))
  .pipe(gulp.dest('public/img/'))