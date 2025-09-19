
import React from 'react';

const DocumentViewer = ({ text, jargon, risks }) => {
  const getHighlightedText = () => {
    if (!text) return "Document text will appear here...";
    if (jargon.length === 0 && risks.length === 0) return text;

    const combined = [
      ...jargon.map(j => ({ ...j, type: 'jargon' })),
      ...risks.map(r => ({ ...r, type: 'risk' }))
    ].sort((a, b) => a.startPosition - b.startPosition);

    let lastIndex = 0;
    const parts = [];

    combined.forEach(item => {
      // Add text before the highlight
      if (item.startPosition > lastIndex) {
        parts.push(text.substring(lastIndex, item.startPosition));
      }

      // Add the highlighted text
      const highlightClass = item.type === 'jargon'
        ? 'bg-yellow-200 cursor-pointer'
        : 'bg-red-200 cursor-pointer';
      
      const tooltipText = item.type === 'jargon' ? item.explanation : item.reason;

      parts.push(
        <span key={`${item.type}-${item.startPosition}`} className={`relative group ${highlightClass} rounded px-1`}>
          {text.substring(item.startPosition, item.endPosition)}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 w-max max-w-xs bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            {tooltipText}
          </span>
        </span>
      );
      lastIndex = item.endPosition;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow h-[70vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 sticky top-0 bg-white pb-2">Document Text</h3>
      <p className="whitespace-pre-wrap font-sans text-sm text-gray-700">
        {getHighlightedText()}
      </p>
    </div>
  );
};

export default DocumentViewer;
