import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface CodeDisplayProps {
  language?: string;
  value: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={monokai} showLineNumbers>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeDisplay;
