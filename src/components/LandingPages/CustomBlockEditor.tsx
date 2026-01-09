import React, { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface CustomBlockEditorProps {
  html: string;
  css?: string;
  onChange: (content: { html: string; css?: string }) => void;
}

export const CustomBlockEditor: React.FC<CustomBlockEditorProps> = ({
  html,
  css,
  onChange,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">Custom HTML/CSS</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      {!showPreview ? (
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label className="text-xs text-muted-foreground">HTML</Label>
            <Textarea
              value={html}
              onChange={(e) => onChange({ html: e.target.value, css })}
              className="font-mono text-sm min-h-[200px]"
              placeholder="<div>Your custom HTML here...</div>"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs text-muted-foreground">
              CSS (optional)
            </Label>
            <Textarea
              value={css || ""}
              onChange={(e) => onChange({ html, css: e.target.value })}
              className="font-mono text-sm min-h-[100px]"
              placeholder=".custom-class { color: blue; }"
            />
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-background min-h-[200px]">
          {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}

      <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded border border-border">
        <strong>⚠️ Warning:</strong> Custom HTML/CSS will be rendered as-is.
        Ensure your code is safe and doesn't contain malicious scripts.
      </div>
    </div>
  );
};
