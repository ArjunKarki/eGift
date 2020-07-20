export const hp = {
    moneyFormat: (amount) => {
        let money = Number(amount).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        return money
    },
}