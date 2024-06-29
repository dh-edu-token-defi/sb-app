import React, { useState } from "react";
import { Button } from "@daohaus/ui";

export const CopyToClipboardButton = ({
  textToCopy,
}: {
  textToCopy: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Button size="md" variant="outline" onClick={handleCopy}>
      {isCopied ? "Copied!" : "Copy to clipboard"}
    </Button>
  );
};
