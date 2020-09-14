import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-messages-show',
  templateUrl: './messages-show.component.html',
  styleUrls: ['./messages-show.component.scss']
})
export class MessagesShowComponent implements OnInit, OnDestroy {

  message = null;
  message$ = null;
  disableForm = true;
  newMessages: string;
  loading = false;
  currentUser;
  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private auth: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUserValue.user;
    this.route.paramMap.subscribe(
      (params: any) => {
        if (params.params.id) {
          this.message$ = this.courseService.getMessagesById(params.params.id).subscribe(
            response => {this.message = response; this.disableForm = false;},
            error => console.error(error)
          );
        }
      },
      error => console.error(error)
    );

  }

  ngOnDestroy(): void {
    this.message$.unsubscribe();
  }

  sanitizerUrl(url, addApiUrl) {
    if (addApiUrl) {
      url = `${environment.baseUrl + url}` ;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  sendMessages() {
    if(this.newMessages === undefined && this.newMessages === "") {
      return;
    }
    this.loading = true;
    this.disableForm = true;
    const newMessage = {
      slide_id: this.message.slide_id,
      unit_id: this.message.unit_id,
      course_id: this.message.course_id,
      parent_id: this.message.id,
      to_user_id: this.message.from_user_id,
      from_user_name: this.message.from_user.name,
      status: "Sin leer",
      messages: this.newMessages,
    }
    const promiseMessage = this.courseService.newMessages(newMessage).subscribe(
      response => {
        this.disableForm = false;
        this.loading = false;
        this.newMessages = "";
        this.message.children.push(response);
        promiseMessage.unsubscribe();
      },
      error => {
        console.error(error);
        promiseMessage.unsubscribe();
      }
    );
  }


}
