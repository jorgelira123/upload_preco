import React, { useState } from 'react'
import Header from './components/Header'
import { GlobalStyle } from './styles'

function App() {
  const [csvData, setCsvData] = useState<string[][]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target) {
        const csvContent = e.target.result as string
        const csvLines = csvContent.split('\n')

        // Remove a primeira linha (cabeçalho) do arquivo CSV
        const csvRows = csvLines.slice(1).map((line) => line.split(',')) // Dividir linhas em colunas

        // Verifique se os valores na coluna "Código" (product_code) estão em ordem sequencial
        let prevCode = -1
        for (let i = 0; i < csvRows.length; i++) {
          const currentCode = parseInt(csvRows[i][0]) // Código da linha atual

          if (currentCode !== prevCode + 1) {
            setErrorMessage('Erro: Códigos não estão em ordem sequencial.')
            setCsvData([])
            return // Pare a execução
          }

          prevCode = currentCode
        }

        // Ordene os dados com base na coluna "Novo Preço" (new_price)
        csvRows.sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]))

        setCsvData(csvRows)
        setErrorMessage(null)
      }
    }

    reader.readAsText(file)
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header onFileUpload={handleFileUpload} />
        {errorMessage && <p>{errorMessage}</p>}
        {csvData.length > 0 && (
          <div>
            <h2>Tabela de Produtos:</h2>
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
                {csvData.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default App
