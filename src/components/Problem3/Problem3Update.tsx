import sourceUpdate from "./sourceUpdate.tsx?raw";
import { CodeBlock } from 'react-code-blocks';

export default function Problem3Update() {
  return (
    <>
      <h1 className='text-xl font-bold'>Problem 3 refactored version</h1>
      <CodeBlock
        text={sourceUpdate}
        language={'tsx'}
        showLineNumbers={true}
      />
    </>
  )
}
