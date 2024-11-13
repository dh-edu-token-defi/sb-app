import React, { useState } from 'react';
import styled from 'styled-components';

const IframeContainer = styled.div`
  width: 100%;
  height: 500px; /* Adjust the height as needed */
  margin-top: 16px; /* Adjust the margin as needed */
  border: none;
`;

interface DexToolsWidgetProps {
  pool: string;
}

const DexToolsWidget: React.FC<DexToolsWidgetProps> = ({ pool }) => {
  const [iframeVisible, setIframeVisible] = useState(true); // does not work on local host

  return (
    <IframeContainer>
      {iframeVisible && (
        <iframe
          id="dextools-widget"
          title="DEXTools Trading Chart"
          width="100%"
          height="100%"
          src={`https://www.dextools.io/widget-chart/en/base/pe-dark/${pool}?theme=light&chartType=2&chartResolution=30&drawingToolbars=false`}
          frameBorder="0"
          allowFullScreen
          onError={() => {
            console.log('Error loading DEXTools widget');
            setIframeVisible(false)
          }}
        ></iframe>
      )}
    </IframeContainer>
  );
};

export default DexToolsWidget;