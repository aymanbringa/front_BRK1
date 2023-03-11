import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./fonts/fontawesome-webfont.eot','./fonts/fontawesome-webfont.svg','./fonts/fontawesome-webfont.ttf','./fonts/fontawesome-webfont.woff','./fonts/fontawesome-webfont.woff2','./fonts/FontAwesome.otf','./fonts/themify.eot','./fonts/themify.svg','./fonts/themify.ttf','./fonts/themify.woff','./default-css.css','font-awesome.min.css','./metisMenu.css','./owl.carousel.min.css','./responsive.css','./slicknav.min.css','./styles.css','./themify-icons.css','./typography.css','./pages/bootstrap.min.css','./pages/default-css.css','./pages/font-awesome.min.css','./pages/metisMenu.css','./pages/owl.carousel.min.css','./pages/responsive.css','./pages/slicknav.min.css','./pages/styles.css','./pages/themify-icons.css','./pages/typography.css',]
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  showScript = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });


  }
}
