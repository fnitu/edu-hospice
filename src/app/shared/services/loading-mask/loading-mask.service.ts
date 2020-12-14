import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingMaskService {
    private $loadingMask = null;

    constructor() {
    }

    init(): void {
        this.$loadingMask = $('<div class="loadingMask"></div>');

        let $mainContainer = $(".main-container");
        $mainContainer.after(this.$loadingMask);
    }

    public show() {
        this.$loadingMask = $(".loadingMask");

        if (this.$loadingMask?.length) {
            this.$loadingMask.show();
        }
    }

    public hide() {
        this.$loadingMask = $(".loadingMask");

        if (this.$loadingMask?.length) {
            this.$loadingMask.hide();
        }
    }
}
