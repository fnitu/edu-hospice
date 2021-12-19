import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {GalleryLinkInterface} from './gallery-link.interface';
import {AuthService} from '../../services/authentication/auth.service';

import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {GLOBALS} from '../../core/globals';
import {CustomTranslateService} from '../../services/custom-translate/custom-translate.service';
import {PlaceholderFormatService} from '../../services/format/placeholder-format.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

  @Output() linksUpdated = new EventEmitter<any>();
  @Input() links: GalleryLinkInterface[];

  @Input() options;

  public isReady: boolean = false;

  constructor(private authService: AuthService,
              private confirmationDialogService: ConfirmationDialogService,
              private customTranslateService: CustomTranslateService,
              private placeholderFormatService: PlaceholderFormatService,) {
  }

  ngOnInit(): void {
    if (this.links) {
      this.addOriginalHrefProperty(this.links);

      this.updateImageSrc(this.links);
    }

    this.initEvents();
  }

  private initEvents() {
    this.linksUpdated.subscribe((links) => {
      if (links) {
        this.addOriginalHrefProperty(links);

        this.updateImageSrc(links);
      }
    });
  }

  /**
   * Original href property keeps the href without QST
   * @private
   */
  private addOriginalHrefProperty(links) {
    this.links = _.map(links, (item) => {
      item.originalHref = item.href;

      return item;
    });
  }

  /**
   * Configure and init image gallery
   * @param $event
   * @private
   */
  public openImage($event) {
    const $target = $($event.target);
    const $link = $target.attr('src') ? $target.parent() : $target;
    const index = $link.index();

    const options = _.merge({
      index: index,
      event: $event,
      container: '.blueimp-gallery'
    }, this.options);

    (window as any).blueimp.Gallery(this.links, options);
  }

  /**
   * Add token to the image src
   * @private
   */
  private updateImageSrc(links) {
    this.links = _.map(links, (link) => {
      const newLink = this.addQuerySessionToken(link.originalHref);

      link.href = newLink;
      link.thumbnail = newLink;

      return link;
    });

    this.isReady = true;
  }

  addQuerySessionToken(url: string): string {
    const regex = /^((http|https|ftp):\/\/)|^(www).*/g;

    // if the regex is not found in url, qst must be added because it's an internal url
    // skip qst for external urls
    if (url.search(regex) === -1) {
      url += '?qst=' + this.authService.accessToken;
    }

    return url;
  }

  public deleteImg(event) {
    event.stopPropagation();

    const dialogRef = this.confirmationDialogService.show({
      data: {
        message: this.customTranslateService.getTranslation('confirmationDialog.deleteImgFile'),
        buttons: [
          {
            text: this.customTranslateService.getTranslation('general.no')
          },
          {
            text: this.customTranslateService.getTranslation('general.yes'),
            handler: () => {
              const url = this.placeholderFormatService.stringFormat('GLOBALS.DATA_URL',
                {
                  '{imgName}': 'params.data.id',
                }
              );

              dialogRef.close();
            }
          },
        ]
      }
    });

  }

}
