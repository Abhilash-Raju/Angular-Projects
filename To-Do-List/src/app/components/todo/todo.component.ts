import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Task } from 'src/app/model';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks:Task [] =[];
  inprogress:Task [] =[];
  completed:Task [] =[];
  updateId !:any;
  isEditEnabled: boolean= false;

  constructor(private fb:FormBuilder){ }
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item:['',Validators.required]
    })
  }

// Drop Event
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // Add Tasks
    
  addTask(){
    this.tasks.push({description:this.todoForm.value.item,done:false})
    this.todoForm.reset()
  }

// Update Tasks

onEdit(item:Task,i:number){
  this.todoForm.controls['item'].setValue(item.description);
  this.updateId =i;
  this.isEditEnabled = true;
  } 

updateTask(){
  this.tasks[this.updateId].description = this.todoForm.value.item;
  this.tasks[this.updateId].done = false;
  this.todoForm.reset();
  this.updateId= undefined;
  this.isEditEnabled=false;
}

// Task Deletion
  
  deleteTask(i:number){
    this.tasks.splice(i,1);
  }
  deleteInProgress(i:number){
    this.inprogress.splice(i,1);
  }
  deleteCompleted(i:number){
    this.completed.splice(i,1);
  }

}
