import { format } from "date-fns";

export const formatDateTime = (dateTime) => {
    return format(dateTime, "dd-MM-yyyy h:mm a")
}