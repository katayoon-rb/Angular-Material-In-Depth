import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Course } from "../model/course";
import { COURSES } from "./db-data";

export function courseResolver(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Course {
  let wantedCourse: Course;
  COURSES.map((course) => {
    if (course.id === parseInt(route.params["id"])) {
      wantedCourse = course;
    }
  });
  return wantedCourse;
}
