import React from "react";
import styled from "styled-components";

const StyledDocumentParagraph = styled.p`
  line-height: 1.5rem;
  font-size: 18px;
  padding: 20px 20px;
  margin: 0;

  transition: background-color 0.3s ease;
  height: ${props => (props.isEqualized ? "100%" : "auto")};
  background: ${({ isEqualized, isHighlighted }) =>
    isHighlighted ? "#FFEF9F" : isEqualized ? "#f7f7f9" : "white"};
  /* margin top is needed because of the wrapping div that can't be styled. last child bottom margin of div is not respected */
  /* margin bottom is what we'd use but EqualHeight wrapper disappears when not equalizing
   * so we have to get smart with padding and margin top to create the same effect
  */
  margin-top: ${props => (props.isEqualized ? "10px" : "0")};
  padding-top: ${props => (props.isEqualized ? "20px" : "30px")};
`;

function DocumentParagraph({
  isEqualized,
  isHighlighted,
  identifier,
  handleClick,
  children
}) {
  return (
    <StyledDocumentParagraph
      isEqualized={isEqualized}
      isHighlighted={isHighlighted}
      onClick={() => handleClick(identifier)}
    >
      {children}
    </StyledDocumentParagraph>
  );
}

export default React.memo(DocumentParagraph);
