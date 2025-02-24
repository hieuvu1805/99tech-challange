...
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // if you don't need children no need to use React.FC
  const balances = useWalletBalances();
  const prices = usePrices();

	...

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain); // blockchain is not exist on WalletBalance. Should use currency instead
		  if (lhsPriority > -99) { // lhsPriority is undefined
		     if (balance.amount <= 0) { // only select amount <= 0 seem not correct logic
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain); // blockchain is not exist on WalletBalance. Should use currency instead
		  const rightPriority = getPriority(rhs.blockchain); // blockchain is not exist on WalletBalance. Should use currency instead
		  ...
    });
  }, [balances, prices]); // "prices" is dependency for useMemo but not use inside function

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  // incorrect use of sortedBalances instead of formattedBalances just created above
  // actually formattedBalances is unnecessary coz run map 1 time for formatted and 1 more time for render
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
  ...