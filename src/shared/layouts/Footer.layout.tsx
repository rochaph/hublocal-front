import React, { memo } from "react";
import styled from "styled-components";
import { backgrounds, size } from "polished";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledFooter = styled.footer`
  color: #fff;
  ${size("40px", "100%")};
  ${backgrounds("#1976d2")};
  outline: 1px solid black;
`;

const FooterDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  line-height: 40px;
  text-align: center;
`;

const LoveIcon = styled(FavoriteIcon)`
  display: block;
  fill: red;
  height: 100%;
  margin: 0 0.2em;
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterDiv>
        Made with <LoveIcon /> by Pedro
      </FooterDiv>
    </StyledFooter>
  );
}

export default memo(Footer);
