import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { Observable} from 'rxjs';
import {HttpClient,HttpHeaders}from '@angular/common/http'
const httpOptions = {
  headers:new HttpHeaders({
    'Content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/tasks';
  constructor(private httpClient:HttpClient) { }

  /**Using Obeservable Task[] to 'get' all task in Db
   * (NB:if we use any it will work just that the return will not be definte to what we want).
   * We don't use 'of' because HttpClient retuns an Observable */
  getTasks():Observable<Task[]>{
    //const tasks = of(TASKS);
    return this.httpClient.get<Task[]>(this.apiUrl);
  }

  deleteTask(task:Task):Observable<Task>{
    const detleUrl = `${this.apiUrl}/${task.id}`;
    return this.httpClient.delete<Task>(detleUrl);
  }

  updateTask(task:Task):Observable<Task>{
    const updateUrl = `${this.apiUrl}/${task.id}`;
    return this.httpClient.put<Task>(updateUrl,task,httpOptions);
  }

  addTask(task:Task):Observable<Task>{
    return this.httpClient.post<Task>(this.apiUrl,task,httpOptions);
  }
}
