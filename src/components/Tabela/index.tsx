import React from 'react'
import { TabelaStyle } from './styles'

interface TableRow {
  product_code: number
  name: string
  old_price: number
  new_price: number
}

interface TabelaProps {
  data: TableRow[]
}

const Tabela: React.FC<TabelaProps> = ({ data }) => {
  return (
    <TabelaStyle>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Preço Atual</th>
            <th>Novo Preço</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.product_code}</td>
              <td>{row.name}</td>
              <td>{row.old_price}</td>
              <td>{row.new_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TabelaStyle>
  )
}

export default Tabela
