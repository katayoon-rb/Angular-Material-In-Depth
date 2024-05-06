import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { filter } from "rxjs/operators";
import { Course } from "../model/course";
import { openEditCourseDialog } from "../course-dialog/course-dialog.component";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
})
export class CoursesCardListComponent implements OnInit {
  @Input() courses: Course[];
  cols = 1;
  rowHeight = "500px";
  handsetPortrait = false;

  constructor(private dialog: MatDialog) {}
  ngOnInit() {}

  editCourse(course: Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(filter((val) => !!val))
      .subscribe((val) => console.log("new course value:", val));
  }
}
