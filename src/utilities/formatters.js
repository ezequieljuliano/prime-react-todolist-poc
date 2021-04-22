import { addSeconds, format, parseISO } from "date-fns";

export const formatCurrency = (value) => {
    return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatDateISOToDate = (dateISO) => {
    if (dateISO) {
        return format(parseISO(dateISO), "MM/dd/yyyy");
    }
    return "";
};

export const formatSecondsToDate = seconds => {
    const date = addSeconds(new Date(0), seconds);
    return format(date, "MM/dd/yyyy");
}

export const formatDate = (date, formatStr = "MM/dd/yyyy") => {
    if (date) {
        return format(date, formatStr);
    }
    return "";
};

