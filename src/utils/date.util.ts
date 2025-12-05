export function time24h(): Date{
    return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

export function timeNow(): Date{
    return new Date(Date.now())
}

