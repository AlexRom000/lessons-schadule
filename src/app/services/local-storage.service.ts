import { Injectable } from '@angular/core';
import {ILesson} from '../lesson/lesson.component';

@Injectable()
export class LocalStorageService {

  constructor() { }

  addLessonToLocalStorage(entity) {
    const items = JSON.parse(localStorage.getItem('lessons')) || [];
    if (!items.map(item => item.id).includes(entity.id)) {
      localStorage.setItem('lessons', JSON.stringify([entity, ...items]));
    }
  }

  getLessonsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('lessons')) || [];
  }

  removeLessonFromLocaleStorage(id) {
    let items = JSON.parse(localStorage.getItem('lessons')) || [];

    if (items.map(item => item.id).includes(id)) {
      items = items.filter(item => item.id !== id);
      localStorage.setItem('lessons', JSON.stringify([...items]));
    }
  }

  editLesson(lesson: ILesson) {
    const items = JSON.parse(localStorage.getItem('lessons')) || [];

    if (items.map(item => item.id).includes(lesson.id)) {
      const editedItem = items.map(item => item.id).indexOf(lesson.id);
      items.splice(editedItem, 1,  lesson);
      localStorage.setItem('lessons', JSON.stringify([...items]));
    }
  }
}
