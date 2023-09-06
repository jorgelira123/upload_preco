import React, { useState } from 'react'
import { HeaderContainer } from './styles'

interface HeaderProps {
  onFileUpload: (file: File) => void
}

const Header: React.FC<HeaderProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleValidateClick = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <HeaderContainer>
      <h1>Upload Preço</h1>
      <div className="upload-button">
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <button className="validate-button" onClick={handleValidateClick}>
        VALIDAR
      </button>
    </HeaderContainer>
  )
}

export default Header
