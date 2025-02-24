import { useMemo, } from 'react'
import WalletRow from '...'
import useWalletBalances from '...'
import usePrices from '...'
import classes from '...'

interface WalletBalance {
  currency: string;
  amount: number;
}

interface Props {
  title: string;
}

const getPriority = (blockchain: string): number => {
  return {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  }[blockchain] ?? -99;
};

const WalletPage = (props: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => balance.amount >= 0 && getPriority(balance.currency) > -99)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(lhs.currency) - getPriority(rhs.currency));
  }, [balances]);

  const rows = useMemo(() => sortedBalances.map((balance: WalletBalance) => {
    const { amount, currency } = balance;
    const usdValue = prices[currency] * amount;
    const formattedAmount = amount.toFixed();
    return (
      <WalletRow
        className={classes.row}
        key={currency}
        amount={amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    )
  }), [sortedBalances, prices])

  return (
    <div {...props}>
      {rows}
    </div>
  )
}

export default WalletPage;