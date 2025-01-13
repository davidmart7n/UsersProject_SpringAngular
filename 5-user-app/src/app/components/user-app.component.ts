import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];
  paginator: any = {};

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    // this.route.paramMap.subscribe(params =>{
    //   const page =+(params.get('page')|| '0');
    //   console.log(page)
    //   // this.service.findAllPageable(page).subscribe(pageable => this.users = pageable.content as User[]);
    // })
    this.addUser();
    this.removeUser();
    this.getUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }
  handlerLogin(){
    this.sharingData.getHandlerLoginEmitter.subscribe(({username,password})=>{
      console.log(username+''+password);

      this.authService.loginUser({username,password}).subscribe({
        next: response=>{
          const token=response.token;
          console.log(token);
          const payload = this.authService.getPayload(token);

          const user ={ username: payload.sub}
          const login = {
            user,
            isAuth:true,
            isAdmin:payload.isAdmin
          }
          this.authService.token=token;
          this.authService.user=login;
          this.router.navigate(['/users/page/0'])
        },
        error:error=>{
          if(error.status == 401){
            console.log(error.error);
            Swal.fire('Login error', error.error.message, 'error')
          }else{
            throw error;
          }
        }


      })
    })
  }

  pageUsersEvent() {
    this.sharingData.getPageUsersEmitter.subscribe(pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    })
  }


  getUserById() {
    this.sharingData.getUserByIdEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id)

      this.sharingData.getSelectUserEmitter.emit(user);
    })
  }
  addUser() {
    this.sharingData.getNewUserEmitter.subscribe(user => {
      if (user.id > 0) {
        console.log('updating user...')
        console.log(this.users)
        this.service.update(user).subscribe(
          {
            next: (userUpdated) => {
              this.users = this.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u)
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                }
              });

              Swal.fire({
                title: "Well Done!",
                text: "Your user is Updated!",
                icon: "success"
              });
            },
            error: (err) => {
              // console.log(err.error)
              if (err.status == 400) {
                this.sharingData.getErrorsUserFormEmitter.emit(err.error);
              }
            }
          })

      } else {
        user.id = null;
        this.service.create(user).subscribe({
          next: userNew => {
            console.log("user created")
            console.log(user)
            this.users.push(userNew);
            this.router.navigate(['/users'], {
              state: {
                users: this.users,
                paginator: this.paginator
              }
            });

            Swal.fire({
              title: "Well Done!",
              text: "Your user is created!",
              icon: "success"
            });
          },
          error: (err) => {
            // console.log(err.status)
            if (err.status == 400) {
              this.sharingData.getErrorsUserFormEmitter.emit(err.error);
            }
          }
        })
      }
    })
  }
  removeUser(): void {
    this.sharingData.getIdUserRemoveEmitter.subscribe(id => {

      Swal.fire({
        title: "Sure you want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.delete(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                }
              });
            })
          })

          Swal.fire({
            title: "Deleted!",
            text: "Your user has been deleted.",
            icon: "success"
          });
        }
      });
    });
  }

}