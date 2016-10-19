import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';
import { build } from 'aurelia-cli';

export default function faCss() {
  return gulp.src(`${project.paths.fa}/css/*.min.css`)
    .pipe(changedInPlace({ firstPass: true }))
    /* 
     * This ensures that our 'require-from' path  
     * will be simply './stylesheets/font-awesome.min.css'
     */
    .pipe(gulp.dest(project.paths.faCssOutput))
    .pipe(gulp.src(`${project.paths.faCssOutput}/font-awesome.min.css`))
    .pipe(build.bundle());
}
