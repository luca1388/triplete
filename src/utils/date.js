export const getTimeFromUtcDateTime = (utcDateTime) => {
    let stringTime = utcDateTime.split('T')[1].split('Z')[0];
    if (!parseInt(stringTime)) {
        return null;
    }
    let time = new Date(utcDateTime).toTimeString().split(' ')[0];
    time = time.substr(0, time.lastIndexOf(':'));

    return time;
};

export const getMatchDateFromUtcDate = utcDate => {
    let formattedDate = new Date(utcDate).toLocaleDateString('it-IT', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).split(' ');
    // Remove year
    formattedDate.pop();
    formattedDate = formattedDate.join(' ');
    return "" + formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};