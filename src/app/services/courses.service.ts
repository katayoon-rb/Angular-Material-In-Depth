import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(
      `https://angular-material-project-299a9-default-rtdb.firebaseio.com/Courses/${courseId}`
    );
  }

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get(
        "https://angular-material-project-299a9-default-rtdb.firebaseio.com/Courses"
      )
      .pipe(map((res) => res["payload"]));
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get(
        "https://angular-material-project-299a9-default-rtdb.firebaseio.com/Lessons",
        {
          params: new HttpParams()
            .set("courseId", courseId.toString())
            .set("pageNumber", "0")
            .set("pageSize", "1000"),
        }
      )
      .pipe(map((res) => res["payload"]));
  }

  findLessons(
    courseId: number,
    sortOrder = "asc",
    pageNumber = 0,
    pageSize = 3,
    sortColumn = "seqNo"
  ): Observable<Lesson[]> {
    return this.http
      .get(
        "https://angular-material-project-299a9-default-rtdb.firebaseio.com/Lessons",
        {
          params: new HttpParams()
            .set("courseId", courseId.toString())
            .set("sortOrder", sortOrder)
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", pageSize.toString())
            .set("sortColumn", sortColumn),
        }
      )
      .pipe(map((res) => res["payload"]));
  }
}
