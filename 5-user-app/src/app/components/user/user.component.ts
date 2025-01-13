import { Component, EventEmitter, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user',
  imports: [RouterModule,PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  
  title: string = 'Users List';
  users: User[]=[];
  paginator:any={};

  constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute){
      if(this.router.getCurrentNavigation()?.extras.state){
        this.users=this.router.getCurrentNavigation()?.extras.state!['users']
        this.paginator=this.router.getCurrentNavigation()?.extras.state!['paginator']
        console.log('users pasadps a la navegación');
      }
    }

  ngOnInit(): void {
    console.log(this.users)
    if(!this.users||this.users.length==0){
      this.route.paramMap.subscribe(params =>{
      const page =+(params.get('page')|| '0');
      console.log(page)
      this.service.findAllPageable(page).subscribe(pageable => {
        this.users = pageable.content as User[];
        this.paginator=pageable;
      this.sharingData.getPageUsersEmitter.emit({users: this.users,paginator: this.paginator});
      })
    })
      console.log('findAll consult done')
      console.log(this.users)

    }
     
  }

  onRemoveUser(id: number):void{
  this.sharingData.getIdUserRemoveEmitter.emit(id);
    }
  onUpdateUser(user:User):void{
    this.router.navigate(['/users/edit', user.id])
  }

  get admin(){
    return this.authService.isAdmin(); 
  }

}
