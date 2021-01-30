export interface ConfirmationDialogInterface {
    data: ConfirmationDialogDataInterface
}

export interface ConfirmationDialogDataInterface {
    title?: string;
    message: string;
    hasCommentBox?: boolean;
    buttons?: {
        text: string;
        handler?(): any;
    }[]
}


