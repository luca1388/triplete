import { Competition } from "../types";

export const competitionsName: {[key in Competition]: { defaultPath: string, displayName: string}} = {
    'SA': {
        displayName: 'Serie A',
        defaultPath: '/'
    },
    'UCL': {
        displayName: 'Champions League',
        defaultPath: '/champions/gironi'
    }
};