import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export const IndianRupee = (rupee, max = 0, min = 0) => {

    let Rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: max,
        minimumFractionDigits: min
    });

    return Rupee.format(rupee)
}

export const ParseDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

    return date;
}

export const DateDifference = birthDate => {
    const start = new Date(birthDate);
    const end = new Date();

    // Calculate the difference in milliseconds
    const diffMilliseconds = end - start;

    // Calculate the difference in years, months, and days
    const diffDate = new Date(diffMilliseconds);
    const years = diffDate.getUTCFullYear() - 1970;
    const months = diffDate.getUTCMonth();
    const days = diffDate.getUTCDate() - 1;
    if (years == 0 && months == 0) {
        return `${days}D`;
    } else if (years == 0 && months != 0) {
        return `${months}M ${days}D`;
    }
    return `${years}Y ${months}M ${days}D`;
};

export const DayMonthYear = (params) => {

    const date = new Date(params);
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };

    return date.toLocaleDateString('en-GB', optionsDate);
};

export const DayMonthYearWithTime = (params) => {

    const date = new Date(params);
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };

    return date.toLocaleString('en-GB', optionsDate);
}

export const OnlyTime = (params) => {

    const date = new Date(params);
    const optionsDate = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' };

    return date.toLocaleString('en-GB', optionsDate);
}

export const YYYYMMDD = (params) => {
    const date = new Date(params);

    let year = date.getUTCFullYear();
    let month = String(date.getUTCMonth() + 1).padStart(2, '0');
    let day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const get_date_value = () => {
    var currentDate = new Date();

    // Subtract 16 years from the current date
    var previous16YearsDate = new Date(currentDate);
    previous16YearsDate.setFullYear(currentDate.getFullYear() - 16);

    // Format the date as yyyy-mm-dd
    var formattedDate = previous16YearsDate.toISOString().split("T")[0];
    return formattedDate;
};

export const KundliFormatDateTime = (timestamp) => {
    // Parse the timestamp in UTC
    const dateTime = moment.utc(timestamp);

    // Extract the components
    const day = dateTime.date();
    const month = dateTime.month() + 1; // moment months are 0-indexed
    const year = dateTime.year();
    const hour = dateTime.hour();
    const min = dateTime.minute();
    const tzone = 5.5; // convert minutes to hours

    return { day, month, year, hour, min, lat: 19.132, lon: 72.342, tzone };
};

export const getShortDescription = (description) => {
    // Split the description into words
    const words = description?.trim().split(' ');

    // Get the first 8 words and join them back into a string
    const shortDescription = words?.slice(0, 8).join(' ');

    return shortDescription;
};

export const DeepSearchSpace = (data, searchText) => {
    const normalizeText = (text) => text.toLowerCase().replace(/\s+/g, '');

    const searchLower = normalizeText(searchText);

    const deepSearchObject = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some(value => deepSearchObject(value));
        }
        if (Array.isArray(obj)) {
            return obj.some(value => deepSearchObject(value));
        }
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return normalizeText(obj.toString()).includes(searchLower);
        }
        return false;
    };

    return data && data.filter(item => deepSearchObject(item));
};

export const generateRandomNumber = () => {
    return uuidv4();
};

export const SecondToHMS = (duration) => {
    const seconds = parseFloat(duration).toFixed(0)
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const CalculateTimeDifference = (date) => {
    const current_date = moment(new Date())?.local();
    const upcoming_date = moment(date);
    const duration = moment.duration(upcoming_date.diff(current_date));
    // console.log('Duration ::: ', duration);

    // console.log('current_date', current_date?.format('DD MMM YYYY hh:mm:ss a'));
    // console.log('upcoming_date', upcoming_date?.format('DD MMM YYYY hh:mm:ss a'));
    // console.log('upcoming_date with utc', upcoming_date?.utc()?.format('DD MMM YYYY hh:mm:ss a'));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
};

export const GroupMessagesByDate = (msg) => {
    const grouped = msg?.reduce((acc, message) => {
        const messageDate = moment(message?.createdAt).format('YYYY-MM-DD');
        if (!acc[messageDate]) {
            acc[messageDate] = [];
        }
        acc[messageDate].push(message);
        return acc;
    }, {});
    return grouped;
};

// export const CalculateTimeDifference = (endDate) => {
//     console.log(endDate)
//     // Get the current date as the start date
//     const startDate = new Date();

//     // Get the difference in milliseconds
//     let diffInMs = endDate - startDate;

//     // If the endDate is in the past, the difference will be negative
//     if (diffInMs < 0) {
//         return "End date is in the past!";
//     }

//     // Calculate days, hours, minutes, and seconds
//     const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
//     diffInMs -= days * 1000 * 60 * 60 * 24;

//     const hours = Math.floor(diffInMs / (1000 * 60 * 60));
//     diffInMs -= hours * 1000 * 60 * 60;

//     const minutes = Math.floor(diffInMs / (1000 * 60));
//     diffInMs -= minutes * 1000 * 60;

//     const seconds = Math.floor(diffInMs / 1000);

//     // Return the result as a formatted string
//     return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
// };