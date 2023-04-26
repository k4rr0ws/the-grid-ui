export function abbrAddress (account) {
    return account.substr(0, 4) + "~" + account.substr(account.length - 7, 7);
}

export const toFixedNoRounding = (a) => {
    return a.toString().match(/^-?\d+(?:\.\d{0,18})?/)[0]
}