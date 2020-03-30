import React, { useState } from "react";
import { EqualHeight, EqualHeightElement } from "react-equal-height";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";
import styled from "styled-components";
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

const DocumentParagraph = styled.p`
  line-height: 1.5rem;
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 0;
  margin-bottom: 10px;
  /* margin bottom is what we'd use but i can't seem to style the EqualHeight div */
  margin-top: 10px;
  /* margin top is needed because of the wrapping div that can't be styled. last child bottom margin of div is not respected */
  height: ${props => (props.isEqualized ? "100%" : "auto")};
  background: ${props => (props.isEqualized ? "#f7f7f9" : "white")};
`;

const DocumentContainer = styled.div`
  height: 100%;
  background: white;
  padding: 20px;
  overflow-y: auto;
`;

export default function TranslationCompare() {
  const [isScrollSyncEnabled, setScrollSync] = useState(false);
  const toggleScrollSync = () => {
    setScrollSync(!isScrollSyncEnabled);
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
                <DocumentContainer>
                  {MOCK_TEXT_EN.text.map((paragraph, i) => (
                    <EqualHeightElement
                      tag="div"
                      key={`EN_${i}`}
                      name={i}
                      disable={!isScrollSyncEnabled}
                    >
                      <DocumentParagraph isEqualized={isScrollSyncEnabled}>
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
                      <DocumentParagraph isEqualized={isScrollSyncEnabled}>
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
