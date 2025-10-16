import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { editableMember, Member, Photo } from '../../types/members';
import { AccountService } from './account-service';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl = environment.apiUrl;
  editMode = signal(false)
  member = signal<Member | null>(null)


  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'members');
  }

  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + 'members/'+ id).pipe(
      tap(member => {
        this.member.set(member)
      })
    )
  }
  
  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(this.baseUrl + 'members/' +id +'/photos')
  }

  updateMember(member: editableMember) {
    return this.http.put(this.baseUrl + 'members/', member)

  }

  
}
