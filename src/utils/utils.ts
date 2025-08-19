export const formatCurrency = (value: any) => {
    const numberValue = Number(value);

    const formattedNumber = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numberValue);
    return formattedNumber;
}