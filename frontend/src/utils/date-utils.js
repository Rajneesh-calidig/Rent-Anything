export const formatTime = (differenceInMinutes) => {
    const hour = Math.floor(differenceInMinutes / 60);
    const days = Math.floor(hour / 24);
    const months = Math.floor(days / 30);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);
    console.log(hour,days,months,weeks,years);

    if(differenceInMinutes <= 1){
        return 'just now';
    }
    if(differenceInMinutes < 60 && differenceInMinutes > 1) {
        return `${differenceInMinutes} minutes ago`;
    }
    if(hour < 24 && hour >= 1) {
        return `${hour} hour${hour === 1 ? '' : 's'} ago`;
    }
    if(days < 30 && days >= 1) {
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }
    if(weeks < 5 && weeks >= 1) {
        return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    }
    if(months < 12 && months >= 1) {
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }
    if(years >= 1) {
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
}