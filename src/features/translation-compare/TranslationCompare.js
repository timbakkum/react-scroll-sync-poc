import React, { useState, useEffect, useRef } from "react";
import { EqualHeight, EqualHeightElement } from "react-equal-height";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import styled from "styled-components";
import DocumentParagraph from "./DocumentParagraph";
import MOCK_TEXT_EN from "./mocks/mock-en";
import MOCK_TEXT_NL from "./mocks/mock-nl";

const CompareGridWrapper = styled.div`
  padding: 20px;
  background: navy;
  height: 100%;
`;

const CompareGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  grid-gap: 20px;
  align-items: stretch;
  height: 100%;
`;

const DocumentContainer = styled.div`
  height: 100%;
  background: white;
  padding: 20px;
  overflow-y: auto;
`;

export default function TranslationCompare() {
  const [isScrollSyncEnabled, setScrollSync] = useState(false);
  const leftPaneRef = useRef(null);

  useEffect(() => {
    // force a scroll event so underlying sync get triggered once.
    console.log(leftPaneRef);
    if (isScrollSyncEnabled && leftPaneRef && leftPaneRef.current) {
      const originalValue = leftPaneRef.current.scrollTop;
      leftPaneRef.current.scrollTop = originalValue + 1;
      leftPaneRef.current.scrollTop = originalValue;
    }
  }, [isScrollSyncEnabled]);

  const [highlightedParagraph, setHighLightedParagraph] = useState();

  const toggleScrollSync = () => {
    setScrollSync(!isScrollSyncEnabled);
  };

  const handleParagraphClick = key => {
    setHighLightedParagraph(key);
  };

  return (
    <>
      <div>
        <button onClick={toggleScrollSync}>
          Toggle Scroll Sync {isScrollSyncEnabled ? "Off" : "On"}
        </button>
      </div>
      <ScrollSync enabled={isScrollSyncEnabled}>
        <EqualHeight>
          <CompareGridWrapper>
            <CompareGrid>
              <ScrollSyncPane>
                <DocumentContainer ref={leftPaneRef}>
                  {MOCK_TEXT_EN.text.map((paragraph, i) => (
                    <EqualHeightElement
                      tag="div"
                      key={`EN_${i}`}
                      name={i}
                      disable={!isScrollSyncEnabled}
                    >
                      <DocumentParagraph
                        isEqualized={isScrollSyncEnabled}
                        isHighlighted={highlightedParagraph === i}
                        handleClick={handleParagraphClick}
                        identifier={i}
                      >
                        {paragraph}
                      </DocumentParagraph>
                    </EqualHeightElement>
                  ))}
                </DocumentContainer>
              </ScrollSyncPane>
              <ScrollSyncPane>
                <DocumentContainer>
                  {MOCK_TEXT_NL.text.map((paragraph, i) => (
                    <EqualHeightElement
                      key={`NL_${i}`}
                      name={i}
                      disable={!isScrollSyncEnabled}
                    >
                      <DocumentParagraph
                        isEqualized={isScrollSyncEnabled}
                        isHighlighted={highlightedParagraph === i}
                        handleClick={handleParagraphClick}
                        identifier={i}
                      >
                        {paragraph}
                      </DocumentParagraph>
                    </EqualHeightElement>
                  ))}
                </DocumentContainer>
              </ScrollSyncPane>
            </CompareGrid>
          </CompareGridWrapper>
        </EqualHeight>
      </ScrollSync>
    </>
  );
}
