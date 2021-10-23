import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly MIME_TYPES = {
    'pdf': "application/pdf",
    'png': "image/png",
    'gif': "image/gif",
    'jpeg': "image/jpeg",
    'jpg': "image/jpeg",
    'jpe': "image/jpeg",
    'txt': "text/plain",
    'html': "text/html",
    'mp4': "video/mp4",
    'avi': "video/avi",
    'webm': "video/webm",
    'docx': "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    'ppsx': "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    'xps': "application/vnd.ms-xpsdocument",
    'doc': "application/msword",
    'xls': "application/vnd.ms-excel",
    'xlsx': "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    'pptx': "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    'ppt': "application/vnd.ms-powerpoint",
    'other': "" //sometimes compressed files have empty mimetypes
  };

  private readonly FILE_EXTENSION_GROUPS = {
    'TEXT': ["doc", "docx", "log", "msg", "odt", "pages", "rtf", "tex", "txt", "wpd", "wps", "xps"],
    'DATA': ["csv", "dat", "gbr", "ged", "key", "keychain", "pps", "ppt", "pptx", "sdf", "tar", "tax2012", "vcf", "xml"],
    'VIDEO': ["3g2", "3gp", "asf", "asx", "avi", "flv", "m4v", "mov", "mp4", "mpg", "rm", "srt", "swf", "vob", "wmv"],
    'D3_IMAGE': ["3dm", "3ds", "max", "obj"],
    'IMAGE': ["bmp", "dds", "gif", "jpg", "png", "psd", "pspimage", "tga", "thm", "tif", "tiff", "yuv"],
    'PAGE_LAYOUT': ["indd", "pct", "pdf"],
    'SPREADSHEET': ["xlr", "xls", "xlsx", "xlsm"],
    'CAD': ["dwg", "dxf"],
    'COMPRESSED': ["7z", "cbr", "deb", "gz", "pkg", "rar", "rpm", "sitx", "tar.gz", "zip", "zipx"],
    'XML': ["xml"],
    'OTHER': ["other", "html"] //sometimes compressed files have empty mimetypes
  };


  constructor() { }

  public getGroupFile(mimeType) {
    //iterate through all mime types
    for (let i in this.MIME_TYPES) {
      if (this.MIME_TYPES.hasOwnProperty(i)) {
        if (this.MIME_TYPES[i] === mimeType) {
          for (let j in this.FILE_EXTENSION_GROUPS) {
            if (this.FILE_EXTENSION_GROUPS.hasOwnProperty(j)) {
              if (this.FILE_EXTENSION_GROUPS[j].indexOf(i) !== -1) {
                return j;
              }
            }
          }
        }
      }
    }
  }
}
