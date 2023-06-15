import { format } from "date-fns";

export default function getDynamicTime(time: Date, formatType?: string) {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!formatType) {
        const now = new Date();
        const diff = now.getTime() - time.getTime();

        if (diff < 24 * 60 * 60 * 1000) formatType = "HH:mm";
        else if (diff < 7 * 24 * 60 * 60 * 1000) formatType = "EEE";
        else formatType = "dd/MM/yyyy";
    }

    const date = new Date(time).toLocaleString(locale, { timeZone: tz });
    return format(new Date(date), formatType);
}
