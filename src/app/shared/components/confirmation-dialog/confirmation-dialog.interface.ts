export interface ConfirmationDialogInterface {
    data: ConfirmationDialogDataInterface
}

export interface ConfirmationDialogDataInterface {
    title?: string;
    message: string;
    buttons?: {
        text: string;
        handler?(): any;
    }[]
}


