import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private   newUserEmitter: EventEmitter<User>=new EventEmitter();

  private   idUserRemoveEmitter= new EventEmitter(); 
  
  private  userUpdateEmitter = new EventEmitter(); 

  private UserByIdEmitter= new EventEmitter();

  private selectUserEmitter=new EventEmitter();

  private errorsUserFormEmitter= new EventEmitter();

  private pageUsersEmitter=new EventEmitter();

  private handlerLoginEmitter=new EventEmitter();


  constructor() { }

  get getHandlerLoginEmitter(){
    return this.handlerLoginEmitter;
  }

  get getPageUsersEmitter(){
    return this.pageUsersEmitter;
  }

  get getErrorsUserFormEmitter(){
    return this.errorsUserFormEmitter;
  }

  get getSelectUserEmitter(){
    return this.selectUserEmitter;
  }

  get getUserByIdEmitter(){
    return this.UserByIdEmitter;
  }

  get getNewUserEmitter():EventEmitter<User> {
    return this.newUserEmitter;
  }
  get getIdUserRemoveEmitter():EventEmitter<number>{
    return this.idUserRemoveEmitter;
  }

}
