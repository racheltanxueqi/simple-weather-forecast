import { format } from "date-fns";

export const formatDateTime = (dateTime) => {
    return format(dateTime, "dd-MM-yyyy h:mm a") // Example date format: 03-03-2025 12:13 AM
}