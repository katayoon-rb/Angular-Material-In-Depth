import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { COURSES } from "../services/db-data";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  beginnerCourses: Course[];
  advancedCourses: Course[];

  constructor() {}

  ngOnInit() {
    this.beginnerCourses = COURSES.filter(
      (course) => course.category === "BEGINNER"
    );

    this.advancedCourses = COURSES.filter(
      (course) => course.category === "ADVANCED"
    );
  }
}
