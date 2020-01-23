import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ILesson} from '../lesson/lesson.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  lessonForm: FormGroup;

  @Output()
  closeModal = new EventEmitter();

  @Output()
  createLesson = new EventEmitter<ILesson>();

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.close();
  }

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.lessonForm = this.fb.group({
      topic: [null, [Validators.required]],
      date: [null, [Validators.required]],
      lecturer: [null, [Validators.required]],
    });
  }

  close() {
    this.closeModal.emit();
  }


  submit(lessonForm: FormGroup) {
    if (lessonForm.valid && !isNaN(new Date(lessonForm.value.date).valueOf())) {
      this.createLesson.emit(lessonForm.value);
    } else {
      for (const controlKey in this.lessonForm.controls) {
        if (!!controlKey) {
          this.lessonForm.controls[controlKey].markAsTouched();
        }
      }
    }
  }
}
