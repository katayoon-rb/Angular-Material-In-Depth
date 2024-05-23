import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { merge, throwError } from "rxjs";
import { tap, catchError, finalize } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { LESSONS } from "../services/db-data";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;
  lessons: Lesson[] = [];
  loading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<Lesson>(true, []);

  constructor(private route: ActivatedRoute) {}

  displayedColumns = ["select", "seqNo", "description", "duration"];
  expandedLesson: Lesson = null;

  ngOnInit() {
    this.loading = true;
    this.loadLessonsPage();
  }

  loadLessonsPage() {
    LESSONS.map((les) => {
      if (les.courseId === parseInt(this.route.snapshot.params.id)) {
        this.lessons.push(les);
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadLessonsPage()))
      .subscribe();
  }

  onToggleLesson(lesson: Lesson) {
    if (lesson == this.expandedLesson) {
      this.expandedLesson = null;
    } else {
      this.expandedLesson = lesson;
    }
  }

  onLessonToggled(lesson: Lesson) {
    this.selection.toggle(lesson);
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.lessons);
    }
  }

  isAllSelected() {
    return this.selection.selected?.length == this.lessons?.length;
  }
}
