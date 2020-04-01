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

const mapText = (parapgraph, i) => {
  // @TODO refactor to object for easier state updates... see useEffect below for madness..
  return {
    segments: parapgraph,
    isHighlighted: false,
    id: i
  };
};

export default function TranslationCompare() {
  const [isScrollSyncEnabled, setScrollSync] = useState(false);
  const leftPaneRef = useRef(null);

  useEffect(() => {
    // force a scroll event so underlying sync behaviour get triggered once.
    console.log(leftPaneRef);
    if (isScrollSyncEnabled && leftPaneRef && leftPaneRef.current) {
      const originalValue = leftPaneRef.current.scrollTop;
      leftPaneRef.current.scrollTop = originalValue + 1;
      leftPaneRef.current.scrollTop = originalValue;
    }
  }, [isScrollSyncEnabled]);

  const [highlightedParagraph, setHighLightedParagraph] = useState();

  const target = MOCK_TEXT_NL.text.map(mapText);
  const source = MOCK_TEXT_EN.text.map(mapText);
  const [targetText, setTargetText] = useState(target);
  const [sourceText, setSourceText] = useState(source);

  const toggleScrollSync = () => {
    setScrollSync(!isScrollSyncEnabled);
  };

  useEffect(() => {
    console.log("useEffect highlighted para", highlightedParagraph);
    if (highlightedParagraph !== undefined) {
      setTargetText(prevState => {
        const previousHighlightedId = prevState.find(
          p => p.isHighlighted === true
        );
        if (
          previousHighlightedId !== undefined &&
          previousHighlightedId === highlightedParagraph
        ) {
          return prevState;
        }
        const newState = prevState
          .map(p => {
            return p.isHighlighted
              ? {
                  ...p,
                  isHighlighted: false
                }
              : p;
          })
          .map(p => {
            return p.id === highlightedParagraph
              ? {
                  ...p,
                  isHighlighted: true
                }
              : p;
          });
        return newState;
      });

      setSourceText(prevState => {
        const previousHighlightedId = prevState.find(
          p => p.isHighlighted === true
        );
        if (previousHighlightedId === highlightedParagraph) {
          return prevState;
        }
        const newState = prevState
          .map(p => {
            return p.isHighlighted
              ? {
                  ...p,
                  isHighlighted: false
                }
              : p;
          })
          .map(p => {
            return p.id === highlightedParagraph
              ? {
                  ...p,
                  isHighlighted: true
                }
              : p;
          });
        return newState;
      });
    }
  }, [highlightedParagraph]);

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
                  {targetText.map(({ segments, id, isHighlighted }) => (
                    <EqualHeightElement
                      tag="div"
                      key={`NL_${id}`}
                      name={id}
                      disable={!isScrollSyncEnabled}
                    >
                      <DocumentParagraph
                        isEqualized={isScrollSyncEnabled}
                        isHighlighted={isHighlighted}
                        handleClick={setHighLightedParagraph}
                        identifier={id}
                      >
                        {segments}
                      </DocumentParagraph>
                    </EqualHeightElement>
                  ))}
                </DocumentContainer>
              </ScrollSyncPane>
              <ScrollSyncPane>
                <DocumentContainer>
                  {sourceText.map(({ segments, id, isHighlighted }) => (
                    <EqualHeightElement
                      tag="div"
                      key={`EN_${id}`}
                      name={id}
                      disable={!isScrollSyncEnabled}
                    >
                      <DocumentParagraph
                        isEqualized={isScrollSyncEnabled}
                        isHighlighted={isHighlighted}
                        handleClick={setHighLightedParagraph}
                        identifier={id}
                      >
                        {segments}
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
