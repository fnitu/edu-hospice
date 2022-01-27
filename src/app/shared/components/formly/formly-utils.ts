import { FormlyFieldConfig } from "@ngx-formly/core";

class FormlyUtils {
    private static instance: FormlyUtils;

    private constructor() {
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new FormlyUtils();

        return this.instance;
    }

    /**
     * https://github.com/ngx-formly/ngx-formly/issues/1783#issuecomment-533058837
     * @param key
     * @param fields
     */
    getField(key: string, fields: FormlyFieldConfig[]): FormlyFieldConfig {
        for (let i = 0, len = fields.length; i < len; i++) {
            const f = fields[i];
            if (f.key === key) {
                return f;
            }

            if (f.fieldGroup && !f.key) {
                const cf = this.getField(key, f.fieldGroup);
                if (cf) {
                    return cf;
                }
            }
        }
    }
}

export const formlyUtils = FormlyUtils.getInstance();
