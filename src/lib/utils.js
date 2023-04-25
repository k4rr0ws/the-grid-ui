export function abbrAddress (account) {
    return account.substr(0, 4) + "~" + account.substr(account.length - 7, 7);
}