import React, { useState } from 'react'
import Header from './components/Header'
import Tabela from './components/Tabela'
import { GlobalStyle } from './styles'

function App() {
  const [tableData, setTableData] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target) {
        const csvContent = e.target.result as string
        const csvLines = csvContent.split('\n')

        if (csvLines.length < 2) {
          setErrorMessage('Erro: Arquivo CSV inválido.')
          setTableData([]) // Certifique-se de limpar os dados da tabela em caso de erro
          return
        }

        const csvHeader = csvLines[0].split(',')

        if (
          csvHeader[0] !== 'product_code' ||
          csvHeader[1] !== 'name' ||
          csvHeader[2] !== 'old_price' ||
          csvHeader[3] !== 'new_price'
        ) {
          setErrorMessage('Erro: Cabeçalho do arquivo CSV incorreto.')
          setTableData([])
          return
        }

        const csvRows = csvLines.slice(1).map((line) => {
          const row = line.split(',')

          if (
            row.length !== 4 ||
            !/^\d+$/.test(row[0]) ||
            !/^[A-Za-z\s]+$/.test(row[1]) ||
            !/^\d+\.\d+$/.test(row[2]) ||
            !/^\d+\.\d+$/.test(row[3])
          ) {
            setErrorMessage(`
              Erro: Linha ${
                csvLines.indexOf(line) + 2
              } do arquivo CSV possui formato incorreto.
            `)
            return null
          }

          return {
            product_code: parseInt(row[0]),
            name: row[1],
            old_price: parseFloat(row[2]),
            new_price: parseFloat(row[3])
          }
        })

        const validRows = csvRows.filter((row) => row !== null)

        setTableData(validRows)
        setErrorMessage(null)
      }
    }

    reader.readAsText(file)
  }
  console.log(tableData)
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header onFileUpload={handleFileUpload} />
        {errorMessage && <p>{errorMessage}</p>}
        {tableData.length > 0 ? (
          <div>
            <h2>Tabela de Produtos:</h2>
            <Tabela data={tableData} />
          </div>
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </>
  )
}

export default App
