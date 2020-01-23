import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export interface ILesson {
  id: string;
  topic: number;
  lecturer: string;
  date: Date;
}

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  public lessons: ILesson[] = [];
  public isShowModal = false;
  public editedLessons: string[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getLessons();
  }

  handleOpenCreateDialog() {
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }

  switchToEditMode(lessonId: string): void {
    this.editedLessons.push(lessonId);
  }

  getEditedState(id: string): boolean {
    return this.editedLessons.includes(id);
  }

  createLesson($event: ILesson) {
    this.localStorageService.addLessonToLocalStorage({
      ...$event,
      id: '_' + Math.random().toString(36).substr(2, 9)
    });
    this.getLessons();
    this.closeModal();
  }

  getLessons() {
    this.lessons = this.localStorageService.getLessonsFromLocalStorage();
  }

  saveChanges(lesson: ILesson) {
    if (!isNaN(new Date(lesson.date).valueOf())) {
      const savedItem = this.editedLessons.indexOf(lesson.id);
      this.editedLessons.splice(savedItem, 1);
      this.localStorageService.editLesson(lesson);
    } else {

    }
  }

  deleteLesson(id: string) {
    this.localStorageService.removeLessonFromLocaleStorage(id);
    this.getLessons();
  }
}
