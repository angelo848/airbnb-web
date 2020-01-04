import styled from 'styled-components'
import { darken } from 'polished'

export const Buttton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: none;
  background-color: ${({ color }) => color};
  margin-top: 10px;
  color: #fff;
  i {
    font-size: 18px;
  }
  &:hover {
    background-color: ${({ color }) => darken(0.05, color)};
  }
  &:active {
    bacground-color: ${({ color }) => darken(0.07, color)};
  }
`
