import styled from 'styled-components'
import { cores } from '../../styles'

export const HeaderContainer = styled.header`
  background-image: linear-gradient(
    45deg,
    ${cores.corPrincipal},
    ${cores.corSecundaria}
  );

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin-right: 16px;
  }

  .upload-button {
    display: flex;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${cores.corTerceira};
    }
  }

  .validate-button {
    background-color: ${cores.corQuarta};
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${cores.corQuinta};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .upload-button {
      margin-top: 16px;
    }
  }
`
