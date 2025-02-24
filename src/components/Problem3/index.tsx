import { CodeBlock } from 'react-code-blocks';
import sourceCode from "./source.tsx?raw";

export default function Problem3() {
  return (
    <>
      <h1 className='text-xl font-bold'>Inefficiencies and anti-patterns</h1>
      <i>I've added comments in code</i>
      <ol className='list-decimal my-2 px-3'>
        <li>If you don't need <b>children</b> no need to use <b>React.FC</b> (line: 3)</li>
        <li><b>blockchain</b> property is not exist on <b>WalletBalance</b> interface. Must use <b>currency</b> instead (line: 11)</li>
        <li>// <b>lhsPriority</b> is undefined (line: 12)</li>
        <li><b>{`balance.amount <= 0`}</b>{` select amount < 0 seem not correct logic (line: 13)`}</li>
        <li><b>prices</b> is dependency for <b>useMemo</b> but not use inside function (line: 23)</li>
        <li>Inefficiencies use of <b>formattedBalances</b> (line: 34)</li>
      </ol>
      <CodeBlock
        text={sourceCode}
        language={'tsx'}
        showLineNumbers={true}
        highlight="3, 11, 12, 13, 19, 20, 23, 32, 33, 34"
      />
    </>
  )
}
