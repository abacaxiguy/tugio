import { format } from "date-fns";

export default function getDynamicTime(time: Date, formatType?: string) {
    if (typeof time === "string") time = new Date(time);

    if (!formatType) {
        const now = new Date();
        const diff = now.getTime() - time.getTime();

        if (diff < 24 * 60 * 60 * 1000) formatType = "HH:mm";
        else if (diff < 7 * 24 * 60 * 60 * 1000) formatType = "EEE";
        else formatType = "dd/MM/yyyy";
    }

    return format(time, formatType);
}
