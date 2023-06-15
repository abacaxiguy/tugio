import { format } from "date-fns";

export default function getDynamicTime(time: Date) {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(time).toLocaleString(locale, { timeZone: tz });
    return format(new Date(date), "HH:mm");
}
